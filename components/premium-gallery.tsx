"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import type { Artwork, Category } from "@/lib/types"

interface GalleryProps {
  artworks: Artwork[]
  categories: Category[]
}

export function PremiumGallery({ artworks, categories }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSlide, setSelectedSlide] = useState(1)

  const filteredArtworks = useMemo(
    () =>
      selectedCategory
        ? artworks.filter((a) => a.category_id === selectedCategory)
        : artworks,
    [artworks, selectedCategory],
  )
  const displayArtworks = useMemo(() => {
    if (filteredArtworks.length <= 1) {
      return filteredArtworks.map((artwork, originalIndex) => ({ artwork, originalIndex }))
    }

    const featuredIndex = filteredArtworks.findIndex((artwork) => artwork.featured)
    const frontIndex = featuredIndex >= 0 ? featuredIndex : 0
    const previousIndex = (frontIndex - 1 + filteredArtworks.length) % filteredArtworks.length
    const orderedIndices = [
      previousIndex,
      frontIndex,
      ...filteredArtworks
        .map((_, index) => index)
        .filter((index) => index !== previousIndex && index !== frontIndex),
    ]

    return orderedIndices.map((originalIndex) => ({
      artwork: filteredArtworks[originalIndex],
      originalIndex,
    }))
  }, [filteredArtworks])

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "center",
    skipSnaps: false,
    containScroll: "trimSnaps"
  })

  useEffect(() => {
    if (!emblaApi) return

    const updateSelectedSlide = () => {
      setSelectedSlide(emblaApi.selectedScrollSnap())
    }

    emblaApi.on("select", updateSelectedSlide)
    emblaApi.on("reInit", updateSelectedSlide)
    updateSelectedSlide()

    return () => {
      emblaApi.off("select", updateSelectedSlide)
      emblaApi.off("reInit", updateSelectedSlide)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi || displayArtworks.length === 0) return

    const nextSlide = displayArtworks.length > 1 ? 1 : 0
    emblaApi.scrollTo(nextSlide, true)
    setSelectedSlide(nextSlide)
  }, [emblaApi, displayArtworks])

  return (
    <section id="gallery" className="py-24 md:py-36 bg-secondary relative overflow-hidden border-t border-white/[0.02]">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/[0.03] blur-[180px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-[10px] font-bold uppercase tracking-[0.6em] mb-4 block">
            Exclusive Portfolio
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tight mb-6">
            Monuments of <span className="italic font-light text-primary/90">Distinction</span>
          </h2>
          <p className="text-muted-foreground font-light text-sm md:text-base max-w-2xl mx-auto font-serif italic">
            {'"'}Each piece is sculpted with the attention of a magazine cover, preserving memories for generations.{'"'}
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-300 border ${
              selectedCategory === null
                ? "bg-primary text-background border-primary"
                : "bg-transparent text-white/70 border-white/20 hover:border-primary/50 hover:text-primary"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-300 border ${
                selectedCategory === cat.id
                  ? "bg-primary text-background border-primary"
                  : "bg-transparent text-white/70 border-white/20 hover:border-primary/50 hover:text-primary"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Carousel */}
        <div className="relative -mx-6 lg:-mx-12">
          <div className="overflow-hidden px-6 py-14 lg:px-12" ref={emblaRef}>
            <div className="flex items-center">
              {displayArtworks.map(({ artwork }, index) => {
                const isFront = index === selectedSlide
                const isBeforeFront = index < selectedSlide

                return (
                  <motion.div
                    key={artwork.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex-[0_0_82%] sm:flex-[0_0_58%] md:flex-[0_0_38%] lg:flex-[0_0_31%] min-w-0 px-2 md:px-0"
                    style={{ zIndex: isFront ? 30 : 10 }}
                  >
                    <motion.div
                      animate={{
                        rotate: isFront ? 0 : isBeforeFront ? -7 : 7,
                        y: isFront ? -10 : 22,
                        scale: isFront ? 1.08 : 0.92,
                        opacity: isFront ? 1 : 0.78,
                      }}
                      whileHover={{
                        y: isFront ? -16 : 12,
                        scale: isFront ? 1.1 : 0.96,
                      }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] bg-zinc-900 shadow-[0_24px_80px_rgba(0,0,0,0.42)] ring-1 ring-white/10 group"
                    >
                    <Image
                      src={artwork.image_url}
                      alt={artwork.title}
                      fill
                      sizes="(max-width: 768px) 85vw, (max-width: 1024px) 40vw, 30vw"
                      className="rounded-[inherit] object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="text-[10px] text-primary font-bold uppercase tracking-[0.25em] mb-2 block">
                        {artwork.category?.name || "Portfolio"}
                      </span>
                      <h3 className="font-serif text-xl text-white tracking-wide">
                        {artwork.title}
                      </h3>
                      {artwork.description && (
                        <p className="text-white/60 text-sm mt-2 line-clamp-2">
                          {artwork.description}
                        </p>
                      )}
                    </div>

                    {/* Featured badge */}
                    {artwork.featured && (
                      <div className="absolute top-5 left-5 z-20 px-4 py-2 rounded-full bg-primary text-background text-[10px] font-bold uppercase tracking-wider">
                        Featured
                      </div>
                    )}
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
