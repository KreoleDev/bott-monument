"use client";
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion";
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
  const containerRef = useRef(null);
  
  // Detecta se a seção está visível para iniciar e resetar o loop
  const isSectionInView = useInView(containerRef, { amount: 0.3 });
  
  const duration = 2000; // Tempo equilibrado para leitura e animação

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSectionInView) {
      // Reinicia sempre do primeiro passo ao entrar na seção
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
    <section ref={containerRef} className="py-24 bg-[#121212] overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col items-center mb-24 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.5, y: 0 }}
            className="text-primary text-[10px] font-bold uppercase tracking-[0.6em] mb-4"
          >
            The Journey
          </motion.span>
          <h2 className="font-serif text-5xl md:text-6xl text-white tracking-tight">
            Our Process
          </h2>
        </div>

        <div className="relative">
          {/* Linha de progresso sutil ligando os círculos */}
          <div className="hidden md:block absolute top-[88px] left-0 right-0 h-[1px] bg-white/[0.05] z-0">
            <motion.div style={{ scaleX, originX: 0 }} className="h-full bg-primary/30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mb-20">
            {steps.map((step, index) => {
              // Lógica de ACUMULAÇÃO: passos anteriores continuam acesos
              const isCompletedOrActive = activeIndex >= index;
              const isJustActive = activeIndex === index;

              return (
                <div 
                  key={index} 
                  className="relative flex flex-col items-center cursor-pointer group"
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Container do Círculo */}
                  <div className="relative z-30 mb-8">
                    {/* Loader Circular SVG - Aparece apenas no passo atual */}
                    <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] -rotate-90">
                      <circle
                        cx="50%" cy="50%" r="46%"
                        stroke="currentColor" strokeWidth="1" fill="transparent"
                        className="text-white/[0.03]"
                      />
                      {isJustActive && isSectionInView && (
                        <motion.circle
                          cx="50%" cy="50%" r="46%"
                          stroke="#C8A66A" strokeWidth="2" fill="transparent"
                          strokeDasharray="100 100"
                          initial={{ strokeDashoffset: 100 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: duration / 1000, ease: "linear" }}
                        />
                      )}
                    </svg>

                    {/* Moldura da Imagem */}
                    <motion.div 
                      animate={{ 
                        scale: isJustActive ? 1.1 : isCompletedOrActive ? 1 : 0.9,
                        borderColor: isCompletedOrActive ? "#C8A66A" : "rgba(255,255,255,0.1)",
                        boxShadow: isJustActive ? "0 0 30px rgba(200,166,106,0.2)" : "0 0 0px rgba(0,0,0,0)"
                      }}
                      className="w-36 h-36 md:w-44 md:h-44 rounded-full border overflow-hidden bg-neutral-900 relative transition-all duration-700"
                    >
                      <motion.img 
                        src={step.image}
                        alt={step.title}
                        animate={{ 
                          opacity: isCompletedOrActive ? 1 : 0.15,
                          filter: isCompletedOrActive ? "grayscale(0%) blur(0px)" : "grayscale(100%) blur(4px)",
                        }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      
                      {/* Número do Passo (apenas se não estiver carregado) */}
                      {!isCompletedOrActive && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <span className="font-serif text-xl text-white/20">{step.number}</span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Título do Passo */}
                  <motion.h3 
                    animate={{ 
                      color: isCompletedOrActive ? "#ffffff" : "rgba(255,255,255,0.2)",
                      y: isJustActive ? 0 : 5
                    }}
                    className="font-serif text-lg md:text-xl tracking-[0.2em] uppercase text-center relative z-30"
                  >
                    {step.title}
                  </motion.h3>
                </div>
              );
            })}
          </div>

          {/* ÁREA DE CONTEÚDO DINÂMICO (Preenche o vazio da imagem image_78be54.png) */}
          <div className="max-w-3xl mx-auto text-center min-h-[100px] flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <p className="text-white/50 text-base md:text-lg font-light leading-relaxed italic px-4">
                  "{steps[activeIndex].description}"
                </p>
                <div className="flex justify-center items-center gap-4">
                  <div className="h-[1px] w-12 bg-primary/20" />
                  <span className="text-primary font-serif italic text-sm">Step {steps[activeIndex].number}</span>
                  <div className="h-[1px] w-12 bg-primary/20" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}