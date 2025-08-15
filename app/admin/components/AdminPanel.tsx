"use client"

import React from "react"
import { useState, useEffect, useMemo, useCallback, type ChangeEvent } from "react"
import { supabase, type User, type Course } from "@/lib/supabase"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PlusCircle,
  Pencil,
  Save,
  Trash,
  Upload,
  Search,
  Grid3X3,
  List,
  Package,
  DollarSign,
  ImageIcon,
  Loader2,
  Asterisk,
  GraduationCap,
  BookOpen,
  Clock,
  Users,
  Star,
} from "lucide-react"
import { AuthWrapper } from "@/components/auth-wrapper"

interface Product {
  id?: string
  name: string
  category: string
  price: string
  image_url: string
  description: string
  symptoms: string[]
  features: string[]
  in_stock: boolean
}

const defaultProduct: Product = {
  name: "",
  category: "",
  price: "",
  image_url: "",
  description: "",
  symptoms: [],
  features: [],
  in_stock: true,
}

const defaultCourse: Course = {
  id: "",
  title: "",
  description: "",
  instructor: "",
  category: "",
  level: "Beginner",
  price: "",
  original_price: "",
  duration_hours: 0,
  total_lessons: 0,
  image_url: "",
  video_preview_url: "",
  what_you_learn: [],
  requirements: [],
  course_content: { modules: [] },
  rating: 0,
  total_reviews: 0,
  enrolled_students: 0,
  is_published: true,
  is_featured: false,
  tags: [],
  language: "English",
  has_certificate: true,
  lifetime_access: true,
}

