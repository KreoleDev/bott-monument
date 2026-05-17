// components/scroll-animate-section.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollAnimateSectionProps {
  children: ReactNode;
}

export function ScrollAnimateSection({ children }: ScrollAnimateSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitoriza o scroll da secção em relação ao topo do ecrã
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transforma o scroll em opacidade, escala e movimento vertical
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.75], [1, 0.93]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div ref={containerRef} className="relative w-full">
      <motion.div style={{ opacity, scale, y }} className="w-full origin-bottom">
        {children}
      </motion.div>
    </div>
  );
}