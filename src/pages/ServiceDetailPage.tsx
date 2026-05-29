import { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import {
  ArrowLeft, ArrowUpRight, CheckCircle2, FileText,
  Phone, Mail, ChevronDown, Shield, Zap, Clock, Star,
  ChevronRight
} from "lucide-react";
import { getServiceBySlug, getServicesByCategory } from "@/data/services";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";


// ─── Category meta ──────────────────────────────────────────────────────────
const categoryMeta: Record<string, { label: string; color: string; dark: string }> = {
  startup: { label: "Startup", color: "hsl(155 55% 35%)", dark: "hsl(155 55% 25%)" },
  licence: { label: "Licence", color: "hsl(38 88% 46%)", dark: "hsl(38 88% 36%)" },
  roc: { label: "ROC", color: "hsl(280 45% 45%)", dark: "hsl(280 45% 32%)" },
  "tax-payroll": { label: "Tax & Payroll", color: "hsl(222 65% 45%)", dark: "hsl(222 65% 30%)" },
  "misc-reg": { label: "Miscellaneous", color: "hsl(210 65% 40%)", dark: "hsl(210 65% 28%)" },
  other: { label: "Other Services", color: "hsl(10 75% 48%)", dark: "hsl(10 75% 35%)" },
};

// ─── Animated Grid Background ────────────────────────────────────────────────
// Squares that subtly animate and pulse - the star of the light theme
function GridBackground({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${color}18 1.5px, transparent 1.5px),
            linear-gradient(90deg, ${color}18 1.5px, transparent 1.5px)
          `,
          backgroundSize: "52px 52px",
        }}
      />
      {/* Larger accent grid on top */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${color}08 1px, transparent 1px),
            linear-gradient(90deg, ${color}08 1px, transparent 1px)
          `,
          backgroundSize: "208px 208px",
        }}
      />
      {/* Radial fade-out to keep edges clean */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at 50% 40%, transparent 40%, hsl(220 30% 97%) 100%)",
        }}
      />
    </div>
  );
}

