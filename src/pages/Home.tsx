import { useState, useCallback, useEffect, useRef, MouseEvent } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { ChevronDown, ArrowRight, X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const heroImages = [
  { url: "https://res.cloudinary.com/dwdjqhjs4/image/upload/v1777184682/2026-02-20_15-09-58_u2ye8z.jpg", title: "Photography" },
  { url: "https://picsum.photos/seed/hero1/1200/800", title: "Travels" },
  { url: "https://picsum.photos/seed/hero2/1200/800", title: "Projects" },
  { url: "https://picsum.photos/seed/hero3/1200/800", title: "Journal" },
  { url: "https://picsum.photos/seed/hero4/1200/800", title: "Experiments" },
];

const galleryImages = [
  { url: "https://res.cloudinary.com/dwdjqhjs4/image/upload/v1777184682/2026-02-20_15-09-58_u2ye8z.jpg", title: "Shibuya, 2026" },
  { url: "https://picsum.photos/seed/gal2/800/800", title: "Urban Geometry" },
  { url: "https://picsum.photos/seed/gal3/800/800", title: "Light Study" },
  { url: "https://picsum.photos/seed/gal4/800/800", title: "Minimalist Space" },
  { url: "https://picsum.photos/seed/gal5/800/800", title: "Texture & Depth" },
  { url: "https://picsum.photos/seed/gal6/800/800", title: "Void Exploration" },
];

const journalPosts = [
  { id: "post-1", title: "The Ethics of Visual Weight", date: "Oct 24, 2023" },
  { id: "post-2", title: "Glassmorphism in 2024", date: "Sep 12, 2023" },
  { id: "post-3", title: "Brutalist Design Systems", date: "Aug 05, 2023" },
  { id: "post-4", title: "The Power of Negative Space", date: "Jul 18, 2023" },
  { id: "post-5", title: "Future of Web Interaction", date: "Jun 30, 2023" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   EDITABLE CONFIG
   ═══════════════════════════════════════════════════════════════════════════ */
const CONFIG = {
  /* Visual */
  bgColor:         '#ffffff',  // background fill colour
  bgAlpha:         0,        // background opacity: 0 (transparent) → 1 (solid)
  lineColor:       '#000000',  // grid line colour
  lineWidth:       0.5,          // grid line thickness in px (CSS pixels)
  lineAlpha:       1,          // grid line opacity: 0 → 1

  /* Layout */
  cellSize:        20,         // px between grid lines — smaller = denser grid

  /* Distortion */
  distortRadius:   260,        // px — radius of the warp zone around the cursor
  distortStrength: 40,         // px — max displacement at the cursor centre
  easeSpeed:       0.12,       // 0–1: lower = smoother/slower, higher = snappier
};
/* ═══════════════════════════════════════════════════════════════════════════ */

function hexToRgb(hex: string) {
  hex = hex.replace('#', '');
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16)
  };
}

function SoftGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -99999, y: -99999 });
  const cursorRef = useRef({ x: -99999, y: -99999 });
  const firstMoveRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let W = 0, H = 0;

    const resize = () => {
      const DPR = window.devicePixelRatio || 1;
      W = window.innerWidth;
      H = window.innerHeight;

      canvas.width  = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const distort = (rx: number, ry: number) => {
      const dx = rx - cursorRef.current.x;
      const dy = ry - cursorRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const R = CONFIG.distortRadius;
      if (dist >= R || dist < 0.0001) return { x: rx, y: ry };
      const t = 1 - dist / R;
      const push = t * t * CONFIG.distortStrength;
      return {
        x: rx + (dx / dist) * push,
        y: ry + (dy / dist) * push,
      };
    };

    const draw = () => {
      cursorRef.current.x += (mouseRef.current.x - cursorRef.current.x) * CONFIG.easeSpeed;
      cursorRef.current.y += (mouseRef.current.y - cursorRef.current.y) * CONFIG.easeSpeed;

      ctx.clearRect(0, 0, W, H);

      if (CONFIG.bgAlpha > 0) {
        const bg = hexToRgb(CONFIG.bgColor);
        ctx.fillStyle = `rgba(${bg.r},${bg.g},${bg.b},${CONFIG.bgAlpha})`;
        ctx.fillRect(0, 0, W, H);
      }

      const lc = hexToRgb(CONFIG.lineColor);
      ctx.strokeStyle = `rgba(${lc.r},${lc.g},${lc.b},${CONFIG.lineAlpha})`;
      ctx.lineWidth   = CONFIG.lineWidth;
      ctx.lineCap     = 'round'; 
      ctx.lineJoin    = 'round';

      const bleed = CONFIG.distortStrength + CONFIG.cellSize;
      const xs = [];
      for (let x = -bleed; x <= W + bleed; x += CONFIG.cellSize) xs.push(x);
      const ys = [];
      for (let y = -bleed; y <= H + bleed; y += CONFIG.cellSize) ys.push(y);

      for (let ci = 0; ci < xs.length; ci++) {
        ctx.beginPath();
        for (let ri = 0; ri < ys.length; ri++) {
          const p = distort(xs[ci], ys[ri]);
          if (ri === 0) ctx.moveTo(p.x, p.y);
          else          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      for (let ri2 = 0; ri2 < ys.length; ri2++) {
        ctx.beginPath();
        for (let ci2 = 0; ci2 < xs.length; ci2++) {
          const p2 = distort(xs[ci2], ys[ri2]);
          if (ci2 === 0) ctx.moveTo(p2.x, p2.y);
          else           ctx.lineTo(p2.x, p2.y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMoveGlobal = (e: globalThis.MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = { x, y };
      if (firstMoveRef.current) {
        cursorRef.current.x = x;
        cursorRef.current.y = y;
        firstMoveRef.current = false;
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMoveGlobal);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMoveGlobal);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-15"
    />
  );
}

function GrainOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" style={{ maskImage: 'radial-gradient(circle, transparent 20%, black 80%)', WebkitMaskImage: 'radial-gradient(circle, transparent 20%, black 80%)' }}>
      <div className="absolute inset-0 w-full h-full opacity-[0.25] mix-blend-overlay" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='discrete' tableValues='0 1'/%3E%3CfeFuncG type='discrete' tableValues='0 1'/%3E%3CfeFuncB type='discrete' tableValues='0 1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}

function HeroImage({ img, progress, centerPoint, step }: { img: any, progress: any, centerPoint: number, step: number, key?: any }) {
  const scale = useTransform(progress, (v: number) => {
    const dist = Math.abs(v - centerPoint);
    const factor = Math.max(0, 1 - dist / (step * 1.5));
    return 0.8 + factor * 0.4;
  });
  
  const opacity = useTransform(progress, (v: number) => {
    const dist = Math.abs(v - centerPoint);
    const factor = Math.max(0, 1 - dist / (step * 2));
    return 0.4 + factor * 0.6;
  });

  return (
    <motion.div 
      style={{ scale, opacity }}
      className="relative flex-shrink-0 w-[70vw] md:w-[50vw] aspect-[4/5] md:aspect-video overflow-hidden border border-black/10 shadow-2xl z-20"
    >
      <img 
        src={img.url} 
        alt={img.title} 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
        <h2 className="text-3xl md:text-5xl font-display tracking-tighter text-white">{img.title}</h2>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    }
  }, [lightboxIndex]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  }, [lightboxIndex]);

  const handleClose = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev, handleClose]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const springX = useSpring(x, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="relative">
      {/* Hero Section - Sticky Scroll */}
      <section ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden vignette-grain">
          {/* Interactive Grid */}
          <SoftGrid />
          
          {/* SVG Grain Overlay */}
          <GrainOverlay />

          <div className="h-full relative z-20 flex items-center">
            <motion.div 
              style={{ x: springX }}
              className="flex items-center px-[15vw] md:px-[25vw] gap-8 md:gap-16"
            >
              {heroImages.map((img, index) => {
                // Calculate scale based on scroll progress
                // Each image is centered at a certain progress point
                const step = 1 / (heroImages.length - 1);
                const centerPoint = index * step;
                
                return (
                  <HeroImage 
                    key={index} 
                    img={img} 
                    progress={scrollYProgress} 
                    centerPoint={centerPoint} 
                    step={step}
                  />
                );
              })}
            </motion.div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer z-20">
            <span className="text-[10px] font-mono uppercase tracking-widest text-black/60 group-hover:text-black transition-colors">Scroll to explore</span>
            <div className="relative w-12 h-12 flex items-center justify-center border border-black/10 rounded-full group-hover:border-brutal-red transition-colors overflow-hidden">
              <motion.div
                className="w-1.5 h-1.5 bg-black rounded-full"
                animate={{ 
                  y: [0, 10],
                  opacity: [0.4, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  duration: 0.75,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-screen flex items-center px-6 md:px-12 py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <h2 className="text-6xl md:text-8xl font-display tracking-tighter leading-none">
              Filip <br />
              <span className="text-outline">Cernak</span> <br />
              Cernak
            </h2>
            <div className="max-w-md space-y-6">
              <p className="text-xl text-white/60 leading-relaxed">
                A minimalist space designed to showcase digital media, record memories, share passion for photography and art.
              </p>
              <p className="text-sm text-white/40 leading-relaxed">
                Designing and creating a personal space, outside of large platforms and with full control over content.
              </p>
              <Link to="/about" className="inline-flex items-center gap-4 text-sm font-mono uppercase tracking-widest group">
                Learn More <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden border border-white/10">
              <img 
                src="https://picsum.photos/seed/about/800/1200" 
                alt="About" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-white/10 bg-obsidian p-4 hidden md:block">
              <div className="w-full h-full border border-white/5 flex items-center justify-center text-[10px] font-mono text-white/20 uppercase text-center">
                Est. 2024 <br /> Studio.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="px-6 md:px-12 py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="flex justify-between items-end">
            <h2 className="text-5xl md:text-7xl font-display tracking-tighter">GALLERY.</h2>
            <Link to="/gallery" className="text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {galleryImages.map((img, index) => (
              <div 
                key={index} 
                className="relative aspect-square overflow-hidden group cursor-pointer border border-white/5"
                onClick={() => setLightboxIndex(index)}
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brutal-red/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs font-mono uppercase tracking-widest font-bold">View Project</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journal Section */}
      <section className="px-6 md:px-12 py-20 border-t border-white/10 bg-white/2">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="space-y-8">
            <h2 className="text-5xl font-display tracking-tighter">JOURNAL.</h2>
            <p className="text-sm text-white/40 leading-relaxed">
              Exploration and documenting of photography, design, technology, and travels. Updated occasionally.
            </p>
            <Link to="/journal" className="inline-flex items-center gap-4 text-sm font-mono uppercase tracking-widest group text-brutal-red">
              Read More <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          <div className="lg:col-span-2 divide-y divide-white/10">
            {journalPosts.map((post) => (
              <Link 
                key={post.id} 
                to={`/journal/${post.id}`}
                className="flex items-center justify-between py-8 group"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{post.date}</span>
                  <h3 className="text-2xl font-display group-hover:text-brutal-red transition-colors">{post.title}</h3>
                </div>
                <ArrowUpRight size={24} className="text-white/10 group-hover:text-white transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-obsidian/95 flex items-center justify-center p-6 md:p-12"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={galleryImages[lightboxIndex].url} 
                alt={galleryImages[lightboxIndex].title} 
                className="max-w-full max-h-full object-contain"
                referrerPolicy="no-referrer"
              />
              
              <button 
                className="absolute top-4 right-4 md:top-10 md:right-10 text-white hover:text-brutal-red transition-colors z-[110] bg-black/20 rounded-full p-2"
                onClick={handleClose}
              >
                <X size={32} />
              </button>
              <div className="absolute top-1/2 -left-12 -translate-y-1/2">
                <button 
                  className="p-4 hover:text-brutal-red transition-colors"
                  onClick={handlePrev}
                >
                  <ChevronLeft size={40} />
                </button>
              </div>
              <div className="absolute top-1/2 -right-12 -translate-y-1/2">
                <button 
                  className="p-4 hover:text-brutal-red transition-colors"
                  onClick={handleNext}
                >
                  <ChevronRight size={40} />
                </button>
              </div>
              <div className="absolute -bottom-12 left-0 right-0 text-center">
                <h4 className="text-xl font-display tracking-tighter">{galleryImages[lightboxIndex].title}</h4>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
