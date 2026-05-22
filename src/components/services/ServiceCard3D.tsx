import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, CheckCircle2, ChevronDown } from "lucide-react";

export type ServiceItem = {
  id: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  tag: string | null;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  stat: { value: string; label: string };
};

export function ServiceCard3D({ svc, index }: { svc: ServiceItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(null);
  const inView = useInView(inViewRef, { once: true, amount: 0.15 });
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const Icon = svc.icon;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); setHovered(false); };

  return (
    <div ref={inViewRef} style={{ perspective: "1000px" }}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative h-full bg-white border border-white/60 overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.02 }}
      >
        {/* Glare overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 opacity-0 transition-opacity duration-300"
          style={{
            opacity: hovered ? 0.06 : 0,
            background: `radial-gradient(circle at ${glareX} ${glareY}, white, transparent 60%)`,
          }}
        />

        {/* Top color sweep */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[3px]"
          initial={{ scaleX: 0 }}
          animate={hovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: `linear-gradient(90deg, ${svc.color}, ${svc.color}55)`, transformOrigin: "left" }}
        />

        {/* Glow on hover */}
        <motion.div
          className="absolute -inset-px pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ boxShadow: `0 0 40px -10px ${svc.color}` }}
        />

        <div className="p-8 relative z-10" style={{ transform: "translateZ(20px)" }}>
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: svc.bg }}
                animate={hovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Icon className="w-5 h-5" style={{ color: svc.color }} />
              </motion.div>
              <div>
                <h3 className="font-serif font-bold text-lg text-foreground leading-tight">{svc.title}</h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] mt-0.5" style={{ color: svc.color }}>
                  {svc.tagline}
                </p>
              </div>
            </div>
            {svc.tag && (
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-1 rounded-full shrink-0"
                style={{ background: svc.bg, color: svc.color }}>
                {svc.tag}
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground font-light leading-[1.8] mb-5">{svc.description}</p>

          {/* Accordion */}
          <button
            onClick={() => setExpanded(v => !v)}
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] mb-3"
            style={{ color: svc.color }}
          >
            {expanded ? "Less" : "What's Included"}
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-3 h-3" />
            </motion.span>
          </button>

          <motion.div
            animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            initial={false}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ul className="space-y-2 pb-4">
              {svc.features.map((f, i) => (
                <motion.li key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={expanded ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-2 text-[13px] text-foreground/80"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: svc.color }} />
                  {f}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Stat + CTA */}
          <div className="flex items-center justify-between pt-5 border-t border-border/50">
            <div>
              <p className="font-serif font-bold text-2xl text-foreground">{svc.stat.value}</p>
              <p className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground font-semibold">{svc.stat.label}</p>
            </div>
            <motion.button
              whileHover={{ x: 3, y: -3 }}
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] px-4 py-2.5"
              style={{ border: `1.5px solid ${svc.color}`, color: svc.color }}
              onClick={() => document.getElementById("contact-cta")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get Started <ArrowUpRight className="w-3 h-3" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
