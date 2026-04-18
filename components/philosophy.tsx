import Image from "next/image"
import { Quote } from "lucide-react"

export function Philosophy() {
  return (
    <section id="filosofia" className="py-8 md:py-12 bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* Content */}
          <div className="order-2 md:order-1">
            <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-primary uppercase mb-2 md:mb-3">
              OUR PHILOSOPHY
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 md:mb-6 text-balance">
              Each Piece is a Work of Art
            </h2>
            
            <div className="relative pl-6 md:pl-8 border-l-2 border-primary">
              <Quote className="absolute -left-3 md:-left-4 -top-1 h-6 w-6 md:h-7 md:w-7 text-primary bg-background" />
              <blockquote className="text-base sm:text-lg md:text-xl text-foreground font-serif italic leading-relaxed mb-3 md:mb-4">
                We assume every client is approaching us because they want a work of art. 
                We create each piece with a magazine cover in mind. 
              </blockquote>
              <p className="text-sm text-muted-foreground">
                We also prefer to work with clients who want the very best.
                If that's you, we're ready to listen.
              </p>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative aspect-[4/3] md:aspect-square overflow-hidden order-1 md:order-2">
            <Image
              src="/images/monument-detail.jpg"
              alt="Detalhe de escultura em granito"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 border border-primary/20" />
          </div>
        </div>
      </div>
    </section>
  )
}
