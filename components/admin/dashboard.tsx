"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  ImageIcon, 
  FolderOpen, 
  Mail, 
  MailOpen,
  LogOut, 
  Home,
  Plus,
  Settings,
  Loader2
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface AdminDashboardProps {
  user: User
  stats: {
    artworks: number
    categories: number
    messages: number
    unread: number
  }
}

export function AdminDashboard({ user, stats }: AdminDashboardProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleLogout = async () => {
    startTransition(async () => {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push("/admin/login")
      router.refresh()
    })
  }

  const statCards = [
    {
      title: "Obras",
      value: stats.artworks,
      icon: ImageIcon,
      href: "/admin/artworks",
      color: "text-primary"
    },
    {
      title: "Categorias",
      value: stats.categories,
      icon: FolderOpen,
      href: "/admin/categories",
      color: "text-blue-400"
    },
    {
      title: "Mensagens",
      value: stats.messages,
      icon: Mail,
      href: "/admin/messages",
      color: "text-green-400"
    },
    {
      title: "Nao Lidas",
      value: stats.unread,
      icon: MailOpen,
      href: "/admin/messages?filter=unread",
      color: "text-orange-400"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Home className="w-5 h-5" />
              <span className="sr-only">Voltar ao site</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="font-serif text-xl text-foreground">
              Admin <span className="text-primary">Panel</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user.email}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              disabled={isPending}
              className="text-muted-foreground hover:text-foreground"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              <span className="sr-only">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="font-serif text-3xl text-foreground mb-2">
            Bem-vindo de volta
          </h2>
          <p className="text-muted-foreground">
            Gerencie suas obras, categorias e mensagens de contato.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={stat.href}>
                <div className="border border-white/10 bg-card/50 p-6 hover:border-primary/50 hover:bg-card/80 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    <span className="text-3xl font-serif text-foreground">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {stat.title}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-serif text-xl text-foreground mb-4">Acoes Rapidas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/admin/artworks/new">
              <div className="border border-white/10 bg-card/50 p-6 hover:border-primary/50 hover:bg-card/80 transition-all flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Nova Obra</p>
                  <p className="text-sm text-muted-foreground">Adicionar ao portfolio</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/categories">
              <div className="border border-white/10 bg-card/50 p-6 hover:border-primary/50 hover:bg-card/80 transition-all flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Categorias</p>
                  <p className="text-sm text-muted-foreground">Gerenciar categorias</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/messages">
              <div className="border border-white/10 bg-card/50 p-6 hover:border-primary/50 hover:bg-card/80 transition-all flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Mensagens</p>
                  <p className="text-sm text-muted-foreground">
                    {stats.unread > 0 ? `${stats.unread} nao lidas` : "Ver inbox"}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
