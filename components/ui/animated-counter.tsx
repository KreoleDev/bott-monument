"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  delay?: number
  className?: string
}

export function AnimatedCounter({ 
  value, 
  suffix = "", 
  prefix = "",
  duration = 2,
  delay = 0,
  className = ""
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  const spring = useSpring(0, { 
    duration: duration * 1000,
    bounce: 0
  })
  
  const display = useTransform(spring, (current) => 
    Math.floor(current).toLocaleString()
  )

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timeout = setTimeout(() => {
        spring.set(value)
        setHasAnimated(true)
      }, delay * 1000)
      return () => clearTimeout(timeout)
    }
  }, [isInView, hasAnimated, spring, value, delay])

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}

interface StatItemProps {
  value: number
  suffix?: string
  label: string
  delay?: number
}

export function StatItem({ value, suffix = "", label, delay = 0 }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="text-center relative group"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative">
        <div className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary mb-2">
          <AnimatedCounter value={value} suffix={suffix} delay={delay} />
        </div>
        <p className="text-sm uppercase tracking-[0.2em] text-foreground/60">{label}</p>
      </div>
      
      {/* Decorative line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay: delay + 0.5 }}
        className="w-12 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mt-4"
      />
    </motion.div>
  )
}
