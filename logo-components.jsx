// Herd logo directions — inspired by the flock metaphor

const LOGOS = {
  // ——————— 1. Flock — V-formation ———————
  flock: {
    name: 'Flock',
    tagline: 'Many moving as one.',
    paper: '#F2EDE4',
    ink: '#17140F',
    accent: '#C45A3B',
    Mark: ({ size = 64, color = '#17140F', accent = '#C45A3B' }) => (
      <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        {/* V-formation of simple chevrons (birds) */}
        {/* lead */}
        <path d="M 32 14 L 38 22 L 32 19 L 26 22 Z" fill={accent}/>
        {/* second row */}
        <path d="M 22 26 L 28 34 L 22 31 L 16 34 Z" fill={color}/>
        <path d="M 42 26 L 48 34 L 42 31 L 36 34 Z" fill={color}/>
        {/* third row */}
        <path d="M 12 38 L 18 46 L 12 43 L 6 46 Z" fill={color}/>
        <path d="M 32 38 L 38 46 L 32 43 L 26 46 Z" fill={color}/>
        <path d="M 52 38 L 58 46 L 52 43 L 46 46 Z" fill={color}/>
      </svg>
    ),
    Wordmark: ({ size = 56, color = '#17140F', accent = '#C45A3B' }) => (
      <span style={{
        fontFamily: "'Instrument Serif', serif",
        fontSize: size, lineHeight: 1, letterSpacing: '-0.035em',
        color,
      }}>
        Herd<span style={{ color: accent }}>.</span>
      </span>
    ),
  },

  // ——————— 2. Gather — overlapping circles ———————
  gather: {
    name: 'Gather',
    tagline: 'A portfolio, clustered.',
    paper: '#EFEAE0',
    ink: '#1C1814',
    accent: '#8B6F3F',
    Mark: ({ size = 64, color = '#1C1814', accent = '#8B6F3F' }) => (
      <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        {/* cluster of overlapping circles — individual brands forming a herd */}
        <circle cx="22" cy="26" r="14" fill="none" stroke={color} strokeWidth="2"/>
        <circle cx="42" cy="26" r="14" fill="none" stroke={color} strokeWidth="2"/>
        <circle cx="32" cy="42" r="14" fill="none" stroke={color} strokeWidth="2"/>
        {/* center of gravity */}
        <circle cx="32" cy="32" r="4" fill={accent}/>
      </svg>
    ),
    Wordmark: ({ size = 56, color = '#1C1814', accent = '#8B6F3F' }) => (
      <span style={{
        fontFamily: "'Fraunces', 'Instrument Serif', serif",
        fontWeight: 400,
        fontSize: size, lineHeight: 1, letterSpacing: '-0.025em',
        color,
      }}>
        Herd
      </span>
    ),
  },

  // ——————— 3. Drove — repeated silhouettes moving together ———————
  drove: {
    name: 'Drove',
    tagline: 'The herd, in motion.',
    paper: '#F0EBE1',
    ink: '#141210',
    accent: '#2E5A3E',
    Mark: ({ size = 64, color = '#141210', accent = '#2E5A3E' }) => (
      <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        {/* stylized cattle/bison silhouettes — three, moving right, progressively more solid */}
        {/* furthest back (outline) */}
        <g transform="translate(2, 24)" opacity="0.35">
          <path d="M 0 12 L 2 10 L 4 8 L 6 6 L 10 4 L 14 4 L 16 5 L 18 6 L 18 12 L 16 12 L 16 16 L 14 16 L 14 12 L 4 12 L 4 16 L 2 16 L 2 12 Z" fill={color}/>
        </g>
        {/* middle */}
        <g transform="translate(18, 22)" opacity="0.65">
          <path d="M 0 12 L 2 10 L 4 8 L 6 6 L 10 4 L 14 4 L 16 5 L 18 6 L 18 12 L 16 12 L 16 16 L 14 16 L 14 12 L 4 12 L 4 16 L 2 16 L 2 12 Z" fill={color}/>
        </g>
        {/* front */}
        <g transform="translate(36, 20)">
          <path d="M 0 12 L 2 10 L 4 8 L 6 6 L 10 4 L 14 4 L 16 5 L 18 6 L 18 12 L 16 12 L 16 16 L 14 16 L 14 12 L 4 12 L 4 16 L 2 16 L 2 12 Z" fill={color}/>
        </g>
        {/* motion line under */}
        <line x1="4" y1="54" x2="58" y2="54" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    Wordmark: ({ size = 56, color = '#141210', accent = '#2E5A3E' }) => (
      <span style={{
        fontFamily: "'Instrument Serif', serif",
        fontSize: size, lineHeight: 1, letterSpacing: '-0.035em',
        color,
        fontStyle: 'italic',
      }}>
        Herd
      </span>
    ),
  },
};

// ——————— Artboard templates ———————

function LogoLockup({ d, variant = 'horizontal' }) {
  const pad = 56;
  if (variant === 'horizontal') {
    return (
      <div style={{
        width: '100%', height: '100%',
        background: d.paper,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 24, padding: pad, position: 'relative',
      }}>
        <d.Mark size={88} color={d.ink} accent={d.accent}/>
        <d.Wordmark size={72} color={d.ink} accent={d.accent}/>
        <ArtboardCorner d={d} label={`${d.name} — Horizontal lockup`}/>
      </div>
    );
  }
  if (variant === 'stacked') {
    return (
      <div style={{
        width: '100%', height: '100%',
        background: d.paper,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 24, padding: pad, position: 'relative',
      }}>
        <d.Mark size={120} color={d.ink} accent={d.accent}/>
        <d.Wordmark size={60} color={d.ink} accent={d.accent}/>
        <ArtboardCorner d={d} label={`${d.name} — Stacked lockup`}/>
      </div>
    );
  }
  if (variant === 'mark') {
    return (
      <div style={{
        width: '100%', height: '100%',
        background: d.paper,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: pad, position: 'relative',
      }}>
        <d.Mark size={200} color={d.ink} accent={d.accent}/>
        <ArtboardCorner d={d} label={`${d.name} — Mark only`}/>
      </div>
    );
  }
  if (variant === 'wordmark') {
    return (
      <div style={{
        width: '100%', height: '100%',
        background: d.paper,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: pad, position: 'relative',
      }}>
        <d.Wordmark size={112} color={d.ink} accent={d.accent}/>
        <ArtboardCorner d={d} label={`${d.name} — Wordmark only`}/>
      </div>
    );
  }
}

function Favicon({ d }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: d.paper,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center', justifyItems: 'center',
      padding: 40, gap: 32, position: 'relative',
    }}>
      <div style={{
        width: 200, height: 200, background: d.ink,
        borderRadius: 44,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 30px 60px -20px rgba(0,0,0,0.25)',
      }}>
        <d.Mark size={120} color={d.paper} accent={d.accent}/>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'center' }}>
        {[64, 32, 16].map(s => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: s, height: s, background: d.ink, borderRadius: Math.max(4, s/5),
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <d.Mark size={s * 0.72} color={d.paper} accent={d.accent}/>
            </div>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              letterSpacing: '0.12em', color: d.ink, opacity: 0.6, textTransform: 'uppercase',
            }}>{s}px</span>
          </div>
        ))}
      </div>
      <ArtboardCorner d={d} label={`${d.name} — Favicon / app icon`}/>
    </div>
  );
}

