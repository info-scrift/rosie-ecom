// "use client"

// import { useEffect, useState } from "react"
// import { supabase } from "@/lib/supabase"
// import type { User } from "@supabase/supabase-js"

// export function useAuth() {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // Get initial session
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setUser(session?.user ?? null)
//       setLoading(false)
//     })

//     // Listen for auth changes
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null)
//       setLoading(false)
//     })

//     return () => subscription.unsubscribe()
//   }, [])

//   const signOut = async () => {
//     await supabase.auth.signOut()
//   }

//   return {
//     user,
//     loading,
//     signOut,
//   }
// }

// // Helper function to check if user is authenticated (for middleware)
// export async function getUser() {
//   const {
//     data: { session },
//   } = await supabase.auth.getSession()
//   return session?.user ?? null
// }


"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase?.auth?.getSession || !supabase?.auth?.onAuthStateChange) {
      console.warn("[v0] Supabase client not properly initialized - check environment variables")
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user ?? null)
        setLoading(false)
      })
      .catch((error) => {
        console.error("[v0] Error getting session:", error)
        setLoading(false)
      })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    if (supabase?.auth?.signOut) {
      await supabase.auth.signOut()
    }
  }

  return {
    user,
    loading,
    signOut,
  }
}

// Helper function to check if user is authenticated (for middleware)
export async function getUser() {
  if (!supabase?.auth?.getSession) {
    return null
  }

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session?.user ?? null
  } catch (error) {
    console.error("[v0] Error getting user:", error)
    return null
  }
}
