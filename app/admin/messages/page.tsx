import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { MessagesManager } from "@/components/admin/messages-manager"

export default async function AdminMessagesPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/admin/login")
  }

  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })

  return <MessagesManager messages={messages || []} />
}
