import { useEffect, useState } from "react";
import { Download, Mail, ArrowDown, Github, Linkedin } from "lucide-react";
import { PERSONAL_DETAILS } from "../data";
import WeatherTimeWidget from "./WeatherTimeWidget";
import { motion } from "motion/react";

interface HeroProps {
  onOpenCvModal: () => void;
}

const TYPING_WORDS = [
  "I Build Beautiful Software.",
  "I Code Scalable Full-Stack Web Apps.",
  "I Create Intelligent AI Solutions.",
  "I Develop High-Performance Mobile Apps."
];

export default function Hero({ onOpenCvModal }: HeroProps) {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const activeWord = TYPING_WORDS[currentWordIdx];

    const handleType = () => {
      if (!isDeleting) {
        setDisplayText(activeWord.substring(0, displayText.length + 1));
        setTypingSpeed(75);

        if (displayText === activeWord) {
          timer = setTimeout(() => setIsDeleting(true), 1500); // Wait on complete
          return;
        }
      } else {
        setDisplayText(activeWord.substring(0, displayText.length - 1));
        setTypingSpeed(40);

        if (displayText === "") {
          setIsDeleting(false);
          setCurrentWordIdx((prev) => (prev + 1) % TYPING_WORDS.length);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIdx, typingSpeed]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-12 overflow-hidden px-4 md:px-8">
      {/* Abstract Glowing Nodes Background */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse-subtle" style={{ animationDelay: "2s" }} />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left column: Text greetings */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Subtle tag indicator from Sleek theme */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Available for new projects</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7.5xl font-extrabold tracking-tighter leading-[0.95] mb-5 uppercase font-sans">
            PASINDU <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-emerald-400 to-indigo-600">
              WEERATHUNGA
            </span>
          </h1>

          <div className="h-10 sm:h-12 flex items-center mb-6">
            <h2 className="text-sm sm:text-lg font-mono text-slate-400 font-semibold tracking-wider uppercase">
              {displayText}
              <span className="w-1.5 h-4 bg-emerald-400 inline-block animate-pulse ml-1 shrink-0" />
            </h2>
          </div>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-light">
            Software Engineer & Full Stack Developer specializing in crafting <span className="text-white font-medium">high-performance digital experiences</span> with modern architecture.
          </p>

          {/* Interactive buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button 
              onClick={() => handleScrollTo("contact")}
              className="h-14 px-8 bg-indigo-600 rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center justify-center hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20 cursor-pointer active:scale-95"
            >
              <Mail className="w-4 h-4 mr-2 shrink-0" />
              <span>Start a Project</span>
            </button>

            <button 
              onClick={onOpenCvModal}
              className="h-14 px-8 border border-slate-800 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center justify-center hover:bg-slate-800 transition-colors bg-white/5 backdrop-blur-sm cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4 mr-2 shrink-0 text-cyan-400" />
              <span>Download CV</span>
            </button>
          </div>

          {/* Quick social handles */}
          <div className="flex items-center gap-5">
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Connect:</span>
            <a 
              href={PERSONAL_DETAILS.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyan-500/20 text-gray-400 hover:text-cyan-400 flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href={PERSONAL_DETAILS.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-indigo-500/20 text-gray-400 hover:text-indigo-400 flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right column: Rotating Neon 3D Frame & Portrait */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group">
            {/* Holographic background rings */}
            <div className="absolute inset-x-0 -inset-y-4 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur-3xl opacity-20 group-hover:opacity-35 transition-opacity duration-500" />
            
            {/* Outer neon border with 3D tilt simulation */}
            <div className="relative w-72 h-96 sm:w-80 sm:h-[420px] rounded-2xl p-[1.5px] bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 shadow-2xl transition-transform duration-500 group-hover:scale-102 group-hover:rotate-1">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-[#0a0d16] relative">
                {/* Real-time Generated Profile Portrait! */}
                <img 
                  src="/pasindu_profile_1784088279687.jpg" 
                  alt={PERSONAL_DETAILS.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                
                {/* Glassmorphic floating tech overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex flex-col gap-1 text-left">
                  <span className="text-gray-100 font-bold text-xs">{PERSONAL_DETAILS.name}</span>
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>Based in Sri Lanka</span>
                  </div>
                </div>
              </div>
            </div>

            {/* floating visual cube shapes decoration */}
            <div className="absolute -top-6 -left-6 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 opacity-20 blur-sm animate-float" />
            <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 blur-sm animate-float" style={{ animationDelay: "3s" }} />
          </div>
        </div>

      </div>

      {/* Weather, Time, and Quotes widget integration */}
      <div className="w-full mt-12 relative z-10">
        <WeatherTimeWidget />
      </div>
    </section>
  );
}
