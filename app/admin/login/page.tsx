"use client"

import { Suspense, useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Lock } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

function AdminLoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(
    searchParams.get("error") ? "Erro na autenticacao. Tente novamente." : null
  )

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.")
      return
    }

    setError(null)

    startTransition(async () => {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError("Email ou senha invalidos.")
        return
      }

      router.push("/admin")
      router.refresh()
    })
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 mx-auto flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-serif text-3xl text-foreground mb-2">
            Admin <span className="text-primary">Bott Monument</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Entre com suas credenciais para acessar o painel
          </p>
        </div>

        <div className="border border-white/10 bg-card/50 backdrop-blur-sm p-8">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-destructive/10 border border-destructive/30 text-destructive-foreground text-sm"
            >
              {error}
            </motion.div>
          )}

          <form action={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@bottmonument.com"
                required
                disabled={isPending}
                className="rounded-none border-border/40 bg-background h-12 text-sm focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground">
                Senha
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                required
                disabled={isPending}
                className="rounded-none border-border/40 bg-background h-12 text-sm focus:border-primary"
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-12 text-sm tracking-wider"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Protegido por Supabase Auth
        </p>
      </motion.div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginContent />
    </Suspense>
  )
}
