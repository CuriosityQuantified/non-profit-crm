/**
 * AI Assistant floating button component
 * Simple implementation without dependencies
 */

"use client"

import { useState } from "react"
import { Bot, X, Send } from "lucide-react"

export function AIAssistantButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    
    // Add user message
    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    
    // Simulate AI response
    setTimeout(() => {
      setMessages([...newMessages, { 
        role: "assistant", 
        content: "I'm here to help! This is a placeholder response. Full AI functionality coming soon." 
      }])
    }, 500)
    
    setInput("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating AI Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group"
        >
          <Bot className="w-7 h-7 text-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[400px] h-[500px] max-h-[60vh] bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-semibold">AI Assistant</span>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 mt-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-emerald-400" />
                </div>
                <p className="text-sm">How can I help you today?</p>
                <p className="text-xs mt-2 text-gray-500">Ask me anything about managing your CRM</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                        : 'bg-gray-800/50 text-white border border-white/5'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 bg-gray-800/50 text-white rounded-xl border border-white/10 focus:outline-none focus:border-emerald-500/50 placeholder-gray-500"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}