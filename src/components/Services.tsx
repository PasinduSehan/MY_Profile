import { SERVICES } from "../data";
import { Cpu, Code2, Server, Smartphone, Brain, GitMerge, Database, Palette, ArrowUpRight } from "lucide-react";

// Dynamically match icons
const ICON_MAP: Record<string, any> = {
  Cpu,
  Code2,
  Server,
  Smartphone,
  Brain,
  GitMerge,
  Database,
  Palette
};

export default function Services() {
  const handleScrollToContact = () => {
    const contact = document.getElementById("contact");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none animate-pulse-subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold text-indigo-400 tracking-widest uppercase mb-2">SERVICES</h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-100 tracking-tight font-sans">
            Specialist Offerings & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Technical Expertise</span>
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {SERVICES.map((srv, idx) => {
            const IconComp = ICON_MAP[srv.iconName] || Code2;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl glass-premium border border-white/5 hover:border-indigo-500/20 hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between group relative h-72"
              >
                {/* Background neon glow */}
                <div className={`absolute -right-4 -top-4 w-16 h-16 bg-gradient-to-br ${srv.colorClass} opacity-5 blur-xl group-hover:opacity-20 transition-opacity rounded-full`} />

                <div>
                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${srv.colorClass} p-[1px] mb-6 flex items-center justify-center text-white shadow-md shadow-indigo-500/5`}>
                    <div className="w-full h-full rounded-xl bg-[#0b0e17] flex items-center justify-center">
                      <IconComp className="w-5 h-5 text-gray-200 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h4 className="text-base font-bold text-gray-100 group-hover:text-indigo-400 transition-colors mb-3 leading-snug">
                    {srv.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    {srv.description}
                  </p>
                </div>

                {/* Arrow link trigger */}
                <button 
                  onClick={handleScrollToContact}
                  className="flex items-center gap-1 text-[10px] font-mono font-semibold text-cyan-400 hover:text-white transition-colors group/btn cursor-pointer self-start mt-4"
                >
                  <span>Request Quote</span>
                  <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
