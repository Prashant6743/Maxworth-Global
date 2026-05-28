import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Lightbulb, Cloud, ShieldCheck, ArrowUpRight, Star } from "lucide-react";
import imgWhyUs from "@/assets/9.png";

const reasons = [
  {
    icon: Users,
    title: "Partner led Approach",
    desc: "Every client gets direct, undivided attention from experienced senior partners — not juniors or interns.",
  },
  {
    icon: Lightbulb,
    title: "Proactive Advisory",
    desc: "We don't just react to the past; we plan your financial future with foresight and strategic clarity.",
  },
  {
    icon: Cloud,
    title: "Tech-Forward Systems",
    desc: "Cloud accounting, real-time dashboards, and digital-first workflows for 24/7 visibility into your finances.",
  },
  {
    icon: ShieldCheck,
    title: "Impeccable Integrity",
    desc: "A strict code of ethics governs every document we sign. Your trust is our most valued asset.",
  },
];

const testimonials = [
  {
    name: "Arjun Mehra",
    role: "CEO",
    text: "Maxworth Global LLP transformed how we approach compliance. Their proactive advisory saved us lakhs in penalties.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Founder",
    text: "The team feels like an extension of our own. Always reachable, always precise, and remarkably insightful.",
    rating: 5,
  },
];

export function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="why-us"
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{ background: "hsl(36 25% 96%)" }}
    >
      {/* Background dot grid */}
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

      {/* Giant watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-serif font-bold select-none text-primary"
          style={{ fontSize: "22rem", opacity: 0.018, lineHeight: 1 }}
        >
          Trust
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-[11px] uppercase tracking-[0.22em] font-semibold text-gold mb-4"
          >
            The Difference
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 60, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold text-4xl md:text-5xl text-foreground leading-[1.1] max-w-2xl mx-auto"
            >
              Why leading businesses choose us.
            </motion.h2>
          </div>
        </div>

        {/* Reasons Grid + Image */}
        <div className="grid lg:grid-cols-5 gap-12 items-center mb-24">

          {/* Reasons — 2 cols */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-6">
            {reasons.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: "easeOut" }}
                  className="group flex gap-5 p-6 bg-white rounded-sm shadow-sm hover:shadow-md transition-all duration-300 cursor-default border border-border/50 hover:border-gold/30"
                >
                  <div
                    className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: "hsl(38 88% 94%)" }}
                  >
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-[15px] mb-1 group-hover:text-primary transition-colors">{reason.title}</h4>
                    <p className="text-muted-foreground text-sm font-light leading-[1.8]">{reason.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Image — 3 cols */}
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={isInView ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 1.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 relative h-[480px] md:h-[560px] overflow-hidden"
          >
            <img
              src={imgWhyUs}
              alt="Professional consultation meeting"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "contrast(1.05) saturate(0.88)" }}
            />
            {/* Gold frame inset */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ border: "1px solid hsl(38 88% 48% / 0.4)" }}
            />
            {/* Bottom overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
              style={{ background: "linear-gradient(to top, hsl(36 25% 96%), transparent)" }}
            />

            {/* Stats badge on image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="absolute bottom-10 left-8 glass px-5 py-4 shadow-lg"
              style={{ border: "1px solid rgba(255,255,255,0.85)" }}
            >
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-serif font-bold text-3xl text-primary">98%</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">Client Retention</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gold" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
              className="bg-white border border-border/60 p-8 shadow-sm hover:shadow-md hover:border-gold/25 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Gold accent top line on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400"
                style={{ background: "linear-gradient(90deg, hsl(38 88% 42%), hsl(38 88% 58%))" }}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} className="w-3.5 h-3.5 fill-gold text-gold" style={{ color: "hsl(38 88% 48%)" }} />
                ))}
              </div>

              <p className="font-serif text-lg text-foreground italic leading-[1.7] mb-6">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-serif font-bold text-sm text-primary"
                  style={{ background: "hsl(38 88% 94%)" }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-[11px] text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
