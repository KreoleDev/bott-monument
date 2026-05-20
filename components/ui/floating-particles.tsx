"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

interface FloatingParticlesProps {
  count?: number
  color?: string
  minSize?: number
  maxSize?: number
  className?: string
}

export function FloatingParticles({
  count = 30,
  color = "rgba(200, 166, 106, 0.15)",
  minSize = 2,
  maxSize = 6,
  className = "",
}: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles: Particle[] = []
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: minSize + Math.random() * (maxSize - minSize),
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 5,
      })
    }
    setParticles(newParticles)
  }, [count, minSize, maxSize])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Ambient glow orbs for luxury feel
interface GlowOrbProps {
  className?: string
  color?: string
  size?: number
  blur?: number
  opacity?: number
}

export function GlowOrb({
  className = "",
  color = "#c8a66a",
  size = 400,
  blur = 150,
  opacity = 0.08,
}: GlowOrbProps) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        filter: `blur(${blur}px)`,
        opacity,
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [opacity, opacity * 1.5, opacity],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

// Subtle grain overlay for luxury texture
export function GrainOverlay({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity,
      }}
    />
  )
}

// Animated line/border decoration
interface AnimatedLineProps {
  direction?: "horizontal" | "vertical"
  length?: string
  color?: string
  thickness?: number
  delay?: number
  className?: string
}

export function AnimatedLine({
  direction = "horizontal",
  length = "100%",
  color = "#c8a66a",
  thickness = 1,
  delay = 0,
  className = "",
}: AnimatedLineProps) {
  const isHorizontal = direction === "horizontal"

  return (
    <motion.div
      className={className}
      style={{
        width: isHorizontal ? 0 : thickness,
        height: isHorizontal ? thickness : 0,
        backgroundColor: color,
      }}
      whileInView={{
        width: isHorizontal ? length : thickness,
        height: isHorizontal ? thickness : length,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    />
  )
}

// Parallax wrapper with customizable depth
interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function Parallax({ children, speed = 0.5, className = "" }: ParallaxProps) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  )
}
