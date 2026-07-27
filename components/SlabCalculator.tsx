"use client";

import React, { useState } from "react";
import {
  Calculator,
  DollarSign,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Ruler,
  Settings2,
  Weight,
} from "lucide-react";

/**
 * RebarX Slab Calculator
 *
 * Two modes:
 *  - Manual: the user picks the rebar diameter themselves, enters slab
 *    length/breadth/spacing, and gets the total rebar length + weight
 *    required (matches RebarX's existing quantity-takeoff calculator logic).
 *  - Advanced: the user does NOT pick a bar diameter or spacing. Instead,
 *    given span/load/thickness, a simplified ACI 440.11-22 flexural design
 *    suggests the bar size + spacing, which then feeds the same
 *    length/weight takeoff. Preliminary sizing for lead generation, not a
 *    stamped design - stated explicitly in the UI.
 */

// ---- RebarX GFRP material properties (RebarX Grade 2, per IS 18256) ----
const FFU_STAR = 1000; // MPa, guaranteed ultimate tensile strength
const EF = 50000; // MPa, elastic modulus (50 GPa)
const ECU = 0.003; // concrete ultimate strain

const EXPOSURE_CE: Record<string, number> = {
  interior: 1.0,
  exterior: 0.8,
  aggressive: 0.7,
};

const CONCRETE_GRADES = [20, 25, 30, 35];

// kg per 1000 m, at each nominal diameter (RebarX product data)
const WEIGHT_TABLE: Record<number, { steel: number; gfrp: number }> = {
  4: { steel: 98.8, gfrp: 26 },
  6: { steel: 222.2, gfrp: 56.6 },
  8: { steel: 395.1, gfrp: 100.6 },
  10: { steel: 617.3, gfrp: 157.2 },
  12: { steel: 888.9, gfrp: 226.4 },
  14: { steel: 1209.9, gfrp: 308.2 },
  16: { steel: 1580.2, gfrp: 402.5 },
  18: { steel: 2000, gfrp: 509.4 },
  20: { steel: 2469.1, gfrp: 628.9 },
};

const MANUAL_DIAMETERS = [4, 6, 8, 10, 12, 14, 16, 18, 20];
// Practical structural range for the auto-suggested design (excludes mesh-only sizes)
const STRUCTURAL_DIAMETERS = [8, 10, 12, 14, 16, 18, 20];

const LENGTH_UNITS = ["m", "mm", "ft", "in"] as const;
const SPACING_UNITS = ["mm", "m", "ft", "in"] as const;
type LengthUnit = (typeof LENGTH_UNITS)[number];

function toMeters(value: number, unit: LengthUnit): number {
  if (isNaN(value)) return NaN;
  if (unit === "mm") return value / 1000;
  if (unit === "ft") return value * 0.3048;
  if (unit === "in") return value * 0.0254;
  return value;
}

function beta1(fc: number) {
  if (fc <= 28) return 0.85;
  return Math.max(0.65, 0.85 - 0.05 * ((fc - 28) / 7));
}

interface QuantityResult {
  barsL: number;
  barsB: number;
  netLength: number;
  finalLength: number;
  gfrpWeight: number;
  steelWeightEquivalent: number;
  diameter: number;
  spacingM: number;
}

function computeQuantity(
  L: number,
  B: number,
  spacingM: number,
  diameter: number,
  wastagePct: number
): QuantityResult {
  const barsL = Math.ceil(B / spacingM) + 1;
  const barsB = Math.ceil(L / spacingM) + 1;
  const net = barsL * L + barsB * B;
  const finalLength = net * (1 + wastagePct / 100);
  const table = WEIGHT_TABLE[diameter];
  const gfrpWeight = finalLength * (table.gfrp / 1000);
  const steelWeightEquivalent = finalLength * (table.steel / 1000);

  return {
    barsL,
    barsB,
    netLength: net,
    finalLength,
    gfrpWeight,
    steelWeightEquivalent,
    diameter,
    spacingM,
  };
}

interface StructuralSuggestion {
  designSpan: number;
  mu: number;
  governing: "rupture" | "crushing";
  phi: number;
  barDia: number;
  spacingMm: number;
  capacityOk: boolean;
  deflectionOk: boolean;
  hMinDeflection: number;
}

