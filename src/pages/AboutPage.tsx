import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Users, Award, ShieldCheck, Compass,
  ArrowUpRight, Linkedin, Mail, ChevronRight
} from "lucide-react";


// Stock images (partners)
import imgPartner1 from "@/assets/fca_sachin.png";
import imgPartner2 from "@/assets/FCA Satish.png";

// Generated hero collage images
import imgBoardroom from "@/assets/image copy.png";

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
    desc: "Every engagement is managed by seasoned professionals and reviewed by senior partners with direct expertise in your industry. The guidance you receive is always informed, accountable, and aligned with what actually moves your business forward.",
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
    desc: "With over 15 years of deep expertise in financial planning, taxation, and strategic advisory, our Founder Partner established this firm with a clear and purposeful vision to bring every business need under a single, trusted roof.",
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
    desc: "Servicing 1500+ active clients including high-growth startups, SMEs, and established enterprises with comprehensive financial and compliance solutions across India.",
    tag: "Market Leaders"
  }
];

// Partners team data
const team = [
  {
    name: "FCA SACHIN RANA",
    role: "ASSOCIATE CONSULTANT",
    credentials: "CA, LLB, M.COM(F&T), FAFD(ICAI)",
    bio: "FCA Sachin Rana is a Chartered Accountant (FCA), Law Graduate (LLB), and qualified FAFD (Forensic & Fraud Detection, ICAI) professional, bringing a rare blend of financial, legal, and taxation expertise that enables him to address complex business challenges from every angle.\n\nWith over 10+ years of experience in Accountancy, Auditing, and Domestic & International Taxation, he has advised a diverse clientele from individual taxpayers and startups to large enterprises across direct and indirect taxation, financial structuring, business compliance, and legal advisory.\n\nHe has gained rich experience working with various high-ranked firms and through his own practice, particularly in Statutory Audits and Internal Audits across varied industries including banks. He has developed a strong practice in both Domestic and International Direct Taxes, having served as Income Tax consultant to various industry leaders, and is equally well-versed in GST and Indirect Taxation. He has additionally developed notable expertise in Company Law, FEMA, and Limited Liability Partnership.",
    quote: "Precision is our craft; trust is our currency.",
    image: imgPartner1,
    linkedin: "#",
    email: "maxworthglobal@zohomail.in"
  },
  {
    name: "FCA Satish Bhardwaj",
    role: "Partner & Co-Founder",
    credentials: "CA (ICAI)",
    bio: "CA Satish Bhardwaj is the Partner and Co-Founder of Maxworth Global LLP Consultants, with over 15 years of distinguished experience in audit, statutory compliance, and corporate financial management. A qualified Chartered Accountant from the Institute of Chartered Accountants of India (ICAI), he brings a detail-oriented approach and deep regulatory knowledge that has helped countless businesses maintain seamless compliance. Known for his client-centric approach and proactive advisory style, CA Satish Bhardwaj plays a pivotal role in steering the firm's operations and ensuring that every client receives timely, accurate, and reliable financial guidance.",
    quote: "We don't just file the past; we shape your financial future.",
    image: imgPartner2,
    linkedin: "#",
    email: "maxworthglobal@zohomail.in"
  }
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  
  // Parallax hook for Hero
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
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
      <Helmet>
        <title>About Us | The Maxworth-Global Llp</title>
        <link rel="canonical" href="https://www.themaxworthglobal.com/about" />
      </Helmet>
      <Navbar />

      {/* ─── HERO SECTION — SPLIT LAYOUT ───────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden pt-[78px] lg:pt-[88px] bg-gradient-to-br from-[#FCFBF8] via-[#F8F6F0] to-[#EBE5D9]"
      >

        {/* ── LEFT PANEL: Text Content ── */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 pt-32 pb-16 lg:py-0 lg:w-[52%] xl:w-[48%] shrink-0"
        >


          {/* Decorative SVG corner accent */}
          <svg className="absolute top-24 left-6 opacity-20 pointer-events-none" width="120" height="120" viewBox="0 0 120 120" fill="none">
            <path d="M0 0 L40 0 L40 2 L2 2 L2 40 L0 40 Z" fill="hsl(38 88% 48%)" />
            <circle cx="50" cy="50" r="1.5" fill="hsl(38 88% 48%)" />
            <circle cx="70" cy="50" r="1.5" fill="hsl(38 88% 48%)" />
            <circle cx="50" cy="70" r="1.5" fill="hsl(38 88% 48%)" />
            <circle cx="70" cy="70" r="1.5" fill="hsl(38 88% 48%)" />
          </svg>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border/50 bg-white/60 backdrop-blur-sm mb-8 self-start shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-primary/70">About Maxworth Global</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-bold leading-[1.06] mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", color: "hsl(222, 55%, 18%)" }}
          >
            Architects of financial{" "}
            <span className="italic" style={{ color: "hsl(38 88% 46%)" }}>trust</span>,{" "}
            custodians of{" "}
            <span className="italic text-primary">growth</span>.
          </motion.h1>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-[2px] mb-7 origin-left"
            style={{ background: "linear-gradient(90deg, hsl(38 88% 46%), hsl(38 88% 62%))" }}
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="font-light leading-[1.85] mb-10 max-w-md text-muted-foreground"
            style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)" }}
          >
            For over 15 years, we have coupled strict compliance with forward-thinking financial intelligence — turning audit, tax, and advisory into the vital pillars that protect enterprise value and unlock scale.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <button
              onClick={() => document.getElementById("philosophy")?.scrollIntoView({ behavior: "smooth" })}
              className="group h-12 px-7 font-bold uppercase tracking-[0.14em] text-[11px] flex items-center gap-2 rounded-sm transition-all duration-300 cursor-pointer"
              style={{ background: "hsl(38 88% 46%)", color: "#0a0f1e", boxShadow: "0 4px 24px rgba(217,143,33,0.3)" }}
            >
              <span>Our Philosophy</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" })}
              className="group h-12 px-6 font-bold uppercase tracking-[0.14em] text-[11px] flex items-center gap-2 border rounded-sm transition-all duration-300 cursor-pointer"
              style={{ borderColor: "rgba(15,27,58,0.2)", color: "rgba(15,27,58,0.8)" }}
            >
              <span>Our Journey</span>
            </button>
          </motion.div>

          {/* Trust Stats Row */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}
            className="pt-8 border-t flex flex-wrap gap-8"
            style={{ borderColor: "rgba(15,27,58,0.15)" }}
          >
            {[
              { value: "15+", label: "Years of Excellence" },
              { value: "1500+", label: "Clients Served" },

            ].map((s, i) => (
              <div key={i}>
                <p className="font-serif font-bold text-2xl" style={{ color: "hsl(38 88% 46%)" }}>{s.value}</p>
                <p className="text-[10px] uppercase tracking-[0.18em] font-semibold mt-0.5" style={{ color: "rgba(15,27,58,0.6)" }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT PANEL: Image ── */}
        <div className="relative lg:flex-1 min-h-[380px] lg:min-h-0 overflow-hidden">

          {/* Main boardroom image */}
          <motion.div
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img
              src={imgBoardroom}
              alt="Maxworth Global luxury boardroom with city skyline"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center center" }}
            />
          </motion.div>

          {/* Left edge fade into page background */}
          <div className="absolute inset-y-0 left-0 w-[32%] md:w-[25%] pointer-events-none z-10"
            style={{ background: "linear-gradient(to right, #FCFBF8 0%, transparent 100%)" }}
          />
          
          {/* Soft top/bottom edge blend */}
          <div className="absolute inset-x-0 top-0 h-16 pointer-events-none z-10"
            style={{ background: "linear-gradient(to bottom, #FCFBF8 0%, transparent 100%)" }}
          />
          {/* Gradient overlay bottom — blends into dark next section on mobile */}
          <div className="absolute inset-x-0 bottom-0 pointer-events-none z-10 lg:hidden h-24"
            style={{ background: "linear-gradient(to top, #050814 0%, transparent 100%)" }}
          />



          {/* ── Established badge — bottom left of image ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.35, duration: 0.65 }}
            className="absolute bottom-8 left-6 sm:bottom-12 sm:left-10 flex items-end gap-3"
          >
            <div className="w-[2px] h-14 rounded-full" style={{ background: "linear-gradient(to bottom, transparent, hsl(38 88% 46%))" }} />
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>Established</p>
              <p className="font-serif font-bold text-3xl text-white italic leading-none">2002</p>
            </div>
          </motion.div>

          {/* ── Gold corner bracket — top left of image ── */}
          <svg className="absolute top-6 left-6 pointer-events-none" width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M0 0 L20 0 L20 2 L2 2 L2 20 L0 20 Z" fill="hsl(38 88% 48%)" opacity="0.7"/>
          </svg>
          {/* ── Gold corner bracket — bottom right of image ── */}
          <svg className="absolute bottom-6 right-6 pointer-events-none rotate-180" width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M0 0 L20 0 L20 2 L2 2 L2 20 L0 20 Z" fill="hsl(38 88% 48%)" opacity="0.7"/>
          </svg>

          {/* ── Decorative diagonal gold line ── */}
          <div
            className="absolute top-[20%] left-[15%] w-[1px] h-32 pointer-events-none hidden lg:block"
            style={{
              background: "linear-gradient(to bottom, transparent, hsl(38 88% 46% / 0.4), transparent)",
              transform: "rotate(15deg)"
            }}
          />

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
              { text: "1500+ Clients",  gold: false },
              { text: "10K+ Tax Litigations", gold: true  },
              { text: "99.8% Client Retention",  gold: false },
              { text: "Audit & Virtual CFO",     gold: true  },
              { text: "Tax & Payroll Setup",     gold: false },
              { text: "Startup Setup",           gold: true  },
              { text: "ROC Compliance",          gold: false },
              { text: "Licencing & Certificates", gold: true  },
            ] as const).concat(([
              { text: "Trusted Since 2002",     gold: false },
              { text: "1500+ Clients",  gold: false },
              { text: "10K+ Tax Litigations", gold: true  },
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
              { num: "15+", label: "Years of Trust", desc: "Proven track record" },
              { num: "1500+", label: "Clients", desc: "Startups, SMEs & Listed Co." },
              { num: "10K+", label: "Tax Litigations", desc: "Direct & Indirect Tax" },
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

                  <div className="relative z-10 flex flex-col h-full">
                    
                    {/* Icon container */}
                    <div 
                      className="w-12 h-12 rounded-sm flex items-center justify-center mb-8 transition-transform duration-300 group-hover:scale-110 shrink-0"
                      style={{ 
                        background: `${v.color}18`, 
                        border: `1px solid ${v.color}35`
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: v.color }} />
                    </div>

                    <div className="flex flex-col flex-grow">
                      <h3 className="font-serif font-bold text-white text-lg mb-4 group-hover:text-gold transition-colors min-h-[56px]">
                        {v.title}
                      </h3>
                      <p className="text-white/55 text-[13px] leading-[1.7] font-light">
                        {v.desc}
                      </p>
                    </div>

                    {/* Subtle numbering */}
                    <span className="text-[10px] font-mono tracking-widest text-white/10 group-hover:text-gold/20 transition-colors block mt-auto pt-8 text-right shrink-0">
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

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                <div className="relative h-[380px] overflow-hidden bg-slate-950">
                  {/* Portrait photo */}
                  <img 
                    src={partner.image} 
                    alt={partner.name} 
                    className="w-full h-full object-cover grayscale brightness-[0.9] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-[600ms] ease-out"
                    style={{ objectPosition: "center top" }}
                  />
                  {/* Subtle dark gradient overlay over photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c122b] via-[#0c122b]/40 to-transparent opacity-90" />
                  
                  {/* Name overlay */}
                  <div className="absolute bottom-5 left-6 right-6">
                    <p className="font-serif text-2xl text-white font-bold tracking-wide">{partner.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-gold font-bold mt-1.5">{partner.credentials}</p>
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
                  <div className="text-white/50 text-[11.5px] leading-relaxed font-light mb-6 space-y-3">
                    {partner.bio.split('\n\n').map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>

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
            
            <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold mb-4">Business-Tailored Solutions</p>
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-white mb-6 leading-tight max-w-2xl mx-auto">
              Ready to structure your business for compliant growth?
            </h2>
            <p className="text-white/60 text-sm font-light leading-[1.8] max-w-xl mx-auto mb-10">
              Schedule a 30-minute discovery consultation. Our team will review your current taxation layout, audit readiness, or corporate governance structure.
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
