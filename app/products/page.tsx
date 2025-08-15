"use client"

import { useState, useEffect, useMemo } from "react"
import { supabase, type Product } from "@/lib/supabase"
import { ProductCard } from "@/components/user-product-card"
import { ProductFilters } from "@/components/user-product-filter"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Package, ShoppingBag, TrendingUp, Star } from "lucide-react"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name-asc")

  // Fetch products
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching products:", error)
    } else {
      setProducts(data || [])
      // Set initial price range based on actual product prices
      const prices = (data || []).map((p) => Number.parseFloat(p.price)).filter((p) => !isNaN(p))
      if (prices.length > 0) {
        setPriceRange([0, Math.max(...prices)])
      }
    }
    setLoading(false)
  }

  // Memoized calculations
  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category).filter(Boolean))), [products])

  const symptoms = useMemo(() => Array.from(new Set(products.flatMap((p) => p.symptoms).filter(Boolean))), [products])

  const maxPrice = useMemo(() => {
    const prices = products.map((p) => p.price).filter((p) => !isNaN(p))
    return prices.length > 0 ? Math.max(...prices) : 1000
  }, [products])

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.symptoms.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Price range filter
    filtered = filtered.filter((p) => {
      const price = p.price
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Stock filter
    if (inStockOnly) {
      filtered = filtered.filter((p) => p.in_stock)
    }

    // Symptoms filter
    if (selectedSymptoms.length > 0) {
      filtered = filtered.filter((p) => selectedSymptoms.some((symptom) => p.symptoms.includes(symptom)))
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "newest":
          return new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [products, searchTerm, selectedCategory, priceRange, inStockOnly, selectedSymptoms, sortBy])

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (selectedCategory !== "all") count++
    if (inStockOnly) count++
    if (selectedSymptoms.length > 0) count += selectedSymptoms.length
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) count++
    return count
  }, [selectedCategory, inStockOnly, selectedSymptoms, priceRange, maxPrice])

  const clearFilters = () => {
    setSelectedCategory("all")
    setInStockOnly(false)
    setSelectedSymptoms([])
    setPriceRange([0, maxPrice])
    setSearchTerm("")
  }

  // Stats
  const stats = useMemo(
    () => ({
      total: products.length,
      inStock: products.filter((p) => p.in_stock).length,
      categories: categories.length,
      filtered: filteredAndSortedProducts.length,
    }),
    [products, categories, filteredAndSortedProducts],
  )

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

          {/* Products Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i}>
                <Skeleton className="h-56 w-full rounded-t-lg" />
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
   <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Products</h1>
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                <Package className="h-8 w-8" />
              </div>
            </div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Discover our comprehensive range of high-quality healthcare products designed to meet your needs
            </p>
            <div className="flex items-center justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-blue-100">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-sm font-medium">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm font-medium">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Package className="h-5 w-5" />
                <span className="text-sm font-medium">Secure Packaging</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-blue-100">Total Products</p>
                </div>
                <Package className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.inStock}</p>
                  <p className="text-green-100">In Stock</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.categories}</p>
                  <p className="text-purple-100">Categories</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.filtered}</p>
                  <p className="text-orange-100">Showing</p>
                </div>
                <Star className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <ProductFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          inStockOnly={inStockOnly}
          onInStockChange={setInStockOnly}
          selectedSymptoms={selectedSymptoms}
          onSymptomsChange={setSelectedSymptoms}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={sortBy}
          onSortChange={setSortBy}
          categories={categories}
          symptoms={symptoms}
          maxPrice={maxPrice}
          activeFiltersCount={activeFiltersCount}
          onClearFilters={clearFilters}
        />

        {/* Results */}
        {filteredAndSortedProducts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || activeFiltersCount > 0
                  ? "Try adjusting your search or filters to find what you're looking for"
                  : "No products are currently available"}
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
                Showing {filteredAndSortedProducts.length} of {stats.total} products
              </p>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="gap-2">
                  {activeFiltersCount} filter{activeFiltersCount !== 1 ? "s" : ""} applied
                </Badge>
              )}
            </div>

            {/* Products Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
