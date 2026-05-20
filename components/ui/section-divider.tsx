"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface SectionDividerProps {
  variant?: "lines" | "diamond" | "dots" | "wave" | "elegant"
  className?: string
}

export function SectionDivider({ variant = "elegant", className = "" }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  if (variant === "lines") {
    return (
      <div ref={ref} className={`py-16 overflow-hidden ${className}`}>
        <div className="flex items-center justify-center gap-4">
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-[1px] w-32 bg-gradient-to-r from-transparent to-primary/60 origin-right"
          />
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -45 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-2 h-2 bg-primary rotate-45"
          />
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-[1px] w-32 bg-gradient-to-l from-transparent to-primary/60 origin-left"
          />
        </div>
      </div>
    )
  }

  if (variant === "diamond") {
    return (
      <div ref={ref} className={`py-16 overflow-hidden ${className}`}>
        <div className="flex items-center justify-center gap-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: i === 1 ? 1 : 0.5 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`rotate-45 border border-primary/60 ${i === 1 ? 'w-3 h-3 bg-primary/20' : 'w-2 h-2'}`}
            />
          ))}
        </div>
      </div>
    )
  }

  if (variant === "dots") {
    return (
      <div ref={ref} className={`py-16 overflow-hidden ${className}`}>
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: i === 2 ? 1 : 0.4 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`rounded-full bg-primary ${i === 2 ? 'w-2 h-2' : 'w-1.5 h-1.5'}`}
            />
          ))}
        </div>
      </div>
    )
  }

  if (variant === "wave") {
    return (
      <div ref={ref} className={`py-12 overflow-hidden ${className}`}>
        <svg viewBox="0 0 1200 40" className="w-full h-10 text-primary/20">
          <motion.path
            d="M0,20 Q150,0 300,20 T600,20 T900,20 T1200,20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
      </div>
    )
  }

  // Elegant (default)
  return (
    <div ref={ref} className={`py-20 overflow-hidden ${className}`}>
      <div className="flex items-center justify-center">
        {/* Left decorative element */}
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: 100, opacity: 1 } : { width: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-primary/60"
        />
        
        {/* Center ornament */}
        <div className="mx-6 flex items-center gap-2">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 0.6 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
          <motion.div
            initial={{ scale: 0, rotate: 45 }}
            animate={isInView ? { scale: 1, rotate: 45 } : { scale: 0, rotate: 45 }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
            className="w-3 h-3 border border-primary bg-primary/10"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 0.6 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </div>
        
        {/* Right decorative element */}
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: 100, opacity: 1 } : { width: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-[1px] bg-gradient-to-l from-transparent via-primary/30 to-primary/60"
        />
      </div>
    </div>
  )
}
