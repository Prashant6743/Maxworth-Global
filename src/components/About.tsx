import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Play, Users, ShieldCheck, Cloud, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";
import ourStoryImg from "../assets/ourstory.png";

const highlights = [
  {
    icon: Users,
    title: "Two decades of partner-led expertise",
    desc: "Seasoned professionals delivering trusted guidance.",
  },
  {
    icon: ShieldCheck,
    title: "Fully compliant with all regulations",
    desc: "Ensuring complete adherence to evolving laws.",
  },
  {
    icon: Cloud,
    title: "Tech-forward cloud systems",
    desc: "Smart, secure & efficient solutions for modern businesses.",
  },
  {
    icon: TrendingUp,
    title: "Proactive advisory, not just filing",
    desc: "Actionable insights that drive real growth.",
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: true, amount: 0.08 });
  const isTextInView = useInView(textRef, { once: true, amount: 0.15 });
  const isImageInView = useInView(imageRef, { once: true, amount: 0.15 });

  // Parallax on the image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["4%", "-8%"]);

  const [, navigate] = useLocation();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-visible bg-background"
    >
      {/* ── MAIN SPLIT ROW ── */}
      <div className="relative flex flex-col lg:flex-row min-h-[520px] overflow-hidden">

        {/* ── LEFT: Text content ── */}
        <div
          ref={textRef}
          className="relative z-10 flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 py-16 lg:py-20 w-full lg:w-[52%] xl:w-[50%] bg-background"
        >
          {/* Section label - fade + slide down */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={isTextInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="flex items-center gap-2 mb-5"
          >
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ background: "hsl(38 88% 48%)" }}
              initial={{ scale: 0 }}
              animate={isTextInView ? { scale: 1 } : {}}
              transition={{ duration: 0.35, delay: 0.15, type: "spring", stiffness: 300 }}
            />
            <span className="text-[11px] uppercase tracking-[0.22em] font-bold text-gold">
              Our Story
            </span>
          </motion.div>

          {/* Gold divider - scale in from left */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={isTextInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="w-10 h-[2px] mb-8 origin-left"
            style={{ background: "linear-gradient(90deg, hsl(38 88% 42%), hsl(38 88% 60%))" }}
          />

          {/* Headline - word by word reveal from clip */}
          <div className="overflow-hidden mb-8">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={isTextInView ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold leading-[1.1] text-foreground"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
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
          </div>

          {/* Body paragraph 1 - fade + rise */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isTextInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="text-sm text-muted-foreground font-light leading-[1.85] mb-4 max-w-[440px]"
          >
            We have a team of Chartered Accountants, Advocates, Company Secretaries, Valuers, and other seasoned professionals who are committed to delivering precision-driven solutions across all your business and compliance needs. Based in Delhi and operating as PAN India service providers, we bring every expertise under one roof, partnering with clients across all sectors from the early-stage startups to established corporations.
          </motion.p>

          {/* Body paragraph 2 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isTextInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.40 }}
            className="text-sm text-muted-foreground font-light leading-[1.85] mb-10 max-w-[440px]"
          >
            Our philosophy is simple: every business deserves expert guidance, not just compliance. We go beyond the numbers to provide insights that drive real growth with 15+ years of collective expertise behind every recommendation.
          </motion.p>

          {/* CTA Buttons - slide up */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={isTextInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
          >
            {/* Primary button */}
            <button
              id="about-cta-discover"
              onClick={() => navigate("/about")}
              className="group relative flex items-center justify-center gap-2 overflow-hidden font-semibold uppercase tracking-[0.13em] text-[11px] text-white transition-all hover:shadow-[0_8px_28px_-6px_rgba(15,27,58,0.45)]"
              style={{
                background: "hsl(222 55% 18%)",
                height: "3rem",
                paddingLeft: "1.75rem",
                paddingRight: "1.75rem",
              }}
            >
              <span
                className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-[360ms] ease-out"
                style={{ background: "linear-gradient(90deg, hsl(38 88% 40%), hsl(38 88% 54%))" }}
              />
              <span className="relative z-10">Discover Our Journey</span>
              <ArrowUpRight className="relative z-10 w-3.5 h-3.5" />
            </button>

            {/* Secondary ghost button */}
            <button
              id="about-cta-watch"
              className="group flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.13em] text-foreground/75 hover:text-primary transition-colors"
            >
              <span className="w-9 h-9 rounded-full border border-border/70 flex items-center justify-center group-hover:border-gold/60 transition-colors">
                <Play className="w-3 h-3 fill-foreground/60 group-hover:fill-gold transition-colors" />
              </span>
              Watch Our Story
            </button>
          </motion.div>
        </div>

        {/* ── RIGHT: Image with diagonal clip + quote card ── */}
        <div
          ref={imageRef}
          className="relative w-full lg:w-[58%] xl:w-[60%] min-h-[440px] lg:min-h-0 overflow-hidden pb-14"
        >
          {/* Diagonal clip container - clip-path wipe reveal */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{ clipPath: "polygon(6% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            initial={{ clipPath: "polygon(6% 0%, 6% 0%, 6% 100%, 0% 100%)" }}
            animate={isImageInView
              ? { clipPath: "polygon(6% 0%, 100% 0%, 100% 100%, 0% 100%)" }
              : {}}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Parallax image */}
            <motion.img
              src={ourStoryImg}
              alt="Our Story - architectural path to city skyline at sunset"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center center", y: imgY }}
              initial={{ scale: 1.08, opacity: 0 }}
              animate={isImageInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
            {/* Subtle dark overlay */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, rgba(15,27,58,0.2) 0%, transparent 55%)" }}
            />
          </motion.div>

          {/* Quote card - spring slide in from bottom-right */}
          <motion.div
            initial={{ opacity: 0, y: 50, x: 30, scale: 0.92 }}
            animate={isImageInView ? { opacity: 1, y: 0, x: 0, scale: 1 } : {}}
            transition={{
              delay: 0.9,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 18,
            }}
            className="absolute bottom-24 right-16 lg:bottom-28 lg:right-20 z-20 max-w-[280px] p-6 shadow-2xl"
            style={{
              background: "hsl(222 55% 15%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Animated gold quote mark */}
            <motion.span
              className="block font-serif text-5xl leading-none mb-3"
              style={{ color: "hsl(38 88% 52%)" }}
              initial={{ opacity: 0, y: -10 }}
              animate={isImageInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.4 }}
            >
              "
            </motion.span>

            {/* Quote text - fade line by line */}
            <motion.p
              className="font-serif text-[15px] italic text-white/90 leading-snug"
              initial={{ opacity: 0 }}
              animate={isImageInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.35, duration: 0.55 }}
            >
              Our mission is to translate complex regulations into clear strategies, letting our clients focus entirely on what they do best.
            </motion.p>

            {/* Subtle gold bottom accent line */}
            <motion.div
              className="mt-4 h-[2px] origin-left"
              style={{ background: "linear-gradient(90deg, hsl(38 88% 52%), transparent)" }}
              initial={{ scaleX: 0 }}
              animate={isImageInView ? { scaleX: 1 } : {}}
              transition={{ delay: 1.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM: Highlights floating card overlay ── */}
      <div className="relative z-20 px-6 md:px-10 pb-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-border/30 rounded-2xl bg-white shadow-[0_8px_40px_-8px_rgba(15,27,58,0.14)] border border-border/20"
            style={{ marginTop: "-3.5rem" }}
          >
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.65 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-4 px-6 py-7 lg:px-8 group"
              >
                {/* Icon circle - scale-in with slight bounce */}
                <motion.div
                  className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-gold/20"
                  style={{ background: "hsl(38 88% 48% / 0.10)" }}
                  initial={{ scale: 0, rotate: -15 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{
                    delay: 0.72 + i * 0.1,
                    duration: 0.45,
                    type: "spring",
                    stiffness: 280,
                    damping: 18,
                  }}
                >
                  <item.icon
                    className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: "hsl(38 88% 42%)" }}
                  />
                </motion.div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-snug mb-1">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground font-light leading-snug">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
