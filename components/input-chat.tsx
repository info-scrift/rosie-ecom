"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

interface ChatInputProps {
  onSubmitMessage: (message: string) => void
  isLoading: boolean
}

const ChatInput = React.memo(({ onSubmitMessage, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    onSubmitMessage(trimmed)
    setInput("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={input}
        onChange={handleChange}
        placeholder="Describe your symptoms... (e.g., 'I have a fever and headache')"
        className="flex-1"
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading || !input.trim()}>
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
      </Button>
    </form>
  )
})

ChatInput.displayName = "ChatInput"
export default ChatInput
