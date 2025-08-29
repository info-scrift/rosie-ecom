import { createClient } from "@supabase/supabase-js"

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Product {
  id: string
  name: string
  category: string
  price: number
  image_url: string | null
  description: string
  symptoms: string[]
  features: string[]
  in_stock: boolean
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  user_id: string
  role: "user" | "assistant"
  content: string
  recommended_products: string[]
  created_at: string
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  category: string
  level: "Beginner" | "Intermediate" | "Advanced"
  price: string
  original_price?: string
  duration_hours: number
  total_lessons: number
  image_url: string
  video_preview_url?: string
  what_you_learn: string[]
  requirements: string[]
  course_content: {
    modules: Array<{
      title: string
      lessons: number
    }>
  }
  rating: number
  total_reviews: number
  enrolled_students: number
  is_published: boolean
  is_featured: boolean
  tags: string[]
  language: string
  has_certificate: boolean
  lifetime_access: boolean
  created_at?: string
  updated_at?: string
}

export interface Book {
  id: string
  title: string
  description: string
  instructor: string
  category: string
  level: "Beginner" | "Intermediate" | "Advanced"
  price: string
  original_price?: string
  duration_hours: number
  total_lessons: number
  image_url: string
  video_preview_url?: string
  what_you_learn: string[]
  requirements: string[]
  course_content: {
    modules: Array<{
      title: string
      lessons: number
    }>
  }
  rating: number
  total_reviews: number
  enrolled_students: number
  is_published: boolean
  is_featured: boolean
  tags: string[]
  language: string
  has_certificate: boolean
  lifetime_access: boolean
  created_at?: string
  updated_at?: string
}

// Use Supabase's built-in User type from auth
export type { User } from "@supabase/supabase-js"
