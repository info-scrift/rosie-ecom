"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, Grid3X3, List, X, Check, ChevronDown, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

interface CourseFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedCategory: string
  onCategoryChange: (value: string) => void
  selectedLevel: string
  onLevelChange: (value: string) => void
  priceRange: [number, number]
  onPriceRangeChange: (value: [number, number]) => void
  durationRange: [number, number]
  onDurationRangeChange: (value: [number, number]) => void
  selectedTags: string[]
  onTagsChange: (value: string[]) => void
  viewMode: "grid" | "list"
  onViewModeChange: (value: "grid" | "list") => void
  sortBy: string
  onSortChange: (value: string) => void
  categories: string[]
  tags: string[]
  maxPrice: number
  maxDuration: number
  activeFiltersCount: number
  onClearFilters: () => void
  featuredOnly: boolean
  onFeaturedChange: (value: boolean) => void
  certificateOnly: boolean
  onCertificateChange: (value: boolean) => void
}

export function CourseFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLevel,
  onLevelChange,
  priceRange,
  onPriceRangeChange,
  durationRange,
  onDurationRangeChange,
  selectedTags,
  onTagsChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  categories,
  tags,
  maxPrice,
  maxDuration,
  activeFiltersCount,
  onClearFilters,
  featuredOnly,
  onFeaturedChange,
  certificateOnly,
  onCertificateChange,
}: CourseFiltersProps) {
  const [tagsOpen, setTagsOpen] = useState(false)

  const levels = ["Beginner", "Intermediate", "Advanced"]

  const FiltersContent = () => (
    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
      {/* Search */}
      <div className="relative flex-1 min-w-0">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-white/80 backdrop-blur-sm border-white/20"
        />
      </div>

      {/* Category Filter */}
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full lg:w-48 bg-white/80 backdrop-blur-sm border-white/20">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Level Filter */}
      <Select value={selectedLevel} onValueChange={onLevelChange}>
        <SelectTrigger className="w-full lg:w-40 bg-white/80 backdrop-blur-sm border-white/20">
          <SelectValue placeholder="All Levels" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          {levels.map((level) => (
            <SelectItem key={level} value={level}>
              {level}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Tags Multi-Select */}
      <Popover open={tagsOpen} onOpenChange={setTagsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={tagsOpen}
            className="w-full lg:w-48 justify-between bg-white/80 backdrop-blur-sm border-white/20"
          >
            {selectedTags.length === 0
              ? "Select tags..."
              : `${selectedTags.length} tag${selectedTags.length !== 1 ? "s" : ""} selected`}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-0">
          <Command>
            <CommandInput placeholder="Search tags..." />
            <CommandList>
              <CommandEmpty>No tags found.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-auto">
                {tags.map((tag) => (
                  <CommandItem
                    key={tag}
                    onSelect={() => {
                      const newTags = selectedTags.includes(tag)
                        ? selectedTags.filter((t) => t !== tag)
                        : [...selectedTags, tag]
                      onTagsChange(newTags)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", selectedTags.includes(tag) ? "opacity-100" : "opacity-0")} />
                    {tag}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Price Range */}
      {/* <div className="w-full lg:w-48">
        <Label className="text-sm font-medium mb-2 block">
          Price: ${priceRange[0]} - ${priceRange[1]}
        </Label>
        <Slider value={priceRange} onValueChange={onPriceRangeChange} max={maxPrice} step={10} className="w-full" />
      </div> */}

      {/* Duration Range */}
      {/* <div className="w-full lg:w-48">
        <Label className="text-sm font-medium mb-2 block">
          Duration: {durationRange[0]}h - {durationRange[1]}h
        </Label>
        <Slider
          value={durationRange}
          onValueChange={onDurationRangeChange}
          max={maxDuration}
          step={1}
          className="w-full"
        />
      </div> */}

      {/* Toggles */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center space-x-2">
          <Switch id="featured" checked={featuredOnly} onCheckedChange={onFeaturedChange} />
          <Label htmlFor="featured" className="text-sm">
            Featured
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="certificate" checked={certificateOnly} onCheckedChange={onCertificateChange} />
          <Label htmlFor="certificate" className="text-sm">
            Certificate
          </Label>
        </div>
      </div>

      {/* Sort */}
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-full lg:w-48 bg-white/80 backdrop-blur-sm border-white/20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="title-asc">Title A-Z</SelectItem>
          <SelectItem value="title-desc">Title Z-A</SelectItem>
          <SelectItem value="price-asc">Price Low to High</SelectItem>
          <SelectItem value="price-desc">Price High to Low</SelectItem>
          <SelectItem value="rating-desc">Highest Rated</SelectItem>
          <SelectItem value="students-desc">Most Popular</SelectItem>
          <SelectItem value="newest">Newest First</SelectItem>
        </SelectContent>
      </Select>

      {/* View Mode */}
      <div className="flex rounded-lg border bg-white/80 backdrop-blur-sm border-white/20">
        <Button
          variant={viewMode === "grid" ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewModeChange("grid")}
          className="rounded-r-none"
        >
          <Grid3X3 className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewModeChange("list")}
          className="rounded-l-none"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="bg-white/80 backdrop-blur-sm border-white/20"
        >
          <X className="h-4 w-4 mr-2" />
          Clear ({activeFiltersCount})
        </Button>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop Filters */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm border-white/20 hidden lg:block">
        <CardContent className="p-4">
          <FiltersContent />
        </CardContent>
      </Card>

      {/* Mobile Filters */}
      <div className="lg:hidden mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="relative bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="space-y-6 mt-6">
                <FiltersContent />
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex rounded-lg border">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
