import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImage from "../assets/image.png";

const TICKER_ITEMS = [
  "GST Compliance", "Income Tax Filing", "Statutory Audit", "Company Registration",
  "Virtual CFO", "TDS Management", "MCA Filing", "Business Advisory",
  "Payroll Services", "FEMA Compliance", "Financial Planning", "ROC Services",
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  // Subtle mouse parallax on image
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const springX = useSpring(mouse.x, { stiffness: 45, damping: 16 });
  const springY = useSpring(mouse.y, { stiffness: 45, damping: 16 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMouse({
        x: (e.clientX / innerWidth - 0.5) * 14,
        y: (e.clientY / innerHeight - 0.5) * 10,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Must match exact CSS background variable (hsl(40 33% 96%))
  const bg = "hsl(40, 33%, 96%)";

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative flex flex-col overflow-hidden bg-background"
      style={{ minHeight: "100svh", paddingTop: "78px" }}
    >


      {/* ═══════════════════════════════════════════
          HERO BODY — image + text (between badges & ticker)
      ═══════════════════════════════════════════ */}
      <div className="relative flex-1 min-h-0 flex flex-col">
        {/* Right-side hero image — matches reference split (~55–58% width) */}
        <div className="absolute inset-0 right-0 left-0 md:left-[34%] lg:left-[38%] z-0 overflow-hidden pointer-events-none">
          <motion.div
            style={{ x: springX, y: springY, scale: imgScale }}
            className="absolute inset-0"
          >
            <motion.img
              src={heroImage}
              alt="Financial workspace showing charts and reports"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "88% 42%" }}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          </motion.div>

          {/* Left fade into page background */}
          <div
            className="absolute inset-y-0 left-0 z-10 w-[32%] md:w-[25%]"
            style={{
              background: `linear-gradient(to right, ${bg} 0%, transparent 100%)`,
            }}
          />

          {/* Soft top/bottom edge blend */}
          <div
            className="absolute inset-x-0 top-0 z-10 h-16"
            style={{
              background: `linear-gradient(to bottom, ${bg} 0%, transparent 100%)`,
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 z-10 h-12"
            style={{
              background: `linear-gradient(to top, ${bg} 0%, transparent 100%)`,
            }}
          />

          <div className="absolute inset-0 dot-grid opacity-20 z-20 mix-blend-multiply" />
        </div>

        {/* Page background on left column */}
        <div
          className="absolute inset-0 right-0 md:right-auto md:w-[34%] lg:w-[38%] z-0 pointer-events-none"
          style={{ background: bg }}
        />

      {/* ═══════════════════════════════════════════
          MAIN TEXT CONTENT
      ═══════════════════════════════════════════ */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-30 flex-1 flex items-center py-10 md:py-14 lg:py-16"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
          <div className="max-w-[580px] transform md:-translate-x-2 lg:-translate-x-4 xl:-translate-x-6 2xl:-translate-x-20">

            {/* Headline */}
            <h1
              className="font-serif font-bold leading-[0.92] mb-6 text-primary"
              style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
            >
              {["Where", "Numbers", "Build"].map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.85, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {word}{" "}
                  </motion.span>
                </div>
              ))}
              <div
                className="overflow-hidden"
                style={{ paddingBottom: "0.28em", marginBottom: "-0.28em" }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.85, delay: 0.66, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    className="italic"
                    style={{
                      background: "linear-gradient(120deg, hsl(38 88% 36%), hsl(38 88% 54%), hsl(38 88% 40%))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      display: "inline-block",
                      paddingRight: "0.12em",
                      paddingBottom: "8px",
                    }}
                  >
                    Empires.
                  </span>
                </motion.span>
              </div>
            </h1>

            {/* Gold rule */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.82, ease: [0.16, 1, 0.3, 1] }}
              className="w-20 h-[2px] mb-7 origin-left"
              style={{ background: "linear-gradient(90deg, hsl(38 88% 46%), hsl(38 88% 62%))" }}
            />

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.68, delay: 0.9 }}
              className="text-base text-muted-foreground font-light leading-[1.88] mb-10 max-w-[460px]"
            >
              Your trusted partner for comprehensive financial, taxation, and business compliance solutions. Established in Delhi and serving clients across India — we bring together 15+ years of collective expertise to help individuals, startups, and enterprises navigate compliance with confidence.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.58, delay: 1.05 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
            >
              <button
                id="hero-cta-consult"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative flex items-center justify-center gap-3 h-13 px-7 overflow-hidden font-semibold uppercase tracking-[0.14em] text-[12px] text-white transition-all hover:shadow-[0_8px_30px_-6px_rgba(15,27,58,0.45)]"
                style={{ background: "hsl(222 55% 18%)", height: "3.25rem" }}
              >
                <span
                  className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-[380ms] ease-out"
                  style={{ background: "linear-gradient(90deg, hsl(38 88% 40%), hsl(38 88% 54%))" }}
                />
                <span className="relative z-10">Schedule Consultation</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-cta-services"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground/80 hover:text-primary transition-colors"
              >
                <span className="relative">
                  Explore Services
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-gold group-hover:w-full transition-all duration-300" />
                </span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      </div>

      {/* ═══════════════════════════════════════════
          SERVICE TICKER
      ═══════════════════════════════════════════ */}
      <div className="relative z-40 border-t border-b border-border/60 bg-white/70 backdrop-blur-sm overflow-hidden py-4">
        <div className="flex gap-0 animate-ticker whitespace-nowrap" style={{ width: "max-content" }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 mx-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/50"
            >
              {item}
              <span className="w-1 h-1 rounded-full bg-gold inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SCROLL INDICATOR
      ═══════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-24 right-10 z-30 flex flex-col items-center gap-2 hidden lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60 font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-10 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
