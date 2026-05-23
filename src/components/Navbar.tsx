import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  Menu, X, ArrowUpRight, ChevronDown, ChevronRight,
  Calculator, LineChart, Scale,
  Rocket, Award, Compass,
} from "lucide-react";
import logoImg from "@/assets/Logo.png";

// ─── Services mega-menu data ──────────────────────────────────────────────────
const serviceItems = [
  {
    icon: Rocket,
    title: "Startup",
    desc: "Pvt Ltd, LLP, Partnership & NGO incorporation",
    color: "hsl(155 50% 38%)",
    id: "startup",
    subItems: [
      { name: "Microfinance Company", id: "microfinance" },
      { name: "Public Limited Company", id: "public-ltd" },
      { name: "Startup India Registration", id: "startup-india" },
      { name: "One Person Company", id: "opc" },
      { name: "Nidhi Company Registration", id: "nidhi" },
      { name: "Farmer Producer Company", id: "producer-co" },
      { name: "Partnership Firm Registration", id: "partnership" },
      { name: "Private Ltd. Company Registration", id: "pvt-ltd" },
      { name: "Sole Proprietorship", id: "sole-prop" },
      { name: "LLP Registration", id: "llp" },
    ]
  },
  {
    icon: Award,
    title: "Licence",
    desc: "GST, MSME, FSSAI, IEC & trade licenses",
    color: "hsl(38 88% 46%)",
    id: "licence",
    subItems: [
      { name: "GST Registration", id: "gst" },
      { name: "MSME / Udyam", id: "msme" },
      { name: "FSSAI Food Licence", id: "fssai" },
      { name: "Import Export Code (IEC)", id: "iec" },
      { name: "Shop & Establishment (Shops Act)", id: "shops" },
      { name: "Professional Tax (PT)", id: "pt" }
    ]
  },
  {
    icon: Scale,
    title: "ROC",
    desc: "MCA filings, secretarial audit & directorship changes",
    color: "hsl(280 45% 45%)",
    id: "roc",
    subItems: [
      { name: "MCA Annual Returns", id: "mca" },
      { name: "Director KYC & Changes", id: "dir" },
      { name: "Increase in Share Capital", id: "capital" },
      { name: "Change in Company Address", id: "address" },
      { name: "LLP Annual Filing", id: "llp-filing" },
      { name: "Strike Off / Winding Up", id: "strike" }
    ]
  },
  {
    icon: Calculator,
    title: "Tax & Payroll",
    desc: "Income Tax, GST returns, TDS & salary management",
    color: "hsl(222 55% 18%)",
    id: "tax-payroll",
    subItems: [
      { name: "Income Tax Returns (ITR)", id: "itr" },
      { name: "GST Returns & Filings", id: "gst-filings" },
      { name: "TDS Returns & Filing", id: "tds" },
      { name: "PF & ESI Registration & Filing", id: "pf-esi" },
      { name: "Salary Processing & Payroll", id: "payroll-proc" },
      { name: "Tax Audit Support", id: "tax-audit" }
    ]
  },
  {
    icon: Compass,
    title: "Miscellaneous Registration",
    desc: "Trademarks, ISO & DPIIT certifications",
    color: "hsl(210 65% 40%)",
    id: "misc-reg",
    subItems: [
      { name: "Trademark Registration", id: "trademark" },
      { name: "ISO Certification", id: "iso" },
      { name: "Copyright Filing", id: "copyright" },
      { name: "Patent Search & Filing", id: "patent" },
      { name: "GeM Portal Registration", id: "gem" },
      { name: "DPIIT Startup Certificate", id: "dpiit" }
    ]
  },
  {
    icon: LineChart,
    title: "OTHER Services",
    desc: "Statutory audits, virtual CFO & finance advisory",
    color: "hsl(10 75% 48%)",
    id: "other",
    subItems: [
      { name: "Statutory & Internal Audit", id: "audit-assurance" },
      { name: "Virtual CFO Services", id: "cfo" },
      { name: "Pitch Deck & Financial Models", id: "pitch" },
      { name: "Business Valuations", id: "valuation" },
      { name: "Bank Project Reports", id: "project-reports" },
      { name: "FEMA & RBI Advisory", id: "fema" }
    ]
  },
];

