"use client"

import { useState, useEffect, useMemo } from "react"
import { supabase, type Course } from "@/lib/supabase"
import { CourseCard } from "@/components/course-card"
import { CourseFilters } from "@/components/course-filters"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { GraduationCap, BookOpen, Users, Star, Award, TrendingUp } from "lucide-react"
import { BookCard } from "@/components/book-card"
import { BookFilters } from "@/components/book-filters"

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [durationRange, setDurationRange] = useState<[number, number]>([0, 100])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [sortBy, setSortBy] = useState("title-asc")
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [certificateOnly, setCertificateOnly] = useState(false)

  // Fetch courses
  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("is_book", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching courses:", error)
    } else {
      setCourses(data || [])
      // Set initial ranges based on actual course data
      const prices = (data || []).map((c) => Number.parseFloat(c.price)).filter((p) => !isNaN(p))
      const durations = (data || []).map((c) => c.duration_hours).filter((d) => !isNaN(d))

      if (prices.length > 0) {
        setPriceRange([0, Math.max(...prices)])
      }
      if (durations.length > 0) {
        setDurationRange([0, Math.max(...durations)])
      }
    }
    setLoading(false)
  }

  // Memoized calculations
  const categories = useMemo(() => Array.from(new Set(courses.map((c) => c.category).filter(Boolean))), [courses])

  const tags = useMemo(() => Array.from(new Set(courses.flatMap((c) => c.tags).filter(Boolean))), [courses])

  const maxPrice = useMemo(() => {
    const prices = courses.map((c) => Number.parseFloat(c.price)).filter((p) => !isNaN(p))
    return prices.length > 0 ? Math.max(...prices) : 500
  }, [courses])

  const maxDuration = useMemo(() => {
    const durations = courses.map((c) => c.duration_hours).filter((d) => !isNaN(d))
    return durations.length > 0 ? Math.max(...durations) : 100
  }, [courses])

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((c) => c.category === selectedCategory)
    }

    // Level filter
    if (selectedLevel !== "all") {
      filtered = filtered.filter((c) => c.level === selectedLevel)
    }

    // Price range filter
    filtered = filtered.filter((c) => {
      const price = Number.parseFloat(c.price)
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Duration range filter
    filtered = filtered.filter((c) => {
      return c.duration_hours >= durationRange[0] && c.duration_hours <= durationRange[1]
    })

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((c) => selectedTags.some((tag) => c.tags.includes(tag)))
    }

    // Featured filter
    if (featuredOnly) {
      filtered = filtered.filter((c) => c.is_featured)
    }

    // Certificate filter
    if (certificateOnly) {
      filtered = filtered.filter((c) => c.has_certificate)
    }

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title-asc":
          return a.title.localeCompare(b.title)
        case "title-desc":
          return b.title.localeCompare(a.title)
        case "price-asc":
          return Number.parseFloat(a.price) - Number.parseFloat(b.price)
        case "price-desc":
          return Number.parseFloat(b.price) - Number.parseFloat(a.price)
        case "rating-desc":
          return b.rating - a.rating
        case "students-desc":
          return b.enrolled_students - a.enrolled_students
        case "newest":
          return new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [
    courses,
    searchTerm,
    selectedCategory,
    selectedLevel,
    priceRange,
    durationRange,
    selectedTags,
    sortBy,
    featuredOnly,
    certificateOnly,
  ])

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (selectedCategory !== "all") count++
    if (selectedLevel !== "all") count++
    if (selectedTags.length > 0) count += selectedTags.length
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) count++
    if (durationRange[0] > 0 || durationRange[1] < maxDuration) count++
    if (featuredOnly) count++
    if (certificateOnly) count++
    return count
  }, [
    selectedCategory,
    selectedLevel,
    selectedTags,
    priceRange,
    durationRange,
    maxPrice,
    maxDuration,
    featuredOnly,
    certificateOnly,
  ])

  const clearFilters = () => {
    setSelectedCategory("all")
    setSelectedLevel("all")
    setSelectedTags([])
    setPriceRange([0, maxPrice])
    setDurationRange([0, maxDuration])
    setSearchTerm("")
    setFeaturedOnly(false)
    setCertificateOnly(false)
  }

  // Stats
  const stats = useMemo(() => {
    const totalStudents = courses.reduce((sum, course) => sum + course.enrolled_students, 0)
    const avgRating = courses.length > 0 ? courses.reduce((sum, course) => sum + course.rating, 0) / courses.length : 0

    return {
      total: courses.length,
      categories: categories.length,
      totalStudents,
      avgRating: avgRating.toFixed(1),
      filtered: filteredAndSortedCourses.length,
    }
  }, [courses, categories, filteredAndSortedCourses])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Skeleton */}
          <div className="mb-8 animate-pulse">
            <Skeleton className="h-12 w-64 mb-4 bg-gradient-to-r from-gray-200 to-gray-300" />
            <Skeleton className="h-6 w-96 bg-gradient-to-r from-gray-200 to-gray-300" />
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse border-0 shadow-lg">
                <CardContent className="p-6">
                  <Skeleton className="h-16 w-full bg-gradient-to-r from-gray-200 to-gray-300" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters Skeleton */}
          <Card className="mb-6 animate-pulse border-0 shadow-lg">
            <CardContent className="p-4">
              <Skeleton className="h-12 w-full bg-gradient-to-r from-gray-200 to-gray-300" />
            </CardContent>
          </Card>

          {/* Courses Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse border-0 shadow-lg">
                <Skeleton className="h-48 w-full rounded-t-lg bg-gradient-to-r from-gray-200 to-gray-300" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-full mb-2 bg-gradient-to-r from-gray-200 to-gray-300" />
                  <Skeleton className="h-4 w-20 mb-2 bg-gradient-to-r from-gray-200 to-gray-300" />
                  <Skeleton className="h-4 w-full mb-4 bg-gradient-to-r from-gray-200 to-gray-300" />
                  <Skeleton className="h-10 w-full bg-gradient-to-r from-gray-200 to-gray-300" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
     <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in-up">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:rotate-12">
                <BookOpen className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Online Books
              </h1>
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:-rotate-12">
                <Award className="h-8 w-8 text-white" />
              </div>
            </div>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
              Discover a curated selection of books on renal health, clinical care, and patient education
            </p>
            <div className="flex items-center justify-center gap-6 mt-8 animate-fade-in-up animation-delay-400">
  <div className="flex items-center gap-2 text-indigo-100 hover:text-white transition-colors duration-300 cursor-pointer group">
    <BookOpen className="h-5 w-5 fill-current group-hover:scale-110 transition-transform duration-300" />
    <span className="text-sm font-medium">Curated Library</span>
  </div>
  <div className="flex items-center gap-2 text-indigo-100 hover:text-white transition-colors duration-300 cursor-pointer group">
    <Star className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
    <span className="text-sm font-medium">Top Rated Reads</span>
  </div>
  <div className="flex items-center gap-2 text-indigo-100 hover:text-white transition-colors duration-300 cursor-pointer group">
    <Award className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
    <span className="text-sm font-medium">Expert Authors</span>
  </div>
</div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 animate-fade-in-up group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                    {stats.total}
                  </p>
                  <p className="text-indigo-100">Total Books</p>
                </div>
                <BookOpen className="h-8 w-8 text-indigo-200 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 animate-fade-in-up animation-delay-100 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                    {/* {stats.totalStudents.toLocaleString()} */}
                    1
                  </p>
                  <p className="text-purple-100">In Stock</p>
                </div>
                <Users className="h-8 w-8 text-purple-200 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 animate-fade-in-up animation-delay-200 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                    {stats.categories}
                  </p>
                  <p className="text-pink-100">Categories</p>
                </div>
                <GraduationCap className="h-8 w-8 text-pink-200 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 animate-fade-in-up animation-delay-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                    {stats.avgRating}
                  </p>
                  <p className="text-orange-100">Avg Rating</p>
                </div>
                <Star className="h-8 w-8 text-orange-200 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="animate-fade-in-up animation-delay-400">
          <BookFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedLevel={selectedLevel}
            onLevelChange={setSelectedLevel}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            durationRange={durationRange}
            onDurationRangeChange={setDurationRange}
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            sortBy={sortBy}
            onSortChange={setSortBy}
            categories={categories}
            tags={tags}
            maxPrice={maxPrice}
            maxDuration={maxDuration}
            activeFiltersCount={activeFiltersCount}
            onClearFilters={clearFilters}
            featuredOnly={featuredOnly}
            onFeaturedChange={setFeaturedOnly}
            certificateOnly={certificateOnly}
            onCertificateChange={setCertificateOnly}
          />
        </div>

        {/* Results */}
        {filteredAndSortedCourses.length === 0 ? (
          <Card className="border-0 shadow-lg animate-fade-in-up animation-delay-500">
            <CardContent className="p-12 text-center">
              <div className="animate-bounce mb-4">
                <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || activeFiltersCount > 0
                  ? "Try adjusting your search or filters to find what you're looking for"
                  : "No courses are currently available"}
              </p>
              {activeFiltersCount > 0 && (
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="hover:scale-105 transition-all duration-300 hover:shadow-lg bg-transparent"
                >
                  Clear All Filters
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6 animate-fade-in-up animation-delay-500">
              <p className="text-sm text-muted-foreground">
                Showing {filteredAndSortedCourses.length} of {stats.total} books
              </p>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="gap-2 hover:scale-105 transition-transform duration-300">
                  {activeFiltersCount} filter{activeFiltersCount !== 1 ? "s" : ""} applied
                </Badge>
              )}
            </div>

            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredAndSortedCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <BookCard course={course} viewMode={viewMode} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}


