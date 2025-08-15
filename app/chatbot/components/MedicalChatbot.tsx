"use client"

import { useEffect, useRef, useState } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { ChatMessage } from "@/components/chat-message"
import { AuthWrapper } from "@/components/auth-wrapper"
import { Send, Stethoscope, MessageCircle, Trash2, UserIcon, Bot } from "lucide-react"
import type { Message as DBMessage, User } from "@/lib/supabase"
import ChatInput from "@/components/input-chat"
import Link from "next/link"

function MedicalChatbotContent({ user }: { user: User }) {
    const isAdmin=user.email=="admin@rosie.com" ? true : false

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

    setMessages(prev => [...prev, userMessage])
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

        setMessages(prev => [...prev, aiMessage])
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MediCare Assistant</h1>
                <p className="text-sm text-gray-600">Your personal medical product recommendation assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{user.user_metadata?.display_name || user.email}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
              {/* {
                isAdmin &&
              <Link href={'/admin'}>
                <Button variant="default" size="sm">
                Go to Admin Panel
              </Button>
              </Link>
} */}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Stethoscope className="w-5 h-5 text-blue-500" />
                  Quick Start
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600 mb-4">
                  Describe your symptoms and get personalized product recommendations.
                </p>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Common Symptoms:</h4>
                  {quickSymptoms.map((symptom, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full text-left justify-start h-auto p-2 text-xs bg-transparent hover:bg-blue-50"
                      onClick={() => handleUserSubmit(symptom)}
                      disabled={isLoading}
                    >
                      {symptom}
                    </Button>
                  ))}
                </div>
                {messages.length > 0 && (
                  <div className="pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent hover:bg-red-50"
                      onClick={clearChat}
                      disabled={isLoading}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear Chat
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-200px)] flex flex-col">
              <CardHeader className="border-b flex-shrink-0">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                  Chat with MediCare Assistant
                  {isLoading && (
                    <div className="flex items-center gap-1 ml-2">
                      <Bot className="w-4 h-4 text-blue-500 animate-pulse" />
                      <span className="text-sm text-blue-500">Thinking...</span>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                <ScrollArea className="flex-1 p-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="p-4 bg-blue-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Stethoscope className="w-8 h-8 text-blue-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Welcome {user.user_metadata?.display_name || user.email?.split("@")[0]}!
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        I'm here to help you find the right medical products based on your symptoms. Describe how you're
                        feeling, and I'll recommend suitable products from our catalog.
                      </p>
                      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-sm text-yellow-800">
                          <strong>Disclaimer:</strong> This assistant provides product recommendations only. Always
                          consult with healthcare professionals for medical advice.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <ChatMessage key={message.id} message={message} isComplete />
                      ))}
                      {isLoading && (
                        <div className="flex gap-3 justify-start">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <Card className="p-4 bg-gray-50">
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                              </div>
                              <span className="text-sm text-gray-600">Analyzing your symptoms...</span>
                            </div>
                          </Card>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </ScrollArea>

                <div className="border-t p-4 flex-shrink-0 bg-white">
                  <ChatInput onSubmitMessage={handleUserSubmit} isLoading={isLoading} />
                  <p className="text-xs text-gray-500 mt-2">
                    Press Enter to send • Always consult healthcare professionals for medical advice
                  </p>
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
