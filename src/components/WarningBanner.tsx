import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Instruction } from '../types'
import styles from './WarningBanner.module.css'

interface WarningBannerProps {
  type: 'conflicting' | 'invalid'
  instruction?: Instruction
  allInstructions?: Instruction[]
  onSuggestFix?: (instructionId: string) => void
  onApplyFix?: (instructionId: string, fixedBody: string) => void
  onDeleteConflicting?: (instructionId: string) => void
}

export default function WarningBanner({ 
  type, 
  instruction, 
  allInstructions = [],
  onSuggestFix,
  onApplyFix,
  onDeleteConflicting
}: WarningBannerProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isSuggesting, setIsSuggesting] = useState(false)
  const [suggestedFix, setSuggestedFix] = useState<string | null>(null)
  const navigate = useNavigate()

  const getTitle = () => {
    return type === 'conflicting'
      ? 'This instruction is conflicting'
      : 'This instruction is not supported'
  }

  const handleSuggestFix = async () => {
    if (!instruction || !onSuggestFix) return
    
    setIsSuggesting(true)
    // Simulate AI analysis - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Generate a suggested fix
    const fix = `Group line items by trade, but organize them within the required cost code structure (CSI MasterFormat phases). This allows trade-based grouping while maintaining phase-based organization.`
    setSuggestedFix(fix)
    
    // Call the suggestion handler
    onSuggestFix(instruction.id)
    setIsSuggesting(false)
  }

  const handleApplyFix = () => {
    if (!instruction || !suggestedFix || !onApplyFix) return
    onApplyFix(instruction.id, suggestedFix)
    setSuggestedFix(null)
  }

  const handleDeleteConflicting = () => {
    if (!instruction?.conflictDetails?.conflictingWithIds || !onDeleteConflicting) return
    const conflictingId = instruction.conflictDetails.conflictingWithIds[0]
    if (conflictingId) {
      onDeleteConflicting(conflictingId)
    }
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
          <p style={{ marginBottom: '8px', color: '#666' }}>
            This instruction cannot be applied because it conflicts with {conflictingWith.length === 1 ? 'instruction' : 'instructions'}:{' '}
            {conflictingInstructions.length > 0 ? (
              conflictingInstructions.map((conflictingInst, index) => (
                <span key={conflictingInst.id}>
                  <a
                    href={`/settings/ai-presets/instructions/new?id=${conflictingInst.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      navigate(`/settings/ai-presets/instructions/new?id=${conflictingInst.id}`)
                    }}
                    className={styles.conflictLink}
                  >
                    {conflictingInst.title}
                  </a>
                  {index < conflictingInstructions.length - 1 && ', '}
                </span>
              ))
            ) : (
              <span>{conflictingWith.join(', ')}</span>
            )}
          </p>
          <p style={{ marginBottom: '16px', color: '#666' }}>{conflictReason}</p>
          
          <div style={{ borderTop: '1px solid #ddd', marginTop: '16px', paddingTop: '16px' }}>
            <p style={{ marginBottom: '12px', fontWeight: '600', color: '#000' }}>How to fix it:</p>
            
            {!suggestedFix ? (
              onSuggestFix && (
                <div className={styles.actionButtons}>
                  <button
                    className={styles.actionButton}
                    onClick={handleSuggestFix}
                    disabled={isSuggesting}
                  >
                    {isSuggesting ? 'Analyzing...' : '✨ Suggest fix'}
                  </button>
                </div>
              )
            ) : (
              <div>
                <p style={{ marginBottom: '12px', color: '#666', fontStyle: 'italic' }}>
                  {suggestedFix}
                </p>
                <div className={styles.actionButtons} style={{ display: 'flex', gap: '8px' }}>
                  {onApplyFix && (
                    <button
                      className={styles.applyButton}
                      onClick={handleApplyFix}
                    >
                      Apply fixes
                    </button>
                  )}
                  {onDeleteConflicting && (
                    <button
                      className={styles.deleteButton}
                      onClick={handleDeleteConflicting}
                    >
                      Delete previous instruction
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )
    } else if (type === 'invalid' && instruction?.invalidReason) {
      return (
        <div>
          <p style={{ marginBottom: '0', color: '#666' }}>
            {instruction.invalidReason}
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
          <p style={{ marginBottom: '0', color: '#666' }}>
            This instruction is not supported - it's not possible.
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