const ProductCard = React.memo(
  ({
    product,
    onEdit,
    onDelete,
  }: {
    product: Product
    onEdit: (product: Product) => void
    onDelete: (product: Product) => void
  }) => (
    <Card className="group hover:shadow-lg transition-all duration-200 border-2 border-gray-200 hover:border-gray-300 shadow-sm">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
            onClick={() => onEdit(product)}
          >
            <Pencil className="h-3 w-3" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="destructive" className="h-8 w-8 p-0 bg-red-500/90 hover:bg-red-600">
                <Trash className="h-3 w-3" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Product</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{product.name}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(product)} className="bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <Badge variant={product.in_stock ? "default" : "destructive"} className="absolute bottom-2 left-2">
          {product.in_stock ? "In Stock" : "Out of Stock"}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
            <span className="text-lg font-bold text-green-600">${product.price}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          {product.symptoms?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.symptoms.slice(0, 3).map((symptom, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {symptom}
                </Badge>
              ))}
              {product.symptoms.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{product.symptoms.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  ),
)

ProductCard.displayName = "ProductCard"

const CourseCard = React.memo(
  ({
    course,
    onEdit,
    onDelete,
  }: {
    course: Course
    onEdit: (course: Course) => void
    onDelete: (course: Course) => void
  }) => (
    <Card className="group hover:shadow-lg transition-all duration-200 border-2 border-gray-200 hover:border-gray-300 shadow-sm">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={course.image_url || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
            onClick={() => onEdit(course)}
          >
            <Pencil className="h-3 w-3" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="destructive" className="h-8 w-8 p-0 bg-red-500/90 hover:bg-red-600">
                <Trash className="h-3 w-3" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Course</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{course.title}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(course)} className="bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="absolute top-2 left-2 flex gap-1">
          <Badge
            variant={course.is_published ? "default" : "secondary"}
            className={course.is_published ? "bg-green-600" : ""}
          >
            {course.is_published ? "Published" : "Draft"}
          </Badge>
          {course.is_featured && <Badge className="bg-yellow-600">Featured</Badge>}
        </div>
        <Badge
          className={`absolute bottom-2 left-2 ${
            course.level === "Beginner"
              ? "bg-green-500"
              : course.level === "Intermediate"
                ? "bg-yellow-500"
                : "bg-red-500"
          }`}
        >
          {course.level}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg leading-tight">{course.title}</h3>
            <div className="text-right">
              <span className="text-lg font-bold text-green-600">${course.price}</span>
              {course.original_price && (
                <p className="text-xs text-muted-foreground line-through">${course.original_price}</p>
              )}
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {course.category}
          </Badge>
          <p className="text-xs text-muted-foreground">by {course.instructor}</p>
          <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
              <span>{course.enrolled_students}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
            </div>
          </div>
          {course.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {course.tags.slice(0, 3).map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {course.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{course.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  ),
)

CourseCard.displayName = "CourseCard"

function AdminEditor({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState("products")
  const [products, setProducts] = useState<Product[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [dragActive, setDragActive] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""

  const handleSignOut = async () => {
    const { supabase } = await import("@/lib/supabase")
    await supabase.auth.signOut()
  }

  const isAdmin = user.email == "admin@rosie.com" ? true : false

  const categories = useMemo(() => {
    const items = activeTab === "products" ? products : courses
    return Array.from(new Set(items.map((item) => item.category).filter(Boolean)))
  }, [products, courses, activeTab])

  const filteredItems = useMemo(() => {
    const items = activeTab === "products" ? products : courses

    if (activeTab === "products") {
      let filtered = items as Product[]

      if (searchTerm) {
        filtered = filtered.filter((item) => {
          const searchFields = [item.name, item.description, item.category]
          return searchFields.some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
        })
      }

      if (categoryFilter !== "all") {
        filtered = filtered.filter((item) => item.category === categoryFilter)
      }

      return filtered
    } else {
      let filtered = items as Course[]

      if (searchTerm) {
        filtered = filtered.filter((item) => {
          const searchFields = [item.title, item.description, item.category, item.instructor]
          return searchFields.some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
        })
      }

      if (categoryFilter !== "all") {
        filtered = filtered.filter((item) => item.category === categoryFilter)
      }

      return filtered
    }
  }, [products, courses, searchTerm, categoryFilter, activeTab])

  useEffect(() => {
    fetchProducts()
    fetchCourses()
  }, [])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase.from("products").select("*")
    if (error) {
      console.error("Fetch products error:", error.message)
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }, [])

  const fetchCourses = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase.from("courses").select("*")
    if (error) {
      console.error("Fetch courses error:", error.message)
    } else {
      setCourses(data || [])
    }
    setLoading(false)
  }, [])

  const handleProductChange = useCallback((field: keyof Product, value: string | boolean) => {
    setEditingProduct((prev) => (prev ? { ...prev, [field]: value } : null))
  }, [])

  const handleProductMulti = useCallback((field: keyof Product, val: string) => {
    setEditingProduct((prev) => (prev ? { ...prev, [field]: val } : null))
  }, [])

  const handleCourseChange = useCallback((field: keyof Course, value: string | boolean | number) => {
    setEditingCourse((prev) => (prev ? { ...prev, [field]: value } : null))
  }, [])

  const handleCourseMulti = useCallback((field: keyof Course, val: string) => {
    setEditingCourse((prev) => (prev ? { ...prev, [field]: val } : null))
  }, [])

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) setFile(f)
  }, [])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }, [])

  const doSave = useCallback(async () => {
    const isProduct = !!editingProduct
    const editing = editingProduct || editingCourse
    if (!editing) return

    setUploading(true)

    let imageUrl = editing.image_url

    if (file) {
      const fname = `${Date.now()}-${file.name}`
      const bucket = isProduct ? "product-images" : "course-images"

      const { error: upErr } = await supabase.storage.from(bucket).upload(fname, file)

      if (upErr) {
        console.error("Upload:", upErr.message)
        setUploading(false)
        return
      }

      imageUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${fname}`
    }

    if (isProduct) {
      // Process product data
      const processedSymptoms =
        typeof (editing as any).symptoms === "string"
          ? (editing as any).symptoms
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : (editing as any).symptoms

      const processedFeatures =
        typeof (editing as any).features === "string"
          ? (editing as any).features
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : (editing as any).features

      const payload = {
        ...editing,
        image_url: imageUrl,
        symptoms: processedSymptoms,
        features: processedFeatures,
      }

      const res = editing.id
        ? await supabase.from("products").update(payload).eq("id", editing.id)
        : await supabase.from("products").insert(payload)

      if (res.error) {
        console.error("Save product error:", res.error.message)
      } else {
        setEditingProduct(null)
        setFile(null)
        fetchProducts()
      }
    } else {
      // Process course data
      const courseEditing = editing as Course
      const processedWhatYouLearn =
        typeof (courseEditing as any).what_you_learn === "string"
          ? (courseEditing as any).what_you_learn
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : courseEditing.what_you_learn

      const processedRequirements =
        typeof (courseEditing as any).requirements === "string"
          ? (courseEditing as any).requirements
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : courseEditing.requirements

      const processedTags =
        typeof (courseEditing as any).tags === "string"
          ? (courseEditing as any).tags
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : courseEditing.tags

      const payload = {
        ...courseEditing,
        image_url: imageUrl,
        what_you_learn: processedWhatYouLearn,
        requirements: processedRequirements,
        tags: processedTags,
      }

      const res = courseEditing.id
        ? await supabase.from("courses").update(payload).eq("id", courseEditing.id)
        : await supabase.from("courses").insert(payload)

      if (res.error) {
        console.error("Save course error:", res.error.message)
      } else {
        setEditingCourse(null)
        setFile(null)
        fetchCourses()
      }
    }
    setUploading(false)
  }, [editingProduct, editingCourse, file, fetchProducts, fetchCourses])

  const doDeleteProduct = useCallback(
    async (productToDelete: Product) => {
      if (!productToDelete?.id) return

      setDeleting(true)
      const { error } = await supabase.from("products").delete().eq("id", productToDelete.id)

      if (error) {
        console.error("Delete product error:", error.message)
      } else {
        fetchProducts()
      }
      setDeleting(false)
    },
    [fetchProducts],
  )

  const doDeleteCourse = useCallback(
    async (courseToDelete: Course) => {
      if (!courseToDelete?.id) return

      setDeleting(true)
      const { error } = await supabase.from("courses").delete().eq("id", courseToDelete.id)

      if (error) {
        console.error("Delete course error:", error.message)
      } else {
        fetchCourses()
      }
      setDeleting(false)
    },
    [fetchCourses],
  )

  const handleEditProduct = useCallback((product: Product) => {
    setEditingProduct(product)
  }, [])

  const handleDeleteProduct = useCallback(
    (product: Product) => {
      doDeleteProduct(product)
    },
    [doDeleteProduct],
  )

  const handleEditCourse = useCallback((course: Course) => {
    setEditingCourse(course)
  }, [])

  const handleDeleteCourse = useCallback(
    (course: Course) => {
      doDeleteCourse(course)
    },
    [doDeleteCourse],
  )

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50/50">
        <div className="border-b bg-white">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-1">Manage your products and courses</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="lg" onClick={handleSignOut}>
                  Sign out
                </Button>
                <Dialog
                  open={!!(editingProduct || editingCourse)}
                  onOpenChange={(open) => !open && (setEditingProduct(null), setEditingCourse(null))}
                >
                  <DialogTrigger asChild>
                    <Button
                      onClick={() =>
                        activeTab === "products"
                          ? setEditingProduct({ ...defaultProduct })
                          : setEditingCourse({ ...defaultCourse })
                      }
                      className="gap-2"
                      size="lg"
                    >
                      <PlusCircle className="h-5 w-5" />
                      Add {activeTab === "products" ? "Product" : "Course"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">
                        {editingProduct
                          ? editingProduct.id
                            ? "Edit Product"
                            : "Add New Product"
                          : editingCourse?.id
                            ? "Edit Course"
                            : "Add New Course"}
                      </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                      {editingProduct ? (
                        // Product form (existing code)
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Product Name *</Label>
                              <Input
                                id="name"
                                placeholder="Enter product name"
                                value={editingProduct?.name || ""}
                                onChange={(e) => handleProductChange("name", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="category">Category *</Label>
                              <Input
                                id="category"
                                placeholder="Enter category"
                                value={editingProduct?.category || ""}
                                onChange={(e) => handleProductChange("category", e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="price">Price *</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  id="price"
                                  type="number"
                                  placeholder="0.00"
                                  className="pl-10"
                                  value={editingProduct?.price || ""}
                                  onChange={(e) => handleProductChange("price", e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Stock Status</Label>
                              <div className="flex items-center space-x-2 pt-2">
                                <Switch
                                  checked={editingProduct?.in_stock || false}
                                  onCheckedChange={(checked) => handleProductChange("in_stock", checked)}
                                />
                                <Label className="text-sm">
                                  {editingProduct?.in_stock ? "In Stock" : "Out of Stock"}
                                </Label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              placeholder="Enter product description"
                              rows={4}
                              value={editingProduct?.description || ""}
                              onChange={(e) => handleProductChange("description", e.target.value)}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="symptoms">Symptoms (comma separated)</Label>
                              <Textarea
                                id="symptoms"
                                placeholder="headache, fever, nausea"
                                rows={3}
                                value={
                                  typeof editingProduct?.symptoms === "string"
                                    ? editingProduct.symptoms
                                    : editingProduct?.symptoms.join(", ") || ""
                                }
                                onChange={(e) => handleProductMulti("symptoms", e.target.value)}
                              />
                              <p className="text-xs text-muted-foreground">Enter symptoms separated by commas</p>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="features">Features (comma separated)</Label>
                              <Textarea
                                id="features"
                                placeholder="fast acting, long lasting, natural ingredients"
                                rows={3}
                                value={
                                  typeof editingProduct?.features === "string"
                                    ? editingProduct.features
                                    : editingProduct?.features.join(", ") || ""
                                }
                                onChange={(e) => handleProductMulti("features", e.target.value)}
                              />
                              <p className="text-xs text-muted-foreground">Enter features separated by commas</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="title">Course Title *</Label>
                              <Input
                                id="title"
                                placeholder="Enter course title"
                                value={editingCourse?.title || ""}
                                onChange={(e) => handleCourseChange("title", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="instructor">Instructor *</Label>
                              <Input
                                id="instructor"
                                placeholder="Enter instructor name"
                                value={editingCourse?.instructor || ""}
                                onChange={(e) => handleCourseChange("instructor", e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="category">Category *</Label>
                              <Input
                                id="category"
                                placeholder="Enter category"
                                value={editingCourse?.category || ""}
                                onChange={(e) => handleCourseChange("category", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="level">Level *</Label>
                              <Select
                                value={editingCourse?.level || "Beginner"}
                                onValueChange={(value) => handleCourseChange("level", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Beginner">Beginner</SelectItem>
                                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                                  <SelectItem value="Advanced">Advanced</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="language">Language</Label>
                              <Input
                                id="language"
                                placeholder="English"
                                value={editingCourse?.language || ""}
                                onChange={(e) => handleCourseChange("language", e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="price">Price *</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  id="price"
                                  type="number"
                                  placeholder="0.00"
                                  className="pl-10"
                                  value={editingCourse?.price || ""}
                                  onChange={(e) => handleCourseChange("price", e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="original_price">Original Price</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  id="original_price"
                                  type="number"
                                  placeholder="0.00"
                                  className="pl-10"
                                  value={editingCourse?.original_price || ""}
                                  onChange={(e) => handleCourseChange("original_price", e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="duration_hours">Duration (hours) *</Label>
                              <Input
                                id="duration_hours"
                                type="number"
                                placeholder="0"
                                value={editingCourse?.duration_hours || ""}
                                onChange={(e) =>
                                  handleCourseChange("duration_hours", Number.parseInt(e.target.value) || 0)
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="total_lessons">Total Lessons *</Label>
                              <Input
                                id="total_lessons"
                                type="number"
                                placeholder="0"
                                value={editingCourse?.total_lessons || ""}
                                onChange={(e) =>
                                  handleCourseChange("total_lessons", Number.parseInt(e.target.value) || 0)
                                }
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              placeholder="Enter course description"
                              rows={4}
                              value={editingCourse?.description || ""}
                              onChange={(e) => handleCourseChange("description", e.target.value)}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="what_you_learn">What You'll Learn (comma separated)</Label>
                              <Textarea
                                id="what_you_learn"
                                placeholder="Master React hooks, Build REST APIs, Deploy applications"
                                rows={3}
                                value={
                                  typeof editingCourse?.what_you_learn === "string"
                                    ? editingCourse.what_you_learn
                                    : editingCourse?.what_you_learn.join(", ") || ""
                                }
                                onChange={(e) => handleCourseMulti("what_you_learn", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="requirements">Requirements (comma separated)</Label>
                              <Textarea
                                id="requirements"
                                placeholder="Basic JavaScript knowledge, Computer with internet"
                                rows={3}
                                value={
                                  typeof editingCourse?.requirements === "string"
                                    ? editingCourse.requirements
                                    : editingCourse?.requirements.join(", ") || ""
                                }
                                onChange={(e) => handleCourseMulti("requirements", e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="tags">Tags (comma separated)</Label>
                            <Input
                              id="tags"
                              placeholder="react, javascript, web development"
                              value={
                                typeof editingCourse?.tags === "string"
                                  ? editingCourse.tags
                                  : editingCourse?.tags.join(", ") || ""
                              }
                              onChange={(e) => handleCourseMulti("tags", e.target.value)}
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>Published Status</Label>
                              <div className="flex items-center space-x-2 pt-2">
                                <Switch
                                  checked={editingCourse?.is_published || false}
                                  onCheckedChange={(checked) => handleCourseChange("is_published", checked)}
                                />
                                <Label className="text-sm">{editingCourse?.is_published ? "Published" : "Draft"}</Label>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Featured Course</Label>
                              <div className="flex items-center space-x-2 pt-2">
                                <Switch
                                  checked={editingCourse?.is_featured || false}
                                  onCheckedChange={(checked) => handleCourseChange("is_featured", checked)}
                                />
                                <Label className="text-sm">{editingCourse?.is_featured ? "Featured" : "Regular"}</Label>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Certificate</Label>
                              <div className="flex items-center space-x-2 pt-2">
                                <Switch
                                  checked={editingCourse?.has_certificate || false}
                                  onCheckedChange={(checked) => handleCourseChange("has_certificate", checked)}
                                />
                                <Label className="text-sm">
                                  {editingCourse?.has_certificate ? "Included" : "Not Included"}
                                </Label>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      <div className="space-y-2">
                        <Label>{editingProduct ? "Product" : "Course"} Image</Label>
                        <div
                          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                            dragActive
                              ? "border-primary bg-primary/5"
                              : "border-muted-foreground/25 hover:border-muted-foreground/50"
                          }`}
                          onDragEnter={handleDrag}
                          onDragLeave={handleDrag}
                          onDragOver={handleDrag}
                          onDrop={handleDrop}
                        >
                          {file ? (
                            <div className="space-y-2">
                              <ImageIcon className="h-12 w-12 mx-auto text-green-600" />
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                              <Button variant="outline" size="sm" onClick={() => setFile(null)}>
                                Remove
                              </Button>
                            </div>
                          ) : editingProduct?.image_url || editingCourse?.image_url ? (
                            <div className="space-y-2">
                              <img
                                src={editingProduct?.image_url || editingCourse?.image_url || "/placeholder.svg"}
                                alt="Current"
                                className="max-h-32 mx-auto rounded"
                              />
                              <p className="text-sm text-muted-foreground">Current image</p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                              <div>
                                <p className="font-medium">Drop your image here</p>
                                <p className="text-sm text-muted-foreground">or click to browse</p>
                              </div>
                            </div>
                          )}
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="flex justify-end gap-3">
                        <Button
                          variant="outline"
                          onClick={() => (setEditingProduct(null), setEditingCourse(null))}
                          disabled={uploading}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={
                            uploading ||
                            (editingProduct &&
                              (!editingProduct?.name || !editingProduct?.category || !editingProduct?.price)) ||
                            (editingCourse &&
                              (!editingCourse?.title || !editingCourse?.category || !editingCourse?.price)) ||
                            false
                          }
                          className="gap-2"
                        >
                          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                          {uploading
                            ? "Saving..."
                            : editingProduct?.id || editingCourse?.id
                              ? `Update ${editingProduct ? "Product" : "Course"}`
                              : `Create ${editingProduct ? "Product" : "Course"}`}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Products
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Courses
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              {/* Products Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Package className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="text-2xl font-bold">{products.length}</p>
                        <p className="text-sm text-muted-foreground">Total Products</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Package className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="text-2xl font-bold">{products.filter((p) => p.in_stock).length}</p>
                        <p className="text-sm text-muted-foreground">In Stock</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Package className="h-8 w-8 text-red-600" />
                      <div>
                        <p className="text-2xl font-bold">{products.filter((p) => !p.in_stock).length}</p>
                        <p className="text-sm text-muted-foreground">Out of Stock</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Asterisk className="h-8 w-8 text-purple-600" />
                      <div>
                        <p className="text-2xl font-bold">
                          {Array.from(new Set(products.map((p) => p.category))).length}
                        </p>
                        <p className="text-sm text-muted-foreground">Categories</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-8 w-8 text-indigo-600" />
                      <div>
                        <p className="text-2xl font-bold">{courses.length}</p>
                        <p className="text-sm text-muted-foreground">Total Courses</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="text-2xl font-bold">{courses.filter((c) => c.is_published).length}</p>
                        <p className="text-sm text-muted-foreground">Published</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-8 w-8 text-yellow-600" />
                      <div>
                        <p className="text-2xl font-bold">{courses.filter((c) => c.is_featured).length}</p>
                        <p className="text-sm text-muted-foreground">Featured</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-8 w-8 text-purple-600" />
                      <div>
                        <p className="text-2xl font-bold">
                          {courses.reduce((sum, c) => sum + c.enrolled_students, 0).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">Total Students</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-1 gap-4 w-full sm:w-auto">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={`Search ${activeTab}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by category" />
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
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <TabsContent value="products">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : filteredItems.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm || categoryFilter !== "all"
                        ? "Try adjusting your search or filters"
                        : "Get started by adding your first product"}
                    </p>
                    {!searchTerm && categoryFilter === "all" && (
                      <Button onClick={() => setEditingProduct({ ...defaultProduct })}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Product
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {(filteredItems as Product[]).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onEdit={handleEditProduct}
                      onDelete={handleDeleteProduct}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="courses">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : filteredItems.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No courses found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm || categoryFilter !== "all"
                        ? "Try adjusting your search or filters"
                        : "Get started by adding your first course"}
                    </p>
                    {!searchTerm && categoryFilter === "all" && (
                      <Button onClick={() => setEditingCourse({ ...defaultCourse })}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Course
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {(filteredItems as Course[]).map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onEdit={handleEditCourse}
                      onDelete={handleDeleteCourse}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  } else {
    return <div>Only admin can access this page</div>
  }
}

export default function AdminPanel() {
  return <AuthWrapper>{(user) => <AdminEditor user={user} />}</AuthWrapper>
}