// "use client"

// import { useState, useEffect, useMemo } from "react"
// import { supabase, type Book } from "@/lib/supabase"
// import { BookCard } from "@/components/book-card"
// import { BookFilters } from "@/components/book-filters"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Skeleton } from "@/components/ui/skeleton"
// import {
//   BookOpen,
//   Users,
//   Star,
//   Award,
//   TrendingUp,
// } from "lucide-react"

// export default function BooksPage() {
//   const [books, setBooks] = useState<Book[]>([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [selectedLevel, setSelectedLevel] = useState("all")
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
//   const [pageRange, setPageRange] = useState<[number, number]>([0, 1000])
//   const [selectedTags, setSelectedTags] = useState<string[]>([])
//   const [viewMode, setViewMode] = useState<"grid" | "list">("list")
//   const [sortBy, setSortBy] = useState("title-asc")
//   const [featuredOnly, setFeaturedOnly] = useState(false)

//   useEffect(() => {
//     fetchBooks()
//   }, [])

//   const fetchBooks = async () => {
//     setLoading(true)
//     const { data, error } = await supabase
//       .from("books")
//       .select("*")
//     //   .eq("is_published", true)
//       .order("created_at", { ascending: false })

//     if (error) {
//       console.error("Error fetching books:", error)
//     } else if (data) {
//       setBooks(data)

