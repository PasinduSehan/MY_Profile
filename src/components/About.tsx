import { Mail, MapPin, GraduationCap, Code, Globe, Database, Cpu } from "lucide-react";
import { PERSONAL_DETAILS } from "../data";
import { motion } from "motion/react";

export default function About() {
  const stats = [
    { value: "3+", label: "Academic Years" },
    { value: "15+", label: "Projects Completed" },
    { value: "30+", label: "GitHub Repos" },
    { value: "8+", label: "Technologies Mastered" },
  ];

  const quickBioCards = [
    {
      icon: GraduationCap,
      title: "Academic Milestone",
      desc: "Successfully completed BSc (Hons) in Software Engineering in January 2026 (London Met affiliation) with deep roots in modern system designs.",
      color: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
    },
    {
      icon: Code,
      title: "Clean Code & Architecture",
      desc: "Committed to solid engineering principles: robust SOLID code patterns, modular separations of concerns, and scalable full-stack layers.",
      color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
    },
    {
      icon: Cpu,
      title: "AI & Innovation Focus",
      desc: "Excited by the next frontier. Integrates LLM interfaces (like Gemini API), automated text parsing NLP modules, and OCR platforms.",
      color: "text-purple-400 border-purple-500/20 bg-purple-500/5",
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background radial overlays */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold text-indigo-400 tracking-widest uppercase mb-2">ABOUT ME</h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-100 tracking-tight font-sans">
            Crafting the Future of Software, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">One Line of Code at a Time</span>
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive 3D CSS Rotating Tech Cube & Stats */}
          <div className="lg:col-span-5 flex flex-col items-center gap-10">
            
            {/* 3D CUBE FEATURE */}
            <div className="relative w-64 h-64 flex items-center justify-center pt-8">
              {/* Outer orbit circle */}
              <div className="absolute inset-0 border border-white/5 rounded-full animate-spin" style={{ animationDuration: "25s" }} />
              <div className="absolute inset-4 border border-dashed border-indigo-500/10 rounded-full animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
              
              {/* Perspective box for 3D CSS */}
              <div className="perspective-1000 w-32 h-32 relative">
                <div className="cube-3d w-full h-full relative transform-style-3d animate-spin-3d">
                  {/* Face 1: React */}
                  <div className="cube-face absolute inset-0 bg-indigo-950/80 border-2 border-indigo-500 text-indigo-400 flex flex-col items-center justify-center font-mono font-bold text-xs gap-1 rounded-lg">
                    <Code className="w-5 h-5" />
                    <span>REACT</span>
                  </div>
                  {/* Face 2: Python */}
                  <div className="cube-face absolute inset-0 bg-purple-950/80 border-2 border-purple-500 text-purple-400 flex flex-col items-center justify-center font-mono font-bold text-xs gap-1 rounded-lg">
                    <Cpu className="w-5 h-5" />
                    <span>AI / ML</span>
                  </div>
                  {/* Face 3: Java / Spring */}
                  <div className="cube-face absolute inset-0 bg-orange-950/80 border-2 border-orange-500 text-orange-400 flex flex-col items-center justify-center font-mono font-bold text-xs gap-1 rounded-lg">
                    <Globe className="w-5 h-5" />
                    <span>BACKEND</span>
                  </div>
                  {/* Face 4: Database */}
                  <div className="cube-face absolute inset-0 bg-teal-950/80 border-2 border-teal-500 text-teal-400 flex flex-col items-center justify-center font-mono font-bold text-xs gap-1 rounded-lg">
                    <Database className="w-5 h-5" />
                    <span>SQL / NOSQL</span>
                  </div>
                  {/* Face 5: Mobile */}
                  <div className="cube-face absolute inset-0 bg-cyan-950/80 border-2 border-cyan-500 text-cyan-400 flex flex-col items-center justify-center font-mono font-bold text-xs gap-1 rounded-lg">
                    <Cpu className="w-5 h-5" />
                    <span>FLUTTER</span>
                  </div>
                  {/* Face 6: Cloud */}
                  <div className="cube-face absolute inset-0 bg-rose-950/80 border-2 border-rose-500 text-rose-400 flex flex-col items-center justify-center font-mono font-bold text-xs gap-1 rounded-lg">
                    <Globe className="w-5 h-5" />
                    <span>CLOUD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CSS styles injected inline for the 3D cube */}
            <style>{`
              .perspective-1000 {
                perspective: 1000px;
              }
              .transform-style-3d {
                transform-style: preserve-3d;
              }
              .cube-3d {
                animation: rotateCube 12s infinite linear;
              }
              @keyframes rotateCube {
                0% { transform: rotateX(0deg) rotateY(0deg); }
                100% { transform: rotateX(360deg) rotateY(360deg); }
              }
              .cube-face {
                width: 120px;
                height: 120px;
                backface-visibility: visible;
              }
              /* 3D transforms for cube facets */
              .cube-face:nth-child(1) { transform: translateZ(60px); }
              .cube-face:nth-child(2) { transform: rotateY(180deg) translateZ(60px); }
              .cube-face:nth-child(3) { transform: rotateY(90deg) translateZ(60px); }
              .cube-face:nth-child(4) { transform: rotateY(-90deg) translateZ(60px); }
              .cube-face:nth-child(5) { transform: rotateX(90deg) translateZ(60px); }
              .cube-face:nth-child(6) { transform: rotateX(-90deg) translateZ(60px); }
            `}</style>

            {/* High-level stats counters */}
            <div className="grid grid-cols-2 gap-4 w-full">
              {stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 text-center hover:border-indigo-500/20 transition-all duration-300">
                  <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 font-mono">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Bio summary & Quick Cards */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h4 className="text-xl font-bold text-gray-200">
              I am a Software Engineer based in {PERSONAL_DETAILS.location}
            </h4>

            <p className="text-gray-400 text-sm leading-relaxed font-sans">
              {PERSONAL_DETAILS.bio}
            </p>

            {/* Quick structured meta grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-y border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase tracking-wide font-mono">Location</span>
                  <span className="text-xs text-gray-300 font-semibold">{PERSONAL_DETAILS.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase tracking-wide font-mono">Contact Email</span>
                  <a href={`mailto:${PERSONAL_DETAILS.email}`} className="text-xs text-gray-300 font-semibold hover:text-indigo-400 transition-colors">
                    {PERSONAL_DETAILS.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Cards row */}
            <div className="space-y-3.5 pt-2">
              {quickBioCards.map((card, idx) => {
                const IconComp = card.icon;
                return (
                  <div key={idx} className={`p-4 rounded-xl border flex gap-4 transition-all duration-300 hover:translate-x-1 ${card.color}`}>
                    <div className="p-2 h-fit rounded-lg bg-black/40 flex items-center justify-center shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-200 uppercase tracking-wide mb-1">{card.title}</h5>
                      <p className="text-xs text-gray-400 leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </motion.div>
    </section>
  );
}
