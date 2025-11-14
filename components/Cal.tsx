

"use client";

import React, { useEffect, useState } from "react";
import {
  Calculator,
  DollarSign,
  Activity,
  Wrench,
  BarChart3,
  CheckCircle,
  Zap,
  TrendingUp,
  Leaf,
  Shield,
  Clock,
} from "lucide-react";

import { Trees } from "lucide-react";

interface CalculatorInputs {
  constructionType: string;
  builtUpArea: number;
  floorArea: number;
  replacementPercentage: number;
  tmtCost: number;
  gfrpCost: number;
}

// interface CalculationResults {
//   materialCalculations: {
//     totalTmtRebarKg: number;
//     tmtReplacementKg: number;
//     gfrpRebarKg: number;
//     remainingTmtKg: number;
//     weightReductionPercentage: number;
//   };
//   costAnalysis: {
//     originalTmtCost: number;
//     newTotalCost: number;
//     totalTmtCost: number;
//     totalGfrpCost: number;
//     tmtLifetimeCost: number;
//     gfrpLifetimeCost: number;
//   };
//   directSavings: {
//     materialCostDifference: number;
//     transportSavings: number;
//     laborSavings: number;
//     timeSavings: number;
//     concreteCoverSavings: number;
//     totalDirectSavings: number;
//   };
//   indirectSavings: {
//     maintenanceSavings: number;
//     energySavings: number;
//     totalIndirectSavings: number;
//     fiveYearMaintenanceSavings: number;
//     fiveYearIndirectSavings: number;
//   };
//   environmentalBenefits: {
//     tmtCo2Emissions: number;
//     gfrpCo2Emissions: number;
//     netCo2Savings: number;
//     treesEquivalent: number;
//     gfrpLifespan: number;
//     tmtLifespan: number;
//     maintenanceFrequencyReduction: number;
//   };
//   summary: {
//     totalFiveYearSavings: number;
//     fiveYearMaterialSavings: number;
//     roiPercentage: number;
//     paybackPeriodYears: number;
//     newFiveYear: number;
//   };
//   nonQuantifiableBenefits: string[];
// }

// const constructionTypes = [
//   { value: "residential", label: "Residential Building" },
//   { value: "commercial", label: "Commercial Building" },
//   { value: "industrial", label: "Industrial Structure" },
//   { value: "civil", label: "Civil Infrastructure" },
//   { value: "heavy_industrial", label: "Heavy Industrial" },
// ];










interface CalculationResults {
  materialCalculations: {
    totalTmtRebarKg: number;
    tmtReplacementKg: number;
    gfrpRebarKg: number;
    remainingTmtKg: number;
    weightReductionPercentage: number;
  };
  costAnalysis: {
    originalTmtCost: number;
    newTotalCost: number;
    totalTmtCost: number;
    totalGfrpCost: number;
    tmtLifetimeCost: number;
    gfrpLifetimeCost: number;
  };
  directSavings: {
    materialCostDifference: number;
    transportSavings: number;
    laborSavings: number;
    timeSavings: number;
    concreteCoverSavings: number;
    totalDirectSavings: number;
  };
  indirectSavings: {
    maintenanceSavings: number;
    energySavings: number;
    totalIndirectSavings: number;
    fiveYearMaintenanceSavings: number;
    fiveYearIndirectSavings: number;
  };
  environmentalBenefits: {
    tmtCo2Emissions: number;
    gfrpCo2Emissions: number;
    netCo2Savings: number;
    treesEquivalent: number;
    gfrpLifespan: number;
    tmtLifespan: number;
    maintenanceFrequencyReduction: number;
  };
  summary: {
    totalFiveYearSavings: number;
    fiveYearMaterialSavings: number;
    roiPercentage: number;
    paybackPeriodYears: number;
    newFiveYear: number;
  };
  nonQuantifiableBenefits: string[];
}

const constructionTypes = [
  { value: "residential", label: "Residential Building" },
  { value: "commercial", label: "Commercial Building" },
  { value: "industrial", label: "Industrial Structure" },
  { value: "civil", label: "Civil Infrastructure" },
  { value: "heavy_industrial", label: "Heavy Industrial" },
];

