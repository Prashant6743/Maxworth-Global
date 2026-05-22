import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(end: number, duration = 2.2, isInView: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * end));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, isInView]);

  return count;
}

interface StatCardProps {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  isInView: boolean;
  index: number;
}

function StatCard({ value, suffix, prefix = "", label, description, isInView, index }: StatCardProps) {
  const count = useCountUp(value, 2.2, isInView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col items-center text-center p-8 md:p-10 cursor-default"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, hsl(38 88% 48% / 0.06), transparent 70%)" }} />

      {/* Number */}
      <div
        className="font-serif font-bold leading-none mb-3 tabular-nums"
        style={{
          fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
          background: "linear-gradient(135deg, hsl(222 55% 18%), hsl(222 55% 30%))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {prefix}{count}{suffix}
      </div>

      {/* Gold underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
        className="w-10 h-[2px] mb-4 origin-left mx-auto"
        style={{ background: "linear-gradient(90deg, hsl(38 88% 42%), hsl(38 88% 58%))" }}
      />

      <p className="text-sm font-bold uppercase tracking-[0.18em] text-foreground mb-2">{label}</p>
      <p className="text-xs text-muted-foreground font-light leading-relaxed max-w-[160px]">{description}</p>
    </motion.div>
  );
}

const stats = [
  { value: 25, suffix: "+", label: "Years of Excellence", description: "Serving clients since 1998 with unmatched expertise" },
  { value: 500, suffix: "+", label: "Happy Clients", description: "Businesses that trust us with their financial future" },
  { value: 10, suffix: "k+", label: "Filings Completed", description: "Accurate filings across tax, GST, and compliance" },
  { value: 2, prefix: "₹", suffix: "B+", label: "Assets Advised", description: "Total financial assets managed and guided by our team" },
];

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section ref={ref} className="relative py-4 bg-white overflow-hidden">
      {/* Stripe background */}
      <div className="absolute inset-0 stripe-bg opacity-50 pointer-events-none" />

      {/* Top/bottom gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, hsl(38 88% 48% / 0.5), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, hsl(38 88% 48% / 0.5), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center pt-16 pb-10"
        >
          <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-gold mb-3">By The Numbers</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            A legacy of measurable impact
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} isInView={isInView} index={i} />
          ))}
        </div>

        {/* Bottom spacer */}
        <div className="pb-12" />
      </div>
    </section>
  );
}
