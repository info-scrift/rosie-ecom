

// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Clock, Users, Star, Award, Play, BookOpen } from "lucide-react"
// import Link from "next/link"
// import { Book } from "@/lib/supabase"

// interface Course {
//   id: string
//   title: string
//   description: string
//   instructor: string
//   price: any
//   original_price?: any
//   level: "Beginner" | "Intermediate" | "Advanced"
//   category: string
//   rating: number
//   image_url?: string
//   tags: string[]
//   is_featured: boolean
//   has_certificate: boolean
// //   created_at: any
// //   updated_at: any
// }

// interface BookCardProps {
//   course: Book
//   viewMode: "grid" | "list"
// }

// export function BookCard({ course, viewMode }: BookCardProps) {
//   const [isHovered, setIsHovered] = useState(false)
//   const [imageLoaded, setImageLoaded] = useState(false)

// //   const discountPercentage = course.original_price
// //     ? Math.round(((course.original_price - course.price) / course.original_price) * 100)
// //     : 0

//   if (viewMode === "list") {
//     return (
//       <Card
//         className="group relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/90"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div className="flex gap-6 p-6">
//           {/* Image Section */}
//           <div className="relative w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
//             {course.image_url ? (
//               <img
//                 src={course.image_url || "/placeholder.svg"}
//                 alt={course.title}
//                 className={`w-full h-full object-cover transition-all duration-700 ${
//                   imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
//                 } ${isHovered ? "scale-110" : "scale-100"}`}
//                 onLoad={() => setImageLoaded(true)}
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center">
//                 <BookOpen className="w-12 h-12 text-blue-400" />
//               </div>
//             )}

//             {/* Overlay on hover */}
//             <div
//               className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
//                 isHovered ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               <Play className="w-8 h-8 text-white" />
//             </div>

//             {/* Featured badge */}
//             {course.is_featured && (
//               <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
//                 Featured
//               </Badge>
//             )}
//           </div>

//           {/* Content Section */}
//           <div className="flex-1 space-y-4">
//             <div>
//               <div className="flex items-start justify-between mb-2">
//                 <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
//                   {course.title}
//                 </h3>
//                 <Badge variant="outline" className="ml-2 flex-shrink-0">
//                   {course.level}
//                 </Badge>
//               </div>

//               <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>

//               <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
//                 <span className="font-medium text-gray-700">{course.instructor}</span>
//                 {/* <div className="flex items-center gap-1">
//                   <Clock className="w-4 h-4" />
//                   {course.duration}
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Users className="w-4 h-4" />
//                   {course.students_count?.toLocaleString()}
//                 </div> */}
//                 <div className="flex items-center gap-1">
//                   <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                   {course.rating}
//                 </div>
//                 {course.has_certificate && (
//                   <div className="flex items-center gap-1">
//                     <Award className="w-4 h-4 text-green-500" />
//                     Certificate
//                   </div>
//                 )}
//               </div>

//               {/* Tags */}
//               <div className="flex flex-wrap gap-1 mb-3">
//                 {course.tags.slice(0, 3).map((tag, index) => (
//                   <Badge key={index} variant="secondary" className="text-xs">
//                     {tag}
//                   </Badge>
//                 ))}
//                 {course.tags.length > 3 && (
//                   <Badge variant="secondary" className="text-xs">
//                     +{course.tags.length - 3}
//                   </Badge>
//                 )}
//               </div>
//             </div>

//             {/* Price and Action */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <span className="text-2xl font-bold text-gray-900">${course.price}</span>
//                 {course.original_price && (
//                   <>
//                     <span className="text-lg text-gray-500 line-through">${course.original_price}</span>
//                     {/* <Badge className="bg-red-100 text-red-700 border-red-200">{discountPercentage}% OFF</Badge> */}
//                   </>
//                 )}
//               </div>
//                                 <Link href={`/courses/${course.id}`}>
//               <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//                 View Details
//               </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </Card>
//     )
//   }

//   // Grid view
//   return (
//     <Card
//       className="group relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/90"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <CardHeader className="p-0 relative">
//         <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
//           {course.image_url ? (
//             <img
//               src={course.image_url || "/placeholder.svg"}
//               alt={course.title}
//               className={`w-full h-full object-cover transition-all duration-700 ${
//                 imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
//               } ${isHovered ? "scale-110" : "scale-100"}`}
//               onLoad={() => setImageLoaded(true)}
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center">
//               <BookOpen className="w-16 h-16 text-blue-400" />
//             </div>
//           )}

//           {/* Overlay on hover */}
//           <div
//             className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
//               isHovered ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <Play className="w-12 h-12 text-white" />
//           </div>

//           {/* Badges */}
//           <div className="absolute top-3 left-3 flex flex-col gap-2">
//             {course.is_featured && (
//               <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
//                 Featured
//               </Badge>
//             )}
//             <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
//               {course.level}
//             </Badge>
//           </div>

//           {/* Discount badge */}
//           {/* {discountPercentage > 0 && (
//             <Badge className="absolute top-3 right-3 bg-red-500 text-white border-0 shadow-lg">
//               {discountPercentage}% OFF
//             </Badge>
//           )} */}
//         </div>
//       </CardHeader>

//       <CardContent className="p-6 space-y-4">
//         <div>
//           <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 mb-2">
//             {course.title}
//           </h3>

//           <p className="text-gray-600 text-sm line-clamp-2 mb-3">{course.description}</p>

//           <p className="text-sm font-medium text-gray-700 mb-3">by {course.instructor}</p>

