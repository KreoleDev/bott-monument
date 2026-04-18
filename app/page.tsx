import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { About } from "@/components/about"
import { Process } from "@/components/process"
import { Philosophy } from "@/components/philosophy"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <About />
      <Process />
      <Philosophy />
      <Contact />
      <Footer />
    </main>
  )
}
