import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin | Bott Monument",
  description: "Painel administrativo do Bott Monument",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
