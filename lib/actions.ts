"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidateTag } from "next/cache"

export async function submitContactMessage(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const message = formData.get("message") as string

  if (!name || !email || !message) {
    return { success: false, error: "Por favor, preencha todos os campos obrigatorios." }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: "Por favor, insira um email valido." }
  }

  const supabase = await createClient()

  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    phone: phone || null,
    message,
  })

  if (error) {
    console.error("Error submitting contact message:", error)
    return { success: false, error: "Erro ao enviar mensagem. Tente novamente." }
  }

  revalidateTag("contact-messages", "max")

  return { success: true }
}

export async function getArtworks() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("artworks")
    .select(`
      *,
      category:categories(*)
    `)
    .order("display_order", { ascending: true })

  if (error) {
    console.error("Error fetching artworks:", error)
    return []
  }

  return data || []
}

export async function getCategories() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true })

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data || []
}
