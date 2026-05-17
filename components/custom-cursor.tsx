"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Valores de movimento nativos e rápidos do Framer Motion
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Configuração de mola (Spring) para o círculo externo seguir o mouse com suavidade (efeito lag de luxo)
  const springConfig = { stiffness: 250, damping: 28, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Só ativa o cursor em telas desktop (dispositivos com ponteiro fino)
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // Detecta se o mouse está sobre algo clicável para expandir o cursor
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Círculo Externo Fluido (Seguimento com Spring/Mola) */}
      <motion.div
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
        animate={{
          width: isHovered ? 56 : 32,
          height: isHovered ? 56 : 32,
          borderColor: isHovered ? "#C8A66A" : "rgba(255, 255, 255, 0.15)",
          backgroundColor: isHovered ? "rgba(200, 166, 106, 0.03)" : "rgba(255, 255, 255, 0)",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform mix-blend-difference hidden md:block"
      />

      {/* Ponto Central Preciso (Seguimento Instantâneo) */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
          backgroundColor: isHovered ? "#C8A66A" : "#ffffff",
        }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform hidden md:block"
      />
    </>
  );
}