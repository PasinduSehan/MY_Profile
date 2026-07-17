import { GraduationCap, Award, Calendar, BookOpen, CheckCircle } from "lucide-react";
import { EDUCATION } from "../data";

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      {/* Visual neon circles */}
      <div className="absolute bottom-12 left-10 w-72 h-72 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold text-indigo-400 tracking-widest uppercase mb-2">EDUCATION</h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-100 tracking-tight font-sans">
            Academic Background & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Software Engineering Foundations</span>
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Education Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {EDUCATION.map((edu, idx) => {
            // Pick icon depending on degree
            const isBsc = edu.degree.includes("BSc");
            const isHnd = edu.degree.includes("Higher National");
            
            return (
              <div 
                key={idx}
                className="p-6 sm:p-8 rounded-2xl glass hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/5 border border-white/5 hover:border-indigo-500/20 transition-all duration-300 flex flex-col justify-between text-left group"
              >
                <div>
                  {/* Decorative Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 border ${
                    isBsc 
                      ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" 
                      : isHnd 
                      ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" 
                      : "bg-purple-500/10 border-purple-500/20 text-purple-400"
                  }`}>
                    {isBsc ? (
                      <GraduationCap className="w-5 h-5 animate-bounce" style={{ animationDuration: "3s" }} />
                    ) : isHnd ? (
                      <Award className="w-5 h-5" />
                    ) : (
                      <BookOpen className="w-5 h-5" />
                    )}
                  </div>

                  {/* Period Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] font-mono text-gray-400 mb-4">
                    <Calendar className="w-3 h-3 text-indigo-400" />
                    <span>{edu.period}</span>
                  </div>

                  {/* Title & Institution */}
                  <h4 className="text-base sm:text-lg font-bold text-gray-100 group-hover:text-indigo-400 transition-colors mb-1.5 leading-snug">
                    {edu.degree}
                  </h4>
                  <p className="text-xs text-cyan-400 font-mono font-medium mb-4">
                    {edu.institution}
                  </p>

                  {/* Summary Details */}
                  {edu.details && (
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {edu.details}
                    </p>
                  )}
                </div>

                {/* Custom stamp of completion */}
                <div className="flex items-center gap-1.5 mt-6 pt-4 border-t border-white/5 text-[10px] text-emerald-400 font-mono">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>SUCCESSFULLY COMPLETED</span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
