"use client"

import { useState, useTransition } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Facebook, Instagram, ArrowRight, CheckCircle, Loader2 } from "lucide-react"
import { submitContactMessage } from "@/lib/actions"

export function Contact() {
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (formData: FormData) => {
    setStatus("idle")
    setErrorMessage("")

    startTransition(async () => {
      const result = await submitContactMessage(formData)
      if (result.success) {
        setStatus("success")
        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement
        form?.reset()
      } else {
        setStatus("error")
        setErrorMessage(result.error || "Erro ao enviar mensagem.")
      }
    })
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/[0.02] blur-[150px] pointer-events-none" />
      
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block">
            Contact
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground text-balance mb-4">
            Start Your <span className="italic text-primary">Project</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Get in touch with us to create a unique monument that honors the memory of your loved ones.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="border border-white/10 bg-card/50 backdrop-blur-sm p-6 sm:p-8 md:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form */}
            <form id="contact-form" action={handleSubmit} className="lg:col-span-3 space-y-5">
              {status === "success" && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 text-green-400"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">Message sent successfully! We will get in touch soon.</span>
                </motion.div>
              )}
              
              {status === "error" && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-destructive/10 border border-destructive/30 text-destructive-foreground text-sm"
                >
                  {errorMessage}
                </motion.div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    required
                    disabled={isPending}
                    className="rounded-none border-border/40 bg-background h-12 text-sm focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    disabled={isPending}
                    className="rounded-none border-border/40 bg-background h-12 text-sm focus:border-primary transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Phone
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  disabled={isPending}
                  className="rounded-none border-border/40 bg-background h-12 text-sm focus:border-primary transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about the memorial you'd like to create..."
                  required
                  disabled={isPending}
                  className="rounded-none border-border/40 bg-background min-h-[140px] text-sm focus:border-primary resize-none transition-colors"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isPending}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 h-12 text-sm tracking-wider group w-full sm:w-auto"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            {/* Contact Info */}
            <div className="lg:col-span-2 lg:border-l lg:border-border/30 lg:pl-12 space-y-6">
              <div>
                <h3 className="font-serif text-xl text-foreground mb-4">Visit Us</h3>
                <a
                  href="https://maps.google.com/?q=3425+W+Main+St,+Riverton,+WY,+United+States,+82501"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group hover:text-primary transition-colors"
                >
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-foreground group-hover:text-primary transition-colors">3425 West Main</p>
                    <p className="text-sm text-muted-foreground">Riverton, WY 82501</p>
                  </div>
                </a>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-primary shrink-0" />
                  <a href="tel:+13078563719" className="text-sm text-foreground hover:text-primary transition-colors">
                    (307) 856-3719
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-primary shrink-0" />
                  <a href="mailto:drew@bottmonument.com" className="text-sm text-foreground hover:text-primary transition-colors">
                    drew@bottmonument.com
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-border/30">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Follow Us</p>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/bottmonument"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all"
                  >
                    <Facebook className="h-4 w-4 text-foreground" />
                  </a>
                  <a
                    href="https://www.instagram.com/bottmonument"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all"
                  >
                    <Instagram className="h-4 w-4 text-foreground" />
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-border/30">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We serve all of Wyoming and surrounding states. Contact us for personalized consultations.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
