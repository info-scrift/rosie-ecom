// "use client"

// import { Card } from "@/components/ui/card"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { User, Bot, Package } from "lucide-react"
// import { ProductCard } from "./product-card"
// import { useEffect, useState } from "react"
// import type { Product } from "@/lib/supabase"
// import type { Message } from "ai"

// interface ChatMessageProps {
//   message: Message & {
//     recommended_products?: string[]
//   }
//   isComplete?: boolean
// }

// export function ChatMessage({ message, isComplete = true }: ChatMessageProps) {
//   const isUser = message.role === "user"
//   const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])
//   const [isLoadingProducts, setIsLoadingProducts] = useState(false)
//   const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false)
//   const [searchCompleted, setSearchCompleted] = useState(false)

//   // Load products when message is complete and we haven't tried yet
//   useEffect(() => {
//     console.log("ChatMessage useEffect:", {
//       messageId: message.id,
//       isUser,
//       isComplete,
//       hasAttemptedLoad,
//       contentLength: message.content?.length || 0,
//       hasRecommendedProducts: !!message.recommended_products?.length,
//     })

//     if (!isUser && isComplete && !hasAttemptedLoad && message.content && message.content.length > 20) {
//       console.log("ChatMessage - Starting product load for message:", message.id)
//       setHasAttemptedLoad(true)
//       setSearchCompleted(false)

//       // Add a small delay to ensure the message is fully rendered
//       setTimeout(() => {
//         loadProducts()
//       }, 1000)
//     }
//   }, [isUser, isComplete, hasAttemptedLoad, message.content, message.recommended_products, message.id])

//   const loadProducts = async () => {
//     console.log("ChatMessage - loadProducts called for message:", message.id)
//     setIsLoadingProducts(true)

//     try {
//       let products: Product[] = []

//       // First try to use recommended_products array if available
//       if (message.recommended_products && message.recommended_products.length > 0) {
//         console.log("ChatMessage - Fetching products by IDs:", message.recommended_products)
//         const response = await fetch(`/api/products?ids=${message.recommended_products.join(",")}`)
//         const data = await response.json()

//         if (data.products && data.products.length > 0) {
//           products = data.products
//           console.log(
//             "ChatMessage - Found products by IDs:",
//             products.map((p) => p.name),
//           )
//         }
//       }

//       // If no products from IDs, search in text
//       if (products.length === 0) {
//         console.log("ChatMessage - Searching products in text")
//         const response = await fetch("/api/products")
//         const data = await response.json()

//         if (data.products) {
//           const messageText = message.content.toLowerCase()
//           const matchedProducts = data.products.filter((product: Product) => {
//             const productName = product.name.toLowerCase()
//             return messageText.includes(productName)
//           })

//           if (matchedProducts.length > 0) {
//             products = matchedProducts.slice(0, 4)
//             console.log(
//               "ChatMessage - Found products in text:",
//               products.map((p) => p.name),
//             )
//           }
//         }
//       }

//       console.log("ChatMessage - Setting recommended products:", products.length)
//       setRecommendedProducts(products)
//     } catch (error) {
//       console.error("Error loading products:", error)
//     } finally {
//       setIsLoadingProducts(false)
//       setSearchCompleted(true)
//     }
//   }

//   if (message.role !== "user" && message.role !== "assistant") {
//     return null
//   }

//   return (
//     <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"} mb-6`}>
//       {!isUser && (
//         <Avatar className="w-8 h-8 bg-blue-500 flex-shrink-0">
//           <AvatarFallback>
//             <Bot className="w-4 h-4 text-blue-500" />
//           </AvatarFallback>
//         </Avatar>
//       )}

//       <div className={`max-w-[85%] ${isUser ? "order-first" : ""}`}>
//         <Card className={`p-4 ${isUser ? "bg-blue-500 text-white" : "bg-white border"}`}>
//           <div className="whitespace-pre-wrap text-sm leading-relaxed break-words">{message.content}</div>
//         </Card>

