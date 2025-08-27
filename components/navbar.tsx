
"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth"
// import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Home,
  Package,
  GraduationCap,
  MessageCircle,
  ShoppingCart,
  User,
  LogOut,
  Menu,
  ShoppingBag,
} from "lucide-react"
import { deleteAllCookies } from "@/lib/utils"
import { useRouter } from "next/navigation"
const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Products", icon: Package },
  { href: "/courses", label: "Courses", icon: GraduationCap },
  { href: "/chatbot", label: "Chatbot", icon: MessageCircle },
]

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  //   const { getTotalItems } = useCartStore()
  const [isOpen, setIsOpen] = useState(false)

  //   const totalItems = getTotalItems()
  const totalItems = 0

  const handleSignOut = async () => {
    deleteAllCookies()
    await signOut()
    router.push("/auth/login")
  }

  if (!pathname.startsWith("/auth") && !pathname.startsWith("/admin")) {
    return (
      <nav className="py-2 relative z-50 w-full border-b border-slate-200/60 bg-white/95 backdrop-blur-xl shadow-lg transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex h-18 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                <ShoppingBag className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-300">
                Renalfusion
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                        isActive
                          ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 shadow-md border border-blue-100"
                          : "text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border hover:border-blue-100"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-semibold">{item.label}</span>
                    </Button>
                  </Link>
                )
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <Button
                variant="ghost"
                size="sm"
                className="relative p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-md group"
              >
                <ShoppingCart className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </Button>

              {/* User Menu */}
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-3 px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 transform hover:scale-105 hover:shadow-md group"
                    >
                      <div className="h-9 w-9 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <span className="hidden sm:block text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                        {user.user_metadata?.display_name || user.email?.split("@")[0]}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-64 shadow-2xl border-0 bg-white/95 backdrop-blur-xl rounded-xl p-2"
                  >
                    <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg mb-2">
                      <p className="text-sm font-semibold text-gray-900">
                        {user.user_metadata?.display_name || "User"}
                      </p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuItem className="cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-lg transition-all duration-200 p-3">
                      <Package className="mr-3 h-4 w-4 text-blue-600" />
                      <span className="font-medium">Orders</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200 p-3"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="font-medium">Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Mobile Menu */}
              <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Menu className="h-6 w-6 text-gray-600 hover:text-blue-600" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-xl border-l border-slate-200/60">
                    <div className="flex flex-col space-y-6 mt-8">
                      {/* User Info */}
                      {user && (
                        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm">
                          <div className="h-12 w-12 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                            <User className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {user.user_metadata?.display_name || "User"}
                            </p>
                            <p className="text-xs text-gray-600">{user.email}</p>
                          </div>
                        </div>
                      )}

                      {/* Navigation Links */}
                      <div className="space-y-3">
                        {navItems.map((item, index) => {
                          const Icon = item.icon
                          const isActive =
                            pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

                          return (
                            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                              <Button
                                variant="ghost"
                                className={`w-full justify-start space-x-4 p-4 h-auto rounded-xl transition-all duration-300 transform hover:scale-105 ${
                                  isActive
                                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 shadow-md border border-blue-100"
                                    : "text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md"
                                }`}
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                <Icon className="h-5 w-5" />
                                <span className="font-semibold">{item.label}</span>
                              </Button>
                            </Link>
                          )
                        })}
                      </div>

                      {/* Cart Link */}
                      <Link href="/cart" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start space-x-4 p-4 h-auto text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                        >
                          <div className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            {totalItems > 0 && (
                              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                {totalItems > 9 ? "9+" : totalItems}
                              </span>
                            )}
                          </div>
                          <span className="font-semibold">Cart</span>
                        </Button>
                      </Link>

                      {/* Sign Out */}
                      {user && (
                        <Button
                          variant="ghost"
                          className="w-full justify-start space-x-4 p-4 h-auto text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                          onClick={() => {
                            handleSignOut()
                            setIsOpen(false)
                          }}
                        >
                          <LogOut className="h-5 w-5" />
                          <span className="font-semibold">Sign Out</span>
                        </Button>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}


// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { useAuth } from "@/lib/auth"
// // import { useCartStore } from "@/lib/cart-store"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import {
//   Home,
//   Package,
//   GraduationCap,
//   MessageCircle,
//   ShoppingCart,
//   User,
//   LogOut,
//   Menu,
//   ShoppingBag,
// } from "lucide-react"
// import { deleteAllCookies } from "@/lib/utils"
// import { useRouter } from "next/navigation"
// const navItems = [
//   { href: "/", label: "Home", icon: Home },
//   { href: "/products", label: "Products", icon: Package },
//   { href: "/courses", label: "Courses", icon: GraduationCap },
//   { href: "/chatbot", label: "Chatbot", icon: MessageCircle },
// ]

// export function Navbar() {
//      const router = useRouter();
//   const pathname = usePathname()
//   const { user, signOut } = useAuth()
// //   const { getTotalItems } = useCartStore()
//   const [isOpen, setIsOpen] = useState(false)

