import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, TrendingUp, Shield, Award } from "lucide-react";

const TICKER_ITEMS = [
  "GST Compliance", "Income Tax Filing", "Statutory Audit", "Company Registration",
  "Virtual CFO", "TDS Management", "MCA Filing", "Business Advisory",
  "Payroll Services", "FEMA Compliance", "Financial Planning", "ROC Services",
];

function FloatingParticle({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: "radial-gradient(circle, hsl(38 88% 48% / 0.35), transparent)",
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.4, 0.8, 0.4],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

const particles = [
  { delay: 0, x: "8%", y: "20%", size: 8 },
  { delay: 1.2, x: "18%", y: "70%", size: 5 },
  { delay: 0.5, x: "75%", y: "15%", size: 6 },
  { delay: 2, x: "85%", y: "60%", size: 10 },
  { delay: 0.8, x: "60%", y: "80%", size: 5 },
  { delay: 1.6, x: "40%", y: "10%", size: 7 },
  { delay: 3, x: "92%", y: "30%", size: 4 },
  { delay: 2.4, x: "5%", y: "50%", size: 6 },
];

const badges = [
  { icon: <TrendingUp className="w-3.5 h-3.5" />, text: "25+ Years" },
  { icon: <Shield className="w-3.5 h-3.5" />, text: "ICAI Registered" },
  { icon: <Award className="w-3.5 h-3.5" />, text: "500+ Clients" },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Mouse parallax
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const springX = useSpring(mouse.x, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouse.y, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMouse({
        x: (e.clientX / innerWidth - 0.5) * 20,
        y: (e.clientY / innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background"
    >
      {/* Animated gradient mesh blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary blob — blue-navy tint */}
        <motion.div
          className="absolute -top-[20%] -left-[15%] w-[65%] h-[65%] rounded-full animate-blob-1"
          style={{
            background: "radial-gradient(circle at 40% 40%, hsl(222 55% 85% / 0.55), hsl(210 60% 90% / 0.3) 60%, transparent)",
            filter: "blur(80px)",
          }}
        />
        {/* Gold-warm blob */}
        <motion.div
          className="absolute -bottom-[15%] -right-[10%] w-[60%] h-[60%] rounded-full animate-blob-2"
          style={{
            background: "radial-gradient(circle at 60% 60%, hsl(38 88% 92% / 0.7), hsl(36 60% 88% / 0.4) 60%, transparent)",
            filter: "blur(80px)",
          }}
        />
        {/* Subtle center glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[40%] opacity-30"
          style={{
            background: "radial-gradient(ellipse, hsl(38 88% 48% / 0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Dot-grid overlay */}
        <div className="absolute inset-0 dot-grid opacity-60" />
      </div>

      {/* Floating Particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-28 pb-20"
      >
        <div className="grid lg:grid-cols-12 gap-16 items-center min-h-[75vh]">

          {/* Left — Content */}
          <div className="lg:col-span-7 flex flex-col">

            {/* Eyebrow badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              {badges.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-border/70 shadow-sm text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  <span className="text-gold">{b.icon}</span>
                  {b.text}
                </motion.div>
              ))}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[11px] uppercase tracking-[0.2em] font-semibold text-muted-foreground/70"
              >
                — India's Trusted CA Firm
              </motion.span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-serif font-bold leading-[0.92] mb-8" style={{ fontSize: "clamp(3.5rem, 8vw, 7.5rem)" }}>
              {["Where", "Numbers", "Build"].map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.85, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {word}{" "}
                  </motion.span>
                </div>
              ))}
              <div className="overflow-hidden">
                <motion.span
                  className="inline-block italic"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.85, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: "linear-gradient(120deg, hsl(38 88% 38%), hsl(38 88% 55%), hsl(38 88% 42%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Empires.
                </motion.span>
              </div>
            </h1>

            {/* Gold divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-20 h-[2px] mb-8 origin-left"
              style={{ background: "linear-gradient(90deg, hsl(38 88% 48%), hsl(38 88% 60%))" }}
            />

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="text-base md:text-lg text-muted-foreground font-light leading-[1.85] mb-12 max-w-[520px]"
            >
              A prestigious Chartered Accountant firm delivering deep financial expertise, strategic advisory, and unwavering compliance for businesses that demand excellence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
            >
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative flex items-center justify-center gap-3 h-14 px-8 overflow-hidden font-semibold uppercase tracking-[0.14em] text-[12px] text-white transition-all hover:shadow-[0_8px_32px_-6px_rgba(15,27,58,0.5)]"
                style={{ background: "hsl(222 55% 18%)" }}
              >
                <span className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400 ease-out" style={{ background: "linear-gradient(90deg, hsl(38 88% 42%), hsl(38 88% 55%))" }} />
                <span className="relative z-10">Schedule Consultation</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground/80 hover:text-primary transition-colors"
              >
                <span className="relative">
                  Explore Services
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gold group-hover:w-full transition-all duration-300" />
                </span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </button>
            </motion.div>
          </div>

          {/* Right — Floating Card Stack */}
          <motion.div
            style={{ x: springX, y: springY }}
            className="lg:col-span-5 relative hidden lg:flex items-center justify-center"
          >
            {/* Main image */}
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[400px] aspect-[3/4] shadow-[0_32px_80px_-16px_rgba(15,27,58,0.25)]"
            >
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=85"
                alt="Professional financial consultation"
                className="w-full h-full object-cover"
                style={{ filter: "contrast(1.05) saturate(0.9)" }}
              />
              {/* Subtle vignette */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 60%, hsl(222 55% 10% / 0.4))" }} />

              {/* Gold frame */}
              <div className="absolute top-5 -right-5 w-full h-full border border-gold/40 -z-10" />
            </motion.div>

            {/* Floating Est. card */}
            <motion.div
              initial={{ opacity: 0, y: 24, x: 12 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.3, duration: 0.7, type: "spring", stiffness: 160, damping: 22 }}
              className="absolute -bottom-8 -left-10 glass px-6 py-4 shadow-xl"
              style={{ border: "1px solid hsl(38 88% 48% / 0.35)" }}
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-1">Established</p>
              <p className="font-serif text-2xl font-bold text-primary italic">1998</p>
            </motion.div>

            {/* Floating trust badge */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.7, type: "spring", stiffness: 150, damping: 20 }}
              className="absolute -top-4 -right-8 glass px-5 py-3.5 shadow-lg flex items-center gap-3"
              style={{ border: "1px solid rgba(255,255,255,0.9)" }}
            >
              <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center">
                <Shield className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">ICAI Member</p>
                <p className="text-[13px] font-bold text-primary">Certified &amp; Trusted</p>
              </div>
            </motion.div>

            {/* Animated stat ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.7, duration: 0.5 }}
              className="animate-pulse-gold absolute -bottom-6 right-4 w-16 h-16 rounded-full bg-white shadow-lg flex flex-col items-center justify-center"
              style={{ border: "2px solid hsl(38 88% 48% / 0.3)" }}
            >
              <span className="font-serif font-bold text-lg leading-none text-primary">500+</span>
              <span className="text-[9px] uppercase tracking-wide text-muted-foreground">Clients</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Service Ticker */}
      <div className="relative z-10 border-t border-b border-border/60 bg-white/60 backdrop-blur-sm overflow-hidden py-4">
        <div className="flex gap-0 animate-ticker whitespace-nowrap" style={{ width: "max-content" }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 mx-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/50">
              {item}
              <span className="w-1 h-1 rounded-full bg-gold inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-10 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
