import { useState } from "react";
import { FEATURED_PROJECTS } from "../data";
import { Github, ExternalLink, Code, Layers, Sparkles, Smartphone, ChevronRight, Search, X } from "lucide-react";

const CAT_ICONS: Record<string, any> = {
  AI: Sparkles,
  Web: Layers,
  Mobile: Smartphone,
  System: Code
};

export default function FeaturedProjects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "AI", "Web", "Mobile"];

  const filtered = FEATURED_PROJECTS.filter(p => {
    if (!p.featured) return false;
    
    // Category match
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    
    // Search match
    const cleanQuery = searchQuery.trim().toLowerCase();
    const matchesSearch = !cleanQuery || 
      p.title.toLowerCase().includes(cleanQuery) ||
      p.description.toLowerCase().includes(cleanQuery) ||
      p.technologies.some(tech => tech.toLowerCase().includes(cleanQuery));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10">
      {/* Search and Category Filter controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
        {/* Search input with live status */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter showcases (e.g., Firebase, Flask, Chatbot)..."
            className="w-full bg-black/30 border border-white/5 rounded-xl pl-10 pr-9 py-2.5 outline-none text-slate-200 placeholder-slate-500 text-xs focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 transition-all font-sans"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto justify-start md:justify-end">
          {categories.map((cat) => {
            const CatIcon = CAT_ICONS[cat] || Code;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 border-transparent"
                    : "bg-white/5 text-slate-400 hover:text-white border border-white/5 hover:bg-white/10"
                }`}
              >
                {cat !== "All" && <CatIcon className="w-3.5 h-3.5" />}
                <span>{cat} Projects</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Status Message */}
      {searchQuery && (
        <div className="text-center max-w-5xl mx-auto text-xs text-slate-400 font-mono">
          Found <span className="text-indigo-400 font-bold">{filtered.length}</span> featured project{filtered.length !== 1 ? 's' : ''} matching "{searchQuery}"
        </div>
      )}

      {/* Featured Projects Grid */}
      <div className="grid grid-cols-1 gap-10 max-w-5xl mx-auto text-left">
        {filtered.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-dashed border-white/5 bg-white/2">
            <p className="text-sm text-slate-500 font-mono">No matching featured projects found in this category.</p>
          </div>
        ) : (
          filtered.map((proj, idx) => {
            const CatIcon = CAT_ICONS[proj.category] || Code;
            return (
            <div 
              key={idx}
              className="group rounded-3xl glass-premium overflow-hidden border border-white/5 hover:border-indigo-500/20 transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 shadow-2xl hover:shadow-indigo-500/5 relative"
            >
              {/* Highlight neon gradient border top */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Image Column */}
              <div className="lg:col-span-5 h-64 lg:h-auto relative overflow-hidden bg-black/40">
                <img 
                  src={proj.thumbnail} 
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-106 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent opacity-80" />
                
                {/* floating Category Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-cyan-400 font-bold tracking-wider uppercase">
                  <CatIcon className="w-3.5 h-3.5" />
                  <span>{proj.category}</span>
                </div>
              </div>

              {/* Text / Details Column */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-100 group-hover:text-indigo-400 transition-colors mb-3 tracking-tight font-sans">
                    {proj.title}
                  </h4>
                  
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                    {proj.description}
                  </p>

                  {proj.details && (
                    <div className="mb-6 p-3.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-gray-400 leading-relaxed italic flex items-start gap-2.5">
                      <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{proj.details}</span>
                    </div>
                  )}

                  {/* Technologies tags */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {proj.technologies.map((tech, techIdx) => (
                      <span 
                        key={techIdx}
                        className="text-[10px] font-mono text-indigo-300 font-semibold bg-indigo-950/40 px-2.5 py-1 rounded-lg border border-indigo-500/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Link actions */}
                <div className="flex items-center gap-4 border-t border-white/5 pt-5">
                  <a 
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/30 text-xs font-semibold text-gray-200 transition-all duration-300 cursor-pointer"
                  >
                    <Github className="w-4 h-4 text-cyan-400" />
                    <span>View Repository</span>
                  </a>

                  {proj.liveUrl && (
                    <a 
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-all duration-300 cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>

              </div>

            </div>
          );
        }))}
      </div>
    </div>
  );
}
