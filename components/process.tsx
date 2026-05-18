"use client";
import { motion, useScroll, useSpring, useInView, AnimatePresence, Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const steps = [
  { 
    number: "01", 
    title: "FIRST ENCOUNTER", 
    description: "By phone, email, or in person, Drew will listen and get to know you and your loved one to understand your vision.",
    image: "/images/work-1.jpg" 
  },
  { 
    number: "02", 
    title: "DESIGN PROCESS", 
    description: "Drew will craft a unique memorial based on your input, providing detailed 3D designs for your personal review.",
    image: "/images/work-2.jpg" 
  },
  { 
    number: "03", 
    title: "FINISHED PRODUCT", 
    description: "After your final approval, the memorial is meticulously created and prepared for its lasting place of honor.",
    image: "/images/work-3.jpg" 
  },
];

export function Process() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  
  const isSectionInView = useInView(containerRef, { once: false, amount: 0.2 });
  const duration = 2400; // Tempo levemente estendido para acompanhar a barra sutil

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSectionInView) {
      setActiveIndex(0);
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
      }, duration);
    }

    return () => clearInterval(interval);
  }, [isSectionInView]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="py-24 md:py-25 bg-card overflow-hidden relative">
      <div className="absolute inset-0 bg-transparent pointer-events-none" />
      
      {/* Marca d'água tipográfica sutil integrada */}
      <div className="absolute left-6 bottom-[10%] z-0 pointer-events-none select-none hidden xl:block opacity-[0.01]">
        <h3 className="font-serif text-[15vw] text-white leading-none tracking-tighter">STEPS</h3>
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        
        {/* Cabeçalho da Seção Refinado */}
        <div className="flex flex-col items-center mb-28 text-center space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-6 bg-primary/40" />
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0.3em" }}
              animate={isSectionInView ? { opacity: 0.75, letterSpacing: "0.6em" } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-primary text-[10px] font-bold uppercase tracking-[0.6em]"
            >
              The Journey
            </motion.span>
            <div className="h-[1px] w-6 bg-primary/40" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-white tracking-tight">
            Our <span className="italic font-light text-white/80">Process</span>
          </h2>
        </div>

        <div className="relative">
          {/* Linha de progresso no fundo mais sutil */}
          <div className="hidden md:block absolute top-[88px] left-[10%] right-[10%] h-[1px] bg-white/[0.03] z-0">
            <motion.div style={{ scaleX, originX: 0 }} className="h-full bg-gradient-to-r from-primary/20 via-primary/70 to-primary/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 mb-24">
            {steps.map((step, index) => {
              const isCompletedOrActive = activeIndex >= index;
              const isJustActive = activeIndex === index;

              return (
                <div 
                  key={index} 
                  className="relative flex flex-col items-center cursor-pointer group select-none"
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Container do Círculo */}
                  <div className="relative z-30 mb-8">
                    
                    {/* Loader Circular SVG Avançado */}
                    <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] -rotate-90 pointer-events-none">
                      <circle
                        cx="50%" cy="50%" r="46%"
                        stroke="currentColor" strokeWidth="1" fill="transparent"
                        className="text-white/[0.02]"
                      />
                      {isJustActive && isSectionInView && (
                        <motion.circle
                          cx="50%" cy="50%" r="46%"
                          stroke="#C8A66A" strokeWidth="1.5" fill="transparent"
                          strokeDasharray="100 100"
                          initial={{ strokeDashoffset: 100 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: duration / 1000, ease: "linear" }}
                        />
                      )}
                    </svg>

                    {/* Moldura da Imagem Circular de Luxo */}
                    <motion.div 
                      animate={{ 
                        scale: isJustActive ? 1.08 : 1,
                        borderColor: isJustActive ? "#C8A66A" : isCompletedOrActive ? "rgba(200,166,106,0.45)" : "rgba(255,255,255,0.25)",
                        boxShadow: isJustActive ? "0 0 26px rgba(200,166,106,0.16)" : "0 8px 18px rgba(0,0,0,0.08)"
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-36 h-36 md:w-44 md:h-44 rounded-full border overflow-hidden bg-secondary relative z-20"
                    >
                      <motion.img 
                        src={step.image}
                        alt={step.title}
                        animate={{ 
                          opacity: 1,
                          filter: isCompletedOrActive ? "grayscale(0%) blur(0px)" : "grayscale(12%) blur(0px)",
                        }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0 w-full h-full object-cover scale-102 group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Número do Passo integrado de forma elegante */}
                      {!isCompletedOrActive && (
                        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                          <span className="font-serif text-lg tracking-widest text-white/70">{step.number}</span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Metadado Acima do Título */}
                  <motion.span 
                    animate={{ opacity: isJustActive ? 0.75 : 0.55 }}
                    className="text-[9px] font-sans font-bold tracking-[0.3em] text-white mb-2"
                  >
                    PHASE {step.number}
                  </motion.span>

                  {/* Título do Passo com Contraste */}
                  <motion.h3 
                    animate={{ 
                      color: isCompletedOrActive ? "#ffffff" : "rgba(255,255,255,0.76)",
                      letterSpacing: isJustActive ? "0.25em" : "0.15em"
                    }}
                    className="font-serif text-base md:text-lg tracking-[0.15em] uppercase text-center relative z-30 transition-all duration-500"
                  >
                    {step.title}
                  </motion.h3>
                </div>
              );
            })}
          </div>

          {/* ÁREA DE CONTEÚDO DINÂMICO PREMIUM */}
          <div className="max-w-3xl mx-auto text-center min-h-[120px] flex flex-col items-center justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-6 flex flex-col items-center"
              >
                <p className="text-[#ddd5c8] text-base md:text-xl font-light leading-relaxed max-w-2xl px-4 font-serif italic">
                  "{steps[activeIndex].description}"
                </p>
                
                {/* Indicador de progresso em linha abaixo do bloco descritivo */}
                <div className="flex items-center gap-2 mt-2">
                  {steps.map((_, dotIndex) => (
                    <div 
                      key={dotIndex} 
                      className={`h-[2px] transition-all duration-500 ${
                        activeIndex === dotIndex ? "w-8 bg-primary" : "w-2 bg-white/10"
                      }`} 
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
