// "use client"

// import React, { useState } from "react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Send } from "lucide-react"

// interface ChatInputProps {
//   onSubmitMessage: (message: string) => void
//   isLoading: boolean
// }

// const ChatInput = React.memo(({ onSubmitMessage, isLoading }: ChatInputProps) => {
//   const [input, setInput] = useState("")

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInput(e.target.value)
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     const trimmed = input.trim()
//     if (!trimmed || isLoading) return

//     onSubmitMessage(trimmed)
//     setInput("")
//   }

//   return (
//     <form onSubmit={handleSubmit} className="flex gap-2">
//       <Input
//         value={input}
//         onChange={handleChange}
//         placeholder="Describe your symptoms... (e.g., 'I have a fever and headache')"
//         className="flex-1"
//         disabled={isLoading}
//       />
//       <Button type="submit" disabled={isLoading || !input.trim()}>
//         {isLoading ? (
//           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//         ) : (
//           <Send className="w-4 h-4" />
//         )}
//       </Button>
//     </form>
//   )
// })

// ChatInput.displayName = "ChatInput"
// export default ChatInput


"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

interface ChatInputProps {
  onSubmitMessage: (message: string) => void
  isLoading: boolean
}

const ChatInput = React.memo(({ onSubmitMessage, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    adjustTextareaHeight()
  }

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px"
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [input])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    onSubmitMessage(trimmed)
    setInput("")

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-end gap-3 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <div className="flex-1 min-h-[20px] max-h-[120px]">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Describe your symptoms... (e.g., 'I have a fever and headache')"
              className="w-full resize-none border-0 bg-transparent text-sm placeholder-gray-500 focus:outline-none focus:ring-0 leading-relaxed"
              disabled={isLoading}
              rows={1}
              style={{ minHeight: "20px", maxHeight: "120px" }}
            />
          </div>

          {/* Send button */}
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            size="sm"
            className="h-10 w-10 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 transition-all duration-200 shadow-sm hover:shadow-md disabled:shadow-none flex-shrink-0"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Helper text */}
        <div className="flex items-center justify-between mt-2 px-1">
          <p className="text-xs text-gray-500">Press Enter to send • Shift + Enter for new line</p>
          <p className="text-xs text-gray-400">Always consult healthcare professionals for medical advice</p>
        </div>
      </form>
    </div>
  )
})

ChatInput.displayName = "ChatInput"
export default ChatInput
