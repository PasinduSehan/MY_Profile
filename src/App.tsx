import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import CommandPalette from "./components/CommandPalette";
import CustomCursor from "./components/CustomCursor";
import ThreeBackground from "./components/ThreeBackground";
import GitHubStats from "./components/GitHubStats";
import CvModal from "./components/CvModal";
import SectionDivider from "./components/SectionDivider";
import BottomNavigationBar from "./components/BottomNavigationBar";
import { Sparkles, Command, ArrowUp, Github, Linkedin, Cpu } from "lucide-react";
import { PERSONAL_DETAILS } from "./data";
import { motion } from "motion/react";

// Subtle fade-in-up variants for section entries
const fadeInUpVariants: any = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    }
  }
};

function SectionObserverWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={fadeInUpVariants}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [slTime, setSlTime] = useState("");
  
  // Modals state
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sri Lanka live clock state
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Colombo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setSlTime(new Date().toLocaleTimeString("en-US", options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize theme from storage or default
  useEffect(() => {
    const savedTheme = localStorage.getItem("pasindu_portfolio_theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      setIsDarkMode(true); // Default to dark mode
    }
  }, []);

  // Update classes and storage on theme change
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
      localStorage.setItem("pasindu_portfolio_theme", "dark");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      localStorage.setItem("pasindu_portfolio_theme", "light");
    }
  }, [isDarkMode]);

  // Track active section and scroll top button visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Scroll to top button visibility
      setShowScrollTop(window.scrollY > 400);

      const sections = [
        "home", "about", "experience", "education", 
        "skills", "services", "projects", "certificates", "contact"
      ];
      
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when a modal is open to prevent nested scroll chaining issues
  useEffect(() => {
    if (isCvModalOpen || isPaletteOpen) {
      document.body.classList.add("modal-open");
      document.documentElement.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
    };
  }, [isCvModalOpen, isPaletteOpen]);

  // Global keyboard shortcuts listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in form inputs or text fields
      const activeEl = document.activeElement;
      if (activeEl && (
        activeEl.tagName === "INPUT" || 
        activeEl.tagName === "TEXTAREA" || 
        activeEl.getAttribute("contenteditable") === "true"
      )) {
        return;
      }

      const key = e.key.toLowerCase();

      // 'c' opens Command Palette
      if (key === "c") {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      }
      // 't' toggles Theme
      if (key === "t") {
        e.preventDefault();
        setIsDarkMode(prev => !prev);
      }
      // 'esc' closes everything
      if (e.key === "Escape") {
        setIsPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () => setIsDarkMode(prev => !prev);
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className={`min-h-screen w-full overflow-x-hidden relative transition-colors duration-500 ${
      isDarkMode 
        ? "bg-[#030406] text-slate-200 dark" 
        : "bg-[#f5f6fa] text-gray-800 light"
    }`}>
      {/* Sleek Interface Background Gradients (only in dark mode) */}
      {isDarkMode && (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none z-0" />
          <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-emerald-900/10 rounded-full blur-[100px] pointer-events-none z-0" />
          {/* Visual Decorative Elements */}
          <div className="fixed left-12 bottom-1/4 flex flex-col gap-8 opacity-20 pointer-events-none z-10 hidden xl:flex">
            <div className="w-px h-24 bg-white"></div>
            <p className="rotate-[-90deg] origin-left translate-x-2 text-[10px] font-mono tracking-[0.3em] uppercase text-white">FullStack Developer</p>
          </div>
        </>
      )}

      {/* Dynamic Ambient Background Dots Grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-35 z-0" />

      {/* Floating Interactive Cursor */}
      <CustomCursor />

      {/* Subtle Floating 3D Geometric Shapes Background Canvas */}
      <ThreeBackground />

      {/* Modern Floating Header Navbar */}
      <Navbar 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        onOpenPalette={() => setIsPaletteOpen(true)}
        activeSection={activeSection}
        onOpenCvModal={() => setIsCvModalOpen(true)}
      />

      {/* MAIN SECTIONS CONTAINER */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Hero Module */}
        <SectionObserverWrapper>
          <Hero onOpenCvModal={() => setIsCvModalOpen(true)} />
        </SectionObserverWrapper>

        <SectionDivider />

        {/* 2. Biography Detail */}
        <SectionObserverWrapper>
          <About />
        </SectionObserverWrapper>

        <SectionDivider />

        {/* 3. Job Experience timeline */}
        <SectionObserverWrapper>
          <Experience />
        </SectionObserverWrapper>

        <SectionDivider />

        {/* 4. Education milestones */}
        <SectionObserverWrapper>
          <Education />
        </SectionObserverWrapper>

        <SectionDivider />

        {/* 5. Interactive skill badges */}
        <SectionObserverWrapper>
          <Skills />
        </SectionObserverWrapper>

        <SectionDivider />

        {/* 6. Bento services grid */}
        <SectionObserverWrapper>
          <Services />
        </SectionObserverWrapper>

        <SectionDivider />

        {/* 7. Real & static project dashboards */}
        <SectionObserverWrapper>
          <Projects />
        </SectionObserverWrapper>

        <SectionDivider />

        {/* 8. Verified credentials lists */}
        <SectionObserverWrapper>
          <Certificates />
        </SectionObserverWrapper>

        <SectionDivider />

        {/* GitHub stats standalone sub-module */}
        <SectionObserverWrapper>
          <div className="py-12">
            <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest text-center mb-8 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>REAL-TIME GITHUB PRODUCTIVITY GRAPH</span>
            </h4>
            <GitHubStats />
          </div>
        </SectionObserverWrapper>

        <SectionDivider />

        {/* 9. Secure message dispatcher and map */}
        <SectionObserverWrapper>
          <Contact />
        </SectionObserverWrapper>

      </main>

      {/* FOOTER SECTION: Sleek Interface Bottom Status Bar */}
      <footer className="relative z-10 px-6 md:px-12 pt-10 pb-24 md:pb-10 border-t border-white/5 bg-black/40 text-[11px] font-medium tracking-wider text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          
          {/* Main Navigation Links */}
          <div className="flex gap-8 uppercase font-semibold text-xs text-slate-400">
            <a 
              href={PERSONAL_DETAILS.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors duration-300 hover:underline underline-offset-4"
            >
              LinkedIn
            </a>
            <a 
              href={PERSONAL_DETAILS.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors duration-300 hover:underline underline-offset-4"
            >
              GitHub
            </a>
            <a 
              href={`mailto:${PERSONAL_DETAILS.email}`} 
              className="hover:text-white transition-colors duration-300 hover:underline underline-offset-4"
            >
              Contact
            </a>
          </div>

          {/* Divider line inside footer */}
          <div className="w-full h-px bg-white/5" />

          {/* Meta & Status Bar (Below links) */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="flex-1 flex justify-center sm:justify-start">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                <span>LOCATED IN</span> <span className="text-slate-300">SRI LANKA</span>
              </div>
            </div>
            
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                <span>LOCAL TIME</span> <span className="text-slate-300 uppercase">{slTime || "09:42 AM"} IST</span>
              </div>
            </div>

            <div className="flex-1 flex justify-center sm:justify-end">
              <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span>System Status: Operational</span>
              </div>
            </div>
          </div>
          
        </div>
      </footer>

      {/* PERSISTENT FLOATING CONTROLS */}
      
      {/* 1. Command Palette modal trigger bubble (Bottom Left corner) */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:block">
        <button
          onClick={() => setIsPaletteOpen(true)}
          className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 transition-all hover:scale-110 active:scale-95 cursor-pointer relative group"
          title="Open Command Board (C)"
        >
          <Command className="w-5 h-5" />
          <span className="absolute left-full ml-2 px-2 py-1 rounded bg-black/80 text-[10px] text-gray-300 font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Command Board (C)
          </span>
        </button>
      </div>

      {/* 2. Scroll to top trigger */}
      {showScrollTop && (
        <div className="fixed bottom-24 left-6 z-40 hidden md:block">
          <button
            onClick={handleScrollToTop}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/25 text-gray-400 hover:text-white flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KEYBOARD SHORTCUT COMMAND PALETTE MODAL */}
      <CommandPalette 
        isOpen={isPaletteOpen} 
        onClose={() => setIsPaletteOpen(false)} 
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        activeSection={activeSection}
      />

      {/* CV SELECTION CONFIRMATION MODAL */}
      <CvModal isOpen={isCvModalOpen} onClose={() => setIsCvModalOpen(false)} />

      {/* MOBILE-SPECIFIC FLOATING BOTTOM NAVIGATION BAR */}
      <BottomNavigationBar 
        activeSection={activeSection} 
      />

    </div>
  );
}
