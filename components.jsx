// Herd homepage — components
const { useState, useEffect, useRef, useMemo } = React;

// ————— shared primitives —————

function Reveal({ children, delay = 0, y = 24, as: Tag = 'div', className = '', style = {} }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: seen ? 1 : 0,
        transform: seen ? 'translate3d(0,0,0)' : `translate3d(0,${y}px,0)`,
        transition: `opacity .9s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .9s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  );
}

function Label({ children, style = {} }) {
  return (
    <span
      className="h-label"
      style={{
        fontFamily: 'var(--mono)',
        fontSize: 11,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--ink-60)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        ...style,
      }}
    >
      <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 999, background: 'var(--accent)' }} />
      {children}
    </span>
  );
}

// ————— Nav —————

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [
    { href: '#build', label: 'Approach' },
    { href: '#traction', label: 'Traction' },
    { href: '#founder', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];
  return (
    <nav
      className="h-nav"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        padding: '18px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'color-mix(in oklab, var(--paper) 82%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'saturate(1.2) blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(1.2) blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--ink-10)' : '1px solid transparent',
        transition: 'all .3s ease',
      }}
    >
      <a href="#top" className="h-mark" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--ink)' }}>
        <Wordmark size={22} />
      </a>
      <div className="h-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        {links.map(l => (
          <a key={l.href} href={l.href} className="h-nav-link"
             style={{
               fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 500,
               color: 'var(--ink-70)', textDecoration: 'none',
               letterSpacing: '0.12em', textTransform: 'uppercase',
             }}>
            {l.label}
          </a>
        ))}
        <a href="#contact" className="h-cta-sm"
           style={{
             fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 500,
             letterSpacing: '0.12em', textTransform: 'uppercase',
             color: 'var(--paper)', background: 'var(--ink)',
             padding: '10px 18px', borderRadius: 999, textDecoration: 'none',
             transition: 'transform .2s ease, background .2s ease',
             display: 'inline-flex', alignItems: 'center', gap: 10,
             marginLeft: 8,
           }}>
          Work with us
          <span aria-hidden style={{ display: 'inline-block', transform: 'translateY(-1px)', letterSpacing: 0 }}>→</span>
        </a>
      </div>
      <button
        className="h-burger"
        onClick={() => setOpen(o => !o)}
        aria-label="Menu"
        style={{
          display: 'none',
          background: 'transparent', border: '1px solid var(--ink-15)',
          width: 40, height: 40, borderRadius: 999, cursor: 'pointer',
          alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span style={{ width: 14, height: 1.5, background: 'var(--ink)', display: 'block', position: 'relative',
          transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .2s ease' }}>
          <span style={{ position: 'absolute', left: 0, top: open ? 0 : -5, width: 14, height: 1.5, background: 'var(--ink)', transition: 'top .2s ease, transform .2s ease',
            transform: open ? 'rotate(-90deg)' : 'none' }} />
        </span>
      </button>
      {open && (
        <div className="h-mobile-menu"
          style={{
            position: 'fixed', top: 72, left: 16, right: 16,
            background: 'var(--paper)', border: '1px solid var(--ink-10)',
            borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', gap: 4,
            boxShadow: '0 24px 60px -20px rgba(20, 16, 12, 0.18)',
          }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ padding: '12px 8px', fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--ink)', textDecoration: 'none' }}>
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}
             style={{ marginTop: 8, padding: '14px 16px', background: 'var(--ink)', color: 'var(--paper)',
                      borderRadius: 999, textAlign: 'center', textDecoration: 'none', fontFamily: 'var(--sans)' }}>
            Work with us →
          </a>
        </div>
      )}
    </nav>
  );
}

function Wordmark({ size = 28 }) {
  return (
    <span style={{
      fontFamily: 'var(--serif)', fontSize: size, fontWeight: 400,
      letterSpacing: '-0.03em', lineHeight: 1, color: 'inherit',
    }}>
      Herd
    </span>
  );
}

// ————— Hero —————

function Hero() {
  const [mounted, setMounted] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    const isTouch = window.matchMedia('(hover: none)').matches;
    const onMove = (e) => setMouse({ x: e.clientX / window.innerWidth, y: Math.min(1, e.clientY / window.innerHeight) });
    const onScroll = () => setScrollY(window.scrollY);
    if (!isTouch) window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener('mousemove', onMove); window.removeEventListener('scroll', onScroll); };
  }, []);

  const line1 = 'Brands, built';
  const line2 = 'by AI.';
  const parallax = (typeof window !== 'undefined' && window.innerWidth < 900) ? 0 : scrollY * 0.35;

  // Glyph cycle: each character rolls through random glyphs before settling on its real char.
  // Characters resolve left-to-right so the headline "generates" itself like a model sampling.
  const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*+=/\\<>?!';
  const [tick, setTick] = useState(0);
  const startTs = useRef(null);
  useEffect(() => {
    if (!mounted) return;
    let raf;
    const loop = (t) => {
      if (!startTs.current) startTs.current = t;
      setTick(t - startTs.current);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const stop = setTimeout(() => cancelAnimationFrame(raf), 3200);
    return () => { cancelAnimationFrame(raf); clearTimeout(stop); };
  }, [mounted]);

  const renderGlyphLine = (text, startDelay, perCharMs = 60, settleMs = 520) => {
    const chars = text.split('');
    return chars.map((ch, i) => {
      if (ch === ' ') return <span key={i} style={{ display: 'inline-block', width: '0.32em' }}>&nbsp;</span>;
      const charStart = startDelay + i * perCharMs;
      const elapsed = tick - charStart;
      const settled = elapsed >= settleMs;
      let display = ch;
      if (!mounted || elapsed < 0) {
        display = GLYPHS[(i * 7) % GLYPHS.length];
      } else if (!settled) {
        // cycle quickly through glyphs
        const step = Math.floor(elapsed / 40);
        display = GLYPHS[(i * 11 + step * 13) % GLYPHS.length];
      }
      const isPunct = /[.,]/.test(ch);
      return (
        <span key={i} style={{
          display: 'inline-block',
          opacity: mounted ? 1 : 0,
          color: settled ? 'var(--ink)' : (elapsed >= 0 ? 'color-mix(in oklab, var(--accent) 85%, var(--ink))' : 'color-mix(in oklab, var(--ink) 15%, transparent)'),
          transform: settled ? 'translateY(0)' : 'translateY(0.04em)',
          transition: settled ? 'color .5s ease, transform .5s cubic-bezier(.2,.8,.2,1)' : 'none',
          fontVariantNumeric: 'tabular-nums',
          willChange: 'color, transform',
        }}>
          {isPunct && settled ? ch : display}
        </span>
      );
    });
  };

  return (
    <header id="top" className="h-hero" style={{
      position: 'relative',
      minHeight: '100vh',
      padding: 'clamp(130px, 18vw, 180px) clamp(20px, 4vw, 32px) clamp(60px, 10vw, 80px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'var(--paper)',
    }}>
      {/* grain + aurora */}
      <div aria-hidden className="h-aurora" style={{
        position: 'absolute', inset: '-10%', pointerEvents: 'none',
        background: `
          radial-gradient(50vw 50vw at ${20 + mouse.x * 20}% ${30 + mouse.y * 10}%, color-mix(in oklab, var(--accent) 28%, transparent), transparent 60%),
          radial-gradient(40vw 40vw at ${80 - mouse.x * 15}% ${70 - mouse.y * 10}%, color-mix(in oklab, var(--accent) 14%, transparent), transparent 65%)
        `,
        filter: 'blur(40px) saturate(1.1)',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 1.8s ease, background .6s ease',
        transform: `translate3d(0, ${parallax * 0.5}px, 0)`,
      }} />

      {/* rules that sweep in */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1,
        background: 'color-mix(in oklab, var(--ink) 10%, transparent)',
        transform: mounted ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: 'top',
        transition: 'transform 1.6s cubic-bezier(.2,.8,.2,1) .2s',
      }} />

      <div style={{
        maxWidth: 1440, margin: '0 auto', width: '100%',
        position: 'relative', textAlign: 'center',
        transform: `translate3d(0, ${-parallax}px, 0)`,
      }}>

        <h1 className="h-hero-title" style={{
          fontFamily: 'var(--serif)',
          fontWeight: 500,
          fontSize: 'clamp(56px, 11vw, 200px)',
          lineHeight: 0.92,
          letterSpacing: '-0.045em',
          margin: 0,
          color: 'var(--ink)',
          textWrap: 'balance',
        }}>
          <span style={{ display: 'block' }}>{renderGlyphLine(line1, 250)}</span>
          <span style={{ display: 'block', fontStyle: 'italic', fontWeight: 400 }}>{renderGlyphLine(line2, 250 + line1.length * 60 + 180)}</span>
        </h1>

        <div style={{
          marginTop: 44,
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 1s ease 1.4s, transform 1s ease 1.4s',
        }}>
          <a href="#approach" aria-label="Scroll" style={{
            display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            color: 'var(--ink-60)', textDecoration: 'none',
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
          }}>
            Scroll
            <span style={{ width: 1, height: 40, background: 'var(--ink-30, var(--ink-60))', position: 'relative', overflow: 'hidden' }}>
              <span className="h-scroll-dot" style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: 3, height: 12, borderRadius: 2, background: 'var(--accent)',
                animation: 'herd-scroll 1.8s cubic-bezier(.2,.7,.2,1) infinite',
              }} />
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}

function HeroBelow() {
  return (
    <section style={{ padding: '0 32px 80px', background: 'var(--paper)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <PartnersMarquee />
      </div>
    </section>
  );
}

function Stat({ n, label }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(28px, 3.2vw, 44px)',
        lineHeight: 1,
        letterSpacing: '-0.02em',
        color: 'var(--ink)',
      }}>{n}</div>
      <div style={{
        marginTop: 6,
        fontFamily: 'var(--mono)',
        fontSize: 11,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--ink-60)',
      }}>{label}</div>
    </div>
  );
}

// ————— Partners marquee —————

function PartnersMarquee() {
  // simple wordmark-style retailer tokens (original, no copyrighted logos)
  const items = [
    { name: 'Amazon', style: { fontFamily: 'var(--sans)', fontWeight: 600, letterSpacing: '-0.03em' } },
    { name: 'Shopify', style: { fontFamily: 'var(--sans)', fontWeight: 600, letterSpacing: '-0.02em' } },
    { name: 'Target', style: { fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 } },
    { name: 'Walmart', style: { fontFamily: 'var(--sans)', fontWeight: 700, letterSpacing: '-0.02em' } },
    { name: 'TikTok', style: { fontFamily: 'var(--sans)', fontWeight: 500, letterSpacing: '-0.01em' } },
    { name: 'BestBuy', style: { fontFamily: 'var(--sans)', fontWeight: 600, letterSpacing: '-0.02em' } },
  ];
  const row = [...items, ...items, ...items];
  return (
    <div id="partners" className="h-marquee-wrap" style={{
      maxWidth: 1440, margin: '0 auto', width: '100%',
      borderTop: '1px solid var(--ink-10)',
      borderBottom: '1px solid var(--ink-10)',
      padding: '20px 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: -11, left: 0, background: 'var(--paper)',
        padding: '0 12px 0 0',
        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'var(--ink-60)',
      }}>
        Our AI ships to
      </div>
      <div className="h-marquee" style={{
        display: 'flex',
        gap: 64,
        whiteSpace: 'nowrap',
        animation: 'herd-marquee 38s linear infinite',
        willChange: 'transform',
      }}>
        {row.map((r, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 'clamp(20px, 2.2vw, 30px)',
            color: 'var(--ink-80)',
            ...r.style,
          }}>
            {r.name}
            <span style={{ width: 4, height: 4, borderRadius: 999, background: 'var(--ink-20)', display: 'inline-block' }} />
          </span>
        ))}
      </div>
    </div>
  );
}

// ————— Approach —————

function Approach() {
  const blocks = [
    {
      k: '01',
      t: 'AI does the operating',
      d: 'Our proprietary models run merchandising, pricing, listing optimization, demand forecasting, and customer ops 24/7 — at a fraction of the cost of traditional teams.',
    },
    {
      k: '02',
      t: 'AI does the creating',
      d: 'From naming to packaging to product copy to campaign creative, our generative stack drafts, tests, and iterates brand assets in hours, not quarters.',
    },
    {
      k: '03',
      t: 'Humans do the taste',
      d: 'A small team of operators steers the models, curates the output, and makes the calls only humans should make — what to build, what to kill, what to ship next.',
    },
  ];
  return (
    <section id="approach" className="h-approach" style={{
      padding: 'clamp(80px, 12vw, 140px) clamp(20px, 4vw, 32px)',
      background: 'var(--paper)',
      borderTop: '1px solid var(--ink-10)',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 24 }}>
        <div className="h-approach-head" style={{ gridColumn: 'span 4' }}>
          <Reveal><Label>/ Approach</Label></Reveal>
          <Reveal delay={120}>
            <h2 style={{
              fontFamily: 'var(--serif)', fontWeight: 400,
              fontSize: 'clamp(36px, 4.4vw, 64px)', lineHeight: 1.0,
              letterSpacing: '-0.025em', color: 'var(--ink)',
              margin: '20px 0 0', textWrap: 'balance',
            }}>
              The AI runs the company.
              <br/>
              <span style={{ fontStyle: 'italic', color: 'var(--ink-70)' }}>We run the AI.</span>
            </h2>
          </Reveal>
        </div>

        <div className="h-approach-blocks" style={{ gridColumn: '6 / span 7', display: 'grid', gap: 2, background: 'var(--ink-10)' }}>
          {blocks.map((b, i) => (
            <Reveal key={b.k} delay={140 + i * 80}>
              <article style={{
                background: 'var(--paper)',
                padding: '36px 0',
                display: 'grid',
                gridTemplateColumns: '56px 1fr',
                gap: 24,
                alignItems: 'start',
              }}>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
                  color: 'var(--ink-50)', paddingTop: 6,
                }}>/ {b.k}</span>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--serif)', fontWeight: 400,
                    fontSize: 'clamp(22px, 2.2vw, 32px)', lineHeight: 1.1,
                    letterSpacing: '-0.02em', margin: 0, color: 'var(--ink)',
                  }}>{b.t}</h3>
                  <p style={{
                    fontFamily: 'var(--sans)', fontSize: 16, lineHeight: 1.55,
                    color: 'var(--ink-70)', margin: '12px 0 0', maxWidth: 560,
                  }}>{b.d}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ————— Timeline / Journey —————
// Scroll-scrubbed pipeline: a continuous SVG thread draws as the user scrolls,
// a glowing racer dot tracks the scroll position along the thread, and each row
// activates (year lights up, marker glows, body crisps) once the dot has crossed its anchor.

function Journey() {
  const events = [
    {
      year: '2024',
      marker: 'Founded',
      title: 'The AI-native house of brands begins.',
      body: 'We start from a simple bet: generative AI has made it possible for a handful of operators to build and run a portfolio of consumer brands with the output of a company ten times the size. We start building the stack.',
      tags: ['AI thesis', 'Model infra v0', 'Team of operators'],
    },
    {
      year: '2025',
      marker: '$15M+ revenue',
      title: 'The models ship their first brands.',
      body: 'Our AI-generated brands go live across Amazon, Shopify, Walmart, Target, TikTok and Best Buy — generating $15M+ in revenue in the first year and proving the stack can launch, operate and scale without a traditional org behind it.',
      tags: ['First cohort live', 'Autonomous ops', 'Six channels'],
    },
    {
      year: '2026',
      marker: 'In motion',
      title: 'From a handful of brands to a portfolio.',
      body: 'We’re training category-specific models, automating more of the brand lifecycle end-to-end, and expanding into new verticals and geographies faster than any human-led operator could.',
      tags: ['Category models', 'End-to-end automation', 'Global expansion'],
      future: true,
    },
  ];

  // Scroll progress through the timeline block (0 → 1)
  const blockRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0..1 over the timeline
  const [anchors, setAnchors] = useState([]);  // per-row activation thresholds (0..1)
  const rowRefs = useRef([]);

  useEffect(() => {
    const measure = () => {
      const block = blockRef.current;
      if (!block) return;
      const rect = block.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress: 0 when top of block touches 85% of viewport, 1 when bottom clears 15%.
      const start = rect.top - vh * 0.85;
      const end = rect.bottom - vh * 0.15;
      const total = end - start;
      const now = -start;
      const p = Math.max(0, Math.min(1, now / total));
      setProgress(p);

      // Anchor positions as fractions of the block height
      const blockTop = rect.top + window.scrollY;
      const blockH = block.offsetHeight;
      const marks = rowRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        const top = r.top + window.scrollY - blockTop;
        // Anchor dot sits ~28% down the row card
        return Math.max(0, Math.min(1, (top + r.height * 0.28) / blockH));
      });
      setAnchors(marks);
    };
    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <section id="journey" className="h-journey" style={{
      padding: 'clamp(80px, 12vw, 140px) clamp(20px, 4vw, 32px)',
      background: 'var(--ink)',
      color: 'var(--paper)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* subtle ambient glow that follows the racer dot */}
      <div aria-hidden style={{
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
        background: `radial-gradient(520px 520px at 18% ${20 + progress * 70}%, color-mix(in oklab, var(--accent) 14%, transparent), transparent 60%)`,
        pointerEvents: 'none',
        transition: 'background .2s linear',
      }} />

      <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 24, alignItems: 'end', marginBottom: 72 }}>
          <div style={{ gridColumn: 'span 6' }}>
            <Reveal><Label style={{ color: 'color-mix(in oklab, var(--paper) 70%, transparent)' }}>/ Journey</Label></Reveal>
            <Reveal delay={120}>
              <h2 style={{
                fontFamily: 'var(--serif)', fontWeight: 400,
                fontSize: 'clamp(40px, 5vw, 80px)', lineHeight: 0.98,
                letterSpacing: '-0.03em', margin: '20px 0 0',
                textWrap: 'balance',
              }}>
                So far, <span style={{ fontStyle: 'italic', opacity: 0.75 }}>so autonomous.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={240} className="h-journey-note" style={{ gridColumn: '9 / span 4' }}>
            <p style={{
              fontFamily: 'var(--sans)', fontSize: 15, lineHeight: 1.55,
              color: 'color-mix(in oklab, var(--paper) 70%, transparent)', margin: 0,
              maxWidth: 380,
            }}>
              Two years in, our AI stack is building, launching and operating brands across six of the world’s largest retail channels. The human team stayed small. The portfolio kept growing.
            </p>
          </Reveal>
        </div>

        {/* Pipeline block: thread + rows */}
        <div ref={blockRef} style={{ position: 'relative' }}>
          {/* Vertical thread */}
          <div aria-hidden style={{
            position: 'absolute',
            left: 188, // aligns with the center of the 28px dot column (160 + 24/2 + 16)
            top: 0, bottom: 0, width: 2,
            pointerEvents: 'none',
          }} className="h-journey-thread">
            {/* unfilled rail */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'color-mix(in oklab, var(--paper) 14%, transparent)',
            }}/>
            {/* filled segment */}
            <div style={{
              position: 'absolute', left: 0, top: 0, width: '100%',
              height: `${progress * 100}%`,
              background: 'linear-gradient(to bottom, color-mix(in oklab, var(--accent) 40%, transparent) 0%, var(--accent) 70%, var(--accent) 100%)',
              boxShadow: '0 0 16px color-mix(in oklab, var(--accent) 50%, transparent)',
              transition: 'height .15s linear',
            }}/>
            {/* racing dot */}
            <div style={{
              position: 'absolute', left: '50%', top: `${progress * 100}%`,
              transform: 'translate(-50%, -50%)',
              width: 14, height: 14, borderRadius: 999,
              background: 'var(--accent)',
              boxShadow: '0 0 0 4px color-mix(in oklab, var(--accent) 25%, transparent), 0 0 24px color-mix(in oklab, var(--accent) 80%, transparent)',
              transition: 'top .15s linear',
              opacity: progress > 0.001 && progress < 0.999 ? 1 : 0,
            }}>
              <div style={{
                position: 'absolute', inset: 3, borderRadius: 999,
                background: 'var(--paper)',
              }}/>
            </div>
            {/* "NOW" label tracking the dot */}
            <div style={{
              position: 'absolute', left: 20, top: `${progress * 100}%`,
              transform: 'translateY(-50%)',
              fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--accent)',
              whiteSpace: 'nowrap',
              opacity: progress > 0.01 && progress < 0.98 ? 1 : 0,
              transition: 'opacity .3s ease, top .15s linear',
            }}>
              ↢ You are here
            </div>
          </div>

          <ol className="h-timeline" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 0 }}>
            {events.map((e, i) => {
              const anchor = anchors[i] ?? (i / Math.max(1, events.length - 1));
              const active = progress >= anchor;
              return (
                <JourneyRow
                  key={e.year}
                  rowRef={(el) => { rowRefs.current[i] = el; }}
                  e={e} i={i}
                  last={i === events.length - 1}
                  active={active}
                  progress={progress}
                  anchor={anchor}
                />
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function JourneyRow({ e, i, last, rowRef, active, progress, anchor }) {
  // Row-local reveal fraction: 0 until anchor, linearly up to 1 over the next 15% of progress
  const local = Math.max(0, Math.min(1, (progress - anchor) / 0.15));
  return (
    <li ref={rowRef}>
      <div className="h-timeline-row" style={{
        display: 'grid',
        gridTemplateColumns: '160px 56px 1fr 1fr',
        gap: 24,
        alignItems: 'start',
        padding: '48px 0',
        borderTop: '1px solid color-mix(in oklab, var(--paper) 15%, transparent)',
        borderBottom: last ? '1px solid color-mix(in oklab, var(--paper) 15%, transparent)' : 'none',
        position: 'relative',
      }}>
        <div style={{
          transform: active ? 'translateY(0)' : 'translateY(6px)',
          transition: 'transform .6s cubic-bezier(.2,.8,.2,1), opacity .6s',
          opacity: active ? 1 : 0.45,
        }}>
          <div style={{
            fontFamily: 'var(--serif)', fontWeight: 400, fontStyle: e.future ? 'italic' : 'normal',
            fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1,
            letterSpacing: '-0.03em',
            color: e.future
              ? 'color-mix(in oklab, var(--paper) 60%, transparent)'
              : (active ? 'var(--paper)' : 'color-mix(in oklab, var(--paper) 55%, transparent)'),
            transition: 'color .5s ease',
          }}>{e.year}</div>
          <div style={{
            marginTop: 10,
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: active ? 'var(--accent)' : 'color-mix(in oklab, var(--accent) 50%, transparent)',
            transition: 'color .5s ease',
          }}>{e.marker}</div>
        </div>

        {/* Anchor dot — lives on the thread (second column, centered) */}
        <div style={{ position: 'relative', height: '100%' }}>
          <span style={{
            position: 'absolute', top: 18, left: 28, transform: 'translateX(-50%)',
            width: e.future ? 12 : 14, height: e.future ? 12 : 14, borderRadius: 999,
            background: active && !e.future
              ? 'var(--accent)'
              : (e.future ? 'transparent' : 'color-mix(in oklab, var(--paper) 20%, transparent)'),
            border: e.future ? '1.5px dashed color-mix(in oklab, var(--paper) 50%, transparent)' : 'none',
            boxShadow: active && !e.future
              ? '0 0 0 5px color-mix(in oklab, var(--accent) 20%, transparent), 0 0 24px color-mix(in oklab, var(--accent) 60%, transparent)'
              : 'none',
            transition: 'background .4s ease, box-shadow .4s ease',
          }} />
        </div>

        <h3 style={{
          fontFamily: 'var(--serif)', fontWeight: 400,
          fontSize: 'clamp(22px, 2.2vw, 32px)', lineHeight: 1.15,
          letterSpacing: '-0.02em', margin: 0,
          color: active ? 'var(--paper)' : 'color-mix(in oklab, var(--paper) 55%, transparent)',
          textWrap: 'balance',
          transform: active ? 'translateY(0)' : 'translateY(10px)',
          opacity: 0.5 + local * 0.5,
          transition: 'color .5s ease, transform .6s cubic-bezier(.2,.8,.2,1), opacity .6s ease',
        }}>{e.title}</h3>

        <div style={{
          transform: active ? 'translateY(0)' : 'translateY(14px)',
          opacity: 0.3 + local * 0.7,
          transition: 'transform .7s cubic-bezier(.2,.8,.2,1), opacity .7s ease',
        }}>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: 16, lineHeight: 1.55,
            color: 'color-mix(in oklab, var(--paper) 72%, transparent)',
            margin: 0,
          }}>{e.body}</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {e.tags.map((t, ti) => (
              <li key={t} style={{
                fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: active ? 'color-mix(in oklab, var(--paper) 85%, transparent)' : 'color-mix(in oklab, var(--paper) 55%, transparent)',
                padding: '6px 10px', borderRadius: 999,
                border: `1px solid color-mix(in oklab, var(--paper) ${active ? 30 : 15}%, transparent)`,
                transform: `translateY(${active ? 0 : 6}px)`,
                transitionDelay: `${ti * 80}ms`,
                transition: 'color .5s ease, border-color .5s ease, transform .6s cubic-bezier(.2,.8,.2,1)',
              }}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

// ————— Contact —————

function Contact() {
  return (
    <section id="contact" className="h-contact" style={{
      padding: 'clamp(72px, 10vw, 128px) clamp(20px, 4vw, 32px)',
      background: 'var(--paper)',
      borderTop: '1px solid var(--ink-10)',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <Reveal>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--ink-60)',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            marginBottom: 24,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--accent)', display: 'inline-block' }}/>
            Get in touch
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 style={{
            fontFamily: 'var(--serif)', fontWeight: 400,
            fontSize: 'clamp(40px, 7vw, 96px)', lineHeight: 0.98,
            letterSpacing: '-0.035em', color: 'var(--ink)',
            margin: 0, textWrap: 'balance',
          }}>
            Let's talk.
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p style={{
            marginTop: 20,
            fontFamily: 'var(--sans)', fontSize: 'clamp(16px, 1.5vw, 18px)',
            lineHeight: 1.5, color: 'var(--ink-70)',
            maxWidth: 560, margin: '20px auto 0', textWrap: 'pretty',
          }}>
            Whether you're a retailer, a manufacturer, or an investor — drop us a line.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <a href="mailto:info@herd-group.com" style={{
            marginTop: 40,
            display: 'inline-flex', alignItems: 'center', gap: 14,
            fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 34px)',
            letterSpacing: '-0.02em', color: 'var(--ink)',
            textDecoration: 'none',
            borderBottom: '1px solid var(--ink-20)',
            paddingBottom: 6,
            transition: 'border-color .3s ease, color .3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderBottomColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderBottomColor = 'var(--ink-20)'; e.currentTarget.style.color = 'var(--ink)'; }}
          >
            info@herd-group.com
            <span aria-hidden style={{ display: 'inline-block' }}>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="h-footer" style={{
      padding: 'clamp(56px, 9vw, 80px) clamp(20px, 4vw, 32px) 32px',
      borderTop: '1px solid var(--ink-10)',
      background: 'var(--paper)',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        {/* Oversized wordmark */}
        <div aria-hidden style={{
          fontFamily: 'var(--serif)', fontWeight: 400,
          fontSize: 'clamp(140px, 22vw, 320px)',
          letterSpacing: '-0.05em', lineHeight: 0.85,
          color: 'var(--ink)',
          margin: '0 0 48px',
          userSelect: 'none',
        }}>Herd<span style={{ color: 'var(--accent)' }}>.</span></div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 24,
          paddingTop: 28,
          borderTop: '1px solid var(--ink-10)',
          alignItems: 'start',
        }} className="h-footer-grid">
          <div style={{ gridColumn: 'span 5' }}>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--ink-60)', marginBottom: 10,
            }}>Contact</div>
            <a href="mailto:info@herd-group.com" style={{
              fontFamily: 'var(--mono)', fontSize: 15, color: 'var(--ink)',
              textDecoration: 'none', borderBottom: '1px solid var(--ink-20)',
            }}>info@herd-group.com</a>
          </div>

          <div style={{ gridColumn: 'span 4' }}>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--ink-60)', marginBottom: 10,
            }}>Elsewhere</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { label: 'LinkedIn', href: '#' },
                { label: 'X', href: '#' },
                { label: 'Press', href: 'mailto:info@herd-group.com' },
              ].map(s => (
                <a key={s.label} href={s.href} style={{
                  fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink-70)',
                  textDecoration: 'none', width: 'fit-content',
                }}>{s.label} →</a>
              ))}
            </div>
          </div>

          <div style={{ gridColumn: 'span 3', textAlign: 'right' }} className="h-footer-meta">
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--ink-60)', marginBottom: 10,
            }}>Est. 2024</div>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--ink-50)',
            }}>© 2026 Herd Group</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, HeroBelow, Approach, Journey, Contact, Footer });
