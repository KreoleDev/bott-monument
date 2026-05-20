"use client";
import { motion, useMotionValue, useTransform, animate, useInView, Variants } from "framer-motion";
import { useEffect, useRef } from "react";

// Componente para a contagem animada dos números
function Counter({ value, trigger }: { value: number; trigger: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (trigger) {
      const controls = animate(count, value, { duration: 2.5, ease: "easeOut" });
      return controls.stop;
    } else {
      count.set(0); 
    }
  }, [trigger, value, count]);

  return <motion.span>{rounded}</motion.span>;
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Controla a entrada e saída da seção para disparar a escrita todas as vezes
  const isSectionInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // Configuração das variantes para o efeito de escrita (Tipadas explicitamente para o TS)
  const sentenceVariants: Variants = {
    hidden: { opacity: 1 },
    visible: (customDelay: number) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.01, // Ajustado para uma leitura fluida letra por letra
        delayChildren: customDelay 
      },
    }),
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 4 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.1, ease: "easeOut" }
    },
  };

  const text1 = "Drew and Kara Bott are the visionaries behind Bott Monument. With a passion for excellence, every memorial is a testament to their commitment to honoring life.";
  const text2 = "As a family-owned and operated studio, Drew personally designs, crafts, and installs every monument. Kara, our CFO, ensures every piece of history is handled with the precision and care it deserves.";

  return (
    <section id="about" ref={sectionRef} className="py-16 md:py-30 bg-card overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Lado Visual - Vídeo com Moldura Flutuante */}
          <div className="relative h-[400px] md:h-[550px] w-full group">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isSectionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 overflow-hidden rounded-[2.25rem] bg-secondary z-10 shadow-[0_24px_80px_rgba(0,0,0,0.42)] ring-1 ring-white/10 transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-[1.01]"
            >
              <div className="absolute inset-3 rounded-[1.65rem] border border-primary/25 z-20 pointer-events-none" />
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full rounded-[inherit] object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-[1.5s] opacity-100"
              >
                <source src="/videos/familia.mp4" type="video/mp4" />
                <img src="/images/craftsman.jpg" alt="Drew Bott" className="object-cover w-full h-full rounded-[inherit]" />
              </video>
              <div className="absolute inset-0 bg-transparent" />
            </motion.div>
            
            {/* Elementos Decorativos Dourados */}
            <div className="absolute -left-3 -bottom-3 w-32 h-32 rounded-bl-[2.75rem] border-l border-b border-primary/40 -z-0 animate-pulse" />
            <div className="absolute -right-3 -top-3 w-32 h-32 rounded-tr-[2.75rem] border-r border-t border-primary/20 -z-0 transition-all duration-1000 group-hover:-translate-y-2 group-hover:translate-x-2" />
          </div>

          {/* Lado do Conteúdo - Texto e Stats */}
          <div className="flex flex-col justify-center">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={isSectionInView ? { opacity: 0.8 } : { opacity: 0 }}
              className="text-[10px] tracking-[0.4em] text-primary font-bold uppercase mb-4"
            >
              Our Legacy
            </motion.p>
            
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-8 leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="block"
              >
                A Family Dedicated to
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="italic text-white/90 block mt-1"
              >
                the Art of Remembrance
              </motion.span>
            </h2>

            <div className="space-y-6 text-base md:text-lg text-white/70 font-light leading-relaxed max-w-xl min-h-[180px]">
              {/* Efeito de Escrita Corrigido no Parágrafo 1 */}
              <motion.p 
                variants={sentenceVariants} 
                initial="hidden" 
                animate={isSectionInView ? "visible" : "hidden"}
                custom={0.4} // Passa o delay inicial para o delayChildren nas variantes
              >
                {text1.split("").map((char, index) => (
                  <motion.span key={index} variants={letterVariants}>{char}</motion.span>
                ))}
              </motion.p>

              {/* Efeito de Escrita Corrigido no Parágrafo 2 */}
              <motion.p 
                variants={sentenceVariants} 
                initial="hidden" 
                animate={isSectionInView ? "visible" : "hidden"}
                custom={1.8} // Inicia a escrita assim que o primeiro parágrafo terminar
              >
                {text2.split("").map((char, index) => (
                  <motion.span key={index} variants={letterVariants}>{char}</motion.span>
                ))}
              </motion.p>
            </div>

           
          </div>
          
        </div>
      </div>
    </section>
  );
}
