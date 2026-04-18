"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Facebook, Instagram, ArrowRight } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <section id="contato" className="py-8 md:py-12 bg-card">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-5 md:mb-6">
          <p className="text-xs tracking-[0.2em] sm:tracking-[0.3em] text-primary uppercase mb-1">
            Contact
          </p>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground text-balance">
            Start Your Project
          </h2>
        </div>

        <div className="border border-border/30 bg-background/50 p-4 sm:p-5 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-8">
            <form onSubmit={handleSubmit} className="md:col-span-3 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-none border-border/40 bg-background h-10 text-sm focus:border-primary"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-none border-border/40 bg-background h-10 text-sm focus:border-primary"
                />
              </div>
              <Input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="rounded-none border-border/40 bg-background h-10 text-sm focus:border-primary"
              />
              <Textarea
                placeholder="Tell us about the memorial you'd like to create..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="rounded-none border-border/40 bg-background min-h-[70px] text-sm focus:border-primary resize-none"
              />
              <Button
                type="submit"
                className="bg-primary text-background hover:bg-primary/90 rounded-none px-5 h-10 text-xs sm:text-sm tracking-wide group"
              >
                Send Message
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="md:col-span-2 md:border-l md:border-border/30 md:pl-8 space-y-3">
              <a
                href="https://maps.google.com/?q=3425+W+Main+St,+Riverton,+WY,+United+States,+82501"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm text-foreground">3425 West Main</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Riverton, WY 82501</p>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <p className="text-xs sm:text-sm text-foreground">(307) 856-3719</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <p className="text-xs sm:text-sm text-foreground">drew@bottmonument.com</p>
              </div>

              <a
                href="https://www.facebook.com/bottmonument"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <Facebook className="h-4 w-4 text-primary shrink-0" />
                <p className="text-xs sm:text-sm text-foreground">Facebook</p>
              </a>

              <a
                href="https://www.instagram.com/bottmonument"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <Instagram className="h-4 w-4 text-primary shrink-0" />
                <p className="text-xs sm:text-sm text-foreground">Instagram</p>
              </a>

              <div className="pt-2 border-t border-border/30">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We serve all of Wyoming and neighboring states.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}