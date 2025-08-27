
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Eye, Heart, Package, CheckCircle, XCircle } from "lucide-react"
import type { Product } from "@/lib/supabase"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  product: Product
  viewMode: "grid" | "list"
}

export function ProductCard({ product, viewMode }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  if (viewMode === "list") {
    return (
      <Card
        className=" group overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          <div className="flex items-center gap-6 p-6">
            {/* Image */}
            <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200">
              {product.image_url ? (
                <Image
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-8 w-8 text-slate-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">{product.description}</p>

                  {/* Category and Stock */}
                  <div className="flex items-center gap-3 mt-3">
                    <Badge variant="secondary" className="text-xs font-medium">
                      {product.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {product.in_stock ? (
                        <>
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs text-green-600 font-medium">In Stock</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 text-red-500" />
                          <span className="text-xs text-red-600 font-medium">Out of Stock</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Symptoms */}
                  {product.symptoms.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.symptoms.slice(0, 3).map((symptom) => (
                        <Badge key={symptom} variant="outline" className="text-xs">
                          {symptom}
                        </Badge>
                      ))}
                      {product.symptoms.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{product.symptoms.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                {/* Price and Actions */}
                <div className="text-right flex-shrink-0">
                  <p className="text-2xl font-bold text-slate-900 mb-3">${product.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="p-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200 bg-transparent"
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="p-2 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200 bg-transparent"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                                    <Link href={`/products/${product.id}`} className="flex-1">
                    <Button
                      size="sm"
                      disabled={!product.in_stock}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      {/* <ShoppingCart className="h-4 w-4 mr-1" /> */}
                      View Details
                    </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className="group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 border-0 bg-white/90 backdrop-blur-sm animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        {product.image_url ? (
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-16 w-16 text-slate-400 transition-transform duration-300 group-hover:scale-110" />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <Button
            size="sm"
            variant="secondary"
            className="p-2 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-slate-600"}`} />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="p-2 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
          >
            <Eye className="h-4 w-4 text-slate-600" />
          </Button>
        </div>

        {/* Stock Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            variant={product.in_stock ? "default" : "destructive"}
            className={`${
              product.in_stock ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
            } text-white border-0 shadow-lg transition-all duration-200`}
          >
            {product.in_stock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Category */}
        <Badge variant="outline" className="mb-3 text-xs font-medium border-blue-200 text-blue-700 bg-blue-50">
          {product.category}
        </Badge>

        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">{product.description}</p>

        {/* Symptoms */}
        {product.symptoms.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.symptoms.slice(0, 2).map((symptom) => (
              <Badge
                key={symptom}
                variant="secondary"
                className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors duration-200"
              >
                {symptom}
              </Badge>
            ))}
            {product.symptoms.length > 2 && (
              <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                +{product.symptoms.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-slate-900">${product.price.toFixed(2)}</p>
                                              <Link href={`/products/${product.id}`} className="flex-1">
          <Button
            disabled={!product.in_stock}
            className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {/* <ShoppingCart className="h-4 w-4 mr-2" /> */}
            View Details
          </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

// "use client"

// import type React from "react"

// import { useState } from "react"
// import Link from "next/link"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// // import { useCartStore } from "@/lib/cart-store"
// import { ShoppingCart, Eye, Heart } from "lucide-react"
// import type { Product } from "@/lib/supabase"
// import { useToast } from "@/hooks/use-toast"

// interface ProductCardProps {
//   product: Product
//   viewMode?: "grid" | "list"
// }

// export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [isWishlisted, setIsWishlisted] = useState(false)
// //   const addItem = useCartStore((state) => state.addItem)
//   const addItem = ()=>{console.log('added')}

//   const { toast } = useToast()

//   const handleAddToCart = async (e: React.MouseEvent) => {
//     e.preventDefault()
//     e.stopPropagation()

//     if (!product.in_stock) return

//     setIsLoading(true)

//     // Simulate API call delay
//     await new Promise((resolve) => setTimeout(resolve, 300))

//     // addItem(product)
//     setIsLoading(false)

//     toast({
//       title: "Added to cart",
//       description: `${product.name} has been added to your cart.`,
//     })
//   }

//   const handleWishlist = (e: React.MouseEvent) => {
//     e.preventDefault()
//     e.stopPropagation()
//     setIsWishlisted(!isWishlisted)

//     toast({
//       title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
//       description: `${product.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
//     })
//   }

//   if (viewMode === "list") {
//     return (
//       <Card className="group hover:shadow-lg transition-all duration-300 border hover:border-primary/20">
//         <CardContent className="p-0">
//           <div className="flex flex-col sm:flex-row">
//             <div className="relative sm:w-48 h-48 sm:h-32 overflow-hidden">
//               <img
//                 src={product.image_url || "/placeholder.svg?height=200&width=200&query=product"}
//                 alt={product.name}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//               />
//               <Badge variant={product.in_stock ? "default" : "destructive"} className="absolute top-2 left-2">
//                 {product.in_stock ? "In Stock" : "Out of Stock"}
//               </Badge>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/90 hover:bg-white"
//                 onClick={handleWishlist}
//               >
//                 <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
//               </Button>
//             </div>

//             <div className="flex-1 p-4 flex flex-col justify-between">
//               <div className="space-y-2">
//                 <div className="flex items-start justify-between">
//                   <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
//                     {product.name}
//                   </h3>
//                   <span className="text-xl font-bold text-primary">${product.price}</span>
//                 </div>

//                 <Badge variant="outline" className="text-xs w-fit">
//                   {product.category}
//                 </Badge>

//                 <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

//                 {product.symptoms.length > 0 && (
//                   <div className="flex flex-wrap gap-1">
//                     {product.symptoms.slice(0, 4).map((symptom, idx) => (
//                       <Badge key={idx} variant="secondary" className="text-xs capitalize">
//                         {symptom}
//                       </Badge>
//                     ))}
//                     {product.symptoms.length > 4 && (
//                       <Badge variant="secondary" className="text-xs">
//                         +{product.symptoms.length - 4} more
//                       </Badge>
//                     )}
//                   </div>
//                 )}
//               </div>

//               <div className="flex items-center gap-2 mt-4">
                // <Link href={`/products/${product.id}`} className="flex-1">
//                   <Button variant="outline" className="w-full gap-2 bg-transparent">
//                     <Eye className="h-4 w-4" />
//                     View Details
//                   </Button>
//                 </Link>
//                 <Button onClick={handleAddToCart} disabled={!product.in_stock || isLoading} className="flex-1 gap-2">
//                   <ShoppingCart className="h-4 w-4" />
//                   {isLoading ? "Adding..." : "Add to Cart"}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <Link href={`/products/${product.id}`}>
//       <Card className="group hover:shadow-xl transition-all duration-300 border hover:border-primary/20 cursor-pointer h-full">
//         <div className="relative overflow-hidden rounded-t-lg">
//           <img
//             src={product.image_url || "/placeholder.svg?height=300&width=300&query=product"}
//             alt={product.name}
//             className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
//           />
//           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

//           <Badge variant={product.in_stock ? "default" : "destructive"} className="absolute top-3 left-3 shadow-sm">
//             {product.in_stock ? "In Stock" : "Out of Stock"}
//           </Badge>

//           <Button
//             variant="ghost"
//             size="sm"
//             className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-sm"
//             onClick={handleWishlist}
//           >
//             <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
//           </Button>

//           {/* Hover overlay with quick actions */}
//           <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//             <div className="flex gap-2">
//               <Button size="sm" variant="secondary" className="gap-2">
//                 <Eye className="h-4 w-4" />
//                 Quick View
//               </Button>
//             </div>
//           </div>
//         </div>

//         <CardContent className="p-4 flex-1 flex flex-col">
//           <div className="space-y-3 flex-1">
//             <div className="flex items-start justify-between">
//               <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
//                 {product.name}
//               </h3>
//             </div>

//             <div className="flex items-center justify-between">
//               <Badge variant="outline" className="text-xs">
//                 {product.category}
//               </Badge>
//               <span className="text-xl font-bold text-primary">${product.price}</span>
//             </div>

//             <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{product.description}</p>

//             {product.symptoms.length > 0 && (
//               <div className="flex flex-wrap gap-1">
//                 {product.symptoms.slice(0, 3).map((symptom, idx) => (
//                   <Badge key={idx} variant="secondary" className="text-xs capitalize">
//                     {symptom}
//                   </Badge>
//                 ))}
//                 {product.symptoms.length > 3 && (
//                   <Badge variant="secondary" className="text-xs">
//                     +{product.symptoms.length - 3} more
//                   </Badge>
//                 )}
//               </div>
//             )}
//           </div>

//           <div className="flex items-center gap-2 mt-4 pt-3 border-t">
//             <Button
//               variant="outline"
//               size="sm"
//               className="flex-1 gap-2 bg-transparent"
//               onClick={(e) => {
//                 e.preventDefault()
//                 e.stopPropagation()
//               }}
//             >
//               <Eye className="h-4 w-4" />
//               View Details
//             </Button>
//             <Button
//               size="sm"
//               onClick={handleAddToCart}
//               disabled={!product.in_stock || isLoading}
//               className="flex-1 gap-2"
//             >
//               <ShoppingCart className="h-4 w-4" />
//               {isLoading ? "Adding..." : "Add to Cart"}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </Link>
//   )
// }
