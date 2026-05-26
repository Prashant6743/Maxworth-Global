import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Users, Award, ShieldCheck, Compass,
  ArrowUpRight, Linkedin, Mail, ChevronRight
} from "lucide-react";


// Stock images (partners)
import imgPartner1 from "@/Stock_img/13.png";
import imgPartner2 from "@/Stock_img/10.png";

// Generated hero collage images
import imgOffice from "@/assets/about_office.png";
import imgDesk   from "@/assets/about_desk.png";
import imgSeal   from "@/assets/about_seal.png";

// Core Values data
const values = [
  {
    icon: ShieldCheck,
    title: "Uncompromising Integrity",
    desc: "Ethical standards are not a checkbox; they are the bedrock of our practice. We maintain complete independence and transparency in every report and advice.",
    color: "hsl(38 88% 46%)" // Gold
  },
  {
    icon: Compass,
    title: "Strategic Foresight",
    desc: "We look beyond current tax codes to anticipate regulatory shifts. Our clients receive proactive structuring advice before new rules even take effect.",
    color: "hsl(210 70% 42%)" // Blue
  },
  {
    icon: Award,
    title: "Absolute Precision",
    desc: "In accounting, a single decimal point matters. We pride ourselves on rigorous checking systems, resulting in clean audits and compliant filings.",
    color: "hsl(155 55% 35%)" // Green
  },
  {
    icon: Users,
    title: "Client-Centric Synergy",
    desc: "We align deeply with your business objectives. You get direct access to senior partners who act as strategic sounding boards for your growth.",
    color: "hsl(280 50% 42%)" // Purple
  }
];

// Timeline milestones data
const milestones = [
  {
    year: "Foundation",
    title: "The Genesis",
    desc: "Founded in Delhi with a vision to provide expert financial guidance to startups and SMEs, focusing on taxation, compliance, and advisory services.",
    tag: "Foundation"
  },
  {
    year: "Early Years",
    title: "Audit & Assurance Wing",
    desc: "Launched full-scale statutory and tax audit practice, securing regulatory compliance registrations and growing our client base across diverse industries.",
    tag: "Expansion"
  },
  {
    year: "Growth Phase",
    title: "PAN India Presence",
    desc: "Expanded operations to serve clients across the length and breadth of India, establishing ourselves as a trusted partner for businesses of all sizes.",
    tag: "Scale"
  },
  {
    year: "Digital Era",
    title: "Cloud & Digital Leap",
    desc: "Pioneered the transition to cloud-based accounting systems, providing clients with real-time financial tracking and digital-first compliance workflows.",
    tag: "Tech Integration"
  },
  {
    year: "Present Day",
    title: "Empowering Modern Enterprises",
    desc: "Servicing 500+ active clients including high-growth startups, SMEs, and established enterprises with comprehensive financial and compliance solutions across India.",
    tag: "Market Leaders"
  }
];

