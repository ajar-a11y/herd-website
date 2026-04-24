// Investor/partner blocks — proof bar, founder, traction, logos

const { useState: useStateI, useEffect: useEffectI, useRef: useRefI } = React;

// ————— Proof Bar (right under hero) —————

function ProofBar() {
  const stats = [
    { num: '$15M', lbl: 'Revenue' },
    { num: '4', lbl: 'Brands' },
    { num: '6', lbl: 'Channels' },
    { num: '6', lbl: 'Operators' },
  ];
  return (
    <section className="h-proof" style={{
      padding: '28px 32px',
      background: 'var(--paper)',
      borderTop: '1px solid var(--ink-10)',
      borderBottom: '1px solid var(--ink-10)',
    }}>
      <div style={{
        maxWidth: 1440, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            padding: '20px 32px',
            borderLeft: i > 0 ? '1px solid var(--ink-10)' : 'none',
            display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap',
          }}>
            <div style={{
              fontFamily: 'var(--serif)', fontWeight: 400,
              fontSize: 'clamp(44px, 4.4vw, 72px)',
              letterSpacing: '-0.035em', lineHeight: 0.95, color: 'var(--ink)',
            }}>{s.num}</div>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--ink-60)',
            }}>{s.lbl}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ————— Traction (revenue chart + hero stats) —————

