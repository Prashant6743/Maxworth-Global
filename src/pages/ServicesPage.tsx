import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  Calculator, LineChart, Scale,
  ArrowUpRight, ArrowRight, Phone, Mail,
  Rocket, Award, Compass,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import img11 from "@/Stock_img/2.png";

const services = [
  {
    id: "startup",
    icon: Rocket,
    color: "hsl(155 55% 35%)",
    num: "01",
    title: "Startup",
    tagline: "From idea to incorporation in days",
    description: "End-to-end support to incorporate your Private Limited, LLP, OPC, or Partnership. We handle name approvals, DIN, DSC, PAN, TAN, and all setup compliance.",
    features: [
      "Pvt Ltd & LLP Incorporation",
      "OPC & Partnership Registration",
      "Section 8 (NGO) & Trust Registration",
      "Startup India Recognition (DPIIT)",
      "Shareholders Agreement & Drafting",
      "Co-founders Agreement Consultancy"
    ],
    stat: "300+ Startups Setup"
  },
  {
    id: "licence",
    icon: Award,
    color: "hsl(38 88% 46%)",
    num: "02",
    title: "Licence",
    tagline: "Registrations & Certifications",
    description: "Obtain critical business licenses and tax registrations required to operate legally. Fast-tracked applications with error-free drafting and documentation.",
    features: [
      "Import Export Code Registration",
      "FCRA Licence",
      "MSME Licence",
      "FSSAI Registration and Licence",
      "Trademark"
    ],
    stat: "1000+ Licenses Issued"
  },
  {
    id: "roc",
    icon: Scale,
    color: "hsl(280 50% 42%)",
    num: "03",
    title: "ROC",
    tagline: "Corporate Compliance & MCA Filings",
    description: "Ensure compliance with the Ministry of Corporate Affairs (MCA). Annual filings, secretarial audits, change of directors, capital increases, and ROC notices.",
    features: [
      "Share Valuation",
      "ROC Search Report",
      "All Compliance Related to ROC & MCA",
      "Companies Secretarial Work",
      "Corporate Restructuring"
    ],
    stat: "99% Filings On-Time"
  },
  {
    id: "tax-payroll",
    icon: Calculator,
    color: "hsl(222 55% 40%)",
    num: "04",
    title: "Tax & Payroll",
    tagline: "Income Tax, GST & Salaries",
    description: "Complete direct & indirect tax management coupled with outsourced payroll processing. Maximize tax optimization and pay your employees seamlessly.",
    features: [
      "VAT",
      "Custom Tax",
      "GST Registration",
      "Domestic Tax Compliances",
      "80G / 12A",
      "Income Tax",
      "Indirect Tax",
      "Direct Tax",
      "Tax Consultancy"
    ],
    stat: "₹2B+ Tax Optimised"
  },
  {
    id: "misc-reg",
    icon: Compass,
    color: "hsl(210 70% 42%)",
    num: "05",
    title: "Miscellaneous Registration",
    tagline: "Trademarks, ISO & Certifications",
    description: "Protect your brand identity and get certified. Intellectual property filing, quality certifications, and specific registrations for tenders or scaling.",
    features: [
      "Section 8 Company Registration",
      "Partnership Deed Registration",
      "NGO & Trust",
      "Society"
    ],
    stat: "400+ Brands Protected"
  },
  {
    id: "other",
    icon: LineChart,
    color: "hsl(10 80% 46%)",
    num: "06",
    title: "OTHER Services",
    tagline: "Audit, CFO Advisory & Finance",
    description: "Statutory audit, fractional CFO leadership, business valuation, and capital raising advisory. Senior partner attention to solve your complex financial needs.",
    features: [
      "International Trade",
      "CSR Complains",
      "FEMA Complaines",
      "Business Consulting"
    ],
    stat: "₹5B+ Funding Advisory"
  }
];

const steps = [
  { n: "01", title: "Discovery Call", desc: "30-min call to understand your business, goals, and pain points." },
  { n: "02", title: "Proposal", desc: "A tailored scope of work with fixed, transparent pricing — no surprises." },
  { n: "03", title: "Onboarding", desc: "Secure document handover and a dedicated senior partner assigned." },
  { n: "04", title: "Execution", desc: "Precision work delivered on schedule with real-time updates." },
  { n: "05", title: "Ongoing Support", desc: "Quarterly reviews that evolve your strategy as your business grows." },
];


