"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { supabase, type Course } from "@/lib/supabase"
// import { useCartStore } from "@/lib/cart-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Clock,
  BookOpen,
  Star,
  Users,
  Award,
  Play,
  CheckCircle,
  Globe,
  Infinity,
  ShoppingCart,
  Heart,
  Share2,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CourseDetailsPage() {
  const params = useParams()
  const courseId = params.id as string
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageLoading, setImageLoading] = useState(true)
  const [isWishlisted, setIsWishlisted] = useState(false)
//   const addToCart = useCartStore((state) => state.addItem)
  const addToCart = ()=>{console.log('added')}

  useEffect(() => {
    if (courseId) {
      fetchCourse()
    }
  }, [courseId])

  const fetchCourse = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", courseId)
      .eq("is_published", true)
      .single()

    if (error) {
      console.error("Error fetching course:", error)
    } else {
      setCourse(data)
    }
    setLoading(false)
  }

  const handleAddToCart = () => {
    if (course) {
    //   addToCart({
    //     id: course.id,
    //     name: course.title,
    //     price: course.price,
    //     image: course.image_url,
    //     type: "course",
    //   })
    }
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const discountPercentage = course?.original_price
    ? Math.round(
        ((Number.parseFloat(course.original_price) - Number.parseFloat(course.price)) /
          Number.parseFloat(course.original_price)) *
          100,
      )
    : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-20 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-80 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Course not found</h3>
            <p className="text-muted-foreground mb-6">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/courses">
              <Button>Browse All Courses</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/courses">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <Card className="overflow-hidden">
              <div className="relative h-64 md:h-80">
                <Image
                  src={course.image_url || "/placeholder.svg"}
                  alt={course.title}
                  fill
                  className={`object-cover transition-all duration-500 ${imageLoading ? "blur-sm" : "blur-0"}`}
                  onLoad={() => setImageLoading(false)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Course Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      className={`${
                        course.level === "Beginner"
                          ? "bg-green-500"
                          : course.level === "Intermediate"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    >
                      {course.level}
                    </Badge>
                    <Badge variant="secondary">{course.category}</Badge>
                    {course.is_featured && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500">Featured</Badge>
                    )}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{course.title}</h1>
                  <p className="text-lg text-gray-200">by {course.instructor}</p>
                </div>

                {/* Preview Button */}
                {course.video_preview_url && (
                  <Button
                    size="lg"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  >
                    <Play className="h-6 w-6 mr-2" />
                    Preview Course
                  </Button>
                )}
              </div>
            </Card>

            {/* Course Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                  <p className="text-2xl font-bold">{course.duration_hours}h</p>
                  <p className="text-sm text-muted-foreground">Duration</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <BookOpen className="h-6 w-6 mx-auto mb-2 text-green-500" />
                  <p className="text-2xl font-bold">{course.total_lessons}</p>
                  <p className="text-sm text-muted-foreground">Lessons</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                  <p className="text-2xl font-bold">{course.enrolled_students.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Students</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500 fill-current" />
                  <p className="text-2xl font-bold">{course.rating}</p>
                  <p className="text-sm text-muted-foreground">({course.total_reviews} reviews)</p>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Course</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{course.description}</p>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.what_you_learn.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.course_content.modules.map((module, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{module.title}</h4>
                        <Badge variant="outline">{module.lessons} lessons</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card className="sticky top-6">
              <CardContent className="p-6">
                {/* Price */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-green-600">${course.price}</span>
                    {course.original_price && (
                      <>
                        <span className="text-lg text-muted-foreground line-through">${course.original_price}</span>
                        <Badge variant="destructive">{discountPercentage}% OFF</Badge>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">One-time payment</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mb-6">
                  <Button onClick={handleAddToCart} size="lg" className="w-full">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={toggleWishlist} className="flex-1 bg-transparent">
                      <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                      Wishlist
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                <Separator className="mb-6" />

                {/* Course Features */}
                <div className="space-y-4">
                  <h4 className="font-semibold">This course includes:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{course.duration_hours} hours of video content</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{course.total_lessons} lessons</span>
                    </div>
                    {course.has_certificate && (
                      <div className="flex items-center gap-3">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span>Certificate of completion</span>
                      </div>
                    )}
                    {course.lifetime_access && (
                      <div className="flex items-center gap-3">
                        <Infinity className="h-4 w-4 text-muted-foreground" />
                        <span>Lifetime access</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span>Available in {course.language}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
