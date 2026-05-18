"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { X, ChevronLeft, ChevronRight, ZoomIn, Info, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Artwork, Category } from "@/lib/types"

interface GalleryProps {
  artworks: Artwork[]
  categories: Category[]
}

const ITEMS_PER_PAGE = 4

export function PremiumGallery({ artworks, categories }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

  const filteredArtworks = selectedCategory
    ? artworks.filter((a) => a.category_id === selectedCategory)
    : artworks

  const visibleArtworks = filteredArtworks.slice(0, visibleCount)
  const hasMore = visibleCount < filteredArtworks.length

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE)
  }, [selectedCategory])

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    skipSnaps: false,
    containScroll: "trimSnaps"
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setShowDetails(false)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + filteredArtworks.length) % filteredArtworks.length)
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % filteredArtworks.length)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, filteredArtworks.length])

  const brass = "#c8a66a"

  return (
    <section id="galeria" className="py-24 md:py-36 bg-secondary relative overflow-hidden border-t border-white/[0.02]">
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
            Portfolio Exclusivo
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tight mb-6">
            Monumentos de <span className="italic font-light text-primary/90">Distincao</span>
          </h2>
          <p className="text-muted-foreground font-light text-sm md:text-base max-w-2xl mx-auto font-serif italic">
            {'"'}Cada peca e esculpida com a atencao de uma capa de revista, preservando memorias por geracoes.{'"'}
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
            Todos
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
          <div className="overflow-hidden px-6 lg:px-12" ref={emblaRef}>
            <div className="flex gap-4 md:gap-6">
              {filteredArtworks.map((artwork, index) => (
                <motion.div
                  key={artwork.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-[0_0_80%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_32%] min-w-0"
                >
                  <div 
                    className="relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl cursor-pointer group"
                    onClick={() => openLightbox(index)}
                  >
                    <Image
                      src={artwork.image_url}
                      alt={artwork.title}
                      fill
                      sizes="(max-width: 768px) 85vw, (max-width: 1024px) 40vw, 30vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Zoom icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ZoomIn className="w-5 h-5 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
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
                      <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-background text-[10px] font-bold uppercase tracking-wider">
                        Destaque
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 lg:left-2 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-black/70 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all z-10"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 lg:right-2 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-black/70 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all z-10"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>
        </div>

        {/* Grid view below carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {visibleArtworks.map((artwork, index) => (
                <motion.div
                  key={artwork.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index >= visibleCount - ITEMS_PER_PAGE ? (index % ITEMS_PER_PAGE) * 0.05 : 0 }}
                  layout
                  className="relative aspect-square overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer group"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={artwork.image_url}
                    alt={artwork.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Show more / Show less buttons */}
          {filteredArtworks.length > ITEMS_PER_PAGE && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10"
            >
              {hasMore && (
                <Button
                  onClick={() => setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredArtworks.length))}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-12 text-sm uppercase tracking-widest font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Mostrar mais ({filteredArtworks.length - visibleCount})
                </Button>
              )}
              {visibleCount > ITEMS_PER_PAGE && (
                <Button
                  onClick={() => setVisibleCount(ITEMS_PER_PAGE)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-12 text-sm uppercase tracking-widest font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ChevronUp className="mr-2 h-4 w-4" />
                  Mostrar menos
                </Button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && filteredArtworks[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary/20 transition-colors z-20"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Info toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowDetails(!showDetails)
              }}
              className="absolute top-6 left-6 w-12 h-12 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary/20 transition-colors z-20"
            >
              <Info className="w-6 h-6 text-white" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex((i) => (i - 1 + filteredArtworks.length) % filteredArtworks.length)
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary/20 transition-colors z-20"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex((i) => (i + 1) % filteredArtworks.length)
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary/20 transition-colors z-20"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full max-w-5xl max-h-[85vh] mx-20"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredArtworks[lightboxIndex].image_url}
                alt={filteredArtworks[lightboxIndex].title}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* Details panel */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-background/95 backdrop-blur-xl border-l border-white/10 p-8 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="pt-16">
                    <span 
                      className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block"
                      style={{ color: brass }}
                    >
                      {filteredArtworks[lightboxIndex].category?.name || "Portfolio"}
                    </span>
                    <h3 className="font-serif text-3xl text-white mb-6">
                      {filteredArtworks[lightboxIndex].title}
                    </h3>
                    {filteredArtworks[lightboxIndex].description && (
                      <p className="text-muted-foreground leading-relaxed mb-8">
                        {filteredArtworks[lightboxIndex].description}
                      </p>
                    )}
                    <div className="border-t border-white/10 pt-6">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                        Data de Criacao
                      </p>
                      <p className="text-white">
                        {new Date(filteredArtworks[lightboxIndex].created_at).toLocaleDateString('pt-BR', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-wider">
              {lightboxIndex + 1} / {filteredArtworks.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
