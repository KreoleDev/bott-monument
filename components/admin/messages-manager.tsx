"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { 
  ArrowLeft, 
  Trash2, 
  Loader2, 
  Mail, 
  MailOpen, 
  Phone,
  Calendar,
  ExternalLink
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { ContactMessage } from "@/lib/types"

interface MessagesManagerProps {
  messages: ContactMessage[]
}

export function MessagesManager({ messages: initialMessages }: MessagesManagerProps) {
  const router = useRouter()
  const [messages] = useState(initialMessages)
  const [isPending, startTransition] = useTransition()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const markAsRead = async (id: string) => {
    startTransition(async () => {
      const supabase = createClient()
      await supabase
        .from("contact_messages")
        .update({ read: true })
        .eq("id", id)
      router.refresh()
    })
  }

  const handleDelete = async () => {
    if (!deleteId) return

    startTransition(async () => {
      const supabase = createClient()
      await supabase.from("contact_messages").delete().eq("id", deleteId)
      setDeleteId(null)
      router.refresh()
    })
  }

  const toggleExpand = (id: string, read: boolean) => {
    if (expandedId === id) {
      setExpandedId(null)
    } else {
      setExpandedId(id)
      if (!read) {
        markAsRead(id)
      }
    }
  }

  const unreadCount = messages.filter(m => !m.read).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-serif text-xl text-foreground">
              <span className="text-primary">Mensagens</span>
              {unreadCount > 0 && (
                <span className="ml-2 text-sm text-muted-foreground">
                  ({unreadCount} nao lidas)
                </span>
              )}
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhuma mensagem recebida ainda.</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.03 }}
                  className={`border bg-card/50 overflow-hidden transition-all ${
                    message.read ? "border-white/10" : "border-primary/30 bg-primary/5"
                  }`}
                >
                  <div 
                    className="p-4 cursor-pointer hover:bg-white/5 transition-colors"
                    onClick={() => toggleExpand(message.id, message.read)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className={`mt-1 ${message.read ? "text-muted-foreground" : "text-primary"}`}>
                          {message.read ? (
                            <MailOpen className="w-5 h-5" />
                          ) : (
                            <Mail className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-medium truncate ${message.read ? "text-foreground" : "text-primary"}`}>
                              {message.name}
                            </h3>
                            {!message.read && (
                              <span className="px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold uppercase">
                                Nova
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {message.email}
                          </p>
                          <p className="text-sm text-foreground/80 mt-1 line-clamp-1">
                            {message.message}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                        <Calendar className="w-3 h-3" />
                        {new Date(message.created_at).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short'
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {expandedId === message.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-white/10"
                      >
                        <div className="p-4 space-y-4">
                          <div className="flex flex-wrap gap-4 text-sm">
                            <a 
                              href={`mailto:${message.email}`}
                              className="flex items-center gap-2 text-primary hover:underline"
                            >
                              <Mail className="w-4 h-4" />
                              {message.email}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            {message.phone && (
                              <a 
                                href={`tel:${message.phone}`}
                                className="flex items-center gap-2 text-primary hover:underline"
                              >
                                <Phone className="w-4 h-4" />
                                {message.phone}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          
                          <div className="bg-background/50 p-4 border border-white/5">
                            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                              Mensagem:
                            </p>
                            <p className="text-foreground whitespace-pre-wrap">
                              {message.message}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <p className="text-xs text-muted-foreground">
                              Recebida em {new Date(message.created_at).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation()
                                setDeleteId(message.id)
                              }}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Excluir
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-card border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir mensagem?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acao nao pode ser desfeita. A mensagem sera removida permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
