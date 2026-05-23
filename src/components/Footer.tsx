import { useLocation } from "wouter";
import { ArrowUpRight } from "lucide-react";
import logoDarkImg from "@/assets/logo_dark.png";

const links = {
  Explore: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Why Us", href: "#why-us" },
    { name: "Contact", href: "/contact" },
  ],
  Services: [
    { name: "Taxation", href: "/services#taxation" },
    { name: "Audit & Assurance", href: "/services#audit" },
    { name: "Business Advisory", href: "/services#advisory" },
    { name: "Company Registration", href: "/services#registration" },
    { name: "Legal Compliance", href: "/services#compliance" },
    { name: "Payroll Management", href: "/services#payroll" },
  ],
};

export function Footer() {
  const [location, navigate] = useLocation();

  const handleNavClick = (href: string) => {
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

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "hsl(222 55% 12%)" }}
    >
      {/* Gold top border */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, hsl(38 88% 48%), transparent)" }}
      />

      {/* Background blobs */}
      <div
        className="absolute top-0 right-0 w-[50%] h-[60%] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 80% 20%, hsl(38 88% 48% / 0.04), transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

          {/* Brand col — span 2 */}
          <div className="lg:col-span-2 pr-8">
            <div className="flex items-center gap-3 mb-6">
              <img src={logoDarkImg} alt="The Maxworth Global Logo" className="h-12 w-auto object-contain" />
              <div className="flex flex-col">
                <span
                  className="font-serif font-bold text-[1.4rem] tracking-tight text-white leading-none block"
                >
                  The Maxworth Global
                </span>
                <span className="text-[9px] uppercase tracking-[0.22em] text-white/40 mt-1.5 block font-semibold">
                  Chartered Accountants
                </span>
              </div>
            </div>

            <p className="text-white/60 text-sm font-light leading-[1.85] max-w-xs mb-8">
              A premier firm committed to delivering financial precision, strategic compliance, and unwavering integrity since 1998.
            </p>

            {/* CTA */}
            <button
              onClick={() => handleNavClick("#contact")}
              className="group inline-flex items-center gap-2 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] border border-white/20 text-white/80 hover:text-white hover:border-gold/50 transition-all duration-300"
            >
              Book a Consultation
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Links */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-semibold mb-6">{heading}</h4>
              <ul className="space-y-3.5">
                {items.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="text-[13px] font-light text-white/65 hover:text-gold transition-colors duration-200"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact info */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-semibold mb-6">Get In Touch</h4>
            <ul className="space-y-4 text-[13px] font-light text-white/65">
              <li className="leading-[1.7]">
                123 Financial District<br />Suite 400, Mumbai<br />Maharashtra 400001
              </li>
              <li>
                <a href="tel:+912223456789" className="hover:text-gold transition-colors">+91 (22) 2345-6789</a>
              </li>
              <li>
                <a href="mailto:consult@themaxworthglobal.com" className="hover:text-gold transition-colors">consult@themaxworthglobal.com</a>
              </li>
              <li className="text-white/40">Mon–Sat: 9 AM – 7 PM</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-white/30 font-light tracking-wider">
          <p>© {new Date().getFullYear()} The Maxworth Global. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white/60 transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white/60 transition-colors">Terms of Service</span>
            <span className="cursor-pointer hover:text-white/60 transition-colors">Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
