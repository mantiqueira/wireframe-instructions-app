import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Instruction } from '../types'
import styles from './InstructionCard.module.css'

interface InstructionCardProps {
  instruction: Instruction
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
  onSeeUsage: (instruction: Instruction) => void
}

export default function InstructionCard({
  instruction,
  onDelete,
  onToggleStatus,
  onSeeUsage
}: InstructionCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getStatusLabel = () => {
    switch (instruction.status) {
      case 'active':
        return 'Active'
      case 'disabled':
        return 'Disabled'
      case 'conflicting':
        return 'Conflicting instructions'
      case 'invalid':
        return 'Not supported'
      default:
        return 'Active'
    }
  }

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen)
  }

  const handleSeeUsage = () => {
    setMenuOpen(false)
    onSeeUsage(instruction)
  }

  const handleToggle = () => {
    onToggleStatus(instruction.id)
    setMenuOpen(false)
  }

  const handleDelete = () => {
    onDelete(instruction.id)
    setMenuOpen(false)
  }

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    // Don't navigate if clicking on buttons, the menu, or the applied badge
    if (target.tagName === 'BUTTON' || menuRef.current?.contains(target) || badgeRef.current?.contains(target)) {
      return
    }
    // Navigate when clicking on the card content
    navigate(`/settings/ai-presets/instructions/new?id=${instruction.id}`)
  }

  return (
    <div 
      className={styles.card}
      onClick={handleCardClick}
    >
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{instruction.title}</h3>
        <p className={styles.body}>{instruction.body}</p>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.badges}>
          <span className={`${styles.statusBadge} ${styles[`statusBadge${instruction.status.charAt(0).toUpperCase() + instruction.status.slice(1)}`]}`}>
            {getStatusLabel()}
          </span>
          <span 
            ref={badgeRef}
            className={`${styles.appliedBadge} ${styles.appliedBadgeClickable}`}
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
            onClick={(e) => {
              e.stopPropagation()
              handleSeeUsage()
            }}
            title="Click to see usage details"
          >
            Applied {instruction.appliedCount} {instruction.appliedCount === 1 ? 'time' : 'times'}
            {tooltipVisible && instruction.appliedCount > 0 && (
              <div className={styles.tooltip}>
                Applied in {instruction.appliedCount} {instruction.where.toLowerCase()}
                {instruction.appliedCount > 0 && (
                  <div className={styles.tooltipDetail}>
                    Click to view details and locations
                  </div>
                )}
              </div>
            )}
          </span>
        </div>
        <div className={styles.menuContainer} ref={menuRef}>
          <button className={styles.menuButton} onClick={handleMenuClick}>
            ⋯
          </button>
          {menuOpen && (
            <div className={styles.menu}>
              <button className={styles.menuItem} onClick={handleSeeUsage}>
                See usage
              </button>
              <button className={styles.menuItem} onClick={handleToggle}>
                {instruction.status === 'disabled' ? 'Use instruction' : "Don't use instruction"}
              </button>
              <button className={styles.menuItem} onClick={handleDelete}>
                Delete instruction
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

