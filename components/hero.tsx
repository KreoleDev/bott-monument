"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Hammer } from "lucide-react"

const scenes = [
  {
    id: 0,
    watermark: "NOS CONHEÇA",
    badge: "— Stone arte since 1985 —",
    titleGold: "ETERNIZAMOS",
    titleWhite: "QUEM VOCÊ AMOU...",
    sub: null,
    imageSide: "/images/work-1.jpg",
    imageBg: null,
    glow: true,
    arrows: "white",
  },
  {
    id: 1,
    watermark: "NOS CONHEÇA",
    badge: null,
    titleGold: null,
    titleWhite: "CADA VIDA MERECE\nSER LEMBRADA...",
    sub: null,
    imageSide: "/images/workremove1.png",
    imageSide2: "/images/workremove2.png",
    imageBg: null,
    glow: false,
    arrows: "white",
  },
  {
    id: 2,
    watermark: "ST. CLAIR",
    badge: null,
    titleGold: "40 ANOS A ESCULPIR",
    titleWhite: "MEMÓRIAS ETERNAS",
    sub: "UMA HOMENAGEM PARA SEMPRE",
    imageSide: null,
    imageBg: "/images/work-3.jpg",
    glow: false,
    arrows: "gold",
  },
  {
    id: 3,
    watermark: "ARTE E DEVOÇÃO",
    badge: null,
    titleGold: "ARTE E DEVOÇÃO",
    titleWhite: null,
    sub: "EM CADA DETALHE",
    imageSide: null,
    imageBg: "/images/work-3.jpg",
    glow: false,
    arrows: "none",
    logo: true,
  },
]

