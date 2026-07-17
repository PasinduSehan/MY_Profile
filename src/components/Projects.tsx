import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { GitHubRepository } from "../types";
import { Search, FolderGit2, Star, GitFork, ArrowUpRight, Code, ListFilter, Printer } from "lucide-react";
import FeaturedProjects from "./FeaturedProjects";
import { FEATURED_PROJECTS } from "../data";
import { motion } from "motion/react";

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepository[]>([]);
  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [sortBy, setSortBy] = useState<"stars" | "name" | "updated">("updated");
  const [isLoading, setIsLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch("/api/github")
      .then(res => res.json())
      .then(data => {
        if (data && data.repositories) {
          setRepos(data.repositories);
          setFilteredRepos(data.repositories);
        }
      })
      .catch(err => console.error("Error loading GitHub repositories:", err))
      .finally(() => setIsLoading(false));
  }, []);

  // Filter and Sort logic
  useEffect(() => {
    let result = [...repos];

    // Search filter
    if (search.trim()) {
      result = result.filter(r => 
        r.name.toLowerCase().includes(search.toLowerCase()) || 
        (r.description && r.description.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Language filter
    if (selectedLanguage !== "All") {
      result = result.filter(r => r.language === selectedLanguage);
    }

    // Sort logic
    if (sortBy === "stars") {
      result.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "updated") {
      result.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    }

    setFilteredRepos(result);
    setCurrentPage(1); // Reset page on filter changes
  }, [search, selectedLanguage, sortBy, repos]);

  // Extract all available languages for filter dropdown
  const languages = ["All", ...Array.from(new Set(repos.map(r => r.language).filter(Boolean)))];

  // Pagination variables
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRepos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase mb-2">PORTFOLIO</h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-100 tracking-tight font-sans">
            Featured Showcases & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Open Source Repositories</span>
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto mt-4 rounded-full" />
          
          {/* Dedicated print portfolio summary button */}
          <button
            onClick={() => window.print()}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/20 hover:border-indigo-500 transition-all duration-300 text-xs font-semibold tracking-wider uppercase cursor-pointer z-20 relative"
            title="Print or Save Project Portfolio as PDF"
          >
            <Printer className="w-4 h-4" />
            <span>Print Project Summary</span>
          </button>
        </div>

        {/* Part 1: FEATURED SHOWCASES */}
        <div className="mb-24">
          <h4 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest text-center mb-8 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span>FEATURED SHOWCASE SERIES</span>
          </h4>
          <FeaturedProjects />
        </div>

        {/* Part 2: OTHER REPOSITORIES BROWSER */}
        <div className="border-t border-white/5 pt-20">
          <h4 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest text-center mb-10 flex items-center justify-center gap-2">
            <FolderGit2 className="w-5 h-5 text-cyan-400" />
            <span>LIVE GITHUB ARCHIVES</span>
          </h4>

          {/* Filters controls panel */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8 p-4 rounded-xl bg-white/5 border border-white/5 max-w-5xl mx-auto text-xs">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search repository registry..."
                className="w-full bg-black/20 border border-white/5 rounded-xl pl-9 pr-4 py-2.5 outline-none text-gray-200 placeholder-gray-500 text-xs focus:border-cyan-500/30 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Selector controls */}
            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-end">
              
              {/* Language filter */}
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium font-mono uppercase">Language:</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-black/30 border border-white/5 text-gray-300 rounded-lg px-3 py-1.5 outline-none cursor-pointer text-xs focus:border-cyan-500/30"
                >
                  {languages.map((lang, idx) => (
                    <option key={idx} value={lang} className="bg-[#0b0e17] text-gray-300">{lang}</option>
                  ))}
                </select>
              </div>

              {/* Sorting */}
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium font-mono uppercase">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-black/30 border border-white/5 text-gray-300 rounded-lg px-3 py-1.5 outline-none cursor-pointer text-xs focus:border-cyan-500/30"
                >
                  <option value="updated" className="bg-[#0b0e17] text-gray-300">Last Updated</option>
                  <option value="stars" className="bg-[#0b0e17] text-gray-300">Most Stars</option>
                  <option value="name" className="bg-[#0b0e17] text-gray-300">Alphabetical</option>
                </select>
              </div>

            </div>
          </div>

          {/* Repositories Cards Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-44 rounded-2xl glass border border-white/5 animate-pulse" />
              ))}
            </div>
          ) : filteredRepos.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
                {currentItems.map((repo) => (
                  <div 
                    key={repo.id}
                    className="p-6 rounded-2xl glass hover:bg-white/10 border border-white/5 hover:border-cyan-500/20 transition-all duration-300 flex flex-col justify-between group relative h-48"
                  >
                    <div>
                      {/* Name & Title */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h5 className="font-bold text-gray-100 group-hover:text-cyan-400 transition-colors truncate text-sm sm:text-base font-sans">
                          {repo.name}
                        </h5>
                        <a 
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded-lg bg-white/5 hover:bg-cyan-500/10 text-gray-400 hover:text-cyan-400 transition-all cursor-pointer"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-gray-400 line-clamp-3 mb-4 leading-relaxed font-sans">
                        {repo.description || "Open source software project engineered by Pasindu Weerathunga."}
                      </p>
                    </div>

                    {/* Metadata details */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-3 text-[10px] font-mono text-gray-500">
                      <div className="flex items-center gap-1">
                        <Code className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{repo.language || "TypeScript"}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-400" />
                          <span>{repo.stargazers_count}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{repo.forks_count}</span>
                        </span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-xs font-mono text-gray-400">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center text-gray-500 text-sm">
              No matching repositories found.
            </div>
          )}
        </div>

      </motion.div>

      {/* Printable project summary layout (Hidden in standard screen display, visible only in print) */}
      {createPortal(
        <div 
          id="printable-cv-document" 
          className="hidden print:block w-full max-w-4xl mx-auto bg-white text-slate-800 p-8 sm:p-12 font-sans text-xs leading-relaxed"
        >
          {/* Header section with minimal elegant styling */}
          <div className="border-b-2 border-indigo-600 pb-5 mb-6 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Pasindu Weerathunga</h1>
              <p className="text-sm font-semibold text-indigo-600 tracking-wide mt-1 uppercase font-mono">Software Engineer & Full Stack Developer</p>
              <p className="text-slate-500 text-[10px] mt-2 flex items-center gap-2">
                <span>Piliyandala, Sri Lanka</span> | <span>psehan12@gmail.com</span> | <span>0772415641</span>
              </p>
            </div>
            <div className="text-right font-mono text-[10px] text-slate-500 space-y-1">
              <p>Portfolio: github.com/PasinduSehan</p>
              <p>LinkedIn: linkedin.com/in/pasinduSehan</p>
              <p>Document: Technical Projects Summary</p>
            </div>
          </div>

          {/* Brief Summary statement */}
          <div className="mb-6">
            <h2 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2.5">Executive Summary</h2>
            <p className="text-slate-600 leading-relaxed">
              A comprehensive portfolio of engineered software systems designed and implemented by Pasindu Weerathunga. 
              The projects demonstrate deep technical capabilities in full-stack web architectures, production-ready AI/NLP services, 
              serverless-backed mobile architectures, and robust local enterprise platforms. Each project highlights an emphasis on scalability, high-performance, and immersive UI/UX.
            </p>
          </div>

          {/* Featured Projects summary */}
          <div className="mb-6">
            <h2 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-3">Featured Core Systems</h2>
            <div className="space-y-4">
              {FEATURED_PROJECTS.map((proj, idx) => (
                <div key={idx} className="border-l-2 border-indigo-600 pl-3.5 py-0.5 page-break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-slate-900">{proj.title}</h3>
                    <span className="text-[9px] font-mono font-semibold uppercase text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">{proj.category}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">{proj.description}</p>
                  {proj.details && (
                    <p className="text-slate-500 text-[10px] italic mt-1 font-sans">
                      Key highlight: {proj.details}
                    </p>
                  )}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-[9px] font-mono text-slate-400 uppercase font-semibold">Tech Stack:</span>
                    <span className="text-[9.5px] font-mono text-slate-700">{proj.technologies.join(", ")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic GitHub Registry list */}
          {repos.length > 0 && (
            <div className="page-break-inside-avoid">
              <h2 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-3">Technical Repository Registry (Live GitHub Archives)</h2>
              <div className="grid grid-cols-2 gap-4">
                {repos.slice(0, 10).map((repo) => (
                  <div key={repo.id} className="p-3 border border-slate-200 rounded-lg flex flex-col justify-between bg-slate-50/50">
                    <div>
                      <h3 className="text-[11px] font-bold text-slate-900 truncate">{repo.name}</h3>
                      <p className="text-[10px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                        {repo.description || "Open source software project engineered by Pasindu Weerathunga."}
                      </p>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-200/60 pt-2 mt-2 font-mono text-[9px] text-slate-500">
                      <span>Language: {repo.language || "TypeScript"}</span>
                      <span className="flex gap-2">
                        <span>★ {repo.stargazers_count}</span>
                        <span>ψ {repo.forks_count}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer metadata */}
          <div className="border-t border-slate-200 pt-4 mt-8 text-center font-mono text-[9px] text-slate-400">
            <p>This document is a certified snapshot of the project directory compiled dynamically for browser export/printing.</p>
            <p className="mt-0.5">© {new Date().getFullYear()} Pasindu Weerathunga. All Rights Reserved.</p>
          </div>
        </div>,
        document.body
      )}

  </section>
  );
}
