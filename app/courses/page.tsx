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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-12 w-64 mb-4" />
            <Skeleton className="h-6 w-96" />
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters Skeleton */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>

          {/* Courses Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Online Courses</h1>
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                <BookOpen className="h-8 w-8" />
              </div>
            </div>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Master new skills with our comprehensive online courses taught by industry experts
            </p>
            <div className="flex items-center justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-indigo-100">
                <Award className="h-5 w-5 fill-current" />
                <span className="text-sm font-medium">Certified Courses</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-100">
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">Expert Instructors</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-100">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm font-medium">Lifetime Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-indigo-100">Total Courses</p>
                </div>
                <BookOpen className="h-8 w-8 text-indigo-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</p>
                  <p className="text-purple-100">Students Enrolled</p>
                </div>
                <Users className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.categories}</p>
                  <p className="text-pink-100">Categories</p>
                </div>
                <GraduationCap className="h-8 w-8 text-pink-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.avgRating}</p>
                  <p className="text-orange-100">Avg Rating</p>
                </div>
                <Star className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

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

        {/* Results */}
        {filteredAndSortedCourses.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || activeFiltersCount > 0
                  ? "Try adjusting your search or filters to find what you're looking for"
                  : "No courses are currently available"}
              </p>
              {activeFiltersCount > 0 && (
                <Button onClick={clearFilters} variant="outline">
                  Clear All Filters
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredAndSortedCourses.length} of {stats.total} courses
              </p>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="gap-2">
                  {activeFiltersCount} filter{activeFiltersCount !== 1 ? "s" : ""} applied
                </Badge>
              )}
            </div>

            {/* Courses Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredAndSortedCourses.map((course) => (
                <CourseCard key={course.id} course={course} viewMode={viewMode} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
