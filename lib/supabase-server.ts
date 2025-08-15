import { createClient } from "@supabase/supabase-js"

const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY || ''
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''

// Server-side client with service role key for admin operations
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
