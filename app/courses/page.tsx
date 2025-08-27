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
      .eq("is_published", true)
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
        {/* Background animation elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in-up">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:rotate-12">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Online Courses
              </h1>
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:-rotate-12">
                <BookOpen className="h-8 w-8" />
              </div>
            </div>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
              Master new skills with our comprehensive online courses taught by industry experts
            </p>
            <div className="flex items-center justify-center gap-6 mt-8 animate-fade-in-up animation-delay-400">
              <div className="flex items-center gap-2 text-indigo-100 hover:text-white transition-colors duration-300 cursor-pointer group">
                <Award className="h-5 w-5 fill-current group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium">Certified Courses</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-100 hover:text-white transition-colors duration-300 cursor-pointer group">
                <Users className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium">Expert Instructors</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-100 hover:text-white transition-colors duration-300 cursor-pointer group">
                <TrendingUp className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium">Lifetime Access</span>
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
                  <p className="text-indigo-100">Total Courses</p>
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
                    {stats.totalStudents.toLocaleString()}
                  </p>
                  <p className="text-purple-100">Students Enrolled</p>
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
          <CourseFilters
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
                Showing {filteredAndSortedCourses.length} of {stats.total} courses
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
                  <CourseCard course={course} viewMode={viewMode} />
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
// import { supabase, type Course } from "@/lib/supabase"
// import { CourseCard } from "@/components/course-card"
// import { CourseFilters } from "@/components/course-filters"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Skeleton } from "@/components/ui/skeleton"
// import { GraduationCap, BookOpen, Users, Star, Award, TrendingUp } from "lucide-react"

// export default function CoursesPage() {
//   const [courses, setCourses] = useState<Course[]>([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [selectedLevel, setSelectedLevel] = useState("all")
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
//   const [durationRange, setDurationRange] = useState<[number, number]>([0, 100])
//   const [selectedTags, setSelectedTags] = useState<string[]>([])
//   const [viewMode, setViewMode] = useState<"grid" | "list">("list")
//   const [sortBy, setSortBy] = useState("title-asc")
//   const [featuredOnly, setFeaturedOnly] = useState(false)
//   const [certificateOnly, setCertificateOnly] = useState(false)

//   // Fetch courses
//   useEffect(() => {
//     fetchCourses()
//   }, [])

//   const fetchCourses = async () => {
//     setLoading(true)
//     const { data, error } = await supabase
//       .from("courses")
//       .select("*")
//       .eq("is_published", true)
//       .order("created_at", { ascending: false })

//     if (error) {
//       console.error("Error fetching courses:", error)
//     } else {
//       setCourses(data || [])
//       // Set initial ranges based on actual course data
//       const prices = (data || []).map((c) => Number.parseFloat(c.price)).filter((p) => !isNaN(p))
//       const durations = (data || []).map((c) => c.duration_hours).filter((d) => !isNaN(d))

//       if (prices.length > 0) {
//         setPriceRange([0, Math.max(...prices)])
//       }
//       if (durations.length > 0) {
//         setDurationRange([0, Math.max(...durations)])
//       }
//     }
//     setLoading(false)
//   }

//   // Memoized calculations
//   const categories = useMemo(() => Array.from(new Set(courses.map((c) => c.category).filter(Boolean))), [courses])

//   const tags = useMemo(() => Array.from(new Set(courses.flatMap((c) => c.tags).filter(Boolean))), [courses])

//   const maxPrice = useMemo(() => {
//     const prices = courses.map((c) => Number.parseFloat(c.price)).filter((p) => !isNaN(p))
//     return prices.length > 0 ? Math.max(...prices) : 500
//   }, [courses])

//   const maxDuration = useMemo(() => {
//     const durations = courses.map((c) => c.duration_hours).filter((d) => !isNaN(d))
//     return durations.length > 0 ? Math.max(...durations) : 100
//   }, [courses])

//   // Filter and sort courses
//   const filteredAndSortedCourses = useMemo(() => {
//     let filtered = courses

//     // Search filter
//     if (searchTerm) {
//       filtered = filtered.filter(
//         (c) =>
//           c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           c.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           c.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
//       )
//     }

//     // Category filter
//     if (selectedCategory !== "all") {
//       filtered = filtered.filter((c) => c.category === selectedCategory)
//     }

//     // Level filter
//     if (selectedLevel !== "all") {
//       filtered = filtered.filter((c) => c.level === selectedLevel)
//     }

//     // Price range filter
//     filtered = filtered.filter((c) => {
//       const price = Number.parseFloat(c.price)
//       return price >= priceRange[0] && price <= priceRange[1]
//     })

//     // Duration range filter
//     filtered = filtered.filter((c) => {
//       return c.duration_hours >= durationRange[0] && c.duration_hours <= durationRange[1]
//     })

//     // Tags filter
//     if (selectedTags.length > 0) {
//       filtered = filtered.filter((c) => selectedTags.some((tag) => c.tags.includes(tag)))
//     }

//     // Featured filter
//     if (featuredOnly) {
//       filtered = filtered.filter((c) => c.is_featured)
//     }

//     // Certificate filter
//     if (certificateOnly) {
//       filtered = filtered.filter((c) => c.has_certificate)
//     }

//     // Sort courses
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
//         case "rating-desc":
//           return b.rating - a.rating
//         case "students-desc":
//           return b.enrolled_students - a.enrolled_students
//         case "newest":
//           return new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime()
//         default:
//           return 0
//       }
//     })

//     return filtered
//   }, [
//     courses,
//     searchTerm,
//     selectedCategory,
//     selectedLevel,
//     priceRange,
//     durationRange,
//     selectedTags,
//     sortBy,
//     featuredOnly,
//     certificateOnly,
//   ])

//   // Active filters count
//   const activeFiltersCount = useMemo(() => {
//     let count = 0
//     if (selectedCategory !== "all") count++
//     if (selectedLevel !== "all") count++
//     if (selectedTags.length > 0) count += selectedTags.length
//     if (priceRange[0] > 0 || priceRange[1] < maxPrice) count++
//     if (durationRange[0] > 0 || durationRange[1] < maxDuration) count++
//     if (featuredOnly) count++
//     if (certificateOnly) count++
//     return count
//   }, [
//     selectedCategory,
//     selectedLevel,
//     selectedTags,
//     priceRange,
//     durationRange,
//     maxPrice,
//     maxDuration,
//     featuredOnly,
//     certificateOnly,
//   ])

//   const clearFilters = () => {
//     setSelectedCategory("all")
//     setSelectedLevel("all")
//     setSelectedTags([])
//     setPriceRange([0, maxPrice])
//     setDurationRange([0, maxDuration])
//     setSearchTerm("")
//     setFeaturedOnly(false)
//     setCertificateOnly(false)
//   }

//   // Stats
//   const stats = useMemo(() => {
//     const totalStudents = courses.reduce((sum, course) => sum + course.enrolled_students, 0)
//     const avgRating = courses.length > 0 ? courses.reduce((sum, course) => sum + course.rating, 0) / courses.length : 0

//     return {
//       total: courses.length,
//       categories: categories.length,
//       totalStudents,
//       avgRating: avgRating.toFixed(1),
//       filtered: filteredAndSortedCourses.length,
//     }
//   }, [courses, categories, filteredAndSortedCourses])

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Header Skeleton */}
//           <div className="mb-8">
//             <Skeleton className="h-12 w-64 mb-4" />
//             <Skeleton className="h-6 w-96" />
//           </div>

