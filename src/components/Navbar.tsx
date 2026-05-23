import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  Menu, X, ArrowUpRight, ChevronDown, ChevronRight,
  Calculator, LineChart, Scale,
  Rocket, Award, Compass,
} from "lucide-react";
import logoImg from "@/assets/Logo.png";

// ─── Services flyout data ──────────────────────────────────────────────────
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
    ],
  },
  {
    icon: Award,
    title: "Licence",
    desc: "GST, MSME, FSSAI, IEC & trade licenses",
    color: "hsl(38 88% 46%)",
    id: "licence",
    subItems: [
      { name: "Import Export Code Registration", id: "iec" },
      { name: "FCRA Licence", id: "fcra" },
      { name: "MSME Licence", id: "msme" },
      { name: "FSSAI Registration and Licence", id: "fssai" },
      { name: "Trademark", id: "trademark" },
    ],
  },
  {
    icon: Scale,
    title: "ROC",
    desc: "MCA filings, secretarial audit & directorship changes",
    color: "hsl(280 45% 45%)",
    id: "roc",
    subItems: [
      { name: "Share Valuation", id: "share-valuation" },
      { name: "ROC Search Report", id: "roc-search" },
      { name: "All Compliance Related to ROC & MCA", id: "roc-mca" },
      { name: "Companies Secretarial Work", id: "secretarial" },
      { name: "Corporate Restructuring", id: "restructuring" },
    ],
  },
  {
    icon: Calculator,
    title: "Tax & Payroll",
    desc: "Income Tax, GST returns, TDS & salary management",
    color: "hsl(222 55% 18%)",
    id: "tax-payroll",
    subItems: [
      { name: "VAT", id: "vat" },
      { name: "Custom Tax", id: "custom-tax" },
      { name: "GST Registration", id: "gst" },
      { name: "Domestic Tax Compliances", id: "domestic-tax" },
      { name: "80G / 12A", id: "80g-12a" },
      { name: "Income Tax", id: "income-tax" },
      { name: "Indirect Tax", id: "indirect-tax" },
      { name: "Direct Tax", id: "direct-tax" },
      { name: "Tax Consultancy", id: "tax-consultancy" },
    ],
  },
  {
    icon: Compass,
    title: "Miscellaneous Registration",
    desc: "Trademarks, ISO & DPIIT certifications",
    color: "hsl(210 65% 40%)",
    id: "misc-reg",
    subItems: [
      { name: "Section 8 Company Registration", id: "section-8" },
      { name: "Partnership Deed Registration", id: "partnership" },
      { name: "NGO & Trust", id: "ngo-trust" },
      { name: "Society", id: "society" },
    ],
  },
  {
    icon: LineChart,
    title: "OTHER Services",
    desc: "Statutory audits, virtual CFO & finance advisory",
    color: "hsl(10 75% 48%)",
    id: "other",
    subItems: [
      { name: "International Trade", id: "international-trade" },
      { name: "CSR Complains", id: "csr-complains" },
      { name: "FEMA Complaines", id: "fema-complaines" },
      { name: "Business Consulting", id: "business-consulting" },
    ],
  },
];

