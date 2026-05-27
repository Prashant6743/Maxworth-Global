import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, MapPin, Phone, Mail, Clock, ArrowUpRight, Loader2, AlertCircle } from "lucide-react";
import { PremiumMap } from "./PremiumMap";
import emailjs from "@emailjs/browser";

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

const contactDetails = [
  {
    icon: MapPin,
    label: "Office",
    lines: ["27, Sunview Apartments, Sector-11", "Pocket-4, Dwarka, New Delhi-110075"],
  },
  {
    icon: Phone,
    label: "Phone",
    lines: ["+011-49847956"],
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["maxworthglobal@zohomail.in"],
  },
  {
    icon: Clock,
    label: "Office Hours",
    lines: ["Mon – Sat: 10:00 AM – 7:00 PM"],
  },
];

const services = ["Startup", "Licence", "ROC", "Tax & Payroll", "Miscellaneous Registration", "OTHER Services"];

// ── Validation helpers ──────────────────────────────────────────────
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isValidPhone = (v: string) => /^[+]?[\d\s\-().]{7,15}$/.test(v.trim());
const isValidName  = (v: string) => v.trim().length >= 2;

interface FormState {
  from_name: string;
  from_email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  from_name?: string;
  from_email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

export function Contact() {
  const ref     = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [focused, setFocused]     = useState<string | null>(null);
  const [touched, setTouched]     = useState<Partial<Record<keyof FormState, boolean>>>({});

  const [form, setForm] = useState<FormState>({
    from_name:  "",
    from_email: "",
    phone:      "",
    service:    "",
    message:    "",
  });

  // ── Derive errors on the fly ──────────────────────────────────────
  const validate = (f: FormState): FormErrors => {
    const e: FormErrors = {};
    if (!isValidName(f.from_name))   e.from_name  = "Please enter your full name (at least 2 characters).";
    if (!isValidEmail(f.from_email)) e.from_email = "Please enter a valid email address.";
    if (!isValidPhone(f.phone))      e.phone      = "Please enter a valid phone number.";
    if (!f.service)                  e.service    = "Please select a service.";
    if (f.message.trim().length < 10) e.message   = "Please write at least 10 characters.";
    return e;
  };

  const errors  = validate(form);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setFocused(null);
  };

  const showErr = (field: keyof FormState) =>
    touched[field] && errors[field];

  const borderColor = (field: keyof FormState) => {
    if (showErr(field))    return "hsl(0 70% 55%)";
    if (focused === field) return "hsl(38 88% 48%)";
    return "hsl(var(--border))";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all fields touched so errors show
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
      setSendError("Something went wrong. Please try again or email us directly at maxworthglobal@zohomail.in");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="relative bg-background overflow-hidden">

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(38 88% 48% / 0.4), transparent)" }} />

      <div className="grid lg:grid-cols-2 min-h-[820px]">

