
// "use client"

// import { useState } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Label } from "@/components/ui/label"
// import { Slider } from "@/components/ui/slider"
// import { Switch } from "@/components/ui/switch"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
// import {
//   Search,
//   Filter,
//   X,
//   Grid3X3,
//   List,
//   ChevronDown,
//   ChevronUp,
//   SlidersHorizontal,
//   Tag,
//   DollarSign,
//   Clock,
//   Award,
//   Star,
// } from "lucide-react"

// interface CourseFiltersProps {
//   searchTerm: string
//   onSearchChange: (value: string) => void
//   selectedCategory: string
//   onCategoryChange: (value: string) => void
//   selectedLevel: string
//   onLevelChange: (value: string) => void
//   priceRange: [number, number]
//   onPriceRangeChange: (value: [number, number]) => void
 
//   selectedTags: string[]
//   onTagsChange: (value: string[]) => void
//   viewMode: "grid" | "list"
//   onViewModeChange: (value: "grid" | "list") => void
//   sortBy: string
//   onSortChange: (value: string) => void
//   categories: string[]
//   tags: string[]
//   maxPrice: number
//   activeFiltersCount: number
//   onClearFilters: () => void
//   featuredOnly: boolean
//   onFeaturedChange: (value: boolean) => void

// }

// export function BookFilters({
//   searchTerm,
//   onSearchChange,
//   selectedCategory,
//   onCategoryChange,
//   selectedLevel,
//   onLevelChange,
//   priceRange,
//   onPriceRangeChange,
//   selectedTags,
//   onTagsChange,
//   viewMode,
//   onViewModeChange,
//   sortBy,
//   onSortChange,
//   categories,
//   tags,
//   maxPrice,
//   activeFiltersCount,
//   onClearFilters,
//   featuredOnly,
//   onFeaturedChange,

// }: CourseFiltersProps) {
//   const [isFiltersOpen, setIsFiltersOpen] = useState(false)

//   const toggleTag = (tag: string) => {
//     if (selectedTags.includes(tag)) {
//       onTagsChange(selectedTags.filter((t) => t !== tag))
//     } else {
//       onTagsChange([...selectedTags, tag])
//     }
//   }

//   return (
//     <Card className="mb-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//       <CardContent className="p-6">
//         {/* Top Row - Search, View Mode, Sort */}
//         <div className="flex flex-col lg:flex-row gap-4 mb-4">
//           {/* Search */}
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
//             <Input
//               placeholder="Search courses, instructors, or topics..."
//               value={searchTerm}
//               onChange={(e) => onSearchChange(e.target.value)}
//               className="pl-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 bg-white/80"
//             />
//           </div>

//           {/* View Mode Toggle */}
//           <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
//             <Button
//               variant={viewMode === "grid" ? "default" : "ghost"}
//               size="sm"
//               onClick={() => onViewModeChange("grid")}
//               className={`transition-all duration-200 ${
//                 viewMode === "grid" ? "bg-white shadow-sm text-blue-600" : "hover:bg-white/50"
//               }`}
//             >
//               <Grid3X3 className="h-4 w-4" />
//             </Button>
//             <Button
//               variant={viewMode === "list" ? "default" : "ghost"}
//               size="sm"
//               onClick={() => onViewModeChange("list")}
//               className={`transition-all duration-200 ${
//                 viewMode === "list" ? "bg-white shadow-sm text-blue-600" : "hover:bg-white/50"
//               }`}
//             >
//               <List className="h-4 w-4" />
//             </Button>
//           </div>

//           {/* Sort */}
//           <Select value={sortBy} onValueChange={onSortChange}>
//             <SelectTrigger className="w-48 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80">
//               <SelectValue placeholder="Sort by" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="title-asc">Title A-Z</SelectItem>
//               <SelectItem value="title-desc">Title Z-A</SelectItem>
//               <SelectItem value="price-asc">Price Low to High</SelectItem>
//               <SelectItem value="price-desc">Price High to Low</SelectItem>
//               <SelectItem value="rating-desc">Highest Rated</SelectItem>
//               <SelectItem value="students-desc">Most Popular</SelectItem>
//               <SelectItem value="newest">Newest First</SelectItem>
//             </SelectContent>
//           </Select>

//           {/* Filters Toggle */}
//           <Button
//             variant="outline"
//             onClick={() => setIsFiltersOpen(!isFiltersOpen)}
//             className="h-12 border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-200 bg-white/80"
//           >
//             <SlidersHorizontal className="h-4 w-4 mr-2" />
//             Filters
//             {activeFiltersCount > 0 && (
//               <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">
//                 {activeFiltersCount}
//               </Badge>
//             )}
//             {isFiltersOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
//           </Button>
//         </div>