const Calculatorss: React.FC = ({ calc  }) => {
  // const [inputs, setInputs] = useState<CalculatorInputs>({
  //   constructionType: "",
  //   builtUpArea: 0,
  //   floorArea: 0,
  //   replacementPercentage: 100,
  //   tmtCost: 0,
  //   gfrpCost: 0,
  // });

  // const [results, setResults] = useState<CalculationResults | null>(null);
  // const [isCalculating, setIsCalculating] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);

  // const isFormValid =
  //   inputs.constructionType &&
  //   inputs.builtUpArea > 0 &&
  //   inputs.tmtCost > 0 &&
  //   inputs.gfrpCost > 0;

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 768);
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // const gridStyle = {
  //   display: "grid",
  //   gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
  //   gridColumnGap: "32px",
  //   gridRowGap: "32px",
  //   width: "100%",
  //   alignItems: "flex-start",
  // };

  // const handleInputChange = (
  //   field: keyof CalculatorInputs,
  //   value: string | number
  // ) => {
  //   setInputs((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };

  // const calculateSavings = async () => {
  //   if (!isFormValid) {
  //     alert("Please fill in all required fields with valid values");
  //     return;
  //   }

  //   setIsCalculating(true);
  //   await new Promise((resolve) => setTimeout(resolve, 800));

  //   // Construction type factors (kg per sq ft)
  //   const constructionFactors: { [key: string]: number } = {
  //     residential: 4,
  //     commercial: 5,
  //     industrial: 6,
  //     civil: 7,
  //     heavy_industrial: 8,
  //   };

  //   // Parse inputs with consistent precision
  //   const builtUpArea = parseFloat(inputs.builtUpArea.toString()) || 0;
  //   const replacementPercentage =
  //     parseFloat(inputs.replacementPercentage.toString()) || 100;
  //   const tmtCost = parseFloat(inputs.tmtCost.toString()) || 0;
  //   const gfrpCost = parseFloat(inputs.gfrpCost.toString()) || 0;

  //   // Calculate TMT rebar usage
  //   const rebarFactor = constructionFactors[inputs.constructionType] || 5;
  //   const totalTmtRebarKg = builtUpArea * rebarFactor;

  //   // Calculate replacement amounts
  //   const tmtReplacementKg = totalTmtRebarKg * (replacementPercentage / 100);
  //   const remainingTmtKg = totalTmtRebarKg - tmtReplacementKg;

  //   // GFRP rebar weight calculation (1/5 of TMT weight * 1.3 factor)
  //   const gfrpRebarKg = Number(((tmtReplacementKg * 1.3) / 5).toFixed(4));

  //   // Weight reduction calculation
  //   const weightReductionPercentage =
  //     tmtReplacementKg > 0
  //       ? Number(
  //           (
  //             ((tmtReplacementKg - gfrpRebarKg) / tmtReplacementKg) *
  //             100
  //           ).toFixed(4)
  //         )
  //       : 0;

  //   // Cost calculations
  //   const totalTmtCost = Number((remainingTmtKg * tmtCost).toFixed(4));
  //   const totalGfrpCost = Number((gfrpRebarKg * gfrpCost).toFixed(4));
  //   const originalTmtCost = Number((totalTmtRebarKg * tmtCost).toFixed(4));
  //   const newTotalCost = Number((totalTmtCost + totalGfrpCost).toFixed(4));

  //   // Direct savings calculations
  //   const materialCostDifference = Number(
  //     (originalTmtCost - newTotalCost).toFixed(4)
  //   );
  //   const transportSavings = Number((materialCostDifference * 0.3).toFixed(4));
  //   const laborSavings = Number((materialCostDifference * 0.2).toFixed(4));
  //   const timeSavings = Number((newTotalCost * 0.15).toFixed(4));
  //   const concreteCoverSavings = Number((newTotalCost * 0.05).toFixed(4));
  //   const totalDirectSavings = Number(
  //     (
  //       materialCostDifference +
  //       transportSavings +
  //       laborSavings +
  //       timeSavings +
  //       concreteCoverSavings
  //     ).toFixed(4)
  //   );

  //   // Indirect savings calculations
  //   const annualMaintenanceTmt = Number((originalTmtCost * 0.01).toFixed(4));
  //   const annualMaintenanceGfrp = Number((newTotalCost * 0.007).toFixed(4));
  //   const annualMaintenanceSavings = Number(
  //     (annualMaintenanceTmt - annualMaintenanceGfrp).toFixed(4)
  //   );
  //   const hvacCostEstimate = Number((originalTmtCost * 0.03).toFixed(4));
  //   const energySavings = Number((hvacCostEstimate * 0.02).toFixed(4));
  //   const totalIndirectSavingsAnnual = Number(
  //     (annualMaintenanceSavings + energySavings).toFixed(4)
  //   );

  //   // 5-year savings calculations
  //   const fiveYearPeriod = 5;
  //   const gfrpLifespan = 100;
  //   const tmtLifespan = 30;
  //   const tmtReplacements = Math.floor(fiveYearPeriod / tmtLifespan); // 0 for 5 years
  //   const tmtFiveYearCost = Number(
  //     (originalTmtCost * (1 + tmtReplacements)).toFixed(4)
  //   );
  //   const gfrpFiveYearCost = Number(newTotalCost.toFixed(4));
  //   const fiveYearMaterialSavings = Number(
  //     (tmtFiveYearCost - gfrpFiveYearCost).toFixed(4)
  //   );
  //   const fiveYearMaintenanceSavings = Number(
  //     (annualMaintenanceSavings * fiveYearPeriod).toFixed(4)
  //   );
  //   const fiveYearIndirectSavings = Number(
  //     (totalIndirectSavingsAnnual * fiveYearPeriod).toFixed(4)
  //   );
  //   const totalFiveYearSavings = Number(
  //     (
  //       fiveYearMaterialSavings +
  //       fiveYearMaintenanceSavings +
  //       fiveYearIndirectSavings
  //     ).toFixed(4)
  //   );

  //   // Environmental benefits
  //   const tmtCo2Emissions = Number((tmtReplacementKg * 2.5).toFixed(4));
  //   const gfrpCo2Emissions = Number((gfrpRebarKg * 1.8).toFixed(4));
  //   const netCo2Savings = Number(
  //     (tmtCo2Emissions - gfrpCo2Emissions).toFixed(4)
  //   );
  //   const treesEquivalent = Math.round(netCo2Savings / 25);

  //   // ROI and payback calculations for 5 years
  //   const roiPercentage =
  //     newTotalCost > 0
  //       ? Number(((totalFiveYearSavings / newTotalCost) * 100).toFixed(4))
  //       : 0;
  //   const paybackPeriod =
  //     totalIndirectSavingsAnnual > 0
  //       ? Number((newTotalCost / totalIndirectSavingsAnnual).toFixed(4))
  //       : 0;

  //   // Non-quantifiable benefits
  //   const nonQuantifiableBenefits = [
  //     "Enhanced Structural Integrity - Superior tensile strength and flexibility",
  //     "Electromagnetic Transparency - No interference with communication systems",
  //     "Thermal Insulation - Better thermal properties reducing energy costs",
  //     "Chemical Resistance - Resistance to acids, alkalis, and salts",
  //     "Non-Magnetic Properties - Suitable for sensitive electronic environments",
  //     "Reduced Health Risks - No risk of rust-related health issues",
  //     "Aesthetic Benefits - No rust stains on concrete surfaces",
  //     "Regulatory Compliance - Easier compliance with environmental regulations",
  //     "Future-Proofing - Technology alignment with sustainable construction trends",
  //     "Brand Value Enhancement - Association with green building practices",
  //   ];

  //   const calculationResults: CalculationResults = {
  //     materialCalculations: {
  //       totalTmtRebarKg: Number(totalTmtRebarKg.toFixed(2)),
  //       tmtReplacementKg: Number(tmtReplacementKg.toFixed(2)),
  //       gfrpRebarKg: Number(gfrpRebarKg.toFixed(2)),
  //       remainingTmtKg: Number(remainingTmtKg.toFixed(2)),
  //       weightReductionPercentage: Number(weightReductionPercentage.toFixed(2)),
  //     },
  //     costAnalysis: {
  //       originalTmtCost: Number(originalTmtCost.toFixed(2)),
  //       newTotalCost: Number(newTotalCost.toFixed(2)),
  //       totalTmtCost: Number(totalTmtCost.toFixed(2)),
  //       totalGfrpCost: Number(totalGfrpCost.toFixed(2)),
  //       tmtLifetimeCost: Number(
  //         (
  //           originalTmtCost *
  //           (1 + Math.floor(gfrpLifespan / tmtLifespan))
  //         ).toFixed(2)
  //       ),
  //       gfrpLifetimeCost: Number(newTotalCost.toFixed(2)),
  //     },
  //     directSavings: {
  //       materialCostDifference: Number(materialCostDifference.toFixed(2)),
  //       transportSavings: Number(transportSavings.toFixed(2)),
  //       laborSavings: Number(laborSavings.toFixed(2)),
  //       timeSavings: Number(timeSavings.toFixed(2)),
  //       concreteCoverSavings: Number(concreteCoverSavings.toFixed(2)),
  //       totalDirectSavings: Number(totalDirectSavings.toFixed(2)),
  //     },
  //     indirectSavings: {
  //       maintenanceSavings: Number(annualMaintenanceSavings.toFixed(2)),
  //       energySavings: Number(energySavings.toFixed(2)),
  //       totalIndirectSavings: Number(totalIndirectSavingsAnnual.toFixed(2)),
  //       fiveYearMaintenanceSavings: Number(
  //         fiveYearMaintenanceSavings.toFixed(2)
  //       ),
  //       fiveYearIndirectSavings: Number(fiveYearIndirectSavings.toFixed(2)),
  //     },
  //     environmentalBenefits: {
  //       tmtCo2Emissions: Number(tmtCo2Emissions.toFixed(2)),
  //       gfrpCo2Emissions: Number(gfrpCo2Emissions.toFixed(2)),
  //       netCo2Savings: Number(netCo2Savings.toFixed(2)),
  //       treesEquivalent,
  //       gfrpLifespan,
  //       tmtLifespan,
  //       maintenanceFrequencyReduction: 70,
  //     },
  //     summary: {
  //       totalFiveYearSavings: Number(totalFiveYearSavings.toFixed(2)),
  //       fiveYearMaterialSavings: Number(fiveYearMaterialSavings.toFixed(2)),
  //       roiPercentage: Number(roiPercentage.toFixed(2)),
  //       paybackPeriodYears: Number(paybackPeriod.toFixed(1)),
  //       newFiveYear: Number(materialCostDifference + laborSavings),
  //     },
  //     nonQuantifiableBenefits,
  //   };

  //   // const newFiveYear = materialCostDifference + laborSavings;

  //   setResults(calculationResults);
  //   setIsCalculating(false);
  // };

  // const clearCalculation = () => {
  //   setResults(null);
  //   setInputs({
  //     constructionType: "",
  //     builtUpArea: 0,
  //     floorArea: 0,
  //     replacementPercentage: 100,
  //     tmtCost: 0,
  //     gfrpCost: 0,
  //   });
  // };










  const [inputs, setInputs] = useState<CalculatorInputs>({
    constructionType: "",
    builtUpArea: 0,
    floorArea: 0,
    replacementPercentage: 100,
    tmtCost: 0,
    gfrpCost: 0,
  });

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isFormValid =
    inputs.constructionType &&
    inputs.builtUpArea > 0 &&
    inputs.tmtCost > 0 &&
    inputs.gfrpCost > 0;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gridColumnGap: "32px",
    gridRowGap: "32px",
    width: "100%",
    alignItems: "flex-start",
  };

  const handleInputChange = (
    field: keyof CalculatorInputs,
    value: string | number
  ) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateSavings = async () => {
    if (!isFormValid) {
      alert("Please fill in all required fields with valid values");
      return;
    }

    setIsCalculating(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Construction type factors (kg per sq ft)
    const constructionFactors: { [key: string]: number } = {
      residential: 4,
      commercial: 5,
      industrial: 6,
      civil: 7,
      heavy_industrial: 8,
    };

    // Parse inputs with consistent precision
    const builtUpArea = parseFloat(inputs.builtUpArea.toString()) || 0;
    const replacementPercentage =
      parseFloat(inputs.replacementPercentage.toString()) || 100;
    const tmtCost = parseFloat(inputs.tmtCost.toString()) || 0;
    const gfrpCost = parseFloat(inputs.gfrpCost.toString()) || 0;

    // Calculate TMT rebar usage
    const rebarFactor = constructionFactors[inputs.constructionType] || 5;
    const totalTmtRebarKg = builtUpArea * rebarFactor;

    // Calculate replacement amounts
    const tmtReplacementKg = totalTmtRebarKg * (replacementPercentage / 100);
    const remainingTmtKg = totalTmtRebarKg - tmtReplacementKg;

    // GFRP rebar weight calculation (1/5 of TMT weight * 1.3 factor)
    const gfrpRebarKg = Number(((tmtReplacementKg * 1.3) / 5).toFixed(4));

    // Weight reduction calculation
    const weightReductionPercentage =
      tmtReplacementKg > 0
        ? Number(
            (
              ((tmtReplacementKg - gfrpRebarKg) / tmtReplacementKg) *
              100
            ).toFixed(4)
          )
        : 0;

    // Cost calculations
    const totalTmtCost = Number((remainingTmtKg * tmtCost).toFixed(4));
    const totalGfrpCost = Number((gfrpRebarKg * gfrpCost).toFixed(4));
    const originalTmtCost = Number((totalTmtRebarKg * tmtCost).toFixed(4));
    const newTotalCost = Number((totalTmtCost + totalGfrpCost).toFixed(4));

    // Direct savings calculations
    const materialCostDifference = Number(
      (originalTmtCost - newTotalCost).toFixed(4)
    );
    const transportSavings = Number((materialCostDifference * 0.3).toFixed(4));
    const laborSavings = Number((materialCostDifference * 0.2).toFixed(4));
    const timeSavings = Number((newTotalCost * 0.15).toFixed(4));
    const concreteCoverSavings = Number((newTotalCost * 0.05).toFixed(4));
    const totalDirectSavings = Number(
      (
        materialCostDifference +
        transportSavings +
        laborSavings +
        timeSavings +
        concreteCoverSavings
      ).toFixed(4)
    );

    // Indirect savings calculations
    const annualMaintenanceTmt = Number((originalTmtCost * 0.01).toFixed(4));
    const annualMaintenanceGfrp = Number((newTotalCost * 0.007).toFixed(4));
    const annualMaintenanceSavings = Number(
      (annualMaintenanceTmt - annualMaintenanceGfrp).toFixed(4)
    );
    const hvacCostEstimate = Number((originalTmtCost * 0.03).toFixed(4));
    const energySavings = Number((hvacCostEstimate * 0.02).toFixed(4));
    const totalIndirectSavingsAnnual = Number(
      (annualMaintenanceSavings + energySavings).toFixed(4)
    );

    // 5-year savings calculations
    const fiveYearPeriod = 5;
    const gfrpLifespan = 100;
    const tmtLifespan = 30;
    const tmtReplacements = Math.floor(fiveYearPeriod / tmtLifespan); // 0 for 5 years
    const tmtFiveYearCost = Number(
      (originalTmtCost * (1 + tmtReplacements)).toFixed(4)
    );
    const gfrpFiveYearCost = Number(newTotalCost.toFixed(4));
    const fiveYearMaterialSavings = Number(
      (tmtFiveYearCost - gfrpFiveYearCost).toFixed(4)
    );
    const fiveYearMaintenanceSavings = Number(
      (annualMaintenanceSavings * fiveYearPeriod).toFixed(4)
    );
    const fiveYearIndirectSavings = Number(
      (totalIndirectSavingsAnnual * fiveYearPeriod).toFixed(4)
    );
    const totalFiveYearSavings = Number(
      (
        fiveYearMaterialSavings +
        fiveYearMaintenanceSavings +
        fiveYearIndirectSavings
      ).toFixed(4)
    );

    // Environmental benefits
    const tmtCo2Emissions = Number((tmtReplacementKg * 2.5).toFixed(4));
    const gfrpCo2Emissions = Number((gfrpRebarKg * 1.8).toFixed(4));
    const netCo2Savings = Number(
      (tmtCo2Emissions - gfrpCo2Emissions).toFixed(4)
    );
    const treesEquivalent = Math.round(netCo2Savings / 25);

    // ROI and payback calculations for 5 years
    const roiPercentage =
      newTotalCost > 0
        ? Number(((totalFiveYearSavings / newTotalCost) * 100).toFixed(4))
        : 0;
    const paybackPeriod =
      totalIndirectSavingsAnnual > 0
        ? Number((newTotalCost / totalIndirectSavingsAnnual).toFixed(4))
        : 0;

    // Non-quantifiable benefits
    const nonQuantifiableBenefits = [
      "Enhanced Structural Integrity - Superior tensile strength and flexibility",
      "Electromagnetic Transparency - No interference with communication systems",
      "Thermal Insulation - Better thermal properties reducing energy costs",
      "Chemical Resistance - Resistance to acids, alkalis, and salts",
      "Non-Magnetic Properties - Suitable for sensitive electronic environments",
      "Reduced Health Risks - No risk of rust-related health issues",
      "Aesthetic Benefits - No rust stains on concrete surfaces",
      "Regulatory Compliance - Easier compliance with environmental regulations",
      "Future-Proofing - Technology alignment with sustainable construction trends",
      "Brand Value Enhancement - Association with green building practices",
    ];

    const newFiveYear = materialCostDifference + laborSavings;

    const calculationResults: CalculationResults = {
      materialCalculations: {
        totalTmtRebarKg: Number(totalTmtRebarKg.toFixed(2)),
        tmtReplacementKg: Number(tmtReplacementKg.toFixed(2)),
        gfrpRebarKg: Number(gfrpRebarKg.toFixed(2)),
        remainingTmtKg: Number(remainingTmtKg.toFixed(2)),
        weightReductionPercentage: Number(weightReductionPercentage.toFixed(2)),
      },
      costAnalysis: {
        originalTmtCost: Number(originalTmtCost.toFixed(2)),
        newTotalCost: Number(newTotalCost.toFixed(2)),
        totalTmtCost: Number(totalTmtCost.toFixed(2)),
        totalGfrpCost: Number(totalGfrpCost.toFixed(2)),
        tmtLifetimeCost: Number(
          (
            originalTmtCost *
            (1 + Math.floor(gfrpLifespan / tmtLifespan))
          ).toFixed(2)
        ),
        gfrpLifetimeCost: Number(newTotalCost.toFixed(2)),
      },
      directSavings: {
        materialCostDifference: Number(materialCostDifference.toFixed(2)),
        transportSavings: Number(transportSavings.toFixed(2)),
        laborSavings: Number(laborSavings.toFixed(2)),
        timeSavings: Number(timeSavings.toFixed(2)),
        concreteCoverSavings: Number(concreteCoverSavings.toFixed(2)),
        totalDirectSavings: Number(totalDirectSavings.toFixed(2)),
      },
      indirectSavings: {
        maintenanceSavings: Number(annualMaintenanceSavings.toFixed(2)),
        energySavings: Number(energySavings.toFixed(2)),
        totalIndirectSavings: Number(totalIndirectSavingsAnnual.toFixed(2)),
        fiveYearMaintenanceSavings: Number(
          fiveYearMaintenanceSavings.toFixed(2)
        ),
        fiveYearIndirectSavings: Number(fiveYearIndirectSavings.toFixed(2)),
      },
      environmentalBenefits: {
        tmtCo2Emissions: Number(tmtCo2Emissions.toFixed(2)),
        gfrpCo2Emissions: Number(gfrpCo2Emissions.toFixed(2)),
        netCo2Savings: Number(netCo2Savings.toFixed(2)),
        treesEquivalent,
        gfrpLifespan,
        tmtLifespan,
        maintenanceFrequencyReduction: 70,
      },
      summary: {
        totalFiveYearSavings: Number(totalFiveYearSavings.toFixed(2)),
        fiveYearMaterialSavings: Number(fiveYearMaterialSavings.toFixed(2)),
        roiPercentage: Number(roiPercentage.toFixed(2)),
        paybackPeriodYears: Number(paybackPeriod.toFixed(1)),
        // newFiveYear: Number(newFiveYear.toFixed(2)),
        newFiveYear: Number(
          Math.abs(materialCostDifference + laborSavings).toFixed(2)
        ),
      },
      nonQuantifiableBenefits,
    };

    setResults(calculationResults);
    setIsCalculating(false);
  };

  const clearCalculation = () => {
    setResults(null);
    setInputs({
      constructionType: "",
      builtUpArea: 0,
      floorArea: 0,
      replacementPercentage: 100,
      tmtCost: 0,
      gfrpCost: 0,
    });
  };

  // const [emailSubmitted, setEmailSubmitted] = useState(false);
  // const [userEmail, setUserEmail] = useState("");

  const [contactPage, setContactPage] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [formValues, setFormValues] = useState({});

  // // Email unlock states
  // const [userEmail, setUserEmail] = useState("");
  // const [emailSubmitted, setEmailSubmitted] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Your existing form handler
  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormValues((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // // Your existing form submit handler
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const res = await fetch(
  //       "https://rebar-xbackend.vercel.app/api/contact-submissions",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           formData: formValues,
  //         }),
  //       }
  //     );

  //     if (!res.ok) throw new Error("Submission failed");

  //     setSubmitted(true);
  //     setFormValues({});
  //   } catch (err) {
  //     console.error(err);
  //     setError(true);
  //   }
  // };

  // // Email submission handler
  // const handleEmailSubmit = async () => {
  //   if (!userEmail.includes("@")) {
  //     alert("Please enter a valid email");
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     const res = await fetch(
  //       "https://rebar-xbackend.vercel.app/api/contact-submissions",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           formData: {
  //             email: userEmail,
  //             name: "Analysis User",
  //             message: "Email submitted for analysis unlock",
  //           },
  //         }),
  //       }
  //     );

  //     if (!res.ok) throw new Error("Submission failed");

  //     setEmailSubmitted(true);
  //   } catch (err) {
  //     console.error("Error saving email:", err);
  //     alert("Failed to save email. Please try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Your existing form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://rebar-xbackend.vercel.app/api/contact-submissions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formData: formValues,
          }),
        }
      );

      if (!res.ok) throw new Error("Submission failed");

      setSubmitted(true);
      setFormValues({});
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  // Name and phone submission handler
  const handleNamePhoneSubmit = async () => {
    if (!userName.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!userPhone.trim() || userPhone.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(
        "https://rebar-xbackend.vercel.app/api/contact-submissions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formData: {
              email: "calculator.user@default.com", // Default email
              name: userName, // User's name
              message: userPhone, // Phone number as message
            },
          }),
        }
      );

      if (!res.ok) throw new Error("Submission failed");

      setFormSubmitted(true);
    } catch (err) {
      console.error("Error saving data:", err);
      alert("Failed to save information. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main-container" id="calculator">
      <div className="section-divider"></div>
      <div className="section">
        {/* Centered Hero Section */}
        <div className="headline-pricing">
          <div className="text-h2">{calc.title}</div>
          <div
            className="text-body"
            style={{ maxWidth: "600px", textAlign: "center" }}
          >
            {calc.subheading}
          </div>
        </div>

        {/* Centered Two-Column Layout with Fixed Width */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div style={gridStyle}>
            {/* Calculator Card - Fixed Width */}
            <div
              className="pricing-cards"
              style={{
                width: "100%",
                minHeight: "600px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="plan-header">
                <div className="plan-name-wrap">
                  <div className="plan-title">
                    <Calculator className="icon-plan" />
                    <div className="text-h6">Project Calculator</div>
                  </div>
                  <div className="text-small" style={{ opacity: 0.8 }}>
                    Enter your project details to calculate comprehensive 5-year
                    savings
                  </div>
                </div>
                <div className="section-divider plan-divider"></div>
              </div>

              <div
                className="plan-bottom-tile"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  flex: 1,
                }}
              >
                {/* Project Information Section */}
                <div>
                  <div
                    className="label text-semi-dark"
                    style={{ marginBottom: "12px" }}
                  >
                    Project Information
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <div className="contact-input-wrap">
                      <label
                        className="text-small"
                        style={{ fontWeight: "500" }}
                      >
                        Construction Type{" "}
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        className="text-field"
                        value={inputs.constructionType}
                        onChange={(e) =>
                          handleInputChange("constructionType", e.target.value)
                        }
                        style={{
                          backgroundColor: inputs.constructionType
                            ? "var(--bg)"
                            : "var(--light)",
                          transition: "background-color 0.2s",
                        }}
                      >
                        <option value="">Select Construction Type</option>
                        {constructionTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="input-halves">
                      <div className="contact-input-wrap">
                        <label
                          className="text-small"
                          style={{ fontWeight: "500" }}
                        >
                          Built-up Area (sq ft){" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="number"
                          className="text-field"
                          value={inputs.builtUpArea || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "builtUpArea",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          placeholder="e.g., 2000"
                          min="0"
                        />
                      </div>

                      <div className="contact-input-wrap">
                        <label
                          className="text-small"
                          style={{ fontWeight: "500" }}
                        >
                          Total Floor Area (sq ft)
                        </label>
                        <input
                          type="number"
                          className="text-field"
                          value={inputs.floorArea || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "floorArea",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          placeholder="e.g., 1800"
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="contact-input-wrap">
                      <label
                        className="text-small"
                        style={{ fontWeight: "500", marginBottom: "8px" }}
                      >
                        TMT Rebar Replacement: {inputs.replacementPercentage}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={inputs.replacementPercentage}
                        onChange={(e) =>
                          handleInputChange(
                            "replacementPercentage",
                            parseInt(e.target.value)
                          )
                        }
                        style={{
                          width: "100%",
                          height: "6px",
                          borderRadius: "3px",
                          background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${inputs.replacementPercentage}%, var(--border-dark) ${inputs.replacementPercentage}%, var(--border-dark) 100%)`,
                          outline: "none",
                          marginBottom: "8px",
                        }}
                      />
                      <div
                        className="text-small"
                        style={{ opacity: 0.7, textAlign: "center" }}
                      >
                        {inputs.replacementPercentage < 25 &&
                          "Minimal replacement"}
                        {inputs.replacementPercentage >= 25 &&
                          inputs.replacementPercentage < 75 &&
                          "Partial replacement"}
                        {inputs.replacementPercentage >= 75 &&
                          "Full replacement"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-divider plan-divider-2"></div>

                {/* Cost Information Section */}
                <div>
                  <div
                    className="label text-semi-dark"
                    style={{ marginBottom: "12px" }}
                  >
                    Cost Information
                  </div>

                  <div className="input-halves">
                    <div className="contact-input-wrap">
                      <label
                        className="text-small"
                        style={{ fontWeight: "500" }}
                      >
                        TMT Cost per kg (₹){" "}
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="number"
                        className="text-field"
                        value={inputs.tmtCost || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "tmtCost",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        placeholder="e.g., 75"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div className="contact-input-wrap">
                      <label
                        className="text-small"
                        style={{ fontWeight: "500" }}
                      >
                        GFRP Cost per kg (₹){" "}
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="number"
                        className="text-field"
                        value={inputs.gfrpCost || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "gfrpCost",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        placeholder="e.g., 180"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div
                  className="plan-button-wrap"
                  style={{ marginTop: "auto", paddingTop: "24px" }}
                >
                  <button
                    className="cta-main"
                    onClick={calculateSavings}
                    disabled={!isFormValid || isCalculating}
                    style={{
                      opacity: !isFormValid || isCalculating ? 0.6 : 1,
                      cursor:
                        !isFormValid || isCalculating
                          ? "not-allowed"
                          : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    {isCalculating ? (
                      <>
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            border: "2px solid transparent",
                            borderTop: "2px solid currentColor",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                          }}
                        ></div>
                        Calculating...
                      </>
                    ) : (
                      <>
                        <BarChart3 size={16} />
                        Calculate Savings
                      </>
                    )}
                  </button>

                  {results && (
                    <button
                      className="cta-main bg-color"
                      onClick={clearCalculation}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <Calculator size={16} />
                      New Calculation
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Results Card - Fixed Width */}
            {(!isMobile || (isMobile && results)) && (
              <div
                className="pricing-cards last"
                style={{
                  width: "100%",
                  minHeight: "600px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="plan-header">
                  <div className="plan-name-wrap">
                    <div className="plan-title">
                      {results ? (
                        <CheckCircle
                          className="icon-plan"
                          style={{ color: "var(--accent)" }}
                        />
                      ) : (
                        <BarChart3 className="icon-plan" />
                      )}
                      <div className="text-h6">Comprehensive Analysis</div>
                    </div>
                    <div className="text-small">
                      {results
                        ? "Your savings and environmental benefits"
                        : "Results will appear here after calculation"}
                    </div>
                  </div>
                  <div className="section-divider plan-divider semi-light-divider-plan"></div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    flex: 1,
                    position: "relative",
                  }}
                >
                  {results ? (
                    <>
                      {/* 5-Year Savings Highlight */}
                      <div
                        style={{
                          backgroundColor: "var(--accent)",
                          borderRadius: "var(--radius--small)",
                          padding: "16px",
                          textAlign: "center",
                        }}
                      >
                        <div
                          className="text-h6"
                          style={{ color: "var(--dark)", marginBottom: "4px" }}
                        >
                          <strong>Total Savings</strong>
                        </div>
                        <div
                          className="text-h4"
                          style={{ color: "var(--dark)", marginBottom: "4px" }}
                        >
                          ₹{results.summary.newFiveYear.toLocaleString()}
                          {/* ₹{results.summary.newFiveYear.toLocaleString()} */}
                        </div>
                        <div
                          className="text-small"
                          style={{ color: "var(--semi-transparent-dark)" }}
                        >
                          {/* ROI: {results.summary.roiPercentage.toFixed(1)}% |
                          Payback:{" "}
                          {results.summary.paybackPeriodYears.toFixed(1)} years */}
                        </div>
                      </div>

                      {/* Material Analysis */}
                      <div>
                        <div
                          className="label text-semi-light"
                          style={{ marginBottom: "12px" }}
                        >
                          Material Analysis
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          <div className="check-wrap">
                            <div className="check-icon-wrap">
                              <Activity size={14} />
                            </div>
                            <div className="text-body">
                              <strong>Total TMT Required:</strong>{" "}
                              {results.materialCalculations.totalTmtRebarKg.toLocaleString()}{" "}
                              kg
                            </div>
                          </div>
                          <div className="check-wrap">
                            <div className="check-icon-wrap">
                              <Wrench size={14} />
                            </div>
                            <div className="text-body">
                              <strong>RebarX Used:</strong>{" "}
                              {results.materialCalculations.gfrpRebarKg.toLocaleString()}{" "}
                              kg
                            </div>
                          </div>
                          <div className="check-wrap">
                            <div
                              className="check-icon-wrap"
                              style={{
                                backgroundColor: "var(--accent)",
                                color: "var(--dark)",
                              }}
                            >
                              <CheckCircle size={14} />
                            </div>
                            <div className="text-body">
                              <strong>Weight Reduction:</strong>{" "}
                              <span
                                style={{
                                  color: "var(--accent)",
                                  fontWeight: "bold",
                                }}
                              >
                                {results.materialCalculations.weightReductionPercentage.toFixed(
                                  1
                                )}
                                %
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="section-divider plan-divider-2 semi-light-divider-plan"></div>

                      {/* Environmental Benefits */}
                      <div
                        style={{
                          filter: formSubmitted ? "none" : "blur(8px)",
                          pointerEvents: formSubmitted ? "auto" : "none",
                          transition: "filter 0.3s ease",
                        }}
                      >
                        <div
                          className="label text-semi-light"
                          style={{ marginBottom: "12px" }}
                        >
                          Environmental Impact
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          <div className="check-wrap">
                            <div className="check-icon-wrap">
                              <Leaf size={14} />
                            </div>
                            <div className="text-body">
                              <strong>CO₂ Reduction:</strong>{" "}
                              {results.environmentalBenefits.netCo2Savings.toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 1,
                                  maximumFractionDigits: 1,
                                }
                              )}{" "}
                              kg
                            </div>
                          </div>
                          <div className="check-wrap">
                            <div
                              className="check-icon-wrap"
                              style={{ backgroundColor: "green" }}
                            >
                              <Trees size={14} />
                            </div>
                            <div
                              className="text-body"
                              style={{ color: "green" }}
                            >
                              <strong style={{ color: "white" }}>
                                Trees Equivalent:
                              </strong>{" "}
                              {results.environmentalBenefits.treesEquivalent.toLocaleString()}{" "}
                              trees/year
                            </div>
                          </div>
                          <div className="check-wrap">
                            <div className="check-icon-wrap">
                              <Clock size={14} />
                            </div>
                            <div className="text-body">
                              <strong>Lifespan:</strong> RebarX{" "}
                              {results.environmentalBenefits.gfrpLifespan} vs
                              TMT {results.environmentalBenefits.tmtLifespan}{" "}
                              years
                            </div>
                          </div>
                          <div className="check-wrap">
                            <div className="check-icon-wrap">
                              <Shield size={14} />
                            </div>
                            <div className="text-body">
                              <strong>Maintenance Reduction:</strong>{" "}
                              {
                                results.environmentalBenefits
                                  .maintenanceFrequencyReduction
                              }
                              %
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="section-divider plan-divider-2 semi-light-divider-plan"></div>

                      {/* Cost Breakdown */}
                      <div
                        style={{
                          filter: formSubmitted ? "none" : "blur(8px)",
                          pointerEvents: formSubmitted ? "auto" : "none",
                          transition: "filter 0.3s ease",
                        }}
                      >
                        <div
                          className="label text-semi-light"
                          style={{ marginBottom: "12px" }}
                        >
                          Cost Breakdown
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          <div className="check-wrap">
                            <div className="check-icon-wrap">
                              <DollarSign size={14} />
                            </div>
                            <div className="text-body">
                              <strong>Material Cost Difference:</strong> ₹
                              {results.directSavings.materialCostDifference.toLocaleString()}
                            </div>
                          </div>
                          {/* <div className="check-wrap">
                            <div className="check-icon-wrap">
                              <DollarSign size={14} />
                            </div>
                            <div className="text-body">
                              <strong>Transport Cost Savings:</strong> ₹
                              {results.directSavings.transportSavings.toLocaleString()}
                            </div>
                          </div> */}
                          <div className="check-wrap">
                            <div className="check-icon-wrap">
                              <DollarSign size={14} />
                            </div>
                            <div className="text-body">
                              <strong>Labor Cost Savings:</strong> ₹
                              {results.directSavings.laborSavings.toLocaleString()}
                            </div>
                          </div>
                          {/* <div className="check-wrap">
                            <div className="check-icon-wrap">
                              <DollarSign size={14} />
                            </div>
                            <div className="text-body">
                              <strong>Time Savings:</strong> ₹
                              {results.directSavings.timeSavings.toLocaleString()}
                            </div>
                          </div>
                          <div className="check-wrap">
                            <div className="check-icon-wrap">
                              <DollarSign size={14} />
                            </div>
                            <div className="text-body">
                              <strong>Concrete Cover Savings:</strong> ₹
                              {results.directSavings.concreteCoverSavings.toLocaleString()}
                            </div>
                          </div> */}
                          <div className="check-wrap">
                            <div className="check-icon-wrap">
                              <TrendingUp size={14} />
                            </div>
                            <div className="text-body">
                              <strong>Total Direct Savings:</strong> ₹
                              {results.summary.newFiveYear.toLocaleString()}
                              {/* {results.directSavings.totalDirectSavings.toLocaleString()} */}
                            </div>
                          </div>
                          {/* <div className="check-wrap">
                            <div className="check-icon-wrap">
                              <Zap size={14} />
                            </div>
                            <div className="text-body">
                              <strong>Indirect Savings (Annual):</strong> ₹
                              {results.indirectSavings.totalIndirectSavings.toLocaleString()}
                            </div>
                          </div> */}
                          {/* <div className="check-wrap">
                            <div className="check-icon-wrap">
                              <TrendingUp size={14} />
                            </div>
                            <div className="text-body">
                              <strong>5-Year Material Savings:</strong> ₹
                              {results.summary.fiveYearMaterialSavings.toLocaleString()}
                            </div>
                          </div> */}
                        </div>
                      </div>

                      <div className="section-divider plan-divider-2 semi-light-divider-plan"></div>

                      {!formSubmitted && (
                        <div
                          style={{
                            position: "absolute",
                            top: '160px',
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
                          <div
                            className="text-body"
                            style={{ marginBottom: "12px", fontSize: "16px" }}
                          >
                            🔒 Enter your details to unlock full analysis
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
                            type="number"
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
                          <button
                            onClick={handleNamePhoneSubmit}
                            disabled={isSubmitting}
                            style={{
                              padding: "10px 20px",
                              backgroundColor: isSubmitting
                                ? "#ccc"
                                : "#eaece4",
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
                    </>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                        opacity: 0.6,
                      }}
                    >
                      <BarChart3 size={48} style={{ marginBottom: "16px" }} />
                      <div className="text-body">
                        Enter project details and click "Calculate Savings" to
                        see results
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inline CSS for Spinner Animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Calculatorss;