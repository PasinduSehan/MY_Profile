import { useState } from "react";
import { SKILLS } from "../data";
import { Check, Code2, Database, Layout, Smartphone, Wrench, Languages } from "lucide-react";

const CATEGORIES = [
  { key: "All", label: "All Skills", icon: Languages },
  { key: "Programming", label: "Languages", icon: Code2 },
  { key: "Frontend", label: "Frontend", icon: Layout },
  { key: "Backend", label: "Backend", icon: Database },
  { key: "Mobile", label: "Mobile / Cloud", icon: Smartphone },
  { key: "Database", label: "Databases", icon: Database },
  { key: "Tools", label: "Tools / Other", icon: Wrench },
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSkills = selectedCategory === "All" 
    ? SKILLS 
    : SKILLS.filter(skill => skill.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-black/10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold text-indigo-400 tracking-widest uppercase mb-2">TECHNICAL SKILLS</h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-100 tracking-tight font-sans">
            Comprehensive Toolkit & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">Engineering Proficiency</span>
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-4xl mx-auto">
          {CATEGORIES.map((cat) => {
            const IconComp = cat.icon;
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 border-transparent"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/5 hover:bg-white/10"
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {filteredSkills.map((skill, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/20 hover:bg-white/10 transition-all duration-300 text-left flex flex-col justify-between group"
            >
              {/* Skill meta */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-200 group-hover:text-indigo-400 transition-colors">
                  {skill.name}
                </span>
                <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/10">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Slider track */}
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden p-[0.5px]">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full group-hover:from-cyan-400 group-hover:to-indigo-500 transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              {/* Category tag stamp */}
              <div className="flex items-center gap-1 mt-3.5 text-[9px] text-gray-500 font-mono">
                <Check className="w-3 h-3 text-indigo-500 shrink-0" />
                <span className="uppercase tracking-wider">{skill.category}</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
