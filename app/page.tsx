// app/page.tsx
import { Header } from "../components/header"
import { Hero } from "../components/hero"
import { Philosophy } from "../components/philosophy" 
import { Process } from "../components/process"     
import { Showcase } from "../components/showcase"     // Galeria de fotos de alto padrão
import { About } from "../components/about"
import { Features } from "../components/features"
import { Testimonials } from "../components/testimonials" // Validação emocional e humana
import { Contact } from "../components/contact"
import { Footer } from "../components/footer"
import { ScrollAnimateSection } from "../components/scroll-animate-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background relative select-none">
      <Header />
      
      {/* 1. Impacto Inicial */}
      <ScrollAnimateSection>
        <Hero />
      </ScrollAnimateSection>

      {/* 2. Manifesto Artístico */}
      <ScrollAnimateSection>
        <Philosophy />
      </ScrollAnimateSection>

      {/* 3. Demonstração de Organização e Cuidado */}
      <ScrollAnimateSection>
        <Process />
      </ScrollAnimateSection>

      {/* 4. Exposição Visual do Produto Final (Showcase)
          Entra logo após explicar o processo, provando o resultado da maestria do Drew.
      */}
      <ScrollAnimateSection>
        <Showcase />
      </ScrollAnimateSection>

      {/* 5. História da Família e Detalhes de Engenharia */}
      <About />
      <Features />

      {/* 6. Conexão Emocional (Depoimentos de Famílias) */}
      <Testimonials />
      
      {/* 7. Fechamento e Ação */}
      <Contact />
      <Footer />
    </main>
  )
}