//           {/* Stats Skeleton */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//             {[...Array(4)].map((_, i) => (
//               <Card key={i}>
//                 <CardContent className="p-6">
//                   <Skeleton className="h-16 w-full" />
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Filters Skeleton */}
//           <Card className="mb-6">
//             <CardContent className="p-4">
//               <Skeleton className="h-12 w-full" />
//             </CardContent>
//           </Card>

//           {/* Courses Grid Skeleton */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {[...Array(8)].map((_, i) => (
//               <Card key={i}>
//                 <Skeleton className="h-48 w-full rounded-t-lg" />
//                 <CardContent className="p-4">
//                   <Skeleton className="h-6 w-full mb-2" />
//                   <Skeleton className="h-4 w-20 mb-2" />
//                   <Skeleton className="h-4 w-full mb-4" />
//                   <Skeleton className="h-10 w-full" />
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="text-center">
//             <div className="flex items-center justify-center gap-3 mb-6">
//               <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
//                 <GraduationCap className="h-8 w-8" />
//               </div>
//               <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Online Courses</h1>
//               <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
//                 <BookOpen className="h-8 w-8" />
//               </div>
//             </div>
//             <p className="text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
//               Master new skills with our comprehensive online courses taught by industry experts
//             </p>
//             <div className="flex items-center justify-center gap-6 mt-8">
//               <div className="flex items-center gap-2 text-indigo-100">
//                 <Award className="h-5 w-5 fill-current" />
//                 <span className="text-sm font-medium">Certified Courses</span>
//               </div>
//               <div className="flex items-center gap-2 text-indigo-100">
//                 <Users className="h-5 w-5" />
//                 <span className="text-sm font-medium">Expert Instructors</span>
//               </div>
//               <div className="flex items-center gap-2 text-indigo-100">
//                 <TrendingUp className="h-5 w-5" />
//                 <span className="text-sm font-medium">Lifetime Access</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//           <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-2xl font-bold">{stats.total}</p>
//                   <p className="text-indigo-100">Total Courses</p>
//                 </div>
//                 <BookOpen className="h-8 w-8 text-indigo-200" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</p>
//                   <p className="text-purple-100">Students Enrolled</p>
//                 </div>
//                 <Users className="h-8 w-8 text-purple-200" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-2xl font-bold">{stats.categories}</p>
//                   <p className="text-pink-100">Categories</p>
//                 </div>
//                 <GraduationCap className="h-8 w-8 text-pink-200" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-2xl font-bold">{stats.avgRating}</p>
//                   <p className="text-orange-100">Avg Rating</p>
//                 </div>
//                 <Star className="h-8 w-8 text-orange-200" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <CourseFilters
//           searchTerm={searchTerm}
//           onSearchChange={setSearchTerm}
//           selectedCategory={selectedCategory}
//           onCategoryChange={setSelectedCategory}
//           selectedLevel={selectedLevel}
//           onLevelChange={setSelectedLevel}
//           priceRange={priceRange}
//           onPriceRangeChange={setPriceRange}
//           durationRange={durationRange}
//           onDurationRangeChange={setDurationRange}
//           selectedTags={selectedTags}
//           onTagsChange={setSelectedTags}
//           viewMode={viewMode}
//           onViewModeChange={setViewMode}
//           sortBy={sortBy}
//           onSortChange={setSortBy}
//           categories={categories}
//           tags={tags}
//           maxPrice={maxPrice}
//           maxDuration={maxDuration}
//           activeFiltersCount={activeFiltersCount}
//           onClearFilters={clearFilters}
//           featuredOnly={featuredOnly}
//           onFeaturedChange={setFeaturedOnly}
//           certificateOnly={certificateOnly}
//           onCertificateChange={setCertificateOnly}
//         />

