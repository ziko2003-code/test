import { useState, useEffect, useRef, useMemo, useCallback } from "react";

/* ═══════════════ ICONS ═══════════════ */
const Heart = ({ size = 24, className = "" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>);
const Sparkles = ({ size = 24, className = "" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"/></svg>);
const Star = ({ size = 24, className = "" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>);
const Gift = ({ size = 24, className = "" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>);
const Cake = ({ size = 24, className = "" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/></svg>);
const Music = ({ size = 24, className = "" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>);
const Flower = ({ size = 24, className = "" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15"/><circle cx="12" cy="12" r="3"/></svg>);
const Crown = ({ size = 24, className = "" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M3 20h18"/></svg>);

/* ═══════════════ CONFETTI BURST ═══════════════ */
function ConfettiBurst({ active }) {
  const pieces = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 600,
    y: -(Math.random() * 500 + 200),
    r: Math.random() * 720 - 360,
    size: Math.random() * 8 + 4,
    color: ["#ec4899", "#f43f5e", "#f9a8d4", "#fda4af", "#c084fc", "#fb7185", "#fbbf24", "#fff"][Math.floor(Math.random() * 8)],
    delay: Math.random() * 0.4,
    dur: Math.random() * 1.5 + 1.5,
  })), []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {pieces.map(p => (
        <div key={p.id} className="absolute left-1/2 top-1/2" style={{
          width: p.size, height: p.size * 0.6, backgroundColor: p.color, borderRadius: 2,
          animation: `confetti-fall ${p.dur}s cubic-bezier(0.25,0.46,0.45,0.94) ${p.delay}s forwards`,
          "--cx": `${p.x}px`, "--cy": `${p.y}px`, "--cr": `${p.r}deg`,
        }} />
      ))}
    </div>
  );
}

/* ═══════════════ SPLIT TEXT (fixed - both words visible) ═══════════════ */
function SplitText({ text, delay = 0, className = "" }) {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <span className={`inline-flex flex-wrap justify-center ${className}`} style={{ display: "inline-flex" }}>
      {text.split("").map((ch, i) => (
        <span key={i} style={{
          display: "inline-block",
          opacity: v ? 1 : 0,
          transform: v ? "translateY(0) rotateX(0)" : "translateY(40px) rotateX(-90deg)",
          transition: `all 0.7s cubic-bezier(0.22,1,0.36,1)`,
          transitionDelay: `${i * 45}ms`,
        }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

/* ═══════════════ FADE CONTENT ═══════════════ */
function FadeContent({ children, delay = 0, duration = 900, blur = true, direction = "up", className = "" }) {
  const [v, setV] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const m = { up: "translateY(50px)", down: "translateY(-50px)", left: "translateX(50px)", right: "translateX(-50px)" };
  return (
    <div ref={ref} className={className} style={{ opacity: v ? 1 : 0, filter: v ? "blur(0)" : blur ? "blur(12px)" : "none", transform: v ? "translate(0)" : m[direction], transition: `all ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ═══════════════ PARTICLES ═══════════════ */
function FloatingParticles() {
  const p = useMemo(() => Array.from({ length: 25 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, sz: Math.random() * 14 + 6, dur: Math.random() * 12 + 10, del: Math.random() * 8, op: Math.random() * 0.3 + 0.05, t: i % 4 })), []);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {p.map(q => (
        <div key={q.id} className="absolute" style={{ left: `${q.x}%`, top: `${q.y}%`, animation: `fp ${q.dur}s linear ${q.del}s infinite`, opacity: q.op }}>
          {q.t === 0 && <Star size={q.sz} className="text-pink-400" />}
          {q.t === 1 && <Cake size={q.sz} className="text-rose-300" />}
          {q.t === 2 && <Sparkles size={q.sz} className="text-pink-300" />}
          {q.t === 3 && <Gift size={q.sz} className="text-fuchsia-300" />}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════ HELPERS ═══════════════ */
function ShimmerText({ text, className = "" }) {
  return <span className={`shimmer-text ${className}`}>{text}</span>;
}

function MagneticButton({ children, onClick, className = "" }) {
  const ref = useRef(null);
  const [o, setO] = useState({ x: 0, y: 0 });
  return (
    <button ref={ref} className={className} onClick={onClick}
      onMouseMove={e => { const r = ref.current.getBoundingClientRect(); setO({ x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3 }); }}
      onMouseLeave={() => setO({ x: 0, y: 0 })}
      style={{ transform: `translate(${o.x}px,${o.y}px)`, transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)" }}>
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════
   SCROLL VELOCITY
   ═══════════════════════════════════════════ */
function ScrollVelocity({ texts = [], baseSpeed = 40 }) {
  const scrollY = useRef(0);
  const prev = useRef(0);
  const vel = useRef(0);
  const off = useRef(0);
  const raf = useRef(null);
  const [, tick] = useState(0);

  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const delta = scrollY.current - prev.current;
      prev.current = scrollY.current;
      vel.current += (delta * 4 - vel.current) * 0.06;
      off.current -= (baseSpeed + Math.abs(vel.current)) * dt;
      tick(n => n + 1);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf.current); };
  }, [baseSpeed]);

  return (
    <div className="overflow-hidden select-none">
      {texts.map((text, ri) => {
        const dir = ri % 2 === 0 ? 1 : -1;
        const x = (off.current * dir) % 2000;
        return (
          <div key={ri} className="flex whitespace-nowrap py-2 sm:py-3" style={{ transform: `translateX(${x}px)`, willChange: "transform" }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="flex items-center gap-4 sm:gap-6 mx-4 sm:mx-6">
                <span className="text-3xl sm:text-5xl md:text-7xl font-bold font-display tracking-tight" style={{ color: "rgba(236,72,153,0.18)", WebkitTextStroke: "1.5px rgba(236,72,153,0.25)" }}>{text}</span>
                <Star size={18} className="text-pink-400/20 flex-shrink-0" />
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════
   STICKER PEEL (FIXED - proper z-index)
   ═══════════════════════════════════════════ */
function StickerPeel() {
  const [peeled, setPeeled] = useState(false);
  const [hover, setHover] = useState(false);
  const ref = useRef(null);

  const peelDeg = peeled ? 180 : hover ? 25 : 0;

  return (
    <div ref={ref} className="relative w-[300px] sm:w-[360px] h-[420px] sm:h-[480px] mx-auto cursor-pointer"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setPeeled(!peeled)}>

      <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl shadow-pink-600/20" style={{ zIndex: 1 }}>
        <div className="h-full bg-gradient-to-br from-pink-600 via-rose-500 to-fuchsia-600 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20z' fill='white' fill-opacity='0.4'/%3E%3C/svg%3E\")", backgroundSize: "30px 30px" }} />
          <div className="flex flex-col items-center justify-center h-full p-8 text-center relative z-10">
            <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mb-5 backdrop-blur-sm">
              <Crown size={32} className="text-yellow-200" />
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-1 italic">Sara</h3>
            <p className="font-display text-xl text-white/80 italic mb-2">Birthday Queen</p>
            <p className="text-white/60 text-xs uppercase tracking-[0.25em] mb-5">Born to Shine</p>
            <div className="w-20 h-px bg-white/20 mb-5" />
            <p className="text-white/75 text-sm leading-relaxed max-w-[250px]">
              Born on a day full of love and celebration. A beautiful soul who makes every moment brighter and every day more special.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <Star size={14} className="text-yellow-200/70" />
              <span className="text-white/50 text-xs tracking-widest uppercase">14 / 02</span>
              <Star size={14} className="text-yellow-200/70" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-3xl overflow-hidden" style={{
        zIndex: 2,
        transformOrigin: "left center",
        transform: `rotateY(${peelDeg}deg)`,
        transition: peeled ? "transform 0.8s cubic-bezier(0.22,1,0.36,1)" : "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        backfaceVisibility: "hidden",
        filter: peelDeg > 0 ? `drop-shadow(${-peelDeg * 0.15}px 6px ${peelDeg * 0.4}px rgba(0,0,0,0.4))` : "none",
      }}>
        <div className="h-full bg-gradient-to-br from-[#110810] via-[#160a14] to-[#0d060a] border border-pink-500/8 rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(219,39,119,0.06),transparent_70%)]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(236,72,153,0.5) 10px, rgba(236,72,153,0.5) 11px)" }} />
          <div className="flex flex-col items-center justify-center h-full p-8 text-center relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/10 flex items-center justify-center mb-5">
              <Gift size={28} className="text-pink-400/70" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">A Gift for Sara</h3>
            <p className="text-pink-200/30 text-sm mb-8">Click to peel and reveal</p>
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-pink-500/25 animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
              ))}
            </div>
            <div className="absolute bottom-6 left-6 opacity-60" style={{ animation: "ph 2.5s ease-in-out infinite" }}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M0 36 L0 0 L36 0 Z" fill="url(#pg2)" />
                <defs><linearGradient id="pg2" x1="0" y1="36" x2="36" y2="0"><stop offset="0%" stopColor="#ec4899" stopOpacity="0.6"/><stop offset="100%" stopColor="#be185d" stopOpacity="0.2"/></linearGradient></defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   3D CUBES
   ═══════════════════════════════════════════ */
function Cube3D({ size = 120, speed = 12, delay = 0, faces = {} }) {
  const [hov, setHov] = useState(false);
  const half = size / 2;
  const fs = {
    front: { transform: `rotateY(0deg) translateZ(${half}px)` },
    back: { transform: `rotateY(180deg) translateZ(${half}px)` },
    right: { transform: `rotateY(90deg) translateZ(${half}px)` },
    left: { transform: `rotateY(-90deg) translateZ(${half}px)` },
    top: { transform: `rotateX(90deg) translateZ(${half}px)` },
    bottom: { transform: `rotateX(-90deg) translateZ(${half}px)` },
  };
  return (
    <div style={{ width: size, height: size, perspective: size * 5 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ width: size, height: size, position: "relative", transformStyle: "preserve-3d",
        animation: `cubespin ${speed}s linear infinite`, animationDelay: `${delay}s`,
        animationPlayState: hov ? "paused" : "running" }}>
        {Object.entries(fs).map(([face, style]) => (
          <div key={face} style={{ ...style, position: "absolute", top: 0, left: 0, width: size, height: size,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(10,0,8,0.88)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(236,72,153,0.12)", borderRadius: 16, backfaceVisibility: "visible" }}>
            <div className="flex flex-col items-center justify-center gap-1.5">{faces[face]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CubesSection() {
  const cubes = [
    { faces: {
      front: <><Heart size={30} className="text-pink-400" /><span className="text-[10px] text-pink-200/60 mt-1">Love</span></>,
      back: <><Sparkles size={30} className="text-fuchsia-400" /><span className="text-[10px] text-fuchsia-200/60 mt-1">Magic</span></>,
      right: <><Star size={30} className="text-rose-400" /><span className="text-[10px] text-rose-200/60 mt-1">Shine</span></>,
      left: <><Crown size={30} className="text-yellow-400" /><span className="text-[10px] text-yellow-200/60 mt-1">Celebrate</span></>,
      top: <><Music size={30} className="text-pink-300" /><span className="text-[10px] text-pink-200/60 mt-1">Joy</span></>,
      bottom: <><Flower size={30} className="text-fuchsia-300" /><span className="text-[10px] text-fuchsia-200/60 mt-1">Bloom</span></>,
    }, speed: 10, size: 110, delay: 0 },
    { faces: {
      front: <><span className="font-display text-3xl font-bold text-white">14</span><span className="text-[9px] text-pink-300/50 uppercase tracking-widest">Feb</span></>,
      back: <><Cake size={36} className="text-pink-400" /><span className="text-[10px] text-pink-200/60 mt-1">Party</span></>,
      right: <><Gift size={36} className="text-rose-400" /><span className="text-[10px] text-rose-200/60 mt-1">Gifts</span></>,
      left: <><Cake size={36} className="text-pink-400" /><span className="text-[10px] text-pink-200/60 mt-1">Cheers</span></>,
      top: <><Star size={36} className="text-yellow-400" /><span className="text-[10px] text-yellow-200/60 mt-1">Wish</span></>,
      bottom: <><Sparkles size={36} className="text-fuchsia-400" /><span className="text-[10px] text-fuchsia-200/60 mt-1">Dream</span></>,
    }, speed: 14, size: 150, delay: 1.5 },
    { faces: {
      front: <><Flower size={30} className="text-pink-400" /><span className="text-[10px] text-pink-200/60 mt-1">Grace</span></>,
      back: <><Heart size={30} className="text-rose-400" /><span className="text-[10px] text-rose-200/60 mt-1">Warmth</span></>,
      right: <><Star size={30} className="text-yellow-400" /><span className="text-[10px] text-yellow-200/60 mt-1">Bright</span></>,
      left: <><Music size={30} className="text-fuchsia-400" /><span className="text-[10px] text-fuchsia-200/60 mt-1">Dance</span></>,
      top: <><Sparkles size={30} className="text-pink-300" /><span className="text-[10px] text-pink-200/60 mt-1">Glow</span></>,
      bottom: <><Crown size={30} className="text-yellow-300" /><span className="text-[10px] text-yellow-200/60 mt-1">Sparkle</span></>,
    }, speed: 12, size: 110, delay: 3 },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
      {cubes.map((c, i) => (
        <FadeContent key={i} delay={i * 250} blur>
          <Cube3D {...c} />
        </FadeContent>
      ))}
    </div>
  );
}

/* ═══════════════ COUNTDOWN ═══════════════ */
function CountdownItem({ value, label, delay }) {
  return (
    <FadeContent delay={delay} className="flex flex-col items-center">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/[0.08] flex items-center justify-center">
        <span className="text-3xl sm:text-4xl font-bold text-white tabular-nums">{String(value).padStart(2, "0")}</span>
      </div>
      <span className="mt-2 text-xs sm:text-sm text-pink-200/50 uppercase tracking-widest font-medium">{label}</span>
    </FadeContent>
  );
}

function Countdown() {
  const target = useMemo(() => {
    const now = new Date(); let y = now.getFullYear(), bd = new Date(y, 1, 14);
    if (bd < now) bd = new Date(y + 1, 1, 14); return bd;
  }, []);
  const calc = useCallback(() => {
    const d = Math.max(0, target - new Date());
    return { days: Math.floor(d / 864e5), hours: Math.floor((d % 864e5) / 36e5), mins: Math.floor((d % 36e5) / 6e4), secs: Math.floor((d % 6e4) / 1e3) };
  }, [target]);
  const [t, setT] = useState(calc);
  useEffect(() => { const i = setInterval(() => setT(calc()), 1000); return () => clearInterval(i); }, [calc]);
  return (
    <div className="flex gap-4 sm:gap-6 justify-center">
      <CountdownItem value={t.days} label="Days" delay={200} />
      <CountdownItem value={t.hours} label="Hours" delay={350} />
      <CountdownItem value={t.mins} label="Minutes" delay={500} />
      <CountdownItem value={t.secs} label="Seconds" delay={650} />
    </div>
  );
}

/* ═══════════════ WISH CARD ═══════════════ */
function WishCard({ icon: Icon, title, message, delay }) {
  return (
    <FadeContent delay={delay} blur className="group">
      <div className="relative p-6 sm:p-8 rounded-3xl bg-white/[0.025] backdrop-blur-xl border border-white/[0.05] hover:border-pink-400/20 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10 hover:-translate-y-1.5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
            <Icon size={22} className="text-pink-300" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">{title}</h3>
          <p className="text-sm text-pink-100/35 leading-relaxed">{message}</p>
        </div>
      </div>
    </FadeContent>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */
export default function BirthdayPage() {
  const [loaded, setLoaded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const wishRef = useRef(null);

  useEffect(() => { setLoaded(true); }, []);

  const handleMakeWish = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3500);
    if (wishRef.current) {
      wishRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const wishes = [
    { icon: Heart, title: "With All My Heart", message: "May every beat of your heart be filled with pure joy and endless love. You deserve all the happiness in this world." },
    { icon: Sparkles, title: "Shine Bright", message: "Like the stars that light up the night sky, may your smile continue to brighten every room you enter." },
    { icon: Music, title: "A Beautiful Melody", message: "May your life be a symphony of laughter, adventure, and unforgettable moments that make your soul sing." },
    { icon: Gift, title: "Precious Moments", message: "Every day with you is a gift worth celebrating. May this new chapter bring surprises that take your breath away." },
    { icon: Flower, title: "Bloom and Grow", message: "Like the most beautiful flower in a garden, may you continue to bloom with grace, strength, and elegance." },
    { icon: Cake, title: "Sweet Celebrations", message: "Here is to another year of sweet memories, grand adventures, and the kind of happiness that makes your eyes sparkle." },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        body,html{font-family:'Outfit',sans-serif;background:#080006;overflow-x:hidden}
        .font-display{font-family:'Playfair Display',serif}
        @keyframes fp{
          0%,100%{transform:translateY(0) translateX(0) rotate(0deg)}
          25%{transform:translateY(-80px) translateX(20px) rotate(90deg)}
          50%{transform:translateY(-30px) translateX(-30px) rotate(180deg)}
          75%{transform:translateY(-100px) translateX(15px) rotate(270deg)}
        }
        @keyframes pg{0%,100%{opacity:.35;transform:scale(1)}50%{opacity:.65;transform:scale(1.06)}}
        .animate-pulse-glow{animation:pg 3s ease-in-out infinite}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        .shimmer-text{
          background:linear-gradient(90deg,#fda4af 0%,#fff 25%,#f9a8d4 50%,#fff 75%,#fda4af 100%);
          background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;
          background-clip:text;animation:shimmer 4s linear infinite;
        }
        .birthday-gradient span{
          color:#f9a8d4;
          text-shadow:0 0 40px rgba(236,72,153,0.3);
        }
        @keyframes hb{0%,100%{transform:scale(1)}15%{transform:scale(1.15)}30%{transform:scale(1)}45%{transform:scale(1.1)}60%{transform:scale(1)}}
        .animate-heartbeat{animation:hb 2s ease-in-out infinite}
        @keyframes ph{0%,100%{transform:translate(0,0) rotate(0);opacity:.5}50%{transform:translate(4px,-4px) rotate(5deg);opacity:.9}}
        @keyframes cubespin{0%{transform:rotateX(0) rotateY(0)}100%{transform:rotateX(360deg) rotateY(360deg)}}
        @keyframes confetti-fall{
          0%{transform:translate(0,0) rotate(0deg);opacity:1}
          100%{transform:translate(var(--cx),var(--cy)) rotate(var(--cr));opacity:0}
        }
        .hero-grad{
          background:radial-gradient(ellipse 80% 60% at 50% 30%,rgba(219,39,119,.12) 0%,rgba(168,34,108,.04) 40%,transparent 70%),
          radial-gradient(ellipse 50% 40% at 70% 70%,rgba(190,24,93,.06) 0%,transparent 50%);
        }
        ::-webkit-scrollbar{display:none}
        html{scrollbar-width:none}
      `}</style>

      <ConfettiBurst active={showConfetti} />

      <div className="min-h-screen bg-[#080006] text-white relative">
        <FloatingParticles />

        {/* ═══ HERO ═══ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 hero-grad overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pink-600/10 blur-[120px] animate-pulse-glow" />
          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
            <div className="mb-8 transition-all duration-1000" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transitionDelay: "200ms" }}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]">
                <Sparkles size={14} className="text-pink-400" />
                <span className="text-sm text-pink-200/70 tracking-widest uppercase font-medium">February 14th</span>
                <Cake size={14} className="text-pink-400" />
              </div>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold leading-none mb-2 tracking-tight text-white">
              <SplitText text="Happy" delay={500} />
            </h1>
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold leading-none mb-2 tracking-tight">
              <SplitText text="Birthday" delay={900} className="birthday-gradient" />
            </h1>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-none mb-6 tracking-tight text-pink-300/90 italic">
              <SplitText text="Sara" delay={1400} />
            </h2>

            <FadeContent delay={1800} className="mb-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-400/40" />
                <Sparkles size={20} className="text-pink-400 animate-pulse-glow" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-400/40" />
              </div>
            </FadeContent>

            <FadeContent delay={2000} blur>
              <p className="text-lg sm:text-xl text-pink-100/40 font-light max-w-lg leading-relaxed">
                A special day for a truly extraordinary soul. Today, the world celebrates <span className="text-pink-300 font-medium">you</span>.
              </p>
            </FadeContent>

            <FadeContent delay={2400}>
              <MagneticButton onClick={handleMakeWish} className="mt-10 group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 text-white font-medium shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-500 hover:scale-105 active:scale-95 border-0 cursor-pointer text-base">
                <Gift size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>Make a Wish</span>
                <Sparkles size={16} className="group-hover:rotate-45 transition-transform duration-500" />
              </MagneticButton>
            </FadeContent>
          </div>

          <FadeContent delay={3000} className="absolute bottom-8">
            <div className="flex flex-col items-center gap-2 opacity-40">
              <span className="text-xs tracking-widest uppercase text-pink-200/40">Scroll</span>
              <div className="w-5 h-8 rounded-full border border-pink-300/20 flex justify-center pt-1.5">
                <div className="w-1 h-2 rounded-full bg-pink-400/50 animate-bounce" />
              </div>
            </div>
          </FadeContent>
        </section>

        {/* ═══ SCROLL VELOCITY ═══ */}
        <section className="relative py-8 sm:py-12 overflow-hidden">
          <ScrollVelocity texts={["Happy Birthday Sara", "Born to Shine", "February 14th", "You Are Loved"]} baseSpeed={35} />
        </section>

        {/* ═══ COUNTDOWN ═══ */}
        <section className="relative py-24 sm:py-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FadeContent>
              <div className="inline-flex items-center gap-2 mb-6">
                <Cake size={18} className="text-pink-400" />
                <span className="text-sm text-pink-300/60 uppercase tracking-widest font-medium">Counting Down</span>
              </div>
            </FadeContent>
            <FadeContent delay={200}>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-12 tracking-tight">
                Until Sara's <ShimmerText text="Next Birthday" className="font-display" />
              </h2>
            </FadeContent>
            <Countdown />
          </div>
        </section>

        {/* ═══ 3D CUBES ═══ */}
        <section className="relative py-24 sm:py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-950/5 to-transparent" />
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <FadeContent className="mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                <Star size={18} className="text-pink-400" />
                <span className="text-sm text-pink-300/60 uppercase tracking-widest font-medium">Celebrations</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Wishes in <ShimmerText text="Every Dimension" className="font-display" />
              </h2>
              <p className="text-pink-100/25 text-sm mt-4 max-w-md mx-auto">Hover to pause the cubes and peek at the wishes inside</p>
            </FadeContent>
            <CubesSection />
          </div>
        </section>

        {/* ═══ STICKER PEEL ═══ */}
        <section className="relative py-24 sm:py-36 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(219,39,119,0.05),transparent_70%)]" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <FadeContent className="mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Gift size={18} className="text-pink-400" />
                <span className="text-sm text-pink-300/60 uppercase tracking-widest font-medium">Surprise</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Peel Your <ShimmerText text="Birthday Card" className="font-display" />
              </h2>
              <p className="text-pink-100/25 text-sm mt-4">Hover over the card and click to peel it open</p>
            </FadeContent>
            <FadeContent delay={300} blur>
              <StickerPeel />
            </FadeContent>
          </div>
        </section>

        {/* ═══ WISH MESSAGE ═══ */}
        <section ref={wishRef} className="relative py-24 sm:py-32 px-4 overflow-hidden">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <FadeContent><Heart size={40} className="text-pink-500/50 mx-auto mb-8 animate-heartbeat" /></FadeContent>
            <FadeContent delay={300} blur>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-8 leading-tight tracking-tight italic">
                "Sara, you are the kind of magic that the world needs more of"
              </h2>
            </FadeContent>
            <FadeContent delay={600} blur>
              <p className="text-base sm:text-lg text-pink-100/40 leading-relaxed max-w-xl mx-auto">
                On this beautiful day, I want you to know how incredibly special you are. Your laughter lights up the darkest corners, your kindness inspires everyone around you, and your spirit is nothing short of extraordinary. May this birthday be as magical as you are, filled with warmth, love, and all the beautiful things you truly deserve.
              </p>
            </FadeContent>
            <FadeContent delay={900}>
              <div className="flex items-center justify-center gap-3 mt-10">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-pink-500/30" />
                <Star size={14} className="text-pink-400/50" />
                <Star size={10} className="text-pink-300/30" />
                <Star size={14} className="text-pink-400/50" />
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-pink-500/30" />
              </div>
            </FadeContent>
          </div>
        </section>

        {/* ═══ SCROLL VELOCITY 2 ═══ */}
        <section className="relative py-6 overflow-hidden">
          <ScrollVelocity texts={["You Deserve the World", "Forever Young", "Celebrate Sara"]} baseSpeed={25} />
        </section>

        {/* ═══ WISH CARDS ═══ */}
        <section className="relative py-24 sm:py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <FadeContent className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-pink-400" />
                <span className="text-sm text-pink-300/60 uppercase tracking-widest font-medium">Birthday Wishes</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Made With <ShimmerText text="Love" className="font-display" />
              </h2>
            </FadeContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {wishes.map((w, i) => <WishCard key={i} {...w} delay={i * 150} />)}
            </div>
          </div>
        </section>

        {/* ═══ FINAL ═══ */}
        <section className="relative py-32 sm:py-44 px-4 text-center overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-pink-600/6 blur-[100px]" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <FadeContent>
              <div className="animate-heartbeat inline-block mb-8"><Heart size={56} className="text-pink-500" /></div>
            </FadeContent>
            <FadeContent delay={300} blur>
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-none">
                Cheers to <span className="italic shimmer-text">Sara</span>
              </h2>
            </FadeContent>
            <FadeContent delay={600} blur>
              <p className="text-pink-100/35 text-lg max-w-md mx-auto leading-relaxed">
                May your year ahead be painted in the most beautiful colors of happiness, love, and endless possibilities.
              </p>
            </FadeContent>
            <FadeContent delay={900}>
              <div className="mt-12 flex items-center justify-center gap-2 text-pink-300/30 text-sm">
                <span>Made with</span>
                <Sparkles size={14} className="text-pink-500" />
                <span>just for Sara</span>
              </div>
            </FadeContent>
          </div>
        </section>
      </div>
    </>
  );
}