export default function ServicesPage() {
  const [, navigate] = useLocation();
  const heroRef = useRef<HTMLDivElement>(null);


  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgParallax = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
  const textY = useTransform(heroScroll, [0, 1], [0, 60]);
  const textOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // ─── 3D Process scroll animations ───
  const processContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: processScroll } = useScroll({
    target: processContainerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = processScroll.on("change", (latest) => {
      if (latest < 0.15) {
        setActiveIndex(0);
      } else if (latest < 0.35) {
        setActiveIndex(1);
      } else if (latest < 0.55) {
        setActiveIndex(2);
      } else if (latest < 0.75) {
        setActiveIndex(3);
      } else {
        setActiveIndex(4);
      }
    });
    return () => unsubscribe();
  }, [processScroll]);

  // Smooth progress bar scale calculation
  const activeProgressScaleY = useTransform(processScroll, [0, 0.85], ["0%", "100%"]);

  // Set up transforms for each card
  // Card 0 (i = 0)
  const y0 = useTransform(processScroll, [0, 0.15, 0.35, 0.55], [0, 0, -45, -80]);
  const scale0 = useTransform(processScroll, [0, 0.15, 0.35, 0.55], [1, 1, 0.95, 0.92]);
  const rotateX0 = useTransform(processScroll, [0, 0.15, 0.35, 0.55], [0, 0, -10, -15]);
  const translateZ0 = useTransform(processScroll, [0, 0.15, 0.35, 0.55], [0, 0, -60, -120]);
  const opacity0 = useTransform(processScroll, [0, 0.15, 0.35, 0.55], [1, 1, 0.6, 0.35]);

  // Card 1 (i = 1)
  const y1 = useTransform(processScroll, [0, 0.15, 0.35, 0.55, 0.75], [300, 0, 0, -45, -80]);
  const scale1 = useTransform(processScroll, [0, 0.15, 0.35, 0.55, 0.75], [0.85, 1, 1, 0.95, 0.92]);
  const rotateX1 = useTransform(processScroll, [0, 0.15, 0.35, 0.55, 0.75], [30, 0, 0, -10, -15]);
  const translateZ1 = useTransform(processScroll, [0, 0.15, 0.35, 0.55, 0.75], [-150, 0, 0, -60, -120]);
  const opacity1 = useTransform(processScroll, [0, 0.15, 0.35, 0.55, 0.75], [0, 1, 1, 0.6, 0.35]);

  // Card 2 (i = 2)
  const y2 = useTransform(processScroll, [0.15, 0.35, 0.55, 0.75, 0.95], [300, 0, 0, -45, -80]);
  const scale2 = useTransform(processScroll, [0.15, 0.35, 0.55, 0.75, 0.95], [0.85, 1, 1, 0.95, 0.92]);
  const rotateX2 = useTransform(processScroll, [0.15, 0.35, 0.55, 0.75, 0.95], [30, 0, 0, -10, -15]);
  const translateZ2 = useTransform(processScroll, [0.15, 0.35, 0.55, 0.75, 0.95], [-150, 0, 0, -60, -120]);
  const opacity2 = useTransform(processScroll, [0.15, 0.35, 0.55, 0.75, 0.95], [0, 1, 1, 0.6, 0.35]);

  // Card 3 (i = 3)
  const y3 = useTransform(processScroll, [0.35, 0.55, 0.75, 0.95, 1.0], [300, 0, 0, -45, -45]);
  const scale3 = useTransform(processScroll, [0.35, 0.55, 0.75, 0.95, 1.0], [0.85, 1, 1, 0.95, 0.95]);
  const rotateX3 = useTransform(processScroll, [0.35, 0.55, 0.75, 0.95, 1.0], [30, 0, 0, -10, -10]);
  const translateZ3 = useTransform(processScroll, [0.35, 0.55, 0.75, 0.95, 1.0], [-150, 0, 0, -60, -60]);
  const opacity3 = useTransform(processScroll, [0.35, 0.55, 0.75, 0.95, 1.0], [0, 1, 1, 0.6, 0.6]);

  // Card 4 (i = 4)
  const y4 = useTransform(processScroll, [0.55, 0.75, 0.95, 1.0], [300, 0, 0, 0]);
  const scale4 = useTransform(processScroll, [0.55, 0.75, 0.95, 1.0], [0.85, 1, 1, 1]);
  const rotateX4 = useTransform(processScroll, [0.55, 0.75, 0.95, 1.0], [30, 0, 0, 0]);
  const translateZ4 = useTransform(processScroll, [0.55, 0.75, 0.95, 1.0], [-150, 0, 0, 0]);
  const opacity4 = useTransform(processScroll, [0.55, 0.75, 0.95, 1.0], [0, 1, 1, 1]);

  const cardTransforms = [
    { y: y0, scale: scale0, rotateX: rotateX0, translateZ: translateZ0, opacity: opacity0 },
    { y: y1, scale: scale1, rotateX: rotateX1, translateZ: translateZ1, opacity: opacity1 },
    { y: y2, scale: scale2, rotateX: rotateX2, translateZ: translateZ2, opacity: opacity2 },
    { y: y3, scale: scale3, rotateX: rotateX3, translateZ: translateZ3, opacity: opacity3 },
    { y: y4, scale: scale4, rotateX: rotateX4, translateZ: translateZ4, opacity: opacity4 },
  ];

  const scrollToStep = (idx: number) => {
    if (!processContainerRef.current) return;
    const rect = processContainerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const start = rect.top + scrollTop;
    const totalHeight = processContainerRef.current.scrollHeight;
    const viewportHeight = window.innerHeight;
    
    // Map index to progress values
    const progressValues = [0, 0.25, 0.45, 0.65, 0.85];
    const targetProgress = progressValues[idx];
    
    const targetScroll = start + (totalHeight - viewportHeight) * targetProgress;
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  // ─── Services scroll-driven index ───
  const servicesContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: servicesScroll } = useScroll({
    target: servicesContainerRef,
    offset: ["start start", "end end"]
  });

  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const unsubscribe = servicesScroll.on("change", (latest) => {
      const idx = Math.min(5, Math.floor(latest * 6));
      setActiveServiceIndex(prev => {
        if (idx !== prev) {
          setDirection(idx > prev ? 1 : -1);
        }
        return idx;
      });
    });
    return () => unsubscribe();
  }, [servicesScroll]);

  const scrollToService = (idx: number) => {
    if (!servicesContainerRef.current) return;
    const rect = servicesContainerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const start = rect.top + scrollTop;
    const totalHeight = servicesContainerRef.current.scrollHeight;
    const viewportHeight = window.innerHeight;

    const targetProgress = idx / 5.5;
    const targetScroll = start + (totalHeight - viewportHeight) * targetProgress;
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const idx = services.findIndex(s => s.id === hash);
        if (idx !== -1) {
          // Small timeout to allow component mounting and layout stabilization
          setTimeout(() => {
            scrollToService(idx);
          }, 150);
        }
      }
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <main className="min-h-screen bg-background font-sans text-foreground">
      <Helmet>
        <title>Our Services | The Maxworth Global</title>
        <link rel="canonical" href="https://www.themaxworthglobal.com/services" />
      </Helmet>
      <Navbar />

      {/* ─── HERO: Full-bleed split with image ───────────────────── */}
      <div ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
        {/* Right image half */}
        <motion.div
          style={{ y: imgParallax }}
          className="absolute inset-y-0 right-0 w-full md:w-[55%]"
        >
          <img
            src={img11}
            alt="CA firm services"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.75) contrast(1.05)" }}
          />
          {/* Overlay gradients */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to right, hsl(36 33% 97%) 0%, hsl(36 33% 97% / 0.5) 35%, transparent 65%)",
          }} />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, hsl(36 33% 97%) 0%, transparent 25%)",
          }} />
        </motion.div>

        {/* Left text content */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-10"
        >
          <div className="max-w-xl pt-20">
            <motion.button
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-semibold text-muted-foreground hover:text-primary transition-colors mb-12"
            >
              ← Back to Home
            </motion.button>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[11px] uppercase tracking-[0.26em] font-semibold mb-6"
              style={{ color: "hsl(38 88% 46%)" }}
            >
              What We Do
            </motion.p>

            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="font-serif font-bold text-foreground leading-[1.04]"
                style={{ fontSize: "clamp(2.8rem, 5.5vw, 5.2rem)" }}
              >
                Financial
                <br />
                <span style={{
                  background: "linear-gradient(135deg, hsl(38 88% 40%), hsl(38 88% 58%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  expertise
                </span>
                <br />
                you can trust.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-base text-muted-foreground font-light leading-[1.85] mb-10"
            >
              Six pillars of service, 25 years of expertise, one dedicated senior partner handling your account personally.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-8 mb-12"
            >
              {[["6", "Services"], ["25+", "Years"], ["500+", "Clients"], ["98%", "Retention"]].map(([v, l]) => (
                <div key={l}>
                  <p className="font-serif font-bold text-2xl text-primary">{v}</p>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">{l}</p>
                </div>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              whileHover={{ x: 4 }}
              onClick={() => document.querySelector("#services-list")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.16em] text-primary"
            >
              Explore All Services
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.button>
          </div>
        </motion.div>

        {/* Gold bottom accent bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 right-0 h-[3px] origin-left"
          style={{ background: "linear-gradient(90deg, hsl(38 88% 44%), hsl(38 88% 62%), transparent 75%)" }}
        />
      </div>

      {/* ─── SERVICES: Scroll-Reveal Split Panel ───────────────────── */}
      <section
        ref={servicesContainerRef}
        id="services-list"
        className="relative z-20"
        style={{ background: "hsl(222 55% 4%)", height: "600vh" }}
      >
        <div className="absolute inset-0" style={{ background: "hsl(222 55% 4%)" }} />

        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: "hsl(222 55% 4%)" }}>

          {/* Ambient glow — moves with active service color */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-700"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 70% 50%, ${services[activeServiceIndex]?.color}18 0%, transparent 70%)`,
            }}
          />

          {/* Subtle grid lines */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* ─── Main two-column layout ─── */}
          <div className="h-full max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* LEFT: Content panel */}
            <div className="flex flex-col justify-center pr-0 lg:pr-16 py-20 relative">

              {/* Top label */}
              <div className="flex items-center gap-3 mb-10">
                <span className="text-[10px] uppercase tracking-[0.28em] font-bold" style={{ color: "hsl(38 88% 55%)" }}>Our Services</span>
                <span className="flex-1 h-px bg-white/10" />
                <span className="font-mono text-[10px] text-white/30">{String(activeServiceIndex + 1).padStart(2,"0")} / {String(services.length).padStart(2,"0")}</span>
              </div>

              {/* Animated content with AnimatePresence */}
              <div className="relative overflow-hidden" style={{ minHeight: 340 }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeServiceIndex}
                    initial={{ opacity: 0, y: direction > 0 ? 40 : -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: direction > 0 ? -40 : 40 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute inset-0 flex flex-col justify-start"
                  >
                    {/* Service tagline badge */}
                    <span
                      className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-6 w-fit"
                      style={{ color: services[activeServiceIndex]?.color, background: `${services[activeServiceIndex]?.color}15`, border: `1px solid ${services[activeServiceIndex]?.color}30` }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: services[activeServiceIndex]?.color }} />
                      {services[activeServiceIndex]?.tagline}
                    </span>

                    {/* Big service number */}
                    <span className="font-serif font-black text-8xl md:text-9xl leading-none select-none mb-2"
                      style={{ color: `${services[activeServiceIndex]?.color}18`, WebkitTextStroke: `1px ${services[activeServiceIndex]?.color}30` }}
                    >
                      {services[activeServiceIndex]?.num}
                    </span>

                    {/* Title */}
                    <h2 className="font-serif font-bold text-3xl md:text-4xl text-white leading-tight mb-4">
                      {services[activeServiceIndex]?.title}
                    </h2>

                    {/* Description */}
                    <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
                      {services[activeServiceIndex]?.description}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t flex-wrap" style={{ borderColor: `${services[activeServiceIndex]?.color}20` }}>
                      <div>
                        <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 block mb-0.5">Key Metric</span>
                        <span className="font-serif font-black text-xl text-white">{services[activeServiceIndex]?.stat}</span>
                      </div>
                      <div className="ml-auto flex gap-2">
                        <button
                          onClick={() => navigate(`/services/${services[activeServiceIndex]?.id}/${services[activeServiceIndex]?.id === "startup" ? "pvt-ltd" : services[activeServiceIndex]?.id === "licence" ? "iec" : services[activeServiceIndex]?.id === "roc" ? "share-valuation" : services[activeServiceIndex]?.id === "tax-payroll" ? "gst" : services[activeServiceIndex]?.id === "misc-reg" ? "section-8" : "international-trade"}`)}
                          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] px-4 py-2.5 rounded-lg border transition-all duration-300 hover:scale-105"
                          style={{ borderColor: services[activeServiceIndex]?.color, color: services[activeServiceIndex]?.color, background: `${services[activeServiceIndex]?.color}10` }}
                        >
                          View <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => document.getElementById("contact-cta")?.scrollIntoView({ behavior: "smooth" })}
                          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] px-4 py-2.5 rounded-lg bg-white/8 text-white/60 border border-white/10 hover:text-white transition-all duration-300"
                        >
                          Enquire
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Step dots navigation */}
              <div className="flex items-center gap-3 mt-10">
                {services.map((svc, idx) => (
                  <button
                    key={svc.id}
                    onClick={() => scrollToService(idx)}
                    className="rounded-full transition-all duration-400 outline-none"
                    style={{
                      width: activeServiceIndex === idx ? 28 : 8,
                      height: 8,
                      background: activeServiceIndex === idx ? svc.color : "rgba(255,255,255,0.15)",
                      boxShadow: activeServiceIndex === idx ? `0 0 12px ${svc.color}60` : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT: Card display */}
            <div className="hidden lg:flex flex-col justify-center pl-8 relative">

              {/* Features card with AnimatePresence */}
              <div className="relative" style={{ height: 480 }}>
                <AnimatePresence mode="wait" initial={false}>
                  {(() => {
                    const svc = services[activeServiceIndex];
                    const Icon = svc.icon;
                    return (
                      <motion.div
                        key={activeServiceIndex}
                        initial={{ opacity: 0, x: direction > 0 ? 60 : -60, rotate: direction > 0 ? 3 : -3 }}
                        animate={{ opacity: 1, x: 0, rotate: 0 }}
                        exit={{ opacity: 0, x: direction > 0 ? -60 : 60, rotate: direction > 0 ? -3 : 3 }}
                        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute inset-0 rounded-2xl overflow-hidden"
                        style={{ willChange: "transform, opacity" }}
                      >
                        {/* Card background */}
                        <div
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            background: `linear-gradient(135deg, hsl(222 55% 8%) 0%, hsl(222 55% 12%) 100%)`,
                            border: `1px solid ${svc.color}30`,
                            boxShadow: `0 32px 64px -16px ${svc.color}20, inset 0 1px 0 rgba(255,255,255,0.06)`,
                          }}
                        />

                        {/* Diagonal color stripe accent */}
                        <div
                          className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                          style={{
                            background: `linear-gradient(225deg, ${svc.color}20 0%, transparent 60%)`,
                            borderRadius: "0 16px 0 0",
                          }}
                        />

                        {/* Card inner content */}
                        <div className="relative h-full p-8 flex flex-col">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-8">
                            <div>
                              <span className="font-mono text-[9px] text-white/25 tracking-[0.2em] block mb-1">SERVICE MODULE</span>
                              <span className="font-serif font-black text-4xl" style={{ color: `${svc.color}40` }}>{svc.num}</span>
                            </div>
                            <div
                              className="w-14 h-14 rounded-2xl flex items-center justify-center"
                              style={{ background: `${svc.color}15`, border: `1px solid ${svc.color}40` }}
                            >
                              <Icon className="w-6 h-6" style={{ color: svc.color }} />
                            </div>
                          </div>

                          {/* Features list */}
                          <div className="flex-1">
                            <span className="text-[9px] uppercase tracking-[0.22em] font-bold block mb-4 pb-2 border-b" style={{ color: svc.color, borderColor: `${svc.color}20` }}>
                              What's Included
                            </span>
                            <ul className="space-y-3">
                              {svc.features.map((feat, fIdx) => (
                                <motion.li
                                  key={fIdx}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: fIdx * 0.06, duration: 0.3 }}
                                  className="flex items-start gap-3"
                                >
                                  <span
                                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                                    style={{ background: svc.color }}
                                  />
                                  <span className="text-sm text-white/70 font-light leading-snug">{feat}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          {/* Footer */}
                          <div className="mt-6 pt-5 border-t flex items-center gap-2" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: svc.color }} />
                            <span className="text-[9px] uppercase tracking-[0.2em] text-white/35 font-semibold">Maxworth Global — {svc.title}</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Bottom progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
            <motion.div
              className="h-full origin-left"
              style={{
                scaleX: servicesScroll,
                background: `linear-gradient(90deg, ${services[0].color}, ${services[2].color}, ${services[5].color})`,
              }}
            />
          </div>

        </div>
      </section>


      {/* ─── PROCESS: 3D Scroll Stacking Cards ───────────────────── */}
      <section
        ref={processContainerRef}
        className="relative z-20"
        style={{ background: "hsl(36 25% 96%)", height: "300vh" }}
      >
        {/* Full-height background fill — ensures no white gaps */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "hsl(36 25% 96%)" }}
        />
        {/* Dot grid overlay */}
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

        {/* Sticky viewport wrapper */}
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden pt-20 lg:pt-24"
          style={{ background: "hsl(36 25% 96%)" }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left column: Info & Timeline progress */}
            <div className="lg:col-span-5 flex flex-col justify-center h-full">
              <div className="max-w-md">
                <span className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4 block text-gold" style={{ color: "hsl(38 88% 46%)" }}>
                  Our Process
                </span>
                <h2 className="font-serif font-bold text-3xl md:text-5xl text-foreground leading-[1.1] mb-6">
                  Simple steps.<br />Exceptional outcomes.
                </h2>
                <p className="text-sm md:text-base text-muted-foreground font-light leading-[1.8] mb-8 md:mb-12">
                  Our structured approach ensures maximum efficiency, complete compliance, and seamless collaboration at every stage.
                </p>
              </div>

              {/* Vertical Step Progress Line */}
              <div className="hidden lg:flex flex-col relative pl-4 border-l border-border/60 ml-2 py-2 gap-6">
                {/* Animated active progress bar line overlay */}
                <motion.div
                  className="absolute left-[-1px] top-0 w-[2px] origin-top"
                  style={{
                    height: "100%",
                    scaleY: activeProgressScaleY,
                    background: "hsl(38 88% 48%)",
                  }}
                />

                {steps.map((step, idx) => {
                  const isActive = activeIndex === idx;
                  const isDone = activeIndex > idx;
                  return (
                    <button
                      key={step.n}
                      onClick={() => scrollToStep(idx)}
                      className="flex items-center gap-4 text-left group transition-all duration-300 outline-none"
                    >
                      {/* Step Indicator Dot/Bubble */}
                      <div className="relative shrink-0 z-10">
                        <div
                          className={`w-8 h-8 rounded-full border flex items-center justify-center font-serif text-xs font-bold transition-all duration-300 ${
                            isActive
                              ? "bg-gold text-white scale-110"
                              : isDone
                                ? "text-white"
                                : "bg-background text-muted-foreground group-hover:border-gold group-hover:text-gold"
                          }`}
                          style={{
                            borderColor: isActive || isDone ? "hsl(38 88% 48%)" : "hsl(var(--border))",
                            backgroundColor: isActive ? "hsl(38 88% 48%)" : isDone ? "hsl(var(--primary))" : "",
                            boxShadow: isActive ? "0 0 16px hsl(38 88% 48% / 0.4)" : "",
                          }}
                        >
                          {step.n}
                        </div>
                      </div>

                      {/* Text */}
                      <div className="transition-all duration-300">
                        <h4 className={`text-[13px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                          isActive ? "text-primary font-extrabold" : "text-muted-foreground group-hover:text-foreground"
                        }`}
                        style={{ color: isActive ? "hsl(var(--primary))" : "" }}
                        >
                          {step.title}
                        </h4>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Horizontal steps on mobile/tablet */}
              <div className="lg:hidden flex justify-between items-center gap-2 mt-4 px-2 py-4 bg-secondary/30 rounded-xl border border-border/40" style={{ backgroundColor: "hsl(var(--secondary) / 0.3)" }}>
                {steps.map((step, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={step.n}
                      onClick={() => scrollToStep(idx)}
                      className="flex flex-col items-center gap-1.5 flex-1 py-1 transition-all duration-300 outline-none"
                    >
                      <div
                        className={`w-7 h-7 rounded-full border flex items-center justify-center font-serif text-[10px] font-bold transition-all duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-muted-foreground"
                        }`}
                        style={{
                          borderColor: isActive ? "hsl(38 88% 48%)" : "hsl(var(--border))",
                          backgroundColor: isActive ? "hsl(38 88% 48%)" : "",
                          boxShadow: isActive ? "0 0 12px hsl(38 88% 48% / 0.4)" : "",
                        }}
                      >
                        {step.n}
                      </div>
                      <span className="text-[9px] uppercase tracking-wider font-semibold transition-colors duration-300"
                        style={{ color: isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
                      >
                        {step.title.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right column: 3D stacked cards */}
            <div className="lg:col-span-7 flex justify-center items-center relative h-[360px] md:h-[400px] w-full" style={{ perspective: 1200, transformStyle: "preserve-3d" }}>
              {steps.map((step, i) => {
                // Card scroll transforms
                const { y, scale, rotateX, translateZ, opacity } = cardTransforms[i];

                return (
                  <motion.div
                    key={step.n}
                    style={{
                      y,
                      scale,
                      rotateX,
                      z: translateZ,
                      zIndex: i + 10,
                      opacity,
                      transformStyle: "preserve-3d",
                      background: "linear-gradient(135deg, hsl(222 55% 14%), hsl(222 55% 24%))",
                      borderColor: "rgba(255, 255, 255, 0.08)",
                      boxShadow: "0 24px 48px -12px rgba(15,27,58,0.3)",
                    }}
                    className="absolute w-full max-w-[460px] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl flex flex-col justify-between h-[300px] md:h-[340px]"
                  >
                    <div className="absolute inset-0 dot-grid opacity-[0.04] pointer-events-none rounded-2xl" />
                    <div className="absolute top-0 right-0 w-24 h-24 stripe-bg opacity-[0.06] pointer-events-none rounded-tr-2xl" />

                    {/* Card Header */}
                    <div className="flex justify-between items-start">
                      <span className="font-serif font-bold text-5xl md:text-6xl tracking-wider select-none" style={{ color: "rgba(196, 141, 30, 0.15)" }}>
                        {step.n}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center" style={{ backgroundColor: "rgba(196, 141, 30, 0.1)", borderColor: "rgba(196, 141, 30, 0.3)" }}>
                        <span className="w-2 h-2 rounded-full bg-gold animate-pulse-gold" style={{ backgroundColor: "hsl(38 88% 48%)" }} />
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="my-auto">
                      <h3 className="font-serif font-bold text-2xl md:text-3xl text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/5 select-none" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" style={{ backgroundColor: "hsl(38 88% 48%)" }} />
                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">
                        The Maxworth Global • Process
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────── */}
      <section id="contact-cta" className="relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img src={img11} alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.25) saturate(0.6)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(222 55% 14% / 0.95), hsl(222 55% 8% / 0.98))" }} />
        </div>

        <div className="relative z-10 py-32 max-w-5xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-5"
                style={{ color: "hsl(38 88% 55%)" }}
              >
                Get Started Today
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-serif font-bold text-4xl md:text-5xl text-white leading-[1.08] mb-6"
              >
                Let's talk about your business.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/55 font-light leading-[1.85]"
              >
                Book a free 30-minute discovery call. No jargon, no commitment — just an honest conversation.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="flex flex-col gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/#contact")}
                className="group flex items-center justify-between h-16 px-8 font-bold uppercase tracking-[0.14em] text-[12px] text-primary relative overflow-hidden"
                style={{ background: "hsl(38 88% 48%)" }}
              >
                <span className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400 bg-white/12" />
                <span className="relative">Schedule Free Call</span>
                <ArrowUpRight className="relative w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>

              <a
                href="tel:+011-49847956"
                className="flex items-center gap-3 h-16 px-8 font-medium text-sm text-white/70 hover:text-white transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <Phone className="w-4 h-4 shrink-0" style={{ color: "hsl(38 88% 55%)" }} />
                +011-49847956
              </a>

              <a
                href="mailto:maxworthglobal@zohomail.in"
                className="flex items-center gap-3 h-16 px-8 font-medium text-sm text-white/70 hover:text-white transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <Mail className="w-4 h-4 shrink-0" style={{ color: "hsl(38 88% 55%)" }} />
                maxworthglobal@zohomail.in
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
