import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Calculator, LineChart, Building2, Scale, ShieldCheck, PiggyBank, ArrowUpRight,
} from "lucide-react";

const services = [
  {
    title: "Taxation",
    shortDesc: "End-to-end tax strategy",
    description: "Income Tax filing, GST registration & returns, TDS compliance, and advanced tax planning strategies to minimise liability and maximise savings.",
    icon: Calculator,
    tag: "Most Popular",
  },
  {
    title: "Audit & Assurance",
    shortDesc: "Complete transparency",
    description: "Statutory audit, internal audit, and tax audit services ensuring complete regulatory transparency and stakeholder confidence.",
    icon: ShieldCheck,
    tag: null,
  },
  {
    title: "Business Advisory",
    shortDesc: "Virtual CFO & strategy",
    description: "Virtual CFO services, financial planning, investment advice, and comprehensive MIS reporting to steer smarter business decisions.",
    icon: LineChart,
    tag: "Premium",
  },
  {
    title: "Company Registration",
    shortDesc: "Seamless incorporation",
    description: "Pvt Ltd, LLP, OPC, and non-profit incorporation handled end-to-end — from DIN to compliance — with zero friction.",
    icon: Building2,
    tag: null,
  },
  {
    title: "Legal Compliance",
    shortDesc: "ROC, FEMA & more",
    description: "ROC filings, FEMA compliance, RBI regulations, and full secretarial services to keep your company legally spotless.",
    icon: Scale,
    tag: null,
  },
  {
    title: "Payroll Management",
    shortDesc: "Accurate & compliant",
    description: "Accurate salary processing, PF/ESI compliance, employee tax structuring, and complete payroll outsourcing solutions.",
    icon: PiggyBank,
    tag: null,
  },
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" ref={ref} className="relative py-32 bg-background overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(38 88% 48% / 0.4), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="text-[11px] uppercase tracking-[0.22em] font-semibold text-gold mb-4"
            >
              Our Expertise
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 60, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif font-bold text-4xl md:text-5xl text-foreground leading-[1.1]"
              >
                Comprehensive financial solutions for modern enterprises.
              </motion.h2>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground font-light leading-[1.85] max-w-sm"
          >
            From seamless compliance to strategic advisory — we provide the robust financial foundation your business needs to scale safely and grow boldly.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
          {services.map((service, index) => {
            const Icon = service.icon;
            const num = (index + 1).toString().padStart(2, "0");
            const isHovered = hovered === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.08 * index, ease: "easeOut" }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className="relative group p-10 border-r border-b border-border transition-all duration-300 overflow-hidden cursor-default"
                style={{
                  background: isHovered ? "hsl(222 55% 18%)" : "white",
                  transition: "background 0.4s ease",
                }}
              >
                {/* Animated gold bottom line */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] transition-all duration-500 ease-out"
                  style={{
                    width: isHovered ? "100%" : "0%",
                    background: "linear-gradient(90deg, hsl(38 88% 42%), hsl(38 88% 60%))",
                  }}
                />

                {/* Badge */}
                {service.tag && (
                  <div
                    className="absolute top-5 right-5 px-2.5 py-1 text-[9px] uppercase font-bold tracking-[0.18em] rounded-full"
                    style={{
                      background: isHovered ? "hsl(38 88% 48% / 0.2)" : "hsl(38 88% 94%)",
                      color: isHovered ? "hsl(38 88% 65%)" : "hsl(38 88% 38%)",
                      transition: "all 0.4s ease",
                    }}
                  >
                    {service.tag}
                  </div>
                )}

                {/* Faded number */}
                <div
                  className="absolute -right-3 top-3 font-serif font-bold text-8xl select-none transition-all duration-500"
                  style={{
                    color: isHovered ? "rgba(255,255,255,0.04)" : "hsl(222 55% 18% / 0.04)",
                    lineHeight: 1,
                  }}
                >
                  {num}
                </div>

                {/* Icon */}
                <div
                  className="relative mb-8 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300"
                  style={{
                    background: isHovered ? "hsl(38 88% 48% / 0.15)" : "hsl(222 55% 18% / 0.06)",
                  }}
                >
                  <Icon
                    className="w-5 h-5 transition-colors duration-300"
                    style={{ color: isHovered ? "hsl(38 88% 55%)" : "hsl(222 55% 18%)" }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-serif font-bold text-2xl mb-1 transition-colors duration-300"
                  style={{ color: isHovered ? "white" : "hsl(220 35% 10%)" }}
                >
                  {service.title}
                </h3>

                <p
                  className="text-[11px] uppercase tracking-[0.16em] font-semibold mb-5 transition-colors duration-300"
                  style={{ color: isHovered ? "hsl(38 88% 55%)" : "hsl(38 88% 44%)" }}
                >
                  {service.shortDesc}
                </p>

                {/* Divider */}
                <div
                  className="w-10 h-[1.5px] mb-5 transition-all duration-500"
                  style={{
                    background: isHovered ? "hsl(38 88% 48% / 0.5)" : "hsl(var(--border))",
                    width: isHovered ? "2.5rem" : "2rem",
                  }}
                />

                <p
                  className="text-sm font-light leading-[1.8] transition-colors duration-300"
                  style={{ color: isHovered ? "hsl(36 33% 90%)" : "hsl(215 16% 47%)" }}
                >
                  {service.description}
                </p>
              </motion.div>
            );
          })}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="relative p-10 border-r border-b border-border flex flex-col justify-between overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(38 88% 46%), hsl(38 88% 56%))",
            }}
          >
            {/* Subtle diagonal stripe */}
            <div className="absolute inset-0 stripe-bg opacity-20 pointer-events-none" />

            <div className="relative z-10">
              <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-white/70 mb-5">Custom Advisory</p>
              <h3 className="font-serif font-bold text-3xl text-white leading-[1.1] mb-5">
                Need a tailored solution?
              </h3>
              <p className="text-white/80 font-light text-sm leading-[1.85]">
                Every business is unique. Let's discuss how we can shape our expertise around your specific challenges and goals.
              </p>
            </div>

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="relative z-10 mt-10 self-start flex items-center gap-2 font-bold uppercase tracking-[0.14em] text-[12px] text-white group"
            >
              <span className="underline underline-offset-4 decoration-white/40 group-hover:decoration-white transition-colors">
                Get in Touch
              </span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
