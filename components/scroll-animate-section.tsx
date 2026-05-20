"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollAnimateSectionProps {
  children: ReactNode;
  className?: string;
  fadeOut?: boolean;
  delay?: number;
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
    margin: "-5% 0px -5% 0px" 
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Opacidade mais dramática
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.85, 1], 
    fadeOut ? [0, 1, 1, 0] : [0, 1, 1, 1]
  );

  // Movimento vertical mais acentuado
  const y = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.85, 1], 
    [120, 0, 0, -80]
  );

  // Escala mais visível
  const scale = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.85, 1], 
    fadeOut ? [0.85, 1, 1, 0.9] : [0.85, 1, 1, 1]
  );

  // Blur para efeito cinematográfico
  const blur = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [8, 0, 0, 6]
  );

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full overflow-hidden ${className}`}
    >
      <motion.div 
        style={{ 
          opacity, 
          y, 
          scale,
          filter: useTransform(blur, (v) => `blur(${v}px)`)
        }}
        initial={{ opacity: 0, y: 120, scale: 0.85 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 120, scale: 0.85 }}
        transition={{ 
          duration: 1.2, 
          delay,
          ease: [0.16, 1, 0.3, 1] 
        }}
        className="w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

// Transição cinematográfica super dramática
export function SectionTransition({ 
  children, 
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: false,
    margin: "-10% 0px -10% 0px"
  });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animações mais dramáticas
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [150, 0, 0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.85]);
  const rotateX = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [8, 0, 0, -5]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [12, 0, 0, 10]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full ${className}`}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={{ 
          opacity, 
          y, 
          scale,
          rotateX,
          filter: useTransform(blur, (v) => `blur(${v}px)`)
        }}
        initial={{ opacity: 0, y: 150, scale: 0.8 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="w-full will-change-transform origin-center"
      >
        {children}
      </motion.div>
    </div>
  );
}

// Versão com efeito de revelação lateral
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
    margin: "-10% 0px -10% 0px" 
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [15, 0, 0, 12]);
  
  const getTransforms = () => {
    switch(direction) {
      case "up": 
        return {
          y: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [200, 0, 0, -150]),
          x: useTransform(scrollYProgress, [0, 1], [0, 0]),
        };
      case "down": 
        return {
          y: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [-200, 0, 0, 150]),
          x: useTransform(scrollYProgress, [0, 1], [0, 0]),
        };
      case "left": 
        return {
          x: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [200, 0, 0, -150]),
          y: useTransform(scrollYProgress, [0, 1], [0, 0]),
        };
      case "right": 
        return {
          x: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [-200, 0, 0, 150]),
          y: useTransform(scrollYProgress, [0, 1], [0, 0]),
        };
      default: 
        return {
          y: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [200, 0, 0, -150]),
          x: useTransform(scrollYProgress, [0, 1], [0, 0]),
        };
    }
  };

  const transforms = getTransforms();
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.75, 1, 1, 0.8]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full overflow-hidden ${className}`}
    >
      <motion.div
        style={{ 
          opacity, 
          ...transforms, 
          scale,
          filter: useTransform(blur, (v) => `blur(${v}px)`)
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1]
        }}
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
    margin: "-15% 0px -15% 0px"
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [10, 0, 0, 8]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full ${className}`}
    >
      <motion.div
        style={{
          opacity,
          filter: useTransform(blur, (v) => `blur(${v}px)`)
        }}
        initial={{ opacity: 0, y: 80 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
        transition={{ 
          duration: 1,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