function suggestStructuralDesign(inp: {
  designSpan: number;
  support: "simple" | "continuous";
  liveLoad: number;
  sdl: number;
  thickness: number;
  concreteGrade: number;
  exposure: "interior" | "exterior" | "aggressive";
  cover: number;
}): StructuralSuggestion {
  const CE = EXPOSURE_CE[inp.exposure];
  const ffu = CE * FFU_STAR;
  const b = 1000; // mm, 1 m wide design strip
  const assumedBarDia = 12;
  const d = inp.thickness - inp.cover - assumedBarDia / 2;

  const selfWeight = 24 * (inp.thickness / 1000); // kN/m2
  const wu = 1.2 * (selfWeight + inp.sdl) + 1.6 * inp.liveLoad;
  const l2 = inp.designSpan * inp.designSpan;
  const muKNm = inp.support === "simple" ? (wu * l2) / 8 : (wu * l2) / 12;
  const mu = muKNm * 1e6; // N.mm per m width

  const fc = inp.concreteGrade;
  const b1 = beta1(fc);
  const rhoFb = (0.85 * b1 * (fc / ffu) * (EF * ECU)) / (EF * ECU + ffu);

  const mn = (As: number) => {
    const rho = As / (b * d);
    if (rho <= rhoFb) {
      const phi = 0.55;
      const a = (As * ffu) / (0.85 * fc * b);
      return { phi, Mn: As * ffu * (d - a / 2), mode: "rupture" as const };
    } else {
      const phi = 0.65;
      const ffTerm = EF * ECU;
      let ff =
        Math.sqrt((ffTerm * ffTerm) / 4 + ((0.85 * b1 * fc) / rho) * ffTerm) -
        0.5 * ffTerm;
      ff = Math.min(ff, ffu);
      const a = (As * ff) / (0.85 * fc * b);
      return { phi, Mn: As * ff * (d - a / 2), mode: "crushing" as const };
    }
  };

  let lo = 10;
  let hi = 20000;
  let asReq = hi;
  let result = mn(hi);
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const r = mn(mid);
    if (r.phi * r.Mn > mu) {
      hi = mid;
      asReq = mid;
      result = r;
    } else {
      lo = mid;
    }
  }

  const asMinFlexure = Math.max(
    (0.41 * Math.sqrt(fc) * b * d) / ffu,
    (2.3 * b * d) / ffu
  );
  const asMinShrinkage = 0.0018 * b * inp.thickness;
  const asMin = Math.max(asMinFlexure, asMinShrinkage);
  const asDesign = Math.max(asReq, asMin);

  const maxSpacing = Math.min(3 * inp.thickness, 300);
  let barDia = STRUCTURAL_DIAMETERS[STRUCTURAL_DIAMETERS.length - 1];
  let spacing = 75;
  for (const db of STRUCTURAL_DIAMETERS) {
    const areaPerBar = (Math.PI / 4) * db * db;
    const rawSpacing = Math.floor((areaPerBar * 1000) / asDesign / 25) * 25;
    if (rawSpacing >= 75) {
      barDia = db;
      spacing = Math.min(rawSpacing, maxSpacing);
      break;
    }
  }

  const hMinDeflection =
    inp.support === "simple"
      ? (inp.designSpan * 1000) / 18
      : (inp.designSpan * 1000) / 22;

  const finalCheck = mn(asDesign);
  const capacityOk = finalCheck.phi * finalCheck.Mn >= mu;

  return {
    designSpan: inp.designSpan,
    mu: muKNm,
    governing: result.mode,
    phi: result.phi,
    barDia,
    spacingMm: spacing,
    capacityOk,
    deflectionOk: inp.thickness >= hMinDeflection,
    hMinDeflection,
  };
}

interface DimensionState {
  length: number;
  lengthUnit: LengthUnit;
  breadth: number;
  breadthUnit: LengthUnit;
  wastage: number;
  rxPrice: number;
  tmtPrice: number;
}

const DEFAULT_DIMENSIONS: DimensionState = {
  length: 6,
  lengthUnit: "m",
  breadth: 4,
  breadthUnit: "m",
  wastage: 5,
  rxPrice: 150,
  tmtPrice: 65,
};

