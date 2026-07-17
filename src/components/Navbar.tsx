import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Search, Cpu } from "lucide-react";
import { PERSONAL_DETAILS } from "../data";

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  onOpenPalette: () => void;
  activeSection: string;
  onOpenCvModal: () => void;
}

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Skills", id: "skills" },
  { label: "Services", id: "services" },
  { label: "Projects", id: "projects" },
  { label: "Certificates", id: "certificates" },
  { label: "Contact", id: "contact" },
];

export default function Navbar({
  isDarkMode,
  toggleTheme,
  onOpenPalette,
  activeSection,
  onOpenCvModal
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
      isScrolled 
        ? "py-3.5 bg-[#030406]/85 dark:bg-[#030406]/85 light:bg-white/85 backdrop-blur-md border-b border-white/5 dark:border-white/5 light:border-black/5" 
        : "py-6 bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo Branding */}
        <button 
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-2 text-left cursor-pointer group"
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-emerald-400 rounded-lg flex items-center justify-center font-extrabold text-white shadow-lg shadow-indigo-600/10 group-hover:rotate-6 transition-transform duration-300">
            P
          </div>
          <span className="text-lg font-semibold tracking-tight uppercase text-gray-100 dark:text-gray-100 light:text-gray-900">
            PASINDU<span className="text-indigo-400 font-extrabold">.</span>
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-slate-400">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`transition-all duration-300 border-b pb-1 cursor-pointer hover:text-white ${
                activeSection === link.id
                  ? "text-white border-indigo-500"
                  : "text-slate-400 border-transparent hover:border-slate-400/40"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Download CV button */}
          <button 
            onClick={onOpenCvModal}
            className="hidden sm:block px-5 py-2 bg-white text-black text-[11px] font-bold rounded-full uppercase tracking-tighter hover:bg-indigo-100 transition-all cursor-pointer active:scale-95 shadow-md shadow-white/5"
          >
            Download CV
          </button>

          {/* Command Palette search toggle */}
          <button
            onClick={onOpenPalette}
            className="p-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/5 dark:border-white/5 light:border-black/5 text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer hidden md:flex items-center gap-1.5"
            title="Open Command Palette (C)"
          >
            <Search className="w-4 h-4" />
            <span className="text-[10px] font-mono opacity-60">CMD+C</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/5 dark:border-white/5 light:border-black/5 text-gray-400 hover:text-cyan-400 hover:scale-105 transition-all cursor-pointer"
            title="Toggle Theme (T)"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/5 dark:border-white/5 light:border-black/5 text-gray-400 hover:text-white cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#030406]/95 dark:bg-[#030406]/95 light:bg-white/95 backdrop-blur-lg border-b border-white/5 dark:border-white/5 light:border-black/5 py-4 px-6 space-y-2 flex flex-col shadow-2xl">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                activeSection === link.id
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenPalette();
            }}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-indigo-400 hover:bg-indigo-500/10 flex items-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Search Portfolio</span>
          </button>
        </div>
      )}
    </nav>
  );
}
