import { useState, useEffect } from 'react'
import styles from './SettingsModal.module.css'

interface TaxRateModalProps {
  value: string
  onSave: (value: string) => void
  onClose: () => void
}

export default function TaxRateModal({ value: initialValue, onSave, onClose }: TaxRateModalProps) {
  const [value, setValue] = useState(initialValue.replace('%', ''))

  useEffect(() => {
    setValue(initialValue.replace('%', ''))
  }, [initialValue])

  const handleSave = () => {
    onSave(`${value}%`)
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Tax rate</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          <div className={styles.formField}>
            <label className={styles.label}>Tax rate</label>
            <div className={styles.inputWithSuffix}>
              <input
                type="number"
                className={styles.input}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                min="0"
                max="100"
                step="0.01"
              />
              <span className={styles.suffix}>%</span>
            </div>
            <p className={styles.explanation}>Default tax rate for calculations.</p>
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

