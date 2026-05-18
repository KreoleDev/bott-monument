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
import { ScrollAnimateSection } from "../components/scroll-animate-section"
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
      <ScrollAnimateSection>
        <Hero />
      </ScrollAnimateSection>

      {/* 2. Manifesto Artistico */}
      <ScrollAnimateSection>
        <Philosophy />
      </ScrollAnimateSection>

      {/* 3. Demonstracao de Organizacao e Cuidado */}
      <ScrollAnimateSection>
        <Process />
      </ScrollAnimateSection>

      {/* 4. Galeria Premium Dinamica */}
      <PremiumGallery artworks={artworks} categories={categories} />

      {/* 5. Historia da Familia e Detalhes de Engenharia */}
      <About />
      <Features />

      {/* 6. Conexao Emocional (Depoimentos de Familias) */}
      <Testimonials />
      
      {/* 7. Fechamento e Acao */}
      <Contact />
      <Footer />
    </main>
  )
}
