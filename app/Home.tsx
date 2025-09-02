"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ImageSlider } from "@/components/image-slider"
import {
  ShoppingBag,
  Shield,
  ArrowRight,
  GraduationCap,
  Heart,
  Users,
  Award,
  CheckCircle,
  Star,
  Activity,
  Stethoscope,
  BookOpen,
  Phone,
  Zap,
  Target,
  TrendingUp,
  Book,
  Headphones,
  Smile,
  Hospital,
  Plus,
  Bot,
} from "lucide-react"

export default function HomePage() {
  const heroImages = ["/images/home_page_banner.jpeg"]

  const proteinProductImages = [
    "/images/protein_pic_one.jpeg",
    "/images/protein_pic_two.jpeg",
    "/images/protein_pic_three.jpeg",
  ]

  const booksImages = ["/images/books_pic_two.jpeg","/images/books_pic_one.jpeg"]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[60vh] lg:h-[65vh] overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0 z-0">
          <ImageSlider images={heroImages} className="h-full w-full" autoPlay={true} interval={5000} />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Text Content Overlay */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center text-white animate-fade-in">
              {/* <div className="flex justify-center mb-6">
                <div className="bg-blue-400/20 p-4 rounded-full animate-pulse-glow hover:bg-blue-400/30 transition-all duration-300">
                  <Heart className="h-12 w-12 text-blue-400" />
                </div>
              </div> */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
                <span className="text-blue-400">Renal</span>Fusion Blend
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-white/90 max-w-4xl mx-auto text-pretty">
                Innovative Renal Care Solutions & Professional Education
              </p>
              <p className="text-lg mb-8 text-white/80 max-w-3xl mx-auto text-pretty">
                Delivering next-generation kidney health products, comprehensive e-learning programs, and round-the-clock AI consultation support — empowering healthcare professionals and patients to achieve better outcomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-300">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="bg-blue-400 hover:bg-blue-500 text-white gap-2 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform"
                  >
                    <Stethoscope className="h-5 w-5" />
                    Explore Products
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/30 text-white hover:bg-white hover:text-blue-700 gap-2 px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 bg-transparent transform"
                  >
                    <GraduationCap className="h-5 w-5" />
                    Professional Courses
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-card">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <h2 className="text-3xl font-bold text-center">Our Impact</h2>
    <p className="mb-10 text-xl text-center text-muted-foreground max-w-3xl mx-auto text-pretty">
        Built on trust, care, and innovation.
      </p>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Medical Institutions */}
    <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-0 shadow-lg animate-slide-up animation-delay-200 cursor-pointer">
      <CardContent className="p-8 text-center flex flex-col items-center">
        <div className="mb-3 bg-blue-500/10 p-4 rounded-xl group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                    <Hospital className="h-8 w-8 text-blue-500" />
                  </div>
        <div className="text-4xl font-bold text-primary mb-2 group-hover:text-blue-600 transition-colors duration-300">
          50+
        </div>
        <div className="text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
          Partner Medical Institutions
        </div>
      </CardContent>
    </Card>

    {/* Patient Satisfaction */}
    <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-0 shadow-lg animate-slide-up animation-delay-300 cursor-pointer">
      <CardContent className="p-8 text-center flex flex-col items-center">
  <div className="mb-3 bg-blue-500/10 p-4 rounded-xl group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                    <Smile className="h-8 w-8 text-blue-500" />
                  </div>        <div className="text-4xl font-bold text-primary mb-2 group-hover:text-blue-600 transition-colors duration-300">
          95%
        </div>
        <div className="text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
          Patient Satisfaction Rate
        </div>
      </CardContent>
    </Card>

    {/* Clinical Support */}
    <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-0 shadow-lg animate-slide-up animation-delay-400 cursor-pointer">
      <CardContent className="p-8 text-center flex flex-col items-center">
  <div className="mb-3 bg-blue-500/10 p-4 rounded-xl group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                    <Bot className="h-8 w-8 text-blue-500" />
                  </div>        <div className="text-4xl font-bold text-primary mb-2 group-hover:text-blue-600 transition-colors duration-300">
          24/7
        </div>
        <div className="text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
          AI Consultation Bot Support
        </div>
      </CardContent>
    </Card>
  </div>
</div>
      </div>

      {/* Protein Products Section */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-blue-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">Premium Protein Products</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Specialized, clinically proven nutrition solutions tailored for renal patients — nutritionally optimized, safe, and highly effective.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className=" lg:p-10 animate-slide-up animation-delay-200">
              <ImageSlider
                images={proteinProductImages}
                className="h-80 lg:h-[420px] shadow-xl rounded-2xl"
                autoPlay={true}
                interval={4000}
              />
            </div>

              <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-500 border-0 shadow-lg animate-slide-up animation-delay-200 cursor-pointer">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="bg-blue-500/10 p-4 rounded-xl group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                    <ShoppingBag className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-blue-600 transition-colors duration-300">
                      Key Benefits:
                    </h3>
                    {/* <p className="text-muted-foreground group-hover:text-blue-500 mb-6 leading-relaxed transition-colors duration-300">
                        Our protein products are meticulously formulated to meet the unique nutritional needs of renal patients,
                providing essential amino acids while managing phosphorus and potassium levels.
                    </p> */}
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        Low Phosphorus Formula
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        High biological value protein
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        Clinically tested for efficacy
                      </li>
                       <li className="flex items-center gap-2 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        Easy absorption for patient comfort
                      </li>
                    </ul>
                    <Link href="/products">
                      <Button className="bg-blue-600 hover:bg-blue-700 hover:scale-105 gap-2 transition-all duration-300 transform">
                        View Products <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* <div className="animate-slide-up animation-delay-300">
              <h3 className="text-3xl font-bold text-foreground mb-6">Specialized Renal Nutrition</h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our protein products are meticulously formulated to meet the unique nutritional needs of renal patients,
                providing essential amino acids while managing phosphorus and potassium levels.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span className="text-muted-foreground">Low Phosphorus Formula</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span className="text-muted-foreground">High Biological Value</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span className="text-muted-foreground">Clinically Tested</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span className="text-muted-foreground">Easy Absorption</span>
                </div>
              </div>
              <Link href="/products?category=protein">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 hover:scale-105 gap-2 transition-all duration-300 transform"
                >
                  View Protein Products <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div> */}
          </div>

          {/* Protein Product Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-0 shadow-lg animate-slide-up animation-delay-400 cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-500/10 p-4 rounded-full w-fit mx-auto mb-6 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                  <Zap className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-blue-600 transition-colors duration-300">
                  RenalPro Essential
                </h3>
                <p className="text-muted-foreground group-hover:text-blue-500 text-lg leading-relaxed transition-colors duration-300">
                  Complete amino acid profile with optimized phosphorus content for daily nutritional support
                </p>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <span className="text-sm text-blue-600 font-semibold">Starting at $49.99</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-0 shadow-lg animate-slide-up animation-delay-500 cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-600/10 p-4 rounded-full w-fit mx-auto mb-6 group-hover:bg-blue-600/20 group-hover:scale-110 transition-all duration-300">
                  <Target className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-blue-600 transition-colors duration-300">
                  RenalPro Advanced
                </h3>
                <p className="text-muted-foreground group-hover:text-blue-500 text-lg leading-relaxed transition-colors duration-300">
                  Enhanced formula with added vitamins and minerals specifically designed for CKD patients
                </p>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <span className="text-sm text-blue-600 font-semibold">Starting at $79.99</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-0 shadow-lg animate-slide-up animation-delay-600 cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-500/10 p-4 rounded-full w-fit mx-auto mb-6 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                  <TrendingUp className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-blue-600 transition-colors duration-300">
                  RenalPro Clinical
                </h3>
                <p className="text-muted-foreground group-hover:text-blue-500 text-lg leading-relaxed transition-colors duration-300">
                  Hospital-grade protein supplement for intensive care and post-surgical recovery
                </p>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <span className="text-sm text-blue-600 font-semibold">Starting at $129.99</span>
                </div>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">
              Why Healthcare Professionals and patients Choose Renal Fusion Blend
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Comprehensive products backed by clinical research and trusted by medical professionals
              worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-0 shadow-lg animate-slide-up animation-delay-200 cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-500/10 p-4 rounded-full w-fit mx-auto mb-6 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                  <Shield className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-blue-600 transition-colors duration-300">
                  Clinical Excellence
                </h3>
                <p className="text-muted-foreground group-hover:text-blue-500 text-lg leading-relaxed transition-colors duration-300">
                  FDA-approved products, backed by rigorous research and evidence-based protocols.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-0 shadow-lg animate-slide-up animation-delay-300 cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-600/10 p-4 rounded-full w-fit mx-auto mb-6 group-hover:bg-blue-600/20 group-hover:scale-110 transition-all duration-300">
                  <GraduationCap className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-blue-600 transition-colors duration-300">
                  Expert Education
                </h3>
                <p className="text-muted-foreground group-hover:text-blue-500 text-lg leading-relaxed transition-colors duration-300">
                  Comprehensive training programs designed by leading nephrologists and certified by medical boards
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-0 shadow-lg animate-slide-up animation-delay-400 cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-500/10 p-4 rounded-full w-fit mx-auto mb-6 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                  <Activity className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-blue-600 transition-colors duration-300">
                  24/7 Consultation Bot
                </h3>
                <p className="text-muted-foreground group-hover:text-blue-500 text-lg leading-relaxed transition-colors duration-300">
                  AI-powered support and guidance available anytime for both professionals and patients.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Books section */}

      <div className="py-20 bg-gradient-to-br from-blue-50 to-blue-100/50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16 animate-fade-in">
      <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">Book Collection</h2>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
        A curated selection of general medical resources — from nephrology and cardiology to lifestyle medicine — authored by leading healthcare experts.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
      <div className="animate-slide-up animation-delay-200">
        <ImageSlider
          images={booksImages} // Make sure you update this array with book images
          className="h-80 lg:h-96 shadow-xl rounded-2xl"
          autoPlay={true}
          interval={4000}
        />
      </div>

      <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-500 border-0 shadow-lg animate-slide-up animation-delay-200 cursor-pointer">
        <CardContent className="p-8">
          <div className="flex items-start gap-6">
            <div className="bg-blue-500/10 p-4 rounded-xl group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
              <Book className="h-8 w-8 text-blue-500" /> {/* Replace ShoppingBag with Book icon */}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-blue-600 transition-colors duration-300">
                Highlights:
              </h3>
              {/* <p className="text-muted-foreground group-hover:text-blue-500 mb-6 leading-relaxed transition-colors duration-300">
                Explore our collection of books authored by experts in nephrology, offering both clinical insights and practical guidance for patients and professionals alike.
              </p> */}
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  Expert-written and peer-reviewed content
                </li>
                <li className="flex items-center gap-2 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  Covers clinical knowledge + patient education
                </li>
                <li className="flex items-center gap-2 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  Easy-to-understand language and practical guidance
                </li>
                <li className="flex items-center gap-2 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  Available in both print and digital
                </li>
              </ul>
              <Link href="/books">
                <Button className="bg-blue-600 hover:bg-blue-700 hover:scale-105 gap-2 transition-all duration-300 transform">
                  View Bookstore <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</div>


      {/* Product Categories */}
      <div className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">Comprehensive Medical Supply Products</h2>
            {/* <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              From diagnostic tools to treatment protocols, we provide everything needed for exceptional renal care
            </p> */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-500 border-0 shadow-lg animate-slide-up animation-delay-200 cursor-pointer">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="bg-blue-500/10 p-4 rounded-xl group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                    <ShoppingBag className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-blue-600 transition-colors duration-300">
                      Healthcare Solutions We Provide:
                    </h3>
                    {/* <p className="text-muted-foreground group-hover:text-blue-500 mb-6 leading-relaxed transition-colors duration-300">
                      Daily life healthcare and wellbeing 
                    </p> */}
                    <ul className="space-y-2 mb-6">
                         <li className="flex items-center gap-2 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                      Daily life healthcare and wellbeing 
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        Diagnostic instruments
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        Pharmaceutical and nutritional products
                      </li>
                      {/* <li className="flex items-center gap-2 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        Pharmaceutical Products
                      </li> */}
                    </ul>
                    <Link href="/products">
                      <Button className="bg-blue-600 hover:bg-blue-700 hover:scale-105 gap-2 transition-all duration-300 transform">
                        View Products <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-500 border-0 shadow-lg animate-slide-up animation-delay-300 cursor-pointer">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="bg-blue-600/10 p-4 rounded-xl group-hover:bg-blue-600/20 group-hover:scale-110 transition-all duration-300">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-blue-600 transition-colors duration-300">
                      Professional Courses (Digital E-Learning)
                    </h3>
                    {/* <p className="text-muted-foreground group-hover:text-blue-500 mb-6 leading-relaxed transition-colors duration-300">
                     E-Learning Dialysis Online Course
                    </p> */}
                    <ul className="space-y-2 mb-6">
                       <li className="flex items-center gap-2 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                         E-Learning Dialysis Online Course
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        Advanced Dialysis Techniques
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        Skills Competency Assessment
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                      Pharmacology in Dialysis
                      </li>
                        <li className="flex items-center gap-2 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                     Complications in Dialysis Treatment
                      </li>
                    </ul>
                    <Link href="/courses">
                      <Button
                        variant="outline"
                        className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white hover:scale-105 gap-2 bg-transparent transition-all duration-300 transform"
                      >
                        Browse Courses <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              See what medical professionals are saying about RenalFusion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group border-0 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-slide-up animation-delay-200 cursor-pointer">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-blue-500 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground group-hover:text-blue-500 mb-6 leading-relaxed transition-colors duration-300">
                  "Renal Fusion Blend’s e-learning programs have transformed the way our team delivers care. Truly outstanding."
                </p>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground group-hover:text-blue-600 transition-colors duration-300">
                      — Dr. Sarah Johnson
                    </div>
                    <div className="text-sm text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                      Chief of Nephrology, Metro Hospital
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-slide-up animation-delay-300 cursor-pointer">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-blue-500 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground group-hover:text-blue-500 mb-6 leading-relaxed transition-colors duration-300">
                  "The protein products are of the highest quality. Our patients show noticeable improvements in treatment outcomes."
                </p>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground group-hover:text-blue-600 transition-colors duration-300">
                      Dr. Michael Chen
                    </div>
                    <div className="text-sm text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                      Director, Renal Care Center
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-slide-up animation-delay-400 cursor-pointer">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-blue-500 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground group-hover:text-blue-500 mb-6 leading-relaxed transition-colors duration-300">
                  "The 24/7 consultation bot is a game changer — immediate support when we need it most."
                </p>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Stethoscope className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground group-hover:text-blue-600 transition-colors duration-300">
                      Dr. Emily Rodriguez
                    </div>
                    <div className="text-sm text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                      Head of Training, Regional Medical Center
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 text-balance">Ready to Elevate Renal Care?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto text-pretty">
             Join thousands of professionals who rely on Renal Fusion Blend for advanced medical products, education, and digital support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-300">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-gray-100 hover:scale-105 gap-2 px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-300 transform"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Explore Products
                </Button>
              </Link>
              <Link href="/courses">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white hover:text-blue-700 hover:scale-105 gap-2 px-8 py-4 text-lg font-semibold bg-transparent transition-all duration-300 transform"
                >
                  <GraduationCap className="h-5 w-5" />
                  Start Learning
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white hover:text-blue-700 hover:scale-105 gap-2 px-8 py-4 text-lg font-semibold bg-transparent transition-all duration-300 transform"
                >
                  <Phone className="h-5 w-5" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// "use client"

// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { ShoppingBag, Truck, Shield, RotateCcw, ArrowRight } from "lucide-react"

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">Premium Healthcare Products</h1>
//             <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
//               Discover our comprehensive range of high-quality healthcare solutions designed to improve your well-being
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link href="/products">
//                 <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 gap-2">
//                   <ShoppingBag className="h-5 w-5" />
//                   Shop Now
//                 </Button>
//               </Link>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
//               >
//                 Learn More
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               We're committed to providing the best healthcare products with exceptional service
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <Card className="text-center p-6 hover:shadow-lg transition-shadow">
//               <CardContent className="p-6">
//                 <Shield className="h-12 w-12 mx-auto text-green-600 mb-4" />
//                 <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
//                 <p className="text-gray-600">
//                   All our products undergo rigorous quality testing to ensure safety and effectiveness
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="text-center p-6 hover:shadow-lg transition-shadow">
//               <CardContent className="p-6">
//                 <Truck className="h-12 w-12 mx-auto text-blue-600 mb-4" />
//                 <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
//                 <p className="text-gray-600">
//                   Free shipping on orders over $50 with express delivery options available
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="text-center p-6 hover:shadow-lg transition-shadow">
//               <CardContent className="p-6">
//                 <RotateCcw className="h-12 w-12 mx-auto text-purple-600 mb-4" />
//                 <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
//                 <p className="text-gray-600">30-day hassle-free return policy with full refund guarantee</p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="bg-gray-900 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
//           <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
//             Browse our extensive catalog of healthcare products and find exactly what you need
//           </p>
//           <Link href="/products">
//             <Button size="lg" className="bg-blue-600 hover:bg-blue-700 gap-2">
//               View All Products
//               <ArrowRight className="h-5 w-5" />
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

