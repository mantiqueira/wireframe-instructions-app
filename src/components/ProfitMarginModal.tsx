import { useState, useEffect } from 'react'
import styles from './SettingsModal.module.css'

interface ProfitMarginModalProps {
  minValue: string
  maxValue: string
  onSave: (data: { minValue: string; maxValue: string }) => void
  onClose: () => void
}

export default function ProfitMarginModal({
  minValue: initialMinValue,
  maxValue: initialMaxValue,
  onSave,
  onClose
}: ProfitMarginModalProps) {
  const [minValue, setMinValue] = useState(initialMinValue.replace('%', ''))
  const [maxValue, setMaxValue] = useState(initialMaxValue.replace('%', ''))

  useEffect(() => {
    setMinValue(initialMinValue.replace('%', ''))
    setMaxValue(initialMaxValue.replace('%', ''))
  }, [initialMinValue, initialMaxValue])

  const handleSave = () => {
    onSave({
      minValue: `${minValue}%`,
      maxValue: `${maxValue}%`
    })
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Profit margin per project</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          <div className={styles.formField}>
            <label className={styles.label}>Minimum profit margin (%)</label>
            <input
              type="number"
              className={styles.input}
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
              min="0"
              max="100"
              step="1"
            />
            <p className={styles.explanation}>Set the minimum profit margin percentage for all projects.</p>
          </div>

          <div className={styles.formField}>
            <label className={styles.label}>Maximum profit margin (%)</label>
            <input
              type="number"
              className={styles.input}
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
              min="0"
              max="100"
              step="1"
            />
            <p className={styles.explanation}>Set the maximum profit margin percentage for all projects.</p>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.secondaryButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.primaryButton} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

