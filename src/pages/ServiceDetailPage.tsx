import { useEffect, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowUpRight, CheckCircle2, FileText,
  Phone, Mail, ChevronDown, Shield, Zap, Clock, Star,
  ChevronRight
} from "lucide-react";
import { getServiceBySlug, getServicesByCategory } from "@/data/services";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";

// ─── Category meta ──────────────────────────────────────────────────────────
const categoryMeta: Record<string, { label: string; color: string; accent: string }> = {
  startup:       { label: "Startup",                  color: "hsl(155 55% 35%)", accent: "hsl(155 80% 60%)" },
  licence:       { label: "Licence",                  color: "hsl(38 88% 46%)",  accent: "hsl(38 100% 65%)" },
  roc:           { label: "ROC",                      color: "hsl(280 45% 45%)", accent: "hsl(280 70% 70%)" },
  "tax-payroll": { label: "Tax & Payroll",            color: "hsl(222 55% 40%)", accent: "hsl(222 80% 70%)" },
  "misc-reg":    { label: "Miscellaneous",            color: "hsl(210 65% 40%)", accent: "hsl(210 80% 68%)" },
  other:         { label: "Other Services",           color: "hsl(10 75% 48%)",  accent: "hsl(10 100% 68%)" },
};

// ─── 3D Floating Orb ────────────────────────────────────────────────────────
function FloatingOrb({ cx, cy, r, color, delay = 0 }: { cx: string; cy: string; r: number; color: string; delay?: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: cx, top: cy,
        width: r * 2, height: r * 2,
        background: `radial-gradient(circle at 35% 35%, ${color}55, ${color}10 60%, transparent 100%)`,
        filter: "blur(40px)",
        transform: "translate(-50%, -50%)",
      }}
      animate={{ y: [0, -22, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

// ─── FAQ Item ────────────────────────────────────────────────────────────────
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="border border-white/8 rounded-2xl overflow-hidden"
      style={{ background: "hsl(222 55% 16% / 0.7)", backdropFilter: "blur(12px)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-7 py-5 text-left"
      >
        <span className="text-white/90 font-medium text-[15px] pr-4">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-white/40 flex-shrink-0" />
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
            <p className="px-7 pb-6 text-white/55 text-[14px] leading-[1.85]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Process Step Card ───────────────────────────────────────────────────────
function ProcessCard({ step, title, desc, color, index }: { step: number; title: string; desc: string; color: string; accent: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative group cursor-default"
      style={{ perspective: "800px" }}
    >
      {/* 3D card */}
      <div
        className="relative rounded-2xl p-7 border border-white/8 overflow-hidden transition-all duration-500"
        style={{
          background: "linear-gradient(135deg, hsl(222 55% 18% / 0.9), hsl(222 55% 14% / 0.95))",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px -8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Step number — 3D floating badge */}
        <div
          className="absolute -top-3 -left-3 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-[13px] tracking-wider"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}99)`,
            boxShadow: `0 4px 20px ${color}55, inset 0 1px 0 rgba(255,255,255,0.2)`,
            transform: "translateZ(8px)",
          }}
        >
          {String(step).padStart(2, "0")}
        </div>

        {/* Glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at 30% 30%, ${color}12, transparent 70%)` }}
        />

        <div className="mt-4">
          <h4 className="text-white font-semibold text-[16px] mb-2 mt-1">{title}</h4>
          <p className="text-white/55 text-[13.5px] leading-[1.75]">{desc}</p>
        </div>
      </div>

      {/* Connector arrow */}
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function ServiceDetailPage() {
  const params = useParams<{ category: string; slug: string }>();
  const [, navigate] = useLocation();
  const heroRef = useRef<HTMLDivElement>(null);

  const service = getServiceBySlug(params.slug ?? "");
  const categorySlug = params.category ?? "";
  const meta = categoryMeta[categorySlug] ?? { label: "Service", color: "hsl(38 88% 46%)", accent: "hsl(38 100% 65%)" };

  // Related services (same category, excluding current)
  const relatedServices = getServicesByCategory(categorySlug)
    .filter(s => s.slug !== params.slug)
    .slice(0, 3);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, [params.slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "hsl(222 55% 12%)" }}>
        <Navbar />
        <p className="text-white/60 text-xl mt-24">Service not found.</p>
        <button onClick={() => navigate("/services")} className="mt-6 text-white/80 underline">
          Back to Services
        </button>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "hsl(222 55% 10%)" }}>
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[88vh] flex items-center overflow-hidden">
        {/* Ambient orbs */}
        <FloatingOrb cx="15%"  cy="25%"  r={220} color={meta.color}   delay={0} />
        <FloatingOrb cx="85%"  cy="70%"  r={280} color={meta.accent}  delay={2} />
        <FloatingOrb cx="50%"  cy="50%"  r={160} color="hsl(38 88% 46%)" delay={4} />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 pt-32 pb-20 w-full"
        >
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-white/40 mb-10"
          >
            <button onClick={() => navigate("/services")} className="hover:text-white/70 transition-colors">Services</button>
            <ChevronRight className="w-3 h-3" />
            <button onClick={() => navigate("/services")} className="hover:text-white/70 transition-colors">{meta.label}</button>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: meta.accent }}>{service.title}</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              {/* Category badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-8"
                  style={{ background: `${meta.color}22`, color: meta.accent, border: `1px solid ${meta.color}44` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: meta.accent }} />
                  {meta.label}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="font-serif text-5xl md:text-6xl lg:text-[4.2rem] font-bold text-white leading-[1.08] tracking-tight mb-6"
              >
                {service.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22 }}
                className="text-white/55 text-[1.05rem] leading-[1.85] mb-10 max-w-xl"
              >
                {service.description}
              </motion.p>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-6 mb-12"
              >
                {[
                  { icon: Clock, label: "7–15 Days" },
                  { icon: Shield, label: "100% Compliant" },
                  { icon: Zap, label: "Online Process" },
                  { icon: Star, label: "Expert Team" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-white/65 text-[13px]">
                    <Icon className="w-4 h-4" style={{ color: meta.accent }} />
                    {label}
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.38 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="tel:+011-49847956"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-[13px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300"
                  style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.color}bb)`, boxShadow: `0 8px 30px ${meta.color}55` }}
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href="mailto:maxworthglobal@zohomail.in"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-[13px] font-bold uppercase tracking-[0.14em] text-white/80 border border-white/15 hover:border-white/30 hover:text-white transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                  Email Us
                </a>
              </motion.div>
            </div>

            {/* Right: 3D Feature Card */}
            <motion.div
              initial={{ opacity: 0, x: 40, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: "1200px" }}
              className="hidden lg:block"
            >
              <div
                className="relative rounded-3xl p-8 border border-white/10 overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, hsl(222 55% 18% / 0.95), hsl(222 55% 13% / 0.98))",
                  backdropFilter: "blur(24px)",
                  boxShadow: `0 24px 80px -16px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 80px -20px ${meta.color}44`,
                  transform: "rotateY(-4deg) rotateX(2deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Top accent bar */}
                <div className="h-[2px] w-full rounded-full mb-8" style={{ background: `linear-gradient(90deg, ${meta.color}, ${meta.accent}, transparent)` }} />

                <h3 className="text-[11px] uppercase tracking-[0.22em] text-white/40 font-semibold mb-5">What's Included</h3>
                <ul className="space-y-3.5">
                  {service.features.map((f, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.07 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: meta.accent }} />
                      <span className="text-white/75 text-[14px] leading-snug">{f}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Bottom tagline */}
                <div className="mt-8 pt-6 border-t border-white/8">
                  <p className="text-[12px] text-white/35 italic">"{service.tagline}"</p>
                </div>

                {/* Corner decoration */}
                <div
                  className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full opacity-20"
                  style={{ background: `radial-gradient(circle, ${meta.color}, transparent 70%)` }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4 block" style={{ color: meta.accent }}>
              Why This Matters
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">Key Benefits</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative rounded-2xl p-7 border border-white/8 overflow-hidden cursor-default"
                style={{
                  background: "linear-gradient(145deg, hsl(222 55% 17% / 0.9), hsl(222 55% 13% / 0.9))",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 4px 24px -8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                {/* Number */}
                <div
                  className="text-[2.5rem] font-bold leading-none mb-5 opacity-15 select-none"
                  style={{ color: meta.accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-white/80 text-[14px] leading-[1.75]">{benefit}</p>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${meta.color}14, transparent 70%)` }}
                />
                {/* Bottom border accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)` }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden">
        {/* Diagonal divider bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, transparent, hsl(222 55% 13% / 0.6), transparent)" }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-14 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4 block" style={{ color: meta.accent }}>
              How It Works
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">Our Process</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {service.process.map((step, i) => (
              <ProcessCard
                key={i}
                step={i + 1}
                title={step.title}
                desc={step.desc}
                color={meta.color}
                accent={meta.accent}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCUMENTS ────────────────────────────────────────────────────── */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4 block" style={{ color: meta.accent }}>
                Documents Required
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">What You'll Need</h2>
              <p className="text-white/50 text-[15px] leading-[1.8] mb-10">
                Prepare the following documents to fast-track your registration. Our team will verify everything before submission to avoid any rejections.
              </p>
              <ul className="space-y-4">
                {service.documents.map((doc, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                      style={{ background: `${meta.color}22`, border: `1px solid ${meta.color}44` }}
                    >
                      <FileText className="w-4 h-4" style={{ color: meta.accent }} />
                    </div>
                    <span className="text-white/70 text-[14px] leading-[1.7] pt-1">{doc}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right: 3D CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ perspective: "1000px" }}
            >
              <div
                className="rounded-3xl p-10 border border-white/10 relative overflow-hidden"
                style={{
                  background: `linear-gradient(145deg, ${meta.color}18, hsl(222 55% 14%))`,
                  backdropFilter: "blur(24px)",
                  boxShadow: `0 24px 80px -16px ${meta.color}30, inset 0 1px 0 rgba(255,255,255,0.07)`,
                  transform: "rotateY(3deg) rotateX(1deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)` }} />

                <h3 className="font-serif text-3xl font-bold text-white mb-3">Ready to get started?</h3>
                <p className="text-white/50 text-[14px] leading-[1.8] mb-8">
                  Talk to our senior partners today. Zero commitment, complete clarity on cost and timeline.
                </p>

                <div className="space-y-4">
                  <a
                    href="tel:+011-49847956"
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/10 text-white/80 hover:text-white hover:border-white/25 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${meta.color}33` }}>
                      <Phone className="w-4 h-4" style={{ color: meta.accent }} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/35 mb-0.5">Call Us</div>
                      <div className="text-[14px] font-medium">+011-49847956</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a
                    href="mailto:maxworthglobal@zohomail.in"
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/10 text-white/80 hover:text-white hover:border-white/25 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${meta.color}33` }}>
                      <Mail className="w-4 h-4" style={{ color: meta.accent }} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/35 mb-0.5">Email Us</div>
                      <div className="text-[14px] font-medium">maxworthglobal@zohomail.in</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────────────────── */}
      <section className="py-28 relative">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4 block" style={{ color: meta.accent }}>
              Frequently Asked
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">Questions</h2>
          </motion.div>

          <div className="space-y-3">
            {service.faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.question} a={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ─────────────────────────────────────────────── */}
      {relatedServices.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3 block" style={{ color: meta.accent }}>
                Explore More
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">Related Services</h2>
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
                  whileHover={{ y: -5 }}
                  className="group text-left rounded-2xl p-7 border border-white/8 transition-all duration-300 overflow-hidden relative"
                  style={{
                    background: "linear-gradient(145deg, hsl(222 55% 17% / 0.85), hsl(222 55% 13% / 0.9))",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 30% 30%, ${meta.color}12, transparent 70%)` }}
                  />
                  <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)` }}
                  />
                  <h3 className="text-white font-semibold text-[16px] mb-2 group-hover:text-white transition-colors">{rel.title}</h3>
                  <p className="text-white/45 text-[13px] leading-snug line-clamp-2">{rel.tagline}</p>
                  <div className="mt-5 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider" style={{ color: meta.accent }}>
                    Learn More <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOTTOM CTA BANNER ────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${meta.color}22, hsl(222 55% 14%))` }}
        />
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-5">
              Start your {service.title} today.
            </h2>
            <p className="text-white/50 text-[15px] mb-10">
              Our senior partners handle everything — start to finish. Transparent pricing, zero surprises.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="tel:+011-49847956"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[13px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300"
                style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.color}bb)`, boxShadow: `0 8px 30px ${meta.color}44` }}
              >
                <Phone className="w-4 h-4" />
                +011-49847956
              </a>
              <button
                onClick={() => navigate("/services")}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[13px] font-bold uppercase tracking-[0.14em] text-white/70 border border-white/15 hover:border-white/30 hover:text-white transition-all duration-300"
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
