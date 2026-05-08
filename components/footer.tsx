import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1a1d23] border-t border-white/5 py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo e Tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="transition-opacity hover:opacity-80">
              <img
                src="/logoBOTT-monument12.png"
                alt="Bott Monument"
                className="h-8 w-auto brightness-0 invert" 
              />
            </Link>
            <p className="text-[9px] tracking-[0.2em] text-white/20 uppercase font-light">
              Crafting Legacies Since 1985
            </p>
          </div>

          {/* Navegação Secundária - Centralizada e discreta */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              { label: "Our Story", href: "#about" },
              { label: "The Craft", href: "#process" },
              { label: "Gallery", href: "#projects" },
              { label: "Heritage", href: "#philosophy" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-[#f9b000] transition-colors duration-300 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Copyright e Info Alinhados */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="text-[10px] text-white/30 tracking-wider font-light">
              © {new Date().getFullYear()} Bott Monument. All Rights Reserved.
            </p>
            <p className="text-[8px] text-white/10 uppercase tracking-[0.3em]">
              Design & Mastery in Every Detail
            </p>
          </div>
          
        </div>

        {/* Linha Final - Mais sutil ainda */}
        <div className="mt-8 w-full h-px bg-white/5" />
      </div>
    </footer>
  );
}