// "use client"

// import { useEffect, useRef, useState } from "react"
// import type React from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Input } from "@/components/ui/input"
// import { ChatMessage } from "@/components/chat-message"
// import { AuthWrapper } from "@/components/auth-wrapper"
// import { Send, Stethoscope, MessageCircle, Trash2, UserIcon, Bot } from "lucide-react"
// import type { Message as DBMessage, User } from "@/lib/supabase"
// import ChatInput from "@/components/input-chat"
// import Link from "next/link"

// function MedicalChatbotContent({ user }: { user: User }) {
//     const isAdmin=user.email=="admin@renalfusion.com" ? true : false

//   const [messages, setMessages] = useState<DBMessage[]>([])
//   const [isLoading, setIsLoading] = useState(false)
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     loadMessages()
//   }, [])

//   useEffect(() => {
//     setTimeout(() => {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//     }, 100)
//   }, [messages.length])

//   const loadMessages = async () => {
//     try {
//       const response = await fetch(`/api/messages?userId=${user.id}`)
//       const data = await response.json()

//       if (data.messages) {
//         const formattedMessages: DBMessage[] = data.messages.map((msg: DBMessage) => ({
//           ...msg,
//           recommended_products: msg.recommended_products || [],
//         }))
//         setMessages(formattedMessages)
//       }
//     } catch (error) {
//       console.error("Error loading messages:", error)
//     }
//   }

//   const clearChat = async () => {
//     if (confirm("Are you sure you want to clear your chat history?")) {
//       try {
//         const response = await fetch(`/api/messages?userId=${user.id}`, {
//           method: "DELETE",
//         })
//         if (response.ok) {
//           setMessages([])
//         }
//       } catch (error) {
//         console.error("Error clearing chat:", error)
//       }
//     }
//   }

//   const handleUserSubmit = async (text: string) => {
//     const trimmed = text.trim()
//     if (!trimmed || isLoading) return

//     const timestamp = new Date().toISOString()

//     const userMessage: DBMessage = {
//       id: `${Date.now()}-user`,
//       role: "user",
//       content: trimmed,
//       user_id: user.id,
//       created_at: timestamp,
//       recommended_products: [],
//     }

//     setMessages(prev => [...prev, userMessage])
//     setIsLoading(true)

//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ messages: [...messages, userMessage], userId: user.id }),
//       })

//       const data = await response.json()

//       if (data.message) {
//         const aiMessage: DBMessage = {
//           id: `${Date.now()}-ai`,
//           role: "assistant",
//           content: data.message,
//           user_id: user.id,
//           created_at: new Date().toISOString(),
//           recommended_products: data.recommended_products || [],
//         }

//         setMessages(prev => [...prev, aiMessage])
//       }
//     } catch (err) {
//       console.error("Failed to send message:", err)
//     } finally {
//       setIsLoading(false)
//       setTimeout(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//       }, 200)
//     }
//   }

//   const handleSignOut = async () => {
//     const { supabase } = await import("@/lib/supabase")
//     await supabase.auth.signOut()
//   }

//   const quickSymptoms = [
//     "I have a fever and headache",
//     "My blood pressure seems high",
//     "I'm having trouble breathing",
//     "I have muscle pain and stiffness",
//     "I need help managing diabetes",
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           <div className="lg:col-span-1">
//             <Card className="sticky top-6">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-lg">
//                   <Stethoscope className="w-5 h-5 text-blue-500" />
//                   Quick Start
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <p className="text-sm text-gray-600 mb-4">
//                   Describe your symptoms and get personalized product recommendations.
//                 </p>
//                 <div className="space-y-2">
//                   <h4 className="text-sm font-medium">Common Symptoms:</h4>
//                   {quickSymptoms.map((symptom, index) => (
//                     <Button
//                       key={index}
//                       variant="outline"
//                       size="sm"
//                       className="w-full text-left justify-start h-auto p-2 text-xs bg-transparent hover:bg-blue-50"
//                       onClick={() => handleUserSubmit(symptom)}
//                       disabled={isLoading}
//                     >
//                       {symptom}
//                     </Button>
//                   ))}
//                 </div>
//                 {messages.length > 0 && (
//                   <div className="pt-4 border-t">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="w-full bg-transparent hover:bg-red-50"
//                       onClick={clearChat}
//                       disabled={isLoading}
//                     >
//                       <Trash2 className="w-4 h-4 mr-2" />
//                       Clear Chat
//                     </Button>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>

