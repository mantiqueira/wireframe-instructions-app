import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Instruction } from '../types'
import styles from './WarningBanner.module.css'

interface WarningBannerProps {
  type: 'conflicting' | 'invalid'
  instruction?: Instruction
  allInstructions?: Instruction[]
  onSuggestFix?: (instructionId: string) => void
}

export default function WarningBanner({ 
  type, 
  instruction, 
  allInstructions = [],
  onSuggestFix
}: WarningBannerProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isSuggesting, setIsSuggesting] = useState(false)
  const navigate = useNavigate()

  const getTitle = () => {
    return type === 'conflicting'
      ? 'This instruction is conflicting'
      : 'This instruction is invalid'
  }

  const handleSuggestFix = async () => {
    if (!instruction || !onSuggestFix) return
    
    setIsSuggesting(true)
    // Simulate AI analysis - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Call the suggestion handler
    onSuggestFix(instruction.id)
    setIsSuggesting(false)
  }

  const getConflictingInstructions = () => {
    if (!instruction?.conflictDetails?.conflictingWithIds || !allInstructions.length) {
      return []
    }
    return allInstructions.filter(inst => 
      instruction.conflictDetails?.conflictingWithIds?.includes(inst.id)
    )
  }

  const getMessage = () => {
    if (type === 'conflicting' && instruction?.conflictDetails) {
      const { conflictingWith, conflictReason } = instruction.conflictDetails
      const conflictingInstructions = getConflictingInstructions()
      
      return (
        <div>
          <p style={{ marginBottom: '12px', fontWeight: 'bold' }}>
            {instruction.title} conflicts with {conflictingWith.length === 1 ? 'instruction' : 'instructions'}:
          </p>
          <div style={{ marginBottom: '12px' }}>
            {conflictingInstructions.length > 0 ? (
              conflictingInstructions.map((conflictingInst) => (
                <a
                  key={conflictingInst.id}
                  href={`/settings/instructions/new?id=${conflictingInst.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(`/settings/instructions/new?id=${conflictingInst.id}`)
                  }}
                  className={styles.conflictLink}
                >
                  → {conflictingInst.title}
                </a>
              ))
            ) : (
              <span>{conflictingWith.join(', ')}</span>
            )}
          </div>
          <p style={{ marginBottom: '16px' }}>{conflictReason}</p>
          {onSuggestFix && (
            <div className={styles.actionButtons}>
              <button
                className={styles.actionButton}
                onClick={handleSuggestFix}
                disabled={isSuggesting}
              >
                {isSuggesting ? 'Analyzing...' : '✨ Suggest change'}
              </button>
            </div>
          )}
        </div>
      )
    } else if (type === 'invalid' && instruction?.invalidReason) {
      return (
        <div>
          <p style={{ marginBottom: '0', color: '#666' }}>
            This instruction can't be applied: {instruction.invalidReason}
          </p>
        </div>
      )
    }
    
    // Fallback messages
    if (type === 'conflicting') {
      return 'This instruction conflicts with other active instructions. Review your instructions and modify or disable conflicting ones to ensure consistent behavior.'
    } else {
      return (
        <div>
          <p style={{ marginBottom: '12px', color: '#666' }}>
            This instruction can't be executed as written.
          </p>
          <p style={{ marginBottom: '0', fontSize: '13px', color: '#666' }}>
            Update the instruction to use valid references and follow the required format.
          </p>
        </div>
      )
    }
  }

  return (
    <div className={styles.warningBanner}>
      <div className={styles.topBorder}></div>
      <div className={styles.content}>
        <button
          className={styles.header}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className={styles.icon}>
            {type === 'conflicting' ? '⚠️' : '❌'}
          </span>
          <span className={styles.title}>{getTitle()}</span>
          <span className={styles.chevron}>
            {isExpanded ? '▼' : '▶'}
          </span>
        </button>
        {isExpanded && (
          <div className={styles.body}>
            {getMessage()}
          </div>
        )}
      </div>
    </div>
  )
}

