import { useEffect, useState, useMemo } from "react";
import { GitBranch, Star, Users, Flame, Award, Cpu, Code2 } from "lucide-react";
import { gsap } from "gsap";

interface ProfileData {
  login: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string;
  avatar_url: string;
}

interface Language {
  name: string;
  percent: number;
  color: string;
}

interface StatsData {
  streak: number;
  contributions: number;
  topLanguages: Language[];
}

export default function GitHubStats() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then(res => res.json())
      .then(data => {
        if (data) {
          setProfile(data.profile);
          setStats(data.stats);
        }
      })
      .catch(err => console.error("Error loading GitHub stats:", err))
      .finally(() => setIsLoading(false));
  }, []);

  // Generate 32 columns x 7 rows = 224 contribution days with stable random level values
  const contributionTiles = useMemo(() => {
    const tiles = [];
    const seed = 54321;
    let rand = seed;
    const random = () => {
      rand = (rand * 1664525 + 1013904223) % 4294967296;
      return rand / 4294967296;
    };

    for (let col = 0; col < 32; col++) {
      for (let row = 0; row < 7; row++) {
        const r = random();
        let level = 0;
        if (r > 0.82) level = 4;
        else if (r > 0.65) level = 3;
        else if (r > 0.40) level = 2;
        else if (r > 0.15) level = 1;

        // Visual enhancement: create busy streaks or low clusters to make it look realistic
        if (col > 4 && col < 8) level = Math.max(0, level - 1);
        if (col > 18 && col < 22) level = Math.min(4, level + 1);

        tiles.push({
          id: `${col}-${row}`,
          level,
          count: level === 0 ? 0 : Math.floor(level * random() * 3) + 1
        });
      }
    }
    return tiles;
  }, []);

  const getTileColor = (level: number) => {
    switch (level) {
      case 1: return "#0e4429";
      case 2: return "#006d32";
      case 3: return "#26a641";
      case 4: return "#39d353";
      default: return "rgba(255, 255, 255, 0.05)";
    }
  };

  const handleTileEnter = (e: React.MouseEvent<HTMLDivElement>, level: number) => {
    const glowColor = level === 4 ? "#5bf575" : level === 3 ? "#3ade57" : level === 2 ? "#13b342" : level === 1 ? "#1f7d49" : "#6366f1";
    gsap.to(e.currentTarget, {
      scale: 1.35,
      backgroundColor: glowColor,
      boxShadow: `0 0 10px ${glowColor}`,
      borderRadius: "4px",
      zIndex: 10,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handleTileLeave = (e: React.MouseEvent<HTMLDivElement>, level: number) => {
    const baseColor = getTileColor(level);
    gsap.to(e.currentTarget, {
      scale: 1,
      backgroundColor: baseColor,
      boxShadow: "none",
      borderRadius: "2px",
      zIndex: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8 rounded-2xl glass animate-pulse flex flex-col gap-6">
        <div className="h-12 bg-white/5 rounded-xl w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-24 bg-white/5 rounded-xl" />
          <div className="h-24 bg-white/5 rounded-xl" />
          <div className="h-24 bg-white/5 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl glass border border-white/5 shadow-2xl relative overflow-hidden text-left">
      {/* Background neon flow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Col: Profile Bio summary */}
        <div className="lg:col-span-5 flex flex-col items-start gap-4">
          <div className="flex items-center gap-4">
            <img 
              src={profile?.avatar_url || "/pasindu_profile_1784088279687.jpg"} 
              alt={profile?.name || "Pasindu"} 
              className="w-16 h-16 rounded-2xl border-2 border-indigo-500/30 object-cover"
            />
            <div>
              <h4 className="font-bold text-gray-100 text-lg leading-tight">
                {profile?.name || "Pasindu Weerathunga"}
              </h4>
              <a 
                href={`https://github.com/${profile?.login || "PasinduSehan"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-cyan-400 hover:underline mt-1 block"
              >
                @{profile?.login || "PasinduSehan"}
              </a>
            </div>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed font-sans mt-2">
            {profile?.bio || "Software Engineer specializing in React, Node.js, Spring Boot, Flutter, and AI solutions."}
          </p>

          {/* Followers count row */}
          <div className="flex items-center gap-4 text-xs font-mono text-gray-500 mt-2">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4 text-indigo-400" />
              <strong className="text-gray-300 font-bold">{profile?.followers || 12}</strong> Followers
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4 text-cyan-400" />
              <strong className="text-gray-300 font-bold">{profile?.following || 15}</strong> Following
            </span>
          </div>
        </div>

        {/* Center / Right Col: Streak and Contributions cards */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            
            {/* Contribs */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <GitBranch className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-mono">Contributions</span>
                <strong className="text-lg font-bold font-mono text-gray-100">{stats?.contributions || 524}</strong>
                <span className="text-[10px] text-emerald-400 block font-mono">Last 365 Days</span>
              </div>
            </div>

            {/* Streak */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 animate-pulse-subtle">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-mono">Active Streak</span>
                <strong className="text-lg font-bold font-mono text-gray-100">{stats?.streak || 42} Days</strong>
                <span className="text-[10px] text-orange-400 block font-mono">Keep Pushing</span>
              </div>
            </div>

          </div>

          {/* Language distribution visual bar chart */}
          <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/5">
            <h5 className="text-xs font-bold text-gray-300 flex items-center gap-1.5 uppercase font-mono tracking-wider">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Language Distribution</span>
            </h5>

            {/* Visual segmented bar */}
            <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden flex p-[0.5px]">
              {(stats?.topLanguages || []).map((lang, idx) => (
                <div 
                  key={idx}
                  className="h-full first:rounded-l-full last:rounded-r-full"
                  style={{ 
                    width: `${lang.percent}%`, 
                    backgroundColor: lang.color 
                  }}
                  title={`${lang.name}: ${lang.percent}%`}
                />
              ))}
            </div>

            {/* Labels grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
              {(stats?.topLanguages || []).map((lang, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: lang.color }} />
                  <span className="text-[11px] text-gray-300 font-medium font-sans">{lang.name}</span>
                  <span className="text-[10px] text-gray-500 font-mono">({lang.percent}%)</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* GitHub Contribution Graph with GSAP Hover Effect */}
      <div className="mt-8 pt-6 border-t border-white/5">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xs font-bold text-gray-300 flex items-center gap-1.5 uppercase font-mono tracking-wider">
            <Award className="w-4 h-4 text-emerald-400 animate-pulse-subtle" />
            <span>Interactive Contribution Graph</span>
          </h5>
          <span className="text-[10px] text-gray-500 font-mono">Hover tiles to inspect GSAP glow</span>
        </div>

        {/* Graph Grid wrapper */}
        <div className="overflow-x-auto pb-2 scrollbar-thin">
          <div className="inline-grid grid-flow-col grid-rows-7 gap-[4px] p-4 bg-white/[0.02] border border-white/5 rounded-xl min-w-max">
            {contributionTiles.map((tile) => {
              const baseColor = getTileColor(tile.level);
              return (
                <div
                  key={tile.id}
                  className="w-[10px] h-[10px] rounded-[2px] transition-colors cursor-crosshair relative"
                  style={{ backgroundColor: baseColor }}
                  onMouseEnter={(e) => handleTileEnter(e, tile.level)}
                  onMouseLeave={(e) => handleTileLeave(e, tile.level)}
                  title={tile.level === 0 ? "No contributions" : `${tile.count} contributions`}
                />
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 text-[9px] font-mono text-gray-500 mt-2">
          <span>Less</span>
          <div className="w-2.5 h-2.5 bg-white/5 rounded-[2px]" />
          <div className="w-2.5 h-2.5 bg-[#0e4429] rounded-[2px]" />
          <div className="w-2.5 h-2.5 bg-[#006d32] rounded-[2px]" />
          <div className="w-2.5 h-2.5 bg-[#26a641] rounded-[2px]" />
          <div className="w-2.5 h-2.5 bg-[#39d353] rounded-[2px]" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
