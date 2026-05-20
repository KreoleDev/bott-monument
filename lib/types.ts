export interface Category {
  id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
}

export interface Artwork {
  id: string
  title: string
  description: string | null
  image_url: string
  category_id: string | null
  featured: boolean
  display_order: number
  created_at: string
  updated_at: string
  // Joined fields
  category?: Category
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  read: boolean
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: Category
        Insert: Omit<Category, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>
      }
      artworks: {
        Row: Artwork
        Insert: Omit<Artwork, 'id' | 'created_at' | 'updated_at' | 'category'>
        Update: Partial<Omit<Artwork, 'id' | 'created_at' | 'updated_at' | 'category'>>
      }
      contact_messages: {
        Row: ContactMessage
        Insert: Omit<ContactMessage, 'id' | 'created_at' | 'read'>
        Update: Partial<Omit<ContactMessage, 'id' | 'created_at'>>
      }
    }
  }
}
