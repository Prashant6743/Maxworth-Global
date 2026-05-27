import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PremiumMap } from "@/components/PremiumMap";
import emailjs from "@emailjs/browser";
import {
  MapPin, Phone, Mail, Clock,
  ArrowUpRight, CheckCircle2, Send,
  MessageSquare, Calendar, Linkedin,
  ChevronRight, Shield, Award, Users,
  Loader2, AlertCircle,
} from "lucide-react";

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

// ── Validation helpers ──────────────────────────────────────────────
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isValidPhone = (v: string) => /^[+]?[\d\s\-().]{7,15}$/.test(v.trim());
const isValidName  = (v: string) => v.trim().length >= 2;

interface CFormState {
  from_name: string;
  from_email: string;
  phone: string;
  service: string;
  message: string;
}
interface CFormErrors {
  from_name?: string;
  from_email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

// ─── Generated Assets ───────────────────────────────────────────────────────────
import imgContactBg from "@/assets/contactm.png";
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
    primary: "27, Sunview Apartments, Sector-11",
    secondary: "Pocket-4, Dwarka, New Delhi-110075",
    tag: "By appointment",
    color: "hsl(155 55% 35%)",
    bg: "hsl(155 55% 35% / 0.07)",
    border: "hsl(155 55% 35% / 0.2)",
    action: "https://maps.app.goo.gl/XkLHiRBzZwahZJ1h9",
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
  { icon: Shield, label: "MCA Compliant" },
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
  const formRef = useRef<HTMLFormElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(heroScroll, [0, 1], [0, 70]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const { scrollYProgress: pageScroll } = useScroll();

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [focused, setFocused]     = useState<string | null>(null);
  const [touched, setTouched]     = useState<Partial<Record<keyof CFormState, boolean>>>({});

  const [form, setForm] = useState<CFormState>({
    from_name: "", from_email: "", phone: "", service: "", message: "",
  });

  const validate = (f: CFormState): CFormErrors => {
    const e: CFormErrors = {};
    if (!isValidName(f.from_name))    e.from_name  = "Please enter your full name (at least 2 characters).";
    if (!isValidEmail(f.from_email))  e.from_email = "Please enter a valid email address.";
    if (!isValidPhone(f.phone))       e.phone      = "Please enter a valid phone number.";
    if (!f.service)                   e.service    = "Please select a service.";
    if (f.message.trim().length < 10) e.message    = "Please write at least 10 characters.";
    return e;
  };

  const errors  = validate(form);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (field: keyof CFormState, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleBlur = (field: keyof CFormState) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setFocused(null);
  };

  const showErr = (field: keyof CFormState) => touched[field] && errors[field];

  const borderColor = (field: keyof CFormState) => {
    if (showErr(field))    return "hsl(0 70% 55%)";
    if (focused === field) return "hsl(38 88% 48%)";
    return "hsl(var(--border))";
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ from_name: true, from_email: true, phone: true, service: true, message: true });
    if (!isValid || !formRef.current) return;
    setSending(true);
    setSendError(null);
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setSubmitted(true);
      setForm({ from_name: "", from_email: "", phone: "", service: "", message: "" });
      setTouched({});
      setTimeout(() => setSubmitted(false), 7000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setSendError("Something went wrong. Please try again or email us at maxworthglobal@zohomail.in");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      <Helmet>
        <title>Contact Us | The Maxworth-Global Llp</title>
        <link rel="canonical" href="https://www.themaxworthglobal.com/contact" />
      </Helmet>
      {/* ── Page Scroll Progress Animation ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
        style={{ scaleX: pageScroll, background: "linear-gradient(90deg, hsl(38 88% 44%), hsl(38 88% 62%))" }}
      />

      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* HERO — PREMIUM SLANTED BACKDROP DESIGN */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[88vh] flex items-center pt-28 pb-16 overflow-hidden bg-background"
      >
        {/* Mobile background: full-screen image overlay with high opacity fade */}
        <div className="absolute inset-0 lg:hidden z-0 select-none pointer-events-none opacity-[0.09]">
          <img
            src={imgContactBg}
            alt="Executive Office Background Mobile"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-background/90" />
        </div>

        {/* Desktop Slanted split background panel */}
        <div className="absolute top-28 bottom-0 right-0 w-[55%] hidden lg:block z-10 select-none pointer-events-none">
          {/* Slanted image container */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0% 100%)",
            }}
          >
            {/* Parallax image scroll */}
            <motion.div style={{ y: heroY }} className="w-full h-full">
              <img
                src={imgContactBg}
                alt="Maxworth Executive Office Backdrop"
                className="w-full h-full object-cover object-center scale-110 filter brightness-[0.76] saturate-[0.88] contrast-[1.02]"
              />
            </motion.div>
          </div>