//         {/* Show products for AI messages */}
//         {!isUser && (
//           <>
//             {isLoadingProducts && (
//               <div className="mt-4">
//                 <div className="flex items-center gap-2 mb-3">
//                   <Package className="w-4 h-4 text-blue-500 animate-spin" />
//                   <span className="text-sm font-medium text-gray-700">Loading products...</span>
//                 </div>
//                 <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {[1, 2].map((i) => (
//                     <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {!isLoadingProducts && recommendedProducts.length > 0 && (
//               <div className="mt-4 space-y-4">
//                 <div className="flex items-center gap-2">
//                   <Package className="w-5 h-5 text-green-500" />
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     Recommended Products ({recommendedProducts.length}):
//                   </h3>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {recommendedProducts.map((product) => (
//                     <ProductCard key={product.id} product={product} />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Only show "no products found" if search is completed and no products found AND the AI didn't already mention no products */}
//             {!isLoadingProducts &&
//               recommendedProducts.length === 0 &&
//               searchCompleted &&
//               isComplete &&
//               !message.content.toLowerCase().includes("don't have") &&
//               !message.content.toLowerCase().includes("currently unavailable") &&
//               !message.content.toLowerCase().includes("no products") && (
//                 <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
//                   <div className="flex items-center gap-2">
//                     <Package className="w-4 h-4 text-gray-400" />
//                     <span className="text-sm text-gray-600">No specific products found for this response.</span>
//                   </div>
//                 </div>
//               )}
//           </>
//         )}
//       </div>

//       {isUser && (
//         <Avatar className="w-8 h-8 bg-gray-500 flex-shrink-0">
//           <AvatarFallback>
//             <User className="w-4 h-4 text-blue-500" />
//           </AvatarFallback>
//         </Avatar>
//       )}
//     </div>
//   )
// }

"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Bot, Package } from "lucide-react"
import { ProductCard } from "./product-card"
import { useEffect, useState } from "react"
import type { Product } from "@/lib/supabase"
import type { Message } from "ai"

interface ChatMessageProps {
  message: Message & {
    recommended_products?: string[]
  }
  isComplete?: boolean
}

