/**
 * High-quality AI Assistant component with animations and voice controls
 */

"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Bot, X, Send, Mic, MicOff, Circle, Square, 
  Volume2, Sparkles, Trash2, Minimize2, ChevronDown 
} from "lucide-react"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isTyping?: boolean
}

interface VoiceState {
  isListening: boolean
  isRecording: boolean
  isDictationMode: boolean
  recordingDuration: number
}

export function AIAssistantButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isListening: false,
    isRecording: false,
    isDictationMode: false,
    recordingDuration: 0
  })
  const [recordingTime, setRecordingTime] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Load messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ai-assistant-messages')
    if (saved) {
      const parsed = JSON.parse(saved)
      setMessages(parsed.map((m: Message) => ({
        ...m,
        timestamp: new Date(m.timestamp)
      })))
    }
  }, [])

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('ai-assistant-messages', JSON.stringify(messages.slice(-20)))
    }
  }, [messages])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (voiceState.isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } else {
      setRecordingTime(0)
    }
    return () => clearInterval(interval)
  }, [voiceState.isRecording])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 100) + 'px'
    }
  }, [input])

  const mockResponses: Record<string, string> = {
    "hello": "Hello! I'm your AI assistant for City Tutors CRM. I can help you manage board members, donors, calendar events, and financial records. What would you like to do today?",
    "add board member": "I'll help you add a new board member. Please provide:\n• Full name\n• Position (Chair, Vice-Chair, Treasurer, Secretary, or Member)\n• Email address\n• Phone number\n• Company/Organization\n\nWould you like me to open the board member form?",
    "show donors": "Here's a summary of your recent donors:\n• Jennifer Smith - $5,000 (Smith Holdings)\n• Michael Chen - $2,500 (Chen Tech Solutions)\n• Williams Foundation - $10,000\n\nWould you like to see more details or add a new donor?",
    "calendar": "Your upcoming events:\n• Annual Gala Planning - Feb 5\n• Grant Report Due - Feb 8\n• Board Meeting - Feb 15\n\nWould you like to add a new event or view the full calendar?",
    "finances": "Financial Summary:\n• Total Revenue: $450,000\n• Monthly Expenses: $32,500\n• Net Income: $85,000\n• Cash Reserves: $175,000\n\nWould you like to see detailed reports or add a transaction?",
    "help": "I can help you with:\n\n📋 **Board Management**\n• Add/edit/remove board members\n• Track attendance and contributions\n• View board composition\n\n💰 **Donor Management**\n• Add new donors\n• Track interactions and donations\n• Generate donor reports\n\n📅 **Calendar**\n• Schedule meetings and events\n• Set reminders\n• Track deadlines\n\n💵 **Finances**\n• Record transactions\n• View financial reports\n• Track budgets\n\nJust describe what you need!",
    "default": "I understand you want to: {query}. Let me help you with that. You can navigate to the relevant section or I can guide you through the process."
  }

  const getMockResponse = (query: string): string => {
    const lower = query.toLowerCase()
    for (const [key, response] of Object.entries(mockResponses)) {
      if (lower.includes(key)) {
        return response
      }
    }
    return mockResponses.default.replace("{query}", query)
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Add typing indicator
    const typingMessage: Message = {
      id: `typing-${Date.now()}`,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isTyping: true
    }
    setMessages(prev => [...prev, typingMessage])

    // Simulate response
    setTimeout(() => {
      const response = getMockResponse(userMessage.content)
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
        timestamp: new Date()
      }
      setMessages(prev => prev.filter(m => !m.isTyping).concat(assistantMessage))
      setIsLoading(false)
    }, 1500)
  }

  const toggleListening = () => {
    setVoiceState(prev => ({ ...prev, isListening: !prev.isListening }))
    // Simulate voice input after 2 seconds
    if (!voiceState.isListening) {
      setTimeout(() => {
        setInput("Show me today's schedule")
        setVoiceState(prev => ({ ...prev, isListening: false }))
      }, 2000)
    }
  }

  const toggleRecording = () => {
    if (voiceState.isRecording) {
      setVoiceState(prev => ({ ...prev, isRecording: false }))
      // Simulate recorded message
      setInput("This is a longer recorded message about updating donor information...")
    } else {
      setVoiceState(prev => ({ ...prev, isRecording: true }))
    }
  }

  const toggleDictation = () => {
    setVoiceState(prev => ({ ...prev, isDictationMode: !prev.isDictationMode }))
  }

  const clearMessages = () => {
    setMessages([])
    localStorage.removeItem('ai-assistant-messages')
  }

  const quickActions = ["Add board member", "Show donors", "View calendar", "Financial report"]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          // Floating button
          <motion.button
            key="collapsed"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-5 right-5 z-[9999] w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          >
            <Bot className="w-7 h-7 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          </motion.button>
        ) : (
          // Chat panel
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-5 right-5 z-[9999] w-[420px] h-[600px] max-h-[70vh] bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gray-900/50">
              <div className="flex items-center space-x-2">
                <motion.div 
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Bot className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-white font-semibold">AI Assistant</span>
                <motion.span 
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={clearMessages}
                  className="text-gray-400 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-all"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-gray-400 mt-8"
                >
                  <motion.div 
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 flex items-center justify-center mx-auto mb-4"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500/40 to-teal-500/40 flex items-center justify-center">
                      <Bot className="w-8 h-8 text-emerald-400" />
                    </div>
                  </motion.div>
                  <p className="text-sm font-medium mb-1">How can I help you today?</p>
                  <p className="text-xs text-gray-500 mb-4">Ask me anything about managing your CRM</p>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-600">Try saying:</p>
                    <p className="text-xs text-emerald-400">"Add a new board member"</p>
                    <p className="text-xs text-emerald-400">"Show recent donors"</p>
                    <p className="text-xs text-emerald-400">"What's on my calendar?"</p>
                  </div>
                </motion.div>
              ) : (
                messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.isTyping ? (
                      <div className="max-w-[80%] px-4 py-3 bg-gray-800/50 rounded-2xl rounded-bl-sm">
                        <div className="flex space-x-1">
                          {[0, 1, 2].map(i => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-br-sm'
                          : 'bg-gray-800/50 text-white rounded-bl-sm border border-white/5'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Voice Controls */}
            <div className="border-t border-white/10 p-3 bg-gray-900/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {/* Mic button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleListening}
                    className={`p-2.5 rounded-xl transition-all ${
                      voiceState.isListening
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-gray-800/50 text-gray-400 hover:text-white'
                    }`}
                  >
                    {voiceState.isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </motion.button>

                  {/* Record button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleRecording}
                    className={`p-2.5 rounded-xl transition-all ${
                      voiceState.isRecording
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-gray-800/50 text-gray-400 hover:text-white'
                    }`}
                  >
                    {voiceState.isRecording ? <Square className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                  </motion.button>

                  {/* Recording timer */}
                  <AnimatePresence>
                    {voiceState.isRecording && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex items-center space-x-2 px-3 py-1.5 bg-red-500/10 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-sm text-red-400 font-mono">{formatTime(recordingTime)}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Voice activity indicator */}
                  <AnimatePresence>
                    {voiceState.isListening && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center space-x-1"
                      >
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 bg-emerald-400 rounded-full"
                            animate={{ height: [8, 20, 8] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Dictation toggle */}
                <button
                  onClick={toggleDictation}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    voiceState.isDictationMode
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-gray-800/50 text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dictation</span>
                  {voiceState.isDictationMode && (
                    <motion.span
                      className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </button>
              </div>

              {/* Status text */}
              <AnimatePresence>
                {(voiceState.isListening || voiceState.isRecording) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-xs text-center"
                  >
                    {voiceState.isRecording && (
                      <p className="text-red-400">Recording... Click square to stop</p>
                    )}
                    {voiceState.isListening && !voiceState.isRecording && (
                      <p className="text-emerald-400">Listening... Speak now</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 p-3 bg-gray-900/30">
              {/* Quick actions */}
              {messages.length === 0 && !input && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-wrap gap-2 mb-3"
                >
                  {quickActions.map((action, idx) => (
                    <motion.button
                      key={action}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setInput(action)}
                      className="px-3 py-1.5 text-xs bg-gray-800/50 hover:bg-gray-800/70 text-gray-300 hover:text-white rounded-lg border border-white/5 hover:border-white/10 transition-all flex items-center space-x-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{action}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* Input field */}
              <div className="flex items-end space-x-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder="Type a message or click mic to speak..."
                  className="flex-1 px-4 py-2.5 bg-gray-800/50 text-white placeholder-gray-500 rounded-xl border border-white/10 focus:outline-none focus:border-emerald-500/50 resize-none transition-all text-sm"
                  rows={1}
                  style={{ minHeight: '42px', maxHeight: '100px' }}
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={`p-2.5 rounded-xl transition-all ${
                    input.trim() && !isLoading
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-800/30 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                    />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </motion.button>
              </div>

              {/* Keyboard hint */}
              <div className="mt-2 text-xs text-gray-600 text-center">
                <kbd className="px-1.5 py-0.5 bg-gray-800/50 rounded text-gray-400">Enter</kbd> to send,{' '}
                <kbd className="px-1.5 py-0.5 bg-gray-800/50 rounded text-gray-400">Shift+Enter</kbd> for new line
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}