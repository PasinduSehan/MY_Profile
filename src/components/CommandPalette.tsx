import { useEffect, useState, useRef } from "react";
import { Search, Command, Moon, Sun, ArrowRight, CornerDownLeft, Sparkles, ScrollText, Mail } from "lucide-react";
import { KEYBOARD_SHORTCUTS } from "../data";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
  activeSection: string;
}

export default function CommandPalette({
  isOpen,
  onClose,
  toggleTheme,
  isDarkMode,
  activeSection
}: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAction = (sectionId: string) => {
    onClose();
    if (sectionId === "theme") {
      toggleTheme();
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const commandItems = [
    { id: "home", label: "Go to Home Section", category: "Navigation", icon: ArrowRight },
    { id: "about", label: "Go to About Me", category: "Navigation", icon: ArrowRight },
    { id: "experience", label: "Go to Experience Timeline", category: "Navigation", icon: ArrowRight },
    { id: "education", label: "Go to Education", category: "Navigation", icon: ArrowRight },
    { id: "skills", label: "Go to Tech Skills", category: "Navigation", icon: ArrowRight },
    { id: "projects", label: "Go to Projects Portfolio", category: "Navigation", icon: ArrowRight },
    { id: "services", label: "Go to Services Provided", category: "Navigation", icon: ArrowRight },
    { id: "certificates", label: "Go to Certifications", category: "Navigation", icon: ArrowRight },
    { id: "contact", label: "Go to Contact", category: "Navigation", icon: Mail },
    { id: "theme", label: `Switch to ${isDarkMode ? "Light" : "Dark"} Mode`, category: "System", icon: isDarkMode ? Sun : Moon },
  ];

  const filteredItems = commandItems.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div 
        ref={paletteRef}
        className="w-full max-w-xl bg-[#0b0f19]/95 dark:bg-[#0b0f19]/95 light:bg-white/95 rounded-2xl border border-white/10 dark:border-white/10 light:border-black/10 shadow-2xl overflow-hidden transition-all duration-300"
      >
        {/* Search header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 dark:border-white/5 light:border-black/5">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or section name..."
            className="w-full bg-transparent border-none outline-none text-gray-200 dark:text-gray-200 light:text-gray-900 text-sm font-sans placeholder-gray-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <kbd className="hidden sm:flex items-center gap-0.5 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-400 font-mono">
            <span>ESC</span>
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-72 overflow-y-auto p-2 scrollbar-thin">
          {filteredItems.length > 0 ? (
            Object.entries(
              filteredItems.reduce((acc, item) => {
                acc[item.category] = acc[item.category] || [];
                acc[item.category].push(item);
                return acc;
              }, {} as Record<string, typeof filteredItems>)
            ).map(([category, items]) => (
              <div key={category} className="mb-2">
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 py-1">{category}</h4>
                <div className="space-y-0.5">
                  {items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleAction(item.id)}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-black/5 text-left text-gray-300 dark:text-gray-300 light:text-gray-700 transition-colors duration-200 cursor-pointer text-sm group"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                          <span>{item.label}</span>
                        </div>
                        <CornerDownLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500 text-sm">
              No matching commands found.
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="bg-black/35 px-4 py-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500 font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-white/5 rounded border border-white/10">C</kbd>
              <span>Command Palette</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-white/5 rounded border border-white/10">T</kbd>
              <span>Toggle Theme</span>
            </span>
          </div>
          <span className="hidden md:inline">Use shortcuts anywhere</span>
        </div>
      </div>
    </div>
  );
}
