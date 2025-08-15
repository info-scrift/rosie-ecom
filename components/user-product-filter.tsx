"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, X, Grid3X3, List, Filter, ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandList, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"

interface ProductFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedCategory: string
  onCategoryChange: (value: string) => void
  priceRange: [number, number]
  onPriceRangeChange: (value: [number, number]) => void
  inStockOnly: boolean
  onInStockChange: (value: boolean) => void
  selectedSymptoms: string[]
  onSymptomsChange: (symptoms: string[]) => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
  sortBy: string
  onSortChange: (value: string) => void
  categories: string[]
  symptoms: string[]
  maxPrice: number
  activeFiltersCount: number
  onClearFilters: () => void
}

export function ProductFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  inStockOnly,
  onInStockChange,
  selectedSymptoms,
  onSymptomsChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  categories,
  symptoms,
  maxPrice,
  activeFiltersCount,
  onClearFilters,
}: ProductFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSymptomsOpen, setIsSymptomsOpen] = useState(false)

  const handleSymptomToggle = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      onSymptomsChange(selectedSymptoms.filter((s) => s !== symptom))
    } else {
      onSymptomsChange([...selectedSymptoms, symptom])
    }
  }

  const SymptomsMultiSelect = () => (
    <Popover open={isSymptomsOpen} onOpenChange={setIsSymptomsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-between min-w-[200px] bg-transparent">
          {selectedSymptoms.length > 0
            ? `${selectedSymptoms.length} symptom${selectedSymptoms.length !== 1 ? "s" : ""} selected`
            : "Select symptoms"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search symptoms..." />
          <CommandList>
            <CommandEmpty>No symptoms found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {symptoms.map((symptom) => (
                <CommandItem
                  key={symptom}
                  onSelect={() => handleSymptomToggle(symptom)}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Checkbox
                    checked={selectedSymptoms.includes(symptom)}
                    onChange={() => handleSymptomToggle(symptom)}
                  />
                  <span className="capitalize">{symptom}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )

  return (
    <Card className="mb-6 shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          {/* Top Row - Search, Sort, View Mode */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filter Button & View Mode */}
            <div className="flex items-center gap-2">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="sm:hidden bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    {/* Mobile Filter Content */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm">Category</h3>
                      <Select value={selectedCategory} onValueChange={onCategoryChange}>
                        <SelectTrigger>
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
                    </div>

                    {/* <div className="space-y-3">
                      <h3 className="font-semibold text-sm">Price Range</h3>
                      <div className="px-2">
                        <Slider
                          value={priceRange}
                          onValueChange={onPriceRangeChange}
                          max={maxPrice}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground mt-2">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div> */}

                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm">Availability</h3>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mobile-in-stock" checked={inStockOnly} onCheckedChange={onInStockChange} />
                        <label htmlFor="mobile-in-stock" className="text-sm">
                          In Stock Only
                        </label>
                      </div>
                    </div>

                    {symptoms.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="font-semibold text-sm">Symptoms</h3>
                        <SymptomsMultiSelect />
                      </div>
                    )}

                    {activeFiltersCount > 0 && (
                      <Button variant="outline" onClick={onClearFilters} className="w-full bg-transparent">
                        <X className="h-4 w-4 mr-2" />
                        Clear All Filters ({activeFiltersCount})
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {/* View Mode Toggle */}
              <div className="flex items-center border rounded-md">
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

          <div className="hidden sm:flex items-center gap-4 pt-4 border-t">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Category:</span>
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All" />
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
            </div>

            {/* <div className="flex items-center gap-2 min-w-[200px]">
              <span className="text-sm font-medium text-muted-foreground">Price:</span>
              <div className="flex-1">
                <Slider
                  value={priceRange}
                  onValueChange={onPriceRangeChange}
                  max={maxPrice}
                  min={0}
                  step={1}
                  className="w-full [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-2 [&_[role=slider]]:border-primary [&_[role=slider]]:bg-background [&_[role=slider]]:shadow-md"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div> */}

        

            {/* Symptoms Multi-Select */}
            {symptoms.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Symptoms:</span>
                <SymptomsMultiSelect />
              </div>
            )}

                {/* Stock Filter */}
            <div className="flex items-center space-x-2">
                 <span className="text-sm font-medium text-muted-foreground">Availability:</span>
              <Checkbox id="desktop-in-stock" checked={inStockOnly} onCheckedChange={onInStockChange} />
              <label htmlFor="desktop-in-stock" className="text-sm font-medium">
                In Stock Only
              </label>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <Button variant="outline" onClick={onClearFilters} size="sm" className="ml-auto bg-transparent">
                <X className="h-4 w-4 mr-2" />
                Clear ({activeFiltersCount})
              </Button>
            )}
          </div>

          {/* Active Filters Tags */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedCategory}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => onCategoryChange("all")} />
                </Badge>
              )}
              {inStockOnly && (
                <Badge variant="secondary" className="gap-1">
                  In Stock
                  <X className="h-3 w-3 cursor-pointer" onClick={() => onInStockChange(false)} />
                </Badge>
              )}
              {selectedSymptoms.map((symptom) => (
                <Badge key={symptom} variant="secondary" className="gap-1 capitalize">
                  {symptom}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleSymptomToggle(symptom)} />
                </Badge>
              ))}
              {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                <Badge variant="secondary" className="gap-1">
                  ${priceRange[0]} - ${priceRange[1]}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => onPriceRangeChange([0, maxPrice])} />
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
