import { Header } from "../components/header"
import { Hero } from "../components/hero"
import { Philosophy } from "../components/philosophy" 
import { Process } from "../components/process"     
import { PremiumGallery } from "../components/premium-gallery"
import { About } from "../components/about"
import { Features } from "../components/features"
import { Testimonials } from "../components/testimonials"
import { Contact } from "../components/contact"
import { Footer } from "../components/footer"
import { Stats } from "../components/stats"
import { ScrollAnimateSection, SectionTransition, ScrollRevealSection } from "../components/scroll-animate-section"
import { SectionDivider } from "../components/ui/section-divider"
import { getArtworks, getCategories } from "@/lib/actions"

export default async function HomePage() {
  const [artworks, categories] = await Promise.all([
    getArtworks(),
    getCategories()
  ])

  return (
    <main className="min-h-screen bg-background relative select-none overflow-x-hidden">
      <Header />
      
      {/* 1. Impacto Inicial - Hero com fade dramático */}
      <ScrollAnimateSection fadeOut={true}>
        <Hero />
      </ScrollAnimateSection>

      {/* 2. Manifesto Artistico - Entrada cinematográfica */}
      <SectionTransition>
        <Philosophy />
      </SectionTransition>

      {/* Divisor premium */}
      <SectionDivider variant="elegant" />

      {/* 3. Estatísticas Animadas */}
      <ScrollRevealSection direction="up">
        <Stats />
      </ScrollRevealSection>

      {/* Divisor premium */}
      <SectionDivider variant="diamond" />

      {/* 4. Processo - Revelação lateral */}
      <ScrollRevealSection direction="up">
        <Process />
      </ScrollRevealSection>

      {/* Divisor premium */}
      <SectionDivider variant="lines" />

      {/* 5. Galeria Premium - Transição suave */}
      <SectionTransition>
        <PremiumGallery artworks={artworks} categories={categories} />
      </SectionTransition>

      {/* Divisor premium */}
      <SectionDivider variant="dots" />

      {/* 6. Sobre - Entrada da esquerda */}
      <ScrollRevealSection direction="left">
        <About />
      </ScrollRevealSection>
      
      {/* 7. Features - Entrada da direita */}
      <ScrollRevealSection direction="right">
        <Features />
      </ScrollRevealSection>

      {/* Divisor premium */}
      <SectionDivider variant="elegant" />

      {/* 8. Depoimentos - Transição cinematográfica */}
      <SectionTransition>
        <Testimonials />
      </SectionTransition>

      {/* Divisor premium */}
      <SectionDivider variant="lines" />
      
      {/* 9. Contacto - Revelação final */}
      <ScrollRevealSection direction="up">
        <Contact />
      </ScrollRevealSection>
      
      <Footer />
    </main>
  )
}
