import { Briefcase, CheckCircle2, Calendar, MapPin, Building2, Users } from "lucide-react";
import { WORK_EXPERIENCE, ORGANIZATION_EXPERIENCE } from "../data";
import { motion } from "motion/react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-black/10">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase mb-2">EXPERIENCE</h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-100 tracking-tight font-sans">
            Professional Journey & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Industry Contributions</span>
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline Layout */}
        <div className="max-w-4xl mx-auto mb-16">
          {WORK_EXPERIENCE.map((exp, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-10 border-l border-white/10 pb-8 last:pb-0">
              
              {/* Timeline circle icon */}
              <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0c101d] border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-400/20 animate-pulse-subtle">
                <Briefcase className="w-4 h-4" />
              </div>

              {/* Exp Content Card */}
              <div className="p-6 sm:p-8 rounded-2xl glass-premium border border-white/5 hover:border-cyan-500/25 transition-all duration-300 relative group">
                {/* Glowing subtle top border accent */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Header info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h4 className="text-lg font-bold text-gray-100 group-hover:text-cyan-400 transition-colors">
                      {exp.role}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 font-medium mt-1">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{exp.company}</span>
                      </span>
                      <span className="text-gray-600">•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        <span>{exp.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Date badge */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 font-semibold self-start md:self-auto">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Trainee achievements list */}
                <div className="space-y-4 text-left">
                  <h5 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Key Contributions & Achievements:</h5>
                  
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                    {exp.responsibilities.map((resp, respIdx) => (
                      <div key={respIdx} className="flex gap-3.5 p-3 rounded-xl bg-white/100 border border-white/5 dark:bg-white/5 light:bg-black/5 hover:bg-indigo-500/5 hover:border-indigo-500/10 transition-all duration-200">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 leading-relaxed font-sans">{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Organization Experience Sub-Section */}
        {ORGANIZATION_EXPERIENCE && ORGANIZATION_EXPERIENCE.length > 0 && (
          <div className="max-w-4xl mx-auto mt-20 pt-16 border-t border-white/5">
            <div className="text-center mb-12">
              <h4 className="text-lg font-bold text-gray-200 tracking-tight uppercase font-sans">
                Organization <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Involvement</span>
              </h4>
            </div>
            
            <div className="space-y-8">
              {ORGANIZATION_EXPERIENCE.map((exp, idx) => (
                <div key={idx} className="relative pl-8 sm:pl-10 border-l border-white/10 pb-8 last:pb-0">
                  
                  {/* Timeline circle icon */}
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0c101d] border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-400/20">
                    <Users className="w-4 h-4" />
                  </div>

                  {/* Exp Content Card */}
                  <div className="p-6 sm:p-8 rounded-2xl glass-premium border border-white/5 hover:border-cyan-500/25 transition-all duration-300 relative group">
                    {/* Glowing subtle top border accent */}
                    <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Header info */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <h4 className="text-lg font-bold text-gray-100 group-hover:text-cyan-400 transition-colors">
                          {exp.role}
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 font-medium mt-1">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                            <span>{exp.company}</span>
                          </span>
                          <span className="text-gray-600">•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-rose-400" />
                            <span>{exp.location}</span>
                          </span>
                        </div>
                      </div>

                      {/* Date badge */}
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 font-semibold self-start md:self-auto">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Achievements list */}
                    <div className="space-y-4 text-left">
                      <h5 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Role & Contributions:</h5>
                      
                      <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                        {exp.responsibilities.map((resp, respIdx) => (
                          <div key={respIdx} className="flex gap-3.5 p-3 rounded-xl bg-white/100 border border-white/5 dark:bg-white/5 light:bg-black/5 hover:bg-indigo-500/5 hover:border-indigo-500/10 transition-all duration-200">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 leading-relaxed font-sans">{resp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </motion.div>
    </section>
  );
}