//         {/* Active Filters */}
//         {activeFiltersCount > 0 && (
//           <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50/80 rounded-lg">
//             <Filter className="h-4 w-4 text-blue-600" />
//             <span className="text-sm font-medium text-blue-700">Active filters:</span>
//             <div className="flex flex-wrap gap-2">
//               {selectedCategory !== "all" && (
//                 <Badge variant="secondary" className="gap-1 hover:scale-105 transition-transform duration-300">
//                   {selectedCategory}
//                   <X className="h-3 w-3 cursor-pointer" onClick={() => onCategoryChange("all")} />
//                 </Badge>
//               )}
//               {selectedLevel !== "all" && (
//                 <Badge variant="secondary" className="gap-1 hover:scale-105 transition-transform duration-300">
//                   {selectedLevel}
//                   <X className="h-3 w-3 cursor-pointer" onClick={() => onLevelChange("all")} />
//                 </Badge>
//               )}
//               {selectedTags.map((tag) => (
//                 <Badge
//                   key={tag}
//                   variant="secondary"
//                   className="gap-1 hover:scale-105 transition-transform duration-300"
//                 >
//                   {tag}
//                   <X className="h-3 w-3 cursor-pointer" onClick={() => toggleTag(tag)} />
//                 </Badge>
//               ))}
//               {featuredOnly && (
//                 <Badge variant="secondary" className="gap-1 hover:scale-105 transition-transform duration-300">
//                   Featured
//                   <X className="h-3 w-3 cursor-pointer" onClick={() => onFeaturedChange(false)} />
//                 </Badge>
//               )}
         
//             </div>
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={onClearFilters}
//               className="ml-auto text-blue-600 hover:text-blue-700 hover:bg-blue-100 transition-all duration-300 hover:scale-105"
//             >
//               Clear all
//             </Button>
//           </div>
//         )}

//         {/* Collapsible Filters */}
//         <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
//           <CollapsibleContent className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-slate-200">
//               {/* Category Filter */}
//               <div className="space-y-3">
//                 <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//                   <Tag className="h-4 w-4" />
//                   Category
//                 </Label>
//                 <Select value={selectedCategory} onValueChange={onCategoryChange}>
//                   <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80">
//                     <SelectValue placeholder="All Categories" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Categories</SelectItem>
//                     {categories.map((category) => (
//                       <SelectItem key={category} value={category}>
//                         {category}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Level Filter */}
//               <div className="space-y-3">
//                 <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//                   <Star className="h-4 w-4" />
//                   Level
//                 </Label>
//                 <Select value={selectedLevel} onValueChange={onLevelChange}>
//                   <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80">
//                     <SelectValue placeholder="All Levels" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Levels</SelectItem>
//                     <SelectItem value="Beginner">Beginner</SelectItem>
//                     <SelectItem value="Intermediate">Intermediate</SelectItem>
//                     <SelectItem value="Advanced">Advanced</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Price Range */}
//               {/* <div className="space-y-3">
//                 <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//                   <DollarSign className="h-4 w-4" />
//                   Price Range: ${priceRange[0]} - ${priceRange[1]}
//                 </Label>
//                 <div className="px-2">
//                   <Slider
//                     value={priceRange}
//                     onValueChange={(value) => onPriceRangeChange(value as [number, number])}
//                     max={maxPrice}
//                     min={0}
//                     step={10}
//                     className="w-full"
//                   />
//                 </div>
//               </div> */}

//               {/* Duration Range */}
//               {/* <div className="space-y-3">
//                 <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//                   <Clock className="h-4 w-4" />
//                   Duration: {durationRange[0]}h - {durationRange[1]}h
//                 </Label>
//                 <div className="px-2">
//                   <Slider
//                     value={durationRange}
//                     onValueChange={(value) => onDurationRangeChange(value as [number, number])}
//                     max={maxDuration}
//                     min={0}
//                     step={1}
//                     className="w-full"
//                   />
//                 </div>
//               </div> */}
//             </div>

//             {/* Tags */}
//             {tags.length > 0 && (
//               <div className="space-y-3">
//                 <Label className="text-sm font-semibold text-slate-700">Popular Tags</Label>
//                 <div className="flex flex-wrap gap-2">
//                   {tags.slice(0, 12).map((tag) => (
//                     <Badge
//                       key={tag}
//                       variant={selectedTags.includes(tag) ? "default" : "outline"}
//                       className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
//                         selectedTags.includes(tag)
//                           ? "bg-blue-600 hover:bg-blue-700 text-white"
//                           : "border-slate-300 hover:border-blue-500 hover:text-blue-600"
//                       }`}
//                       onClick={() => toggleTag(tag)}
//                     >
//                       {tag}
//                       {selectedTags.includes(tag) && <X className="h-3 w-3 ml-1" />}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Special Filters */}
//             <div className="flex flex-wrap gap-6">
//               <div className="flex items-center space-x-3 bg-slate-50 rounded-lg p-3">
//                 <Switch
//                   id="featured"
//                   checked={featuredOnly}
//                   onCheckedChange={onFeaturedChange}
//                   className="data-[state=checked]:bg-blue-600"
//                 />
//                 <Label htmlFor="featured" className="text-sm text-slate-600 cursor-pointer flex items-center gap-2">
//                   <Star className="h-4 w-4 text-yellow-500" />
//                   Featured courses only
//                 </Label>
//               </div>

          
//             </div>
//           </CollapsibleContent>
//         </Collapsible>
//       </CardContent>
//     </Card>
//   )
// }



