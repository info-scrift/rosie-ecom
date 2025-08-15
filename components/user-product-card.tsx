"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
// import { useCartStore } from "@/lib/cart-store"
import { ShoppingCart, Eye, Heart } from "lucide-react"
import type { Product } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
  viewMode?: "grid" | "list"
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
//   const addItem = useCartStore((state) => state.addItem)
  const addItem = ()=>{console.log('added')}

  const { toast } = useToast()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!product.in_stock) return

    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // addItem(product)
    setIsLoading(false)

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)

    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    })
  }

  if (viewMode === "list") {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 border hover:border-primary/20">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            <div className="relative sm:w-48 h-48 sm:h-32 overflow-hidden">
              <img
                src={product.image_url || "/placeholder.svg?height=200&width=200&query=product"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge variant={product.in_stock ? "default" : "destructive"} className="absolute top-2 left-2">
                {product.in_stock ? "In Stock" : "Out of Stock"}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/90 hover:bg-white"
                onClick={handleWishlist}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            <div className="flex-1 p-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-xl font-bold text-primary">${product.price}</span>
                </div>

                <Badge variant="outline" className="text-xs w-fit">
                  {product.category}
                </Badge>

                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

                {product.symptoms.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {product.symptoms.slice(0, 4).map((symptom, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs capitalize">
                        {symptom}
                      </Badge>
                    ))}
                    {product.symptoms.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{product.symptoms.length - 4} more
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Link href={`/products/${product.id}`} className="flex-1">
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </Link>
                <Button onClick={handleAddToCart} disabled={!product.in_stock || isLoading} className="flex-1 gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  {isLoading ? "Adding..." : "Add to Cart"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 border hover:border-primary/20 cursor-pointer h-full">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image_url || "/placeholder.svg?height=300&width=300&query=product"}
            alt={product.name}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          <Badge variant={product.in_stock ? "default" : "destructive"} className="absolute top-3 left-3 shadow-sm">
            {product.in_stock ? "In Stock" : "Out of Stock"}
          </Badge>

          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-sm"
            onClick={handleWishlist}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
          </Button>

          {/* Hover overlay with quick actions */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" className="gap-2">
                <Eye className="h-4 w-4" />
                Quick View
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="space-y-3 flex-1">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {product.name}
              </h3>
            </div>

            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
              <span className="text-xl font-bold text-primary">${product.price}</span>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{product.description}</p>

            {product.symptoms.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {product.symptoms.slice(0, 3).map((symptom, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs capitalize">
                    {symptom}
                  </Badge>
                ))}
                {product.symptoms.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{product.symptoms.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mt-4 pt-3 border-t">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-2 bg-transparent"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <Eye className="h-4 w-4" />
              View Details
            </Button>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.in_stock || isLoading}
              className="flex-1 gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              {isLoading ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
