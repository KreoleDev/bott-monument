"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Our Story", href: "#about" },
  { label: "The Craft", href: "#process" },
  { label: "Gallery", href: "#projects" },
  { label: "Heritage", href: "#philosophy" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll to change background opacity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        isScrolled 
          ? "bg-background/78 backdrop-blur-md border-b border-white/10 py-3" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
            <img
              src="/logoBOTT-monument12.png"
              alt="Bott Monument"
              className="h-10 w-auto brightness-0 invert" // Ensures logo is white for high-end look
            />
          </Link>

          {/* Desktop Navigation - US Luxury Spacing */}
          <nav className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[10px] uppercase tracking-[0.35em] text-white/82 hover:text-primary transition-all duration-300 font-semibold"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* US Style CTA Button */}
          <div className="hidden md:block">
            <Button 
              className="bg-transparent text-primary border border-primary/40 hover:bg-primary hover:text-primary-foreground rounded-full px-10 py-2 text-[9px] font-bold uppercase tracking-[0.25em] transition-all duration-500"
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-white/80"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-background z-[-1] flex flex-col items-center justify-center gap-8 animate-in fade-in duration-500">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-lg uppercase tracking-[0.4em] text-white/90 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button 
            className="bg-primary text-primary-foreground rounded-full px-12 py-6 font-bold uppercase tracking-widest mt-8"
          >
            Get a Quote
          </Button>
        </div>
      )}
    </header>
  );
}
