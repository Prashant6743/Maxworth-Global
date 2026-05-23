import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  Menu, X, ArrowUpRight, ChevronDown,
  Calculator, ShieldCheck, LineChart,
  Building2, Scale, PiggyBank,
} from "lucide-react";
import logoImg from "@/assets/Logo.png";

// ─── Services mega-menu data ──────────────────────────────────────────────────
const serviceItems = [
  {
    icon: Calculator,
    title: "Taxation",
    desc: "Income Tax, GST returns & advanced tax planning",
    color: "hsl(222 55% 18%)",
    id: "taxation",
  },
  {
    icon: ShieldCheck,
    title: "Audit & Assurance",
    desc: "Statutory, internal & tax audits",
    color: "hsl(38 88% 46%)",
    id: "audit",
  },
  {
    icon: LineChart,
    title: "Business Advisory",
    desc: "Virtual CFO, financial planning & MIS reports",
    color: "hsl(210 65% 40%)",
    id: "advisory",
  },
  {
    icon: Building2,
    title: "Company Registration",
    desc: "Pvt Ltd, LLP, OPC incorporation end-to-end",
    color: "hsl(155 50% 38%)",
    id: "registration",
  },
  {
    icon: Scale,
    title: "Legal Compliance",
    desc: "ROC, FEMA, RBI & full secretarial services",
    color: "hsl(280 45% 45%)",
    id: "compliance",
  },
  {
    icon: PiggyBank,
    title: "Payroll Management",
    desc: "Payroll processing, PF/ESI & tax structuring",
    color: "hsl(10 75% 48%)",
    id: "payroll",
  },
];

const HIGHLIGHT_SERVICE = {
  title: "Not sure where to start?",
  desc: "Book a free 30-minute discovery call with our senior partners. We'll identify the right services for your business.",
  cta: "Schedule Free Call",
};

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
            <img src={logoImg} alt="The Maxworth Global Logo" className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span
                className="font-serif font-bold text-[1.3rem] leading-none tracking-tight text-primary transition-colors group-hover:text-gold"
                style={{ transition: "color 0.3s" }}
              >
                The Maxworth Global
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground mt-[3.5px] font-semibold">
                Chartered Accountants
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
                          style={{ width: "680px" }}
                        >
                          {/* Dropdown arrow */}
                          <div
                            className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-t border-l border-border/60"
                            style={{ zIndex: -1 }}
                          />

                          <div
                            className="bg-white rounded-sm overflow-hidden"
                            style={{
                              boxShadow: "0 24px 64px -12px rgba(15,27,58,0.18), 0 0 0 1px rgba(220,220,230,0.5)",
                            }}
                          >
                            {/* Top gold accent */}
                            <div
                              className="h-[3px]"
                              style={{ background: "linear-gradient(90deg, hsl(38 88% 42%), hsl(38 88% 60%))" }}
                            />

                            <div className="grid grid-cols-3 gap-0">
                              {/* Left: 6 services in 2-col grid */}
                              <div className="col-span-2 p-6 grid grid-cols-2 gap-1">
                                {serviceItems.map((svc, i) => {
                                  const Icon = svc.icon;
                                  return (
                                    <motion.button
                                      key={svc.title}
                                      initial={{ opacity: 0, y: 6 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: i * 0.04 }}
                                      onClick={() => scrollTo(`/services#${svc.id}`, "Services")}
                                      className="group/item flex items-start gap-3 p-3.5 rounded-sm hover:bg-slate-50 transition-all duration-200 text-left"
                                    >
                                      <div
                                        className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5 transition-transform duration-200 group-hover/item:scale-110"
                                        style={{ background: `${svc.color}14` }}
                                      >
                                        <Icon className="w-4 h-4" style={{ color: svc.color }} />
                                      </div>
                                      <div>
                                        <p className="text-[12px] font-bold text-foreground group-hover/item:text-primary transition-colors leading-tight">
                                          {svc.title}
                                        </p>
                                        <p className="text-[11px] text-muted-foreground font-light leading-snug mt-0.5">
                                          {svc.desc}
                                        </p>
                                      </div>
                                    </motion.button>
                                  );
                                })}
                              </div>

                              {/* Right: highlight CTA panel */}
                              <div
                                className="col-span-1 flex flex-col justify-between p-6"
                                style={{ background: "hsl(222 55% 14%)" }}
                              >
                                <div>
                                  <p
                                    className="text-[9px] uppercase tracking-[0.22em] font-bold mb-3"
                                    style={{ color: "hsl(38 88% 55%)" }}
                                  >
                                    Free Consultation
                                  </p>
                                  <h4 className="font-serif font-bold text-white text-[15px] leading-snug mb-3">
                                    {HIGHLIGHT_SERVICE.title}
                                  </h4>
                                  <p className="text-white/55 text-[11px] font-light leading-[1.7]">
                                    {HIGHLIGHT_SERVICE.desc}
                                  </p>
                                </div>

                                <button
                                  onClick={() => scrollTo("#contact", "Contact")}
                                  className="group/cta mt-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] w-full justify-between px-4 py-3 transition-all"
                                  style={{
                                    background: "hsl(38 88% 48% / 0.12)",
                                    border: "1px solid hsl(38 88% 48% / 0.3)",
                                    color: "hsl(38 88% 58%)",
                                  }}
                                >
                                  <span>{HIGHLIGHT_SERVICE.cta}</span>
                                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
                                </button>
                              </div>
                            </div>

                            {/* Bottom bar */}
                            <div className="px-6 py-3 border-t border-border/60 flex items-center justify-between bg-slate-50/60">
                              <p className="text-[10px] text-muted-foreground font-light">
                                All services available for startups, SMEs &amp; enterprises
                              </p>
                              <button
                                onClick={() => { setDropdownOpen(false); navigate("/services"); }}
                                className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary hover:text-gold transition-colors flex items-center gap-1"
                              >
                                View All Services <ArrowUpRight className="w-3 h-3" />
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
                <img src={logoImg} alt="The Maxworth Global Logo" className="h-8 w-auto object-contain" />
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
