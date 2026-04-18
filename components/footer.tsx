import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-4 bg-background border-t border-border/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <Link href="/" className="font-serif text-sm sm:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase text-foreground hover:text-primary transition-colors">
            Bott Monument
          </Link>
          
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="#sobre" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#processo" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
              Process
            </Link>
            <Link href="#projetos" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
              Projects
            </Link>
            <Link href="#filosofia" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
              Philosophy
            </Link>
          </nav>
          
          <p className="text-xs sm:text-sm text-muted-foreground/50">
            © {new Date().getFullYear()} Bott Monument
          </p>
        </div>
      </div>
    </footer>
  )
}
