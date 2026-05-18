"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Inicio", href: "#hero" },
  { label: "Filosofia", href: "#philosophy" },
  { label: "Processo", href: "#process" },
  { label: "Galeria", href: "#gallery" },
  { label: "Sobre", href: "#about" },
  { label: "Testemunhos", href: "#testimonials" },
  { label: "Contacto", href: "#contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Monitor scroll to change background and detect active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Detect active section
      const sections = navItems.map(item => item.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          isScrolled 
            ? "bg-background/90 backdrop-blur-xl border-b border-primary/10 py-2" 
            : "bg-gradient-to-b from-background/80 to-transparent py-4"
        }`}
      >
        {/* Top bar with contact info - only visible when not scrolled */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="hidden lg:block border-b border-white/5 pb-2 mb-2"
            >
              <div className="mx-auto max-w-7xl px-8 lg:px-12">
                <div className="flex justify-end items-center gap-6 text-[10px] text-white/50">
                  <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Phone className="w-3 h-3" />
                    <span>+1 (234) 567-890</span>
                  </a>
                  <a href="mailto:info@bottmonument.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Mail className="w-3 h-3" />
                    <span>info@bottmonument.com</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex h-14 items-center justify-between">
            
            {/* Logo Section with animation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                href="/" 
                className="flex items-center gap-3 transition-all hover:opacity-80 group"
                onClick={() => scrollToSection('#hero')}
              >
                <img
                  src="/logoBOTT-monument12.png"
                  alt="Bott Monument"
                  className={`w-auto brightness-0 invert transition-all duration-500 ${
                    isScrolled ? 'h-8' : 'h-10'
                  }`}
                />
                {/* Logo glow effect on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 blur-xl transition-all duration-500 rounded-full" />
              </Link>
            </motion.div>

            {/* Desktop Navigation - Premium Style */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className={`relative px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 group ${
                        isActive ? 'text-primary' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {item.label}
                      
                      {/* Underline indicator */}
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-1/2'
                      }`} />
                      
                      {/* Dot indicator for active */}
                      {isActive && (
                        <motion.span 
                          layoutId="activeIndicator"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </nav>

            {/* CTA Button */}
            <motion.div 
              className="hidden lg:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Button 
                onClick={() => scrollToSection('#contact')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] transition-all duration-500 shadow-lg hover:shadow-primary/25 hover:scale-105"
              >
                Solicitar Orcamento
              </Button>
            </motion.div>

            {/* Mobile Toggle - Premium */}
            <motion.button
              className="lg:hidden relative p-2 text-white/80 z-[110]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-6 h-6">
                <motion.span
                  className="absolute top-[6px] left-0 w-6 h-[2px] bg-current rounded-full"
                  animate={{ 
                    rotate: isMenuOpen ? 45 : 0, 
                    y: isMenuOpen ? 5 : 0,
                    backgroundColor: isMenuOpen ? 'rgb(200, 166, 106)' : 'currentColor'
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute top-[11px] left-0 w-6 h-[2px] bg-current rounded-full"
                  animate={{ 
                    opacity: isMenuOpen ? 0 : 1,
                    scaleX: isMenuOpen ? 0 : 1
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute top-[16px] left-0 w-6 h-[2px] bg-current rounded-full"
                  animate={{ 
                    rotate: isMenuOpen ? -45 : 0, 
                    y: isMenuOpen ? -5 : 0,
                    backgroundColor: isMenuOpen ? 'rgb(200, 166, 106)' : 'currentColor'
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Full Screen Premium */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[99] lg:hidden"
          >
            {/* Background with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/98 backdrop-blur-xl"
            />
            
            {/* Decorative elements */}
            <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
            
            {/* Menu Content */}
            <div className="relative h-full flex flex-col items-center justify-center px-8">
              {/* Navigation Links */}
              <nav className="flex flex-col items-center gap-2 mb-12">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, delay: index * 0.06 }}
                      onClick={() => scrollToSection(item.href)}
                      className={`group flex items-center gap-3 py-3 transition-all duration-300 ${
                        isActive ? 'text-primary' : 'text-white/80'
                      }`}
                    >
                      {/* Number indicator */}
                      <span className={`text-xs font-mono transition-colors ${
                        isActive ? 'text-primary' : 'text-white/30 group-hover:text-primary/50'
                      }`}>
                        0{index + 1}
                      </span>
                      
                      {/* Divider line */}
                      <motion.span 
                        className="w-8 h-[1px] bg-current"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.06 + 0.2 }}
                      />
                      
                      {/* Label */}
                      <span className="text-2xl font-serif tracking-wide group-hover:text-primary transition-colors">
                        {item.label}
                      </span>
                      
                      {/* Arrow */}
                      <ChevronRight className={`w-5 h-5 transition-all duration-300 ${
                        isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0'
                      }`} />
                    </motion.button>
                  );
                })}
              </nav>

              {/* CTA Button Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Button 
                  onClick={() => scrollToSection('#contact')}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 py-6 text-sm font-semibold uppercase tracking-widest shadow-lg"
                >
                  Solicitar Orcamento
                </Button>
              </motion.div>

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-4 text-sm text-white/40"
              >
                <div className="flex items-center gap-6">
                  <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>+1 (234) 567-890</span>
                  </a>
                </div>
                <a href="mailto:info@bottmonument.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>info@bottmonument.com</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