function Traction() {
  // Annual run-rate in $K, last ~18 months climbing to ~$15.6M ARR
  const series = [
    480, 744, 1020, 1440, 1920, 2520, 3360, 4320, 5520,
    6960, 8640, 10200, 11760, 12960, 14160, 15000, 15360, 15600,
  ];
  const max = Math.max(...series);
  const ref = useRefI(null);
  const [inView, setInView] = useStateI(false);
  useEffectI(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el); return () => io.disconnect();
  }, []);

  const W = 1000, H = 320;
  const step = W / (series.length - 1);
  // Build a smooth curve using Catmull-Rom → Cubic Bézier so the racer follows a curve, not a polyline
  const pts = series.map((v, i) => [i * step, H - (v / max) * H]);
  const smoothD = (() => {
    if (pts.length < 2) return '';
    let d = `M ${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      const t = 0.18;
      const c1 = [p1[0] + (p2[0] - p0[0]) * t, p1[1] + (p2[1] - p0[1]) * t];
      const c2 = [p2[0] - (p3[0] - p1[0]) * t, p2[1] - (p3[1] - p1[1]) * t];
      d += ` C ${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
    }
    return d;
  })();
  const areaD = smoothD + ` L ${W},${H} L 0,${H} Z`;

  // Path measurement + progress for the racing dot / counter
  const pathRef = useRefI(null);
  const [progress, setProgress] = useStateI(0); // 0..1
  const [pathLen, setPathLen] = useStateI(3000);
  const [racer, setRacer] = useStateI({ x: 0, y: H });
  useEffectI(() => {
    if (!pathRef.current) return;
    setPathLen(pathRef.current.getTotalLength());
  }, []);
  useEffectI(() => {
    if (!inView) return;
    let raf, start;
    const dur = 2200;
    const delay = 200;
    const ease = (t) => 1 - Math.pow(1 - t, 2.4); // ease-out
    const loop = (ts) => {
      if (!start) start = ts;
      const t = Math.max(0, Math.min(1, (ts - start - delay) / dur));
      const e = ease(t);
      setProgress(e);
      if (pathRef.current) {
        const p = pathRef.current.getPointAtLength(pathLen * e);
        setRacer({ x: p.x, y: p.y });
      }
      if (t < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView, pathLen]);

  // Live counter — interpolate series value at progress
  const liveValue = (() => {
    if (pts.length < 2) return 0;
    const idxF = progress * (series.length - 1);
    const i0 = Math.floor(idxF);
    const i1 = Math.min(series.length - 1, i0 + 1);
    const f = idxF - i0;
    return series[i0] * (1 - f) + series[i1] * f;
  })();
  const fmtDollars = (k) => {
    // k is in $K
    if (k >= 1000) return `$${(k / 1000).toFixed(2)}M`;
    return `$${Math.round(k)}K`;
  };

  // Y-axis ticks (gridline values) revealed as the curve passes their x-threshold
  const yTicks = [
    { frac: 0.25, label: '$12M' },
    { frac: 0.50, label: '$8M' },
    { frac: 0.75, label: '$4M' },
  ];

  // Quarter labels along x, 6 evenly spaced
  const quarters = ["Q3 '24","Q4 '24","Q1 '25","Q2 '25","Q3 '25","Q4 '25"];

  return (
    <section ref={ref} id="traction" className="h-traction" style={{
      padding: '120px 32px',
      background: 'var(--paper)',
      borderTop: '1px solid var(--ink-10)',
    }}>
      <div style={{
        maxWidth: 1440, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 32,
      }}>
        {/* Left: copy + stats */}
        <div className="h-traction-left" style={{ gridColumn: 'span 4' }}>
          <Reveal>
            <h2 style={{
              fontFamily: 'var(--serif)', fontWeight: 400,
              fontSize: 'clamp(36px, 4vw, 64px)', lineHeight: 0.98,
              letterSpacing: '-0.03em', color: 'var(--ink)',
              margin: 0, textWrap: 'balance',
            }}>
              The curve <span style={{ fontStyle: 'italic' }}>goes up.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <div style={{ marginTop: 40, display: 'grid', gap: 24 }}>
              {[
                { n: '$15M', l: '2025 revenue run-rate' },
                { n: '38×', l: 'Growth in 18 months' },
                { n: '6', l: 'Operators on the team' },
              ].map((s, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'baseline',
                  borderTop: '1px solid var(--ink-10)', paddingTop: 16,
                }}>
                  <div style={{
                    fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: 'var(--ink-60)',
                  }}>{s.l}</div>
                  <div style={{
                    fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 2.6vw, 40px)',
                    letterSpacing: '-0.02em', color: 'var(--ink)', lineHeight: 1,
                  }}>{s.n}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: chart */}
        <div className="h-traction-right" style={{
          gridColumn: '6 / span 7',
          background: 'var(--ink)', borderRadius: 16,
          padding: 'clamp(28px, 3vw, 48px)',
          color: 'var(--paper)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'color-mix(in oklab, var(--paper) 60%, transparent)',
            }}>Annual run-rate · $K</div>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--accent)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: 999, background: 'var(--accent)', display: 'inline-block',
                animation: inView ? 'tr-pulse 1.4s ease-out infinite' : 'none',
              }} />
              Live
            </div>
          </div>

          {/* Live $-counter, giant */}
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 8,
            fontFamily: 'var(--serif)', fontVariantNumeric: 'tabular-nums',
          }}>
            <div style={{
              fontSize: 'clamp(48px, 6vw, 88px)', lineHeight: 0.9,
              letterSpacing: '-0.03em', color: 'var(--paper)',
            }}>{fmtDollars(liveValue)}</div>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'color-mix(in oklab, var(--paper) 55%, transparent)',
            }}>
              {progress >= 0.999 ? 'ARR · Oct 2025' : 'tracking…'}
            </div>
          </div>

          <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="none" style={{ display: 'block', overflow: 'visible' }}>
            <defs>
              <linearGradient id="tr-grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55"/>
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="tr-line-fade" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35"/>
                <stop offset="70%" stopColor="var(--accent)" stopOpacity="1"/>
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="1"/>
              </linearGradient>
              <clipPath id="tr-clip">
                {/* reveal-by-x: rectangle that grows with progress */}
                <rect x="0" y="-20" width={W * progress} height={H + 40} />
              </clipPath>
            </defs>

            {/* gridlines + y-axis value reveals */}
            {yTicks.map((t, i) => {
              const y = H * t.frac;
              // tick appears when the curve has passed the x where it crosses this y level.
              // Find the approx x where series crosses (1 - t.frac) of max from below.
              const targetVal = (1 - t.frac) * max;
              let crossX = 0;
              for (let k = 0; k < series.length; k++) {
                if (series[k] >= targetVal) { crossX = (k / (series.length - 1)); break; }
              }
              const shown = progress >= crossX;
              return (
                <g key={i}>
                  <line x1="0" x2={W} y1={y} y2={y}
                    stroke={shown ? 'color-mix(in oklab, white 18%, transparent)' : 'color-mix(in oklab, white 6%, transparent)'}
                    strokeDasharray="2 6"
                    style={{ transition: 'stroke .4s ease' }}
                  />
                  <text x={W - 4} y={y - 6} textAnchor="end"
                    style={{
                      fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      fill: 'color-mix(in oklab, var(--paper) 55%, transparent)',
                      opacity: shown ? 1 : 0,
                      transform: shown ? 'translateX(0)' : 'translateX(-6px)',
                      transition: 'opacity .5s ease, transform .5s ease',
                    }}
                  >{t.label}</text>
                </g>
              );
            })}

            {/* measurement path, hidden, used for getPointAtLength */}
            <path ref={pathRef} d={smoothD} fill="none" stroke="none" />

            {/* area — clipped to progress for "water filling" effect */}
            <path d={areaD} fill="url(#tr-grad)" clipPath="url(#tr-clip)"
              style={{ opacity: inView ? 1 : 0, transition: 'opacity .6s ease .1s' }} />

            {/* line — clipped to progress */}
            <path d={smoothD} fill="none" stroke="url(#tr-line-fade)" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              clipPath="url(#tr-clip)"
            />

            {/* racing dot + glow + comet tail */}
            {inView && (
              <g>
                {/* soft halo */}
                <circle cx={racer.x} cy={racer.y} r="22" fill="var(--accent)" opacity="0.12" />
                <circle cx={racer.x} cy={racer.y} r="12" fill="var(--accent)" opacity="0.22" />
                {/* white core ring */}
                <circle cx={racer.x} cy={racer.y} r="6" fill="var(--accent)" />
                <circle cx={racer.x} cy={racer.y} r="3" fill="var(--paper)" />
                {/* vertical drop-line from racer to baseline — subtle */}
                <line x1={racer.x} x2={racer.x} y1={racer.y + 8} y2={H}
                  stroke="color-mix(in oklab, var(--accent) 55%, transparent)"
                  strokeDasharray="2 4" strokeWidth="1"
                  style={{ opacity: progress > 0.02 && progress < 0.999 ? 1 : 0, transition: 'opacity .4s ease' }}
                />
              </g>
            )}

            {/* endpoint marker after settle */}
            {progress >= 0.999 && (() => {
              const [lx, ly] = pts[pts.length - 1];
              return (
                <g>
                  <circle cx={lx} cy={ly} r="18" fill="var(--accent)" opacity="0.16">
                    <animate attributeName="r" values="14;24;14" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.25;0.05;0.25" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={lx} cy={ly} r="6" fill="var(--accent)" />
                </g>
              );
            })()}
          </svg>

          {/* x-axis labels — each fades in as the sweep crosses it */}
          <div style={{
            display: 'grid', gridTemplateColumns: `repeat(${quarters.length}, 1fr)`, marginTop: 16,
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em',
            color: 'color-mix(in oklab, var(--paper) 55%, transparent)',
          }}>
            {quarters.map((q, i) => {
              const threshold = i / (quarters.length - 1);
              const shown = progress >= threshold - 0.02;
              const isLast = i === quarters.length - 1;
              return (
                <span key={q} style={{
                  textAlign: i === 0 ? 'left' : isLast ? 'right' : 'center',
                  opacity: shown ? 1 : 0.15,
                  color: shown && isLast ? 'var(--accent)' : undefined,
                  transform: shown ? 'translateY(0)' : 'translateY(4px)',
                  transition: 'opacity .5s ease, transform .5s ease, color .4s ease',
                }}>{q}</span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ————— Founder block —————

function Founder() {
  return (
    <section id="founder" className="h-founder" style={{
      padding: '120px 32px',
      background: 'var(--paper-2)',
      borderTop: '1px solid var(--ink-10)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 40, alignItems: 'center',
      }}>
        {/* Portrait placeholder */}
        <div className="h-founder-portrait" style={{ gridColumn: 'span 5' }}>
          <Reveal>
            <div style={{
              aspectRatio: '4/5',
              background: 'var(--ink)',
              borderRadius: 16,
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 30px 80px -30px rgba(20, 16, 12, 0.3)',
            }}>
              <img
                src="assets/ajar.jpg"
                alt="Ajar Rajbhandary, Founder & CEO of Herd"
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  filter: 'saturate(0.92) contrast(1.02)',
                }}
              />
            </div>
          </Reveal>
        </div>

        {/* Text */}
        <div className="h-founder-text" style={{ gridColumn: '7 / span 6' }}>
          <Reveal delay={120}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '6px 12px',
              border: '1px solid var(--ink-15)',
              borderRadius: 999,
              fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--ink-70)',
            }}>
              <span style={{ fontFamily: 'var(--serif)', fontSize: 13, letterSpacing: '-0.01em', textTransform: 'none' }}>Forbes</span>
              <span style={{ width: 1, height: 12, background: 'var(--ink-20)' }}/>
              <span>30 Under 30</span>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <h2 style={{
              fontFamily: 'var(--serif)', fontWeight: 400,
              fontSize: 'clamp(44px, 5vw, 88px)', lineHeight: 0.95,
              letterSpacing: '-0.035em', margin: '20px 0 0', color: 'var(--ink)',
              textWrap: 'balance',
            }}>
              Ajar Rajbhandary
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <div style={{
              marginTop: 12,
              fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink-70)',
              letterSpacing: '-0.005em',
            }}>
              Founder &amp; CEO, Herd
            </div>
          </Reveal>
          <Reveal delay={360}>
            <p style={{
              marginTop: 16,
              fontFamily: 'var(--sans)', fontSize: 15, lineHeight: 1.55,
              color: 'var(--ink-70)', maxWidth: 480,
            }}>
              Bootstrapped Herd to $15M in 18 months. Named to the
              Forbes 30 Under 30 list in Retail &amp; E-Commerce.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <p style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 1.8vw, 26px)',
              lineHeight: 1.35, letterSpacing: '-0.01em', color: 'var(--ink)',
              margin: '32px 0 0', maxWidth: 520, fontStyle: 'italic',
            }}>
              &ldquo;The next great consumer company isn&rsquo;t a brand.
              It&rsquo;s a system that can launch a hundred of them.&rdquo;
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ————— Logos strip (partners / press) —————

function LogosStrip() {
  const items = [
    { name: 'amazon', kind: 'lower' },
    { name: 'Walmart', kind: 'caps' },
    { name: 'Target', kind: 'mid' },
  ];
  return (
    <section className="h-logos" style={{
      padding: '56px 32px',
      background: 'var(--paper)',
      borderTop: '1px solid var(--ink-10)',
      borderBottom: '1px solid var(--ink-10)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', gap: 80, alignItems: 'center',
        justifyContent: 'center', flexWrap: 'wrap',
      }}>
        {items.map((it, i) => (
          <span key={i} style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(26px, 2.8vw, 38px)',
            fontWeight: it.kind === 'caps' ? 700 : 500,
            letterSpacing: it.kind === 'caps' ? '-0.005em' : '-0.015em',
            color: 'var(--ink)',
            opacity: 0.85,
          }}>{it.name}</span>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { ProofBar, Traction, Founder, LogosStrip });
