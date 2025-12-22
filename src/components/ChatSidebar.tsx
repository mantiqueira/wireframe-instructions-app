import { useState } from 'react'
import styles from './ChatSidebar.module.css'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatSidebarProps {
  onAnswerQuestions: () => void
}

export default function ChatSidebar({ onAnswerQuestions }: ChatSidebarProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "That's a great project! Renovating bathrooms are always a great investment. Let me ask a few questions to help me understand the exact scope of this:",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages([...messages, userMessage])
    setInputValue('')

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I see. To provide you with the most accurate estimate, I need some additional details about your project. Would you like to answer a few questions?",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
    }, 1000)
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.title}>AI Chat</h2>
        <button className={styles.newChatButton}>New chat</button>
      </div>

      <div className={styles.messages}>
        {messages.map((message) => (
          <div key={message.id} className={`${styles.message} ${styles[message.role]}`}>
            {message.role === 'assistant' && (
              <div className={styles.avatar}>🤖</div>
            )}
            <div className={styles.messageContent}>
              <p>{message.content}</p>
              {message.role === 'assistant' && 
               messages.length > 0 && 
               messages[messages.length - 1].id === message.id && (
                <button className={styles.answerButton} onClick={onAnswerQuestions}>
                  Answer questions
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          className={styles.input}
          placeholder="Ask Handoff AI"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <div className={styles.inputActions}>
          <span className={styles.location}>📍 Miami, FL</span>
          <button className={styles.micButton}>🎤</button>
        </div>
      </div>
    </div>
  )
}