export function ChatMessage({ message, isComplete = true }: ChatMessageProps) {
  const isUser = message.role === "user"
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false)
  const [searchCompleted, setSearchCompleted] = useState(false)

  // Load products when message is complete and we haven't tried yet
  useEffect(() => {
    console.log("ChatMessage useEffect:", {
      messageId: message.id,
      isUser,
      isComplete,
      hasAttemptedLoad,
      contentLength: message.content?.length || 0,
      hasRecommendedProducts: !!message.recommended_products?.length,
    })

    if (!isUser && isComplete && !hasAttemptedLoad && message.content && message.content.length > 20) {
      console.log("ChatMessage - Starting product load for message:", message.id)
      setHasAttemptedLoad(true)
      setSearchCompleted(false)

      // Add a small delay to ensure the message is fully rendered
      setTimeout(() => {
        loadProducts()
      }, 1000)
    }
  }, [isUser, isComplete, hasAttemptedLoad, message.content, message.recommended_products, message.id])

  const loadProducts = async () => {
    console.log("ChatMessage - loadProducts called for message:", message.id)
    setIsLoadingProducts(true)

    try {
      let products: Product[] = []

      // First try to use recommended_products array if available
      if (message.recommended_products && message.recommended_products.length > 0) {
        console.log("ChatMessage - Fetching products by IDs:", message.recommended_products)
        const response = await fetch(`/api/products?ids=${message.recommended_products.join(",")}`)
        const data = await response.json()

        if (data.products && data.products.length > 0) {
          products = data.products
          console.log(
            "ChatMessage - Found products by IDs:",
            products.map((p) => p.name),
          )
        }
      }

      // If no products from IDs, search in text
      if (products.length === 0) {
        console.log("ChatMessage - Searching products in text")
        const response = await fetch("/api/products")
        const data = await response.json()

        if (data.products) {
          const messageText = message.content.toLowerCase()
          const matchedProducts = data.products.filter((product: Product) => {
            const productName = product.name.toLowerCase()
            return messageText.includes(productName)
          })

          if (matchedProducts.length > 0) {
            products = matchedProducts.slice(0, 4)
            console.log(
              "ChatMessage - Found products in text:",
              products.map((p) => p.name),
            )
          }
        }
      }

      console.log("ChatMessage - Setting recommended products:", products.length)
      setRecommendedProducts(products)
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setIsLoadingProducts(false)
      setSearchCompleted(true)
    }
  }

  if (message.role !== "user" && message.role !== "assistant") {
    return null
  }

  return (
    <div
      className={`flex gap-4 mb-6 animate-in slide-in-from-bottom-2 duration-300  ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 shadow-md flex-shrink-0 ring-2 ring-blue-100">
          <AvatarFallback className="bg-transparent">
            <Bot className="w-5 h-5 text-white" />
          </AvatarFallback>
        </Avatar>
      )}

      <div className={`max-w-[75%] sm:max-w-[85%] ${isUser ? "order-first" : ""}`}>
        <div className={`relative group ${isUser ? "ml-auto" : ""}`}>
          <div
            className={`transform transition-all duration-300 hover:scale-80 hover:-translate-y-1 hover:shadow-lg
            relative px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md
            ${
              isUser
                ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-md"
                : "bg-gray-100 border border-gray-200 rounded-bl-md"
            }
          `}
          >
            {/* Message tail */}
            <div
              className={`
              absolute w-3 h-3 transform rotate-45 
              ${
                isUser ? "bg-blue-500 -bottom-1 right-2" : "bg-white border-r border-b border-gray-200 -bottom-1 left-2"
              }
            `}
            />

            <div
              className={`
              relative z-10 text-sm leading-relaxed break-words whitespace-pre-wrap
              ${isUser ? "text-white" : "text-gray-800"}
            `}
            >
              {message.content}
            </div>
          </div>

          {/* Timestamp */}
          <div
            className={`
            text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200
            ${isUser ? "text-right" : "text-left"}
          `}
          >
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>

        {/* Show products for AI messages */}
        {!isUser && (
          <>
            {isLoadingProducts && (
              <div className="mt-6 animate-in fade-in duration-500">
                <div className="flex items-center gap-3 mb-4 px-1">
                  <div className="relative">
                    <Package className="w-5 h-5 text-blue-500" />
                    <div className="absolute inset-0 w-5 h-5 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Finding relevant products...</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 h-64 rounded-xl bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!isLoadingProducts && recommendedProducts.length > 0 && (
              <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 px-1">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Package className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Recommended Products</h3>
                    <p className="text-sm text-gray-600">
                      {recommendedProducts.length} product{recommendedProducts.length !== 1 ? "s" : ""} found for your
                      symptoms
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendedProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-in slide-in-from-bottom-4 duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!isLoadingProducts &&
              recommendedProducts.length === 0 &&
              searchCompleted &&
              isComplete &&
              !message.content.toLowerCase().includes("don't have") &&
              !message.content.toLowerCase().includes("currently unavailable") &&
              !message.content.toLowerCase().includes("no products") && (
                <div className="mt-6 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="p-2 bg-gray-200 rounded-full">
                      <Package className="w-4 h-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">No specific products found</p>
                      <p className="text-xs text-gray-500">
                        Try describing your symptoms differently for better results
                      </p>
                    </div>
                  </div>
                </div>
              )}
          </>
        )}
      </div>

      {isUser && (
        <Avatar className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 shadow-md flex-shrink-0 ring-2 ring-gray-100">
          <AvatarFallback className="bg-transparent">
            <User className="w-5 h-5 text-white" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
