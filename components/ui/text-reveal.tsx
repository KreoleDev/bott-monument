"use client"

import { useRef } from "react"
import { motion, useInView, Variants } from "framer-motion"

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  staggerDelay?: number
  type?: "words" | "chars" | "lines"
}

export function TextReveal({ 
  children, 
  className = "", 
  delay = 0,
  staggerDelay = 0.03,
  type = "words"
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const elements = type === "chars" 
    ? children.split("") 
    : type === "lines"
    ? children.split("\n")
    : children.split(" ")

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay
      }
    }
  }

  const childVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(4px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {elements.map((element, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={childVariants}
        >
          {element}
          {type === "words" && index < elements.length - 1 ? "\u00A0" : ""}
          {type === "lines" && index < elements.length - 1 ? <br /> : ""}
        </motion.span>
      ))}
    </motion.span>
  )
}

interface TypewriterProps {
  text: string
  className?: string
  delay?: number
  speed?: number
  cursor?: boolean
}

export function Typewriter({ 
  text, 
  className = "", 
  delay = 0,
  speed = 50,
  cursor = true
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const characters = text.split("")

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ 
            duration: 0.01, 
            delay: delay + (index * speed / 1000)
          }}
        >
          {char}
        </motion.span>
      ))}
      {cursor && (
        <motion.span
          className="inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
    </span>
  )
}