export function Hero() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)
  const [revealed, setRevealed] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function startTimer(from: number) {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => transition((from + 1) % scenes.length), 5500)
  }

  function transition(n: number) {
    setVisible(false)
    setRevealed(false)
    setTimeout(() => {
      setCurrent(n)
      setVisible(true)
      setTimeout(() => setRevealed(true), 100)
      startTimer(n)
    }, 450)
  }

  const videoRef = useRef<HTMLVideoElement>(null);

  function goTo(n: number) {
    if (n === current) return;
    if (videoRef.current) {
      videoRef.current.currentTime = n * 5.5; // Pula para 0s, 5.5s, 11s ou 16.5s
    }
    transition(n);
  }

  useEffect(() => {
    setTimeout(() => setRevealed(true), 300)
    startTimer(0)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const scene = scenes[current]
  const arrowColor = scene.arrows === "gold" ? "#f9b000" : "rgba(255,255,255,0.7)"

  return (
    <section
      className="relative w-full overflow-hidden bg-[#1a1d23]"
      style={{ minHeight: "calc(100vh - 80px)", height: "calc(100vh - 80px)", marginTop: "80px" }}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300;400;700&display=swap');
      `}</style>

     {/* VÍDEO DE FUNDO FIXO */}
      <div className="absolute inset-0 z-[0]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
    {/* ESTE É O CÓDIGO NOVO QUE SUBSTITUI A DIV ANTIGA: */}
      <div className="absolute inset-0 bg-black/30" /> {/* Escurecimento base */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: "radial-gradient(circle at center, transparent 0%, rgba(26,29,35,0.8) 100%)" 
        }} 
      />
      </div>

      <div
        className="absolute top-0 left-0 right-0 z-[2] pointer-events-none"
        style={{
          height: "120px",
          background: "linear-gradient(to bottom, #1a1d23 0%, #1a1d23 40%, transparent 100%)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none"
        style={{
          height: "clamp(80px, 15vh, 208px)",
          background: "linear-gradient(to top, #1a1d23 0%, transparent 100%)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 text-center pointer-events-none z-[1] select-none"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(40px, 13vw, 140px)",
          color: "rgba(255,255,255,0.04)",
          letterSpacing: "0.12em",
          lineHeight: 1,
          transition: "opacity 0.5s ease",
          opacity: visible ? 1 : 0,
        }}
      >
        {scene.watermark}
      </div>

      {scene.arrows !== "none" && (
        <>
          <svg
            className="absolute z-[5] pointer-events-none hidden sm:block"
            style={{ bottom: "clamp(100px, 18vh, 150px)", left: "clamp(8px, 2vw, 24px)" }}
            width="40" height="40" viewBox="0 0 40 40"
          >
            <polyline points="35,5 5,20 35,35" fill="none" stroke={arrowColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg
            className="absolute z-[5] pointer-events-none hidden sm:block"
            style={{ bottom: "clamp(100px, 18vh, 150px)", right: "clamp(8px, 2vw, 24px)" }}
            width="40" height="40" viewBox="0 0 40 40"
          >
            <polyline points="5,5 35,20 5,35" fill="none" stroke={arrowColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </>
      )}

      {scene.badge && (
        <div
          className="absolute z-10 whitespace-nowrap text-center"
          style={{
            top: "clamp(16px, 5vh, 40px)",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(8px, 1.3vw, 12px)",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          — Stone arte since <span style={{ color: "#f9b000" }}>1985</span> —
        </div>
      )}

      <div
        className="absolute inset-0 z-[4] flex flex-col"
        style={{ paddingBottom: "clamp(120px, 22vh, 180px)" }}
      >
        <div
          className="flex-1 flex items-center justify-center px-4 sm:px-8 md:px-16"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.45s ease",
          }}
        >
          {/* CENA 1 */}
          {scene.id === 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-5xl gap-6 sm:gap-8">
              <div className="flex-1 min-w-0 text-center sm:text-left">
              <div style={{ 
                  fontFamily: "'Bebas Neue', sans-serif", 
                  fontSize: "clamp(36px, 8vw, 96px)", 
                  lineHeight: 0.95, 
                  overflow: "hidden" // Esconde o texto enquanto ele está "embaixo"
                }}>
                  <div style={{
                    color: "#f9b000",
                    transform: revealed ? "translateY(0)" : "translateY(105%)", // Move de baixo para cima
                    transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)", // Transição suave "Power4"
                  }}>
                    {scene.titleGold}
                  </div>
                </div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(36px, 8vw, 96px)",
                  lineHeight: 0.95,
                  color: "#fff",
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
                }}>
                  {scene.titleWhite}
                </div>
              </div>
            </div>
          )}

          {/* CENA 2 */}
          {scene.id === 1 && (
            <div className="flex items-center justify-center w-full max-w-5xl gap-4 sm:gap-6">
              <div className="flex-1 min-w-0 text-center">
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(24px, 5.5vw, 78px)",
                  letterSpacing: "0.05em",
                  lineHeight: "1",
                  color: "#fff",
                  textShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                  transition: "all 0.8s cubic-bezier(0.2, 0, 0.2, 1) 0.3s",
                }}>
                  {scene.titleWhite}
                </div>
              </div>

            </div>
          )}

          {/* CENA 3 */}
          {scene.id === 2 && (
            <div className="flex flex-col items-center text-center gap-4 sm:gap-5 max-w-3xl w-full px-4">
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(28px, 6.5vw, 86px)",
                lineHeight: 0.95,
                color: "#f9b000",
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
              }}>
                {scene.titleGold}
              </div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(28px, 6.5vw, 86px)",
                lineHeight: 0.95,
                color: "#fff",
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s",
              }}>
                {scene.titleWhite}
              </div>
              <div style={{
                border: "1px solid rgba(249,176,0,0.5)",
                borderRadius: 999,
                padding: "6px 24px",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(9px, 1.4vw, 14px)",
                letterSpacing: "0.25em",
                color: "rgba(255,255,255,0.6)",
                opacity: revealed ? 1 : 0,
                transition: "opacity 0.6s ease 0.5s",
              }}>
                {scene.sub}
              </div>
            </div>
          )}

          {/* CENA 4 */}
          {scene.id === 3 && (
            <div className="flex flex-col items-center text-center gap-4 sm:gap-5">
              <div className="relative mb-2" style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "scale(1)" : "scale(0.5)",
                transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)"
              }}>
                <div className="absolute inset-0 bg-[#f9b000] blur-2xl opacity-20 rounded-full" />
                <Hammer size={56} strokeWidth={1.5} className="text-[#f9b000] relative z-10" />
              </div>

              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(32px, 7.5vw, 90px)",
                lineHeight: 0.95,
                color: "#f9b000",
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
              }}>
                {scene.titleGold}
              </div>

              <div style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(10px, 1.8vw, 18px)",
                letterSpacing: "0.4em",
                color: "rgba(255,255,255,0.45)",
                opacity: revealed ? 1 : 0,
                transition: "opacity 0.8s ease 0.7s",
              }}>
                {scene.sub}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dots */}
      <div
        className="absolute z-10 flex gap-2"
        style={{ bottom: "clamp(80px, 13vh, 110px)", left: "50%", transform: "translateX(-50%)" }}
      >
        {scenes.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Cena ${i + 1}`}
            style={{
              width: i === current ? 22 : 6,
              height: 6,
              borderRadius: i === current ? 3 : "50%",
              background: i === current ? "#f9b000" : "rgba(255,255,255,0.2)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Botões rodapé */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center gap-3 px-4 sm:px-6"
        style={{
          paddingBottom: "clamp(12px, 2.5vh, 24px)",
          animation: "fadeUp 0.8s ease 0.5s both",
        }}
      >
        <Button
          size="lg"
          className="rounded-full px-6 md:px-10 py-5 md:py-6 text-xs md:text-sm font-bold text-[#1a1d23] bg-[#f9b000] relative overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_24px_rgba(249,176,0,0.45)] w-full max-w-xs md:max-w-sm"
          asChild
        >
          <Link href="#contato">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite] skew-x-[-25deg]" />
            <div className="absolute inset-0 rounded-full animate-[pulseAura_2s_infinite] pointer-events-none" />
            <span className="relative z-10 flex items-center gap-3 tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}>
              <span className="text-lg">⚒</span> SOLICITE O SEU MONUMENTO
            </span>
          </Link>
        </Button>

        <Link href="#sobre" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-white/10 transition-all group-hover:border-[#f9b000]/50 flex-shrink-0">
            <span className="text-white/30 group-hover:text-[#f9b000] text-sm">⬦</span>
            <div className="absolute inset-0 border-t border-[#f9b000] opacity-0 group-hover:opacity-100 rounded-full animate-spin" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase font-bold group-hover:text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Explorar Galeria
            </span>
            <span className="text-[11px] text-[#f9b000]/60 font-serif italic">
              Obras que transcendem o tempo
            </span>
          </div>
        </Link>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-150%) skewX(-20deg); }
          30%  { transform: translateX(150%)  skewX(-20deg); }
          100% { transform: translateX(150%)  skewX(-20deg); }
        }
        @keyframes pulseAura {
          0%   { box-shadow: 0 0 0 0    rgba(249,176,0,0.7); }
          70%  { box-shadow: 0 0 0 12px rgba(249,176,0,0);   }
          100% { box-shadow: 0 0 0 0    rgba(249,176,0,0);   }
        }
      `}</style>
    </section>
  )
}