import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ArtworksManager } from "@/components/admin/artworks-manager"

export default async function AdminArtworksPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/admin/login")
  }

  const [artworksResponse, categoriesResponse] = await Promise.all([
    supabase
      .from("artworks")
      .select(`*, category:categories(*)`)
      .order("display_order", { ascending: true }),
    supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true })
  ])

  return (
    <ArtworksManager 
      artworks={artworksResponse.data || []}
      categories={categoriesResponse.data || []}
    />
  )
}
