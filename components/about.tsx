"use client";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

// Componente para a contagem animada dos números
function Counter({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2.5, ease: "easeOut" });
      return controls.stop;
    } else {
      count.set(0); 
    }
  }, [isInView, value, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function About() {
  // Configuração das variantes para o efeito de escrita
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { delay: 0.2, staggerChildren: 0.008 },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
  };

  const text1 = "Drew and Kara Bott are the visionaries behind Bott Monument. With a passion for excellence, every memorial is a testament to their commitment to honoring life.";
  const text2 = "As a family-owned and operated studio, Drew personally designs, crafts, and installs every monument. Kara, our CFO, ensures every piece of history is handled with the precision and care it deserves.";

  return (
    <section id="about" className="py-16 md:py-2 bg-card overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Lado Visual - Vídeo com Moldura Flutuante */}
          <div className="relative h-[400px] md:h-[550px] w-full group">
            <div className="absolute inset-0 overflow-hidden shadow-2xl border border-white/5 bg-black z-10 transition-transform duration-700 group-hover:scale-[1.01]">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s] opacity-[0.85] hover:opacity-100"
              >
                <source src="/videos/familia.mp4" type="video/mp4" />
                <img src="/images/craftsman.jpg" alt="Drew Bott" className="object-cover w-full h-full" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent" />
            </div>
            
            {/* Elementos Decorativos Dourados */}
            <div className="absolute -left-3 -bottom-3 w-32 h-32 border-l border-b border-primary/40 -z-0 animate-pulse" />
            <div className="absolute -right-3 -top-3 w-32 h-32 border-r border-t border-primary/20 -z-0 transition-all duration-1000 group-hover:-translate-y-2 group-hover:translate-x-2" />
          </div>

          {/* Lado do Conteúdo - Texto e Stats */}
          <div className="flex flex-col justify-center">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              className="text-[10px] tracking-[0.4em] text-primary font-bold uppercase mb-4"
            >
              Our Legacy
            </motion.p>
            
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-8 leading-tight">
              A Family Dedicated to <br/>
              <span className="italic text-white/90">the Art of Remembrance</span>
            </h2>

            <div className="space-y-6 text-base md:text-lg text-white/70 font-light leading-relaxed max-w-xl min-h-[180px]">
              {/* Efeito de Escrita no Parágrafo 1 */}
              <motion.p 
                variants={sentence} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: false, amount: 0.3 }}
              >
                {text1.split("").map((char, index) => (
                  <motion.span key={index} variants={letter}>{char}</motion.span>
                ))}
              </motion.p>

              {/* Efeito de Escrita no Parágrafo 2 com atraso */}
              <motion.p 
                variants={sentence} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delayChildren: 1.2 }}
              >
                {text2.split("").map((char, index) => (
                  <motion.span key={index} variants={letter}>{char}</motion.span>
                ))}
              </motion.p>
            </div>

            {/* Bloco de Números (Versão Minimalista Premium) */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 pt-10 border-t border-white/10">
              {[
                { n: 6, label: "Harold Schaller Awards" },
                { n: 27, label: "National First Places" },
                { n: 18, label: "Magazine Features" }
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.2 }}
                  className="text-center lg:text-left group/stat cursor-default"
                >
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    className="block font-serif text-3xl md:text-5xl text-primary transition-all duration-500 drop-shadow-[0_0_15px_rgba(200,166,106,0.18)]"
                  >
                    <Counter value={stat.n} />
                  </motion.span>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 mt-3 font-bold leading-tight group-hover/stat:text-white/60 transition-colors duration-500">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
