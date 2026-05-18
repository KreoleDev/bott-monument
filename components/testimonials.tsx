"use client";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const reviews = [
  {
    quote: "Drew turned a difficult moment into a beautiful, lasting tribute. His attention to detail and patience in capturing my husband's legacy exceeded every expectation.",
    author: "Eleanor Vance",
    location: "Wyoming"
  },
  {
    quote: "The craftsmanship is unmatched. Seeing the completed monument in place brought a profound sense of peace to our entire family. A true work of art.",
    author: "Thomas Sterling",
    location: "Colorado"
  }
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const duration = 5000; // 5 segundos por depoimento

  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, duration);
    return () => clearInterval(timer);
  }, [isInView]);

  // Variantes para a animação das palavras dentro da citação
  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.1 }
    }
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: "easeOut" } 
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="testimonials" 
      className="py-24 md:py-20 bg-secondary relative overflow-hidden border-b border-white/[0.02]"
    >
      {/* Aspas Gigantes de Fundo Artístico */}
      <motion.div 
        animate={isInView ? { opacity: 0.03, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1 }}
        className="absolute left-1/2 top-12 -translate-x-1/2 font-serif text-[30vw] leading-none text-primary pointer-events-none select-none z-0"
      >
        “
      </motion.div>

      <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
        
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={isInView ? { opacity: 0.75, letterSpacing: "0.5em" } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] tracking-[0.5em] text-primary font-bold uppercase mb-16"
        >
          Gratitude
        </motion.p>

        {/* Área de Conteúdo Dinâmico */}
        <div className="min-h-[220px] md:min-h-[160px] relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
              className="space-y-8"
            >
              {/* Citação partida por palavras com efeito blur-reveal de luxo */}
              <motion.q 
                variants={containerVariants}
                className="font-serif text-xl md:text-3xl text-[#f1eadf] leading-relaxed italic block max-w-3xl font-light px-2 md:px-6"
              >
                {reviews[index].quote.split(" ").map((word, i) => (
                  <motion.span key={i} variants={wordVariants} className="inline-block mr-1.5 md:mr-2">
                    {word}
                  </motion.span>
                ))}
              </motion.q>
              
              {/* Autor e Localização surgindo suavemente após as palavras */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-sm tracking-wide"
              >
                <span className="text-primary font-medium">{reviews[index].author}</span>
                <span className="text-[#b8ad9e] font-light"> — {reviews[index].location}</span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Linhas de Navegação Estilo Timed-Loader */}
        <div className="flex justify-center items-center gap-3 mt-16">
          {reviews.map((_, dotIndex) => {
            const isCurrent = index === dotIndex;
            return (
              <button
                key={dotIndex}
                onClick={() => setIndex(dotIndex)}
                className="h-[2px] bg-white/10 relative overflow-hidden transition-all duration-500"
                style={{ width: isCurrent ? "48px" : "16px" }}
              >
                {/* Esta barra interna cresce de 0% a 100% no tempo exato do depoimento ativo */}
                {isCurrent && isInView && (
                  <motion.div
                    initial={{ left: "-100%" }}
                    animate={{ left: "0%" }}
                    transition={{ duration: duration / 1000, ease: "linear" }}
                    className="absolute inset-0 bg-primary origin-left"
                  />
                )}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