export default function SlabCalculator() {
  const [mode, setMode] = useState<"manual" | "advanced">("manual");

  const [dims, setDims] = useState<DimensionState>(DEFAULT_DIMENSIONS);

  const [manualDia, setManualDia] = useState<number>(10);
  const [manualSpacing, setManualSpacing] = useState<number>(150);
  const [manualSpacingUnit, setManualSpacingUnit] =
    useState<(typeof SPACING_UNITS)[number]>("mm");

  const [structInputs, setStructInputs] = useState({
    support: "simple" as "simple" | "continuous",
    liveLoad: 2,
    sdl: 1.5,
    thickness: 150,
    concreteGrade: 25,
    exposure: "interior" as "interior" | "exterior" | "aggressive",
    cover: 20,
  });

  const [results, setResults] = useState<{
    quantity: QuantityResult;
    structural: StructuralSuggestion | null;
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPlace, setUserPlace] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = dims.length > 0 && dims.breadth > 0;

  const calculate = async () => {
    if (!isFormValid) {
      alert("Please enter the slab length and breadth to continue");
      return;
    }

    setIsCalculating(true);
    await new Promise((r) => setTimeout(r, 400));

    const L = toMeters(dims.length, dims.lengthUnit);
    const B = toMeters(dims.breadth, dims.breadthUnit);

    if (mode === "manual") {
      const spacingM = toMeters(manualSpacing, manualSpacingUnit);
      const quantity = computeQuantity(L, B, spacingM, manualDia, dims.wastage);
      setResults({ quantity, structural: null });
    } else {
      const designSpan = Math.min(L, B);
      const structural = suggestStructuralDesign({
        designSpan,
        ...structInputs,
      });
      const spacingM = structural.spacingMm / 1000;
      const quantity = computeQuantity(
        L,
        B,
        spacingM,
        structural.barDia,
        dims.wastage
      );
      setResults({ quantity, structural });
    }

    setIsCalculating(false);
  };

  const handleUnlock = async () => {
    if (!userName.trim()) {
      alert("Please enter your name");
      return;
    }
    if (!userPhone.trim() || userPhone.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    if (!userPlace.trim()) {
      alert("Please enter your place/city");
      return;
    }

    setIsSubmitting(true);
    try {
      const q = results?.quantity;
      const summary = q
        ? `Slab Calculator Lead (${mode}) | ${dims.length}${dims.lengthUnit} x ${dims.breadth}${dims.breadthUnit} | Bar: ${q.diameter}mm @ ${(q.spacingM * 1000).toFixed(0)}mm c/c | Length: ${q.finalLength.toFixed(1)}m | RebarX Weight: ${q.gfrpWeight.toFixed(1)}kg`
        : "Slab Calculator Lead";

      const res = await fetch(
        "https://rebar-xbackend.vercel.app/api/contact-submissions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formData: {
              email: "calculator.user@default.com",
              name: userName,
              message: `${summary} | Phone: ${userPhone} | Place: ${userPlace}`,
            },
          }),
        }
      );
      if (!res.ok) throw new Error("Submission failed");
      setFormSubmitted(true);
    } catch (err) {
      console.error("Error saving slab calculator lead:", err);
      alert("Failed to save your details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const q = results?.quantity;
  const rxCost = q ? q.gfrpWeight * dims.rxPrice : 0;
  const tmtCost = q ? q.steelWeightEquivalent * dims.tmtPrice : 0;
  const savings = tmtCost - rxCost;
  const savingsPct = tmtCost > 0 ? (savings / tmtCost) * 100 : 0;

  return (
    <div className="main-container" id="slab-calculator">
      <div className="section-divider"></div>
      <div className="section">
        <div className="headline-pricing">
          <div className="text-h2">RebarX Slab Calculator</div>
          <div
            className="text-body"
            style={{ maxWidth: "620px", textAlign: "center" }}
          >
            Pick your own rebar size for a quick quantity estimate, or switch
            to Advanced and let a structural calculation suggest the size and
            spacing for you.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridColumnGap: "32px",
              gridRowGap: "32px",
              width: "100%",
              alignItems: "flex-start",
            }}
            className="slab-calc-grid"
          >
            {/* INPUT CARD */}
            <div
              className="pricing-cards"
              style={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <div className="plan-header">
                <div className="plan-name-wrap">
                  <div className="plan-title">
                    <Calculator className="icon-plan" />
                    <div className="text-h6">Slab Details</div>
                  </div>
                  <div className="text-small" style={{ opacity: 0.8 }}>
                    {mode === "manual"
                      ? "Choose your bar size, enter the slab dimensions."
                      : "Enter loads & dimensions - we'll suggest the bar size."}
                  </div>
                </div>
                <div className="section-divider plan-divider"></div>
              </div>

              <div
                className="plan-bottom-tile"
                style={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                <button
                  onClick={() =>
                    setMode((m) => (m === "manual" ? "advanced" : "manual"))
                  }
                  className="cta-main bg-color"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <Settings2 size={16} />
                  {mode === "manual"
                    ? "Switch to Advanced (Suggest Bar Size)"
                    : "Switch to Manual (I'll Choose Bar Size)"}
                </button>

                <div className="input-halves">
                  <div className="contact-input-wrap">
                    <label className="text-small" style={{ fontWeight: 500 }}>
                      Slab Length <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="row" style={{ display: "flex", gap: 8 }}>
                      <input
                        type="number"
                        className="text-field"
                        value={dims.length || ""}
                        min="0"
                        onChange={(e) =>
                          setDims((p) => ({
                            ...p,
                            length: parseFloat(e.target.value) || 0,
                          }))
                        }
                      />
                      <select
                        className="text-field"
                        style={{ flex: "0 0 70px" }}
                        value={dims.lengthUnit}
                        onChange={(e) =>
                          setDims((p) => ({
                            ...p,
                            lengthUnit: e.target.value as LengthUnit,
                          }))
                        }
                      >
                        {LENGTH_UNITS.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="contact-input-wrap">
                    <label className="text-small" style={{ fontWeight: 500 }}>
                      Slab Breadth <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="row" style={{ display: "flex", gap: 8 }}>
                      <input
                        type="number"
                        className="text-field"
                        value={dims.breadth || ""}
                        min="0"
                        onChange={(e) =>
                          setDims((p) => ({
                            ...p,
                            breadth: parseFloat(e.target.value) || 0,
                          }))
                        }
                      />
                      <select
                        className="text-field"
                        style={{ flex: "0 0 70px" }}
                        value={dims.breadthUnit}
                        onChange={(e) =>
                          setDims((p) => ({
                            ...p,
                            breadthUnit: e.target.value as LengthUnit,
                          }))
                        }
                      >
                        {LENGTH_UNITS.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {mode === "manual" ? (
                  <div className="input-halves">
                    <div className="contact-input-wrap">
                      <label className="text-small" style={{ fontWeight: 500 }}>
                        Rebar Diameter
                      </label>
                      <select
                        className="text-field"
                        value={manualDia}
                        onChange={(e) => setManualDia(parseInt(e.target.value))}
                      >
                        {MANUAL_DIAMETERS.map((d) => (
                          <option key={d} value={d}>
                            {d} mm
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="contact-input-wrap">
                      <label className="text-small" style={{ fontWeight: 500 }}>
                        Rebar Spacing
                      </label>
                      <div className="row" style={{ display: "flex", gap: 8 }}>
                        <input
                          type="number"
                          className="text-field"
                          value={manualSpacing || ""}
                          min="0"
                          onChange={(e) =>
                            setManualSpacing(parseFloat(e.target.value) || 0)
                          }
                        />
                        <select
                          className="text-field"
                          style={{ flex: "0 0 70px" }}
                          value={manualSpacingUnit}
                          onChange={(e) =>
                            setManualSpacingUnit(
                              e.target.value as (typeof SPACING_UNITS)[number]
                            )
                          }
                        >
                          {SPACING_UNITS.map((u) => (
                            <option key={u} value={u}>
                              {u}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <div className="text-small" style={{ opacity: 0.7 }}>
                      Bar size &amp; spacing are suggested for you, per ACI
                      440.11-22, using RebarX Grade 2 (f_fu* = 1000 MPa, E_f =
                      50 GPa). Design span = shorter of length/breadth.
                    </div>
                    <div className="input-halves">
                      <div className="contact-input-wrap">
                        <label className="text-small" style={{ fontWeight: 500 }}>
                          Support Condition
                        </label>
                        <select
                          className="text-field"
                          value={structInputs.support}
                          onChange={(e) =>
                            setStructInputs((p) => ({
                              ...p,
                              support: e.target.value as "simple" | "continuous",
                            }))
                          }
                        >
                          <option value="simple">Simply Supported</option>
                          <option value="continuous">Continuous</option>
                        </select>
                      </div>
                      <div className="contact-input-wrap">
                        <label className="text-small" style={{ fontWeight: 500 }}>
                          Live Load (kN/m²)
                        </label>
                        <input
                          type="number"
                          className="text-field"
                          value={structInputs.liveLoad || ""}
                          min="0"
                          step="0.1"
                          onChange={(e) =>
                            setStructInputs((p) => ({
                              ...p,
                              liveLoad: parseFloat(e.target.value) || 0,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="input-halves">
                      <div className="contact-input-wrap">
                        <label className="text-small" style={{ fontWeight: 500 }}>
                          Finish/SDL (kN/m²)
                        </label>
                        <input
                          type="number"
                          className="text-field"
                          value={structInputs.sdl || ""}
                          min="0"
                          step="0.1"
                          onChange={(e) =>
                            setStructInputs((p) => ({
                              ...p,
                              sdl: parseFloat(e.target.value) || 0,
                            }))
                          }
                        />
                      </div>
                      <div className="contact-input-wrap">
                        <label className="text-small" style={{ fontWeight: 500 }}>
                          Slab Thickness (mm)
                        </label>
                        <input
                          type="number"
                          className="text-field"
                          value={structInputs.thickness || ""}
                          min="0"
                          onChange={(e) =>
                            setStructInputs((p) => ({
                              ...p,
                              thickness: parseFloat(e.target.value) || 0,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="input-halves">
                      <div className="contact-input-wrap">
                        <label className="text-small" style={{ fontWeight: 500 }}>
                          Concrete Grade
                        </label>
                        <select
                          className="text-field"
                          value={structInputs.concreteGrade}
                          onChange={(e) =>
                            setStructInputs((p) => ({
                              ...p,
                              concreteGrade: parseFloat(e.target.value),
                            }))
                          }
                        >
                          {CONCRETE_GRADES.map((g) => (
                            <option key={g} value={g}>
                              M{g}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="contact-input-wrap">
                        <label className="text-small" style={{ fontWeight: 500 }}>
                          Exposure Condition
                        </label>
                        <select
                          className="text-field"
                          value={structInputs.exposure}
                          onChange={(e) =>
                            setStructInputs((p) => ({
                              ...p,
                              exposure: e.target.value as
                                | "interior"
                                | "exterior"
                                | "aggressive",
                            }))
                          }
                        >
                          <option value="interior">Interior</option>
                          <option value="exterior">Exterior</option>
                          <option value="aggressive">Aggressive / Marine</option>
                        </select>
                      </div>
                    </div>
                    <div className="contact-input-wrap">
                      <label className="text-small" style={{ fontWeight: 500 }}>
                        Clear Cover (mm)
                      </label>
                      <input
                        type="number"
                        className="text-field"
                        value={structInputs.cover || ""}
                        min="0"
                        onChange={(e) =>
                          setStructInputs((p) => ({
                            ...p,
                            cover: parseFloat(e.target.value) || 0,
                          }))
                        }
                      />
                    </div>
                  </div>
                )}

                <div className="section-divider plan-divider-2"></div>

                <div className="contact-input-wrap">
                  <label className="text-small" style={{ fontWeight: 500 }}>
                    Wastage / Overlap (%)
                  </label>
                  <input
                    type="number"
                    className="text-field"
                    value={dims.wastage || ""}
                    min="0"
                    onChange={(e) =>
                      setDims((p) => ({
                        ...p,
                        wastage: parseFloat(e.target.value) || 0,
                      }))
                    }
                  />
                </div>

                <div className="input-halves">
                  <div className="contact-input-wrap">
                    <label className="text-small" style={{ fontWeight: 500 }}>
                      RebarX Price (₹/kg)
                    </label>
                    <input
                      type="number"
                      className="text-field"
                      value={dims.rxPrice || ""}
                      min="0"
                      onChange={(e) =>
                        setDims((p) => ({
                          ...p,
                          rxPrice: parseFloat(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                  <div className="contact-input-wrap">
                    <label className="text-small" style={{ fontWeight: 500 }}>
                      TMT Price (₹/kg)
                    </label>
                    <input
                      type="number"
                      className="text-field"
                      value={dims.tmtPrice || ""}
                      min="0"
                      onChange={(e) =>
                        setDims((p) => ({
                          ...p,
                          tmtPrice: parseFloat(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="plan-button-wrap" style={{ marginTop: "auto", paddingTop: "16px" }}>
                  <button
                    className="cta-main"
                    onClick={calculate}
                    disabled={!isFormValid || isCalculating}
                    style={{
                      opacity: !isFormValid || isCalculating ? 0.6 : 1,
                      cursor: !isFormValid || isCalculating ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    {isCalculating ? "Calculating..." : "Calculate Quantity"}
                  </button>
                </div>
              </div>
            </div>

            {/* RESULTS CARD */}
            <div
              className="pricing-cards last"
              style={{ width: "100%", position: "relative", minHeight: "400px" }}
            >
              <div className="plan-header">
                <div className="plan-name-wrap">
                  <div className="plan-title">
                    {results ? (
                      <CheckCircle className="icon-plan" style={{ color: "var(--accent)" }} />
                    ) : (
                      <Calculator className="icon-plan" />
                    )}
                    <div className="text-h6">Results</div>
                  </div>
                  <div className="text-small">
                    {results ? "Your rebar quantity & cost estimate" : "Results appear here after you calculate"}
                  </div>
                </div>
                <div className="section-divider plan-divider semi-light-divider-plan"></div>
              </div>

              {!results || !q ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "300px",
                    opacity: 0.6,
                  }}
                >
                  <Calculator size={48} style={{ marginBottom: "16px" }} />
                  <div className="text-body">Enter slab dimensions and click Calculate</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div
                    style={{
                      filter: formSubmitted ? "none" : "blur(8px)",
                      pointerEvents: formSubmitted ? "auto" : "none",
                      transition: "filter 0.3s ease",
                    }}
                  >
                    {results.structural && (
                      <>
                        <div className="label text-semi-light" style={{ marginBottom: 12 }}>
                          Suggested Design (Preliminary)
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: 16 }}>
                          <div className="check-wrap">
                            <div className="check-icon-wrap"><Ruler size={14} /></div>
                            <div className="text-body">
                              <strong>Suggested:</strong> {results.structural.barDia}mm RebarX GFRP bars @{" "}
                              {results.structural.spacingMm}mm c/c
                            </div>
                          </div>
                          <div className="check-wrap">
                            <div className="check-icon-wrap"><TrendingUp size={14} /></div>
                            <div className="text-body">
                              <strong>Design Span:</strong> {results.structural.designSpan.toFixed(2)} m (shorter side) |{" "}
                              Mu: {results.structural.mu.toFixed(1)} kN·m/m
                            </div>
                          </div>
                          <div className="check-wrap">
                            <div
                              className="check-icon-wrap"
                              style={{ backgroundColor: results.structural.capacityOk ? "var(--accent)" : "#e05a5a" }}
                            >
                              {results.structural.capacityOk ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                            </div>
                            <div className="text-body">
                              <strong>Capacity Check:</strong>{" "}
                              {results.structural.capacityOk ? "OK" : "Not adequate - increase thickness"}
                            </div>
                          </div>
                          <div className="check-wrap">
                            <div
                              className="check-icon-wrap"
                              style={{ backgroundColor: results.structural.deflectionOk ? "var(--accent)" : "#e0a35a" }}
                            >
                              {results.structural.deflectionOk ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                            </div>
                            <div className="text-body">
                              <strong>Deflection Guidance:</strong>{" "}
                              {results.structural.deflectionOk
                                ? "Thickness adequate"
                                : `Recommend thickness ≥ ${Math.ceil(results.structural.hMinDeflection)}mm`}
                            </div>
                          </div>
                        </div>
                        <div className="section-divider plan-divider-2 semi-light-divider-plan" style={{ marginBottom: 16 }}></div>
                      </>
                    )}

                    <div
                      style={{
                        backgroundColor: "var(--accent)",
                        borderRadius: "var(--radius--small)",
                        padding: "16px",
                        textAlign: "center",
                      }}
                    >
                      <div className="text-h6" style={{ color: "var(--dark)", marginBottom: 4 }}>
                        <strong>Total RebarX Required</strong>
                      </div>
                      <div className="text-h4" style={{ color: "var(--dark)", marginBottom: 4 }}>
                        {q.finalLength.toFixed(1)} m
                      </div>
                      <div className="text-small" style={{ color: "var(--semi-transparent-dark)" }}>
                        {q.diameter}mm dia, {q.gfrpWeight.toFixed(1)} kg total
                      </div>
                    </div>

                    <div className="label text-semi-light" style={{ margin: "16px 0 12px" }}>
                      Quantity Breakdown
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div className="check-wrap">
                        <div className="check-icon-wrap"><Ruler size={14} /></div>
                        <div className="text-body">
                          <strong>Bars:</strong> {q.barsL} along length, {q.barsB} along breadth
                        </div>
                      </div>
                      <div className="check-wrap">
                        <div className="check-icon-wrap"><Ruler size={14} /></div>
                        <div className="text-body">
                          <strong>Net Length:</strong> {q.netLength.toFixed(1)} m
                        </div>
                      </div>
                      <div className="check-wrap">
                        <div className="check-icon-wrap"><Weight size={14} /></div>
                        <div className="text-body">
                          <strong>Total RebarX Weight:</strong> {q.gfrpWeight.toFixed(1)} kg
                        </div>
                      </div>
                    </div>

                    <div className="section-divider plan-divider-2 semi-light-divider-plan" style={{ margin: "16px 0" }}></div>

                    <div className="label text-semi-light" style={{ marginBottom: 12 }}>
                      RebarX vs TMT Cost
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div className="check-wrap">
                        <div className="check-icon-wrap"><DollarSign size={14} /></div>
                        <div className="text-body">
                          <strong>RebarX Total Cost:</strong> ₹{Math.round(rxCost).toLocaleString()}
                        </div>
                      </div>
                      <div className="check-wrap">
                        <div className="check-icon-wrap"><DollarSign size={14} /></div>
                        <div className="text-body">
                          <strong>TMT Total Cost:</strong> ₹{Math.round(tmtCost).toLocaleString()}
                        </div>
                      </div>
                      <div className="check-wrap">
                        <div className="check-icon-wrap" style={{ backgroundColor: "var(--accent)", color: "var(--dark)" }}>
                          <TrendingUp size={14} />
                        </div>
                        <div className="text-body">
                          <strong>Savings:</strong> ₹{Math.round(savings).toLocaleString()} ({savingsPct.toFixed(1)}%)
                        </div>
                      </div>
                    </div>

                    {results.structural && (
                      <div className="text-small" style={{ opacity: 0.6, marginTop: 12 }}>
                        Preliminary sizing only, based on simplified ACI 440.11-22 flexural design.
                        Final reinforcement drawings must be verified by a qualified structural engineer.
                      </div>
                    )}
                  </div>

                  {!formSubmitted && (
                    <div
                      style={{
                        position: "absolute",
                        top: "140px",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "24px",
                        zIndex: 10,
                        textAlign: "center",
                      }}
                    >
                      <div className="text-body" style={{ marginBottom: 12, fontSize: 16 }}>
                        🔒 Enter your details to unlock the full result
                      </div>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        style={{
                          padding: "13px 20px",
                          borderRadius: "20px",
                          border: "none",
                          marginBottom: "12px",
                          width: "100%",
                          maxWidth: "300px",
                          fontSize: "16px",
                          color: "#000",
                          outline: "none",
                        }}
                      />
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        style={{
                          padding: "13px 20px",
                          borderRadius: "20px",
                          border: "none",
                          marginBottom: "12px",
                          width: "100%",
                          maxWidth: "300px",
                          fontSize: "16px",
                          color: "#000",
                          outline: "none",
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Enter your place / city"
                        value={userPlace}
                        onChange={(e) => setUserPlace(e.target.value)}
                        style={{
                          padding: "13px 20px",
                          borderRadius: "20px",
                          border: "none",
                          marginBottom: "12px",
                          width: "100%",
                          maxWidth: "300px",
                          fontSize: "16px",
                          color: "#000",
                          outline: "none",
                        }}
                      />
                      <button
                        onClick={handleUnlock}
                        disabled={isSubmitting}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: isSubmitting ? "#ccc" : "#eaece4",
                          color: "#000",
                          border: "none",
                          borderRadius: "20px",
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                          fontSize: "16px",
                        }}
                      >
                        {isSubmitting ? "Submitting..." : "Unlock Results"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .slab-calc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
