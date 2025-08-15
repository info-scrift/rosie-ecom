"use client"

import { Card } from "@/components/ui/card"
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
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"} mb-6`}>
      {!isUser && (
        <Avatar className="w-8 h-8 bg-blue-500 flex-shrink-0">
          <AvatarFallback>
            <Bot className="w-4 h-4 text-blue-500" />
          </AvatarFallback>
        </Avatar>
      )}

      <div className={`max-w-[85%] ${isUser ? "order-first" : ""}`}>
        <Card className={`p-4 ${isUser ? "bg-blue-500 text-white" : "bg-white border"}`}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed break-words">{message.content}</div>
        </Card>

        {/* Show products for AI messages */}
        {!isUser && (
          <>
            {isLoadingProducts && (
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-4 h-4 text-blue-500 animate-spin" />
                  <span className="text-sm font-medium text-gray-700">Loading products...</span>
                </div>
                <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
                  ))}
                </div>
              </div>
            )}

            {!isLoadingProducts && recommendedProducts.length > 0 && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Recommended Products ({recommendedProducts.length}):
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* Only show "no products found" if search is completed and no products found AND the AI didn't already mention no products */}
            {!isLoadingProducts &&
              recommendedProducts.length === 0 &&
              searchCompleted &&
              isComplete &&
              !message.content.toLowerCase().includes("don't have") &&
              !message.content.toLowerCase().includes("currently unavailable") &&
              !message.content.toLowerCase().includes("no products") && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">No specific products found for this response.</span>
                  </div>
                </div>
              )}
          </>
        )}
      </div>

      {isUser && (
        <Avatar className="w-8 h-8 bg-gray-500 flex-shrink-0">
          <AvatarFallback>
            <User className="w-4 h-4 text-blue-500" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
