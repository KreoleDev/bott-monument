"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "About", href: "#sobre" },
  { label: "Process", href: "#processo" },
  { label: "Projects", href: "#projetos" },
  { label: "Philosophy", href: "#filosofia" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-serif text-xl tracking-[0.3em] text-foreground uppercase">
              Bott Monument
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              className="bg-transparent text-primary border border-primary hover:bg-primary hover:text-background rounded-none px-6 py-5 text-sm tracking-wide transition-all duration-300"
            >
              Start a Project
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-background border-b border-border">
          <nav className="flex flex-col px-6 py-6 gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button 
              className="bg-transparent text-primary border border-primary hover:bg-primary hover:text-background rounded-none px-6 py-5 text-sm tracking-wide mt-4 w-full transition-all duration-300"
            >
              Start a Project
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
