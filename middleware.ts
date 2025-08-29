import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes (no auth required)
  const publicRoutes = ['/auth/login', '/auth/signup']

  // Skip middleware for public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  const cookieStore = await cookies()
  const cookieValue = cookieStore.get('user')?.value
  const cookieObject = cookieValue ? JSON.parse(cookieValue) : null
  console.log('cookie object is ')
  console.log(cookieObject)
 

  if (!cookieValue) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (cookieObject?.user?.email === 'admin@renalfusion.com') {
  if (!pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }
}


  // Allow API routes without redirect loop
  if (pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Allow main protected routes
  if (
    pathname === '/' ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/products') ||
    pathname.startsWith('/courses') ||
    pathname.startsWith('/chatbot') ||
    pathname.startsWith('/books')
  ) {
    return NextResponse.next()
  }

  // Default redirect
  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: ['/((?!_next|images|favicon.ico).*)'],
}



// import { createServerClient } from "@supabase/ssr"
// import { cookies } from "next/headers"
// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"

// export async function middleware(request: NextRequest) {
//     const cookieStore = await cookies()

//   const cookieValue = cookieStore.get('user')?.value
//   // const parseData = cookieValue?.includes("access_token") ? JSON.parse(cookieStore.get('sb-app-auth-token')?.value ?? '{}') : null
//   console.log('the cookie valeu is')
//   console.log(cookieValue)
//   const { pathname } = request.nextUrl

//   const publicRoutes = ["/auth/login", "/auth/signup"]
//   const isPublicRoute = publicRoutes.includes(pathname)

//   if (
//     isPublicRoute ||
//     pathname.startsWith("/api") ||
//     pathname.startsWith("/_next") ||
//     pathname.includes(".") ||
//     pathname.startsWith("/favicon")
//   ) {
//     return NextResponse.next()
//   }

//   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
//   const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

//   if (!supabaseUrl || !supabaseKey) {
//     return NextResponse.redirect(new URL("/auth/login", request.url))
//   }

//   const response = NextResponse.next()

//   try {
//     const supabase = createServerClient(supabaseUrl, supabaseKey, {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll()
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) => {
//             response.cookies.set(name, value, options)
//           })
//         },
//       },
//     })

//     const {
//       data: { session },
//       error,
//     } = await supabase.auth.getSession()


//     if (error) {
//       console.log("[v0] Auth error:", error.message)
//       return NextResponse.redirect(new URL("/auth/login", request.url))
//     }

//     if (!session || !session.user) {
//       console.log("[v0] No valid session found, redirecting to login")
//       return NextResponse.redirect(new URL("/auth/login", request.url))
//     }

//     console.log("[v0] User authenticated, allowing access to:", pathname)
//     return response
//   } catch (error) {
//     console.log("[v0] Middleware error:", error)
//     return NextResponse.redirect(new URL("/auth/login", request.url))
//   }
// }

// export const config = {
//   matcher: ["/((?!_next|images|favicon.ico|.*\\..*).*)"],
// }
