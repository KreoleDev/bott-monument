// components/scroll-animate-section.tsx
"use client";
import { motion, useScroll, useTransform, useInView, MotionValue } from "framer-motion";
import { useRef, ReactNode, useMemo } from "react";

interface ScrollAnimateSectionProps {
  children: ReactNode;
  className?: string;
  fadeOut?: boolean;
  delay?: number;
}

// Hook customizado para usar blur com MotionValue
function useMotionBlur(blur: MotionValue<number>) {
  return useMemo(() => {
    return blur;
  }, [blur]);
}

export function ScrollAnimateSection({ 
  children, 
  className = "",
  fadeOut = true,
  delay = 0
}: ScrollAnimateSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { 
    once: false, 
    margin: "-10% 0px -10% 0px" 
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Opacidade: aparece ao entrar e desaparece ao sair
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    fadeOut ? [0, 1, 1, 0] : [0, 1, 1, 1]
  );

  // Movimento vertical suave
  const y = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    [60, 0, 0, -40]
  );

  // Escala sutil
  const scale = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    fadeOut ? [0.96, 1, 1, 0.98] : [0.96, 1, 1, 1]
  );

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full overflow-hidden ${className}`}
    >
      <motion.div 
        style={{ opacity, y, scale }}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ 
          duration: 0.8, 
          delay,
          ease: [0.25, 0.46, 0.45, 0.94] 
        }}
        className="w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

// Versão com efeito de revelação mais dramático
export function ScrollRevealSection({ 
  children, 
  className = "",
  direction = "up"
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { 
    once: false, 
    margin: "-15% 0px -15% 0px" 
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  
  const getInitialPosition = () => {
    switch(direction) {
      case "up": return { x: 0, y: 80 };
      case "down": return { x: 0, y: -80 };
      case "left": return { x: 80, y: 0 };
      case "right": return { x: -80, y: 0 };
      default: return { x: 0, y: 80 };
    }
  };

  const initial = getInitialPosition();

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full overflow-hidden ${className}`}
    >
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0, ...initial }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...initial }}
        transition={{ 
          duration: 0.9, 
          ease: [0.22, 1, 0.36, 1]
        }}
        className="w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

// Componente com transição cinematográfica entre seções
export function SectionTransition({ 
  children, 
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Efeito de fade e movimento cinematográfico
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [100, 0, 0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.92, 1, 1, 0.96]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full ${className}`}
    >
      <motion.div
        style={{ opacity, y, scale }}
        className="w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

// Componente de fade suave para seções menores
export function FadeSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: false,
    margin: "-20% 0px -20% 0px"
  });

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ 
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