function Reversed({ d }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: d.ink,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 24, padding: 56, position: 'relative',
    }}>
      <d.Mark size={88} color={d.paper} accent={d.accent}/>
      <d.Wordmark size={72} color={d.paper} accent={d.accent}/>
      <ArtboardCorner d={d} label={`${d.name} — Reversed`} darkBg/>
    </div>
  );
}

function InContext({ d }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: d.paper,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%) rotate(-4deg)',
        width: 360, height: 220,
        background: '#FBF8F3',
        borderRadius: 6,
        boxShadow: '0 30px 60px -20px rgba(0,0,0,0.2), 0 12px 24px -12px rgba(0,0,0,0.15)',
        padding: 24,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <d.Mark size={40} color={d.ink} accent={d.accent}/>
        <div>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: d.ink, lineHeight: 1 }}>Alex Chen</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: d.ink, opacity: 0.6, marginTop: 4 }}>Founder & CEO</div>
          <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, color: d.ink, opacity: 0.7, marginTop: 14 }}>info@herd-group.com · herd-group.com</div>
        </div>
      </div>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-62%, -58%) rotate(6deg)',
        width: 360, height: 220,
        background: d.ink,
        borderRadius: 6,
        boxShadow: '0 30px 60px -20px rgba(0,0,0,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: -1,
      }}>
        <d.Wordmark size={56} color={d.paper} accent={d.accent}/>
      </div>
      <ArtboardCorner d={d} label={`${d.name} — In context`}/>
    </div>
  );
}

function ArtboardCorner({ d, label, darkBg }) {
  return (
    <div style={{
      position: 'absolute', bottom: 16, left: 20,
      display: 'flex', gap: 14, alignItems: 'center',
    }}>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10, letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: darkBg ? d.paper : d.ink, opacity: 0.5,
      }}>{label}</span>
      <span style={{ display: 'inline-flex', gap: 6 }}>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: d.ink }}/>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: d.paper, border: `1px solid ${darkBg ? d.paper : d.ink}`, opacity: darkBg ? 0.5 : 1 }}/>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: d.accent }}/>
      </span>
    </div>
  );
}

function ConceptNote({ d, children }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: d.paper,
      padding: 48,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <d.Mark size={56} color={d.ink} accent={d.accent}/>
        <d.Wordmark size={40} color={d.ink} accent={d.accent}/>
      </div>
      <div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: d.accent, marginBottom: 12,
        }}>/ Concept</div>
        <p style={{
          fontFamily: "'Instrument Serif', serif", fontSize: 28,
          lineHeight: 1.3, letterSpacing: '-0.02em',
          color: d.ink, margin: 0, maxWidth: 460,
        }}>{children}</p>
      </div>
    </div>
  );
}

Object.assign(window, { LOGOS, LogoLockup, Favicon, Reversed, InContext, ConceptNote });
