import { useState } from 'react'
import styles from './WarningBanner.module.css'

interface WarningBannerProps {
  type: 'conflicting' | 'invalid'
}

export default function WarningBanner({ type }: WarningBannerProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const getTitle = () => {
    return type === 'conflicting'
      ? 'This instruction is conflicting'
      : 'This instruction is invalid'
  }

  const getMessage = () => {
    return type === 'conflicting'
      ? 'This instruction conflicts with other active instructions. Review your instructions and modify or disable conflicting ones to ensure consistent behavior. Make sure instructions don\'t contradict each other in their requirements or outcomes.'
      : 'This instruction cannot be executed as written. It references elements that don\'t exist or uses an invalid format. Please rewrite the instruction to use valid references and follow the required format for instructions.'
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