//       const prices = data.map((b) => Number.parseFloat(b.price)).filter((p) => !isNaN(p))
//       const pages = data.map((b) => b.page_count).filter((p) => !isNaN(p))

//       if (prices.length) setPriceRange([0, Math.max(...prices)])
//       if (pages.length) setPageRange([0, Math.max(...pages)])
//     }
//     setLoading(false)
//   }

//   const categories = useMemo(
//     () => Array.from(new Set(books.map((b) => b.category).filter(Boolean))),
//     [books],
//   )

//   const tags = useMemo(
//     () => Array.from(new Set(books.flatMap((b) => b.tags).filter(Boolean))),
//     [books],
//   )

//   const maxPrice = useMemo(() => {
//     const prices = books.map((b) => Number.parseFloat(b.price)).filter((p) => !isNaN(p))
//     return prices.length ? Math.max(...prices) : 500
//   }, [books])

// //   const maxPages = useMemo(() => {
// //     const pages = books.map((b) => b.page_count).filter((p) => !isNaN(p))
// //     return pages.length ? Math.max(...pages) : 500
// //   }, [books])

//   const filteredAndSortedBooks = useMemo(() => {
//     let filtered = books

//     if (searchTerm) {
//       const term = searchTerm.toLowerCase()
//       filtered = filtered.filter(
//         (b) =>
//           b.title.toLowerCase().includes(term) ||
//           b.description.toLowerCase().includes(term) ||
//         //   b.author.toLowerCase().includes(term) ||
//           b.category.toLowerCase().includes(term) ||
//           b.tags.some((tag) => tag.toLowerCase().includes(term)),
//       )
//     }

//     if (selectedCategory !== "all") {
//       filtered = filtered.filter((b) => b.category === selectedCategory)
//     }

//     // if (selectedLevel !== "all") {
//     //   filtered = filtered.filter((b) => b.reading_level === selectedLevel)
//     // }

//     filtered = filtered.filter((b) => {
//       const price = Number.parseFloat(b.price)
//       return price >= priceRange[0] && price <= priceRange[1]
//     })

