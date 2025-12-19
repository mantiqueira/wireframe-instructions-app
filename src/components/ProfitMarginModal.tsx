import { useState, useEffect } from 'react'
import styles from './SettingsModal.module.css'

interface ProfitMarginModalProps {
  enabled: boolean
  minValue: string
  maxValue: string
  onSave: (data: { enabled: boolean; minValue: string; maxValue: string }) => void
  onClose: () => void
}

export default function ProfitMarginModal({
  enabled: initialEnabled,
  minValue: initialMinValue,
  maxValue: initialMaxValue,
  onSave,
  onClose
}: ProfitMarginModalProps) {
  const [enabled, setEnabled] = useState(initialEnabled)
  const [minValue, setMinValue] = useState(initialMinValue.replace('%', ''))
  const [maxValue, setMaxValue] = useState(initialMaxValue.replace('%', ''))

  useEffect(() => {
    setEnabled(initialEnabled)
    setMinValue(initialMinValue.replace('%', ''))
    setMaxValue(initialMaxValue.replace('%', ''))
  }, [initialEnabled, initialMinValue, initialMaxValue])

  const handleSave = () => {
    onSave({
      enabled,
      minValue: `${minValue}%`,
      maxValue: `${maxValue}%`
    })
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Profit margin limits</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          <div className={styles.formField}>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                className={styles.toggleSwitch}
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
              />
              <span className={styles.switchSlider}></span>
              <span>Enable profit margin constraints</span>
            </label>
            <p className={styles.explanation}>
              When enabled, projects will be constrained by the minimum profit margin set below. 
              <strong> Use either profit margins OR markups, never both.</strong> If profit margins are enabled, markups will be ignored.
            </p>
          </div>

          <div className={styles.formField}>
            <label className={styles.label}>Minimum profit margin</label>
            <div className={styles.inputWithSuffix}>
              <input
                type="number"
                className={styles.input}
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
                min="0"
                max="100"
                step="1"
                disabled={!enabled}
              />
              <span className={styles.suffix}>%</span>
            </div>
            <p className={styles.explanation}>Set the minimum profit margin percentage for all projects. This ensures projects meet your minimum profitability requirements.</p>
          </div>

          <div className={styles.formField}>
            <label className={styles.label}>Maximum profit margin (deprecated)</label>
            <div className={styles.inputWithSuffix}>
              <input
                type="number"
                className={styles.input}
                value={maxValue}
                onChange={(e) => setMaxValue(e.target.value)}
                min="0"
                max="100"
                step="1"
                disabled={true}
                style={{ opacity: 0.5, cursor: 'not-allowed' }}
              />
              <span className={styles.suffix}>%</span>
            </div>
            <p className={styles.explanation} style={{ color: '#666', fontStyle: 'italic' }}>
              Maximum profit margin is not used as it doesn't make practical sense. Only minimum margin is enforced to ensure profitability.
            </p>
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

