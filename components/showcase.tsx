"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const projects = [
  { title: "The Eternal Granite", category: "Classic Memorials", image: "/images/work-1.jpg" },
  { title: "Serenity Marble", category: "Custom Sculptures", image: "/images/work-2.jpg" },
  { title: "Legacy in Stone", category: "Contemporary Art", image: "/images/work-3.jpg" },
];

export function Showcase() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });

  return (
    // Mudamos o fundo para #090909 (um toque mais profundo) e adicionamos uma borda sutil no topo
    <section ref={containerRef} id="showcase" className="py-24 md:py-36 bg-secondary relative overflow-hidden border-t border-white/[0.02]">
      
      {/* LUXO: Um leve brilho dourado de fundo para separar esta seção do Process */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/[0.02] blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        
        {/* Cabeçalho Assimétrico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-end">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-primary text-[10px] font-bold uppercase tracking-[0.6em]">Portfolio</span>
              <div className="h-[1px] w-12 bg-primary/30" />
            </div>
            <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tight">
              Monuments of <span className="italic font-light text-primary/90">Distinction</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <p className="text-zinc-500 font-light text-sm md:text-base max-w-md lg:ml-auto font-serif italic">
              "Every piece is carved with a magazine cover in mind, preserving memories for generations."
            </p>
          </div>
        </div>

        {/* Grid de Imagens Verticais (Estilo Revista) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {projects.map((project, index) => {
            // Desalinhamento proposital: o segundo bloco desce, quebrando a mesmice do Process
            const yOffset = index === 1 ? "md:translate-y-16" : index === 2 ? "md:translate-y-8" : "";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                className={`relative group cursor-pointer ${yOffset}`}
              >
                <div className="relative aspect-[2/3] overflow-hidden bg-zinc-900 border border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-700" />
                  
                  {/* Conteúdo que aparece elegantemente */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <span className="text-[9px] text-primary font-bold uppercase tracking-[0.25em] mb-2">
                      {project.category}
                    </span>
                    <h3 className="font-serif text-xl text-white tracking-wide group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}