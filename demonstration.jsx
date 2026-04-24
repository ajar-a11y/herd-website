// Demonstration — a live, animated AI pipeline that cycles through stages
const { useState: useState2, useEffect: useEffect2, useRef: useRef2, useMemo: useMemo2 } = React;

function Demonstration() {
  const stages = [
    {
      k: 'identify',
      label: 'Identify',
      sub: 'AI reads the market',
      body: 'identify',
    },
    {
      k: 'source',
      label: 'Source',
      sub: 'AI finds the suppliers',
      body: 'source',
    },
    {
      k: 'product',
      label: 'Product + packaging',
      sub: 'AI designs → humans approve',
      body: 'product',
    },
    {
      k: 'copy',
      label: 'Listing + copy',
      sub: 'AI writes → AI tests',
      body: 'copy',
    },
    {
      k: 'ops',
      label: 'Live operations',
      sub: 'AI runs 24/7',
      body: 'ops',
    },
  ];

  const [idx, setIdx] = useState2(0);
  const [auto, setAuto] = useState2(true);
  const ref = useRef2(null);
  const [inView, setInView] = useState2(false);

  useEffect2(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect2(() => {
    if (!auto || !inView) return;
    const id = setInterval(() => setIdx(i => (i + 1) % stages.length), 3800);
    return () => clearInterval(id);
  }, [auto, inView, stages.length]);

  const current = stages[idx];

  return (
    <section id="build" ref={ref} className="h-demo" style={{
      padding: 'clamp(56px, 10vw, 140px) clamp(20px, 4vw, 32px)',
      background: 'var(--paper)',
      borderTop: '1px solid var(--ink-10)',
      position: 'relative',
    }}>
      <style>{`
        .demo-kv { display: grid; grid-template-columns: 110px 1fr; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--ink-10); font-family: var(--sans); font-size: 13px; }
        .demo-kv span { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-60); padding-top: 2px; }
        .demo-kv em { font-style: normal; color: var(--ink); }
        .demo-fade-in { animation: demoFadeIn .6s cubic-bezier(.2,.7,.2,1); }
        @keyframes demoFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .demo-stagger > * { opacity: 0; animation: demoStagger .5s forwards cubic-bezier(.2,.7,.2,1); }
        @keyframes demoStagger { to { opacity: 1; transform: translateY(0); } }
        .demo-name-card {
          background: var(--paper); border: 1px solid var(--ink-10); border-radius: 10px;
          padding: 14px 16px; display: grid; gap: 2px;
        }
        .demo-name-card.accepted { border-color: var(--accent); background: color-mix(in oklab, var(--accent) 6%, var(--paper)); }
        .demo-name { font-family: var(--serif); font-size: 22px; letter-spacing: -0.02em; color: var(--ink); }
        .demo-tag { font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-60); }
        .demo-bar-track { height: 6px; background: var(--ink-10); border-radius: 999px; overflow: hidden; }
        .demo-bar-fill { height: 100%; background: var(--ink); border-radius: 999px; transition: width 1.2s cubic-bezier(.2,.7,.2,1); }
        .demo-bar-fill.accent { background: var(--accent); }
        .demo-metric-card { background: var(--paper); border: 1px solid var(--ink-10); border-radius: 12px; padding: 24px; }
        .demo-metric-num { font-family: var(--serif); font-size: clamp(40px, 4vw, 56px); letter-spacing: -0.03em; color: var(--ink); line-height: 0.95; }
        .demo-metric-lbl { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-60); margin-top: 10px; }
        .demo-metric-delta { font-family: var(--sans); font-size: 13px; color: #127C5C; margin-top: 4px; }
        .demo-dot { width: 8px; height: 8px; border-radius: 999px; background: var(--accent); display: inline-block; animation: demoPulse 1.6s ease-in-out infinite; }
        @keyframes demoPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>

      <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 24 }}>
        {/* Header */}
        <div className="h-demo-head" style={{ gridColumn: 'span 12', marginBottom: 28 }}>
          <Reveal>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--ink-60)',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              marginBottom: 18,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--accent)', display: 'inline-block' }}/>
              How we build
            </div>
          </Reveal>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <Reveal>
              <h2 style={{
                fontFamily: 'var(--serif)', fontWeight: 400,
                fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 0.98,
                letterSpacing: '-0.03em', color: 'var(--ink)',
                margin: 0, textWrap: 'balance',
              }}>
                From data to shelf.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'var(--ink-60)',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span className="demo-dot" /> live pipeline
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <p style={{
              fontFamily: 'var(--sans)', fontSize: 16, lineHeight: 1.55,
              color: 'var(--ink-70)', margin: '18px 0 0', maxWidth: 640,
            }}>
              Every brand at Herd moves through the same five stages.
              Our models read the market, pick what to launch, find the supplier,
              design the product and run the store. Humans steer.
            </p>
          </Reveal>
        </div>

        {/* Pipeline steps */}
        <div className="h-demo-steps" style={{ gridColumn: 'span 12', position: 'relative', display: 'flex', gap: 0, marginBottom: 32, borderTop: '1px solid var(--ink-10)', borderBottom: '1px solid var(--ink-10)' }}>
          {/* Flowing particles along the step bar — 3 particles, staggered, looping within the active stage's duration */}
          {inView && auto && (
            <div aria-hidden className="h-demo-particles" style={{
              position: 'absolute', left: 0, right: 0, bottom: 0, height: 2,
              pointerEvents: 'none', overflow: 'hidden',
            }}>
              {[0, 0.33, 0.66].map((off, n) => {
                const segW = 100 / stages.length; // % per stage
                const activeStart = idx * segW;
                return (
                  <span key={`${idx}-${n}`} style={{
                    position: 'absolute', top: -3, width: 6, height: 6, borderRadius: 999,
                    background: 'var(--accent)',
                    boxShadow: '0 0 12px color-mix(in oklab, var(--accent) 80%, transparent), 0 0 4px var(--accent)',
                    left: `${activeStart}%`,
                    animation: `demo-flow-${n} 3.8s linear ${off * 3.8}s infinite`,
                    opacity: 0.9,
                  }} />
                );
              })}
              <style>{`
                @keyframes demo-flow-0 { 0% { transform: translateX(0); opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { transform: translateX(${100 / stages.length * 100 / 100}vw); opacity: 0; } }
                @keyframes demo-flow-1 { 0% { transform: translateX(0); opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { transform: translateX(${100 / stages.length * 100 / 100}vw); opacity: 0; } }
                @keyframes demo-flow-2 { 0% { transform: translateX(0); opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { transform: translateX(${100 / stages.length * 100 / 100}vw); opacity: 0; } }
              `}</style>
            </div>
          )}
          {stages.map((s, i) => {
            const active = i === idx;
            const done = i < idx;
            return (
              <button
                key={s.k}
                onClick={() => { setAuto(false); setIdx(i); }}
                className="h-demo-step"
                style={{
                  flex: 1, padding: '16px 16px', textAlign: 'left',
                  background: active ? 'var(--ink)' : 'transparent',
                  color: active ? 'var(--paper)' : 'var(--ink)',
                  border: 'none', borderRight: i < stages.length - 1 ? '1px solid var(--ink-10)' : 'none',
                  cursor: 'pointer', position: 'relative', overflow: 'hidden',
                  transition: 'background .4s ease, color .4s ease',
                  minWidth: 0,
                }}
              >
                <div style={{
                  fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em',
                  color: active ? 'var(--accent)' : done ? 'var(--ink-50)' : 'var(--ink-60)',
                  marginBottom: 6,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{
                  fontFamily: 'var(--serif)', fontSize: 'clamp(16px, 1.4vw, 20px)',
                  lineHeight: 1.1, letterSpacing: '-0.015em',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{s.label}</div>

                {/* active progress bar */}
                {active && (
                  <span key={idx} style={{
                    position: 'absolute', bottom: 0, left: 0, height: 2,
                    background: 'var(--accent)',
                    animation: auto && inView ? 'demoProg 3.8s linear forwards' : 'none',
                    width: auto && inView ? '0%' : '100%',
                  }} />
                )}
              </button>
            );
          })}
          <style>{`@keyframes demoProg { from { width: 0%; } to { width: 100%; } }`}</style>
        </div>

        {/* Stage body */}
        <div key={current.k} className="demo-fade-in h-demo-body" style={{
          gridColumn: 'span 12',
          background: 'var(--paper)',
          border: '1px solid var(--ink-10)',
          borderRadius: 16,
          padding: 'clamp(24px, 3vw, 40px)',
          minHeight: 460,
        }}>
          <StageVisual stageKey={current.k} body={current.body} />
        </div>
      </div>
    </section>
  );
}

function StageCaption({ stageKey }) {
  const captions = {
    identify: 'Our model ingests search, reviews, price history and category velocity across every channel — then surfaces white-space opportunities the team can act on.',
    source: 'The AI matches each opportunity against a live database of vetted factories, negotiates terms, and returns a short-list with MOQs, lead times and landed cost.',
    product: 'Generative design produces packaging, dielines and product imagery. Supplier specs auto-generate downstream.',
    copy: 'Titles, bullets and A+ content are drafted, variant-tested, and continuously rewritten against conversion.',
    ops: 'Listings, pricing, inventory, ads and support all run on-model, 24/7. Humans review exceptions only.',
  };
  return (
    <p style={{
      fontFamily: 'var(--sans)', fontSize: 15, lineHeight: 1.55,
      color: 'var(--ink-70)', margin: '16px 0 0', maxWidth: 320,
    }}>{captions[stageKey]}</p>
  );
}

function PackageCard({ variant, hero, delay }) {
  const { palette, brand, sub, style, id, chosen } = variant;

  return (
    <div style={{
      animationDelay: `${delay}ms`,
      display: 'grid', gap: 10,
    }}>
      <div style={{
        aspectRatio: hero ? '4/5' : '3/4',
        background: palette.bg,
        borderRadius: 12,
        position: 'relative', overflow: 'hidden',
        boxShadow: chosen
          ? `0 0 0 2px var(--accent), 0 20px 50px -16px rgba(0,0,0,0.35)`
          : '0 10px 28px -12px rgba(0,0,0,0.18)',
      }}>
        {/* Product silhouette — vertical power bank shape */}
        <svg viewBox="0 0 100 200" preserveAspectRatio="none" style={{
          position: 'absolute', left: '50%', top: '40%',
          transform: 'translate(-50%, -50%)',
          width: '38%', height: '52%',
          opacity: 0.14,
        }}>
          <rect x="20" y="10" width="60" height="180" rx="14" fill={palette.ink}/>
          <rect x="36" y="20" width="28" height="4" rx="2" fill={palette.ink}/>
          <rect x="30" y="170" width="40" height="10" rx="2" fill={palette.ink}/>
        </svg>

        {/* Brand type block */}
        <div style={{
          position: 'absolute', inset: 0,
          padding: hero ? 22 : 16,
          display: 'flex', flexDirection: 'column',
          justifyContent: style === 'split' ? 'space-between' : 'flex-end',
        }}>
          {style === 'split' && (
            <div style={{
              fontFamily: 'var(--mono)', fontSize: hero ? 10 : 9,
              letterSpacing: '0.18em', color: palette.ink, opacity: 0.6,
            }}>NB / SERIES · 01</div>
          )}

          {style === 'serif-centered' && (
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontFamily: 'var(--serif)',
                fontSize: hero ? 'clamp(22px, 2.2vw, 32px)' : 18,
                letterSpacing: '-0.025em', lineHeight: 0.95,
                color: palette.ink, fontStyle: 'italic',
              }}>{brand}</div>
              <div style={{
                height: 1, background: palette.accent,
                width: hero ? 40 : 28, margin: '10px 0 8px',
              }}/>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: hero ? 10 : 9,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: palette.ink, opacity: 0.7,
              }}>{sub}</div>
            </div>
          )}

          {style === 'sans-stacked' && (
            <div>
              <div style={{
                fontFamily: 'var(--sans)', fontWeight: 800,
                fontSize: hero ? 'clamp(18px, 1.8vw, 24px)' : 14,
                letterSpacing: '-0.005em', lineHeight: 0.9,
                color: palette.ink,
              }}>{brand.slice(0, brand.length/2)}<br/>{brand.slice(brand.length/2)}</div>
              <div style={{
                marginTop: 10,
                fontFamily: 'var(--mono)', fontSize: hero ? 10 : 8,
                letterSpacing: '0.16em',
                color: palette.accent,
              }}>{sub}</div>
            </div>
          )}

          {style === 'wordmark-dark' && (
            <div>
              <div style={{
                fontFamily: 'var(--serif)',
                fontSize: hero ? 'clamp(26px, 2.8vw, 40px)' : 20,
                letterSpacing: '-0.035em', lineHeight: 0.95,
                color: palette.ink,
              }}>{brand}</div>
              <div style={{
                height: 1, width: hero ? 44 : 30,
                background: palette.accent, margin: '12px 0 10px',
              }}/>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: hero ? 10 : 9,
                letterSpacing: '0.12em',
                color: palette.accent,
              }}>{sub}</div>
            </div>
          )}

          {style === 'split' && (
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
              <div style={{
                fontFamily: 'var(--sans)', fontWeight: 900,
                fontSize: hero ? 'clamp(40px, 4vw, 56px)' : 32,
                letterSpacing: '-0.04em', lineHeight: 0.85,
                color: palette.ink,
              }}>{brand}</div>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: hero ? 9 : 8,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: palette.ink, opacity: 0.7,
                textAlign: 'right', maxWidth: 80,
              }}>{sub}</div>
            </div>
          )}
        </div>

        {/* Selected badge */}
        {chosen && (
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: 'var(--accent)', color: 'var(--paper)',
            fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em',
            padding: '4px 8px', borderRadius: 4,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            ✓ SELECTED
          </div>
        )}
      </div>

      {/* Caption */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: chosen ? 'var(--accent)' : 'var(--ink-60)',
        }}>{id} · {style.split('-')[0]}</div>
        {/* tiny color chips */}
        <div style={{ display: 'flex', gap: 4 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: palette.bg, border: '1px solid var(--ink-15)' }}/>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: palette.ink }}/>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: palette.accent }}/>
        </div>
      </div>
    </div>
  );
}

function StageVisual({ stageKey, body }) {
  if (stageKey === 'identify') {
    const opps = [
      { cat: 'Kitchen', query: '“pour-over coffee kit”', demand: 92, saturation: 28, chosen: true },
      { cat: 'Wellness', query: '“magnesium sleep spray”', demand: 81, saturation: 54 },
      { cat: 'Pet', query: '“freeze-dried training treats”', demand: 76, saturation: 41 },
      { cat: 'Home', query: '“linen duvet cover”', demand: 64, saturation: 72 },
      { cat: 'Beauty', query: '“retinol body lotion”', demand: 58, saturation: 35 },
    ];
    return (
      <div className="demo-fade-in" style={{ display: 'grid', gap: 14 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 24px',
          gap: 16, padding: '0 16px 10px',
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--ink-60)',
          borderBottom: '1px solid var(--ink-10)',
        }}>
          <span>Category</span>
          <span>Signal</span>
          <span>Demand</span>
          <span>Saturation</span>
          <span />
        </div>
        <div className="demo-stagger" style={{ display: 'grid', gap: 8 }}>
          {opps.map((o, i) => (
            <div key={i} style={{
              animationDelay: `${i * 100}ms`,
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 24px',
              gap: 16, alignItems: 'center',
              padding: '14px 16px',
              background: o.chosen ? 'color-mix(in oklab, var(--accent) 6%, var(--paper))' : 'var(--paper)',
              border: `1px solid ${o.chosen ? 'var(--accent)' : 'var(--ink-10)'}`,
              borderRadius: 10,
            }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink)' }}>{o.cat}</span>
              <span style={{ fontFamily: 'var(--serif)', fontSize: 15, fontStyle: 'italic', color: 'var(--ink-70)', letterSpacing: '-0.01em' }}>{o.query}</span>
              <div style={{ display: 'grid', gap: 4 }}>
                <div className="demo-bar-track" style={{ width: '100%' }}>
                  <div className={`demo-bar-fill ${o.chosen ? 'accent' : ''}`} style={{ width: `${o.demand}%` }} />
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-60)' }}>{o.demand}</span>
              </div>
              <div style={{ display: 'grid', gap: 4 }}>
                <div className="demo-bar-track" style={{ width: '100%' }}>
                  <div className="demo-bar-fill" style={{ width: `${o.saturation}%`, background: o.saturation > 60 ? 'var(--danger)' : 'var(--ink-50)' }} />
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-60)' }}>{o.saturation}</span>
              </div>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: 11, textAlign: 'right',
                color: o.chosen ? 'var(--accent)' : 'transparent',
              }}>{o.chosen ? '✓' : ''}</span>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 4,
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em',
          color: 'var(--ink-60)', textAlign: 'right',
        }}>
          synthesized from 4.2M signals · updated 12 min ago
        </div>
      </div>
    );
  }

  if (stageKey === 'source') {
    const suppliers = [
      { loc: 'Ningbo, CN', moq: '2,000', lead: '38 days', cost: '$6.20', score: 92, chosen: true },
      { loc: 'Shenzhen, CN', moq: '1,000', lead: '44 days', cost: '$7.10', score: 84 },
      { loc: 'Ho Chi Minh, VN', moq: '3,000', lead: '52 days', cost: '$5.80', score: 79 },
      { loc: 'Istanbul, TR', moq: '500', lead: '28 days', cost: '$9.40', score: 71 },
    ];
    return (
      <div className="demo-fade-in" style={{ display: 'grid', gap: 14 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr 24px',
          gap: 12, padding: '0 16px 10px',
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--ink-60)',
          borderBottom: '1px solid var(--ink-10)',
        }}>
          <span>Supplier</span>
          <span>MOQ</span>
          <span>Lead time</span>
          <span>Landed</span>
          <span>Match</span>
          <span />
        </div>
        <div className="demo-stagger" style={{ display: 'grid', gap: 8 }}>
          {suppliers.map((s, i) => (
            <div key={i} style={{
              animationDelay: `${i * 110}ms`,
              display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr 24px',
              gap: 12, alignItems: 'center',
              padding: '14px 16px',
              background: s.chosen ? 'color-mix(in oklab, var(--accent) 6%, var(--paper))' : 'var(--paper)',
              border: `1px solid ${s.chosen ? 'var(--accent)' : 'var(--ink-10)'}`,
              borderRadius: 10,
            }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink)' }}>{s.loc}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-70)' }}>{s.moq}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-70)' }}>{s.lead}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-70)' }}>{s.cost}</span>
              <div style={{ display: 'grid', gap: 4 }}>
                <div className="demo-bar-track" style={{ width: '100%' }}>
                  <div className={`demo-bar-fill ${s.chosen ? 'accent' : ''}`} style={{ width: `${s.score}%` }} />
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-60)' }}>{s.score}</span>
              </div>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: 11, textAlign: 'right',
                color: s.chosen ? 'var(--accent)' : 'transparent',
              }}>{s.chosen ? '✓' : ''}</span>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 4, padding: '10px 14px',
          border: '1px dashed var(--ink-15)', borderRadius: 8,
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.04em',
          color: 'var(--ink-60)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span className="demo-dot" />
          agent: contacted 14 factories · received 9 quotes · shortlisted 4 · drafted LOI
        </div>
      </div>
    );
  }

  if (stageKey === 'product') {
    // Variants explore type + layout + palette
    const variants = [
      {
        id: 'V1', palette: { bg: '#EAE3D2', ink: '#1C1A17', accent: '#C25A3A' },
        brand: 'Northbound', sub: 'Portable power · 20,000 mAh',
        style: 'serif-centered',
      },
      {
        id: 'V2', palette: { bg: '#D9CBB4', ink: '#2A241C', accent: '#1C1A17' },
        brand: 'NORTHBOUND', sub: '20K · FAST CHARGE',
        style: 'sans-stacked',
      },
      {
        id: 'V3', palette: { bg: '#161310', ink: '#F2EDE4', accent: '#D6A568' },
        brand: 'northbound.', sub: '20,000 mAh portable power',
        style: 'wordmark-dark',
        chosen: true,
      },
      {
        id: 'V4', palette: { bg: '#B84A2B', ink: '#F7F0E4', accent: '#1C1A17' },
        brand: 'NB/20', sub: 'Power when you need it',
        style: 'split',
      },
    ];

    return (
      <div className="demo-fade-in" style={{ display: 'grid', gap: 20 }}>
        {/* Top row: header + meta */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-60)' }}>
            Brand — Northbound · Portable Power
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--ink-60)' }}>
            4 of 36 generated · 1 selected
          </div>
        </div>

        {/* Main grid: hero card + 3 variants */}
        <div className="demo-stagger" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 16 }}>
          {variants.map((v, i) => (
            <PackageCard key={v.id} variant={v} hero={i === 2} delay={i * 110} />
          ))}
        </div>

        {/* Specs row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
          borderTop: '1px solid var(--ink-10)',
          borderBottom: '1px solid var(--ink-10)',
          marginTop: 4,
        }}>
          {[
            { k: 'Dieline', v: 'Auto-generated' },
            { k: 'Color profile', v: 'CMYK · FSC-C' },
            { k: 'Supplier spec', v: 'Sent to Ningbo' },
            { k: 'Approval', v: 'Human signed · AR' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '14px 18px',
              borderLeft: i > 0 ? '1px solid var(--ink-10)' : 'none',
            }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-60)' }}>{s.k}</div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink)', marginTop: 4 }}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (stageKey === 'copy') {
    return (
      <div className="demo-stagger" style={{ display: 'grid', gap: 14 }}>
        {[
          { title: 'Kinfolk Kitchen — 12oz Pour-Over Set (Original)', ctr: 2.4 },
          { title: 'Slow-made Pour-Over Kit · Gift-ready · By Kinfolk', ctr: 3.1 },
          { title: 'The Morning Ritual Kit — Pour-Over, By Kinfolk', ctr: 4.7, winner: true },
          { title: 'Kinfolk Pour-Over · Café-quality at home', ctr: 3.6 },
        ].map((v, i) => (
          <div key={i} style={{
            animationDelay: `${i * 120}ms`,
            background: v.winner ? 'color-mix(in oklab, var(--accent) 6%, var(--paper))' : 'var(--paper)',
            border: `1px solid ${v.winner ? 'var(--accent)' : 'var(--ink-10)'}`,
            borderRadius: 10, padding: '14px 16px',
            display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 20,
          }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: v.winner ? 'var(--accent)' : 'var(--ink-60)', marginBottom: 6 }}>
                Variant {String.fromCharCode(65 + i)} {v.winner && '· winner'}
              </div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)', lineHeight: 1.35 }}>{v.title}</div>
            </div>
            <div style={{ minWidth: 100, display: 'grid', gap: 6, justifyItems: 'end' }}>
              <div className="demo-bar-track" style={{ width: 100 }}>
                <div className={`demo-bar-fill ${v.winner ? 'accent' : ''}`} style={{ width: `${(v.ctr/5)*100}%` }} />
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--ink-60)' }}>
                CTR {v.ctr}%
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (stageKey === 'ops') {
    const metrics = [
      { num: '$147K', lbl: 'Today, 3pm ET', delta: '+12% vs. yesterday' },
      { num: '98.7%', lbl: 'In-stock rate', delta: '+0.4% this week' },
      { num: '4.6★', lbl: 'Review avg.', delta: '+0.1 this week' },
      { num: '0:47', lbl: 'CS reply time', delta: '−38s this week' },
    ];
    return (
      <div className="demo-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {metrics.map((m, i) => (
          <div key={i} className="demo-metric-card" style={{ animationDelay: `${i * 120}ms` }}>
            <div className="demo-metric-num">{m.num}</div>
            <div className="demo-metric-lbl">{m.lbl}</div>
            <div className="demo-metric-delta">{m.delta}</div>
          </div>
        ))}
        <div style={{
          gridColumn: '1 / -1',
          border: '1px dashed var(--ink-15)', borderRadius: 10,
          padding: '12px 16px',
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em',
          color: 'var(--ink-60)',
          display: 'flex', alignItems: 'center', gap: 10,
          animationDelay: '480ms',
        }}>
          <span className="demo-dot" />
          agent: repriced 14 SKUs · relisted 3 variants · resolved 22 tickets · launched A/B test #84
        </div>
      </div>
    );
  }

  return null;
}

window.Demonstration = Demonstration;
