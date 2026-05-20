"use client"

import { motion } from "framer-motion"

export function PremiumBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Radial gradient glows */}
      <div className="absolute inset-0">
        {/* Top center glow */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[60%] opacity-[0.07]"
          style={{
            background: 'radial-gradient(ellipse at center top, rgba(200, 166, 106, 1) 0%, transparent 70%)'
          }}
        />
        
        {/* Bottom center glow */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[50%] opacity-[0.05]"
          style={{
            background: 'radial-gradient(ellipse at center bottom, rgba(200, 166, 106, 1) 0%, transparent 70%)'
          }}
        />
        
        {/* Left side glow */}
        <div 
          className="absolute top-1/2 left-0 -translate-y-1/2 w-[40%] h-[80%] opacity-[0.04]"
          style={{
            background: 'radial-gradient(ellipse at left center, rgba(200, 166, 106, 1) 0%, transparent 70%)'
          }}
        />
        
        {/* Right side glow */}
        <div 
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[40%] h-[80%] opacity-[0.04]"
          style={{
            background: 'radial-gradient(ellipse at right center, rgba(200, 166, 106, 1) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Subtle geometric pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015]">
        <defs>
          <pattern id="geometric-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            {/* Diamond shapes */}
            <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            {/* Corner accents */}
            <circle cx="0" cy="0" r="2" fill="currentColor" className="text-primary" />
            <circle cx="100" cy="0" r="2" fill="currentColor" className="text-primary" />
            <circle cx="0" cy="100" r="2" fill="currentColor" className="text-primary" />
            <circle cx="100" cy="100" r="2" fill="currentColor" className="text-primary" />
            {/* Center dot */}
            <circle cx="50" cy="50" r="1" fill="currentColor" className="text-primary" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
      </svg>

      {/* Animated subtle lines */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.02]">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: '-10%',
              right: '-10%',
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scaleX: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)'
        }}
      />
    </div>
  )
}
