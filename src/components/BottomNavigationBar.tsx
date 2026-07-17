import React from "react";
import { Home, User, Briefcase, Mail, Bot } from "lucide-react";
import { motion } from "motion/react";

interface BottomNavigationBarProps {
  activeSection: string;
}

export default function BottomNavigationBar({
  activeSection,
}: BottomNavigationBarProps) {
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home, action: () => scrollToSection("home") },
    { id: "about", label: "About", icon: User, action: () => scrollToSection("about") },
    { id: "projects", label: "Projects", icon: Briefcase, action: () => scrollToSection("projects") },
    { id: "contact", label: "Contact", icon: Mail, action: () => scrollToSection("contact") },
  ];

  return (
    <div className="fixed bottom-4 inset-x-4 z-40 md:hidden flex justify-center pointer-events-none select-none">
      <div className="w-full max-w-sm rounded-2xl bg-black/85 dark:bg-black/85 light:bg-white/90 backdrop-blur-lg border border-white/10 dark:border-white/10 light:border-black/10 py-2 px-3 flex justify-around items-center shadow-2xl pointer-events-auto">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={item.action}
              className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl relative transition-all duration-300 cursor-pointer text-gray-500 hover:text-slate-200"
            >
              {/* Active Pill Background animation */}
              {isActive && (
                <motion.div
                  layoutId="activeBottomTab"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-indigo-600/10 dark:bg-indigo-500/10 light:bg-indigo-600/5 rounded-xl border border-indigo-500/10"
                />
              )}

              {/* Icon */}
              <div className="relative">
                <IconComponent
                  className={`w-5 h-5 transition-all duration-300 ${
                    isActive 
                      ? "text-indigo-400 dark:text-indigo-400 light:text-indigo-600 scale-110" 
                      : "text-slate-500 dark:text-slate-500 light:text-slate-400"
                  }`}
                />
              </div>

              {/* Label */}
              <span
                className={`text-[9px] font-mono font-bold uppercase tracking-wider mt-1 transition-all duration-300 ${
                  isActive 
                    ? "text-indigo-300 dark:text-indigo-300 light:text-indigo-700 opacity-100" 
                    : "text-slate-500 dark:text-slate-500 light:text-slate-400 opacity-60"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
