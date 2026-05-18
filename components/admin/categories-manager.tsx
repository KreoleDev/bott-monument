"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { ArrowLeft, Plus, Pencil, Trash2, Loader2, FolderOpen } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { Category } from "@/lib/types"

interface CategoriesManagerProps {
  categories: Category[]
}

export function CategoriesManager({ categories: initialCategories }: CategoriesManagerProps) {
  const router = useRouter()
  const [categories] = useState(initialCategories)
  const [isPending, startTransition] = useTransition()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get("name") as string
    const description = formData.get("description") as string

    if (!name) {
      setFormError("Nome e obrigatorio.")
      return
    }

    setFormError(null)

    startTransition(async () => {
      const supabase = createClient()

      if (editingCategory) {
        const { error } = await supabase
          .from("categories")
          .update({
            name,
            description: description || null,
            updated_at: new Date().toISOString()
          })
          .eq("id", editingCategory.id)

        if (error) {
          setFormError("Erro ao atualizar categoria.")
          return
        }
      } else {
        const { error } = await supabase
          .from("categories")
          .insert({ name, description: description || null })

        if (error) {
          if (error.code === "23505") {
            setFormError("Ja existe uma categoria com este nome.")
          } else {
            setFormError("Erro ao criar categoria.")
          }
          return
        }
      }

      setDialogOpen(false)
      setEditingCategory(null)
      router.refresh()
    })
  }

  const handleDelete = async () => {
    if (!deleteId) return

    startTransition(async () => {
      const supabase = createClient()
      await supabase.from("categories").delete().eq("id", deleteId)
      setDeleteId(null)
      router.refresh()
    })
  }

  const openEditDialog = (category: Category) => {
    setEditingCategory(category)
    setFormError(null)
    setDialogOpen(true)
  }

  const openNewDialog = () => {
    setEditingCategory(null)
    setFormError(null)
    setDialogOpen(true)
  }

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
              Gerenciar <span className="text-primary">Categorias</span>
            </h1>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNewDialog} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Nova Categoria
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-white/10 max-w-md">
              <DialogHeader>
                <DialogTitle className="font-serif text-xl">
                  {editingCategory ? "Editar Categoria" : "Nova Categoria"}
                </DialogTitle>
              </DialogHeader>
              
              <form action={handleSubmit} className="space-y-4 mt-4">
                {formError && (
                  <div className="p-3 bg-destructive/10 border border-destructive/30 text-destructive-foreground text-sm">
                    {formError}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">
                    Nome *
                  </label>
                  <Input
                    name="name"
                    defaultValue={editingCategory?.name || ""}
                    placeholder="Ex: Classic, Modern, Custom..."
                    required
                    className="rounded-none border-border/40 bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">
                    Descricao
                  </label>
                  <Textarea
                    name="description"
                    defaultValue={editingCategory?.description || ""}
                    placeholder="Descricao da categoria..."
                    className="rounded-none border-border/40 bg-background min-h-[80px] resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : editingCategory ? (
                      "Salvar"
                    ) : (
                      "Criar"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        {categories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Nenhuma categoria cadastrada ainda.</p>
            <Button onClick={openNewDialog} className="bg-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Criar primeira categoria
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-white/10 bg-card/50 p-4 flex items-center justify-between group hover:border-primary/30 transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-foreground">{category.name}</h3>
                    {category.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openEditDialog(category)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setDeleteId(category.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
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
            <AlertDialogTitle>Excluir categoria?</AlertDialogTitle>
            <AlertDialogDescription>
              As obras desta categoria nao serao excluidas, apenas ficarao sem categoria.
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