//           <div className="lg:col-span-3">
//             <Card className="h-[calc(100vh-200px)] flex flex-col">
//               <CardHeader className="border-b flex-shrink-0">
//                 <CardTitle className="flex items-center gap-2">
//                   <MessageCircle className="w-5 h-5 text-blue-500" />
//                   Chat with MediCare Assistant
//                   {isLoading && (
//                     <div className="flex items-center gap-1 ml-2">
//                       <Bot className="w-4 h-4 text-blue-500 animate-pulse" />
//                       <span className="text-sm text-blue-500">Thinking...</span>
//                     </div>
//                   )}
//                 </CardTitle>
//               </CardHeader>

//               <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
//                 <ScrollArea className="flex-1 p-4">
//                   {messages.length === 0 ? (
//                     <div className="text-center py-12">
//                       <div className="p-4 bg-blue-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//                         <Stethoscope className="w-8 h-8 text-blue-500" />
//                       </div>
//                       <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                         Welcome {user.user_metadata?.display_name || user.email?.split("@")[0]}!
//                       </h3>
//                       <p className="text-gray-600 max-w-md mx-auto">
//                         I'm here to help you find the right medical products based on your symptoms. Describe how you're
//                         feeling, and I'll recommend suitable products from our catalog.
//                       </p>
//                       <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
//                         <p className="text-sm text-yellow-800">
//                           <strong>Disclaimer:</strong> This assistant provides product recommendations only. Always
//                           consult with healthcare professionals for medical advice.
//                         </p>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       {messages.map((message) => (
//                         <ChatMessage key={message.id} message={message} isComplete />
//                       ))}
//                       {isLoading && (
//                         <div className="flex gap-3 justify-start">
//                           <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//                             <Bot className="w-4 h-4 text-white" />
//                           </div>
//                           <Card className="p-4 bg-gray-50">
//                             <div className="flex items-center space-x-2">
//                               <div className="flex space-x-1">
//                                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
//                                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
//                                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
//                               </div>
//                               <span className="text-sm text-gray-600">Analyzing your symptoms...</span>
//                             </div>
//                           </Card>
//                         </div>
//                       )}
//                       <div ref={messagesEndRef} />
//                     </div>
//                   )}
//                 </ScrollArea>

