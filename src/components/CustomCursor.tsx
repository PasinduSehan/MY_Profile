import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const cursorXPin = useMotionValue(-100);
  const cursorYPin = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 350 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isOverOverlay, setIsOverOverlay] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on desktop pointing devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    setIsVisible(true);
    document.body.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      cursorXPin.set(e.clientX - 4);
      cursorYPin.set(e.clientY - 4);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if hovering over any modal or chatbot
      const overModal = !!(
        target.closest(".fixed.inset-0") || 
        target.closest(".fixed.bottom-24") || 
        target.closest("[role='dialog']") ||
        target.closest(".modal")
      );
      setIsOverOverlay(overModal);

      const isInteractive = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.classList.contains("interactive-hover");
      
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [cursorX, cursorY, cursorXPin, cursorYPin]);

  if (!isVisible || isOverOverlay) return null;

  return (
    <>
      {/* Outer Glow Aura */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-indigo-500 pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(99, 102, 241, 0.15)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      {/* Inner Pinpoint */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{
          x: cursorXPin,
          y: cursorYPin,
        }}
        animate={{
          scale: isHovering ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50 }}
      />
    </>
  );
}