// ─── Nav links ─────────────────────────────────────────────────────────────
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
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
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
        setHoveredCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const scrollTo = (href: string, name: string) => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setHoveredCategory(null);
    setActiveLink(name);

    const hashIndex = href.indexOf("#");
    const path = hashIndex !== -1 ? href.substring(0, hashIndex) : href;
    const hash = hashIndex !== -1 ? href.substring(hashIndex) : "";

    if (path && path !== "/") {
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
    closeTimer.current = setTimeout(() => {
      setDropdownOpen(false);
      setHoveredCategory(null);
    }, 180);
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
                  // ─── Services with cascading flyout ───────────────────────
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

                    {/* ── Cascading Flyout ── */}
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          onMouseEnter={handleServiceMouseEnter}
                          onMouseLeave={handleServiceMouseLeave}
                          className="absolute top-[calc(100%+14px)] left-0 z-50"
                          style={{ display: "flex", alignItems: "flex-start", gap: "4px" }}
                        >
                          {/* Caret */}
                          <div
                            className="absolute -top-[7px] left-6 w-3.5 h-3.5 rotate-45 bg-white"
                            style={{
                              boxShadow: "-1px -1px 0 0 rgba(200,205,220,0.6)",
                              zIndex: 1,
                            }}
                          />

                          {/* ── Panel 1: Category list ── */}
                          <div
                            className="bg-white relative"
                            style={{
                              width: "230px",
                              borderRadius: "6px",
                              boxShadow: "0 8px 32px -4px rgba(15,27,58,0.18), 0 0 0 1px rgba(200,205,220,0.6)",
                              paddingTop: "4px",
                              paddingBottom: "8px",
                              overflow: "hidden",
                            }}
                          >
                            {/* Gold top bar */}
                            <div
                              style={{
                                height: "3px",
                                background: "linear-gradient(90deg, hsl(38 88% 42%), hsl(38 88% 60%))",
                                marginBottom: "4px",
                              }}
                            />
                            {serviceItems.map((svc) => {
                              const isActive = hoveredCategory === svc.title;
                              return (
                                <button
                                  key={svc.title}
                                  onMouseEnter={() => setHoveredCategory(svc.title)}
                                  onClick={() => {
                                    setDropdownOpen(false);
                                    setHoveredCategory(null);
                                    navigate(`/services`);
                                  }}
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "11px 18px",
                                    textAlign: "left",
                                    cursor: "pointer",
                                    background: isActive ? "hsl(38 50% 96%)" : "transparent",
                                    border: "none",
                                    outline: "none",
                                    transition: "background 0.12s ease",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: isActive ? 600 : 400,
                                      color: isActive ? "hsl(222 55% 14%)" : "hsl(222 15% 38%)",
                                      letterSpacing: "0.01em",
                                      transition: "color 0.12s, font-weight 0.12s",
                                    }}
                                  >
                                    {svc.title}
                                  </span>
                                  <ChevronRight
                                    style={{
                                      width: 13,
                                      height: 13,
                                      color: isActive ? "hsl(38 88% 46%)" : "hsl(222 15% 62%)",
                                      flexShrink: 0,
                                      transition: "color 0.12s",
                                    }}
                                  />
                                </button>
                              );
                            })}
                          </div>

                          {/* ── Panel 2: Sub-items flyout ── */}
                          <AnimatePresence mode="wait">
                            {hoveredCategory && (() => {
                              const active = serviceItems.find((s) => s.title === hoveredCategory);
                              if (!active?.subItems?.length) return null;
                              return (
                                <motion.div
                                  key={hoveredCategory}
                                  initial={{ opacity: 0, x: -6 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -4 }}
                                  transition={{ duration: 0.14, ease: "easeOut" }}
                                  style={{
                                    width: "270px",
                                    background: "#fff",
                                    borderRadius: "6px",
                                    boxShadow: "0 8px 32px -4px rgba(15,27,58,0.18), 0 0 0 1px rgba(200,205,220,0.6)",
                                    overflow: "hidden",
                                    flexShrink: 0,
                                  }}
                                >
                                  {/* Gold top bar */}
                                  <div
                                    style={{
                                      height: "3px",
                                      background: "linear-gradient(90deg, hsl(38 88% 42%), hsl(38 88% 60%))",
                                    }}
                                  />
                                  <div style={{ padding: "12px 6px 12px 6px" }}>
                                    {active.subItems.map((sub) => (
                                      <button
                                        key={sub.name}
                                        onClick={() => {
                                          setDropdownOpen(false);
                                          setHoveredCategory(null);
                                          navigate(`/services/${active.id}/${sub.id}`);
                                        }}
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "12px",
                                          width: "100%",
                                          padding: "9px 14px",
                                          textAlign: "left",
                                          cursor: "pointer",
                                          background: "none",
                                          border: "none",
                                          outline: "none",
                                          borderRadius: "4px",
                                          transition: "background 0.1s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                          const btn = e.currentTarget as HTMLButtonElement;
                                          btn.style.background = "hsl(38 50% 96%)";
                                          const dot = btn.querySelector(".fd") as HTMLElement;
                                          const lbl = btn.querySelector(".fl") as HTMLElement;
                                          if (dot) dot.style.borderColor = "hsl(38 88% 46%)";
                                          if (lbl) { lbl.style.color = "hsl(222 55% 14%)"; lbl.style.fontWeight = "600"; }
                                        }}
                                        onMouseLeave={(e) => {
                                          const btn = e.currentTarget as HTMLButtonElement;
                                          btn.style.background = "none";
                                          const dot = btn.querySelector(".fd") as HTMLElement;
                                          const lbl = btn.querySelector(".fl") as HTMLElement;
                                          if (dot) dot.style.borderColor = "hsl(222 15% 68%)";
                                          if (lbl) { lbl.style.color = "hsl(222 15% 38%)"; lbl.style.fontWeight = "400"; }
                                        }}
                                      >
                                        {/* Hollow circle bullet — matches reference */}
                                        <span
                                          className="fd"
                                          style={{
                                            width: "8px",
                                            height: "8px",
                                            borderRadius: "50%",
                                            border: "1.5px solid hsl(222 15% 68%)",
                                            flexShrink: 0,
                                            display: "inline-block",
                                            transition: "border-color 0.12s ease",
                                          }}
                                        />
                                        <span
                                          className="fl"
                                          style={{
                                            fontSize: "13.5px",
                                            fontWeight: 400,
                                            color: "hsl(222 15% 38%)",
                                            letterSpacing: "0.01em",
                                            lineHeight: 1.4,
                                            transition: "color 0.12s ease, font-weight 0.12s ease",
                                          }}
                                        >
                                          {sub.name}
                                        </span>
                                      </button>
                                    ))}
                                  </div>
                                </motion.div>
                              );
                            })()}
                          </AnimatePresence>
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
                                  onClick={() => scrollTo(`/services`, "Services")}
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