          {/* Accent Gold Slanted Border Line matching the exact polygon edge */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <line
              x1="22"
              y1="0"
              x2="0"
              y2="100"
              stroke="hsl(38, 88%, 48%)"
              strokeWidth="0.5"
              strokeOpacity="0.45"
            />
          </svg>
        </div>

        {/* Animated mesh background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div className="absolute -top-[25%] -left-[20%] w-[70%] h-[70%] rounded-full animate-blob-1"
            style={{ background: "radial-gradient(circle at 40% 40%, hsl(222 55% 85%/0.4), hsl(210 60% 90%/0.2) 60%, transparent)", filter: "blur(90px)" }} />
          <motion.div className="absolute -bottom-[20%] -right-[10%] w-[65%] h-[65%] rounded-full animate-blob-2"
            style={{ background: "radial-gradient(circle at 60% 60%, hsl(38 88% 92%/0.5), hsl(36 60% 88%/0.25) 60%, transparent)", filter: "blur(90px)" }} />
          <div className="absolute inset-0 dot-grid opacity-[0.35]" />
        </div>

        {/* Gold top line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] z-10"
          style={{ background: "linear-gradient(90deg, transparent, hsl(38 88% 46%/0.35), transparent)" }} />

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-20 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* ── LEFT: Text Content ── */}
            <motion.div
              style={{ y: heroY, opacity: heroOpacity }}
              className="lg:col-span-6 z-10"
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
              Ways to reach us.
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
                          <p className="text-muted-foreground text-sm font-light">
                            All fields marked <span className="text-red-500 font-medium">*</span> are required.
                          </p>
                        </div>

                        <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">

                          {/* Full Name */}
                          <div>
                            <div className="float-label-group">
                              <input
                                type="text" name="from_name" id="from_name"
                                value={form.from_name}
                                onChange={e => handleChange("from_name", e.target.value)}
                                onFocus={() => setFocused("from_name")}
                                onBlur={() => handleBlur("from_name")}
                                placeholder=" "
                                style={{ borderColor: borderColor("from_name") }}
                              />
                              <label htmlFor="from_name">Full Name <span className="text-red-500">*</span></label>
                              <motion.div className="absolute bottom-0 left-0 h-[2px] rounded-full"
                                style={{ background: "linear-gradient(90deg, hsl(38 88% 46%), hsl(38 88% 62%))" }}
                                initial={{ scaleX: 0, originX: 0 }}
                                animate={{ scaleX: focused === "from_name" ? 1 : 0 }}
                                transition={{ duration: 0.28 }} />
                            </div>
                            {showErr("from_name") && (
                              <p className="mt-1.5 text-[12px] flex items-center gap-1" style={{ color: "hsl(0 70% 50%)" }}>
                                <AlertCircle className="w-3 h-3 shrink-0" /> {errors.from_name}
                              </p>
                            )}
                          </div>

                          {/* Email + Phone */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* Email */}
                            <div>
                              <div className="float-label-group">
                                <input
                                  type="email" name="from_email" id="from_email"
                                  value={form.from_email}
                                  onChange={e => handleChange("from_email", e.target.value)}
                                  onFocus={() => setFocused("from_email")}
                                  onBlur={() => handleBlur("from_email")}
                                  placeholder=" "
                                  style={{ borderColor: borderColor("from_email") }}
                                />
                                <label htmlFor="from_email">Email Address <span className="text-red-500">*</span></label>
                                <motion.div className="absolute bottom-0 left-0 h-[2px] rounded-full"
                                  style={{ background: "linear-gradient(90deg, hsl(38 88% 46%), hsl(38 88% 62%))" }}
                                  initial={{ scaleX: 0, originX: 0 }}
                                  animate={{ scaleX: focused === "from_email" ? 1 : 0 }}
                                  transition={{ duration: 0.28 }} />
                              </div>
                              {showErr("from_email") && (
                                <p className="mt-1.5 text-[12px] flex items-center gap-1" style={{ color: "hsl(0 70% 50%)" }}>
                                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.from_email}
                                </p>
                              )}
                            </div>
                            {/* Phone */}
                            <div>
                              <div className="float-label-group">
                                <input
                                  type="tel" name="phone" id="phone"
                                  value={form.phone}
                                  onChange={e => handleChange("phone", e.target.value)}
                                  onFocus={() => setFocused("phone")}
                                  onBlur={() => handleBlur("phone")}
                                  placeholder=" "
                                  style={{ borderColor: borderColor("phone") }}
                                />
                                <label htmlFor="phone">Phone Number <span className="text-red-500">*</span></label>
                                <motion.div className="absolute bottom-0 left-0 h-[2px] rounded-full"
                                  style={{ background: "linear-gradient(90deg, hsl(38 88% 46%), hsl(38 88% 62%))" }}
                                  initial={{ scaleX: 0, originX: 0 }}
                                  animate={{ scaleX: focused === "phone" ? 1 : 0 }}
                                  transition={{ duration: 0.28 }} />
                              </div>
                              {showErr("phone") && (
                                <p className="mt-1.5 text-[12px] flex items-center gap-1" style={{ color: "hsl(0 70% 50%)" }}>
                                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.phone}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Service chip selector */}
                          <div>
                            <label className="block text-[10px] uppercase tracking-[0.22em] font-semibold text-muted-foreground mb-3.5">
                              Service Required <span className="text-red-500">*</span>
                            </label>
                            {/* Hidden input so EmailJS picks up the service value */}
                            <input type="hidden" name="service" value={form.service} />
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {services.map((svc) => {
                                const active = form.service === svc;
                                return (
                                  <motion.button
                                    key={svc} type="button"
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => { handleChange("service", active ? "" : svc); setTouched(prev => ({ ...prev, service: true })); }}
                                    className="py-2.5 px-3 rounded-lg text-[11px] font-semibold transition-all duration-200"
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
                            {showErr("service") && (
                              <p className="mt-1.5 text-[12px] flex items-center gap-1" style={{ color: "hsl(0 70% 50%)" }}>
                                <AlertCircle className="w-3 h-3 shrink-0" /> {errors.service}
                              </p>
                            )}
                          </div>

                          {/* Message */}
                          <div>
                            <div className="float-label-group">
                              <textarea
                                name="message" id="message" rows={4}
                                value={form.message}
                                onChange={e => handleChange("message", e.target.value)}
                                onFocus={() => setFocused("message")}
                                onBlur={() => handleBlur("message")}
                                placeholder=" "
                                className="resize-none"
                                style={{ borderColor: borderColor("message") }}
                              />
                              <label htmlFor="message">Your Message or Requirement <span className="text-red-500">*</span></label>
                              <motion.div className="absolute bottom-0 left-0 h-[2px] rounded-full"
                                style={{ background: "linear-gradient(90deg, hsl(38 88% 46%), hsl(38 88% 62%))" }}
                                initial={{ scaleX: 0, originX: 0 }}
                                animate={{ scaleX: focused === "message" ? 1 : 0 }}
                                transition={{ duration: 0.28 }} />
                            </div>
                            {showErr("message") && (
                              <p className="mt-1.5 text-[12px] flex items-center gap-1" style={{ color: "hsl(0 70% 50%)" }}>
                                <AlertCircle className="w-3 h-3 shrink-0" /> {errors.message}
                              </p>
                            )}
                          </div>

                          {/* Send error banner with fallbacks */}
                          {sendError && (
                            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid hsl(0 70% 88%)" }}>
                              <div className="flex items-start gap-3 p-4" style={{ background: "hsl(0 70% 96%)" }}>
                                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(0 70% 50%)" }} />
                                <div className="flex-1">
                                  <p className="text-[13px] font-semibold" style={{ color: "hsl(0 60% 35%)" }}>Message not sent</p>
                                  <p className="text-[12px] mt-0.5" style={{ color: "hsl(0 60% 45%)" }}>There was a technical issue. Please try one of the options below:</p>
                                </div>
                                <button onClick={() => setSendError(null)} className="text-[11px] font-bold shrink-0" style={{ color: "hsl(0 60% 45%)" }}>✕ Dismiss</button>
                              </div>
                              <div className="flex gap-2 p-3" style={{ background: "hsl(0 70% 93%)" }}>
                                <a
                                  href="mailto:maxworthglobal@zohomail.in?subject=Enquiry from Website&body=Name: %0APhone: %0AService: %0AMessage: "
                                  className="flex-1 text-center text-[11px] font-bold py-2 px-3 rounded-lg transition-all"
                                  style={{ background: "hsl(222 55% 18%)", color: "#fff" }}
                                >
                                  📧 Email Us Directly
                                </a>
                                <a
                                  href="https://wa.me/911149847956?text=Hello%20Maxworth%20Global%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 text-center text-[11px] font-bold py-2 px-3 rounded-lg transition-all"
                                  style={{ background: "hsl(142 70% 40%)", color: "#fff" }}
                                >
                                  💬 WhatsApp Us
                                </a>
                                <button
                                  type="submit"
                                  className="flex-1 text-center text-[11px] font-bold py-2 px-3 rounded-lg transition-all"
                                  style={{ background: "hsl(38 88% 46%)", color: "hsl(222 55% 12%)" }}
                                >
                                  🔄 Try Again
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Submit */}
                          <motion.button
                            type="submit"
                            disabled={sending}
                            whileHover={{ scale: sending ? 1 : 1.012 }} whileTap={{ scale: sending ? 1 : 0.985 }}
                            className="group relative w-full h-14 overflow-hidden font-bold uppercase tracking-[0.16em] text-[12px] text-white flex items-center justify-center gap-3 transition-shadow duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                            style={{ background: "hsl(222 55% 18%)", boxShadow: "0 4px 24px rgba(15,27,58,0.18)" }}
                            onMouseEnter={(e) => !sending && (e.currentTarget.style.boxShadow = "0 8px 32px rgba(15,27,58,0.3)")}
                            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 24px rgba(15,27,58,0.18)")}
                          >
                            <span className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400 ease-out"
                              style={{ background: "linear-gradient(90deg, hsl(38 88% 44%), hsl(38 88% 56%))" }} />
                            {sending ? (
                              <>
                                <Loader2 className="relative z-10 w-4 h-4 animate-spin" />
                                <span className="relative z-10">Sending…</span>
                              </>
                            ) : (
                              <>
                                <span className="relative z-10">Submit Enquiry</span>
                                <motion.span className="relative z-10"
                                  animate={{ x: [0, 3, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
                                  <Send className="w-4 h-4" />
                                </motion.span>
                              </>
                            )}
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

      {/* ══ MODERN MAP SECTION ══ */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "520px" }}>
        {/* Gold top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-20"
          style={{ background: "linear-gradient(90deg, transparent, hsl(38 88% 48%), transparent)" }}
        />

        <div className="flex flex-col lg:flex-row w-full h-full" style={{ minHeight: "520px" }}>

          {/* ── LEFT INFO PANEL ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col justify-center px-10 py-14 lg:py-0 lg:w-[38%] shrink-0"
            style={{ background: "hsl(222 55% 12%)" }}
          >
            {/* Radial glow blob */}
            <div
              className="absolute -top-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(38 88% 48% / 0.08), transparent 70%)", filter: "blur(50px)" }}
            />
            {/* Corner bracket decorations */}
            <div className="absolute top-8 right-8 w-14 h-14 pointer-events-none"
              style={{ borderTop: "1.5px solid hsl(38 88% 48% / 0.3)", borderRight: "1.5px solid hsl(38 88% 48% / 0.3)" }} />
            <div className="absolute bottom-8 left-8 w-14 h-14 pointer-events-none"
              style={{ borderBottom: "1.5px solid hsl(38 88% 48% / 0.3)", borderLeft: "1.5px solid hsl(38 88% 48% / 0.3)" }} />

            {/* Label */}
            <p className="text-[10px] uppercase tracking-[0.26em] font-bold mb-5" style={{ color: "hsl(38 88% 55%)" }}>
              Find Us
            </p>

            {/* Animated pin icon + title */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "hsl(38 88% 48% / 0.15)", border: "1px solid hsl(38 88% 48% / 0.3)" }}
              >
                <MapPin className="w-5 h-5" style={{ color: "hsl(38 88% 55%)" }} />
              </div>
              <h3 className="font-serif font-bold text-xl text-white leading-snug">
                Our Office
              </h3>
            </motion.div>

            {/* Gold divider */}
            <motion.div
              className="w-10 h-[1.5px] mb-6 origin-left"
              style={{ background: "linear-gradient(90deg, hsl(38 88% 48%), transparent)" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
            />

            {/* Address */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <p className="text-white/90 font-light text-[15px] leading-[1.9]">
                27, Sunview Apartments<br />
                Sector-11, Pocket-4, Dwarka<br />
                New Delhi – 110075
              </p>
            </motion.div>

            {/* Info rows */}
            {[
              { icon: Clock, label: "Hours", value: "Mon – Sat: 10:00 AM – 7:00 PM" },
              { icon: Phone, label: "Phone", value: "+011-49847956" },
              { icon: Mail, label: "Email", value: "maxworthglobal@zohomail.in" },
            ].map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                className="flex items-start gap-3 mb-5"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 + i * 0.1, duration: 0.45 }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "hsl(38 88% 48% / 0.1)", border: "1px solid hsl(38 88% 48% / 0.2)" }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: "hsl(38 88% 55%)" }} />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/35 font-semibold mb-0.5">{label}</p>
                  <p className="text-white/75 text-[13px] font-light">{value}</p>
                </div>
              </motion.div>
            ))}

            {/* CTA button */}
            <motion.a
              href="https://maps.app.goo.gl/XkLHiRBzZwahZJ1h9"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-2 self-start font-bold uppercase tracking-[0.14em] text-[11px] px-6 py-3 transition-all"
              style={{ background: "hsl(38 88% 48%)", color: "hsl(222 55% 12%)" }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.75, duration: 0.45 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <MapPin className="w-3.5 h-3.5" />
              Get Directions
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </motion.div>

          {/* ── RIGHT MAP PANEL ── */}
          <div className="relative flex-1 min-h-[380px] lg:min-h-0">
            {/* Gradient bleed from left panel */}
            <div
              className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, hsl(222 55% 12%), transparent)" }}
            />
            {/* Gradient bleed from right side into map */}
            <div
              className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, hsl(222 55% 12%), transparent)" }}
            />
            <PremiumMap />
          </div>
        </div>
      </section>


      <Footer />
    </main>
  );
}
