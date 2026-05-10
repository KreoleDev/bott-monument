"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "FIRST ENCOUNTER",
    description: "By phone, email, or in person, Drew will listen and get to know you and your loved one. This first visit can be as brief or as long as you need.",
  },
  {
    number: "02",
    title: "DESIGN PROCESS",
    description: "Drew will craft a unique memorial based on your input, then send you the designs for review. Revisions are always welcome — no question asked.",
  },
  {
    number: "03",
    title: "FINISHED PRODUCT",
    description: "Once you choose a design, Drew will provide the quote and adjust as needed to fit your budget. After approval, your memorial will be created.",
  },
];

export function Process() {
  const containerRef = useRef(null);
  
  // Script para a linha que cresce conforme o scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="process" ref={containerRef} className="py-24 md:py-15 bg-[#1c1f27] overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Header com animação de entrada */}
        <div className="flex flex-col items-center mb-24 text-center">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
            viewport={{ once: false }}
            className="text-[#f9b000] text-[10px] font-bold uppercase mb-4 transition-all duration-1000"
          >
            The Journey
          </motion.span>
          <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tight">Our Process</h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: false }}
            className="h-[1px] bg-[#f9b000] mt-8" 
          />
        </div>

        {/* Timeline Area */}
        <div className="relative">
          
          {/* Linha de Conexão Animada (Desktop) */}
          <div className="hidden md:block absolute top-[45px] left-0 right-0 h-[1px] bg-white/5 z-0">
            <motion.div 
              style={{ scaleX, originX: 0 }}
              className="h-full bg-gradient-to-r from-[#f9b000]/0 via-[#f9b000] to-[#f9b000]/0"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="relative flex flex-col items-center group"
              >
                {/* Círculo com Efeito "Float" e Glassmorphism */}
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="relative z-10 flex items-center justify-center w-24 h-24 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-10 transition-all duration-500 group-hover:border-[#f9b000]/50 group-hover:shadow-[0_0_30px_rgba(249,176,0,0.1)]"
                >
                  <span className="font-serif text-3xl text-white/20 group-hover:text-[#f9b000] transition-colors duration-500">
                    {step.number}
                  </span>
                  
                  {/* Brilho interno animado */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#f9b000]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>

                {/* Texto com entrada stagger */}
                <div className="text-center space-y-5">
                  <h3 className="font-serif text-xl text-white tracking-[0.15em] group-hover:translate-y-[-2px] transition-transform duration-500">
                    {step.title}
                  </h3>
                  
                  {/* Linha pequena que expande no hover */}
                  <div className="flex justify-center">
                    <motion.div 
                      className="h-[1px] bg-[#f9b000]/40" 
                      initial={{ width: "20px" }}
                      whileHover={{ width: "40px" }}
                    />
                  </div>

                  <p className="text-white/40 text-sm md:text-base leading-relaxed font-light max-w-[280px] group-hover:text-white/70 transition-colors duration-500">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating Quote Bottom */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          className="mt-32 flex flex-col items-center"
        >
          <div className="h-12 w-[1px] bg-gradient-to-b from-[#f9b000] to-transparent mb-8" />
          <p className="text-white/20 text-[9px] tracking-[0.4em] uppercase font-bold">
            Personalized Service Since 1970
          </p>
        </motion.div>
      </div>
    </section>
  );
}