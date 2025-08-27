
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-fade-in">
            {/* <div className="flex justify-center mb-6">
              <div className="bg-blue-400/20 p-4 rounded-full animate-pulse-glow hover:bg-blue-400/30 transition-all duration-300">
                <Heart className="h-12 w-12 text-blue-400" />
              </div>
            </div> */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              <span className="text-blue-400">Renal</span>Fusion
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white/90 max-w-4xl mx-auto text-pretty">
              Advanced Renal Care Products & Professional Education
            </p>
            <p className="text-lg mb-8 text-white/80 max-w-3xl mx-auto text-pretty">
              Empowering healthcare professionals and patients with cutting-edge kidney health products, comprehensive
              courses, and evidence-based treatment products.
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

      {/* Stats Section */}
      <div className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="shadow-lg p-4 text-center animate-slide-up animation-delay-100">
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Healthcare Professionals Trained</div>
            </div>
            <div className="shadow-lg p-4 text-center animate-slide-up animation-delay-200">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Medical Institutions</div>
            </div>
            <div className="shadow-lg p-4 text-center animate-slide-up animation-delay-300">
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Patient Satisfaction Rate</div>
            </div>
            <div className="shadow-lg p-4 text-center animate-slide-up animation-delay-400">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Clinical Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">
              Why Healthcare Professionals Choose RenalFusion
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Comprehensive renal care products backed by clinical research and trusted by medical professionals
              worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-0 shadow-lg animate-slide-up animation-delay-200 cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-500/10 p-4 rounded-full w-fit mx-auto mb-6 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                  <Shield className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Clinical Excellence</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  FDA-approved products with rigorous clinical testing and evidence-based protocols for optimal patient
                  outcomes
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-0 shadow-lg animate-slide-up animation-delay-300 cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-600/10 p-4 rounded-full w-fit mx-auto mb-6 group-hover:bg-blue-600/20 group-hover:scale-110 transition-all duration-300">
                  <GraduationCap className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Expert Education</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Comprehensive training programs designed by leading nephrologists and certified by medical boards
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-0 shadow-lg animate-slide-up animation-delay-400 cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-500/10 p-4 rounded-full w-fit mx-auto mb-6 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                  <Activity className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">24/7 Support</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Round-the-clock clinical support and consultation services for healthcare professionals and patients
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Product Categories */}
      <div className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">Comprehensive Renal Care Products</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              From diagnostic tools to treatment protocols, we provide everything needed for exceptional renal care
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-500 border-0 shadow-lg animate-slide-up animation-delay-200 cursor-pointer">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="bg-blue-500/10 p-4 rounded-xl group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                    <ShoppingBag className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 text-foreground">Medical Products</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Advanced diagnostic equipment, treatment devices, and pharmaceutical products for comprehensive
                      renal care
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        Dialysis Equipment & Supplies
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        Diagnostic Instruments
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        Pharmaceutical Products
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

            <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-500 border-0 shadow-lg animate-slide-up animation-delay-300 cursor-pointer">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="bg-blue-600/10 p-4 rounded-xl group-hover:bg-blue-600/20 group-hover:scale-110 transition-all duration-300">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 text-foreground">Professional Courses</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Accredited training programs for healthcare professionals, from basic nephrology to advanced
                      procedures
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        Nephrology Certification
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        Dialysis Training Programs
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        Continuing Education Credits
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
            <Card className="border-0 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-slide-up animation-delay-200 cursor-pointer">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-blue-500 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "RenalFusion's training programs have significantly improved our team's capabilities. The clinical
                  outcomes speak for themselves."
                </p>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Dr. Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground">Chief of Nephrology, Metro Hospital</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-slide-up animation-delay-300 cursor-pointer">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-blue-500 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "The quality of RenalFusion's products is exceptional. Our patients have seen remarkable improvements
                  in their treatment outcomes."
                </p>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Dr. Michael Chen</div>
                    <div className="text-sm text-muted-foreground">Director, Renal Care Center</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-slide-up animation-delay-400 cursor-pointer">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-blue-500 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "Outstanding support and education. RenalFusion has become an integral part of our professional
                  development program."
                </p>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Stethoscope className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Dr. Emily Rodriguez</div>
                    <div className="text-sm text-muted-foreground">Head of Training, Regional Medical Center</div>
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
            <h2 className="text-4xl font-bold mb-6 text-balance">Ready to Transform Renal Care?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto text-pretty">
              Join thousands of healthcare professionals who trust RenalFusion for their renal care needs. Start your
              journey towards better patient outcomes today.
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