//     // filtered = filtered.filter((b) => {
//     //   return b.page_count >= pageRange[0] && b.page_count <= pageRange[1]
//     // })

//     if (selectedTags.length) {
//       filtered = filtered.filter((b) => selectedTags.some((tag) => b.tags.includes(tag)))
//     }

//     if (featuredOnly) {
//       filtered = filtered.filter((b) => b.is_featured)
//     }

//     filtered.sort((a, b) => {
//       switch (sortBy) {
//         case "title-asc":
//           return a.title.localeCompare(b.title)
//         case "title-desc":
//           return b.title.localeCompare(a.title)
//         case "price-asc":
//           return Number.parseFloat(a.price) - Number.parseFloat(b.price)
//         case "price-desc":
//           return Number.parseFloat(b.price) - Number.parseFloat(a.price)
//         // case "rating-desc":
//         //   return b.rating - a.rating
//         // case "pages-desc":
//         //   return b.page_count - a.page_count
//         case "newest":
//           return new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime()
//         default:
//           return 0
//       }
//     })

//     return filtered
//   }, [
//     books,
//     searchTerm,
//     selectedCategory,
//     selectedLevel,
//     priceRange,
//     pageRange,
//     selectedTags,
//     sortBy,
//     featuredOnly,
//   ])

//   const activeFiltersCount = useMemo(() => {
//     let count = 0
//     if (selectedCategory !== "all") count++
//     if (selectedLevel !== "all") count++
//     if (selectedTags.length) count += selectedTags.length
//     if (priceRange[0] > 0 || priceRange[1] < maxPrice) count++
//     // if (pageRange[0] > 0 || pageRange[1] < maxPages) count++
//     if (featuredOnly) count++
//     return count
//   }, [
//     selectedCategory,
//     selectedLevel,
//     selectedTags,
//     priceRange,
//     pageRange,
//     maxPrice,
//     // maxPages,
//     featuredOnly,
//   ])

//   const clearFilters = () => {
//     setSelectedCategory("all")
//     setSelectedLevel("all")
//     setSelectedTags([])
//     setPriceRange([0, maxPrice])
//     // setPageRange([0, maxPages])
//     setSearchTerm("")
//     setFeaturedOnly(false)
//   }

//   const stats = useMemo(() => {
//     const totalBooks = books.length
//     // const totalPages = books.reduce((sum, b) => sum + b.page_count, 0)
//     const avgRating = books.length ? books.reduce((sum, b) => sum + b.rating, 0) / books.length : 0