//           <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
//             {/* <div className="flex items-center gap-1">
//               <Clock className="w-4 h-4" />
//               {course.duration}
//             </div>
//             <div className="flex items-center gap-1">
//               <Users className="w-4 h-4" />
//               {course.students_count?.toLocaleString()}
//             </div> */}
//             <div className="flex items-center gap-1">
//               <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//               {course.rating}
//             </div>
//           </div>

//           {/* Tags */}
//           <div className="flex flex-wrap gap-1 mb-4">
//             {course.tags.slice(0, 2).map((tag, index) => (
//               <Badge key={index} variant="secondary" className="text-xs">
//                 {tag}
//               </Badge>
//             ))}
//             {course.tags.length > 2 && (
//               <Badge variant="secondary" className="text-xs">
//                 +{course.tags.length - 2}
//               </Badge>
//             )}
//           </div>

//           {/* Certificate indicator */}
//           {course.has_certificate && (
//             <div className="flex items-center gap-1 text-green-600 text-sm mb-3">
//               <Award className="w-4 h-4" />
//               Certificate included
//             </div>
//           )}
//         </div>
//       </CardContent>

//       <CardFooter className="p-6 pt-0 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <span className="text-xl font-bold text-gray-900">${course.price}</span>
//           {course.original_price && (
//             <span className="text-sm text-gray-500 line-through">${course.original_price}</span>
//           )}
//         </div>
//                           <Link href={`/courses/${course.id}`}>
//         <Button
//           size="sm"
//           className="ml-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
//         >
//           View Details
//         </Button>
//         </Link>
//       </CardFooter>
//     </Card>
//   )
// }



"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star, Award, Play, BookOpen } from "lucide-react"
import Link from "next/link"

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  price: any
  original_price?: any
  level: "Beginner" | "Intermediate" | "Advanced"
  category: string
  rating: number
  image_url?: string
  tags: string[]
  is_featured: boolean
  has_certificate: boolean
//   created_at: any
//   updated_at: any
}

interface CourseCardProps {
  course: Course
  viewMode: "grid" | "list"
}

export function BookCard({ course, viewMode }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const discountPercentage = course.original_price
    ? Math.round(((course.original_price - course.price) / course.original_price) * 100)
    : 0

  if (viewMode === "list") {
    return (
      <Card
        className="group relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/90"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-6 p-6">
          {/* Image Section */}
          <div className="relative w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
            {course.image_url ? (
              <img
                src={course.image_url || "/placeholder.svg"}
                alt={course.title}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
                } ${isHovered ? "scale-110" : "scale-100"}`}
                onLoad={() => setImageLoaded(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-blue-400" />
              </div>
            )}

            {/* Overlay on hover */}
            <div
              className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* <Play className="w-8 h-8 text-white" /> */}
            </div>

            {/* Featured badge */}
            {course.is_featured && (
              <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
                Featured
              </Badge>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                  {course.title}
                </h3>
                <Badge variant="outline" className="ml-2 flex-shrink-0">
                  {course.level}
                </Badge>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <span className="font-medium text-gray-700">{course.instructor}</span>
                {/* <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {course.students_count?.toLocaleString()}
                </div> */}
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {course.rating}
                </div>
                {course.has_certificate && (
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-green-500" />
                    Certificate
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {course.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {course.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{course.tags.length - 3}
                  </Badge>
                )}
              </div>
            </div>

            {/* Price and Action */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">${course.price}</span>
                {course.original_price && (
                  <>
                    <span className="text-lg text-gray-500 line-through">${course.original_price}</span>
                    <Badge className="bg-red-100 text-red-700 border-red-200">{discountPercentage}% OFF</Badge>
                  </>
                )}
              </div>
                                {/* <Link href={`/courses/${course.id}`}> */}
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                View Details
              </Button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </Card>
    )
  }

  // Grid view
  return (
    <Card
      className="group relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/90"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-0 relative">
        <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
          {course.image_url ? (
            <img
              src={course.image_url || "/placeholder.svg"}
              alt={course.title}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
              } ${isHovered ? "scale-110" : "scale-100"}`}
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-blue-400" />
            </div>
          )}

          {/* Overlay on hover */}
          <div
            className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* <Play className="w-12 h-12 text-white" /> */}
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {course.is_featured && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
                Featured
              </Badge>
            )}
            <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
              {course.level}
            </Badge>
          </div>

          {/* Discount badge */}
          {discountPercentage > 0 && (
            <Badge className="absolute top-3 right-3 bg-red-500 text-white border-0 shadow-lg">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 mb-2">
            {course.title}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{course.description}</p>

          <p className="text-sm font-medium text-gray-700 mb-3">by {course.instructor}</p>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            {/* <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {course.students_count?.toLocaleString()}
            </div> */}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {course.rating}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {course.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {course.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{course.tags.length - 2}
              </Badge>
            )}
          </div>

          {/* Certificate indicator */}
          {/* {course.has_certificate && (
            <div className="flex items-center gap-1 text-green-600 text-sm mb-3">
              <Award className="w-4 h-4" />
              Certificate included
            </div>
          )} */}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">${course.price}</span>
          {course.original_price && (
            <span className="text-sm text-gray-500 line-through">${course.original_price}</span>
          )}
        </div>
                          {/* <Link href={`/courses/${course.id}`}> */}
        <Button
          size="sm"
          className="ml-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          View Details
        </Button>
        {/* </Link> */}
      </CardFooter>
    </Card>
  )
}
