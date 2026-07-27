import React from 'react';
import { Check, Zap, Shield, Wrench, DollarSign, Clock, Flame, Link, Activity } from 'lucide-react';

function SS({ gmfr }) {
  const renderLexicalNode = (node, i = 0) => {
    if (!node) return null;

    switch (node.type) {
      case "paragraph":
        return (
          <p key={i}>
            {node.children?.map((child, ci) => renderLexicalNode(child, ci))}
          </p>
        );

      case "text":
        let content = node.text;

        if (node.format === 1) {
          content = <strong>{content}</strong>; // Bold
        }

        return <span key={i}>{content}</span>;

      default:
        return node.children?.map((child, ci) => renderLexicalNode(child, ci));
    }
  };

  const renderLexicalProperty = (property) => {
    if (!property || !property.root) return null;

    return property.root.children.map((node, i) => (
      <div key={i}>{renderLexicalNode(node)}</div>
    ));
  };

  if (!gmfr) return;

  return (
    <div
      className="min-h-screen bg-gray-100"
      style={{ marginBottom: "130px" }}
      id="compare"
    >
      <section className="section hero-pricing">
        <div className="w-layout-blockcontainer main-container w-container">
          <div className="headline-pricing">
            <div className="label">{gmfr.subHeading}</div>
            <h1 className="no-margins">{gmfr.heading}</h1>
          </div>

          <div className="pricing-tabs">
            <div className="tabs-content-pricing">
              <div className="tab-pane-pricing w-tab-pane w--tab-active">
                <div className="w-layout-grid product-thirds">
                  {gmfr?.comparisonSections?.length > 0 && (
                    <>
                      {gmfr.comparisonSections.map((gf, index) => (
                        <div
                          className="products w-dyn-list"
                          key={gf.sectionTitle || gf.id || index}
                        >
                          <div role="list" className="product-list w-dyn-items">
                            <div
                              role="listitem"
                              className="product-item w-dyn-item"
                            >
                              <div
                                className="pricing-card"
                                style={{
                                  backgroundColor: gf.cardBgColor,
                                  color: gf.cardTextColor,
                                }}
                              >
                                <div className="plan-header">
                                  <div className="plan-name-wrap">
                                    <div className="plan-title">
                                      {/* <Shield className="icon-plan w-5 h-5" /> */}
                                      <img
                                        src={gf.logo.cloudinaryUrl}
                                        alt=""
                                        className="icon-plan w-5 h-5"
                                      />
                                      <div className="text-h6">{gf.title}</div>
                                    </div>
                                    <div className="text-small">
                                      {gf.description}
                                    </div>
                                  </div>
                                  <div
                                    className="section-divider plan-divider"
                                    style={{ borderBottomColor: gf.lineColor }}
                                  ></div>
                                </div>

                                <div className="check-list">
                                  {gf.properties.map((pr, index) => (
                                    <div className="check-wrap" key={pr.id || index}>
                                      <div
                                        className="check-icon-wrap"
                                        style={{ backgroundColor: pr.bgColor }}
                                      >
                                        {/* <Zap className="tick w-4 h-4" /> */}
                                        <img
                                          src={pr.icon.cloudinaryUrl}
                                          className="tick w-4 h-4"
                                          alt=""
                                        />
                                      </div>
                                      <div className="text-body">
                                        {renderLexicalProperty(pr.property)}
                                        {/* {pr.property} */}
                                      </div>
                                    </div>
                                  ))}
                                  {/* <div className="check-wrap">
                                    <div className="check-icon-wrap">
                                      <Zap className="tick w-4 h-4" />
                                    </div>
                                    <div className="text-body">
                                      <strong>Tensile Strength:</strong> Up to
                                      2x of steel (1000+ MPa)
                                    </div>
                                  </div> */}
                                  {/* <div className="check-wrap">
                                    <div className="check-icon-wrap">
                                      <Check className="tick w-4 h-4" />
                                    </div>
                                    <div className="text-body">
                                      <strong>Weight:</strong> 80% lighter than
                                      steel
                                    </div>
                                  </div>
                                  <div className="check-wrap">
                                    <div className="check-icon-wrap">
                                      <Shield className="tick w-4 h-4" />
                                    </div>
                                    <div className="text-body">
                                      <strong>Corrosion:</strong> 100%
                                      corrosion-proof
                                    </div>
                                  </div>
                                  <div className="check-wrap">
                                    <div className="check-icon-wrap">
                                      <Wrench className="tick w-4 h-4" />
                                    </div>
                                    <div className="text-body">
                                      <strong>Maintenance:</strong> Minimal,
                                      almost zero
                                    </div>
                                  </div>
                                  <div className="check-wrap">
                                    <div className="check-icon-wrap">
                                      <Check className="tick w-4 h-4" />
                                    </div>
                                    <div className="text-body">
                                      <strong>Theft Risk:</strong> None (no
                                      resale value)
                                    </div>
                                  </div>
                                  <div className="check-wrap">
                                    <div className="check-icon-wrap">
                                      <Check className="tick w-4 h-4" />
                                    </div>
                                    <div className="text-body">
                                      <strong>Handling:</strong> Easy, less
                                      manpower
                                    </div>
                                  </div>
                                  <div className="check-wrap">
                                    <div className="check-icon-wrap">
                                      <Clock className="tick w-4 h-4" />
                                    </div>
                                    <div className="text-body">
                                      <strong>Project Speed:</strong> Faster
                                      installation
                                    </div>
                                  </div>
                                  <div className="check-wrap">
                                    <div className="check-icon-wrap">
                                      <DollarSign className="tick w-4 h-4" />
                                    </div>
                                    <div className="text-body">
                                      <strong>Life Cost:</strong> Up to 30%
                                      lower
                                    </div>
                                  </div>
                                  <div className="check-wrap">
                                    <div className="check-icon-wrap">
                                      <Activity className="tick w-4 h-4" />
                                    </div>
                                    <div className="text-body">
                                      <strong>Conductivity:</strong>{" "}
                                      Non-conductive
                                    </div>
                                  </div> */}
                                </div>

                                <div className="plan-bottom-tile">
                                  <div
                                    className="section-divider plan-divider-2"
                                    style={{ borderBottomColor: gf.lineColor }}
                                  ></div>
                                  <div
                                    className="label text-semi-dark"
                                    style={{ color: gf.cardTextColor }}
                                  >
                                    Best for:
                                  </div>
                                  <p className="text-small">{gf.bestFor}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  {/* GFRP Card */}
                  {/* <div className="products w-dyn-list">
                    <div role="list" className="product-list w-dyn-items">
                      <div role="listitem" className="product-item w-dyn-item">
                        <div className="pricing-card">
                          <div className="plan-header">
                            <div className="plan-name-wrap">
                              <div className="plan-title">
                                <Shield className="icon-plan w-5 h-5" />
                                <div className="text-h6">GFRP Rebar</div>
                              </div>
                              <div className="text-small">Glass Fiber Reinforced Polymer - Advanced composite reinforcement solution.</div>
                            </div>
                            <div className="section-divider plan-divider"></div>
                          </div>
                          
                          <div className="check-list">
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <Zap className="tick w-4 h-4" />
                              </div>
                              <div className="text-body"><strong>Tensile Strength:</strong> Up to 2x of steel (1000+ MPa)</div>
                            </div>
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <Check className="tick w-4 h-4" />
                              </div>
                              <div className="text-body"><strong>Weight:</strong> 80% lighter than steel</div>
                            </div>
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <Shield className="tick w-4 h-4" />
                              </div>
                              <div className="text-body"><strong>Corrosion:</strong> 100% corrosion-proof</div>
                            </div>
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <Wrench className="tick w-4 h-4" />
                              </div>
                              <div className="text-body"><strong>Maintenance:</strong> Minimal, almost zero</div>
                            </div>
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <Check className="tick w-4 h-4" />
                              </div>
                              <div className="text-body"><strong>Theft Risk:</strong> None (no resale value)</div>
                            </div>
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <Check className="tick w-4 h-4" />
                              </div>
                              <div className="text-body"><strong>Handling:</strong> Easy, less manpower</div>
                            </div>
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <Clock className="tick w-4 h-4" />
                              </div>
                              <div className="text-body"><strong>Project Speed:</strong> Faster installation</div>
                            </div>
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <DollarSign className="tick w-4 h-4" />
                              </div>
                              <div className="text-body"><strong>Life Cost:</strong> Up to 30% lower</div>
                            </div>
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <Activity className="tick w-4 h-4" />
                              </div>
                              <div className="text-body"><strong>Conductivity:</strong> Non-conductive</div>
                            </div>
                          </div>
                          
                          <div className="plan-bottom-tile">
                            <div className="section-divider plan-divider-2"></div>
                            <div className="label text-semi-dark">Best for:</div>
                            <p className="text-small">Marine structures, chemical plants, high-rise buildings, and projects requiring long-term durability.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  {/* TMT Card */}
                  {/* <div className="products w-dyn-list">
                    <div role="list" className="product-list w-dyn-items">
                      <div role="listitem" className="product-item w-dyn-item">
                        <div className="pricing-card middle">
                          <div className="plan-header">
                            <div className="plan-name-wrap">
                              <div className="plan-title">
                                <div className="icon-plan w-5 h-5 bg-gray-600 rounded"></div>
                                <div className="text-h6">TMT Steel Rebar</div>
                              </div>
                              <div className="text-small">Thermo-Mechanically Treated steel - Traditional reinforcement material.</div>
                            </div>
                            <div className="section-divider plan-divider"></div>
                          </div>
                          
                          <div className="check-list">
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <Zap className="tick w-4 h-4 text-orange-500" />
                              </div>
                              <div className="text-body"><strong>Tensile Strength:</strong> ~500 MPa</div>
                            </div>
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <div className="tick w-4 h-4 bg-red-500 rounded-full"></div>
                              </div>
                              <div className="text-body"><strong>Weight:</strong> Heavy (standard steel density)</div>
                            </div>
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <div className="tick w-4 h-4 bg-red-500 rounded-full"></div>
                              </div>
                              <div className="text-body"><strong>Corrosion:</strong> Corrodes in moisture/salt</div>
                            </div>
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <div className="tick w-4 h-4 bg-red-500 rounded-full"></div>
                              </div>
                              <div className="text-body"><strong>Maintenance:</strong> High, periodic repairs</div>
                            </div>
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <div className="tick w-4 h-4 bg-red-500 rounded-full"></div>
                              </div>
                              <div className="text-body"><strong>Theft Risk:</strong> High (scrap value)</div>
                            </div>
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <div className="tick w-4 h-4 bg-orange-500 rounded-full"></div>
                              </div>
                              <div className="text-body"><strong>Handling:</strong> Labour-intensive</div>
                            </div>
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <div className="tick w-4 h-4 bg-orange-500 rounded-full"></div>
                              </div>
                              <div className="text-body"><strong>Project Speed:</strong> Slower installation</div>
                            </div>
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <div className="tick w-4 h-4 bg-red-500 rounded-full"></div>
                              </div>
                              <div className="text-body"><strong>Life Cost:</strong> High (due to repairs)</div>
                            </div>
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <Activity className="tick w-4 h-4 text-blue-500" />
                              </div>
                              <div className="text-body"><strong>Conductivity:</strong> Conductive</div>
                            </div>
                          </div>
                          
                          <div className="plan-bottom-tile">
                            <div className="section-divider plan-divider-2"></div>
                            <div className="label text-semi-dark">Best for:</div>
                            <p className="text-small">Traditional construction, budget-conscious projects, and applications where initial cost is priority.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  {/* Additional Info Card */}
                  {/* <div className="products w-dyn-list">
                    <div role="list" className="product-list w-dyn-items">
                      <div role="listitem" className="product-item w-dyn-item">
                        <div className="pricing-card last">
                          <div className="plan-header">
                            <div className="plan-name-wrap">
                              <div className="plan-title">
                                <Link className="icon-plan w-5 h-5" />
                                <div className="text-h6">Common Properties</div>
                              </div>
                              <div className="text-small">Shared characteristics and real-world applications.</div>
                            </div>
                            <div className="section-divider plan-divider semi-light-divider-plan"></div>
                          </div>
                          
                          <div className="check-list">
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <Check className="tick w-4 h-4" />
                              </div>
                              <div className="text-body"><strong>Bond with Concrete:</strong> Excellent (sand coating)</div>
                            </div>
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <Flame className="tick w-4 h-4" />
                              </div>
                              <div className="text-body"><strong>Fire Resistance:</strong> GFRP needs protection >300°C, TMT is good</div>
                            </div>
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <Check className="tick w-4 h-4" />
                              </div>
                              <div className="text-body"><strong>Real Projects:</strong> Delhi Metro uses GFRP</div>
                            </div>
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <Check className="tick w-4 h-4" />
                              </div>
                              <div className="text-body"><strong>Global Use:</strong> Dubai Metro, Zurich Airport</div>
                            </div>
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <Check className="tick w-4 h-4" />
                              </div>
                              <div className="text-body"><strong>Standards:</strong> Both meet international codes</div>
                            </div>
                            <div className="check-wrap">
                              <div className="check-icon-wrap">
                                <Check className="tick w-4 h-4" />
                              </div>
                              <div className="text-body"><strong>Availability:</strong> Growing global supply chains</div>
                            </div>
                          </div>
                          
                          <div className="plan-bottom-tile">
                            <div className="section-divider plan-divider-2 semi-light-divider-plan"></div>
                            <div className="label text-semi-light">Key Insight:</div>
                            <p className="text-small">GFRP offers unique advantages for specialized applications where corrosion resistance and weight reduction are critical.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SS;