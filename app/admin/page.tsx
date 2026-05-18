import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin/dashboard"

export default async function AdminPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/admin/login")
  }

  // Fetch stats for dashboard
  const [
    { count: artworksCount },
    { count: categoriesCount },
    { count: messagesCount },
    { count: unreadCount }
  ] = await Promise.all([
    supabase.from("artworks").select("*", { count: "exact", head: true }),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("read", false)
  ])

  return (
    <AdminDashboard 
      user={user}
      stats={{
        artworks: artworksCount || 0,
        categories: categoriesCount || 0,
        messages: messagesCount || 0,
        unread: unreadCount || 0
      }}
    />
  )
}
