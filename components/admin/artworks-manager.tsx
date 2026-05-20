"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { 
  ArrowLeft, 
  Plus, 
  Pencil, 
  Trash2, 
  Star, 
  Loader2,
  GripVertical,
  ImageIcon
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { Artwork, Category } from "@/lib/types"

interface ArtworksManagerProps {
  artworks: Artwork[]
  categories: Category[]
}

export function ArtworksManager({ artworks: initialArtworks, categories }: ArtworksManagerProps) {
  const router = useRouter()
  const [artworks, setArtworks] = useState(initialArtworks)
  const [isPending, startTransition] = useTransition()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null)
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const image_url = formData.get("image_url") as string
    const category_id = formData.get("category_id") as string
    const featured = formData.get("featured") === "on"

    if (!title || !image_url) {
      setFormError("Titulo e URL da imagem sao obrigatorios.")
      return
    }

    setFormError(null)

    startTransition(async () => {
      const supabase = createClient()

      if (editingArtwork) {
        const { error } = await supabase
          .from("artworks")
          .update({
            title,
            description: description || null,
            image_url,
            category_id: category_id || null,
            featured,
            updated_at: new Date().toISOString()
          })
          .eq("id", editingArtwork.id)

        if (error) {
          setFormError("Erro ao atualizar obra.")
          return
        }
      } else {
        const maxOrder = Math.max(0, ...artworks.map(a => a.display_order))
        const { error } = await supabase
          .from("artworks")
          .insert({
            title,
            description: description || null,
            image_url,
            category_id: category_id || null,
            featured,
            display_order: maxOrder + 1
          })

        if (error) {
          setFormError("Erro ao criar obra.")
          return
        }
      }

      setDialogOpen(false)
      setEditingArtwork(null)
      router.refresh()
    })
  }

  const handleDelete = async () => {
    if (!deleteId) return

    startTransition(async () => {
      const supabase = createClient()
      await supabase.from("artworks").delete().eq("id", deleteId)
      setDeleteId(null)
      router.refresh()
    })
  }

  const toggleFeatured = async (id: string, featured: boolean) => {
    startTransition(async () => {
      const supabase = createClient()
      await supabase
        .from("artworks")
        .update({ featured: !featured })
        .eq("id", id)
      router.refresh()
    })
  }

  const openEditDialog = (artwork: Artwork) => {
    setEditingArtwork(artwork)
    setFormError(null)
    setDialogOpen(true)
  }

  const openNewDialog = () => {
    setEditingArtwork(null)
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
              Gerenciar <span className="text-primary">Obras</span>
            </h1>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNewDialog} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Nova Obra
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-white/10 max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-serif text-xl">
                  {editingArtwork ? "Editar Obra" : "Nova Obra"}
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
                    Titulo *
                  </label>
                  <Input
                    name="title"
                    defaultValue={editingArtwork?.title || ""}
                    placeholder="Nome da obra"
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
                    defaultValue={editingArtwork?.description || ""}
                    placeholder="Descricao da obra..."
                    className="rounded-none border-border/40 bg-background min-h-[100px] resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">
                    URL da Imagem *
                  </label>
                  <Input
                    name="image_url"
                    defaultValue={editingArtwork?.image_url || ""}
                    placeholder="/images/obra.jpg"
                    required
                    className="rounded-none border-border/40 bg-background"
                  />
                  <p className="text-xs text-muted-foreground">
                    Use caminhos relativos como /images/nome.jpg
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">
                    Categoria
                  </label>
                  <Select name="category_id" defaultValue={editingArtwork?.category_id || ""}>
                    <SelectTrigger className="rounded-none border-border/40 bg-background">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between py-2">
                  <label className="text-sm text-muted-foreground">
                    Destacar no portfolio
                  </label>
                  <Switch
                    name="featured"
                    defaultChecked={editingArtwork?.featured || false}
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
                    ) : editingArtwork ? (
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
      <main className="max-w-7xl mx-auto px-6 py-8">
        {artworks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Nenhuma obra cadastrada ainda.</p>
            <Button onClick={openNewDialog} className="bg-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar primeira obra
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {artworks.map((artwork, index) => (
                <motion.div
                  key={artwork.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-white/10 bg-card/50 overflow-hidden group"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={artwork.image_url}
                      alt={artwork.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {artwork.featured && (
                      <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Destaque
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => openEditDialog(artwork)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteId(artwork.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-medium text-foreground line-clamp-1">
                          {artwork.title}
                        </h3>
                        <p className="text-xs text-primary mt-1">
                          {artwork.category?.name || "Sem categoria"}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className={artwork.featured ? "text-primary" : "text-muted-foreground"}
                        onClick={() => toggleFeatured(artwork.id, artwork.featured)}
                      >
                        <Star className={`w-4 h-4 ${artwork.featured ? "fill-primary" : ""}`} />
                      </Button>
                    </div>
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
            <AlertDialogTitle>Excluir obra?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acao nao pode ser desfeita. A obra sera removida permanentemente do portfolio.
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