// Partners team data
const team = [
  {
    name: "CA Sachin Rana",
    role: "Founder",
    credentials: "CA · LLB · M.Com (Finance & Taxation)",
    bio: "CA Sachin Rana is the Founder of Maxworth Global Consultants LLP and brings a rare blend of financial, legal, and taxation expertise. A qualified Chartered Accountant (CA), Law Graduate (LLB), and Master of Commerce in Finance and Taxation (M.Com), he possesses a multi-disciplinary foundation that allows him to address complex business challenges from every angle. With over 15 years of hands-on experience, he has advised a diverse clientele — from individual taxpayers and startups to large enterprises — across direct and indirect taxation, financial structuring, business compliance, and legal advisory.",
    quote: "Precision is our craft; trust is our currency.",
    image: imgPartner1,
    linkedin: "#",
    email: "maxworthglobal@zohomail.in"
  },
  {
    name: "CA Satish Bhardwaj",
    role: "Partner & Co-Founder",
    credentials: "CA (ICAI)",
    bio: "CA Satish Bhardwaj is the Partner and Co-Founder of Maxworth Global Consultants LLP, with over 15 years of distinguished experience in audit, statutory compliance, and corporate financial management. A qualified Chartered Accountant from the Institute of Chartered Accountants of India (ICAI), he brings a detail-oriented approach and deep regulatory knowledge that has helped countless businesses maintain seamless compliance. Known for his client-centric approach and proactive advisory style, CA Satish Bhardwaj plays a pivotal role in steering the firm's operations and ensuring that every client receives timely, accurate, and reliable financial guidance.",
    quote: "We don't just file the past; we shape your financial future.",
    image: imgPartner2,
    linkedin: "#",
    email: "maxworthglobal@zohomail.in"
  }
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Mouse parallax for collage
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const springX = useSpring(mouse.x, { stiffness: 45, damping: 18 });
  const springY = useSpring(mouse.y, { stiffness: 45, damping: 18 });
  
  // Parallax hook for Hero
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY       = useTransform(heroScroll, [0, 1], [0, 80]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  // ── Scroll-driven 3D transforms for each collage image layer ──
  // Primary image: tilts back + rises as you scroll
  const imgPrimaryRotateX = useTransform(heroScroll, [0, 0.6], [0,  14]);
  const imgPrimaryRotateY = useTransform(heroScroll, [0, 0.6], [0,  -6]);
  const imgPrimaryScale   = useTransform(heroScroll, [0, 0.6], [1,  0.88]);
  const imgPrimaryY       = useTransform(heroScroll, [0, 0.6], [0, -50]);
  const imgPrimaryOpacity = useTransform(heroScroll, [0, 0.55], [1,  0]);

  // Desk overlay: slides down + rotates opposite direction
  const imgDeskRotateX  = useTransform(heroScroll, [0, 0.6], [0, -10]);
  const imgDeskRotateY  = useTransform(heroScroll, [0, 0.6], [0,   8]);
  const imgDeskScale    = useTransform(heroScroll, [0, 0.6], [1,  0.82]);
  const imgDeskY        = useTransform(heroScroll, [0, 0.6], [0,  60]);
  const imgDeskOpacity  = useTransform(heroScroll, [0, 0.5], [1,   0]);

  // Seal accent: fastest layer — floats away up and right
  const imgSealRotateX  = useTransform(heroScroll, [0, 0.6], [0,  -18]);
  const imgSealRotateY  = useTransform(heroScroll, [0, 0.6], [0,   12]);
  const imgSealScale    = useTransform(heroScroll, [0, 0.6], [1,   0.75]);
  const imgSealY        = useTransform(heroScroll, [0, 0.6], [0,  -80]);
  const imgSealOpacity  = useTransform(heroScroll, [0, 0.4], [1,    0]);

  // Stat badges: fade + drift with scroll
  const badgeY1         = useTransform(heroScroll, [0, 0.5], [0,  30]);
  const badgeY2         = useTransform(heroScroll, [0, 0.5], [0,  50]);
  const badgeOpacity    = useTransform(heroScroll, [0, 0.4], [1,   0]);

  // Scroll to top on load + mouse parallax
  useEffect(() => {
    window.scrollTo(0, 0);
    const h = (e: MouseEvent) =>
      setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 14 });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  // Mouse Move 3D effect handler for custom 3D hover cards
  const handleMouseMove3D = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Relative coordinates
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Centers
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Distances
    const dx = x - xc;
    const dy = y - yc;
    
    // Rotations (max 10 degrees)
    const rotateX = -(dy / yc) * 10;
    const rotateY = (dx / xc) * 10;
    
    // Spotlight follow coordinates
    const spotlightX = (x / rect.width) * 100;
    const spotlightY = (y / rect.height) * 100;
    
    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
    card.style.setProperty("--mx", `${spotlightX}%`);
    card.style.setProperty("--my", `${spotlightY}%`);
  };

  const handleMouseLeave3D = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      <Navbar />

      {/* ─── HERO SECTION WITH 3D PARALLAX DECK (LITE THEME) ───────────────────── */}
      <section 
        ref={heroRef}
        className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-background"
      >
        {/* Animated gradient mesh blobs (Lite theme) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Primary blob — blue-navy tint */}
          <motion.div
            className="absolute -top-[20%] -left-[15%] w-[65%] h-[65%] rounded-full animate-blob-1"
            style={{
              background: "radial-gradient(circle at 40% 40%, hsl(222 55% 85% / 0.55), hsl(210 60% 90% / 0.3) 60%, transparent)",
              filter: "blur(80px)",
            }}
          />
          {/* Gold-warm blob */}
          <motion.div
            className="absolute -bottom-[15%] -right-[10%] w-[60%] h-[60%] rounded-full animate-blob-2"
            style={{
              background: "radial-gradient(circle at 60% 60%, hsl(38 88% 92% / 0.7), hsl(36 60% 88% / 0.4) 60%, transparent)",
              filter: "blur(80px)",
            }}
          />
          {/* Subtle center glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[40%] opacity-[0.25]"
            style={{
              background: "radial-gradient(ellipse, hsl(38 88% 48% / 0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          {/* Dot-grid overlay */}
          <div className="absolute inset-0 dot-grid opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-10 xl:gap-16 items-center">

            {/* ── LEFT: Text (5 cols) ── */}
            <motion.div
              style={{ y: heroY, opacity: heroOpacity }}
              className="lg:col-span-5 text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border/70 shadow-sm mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">About Maxworth Global</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif font-bold text-4xl sm:text-5xl lg:text-[3.5rem] text-primary leading-[1.08] mb-6"
              >
                Architects of financial{" "}
                <span className="italic" style={{ background: "linear-gradient(120deg, hsl(38 88% 38%), hsl(38 88% 58%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>trust</span>,{" "}
                custodians of <span className="italic">growth</span>.
              </motion.h1>

              {/* Gold rule */}
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-14 h-[2px] mb-6 origin-left"
                style={{ background: "linear-gradient(90deg, hsl(38 88% 46%), hsl(38 88% 62%))" }}
              />

              <motion.p
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.28 }}
                className="text-muted-foreground font-light leading-[1.82] mb-10 max-w-md"
                style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)" }}
              >
                For over 22 years, we have coupled strict compliance with forward-thinking financial intelligence — turning audit, tax, and advisory into the vital pillars that protect enterprise value and unlock scale.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.42 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => document.getElementById("philosophy")?.scrollIntoView({ behavior: "smooth" })}
                  className="group relative h-12 px-7 overflow-hidden font-bold uppercase tracking-[0.14em] text-[11px] flex items-center gap-2 bg-gold text-primary shadow-[0_4px_24px_rgba(217,143,33,0.22)] hover:shadow-[0_8px_32px_rgba(217,143,33,0.38)] transition-all rounded-sm duration-300 cursor-pointer"
                >
                  <span className="relative z-10">Our Philosophy</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" })}
                  className="group relative h-12 px-6 font-bold uppercase tracking-[0.14em] text-[11px] flex items-center gap-2 border border-border/80 hover:border-gold/50 text-foreground rounded-sm transition-all duration-300 cursor-pointer"
                >
                  <span>Our Journey</span>
                </button>
              </motion.div>

              {/* Small trust row */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}
                className="mt-10 pt-8 border-t border-border/40 flex flex-wrap gap-6"
              >
                {[
                  { icon: ShieldCheck, label: "Govt. Registered" },
                  { icon: Award,       label: "22+ Years" },
                  { icon: Users,       label: "500+ Clients" },
                ].map((b, i) => {
                  const Ic = b.icon;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <Ic className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{b.label}</span>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Editorial Image Collage (7 cols) ── */}
            <div className="lg:col-span-7 relative flex items-center justify-center min-h-[560px]">
              
              {/* ── EDITORIAL COLLAGE — 3D Scroll Scene ── */}
              <motion.div
                style={{ x: springX, y: springY }}
                className="relative w-full"
              >
                {/* 3D Perspective container — all children rendered in same 3D space */}
                <div style={{ perspective: "1100px", perspectiveOrigin: "50% 40%" }}>

                  {/* ── PRIMARY: Boardroom (bottom layer, tilts back on scroll) ── */}
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      rotateX:  imgPrimaryRotateX,
                      rotateY:  imgPrimaryRotateY,
                      scale:    imgPrimaryScale,
                      y:        imgPrimaryY,
                      opacity:  imgPrimaryOpacity,
                      height:   "400px",
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity",
                    }}
                    className="relative ml-8 rounded-2xl overflow-hidden shadow-[0_28px_80px_-14px_rgba(15,27,58,0.22)] border border-border/30"
                  >
                    <div style={{ height: "400px" }}>
                      <img
                        src={imgOffice}
                        alt="Maxworth Global Boardroom"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: "center 30%" }}
                      />
                    </div>
                    {/* Bottom gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent pointer-events-none" />
                    {/* Established badge — bottom left */}
                    <div className="absolute bottom-5 left-5 flex flex-col">
                      <span className="text-[9px] uppercase tracking-[0.22em] font-bold text-white/60 mb-0.5">Established</span>
                      <span className="font-serif font-bold text-white text-2xl italic leading-none">2002</span>
                    </div>
                  </motion.div>

                  {/* ── DESK: Mid layer — slides down + tilts opposite on scroll ── */}
                  <motion.div
                    initial={{ opacity: 0, x: -25, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.55, type: "spring", stiffness: 140, damping: 22 }}
                    style={{
                      rotateX:  imgDeskRotateX,
                      rotateY:  imgDeskRotateY,
                      scale:    imgDeskScale,
                      y:        imgDeskY,
                      opacity:  imgDeskOpacity,
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity",
                    }}
                    className="absolute bottom-0 left-0 w-[46%] rounded-xl overflow-hidden shadow-[0_20px_60px_-10px_rgba(15,27,58,0.28)] border-[3px] border-white"
                  >
                    <div style={{ transform: "translateY(28px)" }}>
                      <img
                        src={imgDesk}
                        alt="Financial analyst desk"
                        className="w-full h-[185px] object-cover"
                        style={{ objectPosition: "center" }}
                      />
                    </div>
                  </motion.div>

                  {/* ── SEAL: Top foreground layer — floats up fastest on scroll ── */}
                  <motion.div
                    initial={{ opacity: 0, x: 20, y: -15 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.85, delay: 0.75, type: "spring", stiffness: 150, damping: 20 }}
                    style={{
                      rotateX:  imgSealRotateX,
                      rotateY:  imgSealRotateY,
                      scale:    imgSealScale,
                      y:        imgSealY,
                      opacity:  imgSealOpacity,
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity",
                    }}
                    className="absolute -top-10 right-4 w-[30%] rounded-xl overflow-hidden shadow-[0_16px_50px_-8px_rgba(15,27,58,0.22)] border-[3px] border-white"
                  >
                    <img
                      src={imgSeal}
                      alt="Gold wax seal — authenticity"
                      className="w-full h-[130px] object-cover"
                      style={{ objectPosition: "center 60%" }}
                    />
                  </motion.div>

                </div>{/* end perspective container */}

                {/* ── Floating stat card 1 — right side ── */}
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.05, duration: 0.7, type: "spring", stiffness: 160, damping: 22 }}
                  style={{ y: badgeY1, opacity: badgeOpacity }}
                  className="absolute top-1/2 -right-6 -translate-y-1/2 glass px-5 py-3.5 shadow-xl border border-gold/30"
                >
                  <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-0.5">Portfolio Audited</p>
                  <p className="font-serif font-bold text-primary text-xl italic leading-none">₹50B+</p>
                </motion.div>

                {/* ── Floating stat card 2 — bottom center ── */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.7, type: "spring", stiffness: 160, damping: 22 }}
                  style={{ y: badgeY2, opacity: badgeOpacity, x: "-50%" }}
                  className="absolute -bottom-6 left-[46%] glass px-5 py-3.5 shadow-xl border border-border/50"
                >
                  <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-0.5">Retention Rate</p>
                  <p className="font-serif font-bold text-primary text-xl italic leading-none">99.8%</p>
                </motion.div>

                {/* ── Decorative gold diagonal rules ── */}
                <div
                  className="absolute top-[55%] right-[8%] w-[1px] h-28 pointer-events-none rotate-12 origin-top"
                  style={{ background: "linear-gradient(to bottom, transparent, hsl(38 88% 46% / 0.5), transparent)" }}
                />
                <div
                  className="absolute top-[55%] right-[11%] w-[1px] h-20 pointer-events-none rotate-12 origin-top"
                  style={{ background: "linear-gradient(to bottom, transparent, hsl(38 88% 46% / 0.25), transparent)" }}
                />

              </motion.div>
            </div>


          </div>
        </div>
      </section>

      {/* ─── STATS COUNT STRIP ────────────────────────────────────────────────── */}
      <section className="border-y border-white/5 bg-[#050814] relative z-20">
        {/* ── MARQUEE TICKER STRIP ─────────────────────────────── */}
        <div className="relative overflow-hidden border-b border-white/5 py-4">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #050814, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #050814, transparent)" }} />

          {/* Track — items doubled for seamless infinite loop */}
          <div
            className="flex items-center whitespace-nowrap"
            style={{ animation: "marquee-about 30s linear infinite" }}
          >
            {([
              { text: "Trusted Since 2002",     gold: false },
              { text: "Govt. Registered",         gold: true  },
              { text: "500+ Corporate Clients",  gold: false },
              { text: "₹50B+ Portfolio Audited", gold: true  },
              { text: "99.8% Client Retention",  gold: false },
              { text: "Audit & Virtual CFO",     gold: true  },
              { text: "Tax & Payroll Setup",     gold: false },
              { text: "Startup Setup",           gold: true  },
              { text: "ROC Compliance",          gold: false },
              { text: "Licencing & Certificates", gold: true  },
            ] as const).concat(([
              { text: "Trusted Since 2002",     gold: false },
              { text: "Govt. Registered",         gold: true  },
              { text: "500+ Corporate Clients",  gold: false },
              { text: "₹50B+ Portfolio Audited", gold: true  },
              { text: "99.8% Client Retention",  gold: false },
              { text: "Audit & Virtual CFO",     gold: true  },
              { text: "Tax & Payroll Setup",     gold: false },
              { text: "Startup Setup",           gold: true  },
              { text: "ROC Compliance",          gold: false },
              { text: "Licencing & Certificates", gold: true  },
            ] as const)).map((item, i) => (
              <span key={i} className="inline-flex items-center gap-5 mx-5 shrink-0">
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: item.gold ? "hsl(38 88% 54%)" : "rgba(255,255,255,0.42)" }}
                >
                  {item.text}
                </span>
                <span className="text-[8px]" style={{ color: "hsl(38 88% 40%)", opacity: 0.5 }}>◆</span>
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 items-center">
            
            {[
              { num: "22+", label: "Years of Trust", desc: "Since 2002 inception" },
              { num: "500+", label: "Corporate Clients", desc: "Startups, SMEs & Listed Co." },
              { num: "₹50B+", label: "Portfolio Audited", desc: "Robust financial oversight" },
              { num: "99.8%", label: "Client Retention", desc: "Partnership-led priority" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center flex flex-col items-center p-4 border-r border-white/5 last:border-r-0 max-md:border-r-0"
              >
                <span className="font-serif font-bold text-3xl md:text-4xl text-gold mb-2 block">{stat.num}</span>
                <span className="text-[12px] text-white font-medium tracking-wide uppercase mb-1">{stat.label}</span>
                <span className="text-[10px] text-white/40 font-light">{stat.desc}</span>
              </motion.div>
            ))}

          </div>
        </div>

        {/* Keyframe injected inline */}
        <style>{`
          @keyframes marquee-about {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>

      </section>


      {/* ─── SECTION: PHILOSOPHY (3D VALUES CARD GRID) ────────────────────────── */}
      <section 
        id="philosophy" 
        className="relative py-20 lg:py-32 bg-gradient-to-b from-[#04060f] to-[#0a0f25] overflow-hidden"
      >
        <div className="absolute inset-0 dot-grid opacity-[0.2] pointer-events-none" />
        <div className="absolute top-[30%] right-[5%] w-[350px] h-[350px] rounded-full bg-gold/5 blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          
          <div className="max-w-3xl mx-auto text-center mb-24">
            <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold mb-3">Our Core Philosophy</p>
            <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-[2.8rem] text-white leading-tight">
              Values that anchor us.<br />Intellect that propels us.
            </h2>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-6" />
          </div>

          {/* 3D Tilt Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  onMouseMove={handleMouseMove3D}
                  onMouseLeave={handleMouseLeave3D}
                  className="group relative bg-[#0c122b]/60 border border-white/5 p-8 rounded-lg cursor-default overflow-hidden preserve-3d"
                  style={{
                    transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale3d(1, 1, 1)",
                    transition: "transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s"
                  }}
                >
                  {/* Spotlight Background overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle 140px at var(--mx, 50%) var(--my, 50%), ${v.color}25, transparent)`
                    }}
                  />

                  {/* Border gradient trace on hover */}
                  <div className="absolute inset-[-1.5px] rounded-lg bg-gradient-to-br from-white/10 to-transparent group-hover:from-gold/30 z-0 transition-colors" />

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    
                    {/* Icon container */}
                    <div 
                      className="w-12 h-12 rounded-sm flex items-center justify-center mb-8 transition-transform duration-300 group-hover:scale-110"
                      style={{ 
                        background: `${v.color}18`, 
                        border: `1px solid ${v.color}35`
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: v.color }} />
                    </div>

                    <div>
                      <h3 className="font-serif font-bold text-white text-lg mb-4 group-hover:text-gold transition-colors">
                        {v.title}
                      </h3>
                      <p className="text-white/55 text-[13px] leading-[1.7] font-light">
                        {v.desc}
                      </p>
                    </div>

                    {/* Subtle numbering */}
                    <span className="text-[10px] font-mono tracking-widest text-white/10 group-hover:text-gold/20 transition-colors block mt-8 text-right">
                      // VALUE_0{i + 1}
                    </span>

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─── SECTION: TIMELINE (3D DOOR ENTRY STACK) ─────────────────────────── */}
      <section 
        id="timeline" 
        className="relative py-20 lg:py-32 bg-[#fcfbf9] text-[#0f1b3a] overflow-hidden"
      >
        {/* Subtle light dot grid overlay */}
        <div className="absolute inset-0 dot-grid opacity-[0.07] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          
          <div className="max-w-3xl mx-auto text-center mb-28">
            <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold mb-3">Our Chronicle</p>
            <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-[2.8rem] text-primary leading-tight">
              Two decades of client-centric evolution.
            </h2>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-6" />
          </div>

          <div className="relative">
            {/* Central Spine line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-primary/10 -translate-x-1/2" />
            
            {/* Scroll Progress tracker inside spine */}
            <div 
              className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 origin-top"
              style={{
                background: "linear-gradient(to bottom, hsl(38 88% 46%), hsl(38 88% 60%))",
                height: "100%"
              }}
            />

            <div className="space-y-16">
              {milestones.map((m, i) => {
                const isEven = i % 2 === 0;
                
                return (
                  <div 
                    key={i} 
                    className={`relative flex flex-col md:flex-row items-start ${
                      isEven ? "md:flex-row-reverse" : ""
                    } justify-between w-full`}
                  >
                    {/* Spine bullet */}
                    <div className="absolute left-[20px] md:left-1/2 top-7 w-3 h-3 rounded-full bg-[#fcfbf9] border-2 border-gold -translate-x-1/2 z-20" />

                    {/* Timeline card wrapper with 3D entry animation */}
                    <motion.div
                      initial={{ 
                        opacity: 0, 
                        x: isEven ? 40 : -40,
                        rotateY: isEven ? 18 : -18
                      }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0,
                        rotateY: 0
                      }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ 
                        type: "spring",
                        stiffness: 70,
                        damping: 18,
                        duration: 0.8
                      }}
                      className={`w-full md:w-[45%] pl-10 md:pl-0 relative`}
                      style={{
                        transformStyle: "preserve-3d"
                      }}
                    >
                      <div 
                        className="bg-white border border-[#0f1b3a]/5 p-7 sm:p-8 rounded-sm shadow-[0_8px_32px_rgba(15,27,58,0.04)]"
                        style={{
                          transform: "perspective(1000px)",
                          boxShadow: "0 16px 40px -12px rgba(15,27,58,0.06), 0 0 0 1px rgba(15,27,58,0.02)"
                        }}
                      >
                        {/* Year Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-serif font-bold text-2xl text-gold leading-none">{m.year}</span>
                          <span className="text-[9px] uppercase tracking-[0.16em] font-semibold text-primary/45 px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-sm">
                            {m.tag}
                          </span>
                        </div>

                        <h3 className="font-serif font-bold text-lg text-primary mb-3">
                          {m.title}
                        </h3>
                        
                        <p className="text-[#0f1b3a]/65 text-[13px] leading-[1.7] font-light">
                          {m.desc}
                        </p>
                      </div>
                    </motion.div>

                    {/* Spacer for large screens */}
                    <div className="hidden md:block w-[45%]" />

                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* ─── SECTION: TEAM/PARTNERS (3D TILT GRILL) ───────────────────────────── */}
      <section 
        id="leadership" 
        className="relative py-20 lg:py-32 bg-gradient-to-b from-[#0a0f25] to-[#070b19] overflow-hidden"
      >
        <div className="absolute inset-0 dot-grid opacity-[0.25] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[5%] w-[380px] h-[380px] rounded-full bg-[#1c2e5a]/20 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          
          <div className="max-w-3xl mx-auto text-center mb-24">
            <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold mb-3">Our Partners</p>
            <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-[2.8rem] text-white leading-tight">
              Led by seasoned expertise.
            </h2>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-6" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                onMouseMove={handleMouseMove3D}
                onMouseLeave={handleMouseLeave3D}
                className="group relative bg-[#0c122b]/85 border border-white/10 rounded-lg overflow-hidden preserve-3d"
                style={{
                  transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale3d(1, 1, 1)",
                  transition: "transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s",
                  boxShadow: "0 20px 48px -10px rgba(0,0,0,0.3)"
                }}
              >
                {/* Border glowing wrapper */}
                <div className="absolute inset-0 border border-white/5 rounded-lg pointer-events-none z-20 group-hover:border-gold/30 transition-colors" />

                {/* Team member portrait box */}
                <div className="relative h-[320px] overflow-hidden bg-slate-950">
                  {/* Portrait photo */}
                  <img 
                    src={partner.image} 
                    alt={partner.name} 
                    className="w-full h-full object-cover grayscale brightness-[0.9] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-[600ms] ease-out"
                  />
                  {/* Subtle dark gradient overlay over photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c122b] via-transparent to-transparent opacity-80" />
                  
                  {/* Name overlay */}
                  <div className="absolute bottom-5 left-6 right-6">
                    <p className="font-serif text-xl text-white font-bold tracking-wide">{partner.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-gold font-bold mt-1">{partner.credentials}</p>
                    <p className="text-[11px] text-white/50 font-light mt-0.5">{partner.role}</p>
                  </div>
                </div>

                {/* Sliding Info Tray (Slides Up on hover) */}
                <div className="p-6 bg-[#0c122b] relative z-10 border-t border-white/5">
                  {/* Partner Quote */}
                  <div className="relative pl-5 border-l-2 border-gold mb-5">
                    <p className="font-serif text-white/80 text-[12px] italic leading-relaxed">
                      "{partner.quote}"
                    </p>
                  </div>
                  
                  {/* Bio snippet */}
                  <p className="text-white/50 text-[11.5px] leading-relaxed font-light mb-6">
                    {partner.bio}
                  </p>

                  {/* Social and contacts HUD bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <a 
                      href={`mailto:${partner.email}`}
                      className="flex items-center gap-1.5 text-[10px] tracking-wider text-white/40 hover:text-gold uppercase font-bold transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email Partner</span>
                    </a>
                    
                    <a 
                      href={partner.linkedin}
                      className="w-7 h-7 rounded-full border border-white/5 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 hover:bg-gold/5 transition-all"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── INTERACTIVE CTA SECTION ──────────────────────────────────────────── */}
      <section className="relative py-20 lg:py-28 bg-[#04060f] overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.25] pointer-events-none" />
        {/* Glow behind panel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-gold/10 blur-[130px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-navy border-white/10 p-10 md:p-14 text-center rounded-sm relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, hsl(38 88% 46%), transparent)" }} />
            
            <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold mb-4">Partner-Led Solutions</p>
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-white mb-6 leading-tight max-w-2xl mx-auto">
              Ready to structure your business for compliant growth?
            </h2>
            <p className="text-white/60 text-sm font-light leading-[1.8] max-w-xl mx-auto mb-10">
              Schedule a 30-minute discovery consultation. Our senior partners will review your current taxation layout, audit readiness, or corporate governance structure.
            </p>

            <button
              onClick={() => {
                // Scroll to homepage contact or just trigger scroll
                window.location.href = "/#contact";
              }}
              className="group relative h-13 px-8 overflow-hidden font-semibold uppercase tracking-[0.14em] text-[11px] inline-flex items-center gap-2 bg-gold text-primary shadow-[0_4px_24px_rgba(217,143,33,0.18)] hover:shadow-[0_8px_32px_rgba(217,143,33,0.3)] transition-all rounded-sm duration-300"
            >
              <span className="relative z-10">Schedule Discovery Call</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
