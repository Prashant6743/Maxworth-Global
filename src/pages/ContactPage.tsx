import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  MapPin, Phone, Mail, Clock,
  ArrowUpRight, CheckCircle2, Send,
  MessageSquare, Calendar, Linkedin, Twitter,
  ChevronRight, Shield, Award, Users,
} from "lucide-react";

// ─── Generated Assets ───────────────────────────────────────────────────────────
import imgHero   from "@/assets/contact_hero.png";
import imgCity   from "@/assets/contact_city.png";
import imgForm   from "@/assets/contact_form.png";

// ─── Data ───────────────────────────────────────────────────────────────────────
const reachMethods = [
  {
    icon: Phone,
    label: "Call Us",
    primary: "+011-49847956",
    secondary: "Direct Partner Line",
    tag: "Mon–Sat · 9AM–7PM",
    color: "hsl(38 88% 46%)",
    bg: "hsl(38 88% 46% / 0.07)",
    border: "hsl(38 88% 46% / 0.2)",
    action: "tel:+011-49847956",
    cta: "Call Now",
  },
  {
    icon: Mail,
    label: "Email Us",
    primary: "maxworthglobal@zohomail.in",
    secondary: "Response within 2h",
    tag: "Reply within 2 hours",
    color: "hsl(210 70% 38%)",
    bg: "hsl(210 70% 38% / 0.07)",
    border: "hsl(210 70% 38% / 0.2)",
    action: "mailto:maxworthglobal@zohomail.in",
    cta: "Send Email",
  },
  {
    icon: MapPin,
    label: "Visit Office",
    primary: "123 Financial District, Suite 400",
    secondary: "Mumbai, Maharashtra 400001",
    tag: "By appointment",
    color: "hsl(155 55% 35%)",
    bg: "hsl(155 55% 35% / 0.07)",
    border: "hsl(155 55% 35% / 0.2)",
    action: "https://maps.google.com",
    cta: "Get Directions",
  },
  {
    icon: Calendar,
    label: "Book a Meeting",
    primary: "30-Min Discovery Call",
    secondary: "With a senior partner",
    tag: "Free consultation",
    color: "hsl(280 50% 42%)",
    bg: "hsl(280 50% 42% / 0.07)",
    border: "hsl(280 50% 42% / 0.2)",
    action: "#form",
    cta: "Schedule Now",
  },
  {
    icon: MessageSquare,
    label: "WhatsApp",
    primary: "+011-49847956",
    secondary: "Quick queries & updates",
    tag: "Usually responds fast",
    color: "hsl(142 60% 36%)",
    bg: "hsl(142 60% 36% / 0.07)",
    border: "hsl(142 60% 36% / 0.2)",
    action: "https://wa.me/911149847956",
    cta: "Message Now",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    primary: "The Maxworth Global",
    secondary: "Follow for expert insights",
    tag: "Professional updates",
    color: "hsl(211 80% 42%)",
    bg: "hsl(211 80% 42% / 0.07)",
    border: "hsl(211 80% 42% / 0.2)",
    action: "https://linkedin.com",
    cta: "Connect",
  },
];

const services = [
  "Startup", "Licence", "ROC", "Tax & Payroll",
  "Miscellaneous Registration", "OTHER Services"
];

const trustBadges = [
  { icon: Shield, label: "ICAI Certified" },
  { icon: Award,  label: "22+ Years" },
  { icon: Users,  label: "500+ Clients" },
];

// ─── 3D Tilt Hook ───────────────────────────────────────────────────────────────
function use3DTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const rx = -((e.clientY - top) / height - 0.5) * 12;
    const ry = ((e.clientX - left) / width - 0.5) * 12;
    const mx = ((e.clientX - left) / width) * 100;
    const my = ((e.clientY - top) / height) * 100;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--mx", `${mx}%`);
    el.style.setProperty("--my", `${my}%`);
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  return { ref, onMove, onLeave };
}

