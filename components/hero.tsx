"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const heroImages = [
  "/images/work-1.jpg",
  "/images/work-2.jpg",
  "/images/work-3.jpg",
  "/images/work-4.jpg",
  "/images/work-5.jpg",
  "/images/work-6.jpg",
  "/images/work-7.jpg",
  "/images/work-8.jpg",
]

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-16 md:pt-20">
      {/* Slideshow */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Bott Monument work ${index + 1}`}
            fill
            className={`object-cover transition-opacity duration-1000 ${
              index === currentImage ? "opacity-50" : "opacity-0"
            }`}
            priority={index === 0}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-primary uppercase mb-4 md:mb-6">
            Stone Art Since 1985
          </p>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-4 md:mb-6 text-balance">
            Unique memorials that tell eternal stories
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 md:mb-10 leading-relaxed">
            Every monument is an exclusive work of art, crafted with dedication
            to honor the memory of those you love.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              className="bg-primary text-background hover:bg-primary/90 rounded-none px-6 py-5 text-xs sm:text-sm tracking-wide group"
            >
              <Link href="#sobre">
                See Our Work
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-foreground/30 text-foreground hover:border-primary hover:text-primary rounded-none px-6 py-5 text-xs sm:text-sm tracking-wide transition-all duration-300"
            >
              <Link href="#contato">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Slideshow indicators */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImage
                ? "bg-primary w-6"
                : "bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}