"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import {
  Search,
  Filter,
  X,
  Grid3X3,
  List,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Tag,
  DollarSign,
  Clock,
  Award,
  Star,
} from "lucide-react"

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

export function BookFilters({
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
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag))
    } else {
      onTagsChange([...selectedTags, tag])
    }
  }

  return (
    <Card className="mb-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        {/* Top Row - Search, View Mode, Sort */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search courses, instructors, or topics..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 bg-white/80"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className={`transition-all duration-200 ${
                viewMode === "grid" ? "bg-white shadow-sm text-blue-600" : "hover:bg-white/50"
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("list")}
              className={`transition-all duration-200 ${
                viewMode === "list" ? "bg-white shadow-sm text-blue-600" : "hover:bg-white/50"
              }`}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-48 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80">
              <SelectValue placeholder="Sort by" />
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

          {/* Filters Toggle */}
          <Button
            variant="outline"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="h-12 border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-200 bg-white/80"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">
                {activeFiltersCount}
              </Badge>
            )}
            {isFiltersOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
          </Button>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50/80 rounded-lg">
            <Filter className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Active filters:</span>
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="gap-1 hover:scale-105 transition-transform duration-300">
                  {selectedCategory}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => onCategoryChange("all")} />
                </Badge>
              )}
              {selectedLevel !== "all" && (
                <Badge variant="secondary" className="gap-1 hover:scale-105 transition-transform duration-300">
                  {selectedLevel}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => onLevelChange("all")} />
                </Badge>
              )}
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="gap-1 hover:scale-105 transition-transform duration-300"
                >
                  {tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => toggleTag(tag)} />
                </Badge>
              ))}
              {featuredOnly && (
                <Badge variant="secondary" className="gap-1 hover:scale-105 transition-transform duration-300">
                  Featured
                  <X className="h-3 w-3 cursor-pointer" onClick={() => onFeaturedChange(false)} />
                </Badge>
              )}
              {certificateOnly && (
                <Badge variant="secondary" className="gap-1 hover:scale-105 transition-transform duration-300">
                  Certificate
                  <X className="h-3 w-3 cursor-pointer" onClick={() => onCertificateChange(false)} />
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="ml-auto text-blue-600 hover:text-blue-700 hover:bg-blue-100 transition-all duration-300 hover:scale-105"
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Collapsible Filters */}
        <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <CollapsibleContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-slate-200">
              {/* Category Filter */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Category
                </Label>
                <Select value={selectedCategory} onValueChange={onCategoryChange}>
                  <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80">
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

              {/* Level Filter */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Level
                </Label>
                <Select value={selectedLevel} onValueChange={onLevelChange}>
                  <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              {/* <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </Label>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => onPriceRangeChange(value as [number, number])}
                    max={maxPrice}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                </div>
              </div> */}

              {/* Duration Range */}
              {/* <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Duration: {durationRange[0]}h - {durationRange[1]}h
                </Label>
                <div className="px-2">
                  <Slider
                    value={durationRange}
                    onValueChange={(value) => onDurationRangeChange(value as [number, number])}
                    max={maxDuration}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div> */}
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-700">Popular Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 12).map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                        selectedTags.includes(tag)
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "border-slate-300 hover:border-blue-500 hover:text-blue-600"
                      }`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                      {selectedTags.includes(tag) && <X className="h-3 w-3 ml-1" />}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Special Filters */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-3 bg-slate-50 rounded-lg p-3">
                <Switch
                  id="featured"
                  checked={featuredOnly}
                  onCheckedChange={onFeaturedChange}
                  className="data-[state=checked]:bg-blue-600"
                />
                <Label htmlFor="featured" className="text-sm text-slate-600 cursor-pointer flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Featured books only
                </Label>
              </div>

              {/* <div className="flex items-center space-x-3 bg-slate-50 rounded-lg p-3">
                <Switch
                  id="certificate"
                  checked={certificateOnly}
                  onCheckedChange={onCertificateChange}
                  className="data-[state=checked]:bg-blue-600"
                />
                <Label htmlFor="certificate" className="text-sm text-slate-600 cursor-pointer flex items-center gap-2">
                  <Award className="h-4 w-4 text-green-500" />
                  Certificate included
                </Label>
              </div> */}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
