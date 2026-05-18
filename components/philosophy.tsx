"use client";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

// Componente utilitário para animar blocos de texto palavra por palavra (Repetível)
function TypewriterBlock({ text, className, delay = 0, trigger }: { text: string; className?: string; delay?: number; trigger: boolean }) {
  const words = text.split(" ");

  // Tipando explicitamente como 'Variants' para o TypeScript aceitar a estrutura de transição
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.015, delayChildren: delay },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 4 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <motion.p
      variants={containerVariants}
      initial="hidden"
      animate={trigger ? "visible" : "hidden"}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span variants={wordVariants} key={i} className="inline-block mr-1">
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { once: false, amount: 0.15 });

  return (
    <section id="philosophy" ref={sectionRef} className="py-24 md:py-20 bg-secondary relative overflow-hidden">
      
      {/* ELEMENTO DE LUXO: Marca d'água tipográfica gigante ao fundo */}
      <div className="absolute right-[-5%] top-[10%] z-0 pointer-events-none select-none overflow-hidden hidden xl:block">
        <motion.h3 
          animate={isSectionInView ? { opacity: 0.02, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="font-serif text-[18vw] text-white leading-none tracking-tighter"
        >
          MASTERY
        </motion.h3>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Lado do Conteúdo (Ocupa 7 colunas das 12 para dar mais assimetria) */}
          <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-12">
            
            <div className="space-y-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={isSectionInView ? { width: "40px" } : { width: 0 }}
                transition={{ duration: 0.8 }}
                className="h-[1px] bg-primary"
              />
              <motion.p 
                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                animate={isSectionInView ? { opacity: 0.5, letterSpacing: "0.6em" } : { opacity: 0, letterSpacing: "0.2em" }}
                transition={{ duration: 0.8 }}
                className="text-[10px] text-primary font-bold uppercase"
              >
                Our Standard
              </motion.p>
            </div>
            
            {/* Título Principal Imponente */}
            <h2 className="font-serif text-5xl md:text-7xl text-white leading-[1.05] tracking-tight">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="block"
              >
                Where Memory
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="block italic font-light text-primary/90 pl-6 md:pl-12 mt-1"
              >
                Becomes Mastery
              </motion.span>
            </h2>
            
            <div className="relative pt-6">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={isSectionInView ? { opacity: 0.15, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -left-4 -top-2"
              >
                <Quote className="h-12 w-12 text-primary" strokeWidth={1} />
              </motion.div>
              
              {/* Bloco de Citação Principal */}
              <div className="text-xl md:text-2xl text-zinc-200 font-serif italic leading-[1.5] mb-10 pl-6 border-l-2 border-primary/20">
                <TypewriterBlock 
                  delay={0.4}
                  trigger={isSectionInView}
                  text='"We assume every client approaches us because they seek a work of art. We craft each piece with a magazine cover in mind."' 
                />
              </div>
              
              {/* Parágrafos Secundários */}
              <div className="space-y-6 text-[#ddd5c8] font-light leading-relaxed max-w-xl pl-6 text-sm md:text-base">
                <TypewriterBlock 
                  delay={1.2}
                  trigger={isSectionInView}
                  text="We specialize in working with individuals who demand the extraordinary. Our philosophy is simple: we do not just process stone; we immortalize legacies."
                />
                
                <TypewriterBlock 
                  delay={1.8}
                  trigger={isSectionInView}
                  className="text-primary font-medium tracking-widest text-xs uppercase"
                  text="If you are ready for the very best, we are ready to listen."
                />
              </div>
            </div>
          </div>
          
          {/* Lado da Imagem (Ocupa 5 colunas, deslocada assimetricamente) */}
          <div className="lg:col-span-5 relative mt-12 lg:mt-0">
            
            {/* Detalhe Geométrico de Fundo Fino (Linha Dourada) */}
            <motion.div 
              initial={{ height: 0 }}
              animate={isSectionInView ? { height: "70%" } : { height: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="absolute -left-8 top-12 w-[1px] bg-gradient-to-b from-primary/40 to-transparent hidden lg:block"
            />

            <div className="relative group">
              {/* Moldura Premium com Camadas */}
              
              {/* Camada 1: Moldura exterior dourada com cantos decorativos */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={isSectionInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute -inset-4 border border-primary/30 transition-all duration-700 group-hover:border-primary/50"
              >
                {/* Cantos decorativos */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-primary" />
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-primary" />
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-primary" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-primary" />
              </motion.div>
              
              {/* Camada 2: Glow ambiente atras da imagem */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isSectionInView ? { opacity: 0.4, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 blur-2xl -z-10"
              />
              
              {/* Camada 3: Linha decorativa diagonal */}
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={isSectionInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="absolute -top-8 -right-8 w-24 h-[1px] bg-gradient-to-r from-primary/60 to-transparent rotate-45 origin-left hidden lg:block"
              />
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={isSectionInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                className="absolute -bottom-8 -left-8 w-24 h-[1px] bg-gradient-to-l from-primary/60 to-transparent rotate-45 origin-right hidden lg:block"
              />
              
              {/* Caixa da Imagem Principal */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                className="relative aspect-[3/4] overflow-hidden bg-zinc-900 shadow-[0_24px_45px_-18px_rgba(0,0,0,0.45)]"
              >
                {/* Borda interna dupla premium */}
                <div className="absolute inset-0 border border-white/10 z-20 pointer-events-none" />
                <div className="absolute inset-2 border border-primary/10 z-20 pointer-events-none" />
                
                <Image
                  src="/images/monument-detail.jpg"
                  alt="Granite carving detail"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
                
                {/* Vignette overlay premium */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)] z-10 pointer-events-none" />
                
                {/* Reflexo de luz no topo */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent z-10 pointer-events-none" />
                
                {/* Detalhe da Legenda Interna */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end [text-shadow:0_2px_12px_rgba(0,0,0,0.45)] z-20">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-300 font-light border-l border-primary/60 pl-3 leading-tight">
                    Hand-crafted<br/>Precision
                  </p>
                  <span className="font-serif text-white/45 text-xs italic">Bott Coll.</span>
                </div>
              </motion.div>
              
              {/* Badge premium flutuante */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={isSectionInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -10 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg z-30"
              >
                <div className="text-center">
                  <span className="block font-serif text-lg text-primary-foreground font-bold leading-none">EST.</span>
                  <span className="block text-xs text-primary-foreground/80 tracking-wider">2010</span>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
