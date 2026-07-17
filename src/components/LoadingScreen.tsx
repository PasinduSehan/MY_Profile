import { useEffect, useState } from "react";
import { Terminal, Cpu } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const CONSOLE_LOGS = [
  "INITIALIZING PORTFOLIO ENGINE v4.2.1...",
  "RESOLVING CORE DOMEPENDENCIES...",
  "SYNCING GITHUB REPOS FROM github.com/PasinduSehan...",
  "BOOTSTRAPPING GEMINI-3.5-FLASH COGNITIVE CLOUD...",
  "CONFIGURING SILICON VALLEY GLASSMORPHISM SCHEMES...",
  "RENDERING RESPONSIVE FLEXIBLE STAGE...",
  "ESTABLISHING SECURE EXPRESS-API LINK...",
  "PASINDU WEERATHUNGA - DIGITAL PORTFOLIO ONLINE."
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 1. Progress incrementer
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 600); // Wait for transition finish
          }, 400);
          return 100;
        }
        // Random speed variance
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 70);

    // 2. Log incrementer
    const logInterval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < CONSOLE_LOGS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 400);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 bg-[#030712] flex flex-col items-center justify-center z-50 transition-opacity duration-500 p-6 ${
      isFading ? "opacity-0" : "opacity-100"
    }`}>
      {/* Visual logo background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-lg flex flex-col gap-8 relative">
        {/* Branding header */}
        <div className="flex items-center gap-3 justify-center mb-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div className="text-left">
            <h1 className="text-sm font-bold text-gray-100 tracking-wider uppercase font-mono">PASINDU WEERATHUNGA</h1>
            <p className="text-[10px] text-gray-500 font-mono">SOFTWARE ENGINEER | PORTFOLIO</p>
          </div>
        </div>

        {/* Progress Display */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end text-xs font-mono text-gray-400">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Terminal className="w-3.5 h-3.5" />
              <span>BOOTING ENGINE</span>
            </span>
            <span className="text-lg font-bold font-mono text-indigo-400">{progress}%</span>
          </div>
          {/* Bar track */}
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Console outputs */}
        <div className="h-28 rounded-xl bg-black/40 border border-white/5 p-4 font-mono text-[11px] text-gray-400 overflow-hidden space-y-1 relative">
          <div className="absolute top-0 right-0 p-2 text-[9px] text-gray-600 font-mono">
            SYS_INIT
          </div>
          <div className="space-y-1.5">
            {CONSOLE_LOGS.slice(0, logIndex + 1).map((log, index) => (
              <div 
                key={index} 
                className={`flex gap-2 transition-all duration-300 ${
                  index === logIndex ? "text-cyan-300 font-bold" : "text-gray-500"
                }`}
              >
                <span>&gt;</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sri Lanka timezone confirmation */}
        <div className="text-center text-[10px] text-gray-600 font-mono tracking-wider uppercase">
          ESTABLISHED IN 2026 / ASIA-COLOMBO GATEWAY
        </div>
      </div>
    </div>
  );
}
