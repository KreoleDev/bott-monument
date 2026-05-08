import Image from "next/image"
import { Quote } from "lucide-react"

export function Philosophy() {
  return (
    // ID atualizado para o inglês para casar com o Header
    <section id="philosophy" className="py-12 md:py-16 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Content Side */}
          <div className="relative z-10">
            <p className="text-[10px] tracking-[0.5em] text-[#f9b000] font-bold uppercase mb-6">
              Our Standard
            </p>
            
            <h2 className="font-serif text-4xl md:text-6xl text-foreground mb-10 leading-[1.1] text-balance">
              Where Memory <br/> 
              <span className="italic">Becomes Mastery</span>
            </h2>
            
            <div className="relative">
              {/* Ícone de Aspas Minimalista */}
              <Quote className="h-10 w-10 text-[#f9b000]/20 mb-6" strokeWidth={1} />
              
              <blockquote className="text-xl md:text-3xl text-foreground/90 font-serif italic leading-[1.4] mb-8 pr-4">
                "We assume every client approaches us because they seek a work of art. 
                We craft each piece with a <span className="text-foreground font-medium not-italic border-b-2 border-[#f9b000]/30">magazine cover</span> in mind."
              </blockquote>
              
              <div className="space-y-6 text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-md">
                <p>
                  We specialize in working with individuals who demand the extraordinary. 
                  Our philosophy is simple: we do not just process stone; we immortalize legacies.
                </p>
                <p className="text-[#f9b000] font-medium tracking-wide">
                  If you are ready for the very best, we are ready to listen.
                </p>
              </div>
            </div>
          </div>
          
          {/* Image Side - Editorial Style */}
          <div className="relative group">
            {/* Elemento Decorativo de Fundo (Moldura Flutuante) */}
            <div className="absolute -top-6 -right-6 w-full h-full border border-primary/10 transition-transform duration-700 group-hover:translate-x-2 group-hover:-translate-y-2" />
            
            <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
              <Image
                src="/images/monument-detail.jpg"
                alt="Granite carving detail"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Overlay de Vinheta para Profundidade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Etiqueta Discreta na Imagem */}
              <div className="absolute bottom-8 left-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/80 font-light border-l border-[#f9b000] pl-4">
                  Hand-crafted <br/> Precision
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}