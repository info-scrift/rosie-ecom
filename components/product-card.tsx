import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check, Star, ListFilter } from "lucide-react"
import Image from "next/image"
import type { Product } from "@/lib/supabase"
import Link from "next/link"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image_url || `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(product.name)}`

  return (
    <Card className="w-full h-full hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="pb-3">
        <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden bg-gray-50">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.in_stock && (
            <Badge className="absolute top-2 right-2 bg-green-500 text-white">
              <Check className="w-3 h-3 mr-1" />
              In Stock
            </Badge>
          )}
        </div>
        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs w-fit">
            {product.category}
          </Badge>
          <CardTitle className="text-base font-semibold line-clamp-2 leading-tight">{product.name}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 pb-3">
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{product.description}</p>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Key Features:</h4>
          <ul className="space-y-1">
            {product.features.slice(0, 2).map((feature, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-start leading-tight">
                <Star className="w-3 h-3 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold text-green-600">${product.price}</span>
          {/* <div className="flex items-center space-x-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" />
            ))}
            <span className="text-xs text-gray-500 ml-1">(4.8)</span>
          </div> */}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Link href={`/products/${product.id}`} >
        <Button className="w-full text-sm" disabled={!product.in_stock} size="sm">
          <ListFilter className="w-4 h-4 mr-2" />
          View Product Details
          {/* {product.in_stock ? "Add To Cart" : "Out of Stock"} */}
        </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
