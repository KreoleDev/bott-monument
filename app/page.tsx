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
import { ScrollAnimateSection, SectionTransition } from "../components/scroll-animate-section"
import { getArtworks, getCategories } from "@/lib/actions"

export default async function HomePage() {
  const [artworks, categories] = await Promise.all([
    getArtworks(),
    getCategories()
  ])

  return (
    <main className="min-h-screen bg-background relative select-none">
      <Header />
      
      {/* 1. Impacto Inicial */}
      <ScrollAnimateSection fadeOut={true}>
        <Hero />
      </ScrollAnimateSection>

      {/* 2. Manifesto Artistico */}
      <SectionTransition>
        <Philosophy />
      </SectionTransition>

      {/* 3. Demonstracao de Organizacao e Cuidado */}
      <SectionTransition>
        <Process />
      </SectionTransition>

      {/* 4. Galeria Premium Dinamica */}
      <SectionTransition>
        <PremiumGallery artworks={artworks} categories={categories} />
      </SectionTransition>

      {/* 5. Historia da Familia e Detalhes de Engenharia */}
      <SectionTransition>
        <About />
      </SectionTransition>
      
      <SectionTransition>
        <Features />
      </SectionTransition>

      {/* 6. Conexao Emocional (Depoimentos de Familias) */}
      <SectionTransition>
        <Testimonials />
      </SectionTransition>
      
      {/* 7. Fechamento e Acao */}
      <SectionTransition>
        <Contact />
      </SectionTransition>
      
      <Footer />
    </main>
  )
}