//                 <div className="border-t p-4 flex-shrink-0 bg-white">
//                   <ChatInput onSubmitMessage={handleUserSubmit} isLoading={isLoading} />
//                   <p className="text-xs text-gray-500 mt-2">
//                     Press Enter to send • Always consult healthcare professionals for medical advice
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default function MedicalChatbot() {
//   return <AuthWrapper>{(user) => <MedicalChatbotContent user={user} />}</AuthWrapper>
// }











// "use client"

// import { useEffect, useRef, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { ChatMessage } from "@/components/chat-message"
// import { AuthWrapper } from "@/components/auth-wrapper"
// import { Stethoscope, MessageCircle, Trash2, Bot, Sparkles, Shield, Clock } from "lucide-react"
// import type { Message as DBMessage, User } from "@/lib/supabase"
// import ChatInput from "@/components/input-chat"

// function MedicalChatbotContent({ user }: { user: User }) {
//   const isAdmin = user.email == "admin@renalfusion.com" ? true : false

//   const [messages, setMessages] = useState<DBMessage[]>([])
//   const [isLoading, setIsLoading] = useState(false)
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     loadMessages()
//   }, [])

//   useEffect(() => {
//     setTimeout(() => {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//     }, 100)
//   }, [messages.length])

//   const loadMessages = async () => {
//     try {
//       const response = await fetch(`/api/messages?userId=${user.id}`)
//       const data = await response.json()

//       if (data.messages) {
//         const formattedMessages: DBMessage[] = data.messages.map((msg: DBMessage) => ({
//           ...msg,
//           recommended_products: msg.recommended_products || [],
//         }))
//         setMessages(formattedMessages)
//       }
//     } catch (error) {
//       console.error("Error loading messages:", error)
//     }
//   }

//   const clearChat = async () => {
//     if (confirm("Are you sure you want to clear your chat history?")) {
//       try {
//         const response = await fetch(`/api/messages?userId=${user.id}`, {
//           method: "DELETE",
//         })
//         if (response.ok) {
//           setMessages([])
//         }
//       } catch (error) {
//         console.error("Error clearing chat:", error)
//       }
//     }
//   }

//   const handleUserSubmit = async (text: string) => {
//     const trimmed = text.trim()
//     if (!trimmed || isLoading) return

//     const timestamp = new Date().toISOString()

//     const userMessage: DBMessage = {
//       id: `${Date.now()}-user`,
//       role: "user",
//       content: trimmed,
//       user_id: user.id,
//       created_at: timestamp,
//       recommended_products: [],
//     }

//     setMessages((prev) => [...prev, userMessage])
//     setIsLoading(true)

//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ messages: [...messages, userMessage], userId: user.id }),
//       })

//       const data = await response.json()

//       if (data.message) {
//         const aiMessage: DBMessage = {
//           id: `${Date.now()}-ai`,
//           role: "assistant",
//           content: data.message,
//           user_id: user.id,
//           created_at: new Date().toISOString(),
//           recommended_products: data.recommended_products || [],
//         }

//         setMessages((prev) => [...prev, aiMessage])
//       }
//     } catch (err) {
//       console.error("Failed to send message:", err)
//     } finally {
//       setIsLoading(false)
//       setTimeout(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//       }, 200)
//     }
//   }

//   const handleSignOut = async () => {
//     const { supabase } = await import("@/lib/supabase")
//     await supabase.auth.signOut()
//   }

//   const quickSymptoms = [
//     "I have a fever and headache",
//     "My blood pressure seems high",
//     "I'm having trouble breathing",
//     "I have muscle pain and stiffness",
//     "I need help managing diabetes",
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
//                 <Stethoscope className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">MediCare Assistant</h1>
//                 <p className="text-sm text-gray-600">AI-powered medical product recommendations</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="text-right">
//                 <p className="text-sm font-medium text-gray-900">
//                   {user.user_metadata?.display_name || user.email?.split("@")[0]}
//                 </p>
//                 <p className="text-xs text-gray-500">Online</p>
//               </div>
//               <Button variant="outline" size="sm" onClick={handleSignOut}>
//                 Sign Out
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="w-auto mx-auto px-4 py-6">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           <div className="lg:col-span-1">
//             <div className="sticky top-24 space-y-4">
//               <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
//                 <CardHeader className="pb-4">
//                   <CardTitle className="flex items-center gap-2 text-lg">
//                     <Sparkles className="w-5 h-5 text-blue-500" />
//                     Quick Start
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <p className="text-sm text-gray-600 leading-relaxed">
//                     Describe your symptoms and get personalized product recommendations powered by AI.
//                   </p>

//                   <div className="space-y-3">
//                     <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
//                       <Clock className="w-4 h-4" />
//                       Common Symptoms
//                     </h4>
//                     <div className="space-y-2">
//                       {quickSymptoms.map((symptom, index) => (
//                         <Button
//                           key={index}
//                           variant="ghost"
//                           size="sm"
//                           className="w-full text-left justify-start h-auto p-3 text-xs bg-gray-50 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all duration-200 border border-gray-100 hover:border-blue-200"
//                           onClick={() => handleUserSubmit(symptom)}
//                           disabled={isLoading}
//                         >
//                           <div className="text-left">
//                             <p className="font-medium">{symptom}</p>
//                           </div>
//                         </Button>
//                       ))}
//                     </div>
//                   </div>

//                   {messages.length > 0 && (
//                     <div className="pt-4 border-t border-gray-100">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="w-full bg-red-50 hover:bg-red-100 text-red-700 border-red-200 hover:border-red-300"
//                         onClick={clearChat}
//                         disabled={isLoading}
//                       >
//                         <Trash2 className="w-4 h-4 mr-2" />
//                         Clear Chat History
//                       </Button>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>

            //   <Card className="bg-amber-50/80 backdrop-blur-sm border-amber-200 shadow-lg">
            //     <CardContent className="p-4">
            //       <div className="flex items-start gap-3">
            //         <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            //         <div>
            //           <h4 className="text-sm font-semibold text-amber-800 mb-1">Medical Disclaimer</h4>
            //           <p className="text-xs text-amber-700 leading-relaxed">
            //             This assistant provides product recommendations only. Always consult healthcare professionals
            //             for medical advice and diagnosis.
            //           </p>
            //         </div>
            //       </div>
            //     </CardContent>
            //   </Card>
//             </div>
//           </div>

//           <div className="lg:col-span-3">
//             <Card className="h-[calc(100vh-200px)] flex flex-col bg-white/80 backdrop-blur-sm border-0 shadow-xl">
//               {/* <CardHeader className="border-b border-gray-100 flex-shrink-0 bg-white/50">
//                 <CardTitle className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <MessageCircle className="w-5 h-5 text-blue-500" />
//                     <span>Chat with MediCare Assistant</span>
//                   </div>
//                   {isLoading && (
//                     <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
//                       <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
//                       <span className="text-sm text-blue-600 font-medium">AI is thinking...</span>
//                     </div>
//                   )}
//                 </CardTitle>
//               </CardHeader> */}

//               <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
//                 <ScrollArea className="flex-1 p-6">
//                   {messages.length === 0 ? (
//                     <div className="text-center py-12 animate-in fade-in duration-500">
//                       <div className="relative mb-6">
//                         <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl w-20 h-20 mx-auto shadow-lg">
//                           <Stethoscope className="w-8 h-8 text-white mx-auto" />
//                         </div>
//                         <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
//                           <Sparkles className="w-3 h-3 text-white" />
//                         </div>
//                       </div>
//                       <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                         Welcome {user.user_metadata?.display_name || user.email?.split("@")[0]}!
//                       </h3>
//                       <p className="text-gray-600 max-w-md mx-auto leading-relaxed mb-6">
//                         I'm your AI-powered medical assistant. Describe your symptoms, and I'll recommend suitable
//                         products from our comprehensive catalog.
//                       </p>
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
//                         <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
//                           <Bot className="w-6 h-6 text-blue-500 mx-auto mb-2" />
//                           <p className="text-sm font-medium text-blue-900">AI-Powered</p>
//                           <p className="text-xs text-blue-700">Smart recommendations</p>
//                         </div>
//                         <div className="p-4 bg-green-50 rounded-xl border border-green-100">
//                           <Shield className="w-6 h-6 text-green-500 mx-auto mb-2" />
//                           <p className="text-sm font-medium text-green-900">Safe & Secure</p>
//                           <p className="text-xs text-green-700">Your privacy matters</p>
//                         </div>
//                         <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
//                           <Clock className="w-6 h-6 text-purple-500 mx-auto mb-2" />
//                           <p className="text-sm font-medium text-purple-900">24/7 Available</p>
//                           <p className="text-xs text-purple-700">Always here to help</p>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="space-y-6">
//                       {messages.map((message) => (
//                         <ChatMessage key={message.id} message={message} isComplete />
//                       ))}
//                       {isLoading && (
//                         <div className="flex gap-4 justify-start animate-in slide-in-from-bottom-2 duration-300">
//                           <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md ring-2 ring-blue-100">
//                             <Bot className="w-5 h-5 text-white" />
//                           </div>
//                           <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm max-w-xs">
//                             <div className="flex items-center space-x-3">
//                               <div className="flex space-x-1">
//                                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
//                                 <div
//                                   className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
//                                   style={{ animationDelay: "0.1s" }}
//                                 />
//                                 <div
//                                   className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
//                                   style={{ animationDelay: "0.2s" }}
//                                 />
//                               </div>
//                               <span className="text-sm text-gray-600 font-medium">Analyzing symptoms...</span>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                       <div ref={messagesEndRef} />
//                     </div>
//                   )}
//                 </ScrollArea>

//                 <div className="border-t border-gray-100 p-6 flex-shrink-0 bg-gray-50/50">
//                   <ChatInput onSubmitMessage={handleUserSubmit} isLoading={isLoading} />
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default function MedicalChatbot() {
//   return <AuthWrapper>{(user) => <MedicalChatbotContent user={user} />}</AuthWrapper>
// }


"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "@/components/chat-message"
import { AuthWrapper } from "@/components/auth-wrapper"
import { Stethoscope, MessageCircle, Trash2, Bot, Sparkles, Shield, Clock } from "lucide-react"
import type { Message as DBMessage, User } from "@/lib/supabase"
import ChatInput from "@/components/input-chat"
import Image from "next/image"

function MedicalChatbotContent({ user }: { user: User }) {
  const isAdmin = user.email == "admin@renalfusion.com" ? true : false

  const [messages, setMessages] = useState<DBMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadMessages()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [messages.length])

  const loadMessages = async () => {
    try {
      const response = await fetch(`/api/messages?userId=${user.id}`)
      const data = await response.json()

      if (data.messages) {
        const formattedMessages: DBMessage[] = data.messages.map((msg: DBMessage) => ({
          ...msg,
          recommended_products: msg.recommended_products || [],
        }))
        setMessages(formattedMessages)
      }
    } catch (error) {
      console.error("Error loading messages:", error)
    }
  }

  const clearChat = async () => {
    if (confirm("Are you sure you want to clear your chat history?")) {
      try {
        const response = await fetch(`/api/messages?userId=${user.id}`, {
          method: "DELETE",
        })
        if (response.ok) {
          setMessages([])
        }
      } catch (error) {
        console.error("Error clearing chat:", error)
      }
    }
  }

  const handleUserSubmit = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    const timestamp = new Date().toISOString()

    const userMessage: DBMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      content: trimmed,
      user_id: user.id,
      created_at: timestamp,
      recommended_products: [],
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage], userId: user.id }),
      })

      const data = await response.json()

      if (data.message) {
        const aiMessage: DBMessage = {
          id: `${Date.now()}-ai`,
          role: "assistant",
          content: data.message,
          user_id: user.id,
          created_at: new Date().toISOString(),
          recommended_products: data.recommended_products || [],
        }

        setMessages((prev) => [...prev, aiMessage])
      }
    } catch (err) {
      console.error("Failed to send message:", err)
    } finally {
      setIsLoading(false)
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 200)
    }
  }

  const handleSignOut = async () => {
    const { supabase } = await import("@/lib/supabase")
    await supabase.auth.signOut()
  }

  const quickSymptoms = [
    "I have a fever and headache",
    "My blood pressure seems high",
    "I'm having trouble breathing",
    "I have muscle pain and stiffness",
    "I need help managing diabetes",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100">
    <section className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-10 md:py-4">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center  text-center md:text-left ">
        
        {/* Left side - Text */}
        <div className="flex-1 ml-14">
          <h1 className="text-2xl md:text-4xl font-bold leading-tight">
            AI Consultation Bot
          </h1>
          <p className="mt-3 text-sm md:text-base text-blue-100">
            Get quick, AI-powered guidance for your healthcare product queries.
          </p>
        </div>
 <div className="flex-1 flex items-center justify-center relative">
          <div className="bg-white/10 rounded-full p-6 md:p-6 backdrop-blur-lg shadow-2xl flex items-center gap-8">
            <Bot className="w-20 h-20 md:w-10 md:h-10 text-white" />
            <Stethoscope className="w-20 h-20 md:w-10 md:h-10 text-white" />
          </div>
        </div>
        {/* Right side - Icons */}
        {/* <div className="flex flex-row items-center gap-4 text-blue-100">
          <Brain className="w-14 h-14 md:w-20 md:h-20" />
          <Stethoscope className="w-14 h-14 md:w-20 md:h-20" />
        </div> */}
      </div>
    </section>
      {/* <div className="bg-white/90 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-900">MediCare Assistant</h1>
                <p className="text-sm text-blue-700">AI-powered medical product recommendations</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-blue-900">
                  {user.user_metadata?.display_name || user.email?.split("@")[0]}
                </p>
                <p className="text-xs text-blue-600">Online</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="border-blue-300 text-blue-700">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div> */}

      <div className="w-auto mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <Card className="bg-white/90 backdrop-blur-sm border border-blue-200 shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg text-blue-800">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                    Quick Start
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-blue-700 leading-relaxed">
                    Describe your symptoms and get personalized product recommendations powered by AI.
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-blue-900 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Common Symptoms
                    </h4>
                    <div className="space-y-2">
                      {quickSymptoms.map((symptom, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="w-full text-left justify-start h-auto p-3 text-xs bg-blue-50 hover:bg-blue-100 hover:text-blue-800 rounded-lg transition-all duration-200 border border-blue-100 hover:border-blue-300"
                          onClick={() => handleUserSubmit(symptom)}
                          disabled={isLoading}
                        >
                          <div className="text-left">
                            <p className="font-medium">{symptom}</p>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {messages.length > 0 && (
                    <div className="pt-4 border-t border-blue-100">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 hover:border-blue-300"
                        onClick={clearChat}
                        disabled={isLoading}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear Chat History
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

             <Card className="bg-amber-50/80 backdrop-blur-sm border-amber-200 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-amber-800 mb-1">Medical Disclaimer</h4>
                      <p className="text-xs text-amber-700 leading-relaxed">
                        This assistant provides product recommendations only. Always consult healthcare professionals
                        for medical advice and diagnosis.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-200px)] flex flex-col bg-white/90 backdrop-blur-sm border border-blue-200 shadow-lg">
              <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                <ScrollArea className="flex-1 p-6">
                  {messages.length === 0 ? (
                    <div className="text-center py-12 animate-in fade-in duration-500">
                      <div className="relative mb-6">
                        <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl w-20 h-20 mx-auto shadow-lg">
                          <Stethoscope className="w-8 h-8 text-white mx-auto" />
                        </div>
                        {/* <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div> */}
                      </div>
                      <h3 className="text-2xl font-bold text-blue-900 mb-3">
                        {/* Welcome {user.user_metadata?.display_name || user.email?.split("@")[0]}! */}
                        Welcome!
                      </h3>
                      <p className="text-blue-700 max-w-md mx-auto leading-relaxed mb-6">
                        I'm your AI-powered medical assistant. Describe your symptoms, and I'll recommend suitable
                        products from our comprehensive catalog.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                          <Bot className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                          <p className="text-sm font-medium text-blue-900">AI-Powered</p>
                          <p className="text-xs text-blue-700">Smart recommendations</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                          <Shield className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                          <p className="text-sm font-medium text-blue-900">Safe & Secure</p>
                          <p className="text-xs text-blue-700">Your privacy matters</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                          <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                          <p className="text-sm font-medium text-blue-900">24/7 Available</p>
                          <p className="text-xs text-blue-700">Always here to help</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {messages.map((message) => (
                        <ChatMessage key={message.id} message={message} isComplete />
                      ))}
                      {isLoading && (
                        <div className="flex gap-4 justify-start animate-in slide-in-from-bottom-2 duration-300">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md ring-2 ring-blue-100">
                            <Bot className="w-5 h-5 text-white" />
                          </div>
                          <div className="bg-white border border-blue-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm max-w-xs">
                            <div className="flex items-center space-x-3">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                                <div
                                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                />
                                <div
                                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                />
                              </div>
                              <span className="text-sm text-blue-700 font-medium">Analyzing symptoms...</span>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </ScrollArea>

                <div className="border-t border-blue-100 p-6 flex-shrink-0 bg-blue-50/50">
                  <ChatInput onSubmitMessage={handleUserSubmit} isLoading={isLoading} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MedicalChatbot() {
  return <AuthWrapper>{(user) => <MedicalChatbotContent user={user} />}</AuthWrapper>
}