import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";

const highlights = [
  "Two decades of partner-led expertise",
  "ICAI registered & fully compliant",
  "Tech-forward cloud-based systems",
  "Proactive advisory, not just reactive filing",
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const isTextInView = useInView(textRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [30, -50]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden bg-background"
    >
      {/* Faint background grid */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* Large decorative number */}
      <motion.div
        style={{ y: bgY }}
        className="absolute right-0 top-0 select-none pointer-events-none overflow-hidden"
      >
        <span
          className="font-serif font-bold text-[22rem] leading-none text-primary opacity-[0.025]"
          style={{ lineHeight: 0.8 }}
        >
          25
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[11px] uppercase tracking-[0.22em] font-semibold text-gold mb-4 text-center"
        >
          Our Story
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-12 h-[2px] mx-auto mb-20 origin-left"
          style={{ background: "linear-gradient(90deg, hsl(38 88% 42%), hsl(38 88% 60%))" }}
        />

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Image Column */}
          <div className="relative h-[580px] w-full max-w-[480px] mx-auto lg:mx-0 hidden lg:block">
            {/* Animated gold frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="absolute top-6 -right-6 w-full h-full"
              style={{ border: "1.5px solid hsl(38 88% 48% / 0.45)" }}
            />

            {/* Main image with parallax */}
            <motion.div
              style={{ y: imgY }}
              className="absolute inset-0 overflow-hidden shadow-[0_24px_64px_-12px_rgba(15,27,58,0.2)]"
            >
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=900&q=85"
                alt="Senior partner at desk"
                className="w-full h-full object-cover"
                style={{ filter: "contrast(1.05) saturate(0.85)" }}
              />
              {/* Bottom dark gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(15,27,58,0.55), transparent)" }} />
            </motion.div>

            {/* Overlapping accent image */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 20 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
              className="absolute -bottom-10 -right-10 w-56 h-56 z-20 overflow-hidden"
              style={{
                border: "4px solid white",
                boxShadow: "0 12px 40px -8px rgba(15,27,58,0.25)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1554200876-56c2f25224fa?auto=format&fit=crop&w=600&q=85"
                alt="Document review"
                className="w-full h-full object-cover"
                style={{ filter: "contrast(1.05) saturate(0.85)" }}
              />
            </motion.div>

            {/* Partner name badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute bottom-5 left-5 z-30 glass px-5 py-3"
              style={{ border: "1px solid hsl(38 88% 48% / 0.3)" }}
            >
              <p className="font-serif text-white text-lg font-bold italic">R. Maxworth</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-medium">Senior Partner, FCA</p>
            </motion.div>
          </div>

          {/* Text Column */}
          <div ref={textRef} className="relative">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold text-4xl md:text-5xl lg:text-[3.2rem] text-foreground mb-8 leading-[1.1]"
            >
              A legacy built on{" "}
              <span
                className="italic"
                style={{
                  background: "linear-gradient(120deg, hsl(38 88% 38%), hsl(38 88% 55%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                trust
              </span>{" "}
              &amp; sharp acumen.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-base text-muted-foreground font-light leading-[1.9] mb-5"
            >
              For over two decades, The Maxworth Global has stood as a pillar of financial clarity and strategic compliance. We believe that accounting is more than numbers — it's about providing peace of mind and unlocking your growth potential.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base text-muted-foreground font-light leading-[1.9] mb-10"
            >
              Our approach marries strict precision with warm, accessible partnership. We don't just audit and file — we advise, protect, and propel your business forward.
            </motion.p>

            {/* Highlights checklist */}
            <div className="space-y-4 mb-12">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isTextInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-4.5 h-4.5 text-gold shrink-0" style={{ width: 18, height: 18 }} />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Pull Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="relative pl-8 mb-12 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:rounded-full"
              style={{ borderLeft: "3px solid hsl(38 88% 48%)" }}
            >
              <span
                className="absolute -top-4 left-4 font-serif text-6xl leading-none"
                style={{ color: "hsl(38 88% 48%)", opacity: 0.5 }}
              >
                "
              </span>
              <p className="font-serif text-xl text-foreground italic leading-snug">
                Our mission is to translate complex regulations into clear strategies, letting our clients focus entirely on what they do best.
              </p>
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                — R. Maxworth, Senior Partner FCA
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="group relative h-13 px-8 overflow-hidden font-semibold uppercase tracking-[0.14em] text-[12px] flex items-center gap-2 transition-all"
              style={{
                height: "3.25rem",
                border: "1.5px solid hsl(222 55% 18%)",
                color: "hsl(222 55% 18%)",
              }}
            >
              <span
                className="absolute inset-0 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-350 ease-out"
                style={{ background: "hsl(222 55% 18%)" }}
              />
              <span className="relative z-10 group-hover:text-white transition-colors">Speak with a Partner</span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
