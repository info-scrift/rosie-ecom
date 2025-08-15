"use client"

import { useState } from "react"
import type { Course } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
// import { useCartStore } from "@/lib/cart-store"
import { Clock, BookOpen, Star, Users, Award, Play, Heart, ShoppingCart, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface CourseCardProps {
  course: Course
  viewMode?: "grid" | "list"
}

export function CourseCard({ course, viewMode = "grid" }: CourseCardProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const [isWishlisted, setIsWishlisted] = useState(false)
//   const addToCart = useCartStore((state) => state.addItem)
  const addToCart = ()=>{console.log('added')}


  const handleAddToCart = () => {
    // addToCart({
    //   id: course.id,
    //   name: course.title,
    //   price: course.price,
    //   image: course.image_url,
    //   type: "course",
    // })
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const discountPercentage = course.original_price
    ? Math.round(
        ((Number.parseFloat(course.original_price) - Number.parseFloat(course.price)) /
          Number.parseFloat(course.original_price)) *
          100,
      )
    : 0

  if (viewMode === "list") {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Course Image */}
            <div className="relative md:w-80 h-48 md:h-auto overflow-hidden rounded-l-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
              <Image
                src={course.image_url || "/placeholder.svg"}
                alt={course.title}
                fill
                className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                  imageLoading ? "blur-sm" : "blur-0"
                }`}
                onLoad={() => setImageLoading(false)}
              />

              {/* Level Badge */}
              <Badge
                className={`absolute top-3 left-3 z-20 ${
                  course.level === "Beginner"
                    ? "bg-green-500"
                    : course.level === "Intermediate"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
              >
                {course.level}
              </Badge>

              {/* Preview Button */}
              {course.video_preview_url && (
                <Button
                  size="sm"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                >
                  <Play className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Course Content */}
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {course.category}
                  </Badge>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">by {course.instructor}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleWishlist}
                  className="text-muted-foreground hover:text-red-500"
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>

              {/* Course Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration_hours}h</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.total_lessons} lessons</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{course.enrolled_students.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                  <span>({course.total_reviews})</span>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">${course.price}</span>
                  {course.original_price && (
                    <>
                      <span className="text-sm text-muted-foreground line-through">${course.original_price}</span>
                      <Badge variant="destructive" className="text-xs">
                        {discountPercentage}% OFF
                      </Badge>
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link href={`/courses/${course.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                  <Button onClick={handleAddToCart} size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white/90 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-0">
        {/* Course Image */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
          <Image
            src={course.image_url || "/placeholder.svg"}
            alt={course.title}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoading ? "blur-sm" : "blur-0"
            }`}
            onLoad={() => setImageLoading(false)}
          />

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleWishlist}
            className="absolute top-3 right-3 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
          </Button>

          {/* Level Badge */}
          <Badge
            className={`absolute top-3 left-3 z-20 ${
              course.level === "Beginner"
                ? "bg-green-500"
                : course.level === "Intermediate"
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
          >
            {course.level}
          </Badge>

          {/* Preview Button */}
          {course.video_preview_url && (
            <Button
              size="sm"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <Play className="h-6 w-6" />
            </Button>
          )}

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <Badge className="absolute bottom-3 left-3 z-20 bg-red-500">{discountPercentage}% OFF</Badge>
          )}
        </div>

        {/* Course Content */}
        <div className="p-4">
          <Badge variant="secondary" className="mb-2">
            {course.category}
          </Badge>

          <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>

          <p className="text-sm text-muted-foreground mb-3">by {course.instructor}</p>

          {/* Course Stats */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{course.duration_hours}h</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              <span>{course.total_lessons}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>
                {course.enrolled_students > 1000
                  ? `${Math.floor(course.enrolled_students / 1000)}k`
                  : course.enrolled_students}
              </span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(course.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {course.rating} ({course.total_reviews})
            </span>
          </div>

          {/* Features */}
          <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
            {course.has_certificate && (
              <div className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                <span>Certificate</span>
              </div>
            )}
            {course.lifetime_access && (
              <Badge variant="outline" className="text-xs">
                Lifetime Access
              </Badge>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-green-600">${course.price}</span>
              {course.original_price && (
                <span className="text-sm text-muted-foreground line-through">${course.original_price}</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Link href={`/courses/${course.id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </Link>
            <Button onClick={handleAddToCart} size="sm" className="flex-1">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