// ─── Reach Method Card ──────────────────────────────────────────────────────────
function ReachCard({ item, index }: { item: typeof reachMethods[0]; index: number }) {
  const { ref, onMove, onLeave } = use3DTilt();
  const Icon = item.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative"
      style={{
        transform: "perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
        transition: "transform 0.14s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Hover border glow */}
      <div
        className="absolute inset-[-1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${item.color}50, transparent 60%, ${item.color}25)` }}
      />

      <div
        className="relative h-full rounded-xl bg-white border p-6 overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow duration-300"
        style={{ borderColor: "hsl(220 18% 92%)" }}
      >
        {/* Mouse spotlight */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 rounded-xl"
          style={{ background: `radial-gradient(circle 100px at var(--mx,50%) var(--my,50%), ${item.color}0d, transparent)` }}
        />

        {/* Icon row */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ background: item.bg, border: `1px solid ${item.border}` }}
          >
            <Icon className="w-5 h-5" style={{ color: item.color }} />
          </div>
          <span
            className="text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
            style={{ background: item.bg, color: item.color }}
          >
            {item.tag}
          </span>
        </div>

        <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground/60 mb-2">{item.label}</p>
        <p className="font-semibold text-primary text-[14px] leading-[1.5] mb-1">{item.primary}</p>
        <p className="text-muted-foreground text-[12px] font-light mb-5">{item.secondary}</p>

        {/* CTA */}
        <a
          href={item.action}
          className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-200"
          style={{ color: item.color }}
        >
          {item.cta}
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

        {/* Bottom accent scan line */}
        <div
          className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null);
  const formSectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(heroScroll, [0, 1], [0, 70]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const [submitted, setSubmitted]         = useState(false);
  const [focused, setFocused]             = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState("");

  // Mouse parallax for hero image
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const springX = useSpring(mouse.x, { stiffness: 50, damping: 18 });
  const springY = useSpring(mouse.y, { stiffness: 50, damping: 18 });

  useEffect(() => {
    window.scrollTo(0, 0);
    const h = (e: MouseEvent) =>
      setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 16, y: (e.clientY / window.innerHeight - 0.5) * 10 });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 7000);
  };

  return (
    <main className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* HERO — SPLIT LAYOUT: Left text  |  Right floating graphic              */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[88vh] flex items-center pt-28 pb-16 overflow-hidden bg-background"
      >
        {/* Animated mesh blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div className="absolute -top-[25%] -left-[20%] w-[70%] h-[70%] rounded-full animate-blob-1"
            style={{ background: "radial-gradient(circle at 40% 40%, hsl(222 55% 85%/0.5), hsl(210 60% 90%/0.25) 60%, transparent)", filter: "blur(90px)" }} />
          <motion.div className="absolute -bottom-[20%] -right-[10%] w-[65%] h-[65%] rounded-full animate-blob-2"
            style={{ background: "radial-gradient(circle at 60% 60%, hsl(38 88% 92%/0.65), hsl(36 60% 88%/0.35) 60%, transparent)", filter: "blur(90px)" }} />
          <div className="absolute inset-0 dot-grid opacity-[0.45]" />
        </div>

        {/* Gold top line */}
        <div className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, hsl(38 88% 46%/0.35), transparent)" }} />

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* ── LEFT: Text ── */}
            <motion.div
              style={{ y: heroY, opacity: heroOpacity }}
              className="lg:col-span-6"
            >
              {/* Eyebrow pill */}
              <motion.div
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border/70 shadow-sm mb-7"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
                  Available for Consultation
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif font-bold text-primary leading-[1.06] mb-7"
                style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.4rem)" }}
              >
                Let's Build Your<br />
                Financial Future,{" "}
                <span style={{
                  background: "linear-gradient(120deg, hsl(38 88% 38%), hsl(38 88% 58%))",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  Together.
                </span>
              </motion.h1>

              {/* Gold divider */}
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-16 h-[2px] mb-7 origin-left"
                style={{ background: "linear-gradient(90deg, hsl(38 88% 48%), hsl(38 88% 62%))" }}
              />

              <motion.p
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-muted-foreground font-light text-base md:text-lg leading-[1.85] mb-10 max-w-[520px]"
              >
                Whether you're a growing startup or an established enterprise — our senior partners will personally
                review your needs and craft the right financial roadmap for you.
              </motion.p>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                {trustBadges.map((b, i) => {
                  const Ic = b.icon;
                  return (
                    <div key={i} className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-border/70 shadow-sm">
                      <Ic className="w-3.5 h-3.5 text-gold" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{b.label}</span>
                    </div>
                  );
                })}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => formSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
                  className="group relative h-12 px-7 overflow-hidden font-bold uppercase tracking-[0.14em] text-[11px] text-white flex items-center gap-2 transition-all"
                  style={{ background: "hsl(222 55% 18%)" }}
                >
                  <span className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400 ease-out"
                    style={{ background: "linear-gradient(90deg, hsl(38 88% 44%), hsl(38 88% 56%))" }} />
                  <span className="relative z-10">Send an Enquiry</span>
                  <Send className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <a
                  href="tel:+011-49847956"
                  className="group flex items-center gap-2 h-12 px-6 border border-border/80 hover:border-gold/50 text-foreground text-[11px] font-bold uppercase tracking-[0.14em] transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-gold" />
                  <span>Call Us Now</span>
                </a>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Floating Image Graphic ── */}
            <div className="lg:col-span-6 flex items-center justify-center relative">
              <motion.div
                style={{ x: springX, y: springY }}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[520px]"
              >
                {/* Decorative gold frame */}
                <div className="absolute -top-4 -right-4 w-full h-full border border-gold/25 rounded-2xl pointer-events-none" />
                <div className="absolute -bottom-4 -left-4 w-full h-full border border-border/40 rounded-2xl pointer-events-none" />

                {/* Main illustration */}
                <div className="relative rounded-2xl overflow-hidden shadow-[0_28px_80px_-16px_rgba(15,27,58,0.18)] bg-white border border-border/40">
                  <img
                    src={imgHero}
                    alt="Financial advisory illustration"
                    className="w-full h-auto object-cover"
                  />
                  {/* Subtle overlay gradient at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating stat card — top left */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.7, type: "spring", stiffness: 160, damping: 22 }}
                  className="absolute -left-10 top-10 glass px-5 py-3.5 shadow-xl border border-border/50"
                >
                  <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-0.5">Response Time</p>
                  <p className="font-serif font-bold text-xl text-primary italic">{"< 2 Hours"}</p>
                </motion.div>

                {/* Floating stat card — bottom right */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.7, type: "spring", stiffness: 160, damping: 22 }}
                  className="absolute -right-8 bottom-10 glass px-5 py-3.5 shadow-xl border border-gold/25"
                >
                  <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-0.5">Satisfaction</p>
                  <p className="font-serif font-bold text-xl text-primary italic">99.8%</p>
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MULTIPLE WAYS TO REACH US — 6-card grid                               */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-[#f8f6f2]">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(38 88% 46%/0.3), transparent)" }} />

        {/* Background dot texture */}
        <div className="absolute inset-0 dot-grid opacity-[0.4]" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[10px] uppercase tracking-[0.28em] font-semibold text-gold mb-3"
            >
              Multiple Channels
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="font-serif font-bold text-3xl md:text-4xl lg:text-[2.7rem] text-primary leading-tight mb-4"
            >
              Six ways to reach us.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-muted-foreground font-light text-base max-w-xl mx-auto"
            >
              Every channel connects you directly to our expert team — no gatekeepers, no bots.
            </motion.p>
            <div className="w-12 h-[2px] mx-auto mt-6"
              style={{ background: "linear-gradient(90deg, transparent, hsl(38 88% 46%), transparent)" }} />
          </div>

          {/* 6-card grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reachMethods.map((item, i) => (
              <ReachCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(38 88% 46%/0.2), transparent)" }} />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* FORM + GRAPHIC — Split: Left graphic  |  Right form                   */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section ref={formSectionRef} id="form" className="relative py-20 lg:py-32 bg-background overflow-hidden">
        {/* Blob accents */}
        <div className="absolute top-0 right-[5%] w-[350px] h-[350px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(38 88% 46%/0.05), transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-0 left-[5%] w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(222 55% 18%/0.05), transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 dot-grid opacity-[0.3]" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <div className="grid lg:grid-cols-12 gap-14 items-start">

            {/* ── LEFT: Decorative Graphic Panel ── */}
            <motion.div
              initial={{ opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col gap-6"
            >
              {/* Section label */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] font-semibold text-gold mb-3">Start the Conversation</p>
                <h2 className="font-serif font-bold text-3xl md:text-4xl text-primary leading-tight mb-4">
                  Partner-led attention<br />
                  <span className="italic text-muted-foreground">from day one.</span>
                </h2>
                <div className="w-10 h-[2px] mb-6"
                  style={{ background: "linear-gradient(90deg, hsl(38 88% 46%), transparent)" }} />
                <p className="text-muted-foreground font-light text-[14px] leading-[1.85] max-w-md">
                  Every enquiry at Maxworth Global is personally reviewed by a senior partner —
                  not a support desk. You'll receive a tailored response within 24 hours.
                </p>
              </div>

              {/* Main graphic */}
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_-12px_rgba(15,27,58,0.14)] border border-border/40 bg-white">
                <img
                  src={imgForm}
                  alt="Partner consultation illustration"
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: "340px", objectPosition: "center top" }}
                />
                {/* Dark navy overlay at bottom with text */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-5"
                  style={{ background: "linear-gradient(to top, hsl(222 55% 14%), transparent)" }}
                >
                  <p className="font-serif font-bold text-white text-lg leading-tight">
                    "Precision is our craft; trust is our currency."
                  </p>
                  <p className="text-white/55 text-[11px] uppercase tracking-wider mt-1">— Rakesh Maxworth, Founder</p>
                </div>
              </div>

              {/* Process steps */}
              <div className="space-y-3">
                {[
                  { step: "01", label: "Submit Enquiry", desc: "Fill the form — 2 minutes" },
                  { step: "02", label: "Partner Review", desc: "Senior partner evaluates within 24h" },
                  { step: "03", label: "Discovery Call", desc: "30-min free strategy session" },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-border/50 shadow-sm hover:shadow-md hover:border-gold/30 transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-[12px] shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ background: "hsl(38 88% 46%/0.1)", color: "hsl(38 88% 44%)", border: "1px solid hsl(38 88% 46%/0.2)" }}>
                      {s.step}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-primary">{s.label}</p>
                      <p className="text-[11px] text-muted-foreground font-light">{s.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-gold ml-auto transition-colors" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── RIGHT: Form ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-7"
            >
              {/* Form card */}
              <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-[0_20px_60px_-12px_rgba(15,27,58,0.1)] bg-white">
                {/* Gold top stripe */}
                <div className="h-[3px] w-full"
                  style={{ background: "linear-gradient(90deg, hsl(38 88% 42%), hsl(38 88% 62%))" }} />

                {/* Corner accents */}
                <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-gold/25 pointer-events-none" />
                <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-gold/25 pointer-events-none" />

                <div className="p-8 md:p-10">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }} transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 22 }}
                        className="flex flex-col items-center text-center py-16"
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.1 }}
                          className="relative mb-8"
                        >
                          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto relative"
                            style={{ background: "hsl(38 88% 94%)", border: "1px solid hsl(38 88% 46%/0.3)" }}>
                            <motion.div className="absolute w-36 h-36 rounded-full border border-gold/20"
                              animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
                            <CheckCircle2 className="w-10 h-10" style={{ color: "hsl(38 88% 44%)" }} />
                          </div>
                        </motion.div>
                        <h3 className="font-serif font-bold text-3xl text-primary mb-3">Enquiry Received!</h3>
                        <p className="text-muted-foreground font-light leading-[1.85] max-w-sm">
                          A senior partner will personally review your request and respond within one business day.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="mb-8">
                          <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold mb-2">Enquiry Portal</p>
                          <h3 className="font-serif font-bold text-2xl md:text-3xl text-primary mb-1.5">Request a Discovery Call</h3>
                          <p className="text-muted-foreground text-sm font-light">Fill in your details and we'll connect you with the right partner.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-7">

                          {/* Name row */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {[
                              { id: "first-name", label: "First Name" },
                              { id: "last-name",  label: "Last Name" },
                            ].map((f) => {
                              const active = focused === f.id;
                              return (
                                <div key={f.id} className="float-label-group">
                                  <input required type="text" id={f.id} placeholder=" "
                                    onFocus={() => setFocused(f.id)} onBlur={() => setFocused(null)} />
                                  <label htmlFor={f.id}>{f.label}</label>
                                  <motion.div className="absolute bottom-0 left-0 h-[2px] rounded-full"
                                    style={{ background: "linear-gradient(90deg, hsl(38 88% 46%), hsl(38 88% 62%))" }}
                                    initial={{ scaleX: 0, originX: 0 }}
                                    animate={{ scaleX: active ? 1 : 0 }}
                                    transition={{ duration: 0.28 }} />
                                </div>
                              );
                            })}
                          </div>

                          {/* Email + Phone */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {[
                              { id: "email", label: "Email Address", type: "email", required: true },
                              { id: "phone", label: "Phone (optional)", type: "tel", required: false },
                            ].map((f) => {
                              const active = focused === f.id;
                              return (
                                <div key={f.id} className="float-label-group">
                                  <input required={f.required} type={f.type} id={f.id} placeholder=" "
                                    onFocus={() => setFocused(f.id)} onBlur={() => setFocused(null)} />
                                  <label htmlFor={f.id}>{f.label}</label>
                                  <motion.div className="absolute bottom-0 left-0 h-[2px] rounded-full"
                                    style={{ background: "linear-gradient(90deg, hsl(38 88% 46%), hsl(38 88% 62%))" }}
                                    initial={{ scaleX: 0, originX: 0 }}
                                    animate={{ scaleX: active ? 1 : 0 }}
                                    transition={{ duration: 0.28 }} />
                                </div>
                              );
                            })}
                          </div>

                          {/* Company */}
                          <div className="float-label-group">
                            <input type="text" id="company" placeholder=" "
                              onFocus={() => setFocused("company")} onBlur={() => setFocused(null)} />
                            <label htmlFor="company">Company / Firm Name <span className="text-muted-foreground/50">(optional)</span></label>
                            <motion.div className="absolute bottom-0 left-0 h-[2px] rounded-full"
                              style={{ background: "linear-gradient(90deg, hsl(38 88% 46%), hsl(38 88% 62%))" }}
                              initial={{ scaleX: 0, originX: 0 }}
                              animate={{ scaleX: focused === "company" ? 1 : 0 }}
                              transition={{ duration: 0.28 }} />
                          </div>

                          {/* Service chip selector */}
                          <div>
                            <label className="block text-[10px] uppercase tracking-[0.22em] font-semibold text-muted-foreground mb-3.5">
                              Service Required
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {services.map((svc) => {
                                const active = selectedService === svc;
                                return (
                                  <motion.button
                                    key={svc} type="button"
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setSelectedService(active ? "" : svc)}
                                    className="py-2.5 px-3 rounded-lg text-[11px] font-semibold transition-all duration-200 relative overflow-hidden"
                                    style={{
                                      background: active ? "hsl(38 88% 46%/0.1)" : "hsl(220 18% 97%)",
                                      border: `1px solid ${active ? "hsl(38 88% 46%/0.5)" : "hsl(220 18% 90%)"}`,
                                      color: active ? "hsl(38 88% 40%)" : "hsl(215 16% 47%)",
                                    }}
                                  >
                                    {svc}
                                  </motion.button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Message */}
                          <div className="float-label-group">
                            <textarea required id="message" placeholder=" " rows={4}
                              onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                              className="resize-none" />
                            <label htmlFor="message">Your Message or Requirement</label>
                            <motion.div className="absolute bottom-0 left-0 h-[2px] rounded-full"
                              style={{ background: "linear-gradient(90deg, hsl(38 88% 46%), hsl(38 88% 62%))" }}
                              initial={{ scaleX: 0, originX: 0 }}
                              animate={{ scaleX: focused === "message" ? 1 : 0 }}
                              transition={{ duration: 0.28 }} />
                          </div>

                          {/* Submit */}
                          <motion.button
                            type="submit"
                            whileHover={{ scale: 1.012 }} whileTap={{ scale: 0.985 }}
                            className="group relative w-full h-14 overflow-hidden font-bold uppercase tracking-[0.16em] text-[12px] text-white flex items-center justify-center gap-3 transition-shadow duration-300"
                            style={{
                              background: "hsl(222 55% 18%)",
                              boxShadow: "0 4px 24px rgba(15,27,58,0.18)",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(15,27,58,0.3)")}
                            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 24px rgba(15,27,58,0.18)")}
                          >
                            <span className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400 ease-out"
                              style={{ background: "linear-gradient(90deg, hsl(38 88% 44%), hsl(38 88% 56%))" }} />
                            <span className="relative z-10">Submit Enquiry</span>
                            <motion.span className="relative z-10"
                              animate={{ x: [0, 3, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
                              <Send className="w-4 h-4" />
                            </motion.span>
                          </motion.button>

                          <p className="text-center text-[10px] text-muted-foreground/50 font-light">
                            Protected by our privacy policy · No spam, ever.
                          </p>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* CITY SKYLINE BAND — Office / Location                                  */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "hsl(222 55% 12%)" }}>
        {/* Gold top accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, transparent, hsl(38 88% 46%), transparent)" }} />

        {/* City image with overlay */}
        <div className="relative h-[320px] md:h-[380px]">
          <img
            src={imgCity}
            alt="Mumbai Financial District"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 40%", filter: "brightness(0.85)" }}
          />
          {/* Overlay gradients */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to right, hsl(222 55% 12%/0.95) 0%, hsl(222 55% 12%/0.55) 50%, transparent 100%)" }} />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to top, hsl(222 55% 12%) 0%, transparent 40%)" }} />

          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
              <motion.div
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="max-w-lg"
              >
                <p className="text-[10px] uppercase tracking-[0.28em] font-semibold text-gold mb-3">Head Office</p>
                <h3 className="font-serif font-bold text-2xl md:text-3xl text-white leading-tight mb-4">
                  Mumbai's Financial<br />District, Suite 400
                </h3>
                <p className="text-white/60 font-light text-[14px] leading-[1.75] mb-6">
                  123 Financial District, Suite 400<br />
                  Mumbai, Maharashtra 400001<br />
                  Mon – Sat: 9:00 AM – 7:00 PM
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-gold hover:text-white transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Get Directions
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Info cards below skyline */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { label: "Phone", value: "+011-49847956", icon: Phone },
              { label: "Email", value: "maxworthglobal@zohomail.in", icon: Mail },
              { label: "Hours", value: "Mon–Sat 9AM–7PM", icon: Clock },
              { label: "Social", value: "@MaxworthGlobal", icon: Twitter },
            ].map((item, i) => {
              const Ic = item.icon;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl border border-white/8 bg-white/[0.03] backdrop-blur-sm"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "hsl(38 88% 46%/0.12)", border: "1px solid hsl(38 88% 46%/0.2)" }}>
                    <Ic className="w-3.5 h-3.5" style={{ color: "hsl(38 88% 56%)" }} />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-white/35 mb-1">{item.label}</p>
                    <p className="text-white/70 text-[12px] font-light leading-[1.6]">{item.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
