"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const slides = [
  { src: "/images/work-1.jpg", white: "A morte não é", gold: "o fim da história." },
  { src: "/images/work-2.jpg", white: "Eternizamos", gold: "quem você amou." },
  { src: "/images/work-3.jpg", white: "Gravado na pedra.", gold: "Eterno na memória." },
  { src: "/images/work-4.jpg", white: "Cada vida merece", gold: "ser lembrada." },
  { src: "/images/work-5.jpg", white: "Uma homenagem", gold: "que dura para sempre." },
  { src: "/images/work-6.jpg", white: "Arte e devoção", gold: "em cada detalhe." },
  { src: "/images/work-7.jpg", white: "A sua história", gold: "merece ser contada." },
  { src: "/images/work-8.jpg", white: "40 anos a esculpir", gold: "memórias eternas." },
]

const allSlides = [...slides, ...slides, ...slides]

export function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [phraseVisible, setPhraseVisible] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const posRef = useRef(0)
  const animRef = useRef<number>()

// 1. Unificamos o movimento e a lógica de detecção da frase
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const CARD_HEIGHT = 280 
    const TOTAL = slides.length * CARD_HEIGHT

    function step() {
      // Move o scroll
      posRef.current += 0.75
      if (posRef.current >= TOTAL) {
        posRef.current = 0
      }
      if (el) el.style.transform = `translateY(-${posRef.current}px)`

      // SINCRONIA: Descobre qual slide está passando no meio do quadro agora
      // Dividimos a posição atual pela altura do card para saber o index
      const middleOfFrame = posRef.current + (CARD_HEIGHT / 2)
      const activeIndex = Math.floor((middleOfFrame % TOTAL) / CARD_HEIGHT)

      // Só atualizamos o estado se o slide mudar, para não sobrecarregar o React
      setCurrentPhrase((prev) => {
        if (prev !== activeIndex) {
          // 1. Esconde o texto atual
          setPhraseVisible(false) 
          
          // 2. Espera a animação de saída (300ms) e troca o texto
          setTimeout(() => {
            setCurrentPhrase(activeIndex)
            setPhraseVisible(true) // Mostra o novo texto
          }, 310)
          
          return prev // Mantém o anterior até o timeout terminar
        }
        return prev
      })

      animRef.current = requestAnimationFrame(step)
    }
    
    animRef.current = requestAnimationFrame(step)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  // Partículas douradas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let animId: number

    const stars = Array.from({ length: 180 }, () => {
      const type = Math.random()
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: type < 0.7 ? Math.random() * 1.8 + 0.8 : type < 0.95 ? Math.random() * 1.8 + 0.8 : Math.random() * 2.5 + 1.5,
        o: type < 0.7 ? Math.random() * 0.6 + 0.3 : type < 0.95 ? Math.random() * 0.5 + 0.3 : Math.random() * 0.8 + 0.6,
        type,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        pulse: Math.random() * Math.PI * 2,
      }
    })

    function resize() {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize)
    let tick = 0

    function draw() {
      tick++
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach((s) => {
        s.x += s.vx
        s.y += s.vy
        if (s.x < 0) s.x = window.innerWidth
        if (s.x > window.innerWidth) s.x = 0
        if (s.y < 0) s.y = window.innerHeight
        if (s.y > window.innerHeight) s.y = 0

        const pulse = Math.sin(tick * 0.02 + s.pulse) * 0.4 + 0.8
        if (s.type > 0.95) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 8)
          glow.addColorStop(0, "rgba(240,208,128,0.9)")
          glow.addColorStop(1, "rgba(197,160,89,0)")
          ctx.fillStyle = glow
          ctx.globalAlpha = 0.7 * pulse
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r * 8, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.type > 0.95 ? "#F0D080" : s.type > 0.7 ? "#D6B46A" : "#C5A059"
        ctx.globalAlpha = s.o * pulse
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" />

      <div className="absolute inset-0 pointer-events-none z-[1]"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(197,160,89,0.07) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
        
        {/* Quadro de Pedra - Versão Melhorada */}
        <div className="relative flex-shrink-0" style={{ animation: "fadeUp 1s ease 0.3s both" }}>
          <div className="relative" style={{
            width: "clamp(280px, 40vw, 430px)", // Ajustei para um porte mais elegante
            height: "clamp(450px, 65vw, 510px)",
            borderRadius: 32, // Bordas mais arredondadas para um ar premium
            padding: 14,
            background: "linear-gradient(145deg, #2b2b2b, #0f0f0f)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,255,255,0.05)",
          }}>
            
            {/* O Visor Interno */}
            <div className="relative overflow-hidden w-full h-full rounded-[24px] bg-black">
              
              {/* 1. MÁSCARA DE GRADIENTE (O Toque de Mestre) */}
              {/* Esse overlay cria o efeito de que as fotos surgem e somem suavemente */}
              <div className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, #000 0%, transparent 15%, transparent 85%, #000 100%)"
                }}
              />

              {/* 2. SOMBRA INTERNA PARA PROFUNDIDADE */}
              <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]" />

              {/* Container do Scroll */}
              <div ref={scrollRef} className="absolute left-0 right-0 top-0 will-change-transform">
                {allSlides.map((slide, i) => (
                  <div key={i} className="relative w-full h-[280px] p-2">
                    <div className="relative w-full h-full rounded-xl overflow-hidden grayscale-[0.2] hover:grayscale-0 transition-all duration-700">
                      <Image 
                        src={slide.src} 
                        alt={slide.white} 
                        fill 
                        className="object-cover" 
                        priority={i < 3} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-[10px] text-white/60 font-serif tracking-widest uppercase">
                          {slide.white} <span className="text-[#C5A059]">{slide.gold}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Texto Lado Direito */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-lg">
          <div className="flex items-center gap-3 mb-8" style={{ animation: "fadeUp 0.8s ease 0.2s both" }}>
            <div className="w-6 h-px bg-[#C5A059]/50" />
            <p className="text-[10px] tracking-[0.5em] text-[#C5A059]/80 uppercase font-bold">Stone Art Since 1985</p>
          </div>

          <div className="mb-6 h-[160px] lg:h-[180px] flex flex-col justify-center" style={{
            transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            opacity: phraseVisible ? 1 : 0,
            transform: phraseVisible ? "translateY(0)" : "translateY(10px)",
            filter: phraseVisible ? "blur(0px)" : "blur(12px)",
          }}>
            <h1 className="font-serif font-bold text-white leading-[0.88] tracking-[-0.04em] mb-1" style={{ fontSize: "clamp(32px, 5vw, 60px)" }}>
              {slides[currentPhrase].white}
            </h1>
            <h1 className="font-serif font-light italic leading-[0.88] tracking-[-0.04em]" style={{
              fontSize: "clamp(32px, 5vw, 60px)",
              background: "linear-gradient(135deg, #C5A059 0%, #F0D080 50%, #A07830 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              {slides[currentPhrase].gold}
            </h1>
          </div>

          <p className="text-sm md:text-base text-white/40 leading-relaxed font-light mb-10" style={{ animation: "fadeUp 0.8s ease 0.8s both" }}>
            We design timeless memorials with precision and care —<br />
            each piece telling a story that lives beyond time.
          </p>

          {/* Botões */}
          <div className="flex flex-col gap-6 items-center lg:items-start">
            <div style={{ animation: "fadeUp 0.8s ease 1s both" }}>
              <Button 
                size="lg" 
                className="rounded-full px-8 py-6 text-sm font-bold text-black bg-[#C5A059] relative overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(197,160,89,0.4)]" 
                asChild
              >
                <Link href="#contato">
                  {/* Brilho que passa sozinho a cada 3 segundos */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[shimmer_2s_infinite] skew-x-[-25deg]" />
                  
                  {/* Aura de pulso externa (opcional, via CSS abaixo) */}
                  <div className="absolute inset-0 rounded-full animate-[pulseAura_2s_infinite] pointer-events-none shadow-[0_0_0_0_rgba(197,160,89,0.7)]" />

                  <span className="relative z-10 flex items-center gap-3 tracking-wider">
                    <span className="text-xl">⚒</span> SOLICITE O SEU MONUMENTO
                  </span>
                </Link>
              </Button>
            </div>

            <Link href="#sobre" className="flex items-center gap-4 group" style={{ animation: "fadeUp 0.8s ease 1.2s both" }}>
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-white/10 transition-all group-hover:border-[#C5A059]/50">
                <span className="text-white/30 group-hover:text-[#C5A059]">⬦</span>
                <div className="absolute inset-0 border-t border-[#C5A059] opacity-0 group-hover:opacity-100 rounded-full animate-spin" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase font-bold group-hover:text-white">Explorar Galeria</span>
                <span className="text-[12px] text-[#C5A059]/60 font-serif italic">Obras que transcendem o tempo</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      /* Faz o brilho atravessar o botão continuamente */
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-20deg); }
          25% { transform: translateX(150%) skewX(-20deg); }
          100% { transform: translateX(150%) skewX(-20deg); }
        }

        /* Faz uma "onda" de luz sair do botão para chamar atenção */
        @keyframes pulseAura {
          0% { box-shadow: 0 0 0 0 rgba(197,160,89,0.7); }
          70% { box-shadow: 0 0 0 10px rgba(197,160,89,0); }
          100% { box-shadow: 0 0 0 0 rgba(197,160,89,0); }
        }
        h1 {
          will-change: transform, opacity, filter;
        }
      `}</style>
    </section>
  )
}