//     return {
//       total: totalBooks,
//       categories: categories.length,
//     //   totalPages,
//       avgRating: avgRating.toFixed(1),
//       filtered: filteredAndSortedBooks.length,
//     }
//   }, [books, categories, filteredAndSortedBooks])

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="mb-8 animate-pulse">
//             <Skeleton className="h-12 w-64 mb-4 bg-gradient-to-r from-gray-200 to-gray-300" />
//             <Skeleton className="h-6 w-96 bg-gradient-to-r from-gray-200 to-gray-300" />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//             {[...Array(4)].map((_, i) => (
//               <Card key={i} className="animate-pulse border-0 shadow-lg">
//                 <CardContent className="p-6">
//                   <Skeleton className="h-16 w-full bg-gradient-to-r from-gray-200 to-gray-300" />
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//           <Card className="mb-6 animate-pulse border-0 shadow-lg">
//             <CardContent className="p-4">
//               <Skeleton className="h-12 w-full bg-gradient-to-r from-gray-200 to-gray-300" />
//             </CardContent>
//           </Card>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {[...Array(8)].map((_, i) => (
//               <Card key={i} className="animate-pulse border-0 shadow-lg">
//                 <Skeleton className="h-48 w-full rounded-t-lg bg-gradient-to-r from-gray-200 to-gray-300" />
//                 <CardContent className="p-4">
//                   <Skeleton className="h-6 w-full mb-2 bg-gradient-to-r from-gray-200 to-gray-300" />
//                   <Skeleton className="h-4 w-20 mb-2 bg-gradient-to-r from-gray-200 to-gray-300" />
//                   <Skeleton className="h-4 w-full mb-4 bg-gradient-to-r from-gray-200 to-gray-300" />
//                   <Skeleton className="h-10 w-full bg-gradient-to-r from-gray-200 to-gray-300" />
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
//         <div className="absolute inset-0  animate-pulse"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
//           <div className="text-center">
//             <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in-up">
//               <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:rotate-12">
//                 <BookOpen className="h-8 w-8" />
//               </div>
//               <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
//                 Online Books
//               </h1>
//               <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:-rotate-12">
//                 <Award className="h-8 w-8 text-white" />
//               </div>
//             </div>
//             <p className="text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
//               Discover a curated selection of books on renal health, clinical care, and patient education
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//           <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 animate-fade-in-up group">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
//                     {stats.total}
//                   </p>
//                   <p className="text-indigo-100">Total Books</p>
//                 </div>
//                 <BookOpen className="h-8 w-8 text-indigo-200 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
//               </div>
//             </CardContent>
//           </Card>
//           {/* <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 animate-fade-in-up animation-delay-100 group">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
//                     {stats.totalPages.toLocaleString()}
//                   </p>
//                   <p className="text-purple-100">Total Pages</p>
//                 </div>
//                 <Users className="h-8 w-8 text-purple-200 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
//               </div>
//             </CardContent>
//           </Card> */}
//           <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 animate-fade-in-up animation-delay-200 group">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
//                     {stats.categories}
//                   </p>
//                   <p className="text-pink-100">Categories</p>
//                 </div>
//                 <TrendingUp className="h-8 w-8 text-pink-200 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 animate-fade-in-up animation-delay-300 group">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
//                     {stats.avgRating}
//                   </p>
//                   <p className="text-orange-100">Avg Rating</p>
//                 </div>
//                 <Star className="h-8 w-8 text-orange-200 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="animate-fade-in-up animation-delay-400">
//           <BookFilters
//             searchTerm={searchTerm}
//             onSearchChange={setSearchTerm}
//             selectedCategory={selectedCategory}
//             onCategoryChange={setSelectedCategory}
//             selectedLevel={selectedLevel}
//             onLevelChange={setSelectedLevel}
//             priceRange={priceRange}
//             onPriceRangeChange={setPriceRange}
//             // pageRange={pageRange}
//             // onPageRangeChange={setPageRange}
//             selectedTags={selectedTags}
//             onTagsChange={setSelectedTags}
//             viewMode={viewMode}
//             onViewModeChange={setViewMode}
//             sortBy={sortBy}
//             onSortChange={setSortBy}
//             categories={categories}
//             tags={tags}
//             maxPrice={maxPrice}
//             // maxPages={maxPages}
//             activeFiltersCount={activeFiltersCount}
//             onClearFilters={clearFilters}
//             featuredOnly={featuredOnly}
//             onFeaturedChange={setFeaturedOnly}
//           />
//         </div>

//         {filteredAndSortedBooks.length === 0 ? (
//           <Card className="border-0 shadow-lg animate-fade-in-up animation-delay-500">
//             <CardContent className="p-12 text-center">
//               <div className="animate-bounce mb-4">
//                 <BookOpen className="h-16 w-16 mx-auto text-muted-foreground" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">No books found</h3>
//               <p className="text-muted-foreground mb-6">
//                 {searchTerm || activeFiltersCount > 0
//                   ? "Try adjusting your search or filters to find what you're looking for"
//                   : "No books are currently available"}
//               </p>
//               {activeFiltersCount > 0 && (
//                 <Button
//                   onClick={clearFilters}
//                   variant="outline"
//                   className="hover:scale-105 transition-all duration-300 hover:shadow-lg bg-transparent"
//                 >
//                   Clear All Filters
//                 </Button>
//               )}
//             </CardContent>
//           </Card>
//         ) : (
//           <>
//             <div className="flex items-center justify-between mb-6 animate-fade-in-up animation-delay-500">
//               <p className="text-sm text-muted-foreground">
//                 Showing {filteredAndSortedBooks.length} of {stats.total} books
//               </p>
//               {activeFiltersCount > 0 && (
//                 <Badge
//                   variant="secondary"
//                   className="gap-2 hover:scale-105 transition-transform duration-300"
//                 >
//                   {activeFiltersCount} filter{activeFiltersCount !== 1 ? "s" : ""} applied
//                 </Badge>
//               )}
//             </div>
//             <div
//               className={
//                 viewMode === "grid"
//                   ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//                   : "space-y-4"
//               }
//             >
//               {filteredAndSortedBooks.map((book, index) => (
//                 <div
//                   key={book.id}
//                   className="animate-fade-in-up"
//                   style={{ animationDelay: `${600 + index * 100}ms` }}
//                 >
//                   <BookCard course={book} viewMode={viewMode} />
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

