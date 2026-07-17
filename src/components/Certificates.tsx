import { CERTIFICATES } from "../data";
import { Award, Smartphone, Shield, Code, Terminal, CheckCircle, Search, ExternalLink } from "lucide-react";
import { useState } from "react";

// Matches certificate iconNames to components
const ICON_MAP: Record<string, any> = {
  smartphone: Smartphone,
  award: Award,
  lock: Shield,
  code: Code,
  terminal: Terminal,
  "check-circle": CheckCircle,
  users: Award,
  "trending-up": Award,
};

export default function Certificates() {
  const [search, setSearch] = useState("");

  const filtered = CERTIFICATES.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.issuer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="certificates" className="py-24 relative overflow-hidden bg-black/10">
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold text-indigo-400 tracking-widest uppercase mb-2">CERTIFICATIONS</h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-100 tracking-tight font-sans">
            Professional Credentials & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Continuous Specializations</span>
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Search bar filter */}
        <div className="relative w-full max-w-md mx-auto mb-12 text-xs">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search credentials (e.g., Python, NIBM, Cisco)..."
            className="w-full bg-white/5 border border-white/5 rounded-xl pl-9 pr-4 py-2.5 outline-none text-gray-200 placeholder-gray-500 text-xs focus:border-indigo-500/30 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto text-left">
          {filtered.length > 0 ? (
            filtered.map((cert, idx) => {
              const IconComp = ICON_MAP[cert.iconName] || Award;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl glass hover:bg-white/10 border border-white/5 hover:border-indigo-500/25 transition-all duration-300 flex flex-col justify-between group relative"
                >
                  <div>
                    {/* Header Icon */}
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/10 group-hover:scale-105 transition-all mb-6">
                      <IconComp className="w-5 h-5 text-indigo-400" />
                    </div>

                    {/* Title */}
                    <h4 className="text-sm font-bold text-gray-100 group-hover:text-cyan-400 transition-colors mb-1.5 leading-snug line-clamp-2">
                      {cert.title}
                    </h4>

                    {/* Issuer */}
                    <p className="text-xs text-indigo-400 font-medium font-mono mb-4">
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Metadata and verification footer */}
                  <div className="border-t border-white/5 pt-4 mt-6">
                    <div className="flex flex-col gap-1 text-[10px] text-gray-500 font-mono">
                      <span>ISSUED: {cert.issuedDate}</span>
                      {cert.credentialId && (
                        <span className="truncate">ID: {cert.credentialId}</span>
                      )}
                    </div>

                    {cert.verifyUrl !== "#" && (
                      <a 
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-3 text-[10px] font-mono text-cyan-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <span>Verify Credential</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                </div>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500 text-sm">
              No matching certificates found.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
