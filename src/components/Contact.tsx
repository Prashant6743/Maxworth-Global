import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    label: "Office",
    lines: ["123 Financial District, Suite 400", "Mumbai, Maharashtra 400001"],
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
    lines: ["Mon – Sat: 9:00 AM – 7:00 PM", "Sun: By Appointment"],
  },
];

const services = ["Startup", "Licence", "ROC", "Tax & Payroll", "Miscellaneous Registration", "OTHER Services"];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
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
                  <p className="text-muted-foreground text-sm font-light">Fill in the details below and we'll reach out shortly.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-9">
                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-6">
                    {["First Name", "Last Name"].map((label) => (
                      <div key={label} className="relative">
                        <input
                          required
                          type="text"
                          placeholder=" "
                          id={label.toLowerCase().replace(" ", "-")}
                          onFocus={() => setFocused(label)}
                          onBlur={() => setFocused(null)}
                          className="peer w-full border-b-[1.5px] bg-transparent py-3 pt-5 text-[15px] text-foreground outline-none transition-colors placeholder-transparent"
                          style={{
                            borderColor: focused === label ? "hsl(38 88% 48%)" : "hsl(var(--border))",
                          }}
                        />
                        <label
                          htmlFor={label.toLowerCase().replace(" ", "-")}
                          className="absolute left-0 top-3.5 text-sm text-muted-foreground pointer-events-none transition-all duration-200 peer-focus:-top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-primary peer-not-placeholder-shown:-top-0 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-wider"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <input
                      required
                      type="email"
                      placeholder=" "
                      id="email"
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className="peer w-full border-b-[1.5px] bg-transparent py-3 pt-5 text-[15px] text-foreground outline-none transition-colors placeholder-transparent"
                      style={{
                        borderColor: focused === "email" ? "hsl(38 88% 48%)" : "hsl(var(--border))",
                      }}
                    />
                    <label htmlFor="email" className="absolute left-0 top-3.5 text-sm text-muted-foreground pointer-events-none transition-all duration-200 peer-focus:-top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-primary">
                      Email Address
                    </label>
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder=" "
                      id="phone"
                      onFocus={() => setFocused("phone")}
                      onBlur={() => setFocused(null)}
                      className="peer w-full border-b-[1.5px] bg-transparent py-3 pt-5 text-[15px] text-foreground outline-none transition-colors placeholder-transparent"
                      style={{
                        borderColor: focused === "phone" ? "hsl(38 88% 48%)" : "hsl(var(--border))",
                      }}
                    />
                    <label htmlFor="phone" className="absolute left-0 top-3.5 text-sm text-muted-foreground pointer-events-none transition-all duration-200 peer-focus:-top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-primary">
                      Phone Number (optional)
                    </label>
                  </div>

                  {/* Service Select */}
                  <div className="relative">
                    <select
                      required
                      id="service"
                      defaultValue=""
                      className="w-full border-b-[1.5px] border-border bg-transparent py-3 text-[15px] text-foreground outline-none appearance-none cursor-pointer focus:border-gold transition-colors"
                    >
                      <option value="" disabled className="text-muted-foreground">Select a Service</option>
                      {services.map((s) => (
                        <option key={s} value={s.toLowerCase().replace(/\s+/g, "-")}>{s}</option>
                      ))}
                    </select>
                    <div className="absolute right-0 top-3.5 pointer-events-none">
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground rotate-90" />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <textarea
                      required
                      placeholder=" "
                      id="message"
                      rows={3}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      className="peer w-full border-b-[1.5px] bg-transparent py-3 pt-5 text-[15px] text-foreground outline-none resize-none transition-colors placeholder-transparent"
                      style={{
                        borderColor: focused === "message" ? "hsl(38 88% 48%)" : "hsl(var(--border))",
                      }}
                    />
                    <label htmlFor="message" className="absolute left-0 top-3.5 text-sm text-muted-foreground pointer-events-none transition-all duration-200 peer-focus:-top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-primary">
                      Brief Message
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full h-14 overflow-hidden font-bold uppercase tracking-[0.14em] text-[12px] text-white flex items-center justify-center gap-3 transition-all hover:shadow-[0_8px_32px_-6px_rgba(15,27,58,0.45)]"
                    style={{ background: "hsl(222 55% 18%)" }}
                  >
                    <span
                      className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400 ease-out"
                      style={{ background: "linear-gradient(90deg, hsl(38 88% 44%), hsl(38 88% 56%))" }}
                    />
                    <span className="relative z-10">Submit Request</span>
                    <ArrowUpRight className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
