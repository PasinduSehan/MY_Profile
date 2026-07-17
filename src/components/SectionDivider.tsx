import React from "react";
import { motion } from "motion/react";

export default function SectionDivider() {
  // Generate static configuration for 6 floating particle dots to avoid SSR mismatch or re-render recalculation
  const particles = [
    { id: 1, left: "15%", delay: 0.2, duration: 8, scale: 0.8 },
    { id: 2, left: "30%", delay: 1.5, duration: 11, scale: 1.2 },
    { id: 3, left: "45%", delay: 0.5, duration: 9, scale: 0.6 },
    { id: 4, left: "60%", delay: 2.1, duration: 12, scale: 1.0 },
    { id: 5, left: "75%", delay: 1.0, duration: 10, scale: 1.4 },
    { id: 6, left: "88%", delay: 0.8, duration: 7, scale: 0.7 }
  ];

  return (
    <div className="relative w-full h-16 sm:h-24 flex items-center justify-center overflow-visible select-none pointer-events-none z-10">
      {/* Subtle Floating Particle Canvas overlay */}
      <div className="absolute inset-x-0 h-full overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: 20, opacity: 0, scale: 0.5 }}
            animate={{
              y: [-25, -75],
              opacity: [0, 0.45, 0],
              scale: [0.5, p.scale, 0.4]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut"
            }}
            className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 blur-[0.5px]"
            style={{ left: p.left }}
          />
        ))}
      </div>

      {/* Decorative central node with a rotating halo */}
      <div className="relative flex items-center justify-center w-full max-w-5xl px-4">
        {/* Animated Gradient Line */}
        <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent dark:via-cyan-500/15" />
        
        {/* Floating gradient glow behind line */}
        <div className="absolute inset-x-12 h-[3px] bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent blur-[1px] dark:via-indigo-500/5" />

        {/* Central visual node */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10 w-2.5 h-2.5 rounded-full bg-indigo-500/20 border border-indigo-400/50 flex items-center justify-center"
        >
          {/* Inner pulsating core */}
          <div className="w-1 h-1 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-400 shadow-lg shadow-indigo-500/50" />
          
          {/* Rotating halo ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute w-5 h-5 rounded-full border border-dashed border-cyan-400/20"
          />
        </motion.div>
      </div>
    </div>
  );
}