        {/* ── Left Panel – Dark Navy ── */}
        <div
          className="relative flex flex-col justify-center py-24 px-8 md:px-14 lg:px-20 overflow-hidden"
          style={{ background: "hsl(222 55% 14%)" }}
        >
          {/* Background blobs */}
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, hsl(38 88% 48% / 0.08), transparent 70%)", filter: "blur(40px)" }}
          />
          <div
            className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, hsl(222 80% 50% / 0.08), transparent 70%)", filter: "blur(40px)" }}
          />

          {/* Decorative corner lines */}
          <div className="absolute top-12 right-12 w-20 h-20 border-t border-r pointer-events-none" style={{ borderColor: "hsl(38 88% 48% / 0.2)" }} />
          <div className="absolute bottom-12 left-12 w-20 h-20 border-b border-l pointer-events-none" style={{ borderColor: "hsl(38 88% 48% / 0.2)" }} />

          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-md"
          >
            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-5" style={{ color: "hsl(38 88% 55%)" }}>
              Contact Us
            </p>

            <h2 className="font-serif font-bold text-4xl md:text-5xl text-white mb-6 leading-[1.08]">
              Let's build your financial future, together.
            </h2>

            <p className="text-white/60 font-light text-base leading-[1.85] mb-12">
              Whether you're a startup or an established enterprise, we have the expertise to take your financial management to the next level.
            </p>

            {/* Contact Details */}
            <div className="space-y-8">
              {contactDetails.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    className="flex items-start gap-5"
                  >
                    <div
                      className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: "hsl(38 88% 48% / 0.12)", border: "1px solid hsl(38 88% 48% / 0.2)" }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "hsl(38 88% 55%)" }} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-1.5 text-white/40">{item.label}</p>
                      {item.lines.map((line, li) => (
                        <p key={li} className="text-white/80 font-light text-[15px] leading-[1.7]">{line}</p>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Firm watermark */}
            <div className="mt-20 font-serif text-4xl font-bold text-white/[0.04] select-none">
              The Maxworth Global
            </div>
          </motion.div>
        </div>

        {/* ── Right Panel – Form ── */}
        <div className="relative flex flex-col justify-center bg-white py-24 px-8 md:px-14 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="max-w-lg w-full mx-auto"
          >
            {submitted ? (
              <div className="flex flex-col items-center text-center py-24">
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="mb-8"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
                    style={{ background: "hsl(38 88% 94%)" }}
                  >
                    <CheckCircle2 className="w-10 h-10" style={{ color: "hsl(38 88% 46%)" }} />
                  </div>
                </motion.div>
                <h3 className="font-serif font-bold text-3xl text-foreground mb-4">Request Received</h3>
                <p className="text-muted-foreground font-light leading-[1.85] max-w-sm">
                  Thank you for reaching out. One of our senior partners will contact you within one business day.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-10">
                  <h3 className="font-serif font-bold text-3xl text-foreground mb-2">Request a Callback</h3>
                  <p className="text-muted-foreground text-sm font-light">
                    All fields marked <span className="text-red-500 font-medium">*</span> are required.
                  </p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-7">

                  {/* Full Name */}
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        name="from_name"
                        id="from_name"
                        value={form.from_name}
                        onChange={e => handleChange("from_name", e.target.value)}
                        onFocus={() => setFocused("from_name")}
                        onBlur={() => handleBlur("from_name")}
                        placeholder=" "
                        className="peer w-full border-b-[1.5px] bg-transparent py-3 pt-5 text-[15px] text-foreground outline-none transition-colors placeholder-transparent"
                        style={{ borderColor: borderColor("from_name") }}
                      />
                      <label htmlFor="from_name" className="absolute left-0 top-3.5 text-sm text-muted-foreground pointer-events-none transition-all duration-200 peer-focus:-top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-primary peer-not-placeholder-shown:-top-0 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-wider">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                    </div>
                    {showErr("from_name") && (
                      <p className="mt-1.5 text-[12px] flex items-center gap-1" style={{ color: "hsl(0 70% 50%)" }}>
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.from_name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <div className="relative">
                      <input
                        type="email"
                        name="from_email"
                        id="from_email"
                        value={form.from_email}
                        onChange={e => handleChange("from_email", e.target.value)}
                        onFocus={() => setFocused("from_email")}
                        onBlur={() => handleBlur("from_email")}
                        placeholder=" "
                        className="peer w-full border-b-[1.5px] bg-transparent py-3 pt-5 text-[15px] text-foreground outline-none transition-colors placeholder-transparent"
                        style={{ borderColor: borderColor("from_email") }}
                      />
                      <label htmlFor="from_email" className="absolute left-0 top-3.5 text-sm text-muted-foreground pointer-events-none transition-all duration-200 peer-focus:-top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-primary peer-not-placeholder-shown:-top-0 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-wider">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                    </div>
                    {showErr("from_email") && (
                      <p className="mt-1.5 text-[12px] flex items-center gap-1" style={{ color: "hsl(0 70% 50%)" }}>
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.from_email}
                      </p>
                    )}
                  </div>

                  {/* Phone – now required */}
                  <div>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={form.phone}
                        onChange={e => handleChange("phone", e.target.value)}
                        onFocus={() => setFocused("phone")}
                        onBlur={() => handleBlur("phone")}
                        placeholder=" "
                        className="peer w-full border-b-[1.5px] bg-transparent py-3 pt-5 text-[15px] text-foreground outline-none transition-colors placeholder-transparent"
                        style={{ borderColor: borderColor("phone") }}
                      />
                      <label htmlFor="phone" className="absolute left-0 top-3.5 text-sm text-muted-foreground pointer-events-none transition-all duration-200 peer-focus:-top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-primary peer-not-placeholder-shown:-top-0 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-wider">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                    </div>
                    {showErr("phone") && (
                      <p className="mt-1.5 text-[12px] flex items-center gap-1" style={{ color: "hsl(0 70% 50%)" }}>
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Service Select */}
                  <div>
                    <div className="relative">
                      <select
                        id="service"
                        name="service"
                        value={form.service}
                        onChange={e => handleChange("service", e.target.value)}
                        onBlur={() => handleBlur("service")}
                        className="w-full border-b-[1.5px] bg-transparent py-3 text-[15px] text-foreground outline-none appearance-none cursor-pointer transition-colors"
                        style={{ borderColor: borderColor("service") }}
                      >
                        <option value="" disabled>Select a Service *</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <div className="absolute right-0 top-3.5 pointer-events-none">
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground rotate-90" />
                      </div>
                    </div>
                    {showErr("service") && (
                      <p className="mt-1.5 text-[12px] flex items-center gap-1" style={{ color: "hsl(0 70% 50%)" }}>
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.service}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <div className="relative">
                      <textarea
                        name="message"
                        id="message"
                        rows={3}
                        value={form.message}
                        onChange={e => handleChange("message", e.target.value)}
                        onFocus={() => setFocused("message")}
                        onBlur={() => handleBlur("message")}
                        placeholder=" "
                        className="peer w-full border-b-[1.5px] bg-transparent py-3 pt-5 text-[15px] text-foreground outline-none resize-none transition-colors placeholder-transparent"
                        style={{ borderColor: borderColor("message") }}
                      />
                      <label htmlFor="message" className="absolute left-0 top-3.5 text-sm text-muted-foreground pointer-events-none transition-all duration-200 peer-focus:-top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-primary peer-not-placeholder-shown:-top-0 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-wider">
                        Brief Message <span className="text-red-500">*</span>
                      </label>
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

                  <button
                    type="submit"
                    disabled={sending}
                    className="group relative w-full h-14 overflow-hidden font-bold uppercase tracking-[0.14em] text-[12px] text-white flex items-center justify-center gap-3 transition-all hover:shadow-[0_8px_32px_-6px_rgba(15,27,58,0.45)] disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ background: "hsl(222 55% 18%)" }}
                  >
                    <span
                      className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400 ease-out"
                      style={{ background: "linear-gradient(90deg, hsl(38 88% 44%), hsl(38 88% 56%))" }}
                    />
                    {sending ? (
                      <>
                        <Loader2 className="relative z-10 w-4 h-4 animate-spin" />
                        <span className="relative z-10">Sending…</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Submit Request</span>
                        <ArrowUpRight className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* ══ MODERN MAP SECTION ══ */}
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "520px" }}
      >
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
            {/* Corner bracket decoration */}
            <div className="absolute top-8 right-8 w-14 h-14 pointer-events-none"
              style={{ borderTop: "1.5px solid hsl(38 88% 48% / 0.3)", borderRight: "1.5px solid hsl(38 88% 48% / 0.3)" }} />
            <div className="absolute bottom-8 left-8 w-14 h-14 pointer-events-none"
              style={{ borderBottom: "1.5px solid hsl(38 88% 48% / 0.3)", borderLeft: "1.5px solid hsl(38 88% 48% / 0.3)" }} />

            {/* Label */}
            <p className="text-[10px] uppercase tracking-[0.26em] font-bold mb-5" style={{ color: "hsl(38 88% 55%)" }}>
              Find Us
            </p>

            {/* Animated pin icon */}
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

            {/* CTA */}
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
            {/* Gradient bleed from left panel into map */}
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
      </div>

    </section>
  );
}
