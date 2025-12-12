import { useState, useEffect } from 'react'
import styles from './SettingsModal.module.css'

interface TaxRateModalProps {
  value: string
  onSave: (value: string) => void
  onClose: () => void
}

export default function TaxRateModal({ value: initialValue, onSave, onClose }: TaxRateModalProps) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleSave = () => {
    onSave(value)
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
            <select
              className={styles.select}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
              <option>5.87%</option>
              <option>4.5%</option>
              <option>6.0%</option>
              <option>7.0%</option>
            </select>
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