// ─── Subtle floating square ──────────────────────────────────────────────────
function FloatingSquare({ x, y, size, color, delay = 0, rotate = 0 }: {
  x: string; y: string; size: number; color: string; delay?: number; rotate?: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none rounded-xl border"
      style={{
        left: x, top: y,
        width: size, height: size,
        borderColor: `${color}28`,
        background: `${color}06`,
        transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
      }}
      animate={{
        rotate: [rotate, rotate + 8, rotate],
        scale: [1, 1.06, 1],
        opacity: [0.5, 0.9, 0.5],
      }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

// ─── FAQ Item - light theme ──────────────────────────────────────────────────
function FAQItem({ q, a, index, color }: { q: string; a: string; index: number; color: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="border rounded-2xl overflow-hidden"
      style={{
        background: open ? `${color}05` : "#fff",
        borderColor: open ? `${color}35` : "hsl(220 20% 91%)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        transition: "border-color 0.3s, background 0.3s",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-7 py-5 text-left"
      >
        <span className="font-medium text-[15px] pr-4" style={{ color: "hsl(222 55% 14%)" }}>{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: open ? color : "hsl(220 15% 55%)" }} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-7 pb-6 text-[14px] leading-[1.85]" style={{ color: "hsl(222 20% 42%)" }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Animated Process Timeline ────────────────────────────────────────────────
// ─── Web3 Sticky Scroll Process Timeline ─────────────────────────────────────
function ProcessTimeline({ steps, color }: { steps: { title: string; desc: string }[]; color: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Drive the vertical line fill: scaleY 0→1
  const lineScaleY = useTransform(scrollYProgress, [0, 0.95], [0, 1]);

  // Update active step as user scrolls
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(Math.floor(v * steps.length), steps.length - 1);
    setActiveStep(idx);
  });


  return (
    // Outer: this is the scrollable tall container
    <div ref={containerRef} style={{ height: `${steps.length * 100}vh`, background: "hsl(222 55% 9%)" }} className="relative">

      {/* Sticky inner viewport - starts below navbar (78px) */}
      <div
        className="sticky top-[78px] w-full flex flex-col"
        style={{ background: "hsl(222 55% 9%)", overflow: "clip", height: "calc(100vh - 78px)" }}
      >
        {/* Ambient glow blob */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "20%", left: "30%",
            width: 520, height: 520,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${color}20, transparent 70%)`,
            filter: "blur(80px)",
            transform: "translate(-50%,-50%)",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${color}0a 1.5px, transparent 1.5px), linear-gradient(90deg, ${color}0a 1.5px, transparent 1.5px)`,
            backgroundSize: "52px 52px",
          }}
        />

        {/* ── Title row - sticky at top ── */}
        <div className="relative z-20 pt-7 pb-5 text-center flex-shrink-0 border-b" style={{ borderColor: `${color}15` }}>
          <span
            className="text-[10px] uppercase tracking-[0.28em] font-bold mb-1.5 block"
            style={{ color }}
          >
            How It Works
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
            Our Process
          </h2>
          <div
            className="mt-3 mx-auto w-20 h-[2px] rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
          />
        </div>

        {/* ── Content: timeline + card, fills remaining height ── */}
        <div className="relative flex-1 flex items-center">
          <div className="relative w-full max-w-7xl mx-auto px-6 md:px-14 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center py-8">

            {/* ── LEFT: Vertical timeline (desktop only) ── */}
            <div className="hidden lg:flex flex-col items-center relative" style={{ minWidth: 80 }}>
              {/* Track line (grey) */}
              <div
                className="absolute rounded-full"
                style={{
                  top: 36, bottom: 0, left: "50%",
                  width: 2,
                  transform: "translateX(-50%)",
                  background: "rgba(255,255,255,0.07)",
                }}
              />
              {/* Animated fill line */}
              <motion.div
                className="absolute rounded-full origin-top"
                style={{
                  top: 36, left: "50%",
                  width: 2,
                  height: `calc(100% - 36px)`,
                  scaleY: lineScaleY,
                  transform: "translateX(-50%)",
                  background: `linear-gradient(180deg, ${color}, ${color}44)`,
                  boxShadow: `0 0 18px ${color}80`,
                }}
              />

              {/* Step nodes */}
              <div className="flex flex-col gap-[52px] relative z-10">
                {steps.map((s, i) => {
                  const done = activeStep > i;
                  const current = activeStep === i;
                  return (
                    <div key={i} className="flex flex-col items-center">
                      {/* Node */}
                      <div className="relative flex items-center justify-center">
                        {/* Outer glow ring - only on current */}
                        {current && (
                          <motion.div
                            className="absolute rounded-full"
                            style={{
                              width: 48, height: 48,
                              border: `1.5px solid ${color}`,
                            }}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                          />
                        )}
                        {/* Main circle */}
                        <motion.div
                          className="relative w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-black z-10"
                          animate={{
                            background: done || current ? color : "rgba(255,255,255,0.08)",
                            boxShadow: current ? `0 0 24px ${color}90, 0 0 48px ${color}40` : "none",
                            scale: current ? 1.15 : 1,
                            color: done || current ? "#fff" : "rgba(255,255,255,0.3)",
                          }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          style={{ border: `2px solid ${done || current ? color : "rgba(255,255,255,0.12)"}` }}
                        >
                          {i + 1}
                        </motion.div>
                      </div>
                      {/* Mini label */}
                      <motion.span
                        className="text-[9px] mt-2 font-semibold uppercase tracking-wider text-center max-w-[60px] leading-tight"
                        animate={{ opacity: current ? 1 : done ? 0.5 : 0.2, color: current ? color : "#fff" }}
                        transition={{ duration: 0.3 }}
                      >
                        {s.title.split(" ").slice(0, 2).join(" ")}
                      </motion.span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── RIGHT: Active step 3D card ── */}
            <div className="flex-1 flex flex-col justify-center" style={{ perspective: "1200px" }}>
              {/* Step counter badge */}
              <motion.div
                className="mb-8 flex items-center gap-3"
                key={`badge-${activeStep}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span
                  className="text-[10px] uppercase tracking-[0.28em] font-bold px-3 py-1.5 rounded-full"
                  style={{ background: `${color}22`, color, border: `1px solid ${color}40` }}
                >
                  Step {activeStep + 1} of {steps.length}
                </span>
              </motion.div>

              {/* 3D Card - swaps on each step */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 40, rotateX: 8, rotateY: -4 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
                  exit={{ opacity: 0, y: -30, rotateX: -6 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="relative rounded-3xl overflow-hidden"
                    style={{
                      background: "linear-gradient(145deg, hsl(222 55% 15% / 0.95), hsl(222 55% 11% / 0.98))",
                      border: `1px solid ${color}28`,
                      boxShadow: `0 32px 80px -16px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), 0 0 80px -20px ${color}44`,
                      backdropFilter: "blur(24px)",
                    }}
                  >
                    {/* Top color accent */}
                    <div
                      className="h-[3px] w-full"
                      style={{ background: `linear-gradient(90deg, ${color}, ${color}55, transparent)` }}
                    />

                    {/* Card inner */}
                    <div className="p-10 md:p-14">
                      {/* Big step number watermark */}
                      <div
                        className="absolute -top-4 -right-4 font-black select-none pointer-events-none"
                        style={{
                          fontSize: "11rem",
                          lineHeight: 1,
                          color: `${color}08`,
                          WebkitTextStroke: `2px ${color}12`,
                        }}
                      >
                        {String(activeStep + 1).padStart(2, "0")}
                      </div>

                      {/* Step badge */}
                      <div
                        className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-8 text-white text-xl font-black"
                        style={{
                          background: `linear-gradient(135deg, ${color}, ${color}bb)`,
                          boxShadow: `0 8px 28px ${color}55`,
                        }}
                      >
                        {activeStep + 1}
                      </div>

                      <h3
                        className="font-serif text-3xl md:text-4xl font-bold mb-5 text-white leading-tight"
                      >
                        {steps[activeStep].title}
                      </h3>
                      <p
                        className="text-[16px] leading-[1.85] max-w-xl"
                        style={{ color: "rgba(255,255,255,0.55)" }}
                      >
                        {steps[activeStep].desc}
                      </p>

                      {/* Progress dots */}
                      <div className="flex items-center gap-2 mt-10">
                        {steps.map((_, i) => (
                          <motion.div
                            key={i}
                            className="rounded-full"
                            animate={{
                              width: i === activeStep ? 28 : 8,
                              height: 8,
                              background: i <= activeStep ? color : "rgba(255,255,255,0.12)",
                            }}
                            transition={{ duration: 0.35 }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Corner decoration */}
                    <div
                      className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${color}18, transparent 70%)` }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Scroll hint - only on first step */}
              {activeStep === 0 && (
                <motion.div
                  className="mt-8 flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                    className="w-5 h-8 rounded-full border-2 flex items-start justify-center p-1"
                    style={{ borderColor: `${color}50` }}
                  >
                    <div className="w-1 h-2 rounded-full" style={{ background: color }} />
                  </motion.div>
                  <span className="text-[11px] uppercase tracking-widest" style={{ color: `${color}60` }}>Scroll to explore</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function ServiceDetailPage() {
  const params = useParams<{ category: string; slug: string }>();
  const [, navigate] = useLocation();
  const heroRef = useRef<HTMLDivElement>(null);

  const service = getServiceBySlug(params.slug ?? "");
  const categorySlug = params.category ?? "";
  const meta = categoryMeta[categorySlug] ?? { label: "Service", color: "hsl(38 88% 46%)", dark: "hsl(38 88% 32%)" };

  const relatedServices = getServicesByCategory(categorySlug)
    .filter(s => s.slug !== params.slug)
    .slice(0, 3);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, [params.slug]);

  // ─ Page shell color tokens ─
  const BG = "hsl(220 30% 97%)";
  const BG_CARD = "#ffffff";
  const TEXT = "hsl(222 55% 12%)";
  const TEXT_MID = "hsl(222 20% 42%)";
  const TEXT_SOFT = "hsl(220 15% 60%)";
  const BORDER = "hsl(220 20% 90%)";

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: BG }}>
        <Navbar />
        <p className="text-lg mt-24" style={{ color: TEXT_MID }}>Service not found.</p>
        <button onClick={() => navigate("/services")} className="mt-6 underline" style={{ color: meta.color }}>
          Back to Services
        </button>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: BG }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        <GridBackground color={meta.color} />

        {/* Floating decorative squares */}
        <FloatingSquare x="8%" y="18%" size={90} color={meta.color} delay={0} rotate={12} />
        <FloatingSquare x="92%" y="28%" size={64} color={meta.color} delay={2} rotate={-8} />
        <FloatingSquare x="78%" y="75%" size={110} color={meta.color} delay={1} rotate={20} />
        <FloatingSquare x="18%" y="80%" size={52} color={meta.color} delay={3} rotate={-15} />
        <FloatingSquare x="50%" y="12%" size={40} color={meta.color} delay={4} rotate={5} />

        {/* Subtle top color wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 55% at 60% 30%, ${meta.color}10, transparent 65%)` }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 pt-36 pb-24 w-full"
        >
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] font-medium mb-12"
            style={{ color: TEXT_SOFT }}
          >
            <button onClick={() => navigate("/services")} className="hover:underline transition-colors" style={{ color: TEXT_SOFT }}>Services</button>
            <ChevronRight className="w-3 h-3" />
            <span>{meta.label}</span>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: meta.dark }}>{service.title}</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div>
              {/* Category pill */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 }}
              >
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-8"
                  style={{ background: `${meta.color}14`, color: meta.dark, border: `1.5px solid ${meta.color}35` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: meta.color }} />
                  {meta.label}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.14 }}
                className="font-serif text-5xl md:text-6xl lg:text-[4rem] font-bold leading-[1.07] tracking-tight mb-6"
                style={{ color: TEXT }}
              >
                {service.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="text-[1.05rem] leading-[1.85] mb-10 max-w-xl"
                style={{ color: TEXT_MID }}
              >
                {service.description}
              </motion.p>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="flex flex-wrap gap-5 mb-12"
              >
                {[
                  { icon: Clock, label: "7–15 Days" },
                  { icon: Shield, label: "100% Compliant" },
                  { icon: Zap, label: "Online Process" },
                  { icon: Star, label: "Expert Team" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-[13px] font-medium" style={{ color: TEXT_MID }}>
                    <Icon className="w-4 h-4" style={{ color: meta.color }} />
                    {label}
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="tel:+011-49847956"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-[13px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${meta.color}, ${meta.dark})`,
                    boxShadow: `0 6px 24px ${meta.color}40`,
                  }}
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href="mailto:maxworthglobal@zohomail.in"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-[13px] font-bold uppercase tracking-[0.14em] transition-all duration-300 border"
                  style={{ color: meta.dark, borderColor: `${meta.color}50`, background: `${meta.color}08` }}
                >
                  <Mail className="w-4 h-4" />
                  Email Us
                </a>
              </motion.div>
            </div>

            {/* Right: 3D Feature Card */}
            <motion.div
              initial={{ opacity: 0, x: 40, rotateY: -8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: "1200px" }}
              className="hidden lg:block"
            >
              <div
                className="relative rounded-3xl p-9 border overflow-hidden"
                style={{
                  background: BG_CARD,
                  borderColor: `${meta.color}28`,
                  boxShadow: `0 24px 72px -12px rgba(0,0,0,0.12), 0 0 0 1px ${meta.color}18, 0 0 64px -20px ${meta.color}30`,
                  transform: "rotateY(-4deg) rotateX(2deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Top accent stripe */}
                <div
                  className="h-[3px] w-full rounded-full mb-8"
                  style={{ background: `linear-gradient(90deg, ${meta.color}, ${meta.color}55, transparent)` }}
                />

                {/* Grid watermark inside card */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden opacity-[0.35]"
                  style={{
                    backgroundImage: `linear-gradient(${meta.color}14 1px, transparent 1px), linear-gradient(90deg, ${meta.color}14 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                  }}
                />

                <h3 className="text-[11px] uppercase tracking-[0.22em] font-bold mb-5" style={{ color: TEXT_SOFT }}>
                  What's Included
                </h3>
                <ul className="space-y-3.5 relative">
                  {service.features.map((f, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.07 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: meta.color }} />
                      <span className="text-[14px] leading-snug" style={{ color: TEXT_MID }}>{f}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t" style={{ borderColor: BORDER }}>
                  <p className="text-[12px] italic" style={{ color: TEXT_SOFT }}>"{service.tagline}"</p>
                </div>

                {/* Corner color orb */}
                <div
                  className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${meta.color}18, transparent 70%)` }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── BENEFITS ──────────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden" style={{ background: "#fff" }}>
        {/* Subtle grid in this section too */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${meta.color}08 1px, transparent 1px), linear-gradient(90deg, ${meta.color}08 1px, transparent 1px)`,
            backgroundSize: "52px 52px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 md:px-14 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[11px] uppercase tracking-[0.22em] font-bold mb-4 block" style={{ color: meta.color }}>
              Why This Matters
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold" style={{ color: TEXT }}>Key Benefits</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -7, scale: 1.02 }}
                className="group relative rounded-2xl p-7 border overflow-hidden cursor-default transition-all duration-300"
                style={{
                  background: BG_CARD,
                  borderColor: `${meta.color}22`,
                  boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 40px rgba(0,0,0,0.1), 0 0 0 2px ${meta.color}30`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${meta.color}44`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.05)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${meta.color}22`;
                }}
              >
                {/* Large faded number */}
                <div
                  className="text-[3rem] font-bold leading-none mb-4 select-none"
                  style={{ color: `${meta.color}20` }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-[14px] leading-[1.75] font-medium" style={{ color: TEXT_MID }}>{benefit}</p>

                {/* Left accent bar on hover */}
                <div
                  className="absolute top-0 left-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-full"
                  style={{ background: meta.color }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OVERVIEW / ABOUT THIS SERVICE ────────────────────────────────── */}
      {service.overview && (
        <section className="py-24 relative overflow-hidden" style={{ background: BG }}>
          {/* Subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(${meta.color}08 1px, transparent 1px), linear-gradient(90deg, ${meta.color}08 1px, transparent 1px)`,
              backgroundSize: "52px 52px",
            }}
          />
          <div className="max-w-7xl mx-auto px-6 md:px-14 relative z-10">
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-start">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-[11px] uppercase tracking-[0.22em] font-bold mb-4 block" style={{ color: meta.color }}>
                  In Detail
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8" style={{ color: TEXT }}>
                  About {service.title}
                </h2>

                <div className="space-y-6 text-[15px] leading-[1.85]" style={{ color: TEXT_MID }}>
                  {service.overview.content.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>

              {/* Right Highlights Panel */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-3xl p-8 border"
                style={{
                  background: "#fff",
                  borderColor: `${meta.color}25`,
                  boxShadow: `0 16px 40px -12px ${meta.color}15`,
                }}
              >
                <h3 className="text-[13px] font-bold uppercase tracking-widest mb-6 pb-4 border-b" style={{ color: TEXT, borderColor: BORDER }}>
                  Key Highlights
                </h3>

                <ul className="space-y-6">
                  {service.overview.highlights.map((highlight, i) => (
                    <li key={i} className="flex flex-col gap-1.5">
                      <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: meta.color }}>
                        {highlight.label}
                      </span>
                      <span className="text-[15px] font-semibold" style={{ color: TEXT }}>
                        {highlight.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ── PROCESS - sticky Web3 scroll timeline ─────────────────────────── */}
      <section className="relative">
        <ProcessTimeline steps={service.process} color={meta.color} />
      </section>

      {/* ── DOCUMENTS ─────────────────────────────────────────────────────── */}

      <section className="py-28" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: docs list */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[11px] uppercase tracking-[0.22em] font-bold mb-4 block" style={{ color: meta.color }}>
                Documents Required
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-5" style={{ color: TEXT }}>What You'll Need</h2>
              <p className="text-[15px] leading-[1.82] mb-10" style={{ color: TEXT_MID }}>
                Prepare the following documents to fast-track your registration. Our team will verify everything before submission to avoid any rejections.
              </p>
              <ul className="space-y-4">
                {service.documents.map((doc, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                      style={{ background: `${meta.color}14`, border: `1.5px solid ${meta.color}30` }}
                    >
                      <FileText className="w-4 h-4" style={{ color: meta.color }} />
                    </div>
                    <span className="text-[14px] leading-[1.72] pt-1" style={{ color: TEXT_MID }}>{doc}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right: 3D CTA card */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              style={{ perspective: "1000px" }}
            >
              <div
                className="rounded-3xl p-10 border relative overflow-hidden"
                style={{
                  background: `linear-gradient(145deg, ${meta.color}10, #fff)`,
                  borderColor: `${meta.color}30`,
                  boxShadow: `0 24px 72px -12px ${meta.color}22, 0 0 0 1px ${meta.color}18`,
                  transform: "rotateY(4deg) rotateX(1.5deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Top stripe */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ background: `linear-gradient(90deg, ${meta.color}, ${meta.color}55, transparent)` }}
                />
                {/* Grid watermark */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(${meta.color}10 1px, transparent 1px), linear-gradient(90deg, ${meta.color}10 1px, transparent 1px)`,
                    backgroundSize: "36px 36px",
                  }}
                />

                <h3 className="font-serif text-3xl font-bold mb-3 relative" style={{ color: TEXT }}>Ready to get started?</h3>
                <p className="text-[14px] leading-[1.82] mb-8 relative" style={{ color: TEXT_MID }}>
                  Talk to our senior partners today. Zero commitment, complete clarity on cost and timeline.
                </p>

                <div className="space-y-4 relative">
                  {[
                    { href: "tel:+011-49847956", Icon: Phone, label: "Call Us", val: "+011-49847956" },
                    { href: "mailto:maxworthglobal@zohomail.in", Icon: Mail, label: "Email Us", val: "maxworthglobal@zohomail.in" },
                  ].map(({ href, Icon, label, val }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group"
                      style={{
                        borderColor: `${meta.color}25`,
                        background: "#fff",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = `${meta.color}55`;
                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 4px 20px ${meta.color}18`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = `${meta.color}25`;
                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                      }}
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${meta.color}16` }}>
                        <Icon className="w-4 h-4" style={{ color: meta.color }} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest mb-0.5 font-semibold" style={{ color: TEXT_SOFT }}>{label}</div>
                        <div className="text-[14px] font-semibold" style={{ color: TEXT }}>{val}</div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: meta.color }} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQs ──────────────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden" style={{ background: BG }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${meta.color}10 1.5px, transparent 1.5px), linear-gradient(90deg, ${meta.color}10 1.5px, transparent 1.5px)`,
            backgroundSize: "52px 52px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, hsl(220 30% 97%) 40%, transparent 100%)" }}
        />

        <div className="max-w-3xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[11px] uppercase tracking-[0.22em] font-bold mb-4 block" style={{ color: meta.color }}>
              Frequently Asked
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold" style={{ color: TEXT }}>Questions</h2>
          </motion.div>

          <div className="space-y-3">
            {service.faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.question} a={faq.answer} index={i} color={meta.color} />
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ──────────────────────────────────────────────── */}
      {relatedServices.length > 0 && (
        <section className="py-24" style={{ background: "#fff" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="text-[11px] uppercase tracking-[0.22em] font-bold mb-3 block" style={{ color: meta.color }}>
                Explore More
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold" style={{ color: TEXT }}>Related Services</h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((rel, i) => (
                <motion.button
                  key={rel.slug}
                  onClick={() => navigate(`/services/${rel.category}/${rel.slug}`)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group text-left rounded-2xl p-7 border transition-all duration-300 overflow-hidden relative"
                  style={{
                    background: BG_CARD,
                    borderColor: `${meta.color}20`,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 16px 40px rgba(0,0,0,0.09), 0 0 0 2px ${meta.color}30`;
                    (e.currentTarget as HTMLButtonElement).style.borderColor = `${meta.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = `${meta.color}20`;
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, ${meta.color}, ${meta.color}55, transparent)` }}
                  />
                  <h3 className="font-bold text-[16px] mb-2" style={{ color: TEXT }}>{rel.title}</h3>
                  <p className="text-[13px] leading-snug line-clamp-2" style={{ color: TEXT_SOFT }}>{rel.tagline}</p>
                  <div className="mt-5 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider" style={{ color: meta.dark }}>
                    Learn More <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: BG }}>
        {/* Full vivid grid in the CTA */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${meta.color}18 1.5px, transparent 1.5px), linear-gradient(90deg, ${meta.color}18 1.5px, transparent 1.5px)`,
            backgroundSize: "52px 52px",
          }}
        />
        {/* Central color wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 75% 65% at 50% 50%, ${meta.color}10, transparent 70%)` }}
        />
        {/* Decorative squares */}
        <FloatingSquare x="12%" y="25%" size={72} color={meta.color} delay={0} rotate={15} />
        <FloatingSquare x="88%" y="70%" size={88} color={meta.color} delay={2} rotate={-12} />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-5" style={{ color: TEXT }}>
              Start your {service.title} today.
            </h2>
            <p className="text-[15px] mb-10" style={{ color: TEXT_MID }}>
              Our senior partners handle everything - start to finish. Transparent pricing, zero surprises.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="tel:+011-49847956"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[13px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${meta.color}, ${meta.dark})`,
                  boxShadow: `0 8px 28px ${meta.color}44`,
                }}
              >
                <Phone className="w-4 h-4" />
                +011-49847956
              </a>
              <button
                onClick={() => navigate("/services")}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[13px] font-bold uppercase tracking-[0.14em] border transition-all duration-300"
                style={{ color: meta.dark, borderColor: `${meta.color}45`, background: "#fff" }}
              >
                <ArrowLeft className="w-4 h-4" />
                All Services
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
