import { useState, useImperativeHandle, forwardRef, useRef, useEffect } from 'react'
import EstimateCard from './EstimateCard'
import QuestionStepper from './QuestionStepper'
import styles from './ChatSidebar.module.css'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  estimateCard?: {
    estimateId: string
    projectTitle: string
    itemCount: number
    total: string
  }
  showQuestions?: boolean
}

interface ChatSidebarProps {
  onAnswerQuestions?: () => void
  onUpdateAnswers?: (answers: Record<string, string>) => void
}

export interface ChatSidebarRef {
  showQuestions: () => void
}

const ChatSidebar = forwardRef<ChatSidebarRef, ChatSidebarProps>(({ onAnswerQuestions, onUpdateAnswers }, ref) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'user',
      content: 'I need to remodel a 3x5 bathroom with standard finishes',
      timestamp: new Date()
    },
    {
      id: '2',
      role: 'assistant',
      content: "That's a great project! I've created an estimate for your 3x5 bathroom remodel with standard finishes. The estimate includes comprehensive demolition, drywall installation, electrical work, fixture installation, painting, plumbing, and tile work. You'll have a bathroom renovation with significantly better quality materials while maintaining the same professional installation standards.",
      timestamp: new Date(),
      estimateCard: {
        estimateId: 'EST-10027',
        projectTitle: '3x5 Bathroom Remodel - Standard Finishes',
        itemCount: 80,
        total: '$29,462.16'
      }
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleShowQuestions = () => {
    const questionMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: "I need a few more details to provide you with the most accurate estimate. Please answer the following questions:",
      timestamp: new Date(),
      showQuestions: true
    }
    setMessages(prev => [...prev, questionMessage])
    onAnswerQuestions?.()
  }

  const handleUpdateAnswers = (answers: Record<string, string>) => {
    // Remove the question stepper from messages
    setMessages(prev => prev.map(msg => 
      msg.showQuestions ? { ...msg, showQuestions: false } : msg
    ))
    
    // Add a confirmation message
    const confirmationMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: "Thank you for providing those details! I've updated the estimate based on your answers.",
      timestamp: new Date()
    }
    setMessages(prev => [...prev, confirmationMessage])
    
    onUpdateAnswers?.(answers)
  }

  const handleCancelQuestions = () => {
    setMessages(prev => prev.filter(msg => !msg.showQuestions))
  }

  useImperativeHandle(ref, () => ({
    showQuestions: handleShowQuestions
  }))

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
              {message.estimateCard && (
                <EstimateCard
                  estimateId={message.estimateCard.estimateId}
                  projectTitle={message.estimateCard.projectTitle}
                  itemCount={message.estimateCard.itemCount}
                  total={message.estimateCard.total}
                />
              )}
              {message.showQuestions && (
                <QuestionStepper
                  onUpdate={handleUpdateAnswers}
                  onCancel={handleCancelQuestions}
                />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
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
})

ChatSidebar.displayName = 'ChatSidebar'

export default ChatSidebar

