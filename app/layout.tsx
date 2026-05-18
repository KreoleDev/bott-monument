import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-serif'
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Bott Monument | Memoriais Personalizados',
  description: 'Criamos monumentos únicos e personalizados que honram a memória de seus entes queridos. Cada peça é uma obra de arte.',
  icons: {
    // Apontando diretamente para o arquivo real que está na raiz da sua pasta public
    icon: '/logoBOTT-monument1.png',
    apple: '/logoBOTT-monument1.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${inter.variable} bg-background scroll-smooth`}>
      <body className="font-sans antialiased text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
