import { useState, useEffect } from 'react'
import styles from './SettingsModal.module.css'

interface PaymentTermsModalProps {
  value: string
  onSave: (value: string) => void
  onClose: () => void
}

export default function PaymentTermsModal({ value: initialValue, onSave, onClose }: PaymentTermsModalProps) {
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
          <h2 className={styles.title}>Payment terms</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          <div className={styles.formField}>
            <label className={styles.label}>Payment terms</label>
            <select
              className={styles.select}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
              <option>(Net 15/30/45/60)</option>
              <option>Net 15</option>
              <option>Net 30</option>
              <option>Net 45</option>
              <option>Net 60</option>
            </select>
            <p className={styles.explanation}>Set default payment terms for invoices.</p>
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