// //   const totalItems = getTotalItems()
//   const totalItems = 0


//   const handleSignOut = async () => {
//     deleteAllCookies()
//     await signOut()
//     router.push("/auth/login")
//   }

//     if (!pathname.startsWith("/auth") && !pathname.startsWith("/admin")  ) {

//   return (
//     <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2">
//             <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md">
//               <ShoppingBag className="h-6 w-6 text-white" />
//             </div>
//             <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               Renalfusion
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-4">
//             {navItems.map((item) => {
//               const Icon = item.icon
//               const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

//               return (
//                 <Link key={item.href} href={item.href}>
//                   <Button
//                     variant="ghost"
//                     className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
//                       isActive
//                         ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 shadow-sm"
//                         : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
//                     }`}
//                   >
//                     <Icon className="h-4 w-4" />
//                     <span className="font-medium">{item.label}</span>
//                   </Button>
//                 </Link>
//               )
//             })}
//           </div>

//           {/* Right Side Actions */}
//           <div className="flex items-center space-x-3">
//             {/* Cart Button */}
//             {/* <Link href="/cart"> */}
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <ShoppingCart className="h-7 w-7 text-gray-600" />
//                 {totalItems > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-lg">
//                     {totalItems > 99 ? "99+" : totalItems}
//                   </span>
//                 )}
//               </Button>
//             {/* </Link> */}

//             {/* User Menu */}
//             {user && (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors"
//                   >
//                     <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
//                       <User className="h-4 w-4 text-white" />
//                     </div>
//                     <span className="hidden sm:block text-sm font-medium text-gray-700">
//                       {user.user_metadata?.display_name || user.email?.split("@")[0]}
//                     </span>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-56 shadow-lg border-0 bg-white/95 backdrop-blur-sm">
//                   <div className="px-3 py-2">
//                     <p className="text-sm font-medium text-gray-900">{user.user_metadata?.display_name || "User"}</p>
//                     <p className="text-xs text-gray-500">{user.email}</p>
//                   </div>
//                   <DropdownMenuSeparator />
//                   {/* <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
//                     <User className="mr-2 h-4 w-4" />
//                     Profile
//                   </DropdownMenuItem> */}
//                   <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
//                     <Package className="mr-2 h-4 w-4" />
//                     Orders
//                   </DropdownMenuItem>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem
//                     className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700"
//                     onClick={handleSignOut}
//                   >
//                     <LogOut className="mr-2 h-4 w-4" />
//                     Sign Out
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             )}

//             {/* Mobile Menu */}
//             <div className="md:hidden">
//               <Sheet open={isOpen} onOpenChange={setIsOpen}>
//                 <SheetTrigger asChild>
//                   <Button variant="ghost" size="sm" className="p-2">
//                     <Menu className="h-5 w-5" />
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-sm">
//                   <div className="flex flex-col space-y-4 mt-8">
//                     {/* User Info */}
//                     {user && (
//                       <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
//                         <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
//                           <User className="h-5 w-5 text-white" />
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">
//                             {user.user_metadata?.display_name || "User"}
//                           </p>
//                           <p className="text-xs text-gray-500">{user.email}</p>
//                         </div>
//                       </div>
//                     )}

//                     {/* Navigation Links */}
//                     <div className="space-y-2">
//                       {navItems.map((item) => {
//                         const Icon = item.icon
//                         const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

//                         return (
//                           <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
//                             <Button
//                               variant="ghost"
//                               className={`w-full justify-start space-x-3 p-4 h-auto ${
//                                 isActive
//                                   ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600"
//                                   : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
//                               }`}
//                             >
//                               <Icon className="h-5 w-5" />
//                               <span className="font-medium">{item.label}</span>
//                             </Button>
//                           </Link>
//                         )
//                       })}
//                     </div>

//                     {/* Cart Link */}
//                     <Link href="/cart" onClick={() => setIsOpen(false)}>
//                       <Button
//                         variant="ghost"
//                         className="w-full justify-start space-x-3 p-4 h-auto text-gray-600 hover:text-blue-600 hover:bg-gray-50"
//                       >
//                         <div className="relative">
//                           <ShoppingCart className="h-5 w-5" />
//                           {totalItems > 0 && (
//                             <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
//                               {totalItems > 9 ? "9+" : totalItems}
//                             </span>
//                           )}
//                         </div>
//                         <span className="font-medium">Cart</span>
//                       </Button>
//                     </Link>

//                     {/* Sign Out */}
//                     {user && (
//                       <Button
//                         variant="ghost"
//                         className="w-full justify-start space-x-3 p-4 h-auto text-red-600 hover:text-red-700 hover:bg-red-50"
//                         onClick={() => {
//                           handleSignOut()
//                           setIsOpen(false)
//                         }}
//                       >
//                         <LogOut className="h-5 w-5" />
//                         <span className="font-medium">Sign Out</span>
//                       </Button>
//                     )}
//                   </div>
//                 </SheetContent>
//               </Sheet>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }
// }