// ─── Nav links (Services gets a hasDropdown flag) ─────────────────────────────
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Why Us", href: "#why-us" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string>("Startup");
  const dropdownRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [location, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const scrollTo = (href: string, name: string) => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setActiveLink(name);
    
    const hashIndex = href.indexOf("#");
    const path = hashIndex !== -1 ? href.substring(0, hashIndex) : href;
    const hash = hashIndex !== -1 ? href.substring(hashIndex) : "";
    
    if (path && path !== "/") {
      // It's a full page route like /about or /services
      if (location === path) {
        if (hash) {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        navigate(href);
        if (hash) {
          setTimeout(() => {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 200);
        }
      }
    } else {
      // Home page or home page anchor (e.g., "/" or "#why-us")
      const targetHash = hash || "#home";
      if (location !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.querySelector(targetHash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 250);
      } else {
        const el = document.querySelector(targetHash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleServiceMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };

  const handleServiceMouseLeave = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 180);
  };

  return (
    <>
      {/* Gold top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 h-[2px] z-[70] origin-left"
        style={{ background: "linear-gradient(90deg, hsl(38 88% 42%), hsl(38 88% 60%))" }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-white/95 backdrop-blur-xl shadow-[0_2px_32px_-8px_rgba(15,27,58,0.12)] border-b border-border/60"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => scrollTo("#home", "Home")} className="flex items-center gap-3 group shrink-0 text-left">
            <img src={logoImg} alt="The Maxworth Global Logo" className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span
                className="font-serif font-bold text-[1.3rem] leading-none tracking-tight text-primary transition-colors group-hover:text-gold"
                style={{ transition: "color 0.3s" }}
              >
                The Maxworth Global
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground mt-[3.5px] font-semibold">
                Global LLP
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  // ─── Services with mega-dropdown ──────────────────────────
                  <li
                    key={link.name}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={handleServiceMouseEnter}
                    onMouseLeave={handleServiceMouseLeave}
                  >
                    <button
                      onClick={() => { setDropdownOpen(false); navigate("/services"); }}
                      className="relative flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/70 hover:text-primary transition-colors duration-200 group py-1"
                    >
                      {link.name}
                      <motion.span
                        animate={{ rotate: dropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown className="w-3 h-3 mt-0.5" />
                      </motion.span>
                      <span
                        className={`absolute bottom-0 left-0 h-[1.5px] bg-gold transition-all duration-300 ${
                          activeLink === link.name ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </button>

                    {/* Mega dropdown */}
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          onMouseEnter={handleServiceMouseEnter}
                          onMouseLeave={handleServiceMouseLeave}
                          className="absolute top-[calc(100%+18px)] left-1/2 -translate-x-1/2 z-50"
                          style={{ width: "720px" }}
                        >
                          {/* Dropdown arrow */}
                          <div
                            className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-t border-l border-border/60"
                            style={{ zIndex: -1 }}
                          />

                          <div
                            className="bg-white rounded-sm overflow-hidden"
                            style={{
                              boxShadow: "0 24px 64px -12px rgba(15,27,58,0.22), 0 0 0 1px rgba(210,210,225,0.6)",
                            }}
                          >
                            {/* Top gold accent */}
                            <div
                              className="h-[3px] w-full"
                              style={{ background: "linear-gradient(90deg, hsl(38 88% 42%), hsl(38 88% 60%))" }}
                            />

                            {/* Two-column body */}
                            <div style={{ display: "flex", height: "auto" }}>

                              {/* ── Left column: category list ── */}
                              <div
                                style={{
                                  width: "240px",
                                  flexShrink: 0,
                                  borderRight: "1px solid rgba(0,0,0,0.07)",
                                  paddingTop: "10px",
                                  paddingBottom: "10px",
                                  background: "#fff",
                                }}
                              >
                                {serviceItems.map((svc) => {
                                  const isActive = hoveredCategory === svc.title;
                                  return (
                                    <button
                                      key={svc.title}
                                      onMouseEnter={() => setHoveredCategory(svc.title)}
                                      onClick={() => { setDropdownOpen(false); navigate(`/services#${svc.id}`); }}
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "12px 20px",
                                        textAlign: "left",
                                        cursor: "pointer",
                                        background: isActive ? "hsl(210 30% 97%)" : "transparent",
                                        transition: "all 0.15s ease",
                                        borderLeft: isActive ? "3px solid hsl(38 88% 48%)" : "3px solid transparent",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontSize: "13px",
                                          fontWeight: isActive ? 700 : 500,
                                          color: isActive ? "hsl(222 55% 18%)" : "hsl(222 20% 40%)",
                                          letterSpacing: "0.01em",
                                          transition: "color 0.15s ease",
                                        }}
                                      >
                                        {svc.title}
                                      </span>
                                      <ChevronRight
                                        style={{
                                          width: 14,
                                          height: 14,
                                          color: isActive ? "hsl(38 88% 48%)" : "hsl(222 20% 65%)",
                                          flexShrink: 0,
                                          transition: "color 0.15s ease",
                                        }}
                                      />
                                    </button>
                                  );
                                })}
                              </div>

                              {/* ── Right column: sub-services ── */}
                              <div
                                style={{
                                  flex: 1,
                                  padding: "18px 22px",
                                  background: "hsl(210 30% 98%)",
                                  minHeight: "300px",
                                  overflowY: "auto",
                                  maxHeight: "400px",
                                }}
                              >
                                {/* Category header */}
                                {(() => {
                                  const activeService = serviceItems.find(item => item.title === hoveredCategory) || serviceItems[0];
                                  return (
                                    <>
                                      <div
                                        style={{
                                          marginBottom: "14px",
                                          paddingBottom: "10px",
                                          borderBottom: "1px solid rgba(0,0,0,0.07)",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontSize: "9px",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.22em",
                                            fontWeight: 700,
                                            color: "hsl(38 88% 48%)",
                                          }}
                                        >
                                          {activeService.title}
                                        </span>
                                        <p
                                          style={{
                                            fontSize: "11px",
                                            color: "hsl(222 20% 55%)",
                                            marginTop: "2px",
                                            fontWeight: 400,
                                          }}
                                        >
                                          {activeService.desc}
                                        </p>
                                      </div>

                                      {/* Sub-items list */}
                                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                        {activeService.subItems?.map((sub) => (
                                          <button
                                            key={sub.name}
                                            onClick={() => {
                                              setDropdownOpen(false);
                                              navigate(`/services#${activeService.id}`);
                                            }}
                                            className="group/sub"
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              gap: "10px",
                                              textAlign: "left",
                                              cursor: "pointer",
                                              background: "none",
                                              border: "none",
                                              padding: "5px 0",
                                              width: "100%",
                                            }}
                                            onMouseEnter={(e) => {
                                              const el = e.currentTarget;
                                              el.style.paddingLeft = "4px";
                                              const dot = el.querySelector(".sub-dot") as HTMLElement;
                                              const label = el.querySelector(".sub-label") as HTMLElement;
                                              if (dot) { dot.style.borderColor = "hsl(222 55% 22%)"; dot.style.background = "hsl(38 88% 55%)"; }
                                              if (label) label.style.color = "hsl(222 55% 18%)";
                                            }}
                                            onMouseLeave={(e) => {
                                              const el = e.currentTarget;
                                              el.style.paddingLeft = "0px";
                                              const dot = el.querySelector(".sub-dot") as HTMLElement;
                                              const label = el.querySelector(".sub-label") as HTMLElement;
                                              if (dot) { dot.style.borderColor = "rgba(30,50,100,0.25)"; dot.style.background = "transparent"; }
                                              if (label) label.style.color = "hsl(222 20% 45%)";
                                            }}
                                          >
                                            {/* Hollow circle bullet */}
                                            <span
                                              className="sub-dot"
                                              style={{
                                                width: "7px",
                                                height: "7px",
                                                borderRadius: "50%",
                                                border: "1.5px solid rgba(30,50,100,0.25)",
                                                flexShrink: 0,
                                                transition: "all 0.15s ease",
                                                background: "transparent",
                                              }}
                                            />
                                            <span
                                              className="sub-label"
                                              style={{
                                                fontSize: "12.5px",
                                                fontWeight: 500,
                                                color: "hsl(222 20% 45%)",
                                                letterSpacing: "0.01em",
                                                lineHeight: 1.4,
                                                transition: "color 0.15s ease",
                                              }}
                                            >
                                              {sub.name}
                                            </span>
                                          </button>
                                        ))}
                                      </div>
                                    </>
                                  );
                                })()}
                              </div>
                            </div>

                            {/* Bottom bar */}
                            <div
                              style={{
                                padding: "10px 20px",
                                borderTop: "1px solid rgba(0,0,0,0.07)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                background: "hsl(210 20% 98%)",
                              }}
                            >
                              <p style={{ fontSize: "10px", color: "hsl(222 20% 60%)", fontWeight: 300 }}>
                                All services for startups, SMEs &amp; enterprises
                              </p>
                              <button
                                onClick={() => { setDropdownOpen(false); navigate("/services"); }}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  fontSize: "10px",
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.15em",
                                  color: "hsl(222 55% 22%)",
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "hsl(38 88% 46%)"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "hsl(222 55% 22%)"; }}
                              >
                                View All <ArrowUpRight style={{ width: 12, height: 12 }} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  // ─── Regular nav link ──────────────────────────────────────
                  <li key={link.name}>
                    <button
                      onClick={() => scrollTo(link.href, link.name)}
                      className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/70 hover:text-primary transition-colors duration-200 group py-1"
                    >
                      {link.name}
                      <span
                        className={`absolute bottom-0 left-0 h-[1.5px] bg-gold transition-all duration-300 ${
                          activeLink === link.name ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </button>
                  </li>
                )
              )}
            </ul>

            {/* CTA Button */}
            <button
              onClick={() => scrollTo("#contact", "Contact")}
              className="group relative flex items-center gap-2 h-10 px-6 bg-primary text-primary-foreground text-[11px] font-semibold uppercase tracking-[0.15em] overflow-hidden transition-all hover:shadow-[0_4px_20px_-4px_rgba(15,27,58,0.4)]"
            >
              <span className="absolute inset-0 bg-gold translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400 ease-out" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-primary transition-colors duration-200">
                Consult Now
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* ─── Mobile Full-Screen Menu ──────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-white flex flex-col md:hidden overflow-y-auto"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
              <div className="flex items-center gap-2">
                <img src={logoImg} alt="The Maxworth Global Logo" className="h-12 w-auto object-contain" />
                <span className="font-serif font-bold text-lg text-primary">The Maxworth Global</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-2 text-foreground" aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col flex-1 px-6 pt-6 pb-4 gap-1">
              {navLinks.map((link, i) =>
                link.hasDropdown ? (
                  // ─── Services accordion in mobile ──────────────────────────
                  <div key={link.name}>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="w-full flex items-center justify-between text-4xl font-serif font-bold text-foreground hover:text-gold transition-colors py-3"
                    >
                      <span>Services</span>
                      <motion.span animate={{ rotate: mobileServicesOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ChevronDown className="w-6 h-6 text-gold" />
                      </motion.span>
                    </motion.button>

                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-3 pt-1 border-l-2 border-gold/40 ml-2 flex flex-col gap-1">
                            {serviceItems.map((svc) => {
                              const Icon = svc.icon;
                              return (
                                <button
                                  key={svc.title}
                                  onClick={() => scrollTo(`/services#${svc.id}`, "Services")}
                                  className="flex items-center gap-3 py-2.5 px-3 rounded-sm hover:bg-slate-50 text-left transition-colors group/ms"
                                >
                                  <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                                    style={{ background: `${svc.color}14` }}
                                  >
                                    <Icon className="w-3.5 h-3.5" style={{ color: svc.color }} />
                                  </div>
                                  <div>
                                    <p className="text-[13px] font-bold text-foreground group-hover/ms:text-primary transition-colors">
                                      {svc.title}
                                    </p>
                                    <p className="text-[11px] text-muted-foreground font-light leading-snug">
                                      {svc.desc}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                    onClick={() => scrollTo(link.href, link.name)}
                    className="text-4xl font-serif font-bold text-foreground hover:text-gold transition-colors duration-200 py-3 text-left"
                  >
                    {link.name}
                  </motion.button>
                )
              )}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="px-6 pb-10 shrink-0"
            >
              <button
                onClick={() => scrollTo("#contact", "Contact")}
                className="w-full h-14 bg-primary text-primary-foreground font-semibold uppercase tracking-widest text-sm flex items-center justify-center gap-3"
              >
                Schedule Consultation <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