//         {/* Results */}
//         {filteredAndSortedCourses.length === 0 ? (
//           <Card>
//             <CardContent className="p-12 text-center">
//               <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
//               <h3 className="text-xl font-semibold mb-2">No courses found</h3>
//               <p className="text-muted-foreground mb-6">
//                 {searchTerm || activeFiltersCount > 0
//                   ? "Try adjusting your search or filters to find what you're looking for"
//                   : "No courses are currently available"}
//               </p>
//               {activeFiltersCount > 0 && (
//                 <Button onClick={clearFilters} variant="outline">
//                   Clear All Filters
//                 </Button>
//               )}
//             </CardContent>
//           </Card>
//         ) : (
//           <>
//             {/* Results count */}
//             <div className="flex items-center justify-between mb-6">
//               <p className="text-sm text-muted-foreground">
//                 Showing {filteredAndSortedCourses.length} of {stats.total} courses
//               </p>
//               {activeFiltersCount > 0 && (
//                 <Badge variant="secondary" className="gap-2">
//                   {activeFiltersCount} filter{activeFiltersCount !== 1 ? "s" : ""} applied
//                 </Badge>
//               )}
//             </div>

//             {/* Courses Grid */}
//             <div
//               className={
//                 viewMode === "grid"
//                   ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//                   : "space-y-4"
//               }
//             >
//               {filteredAndSortedCourses.map((course) => (
//                 <CourseCard key={course.id} course={course} viewMode={viewMode} />
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }


