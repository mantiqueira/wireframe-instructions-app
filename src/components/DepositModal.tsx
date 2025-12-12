import { useState, useEffect } from 'react'
import styles from './SettingsModal.module.css'

interface DepositModalProps {
  requireDeposit: string
  depositPercentage: string
  onSave: (data: { requireDeposit: string; depositPercentage: string }) => void
  onClose: () => void
}

export default function DepositModal({
  requireDeposit: initialRequireDeposit,
  depositPercentage: initialDepositPercentage,
  onSave,
  onClose
}: DepositModalProps) {
  const [requireDeposit, setRequireDeposit] = useState(initialRequireDeposit)
  const [depositPercentage, setDepositPercentage] = useState(initialDepositPercentage)

  useEffect(() => {
    setRequireDeposit(initialRequireDeposit)
    setDepositPercentage(initialDepositPercentage)
  }, [initialRequireDeposit, initialDepositPercentage])

  const handleSave = () => {
    onSave({ requireDeposit, depositPercentage })
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Deposit settings</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          <div className={styles.formField}>
            <label className={styles.label}>Require deposit</label>
            <select
              className={styles.select}
              value={requireDeposit}
              onChange={(e) => setRequireDeposit(e.target.value)}
            >
              <option>Yes</option>
              <option>No</option>
            </select>
            <p className={styles.explanation}>Whether to require a deposit by default.</p>
          </div>

          {requireDeposit === 'Yes' && (
            <div className={styles.formField}>
              <label className={styles.label}>Deposit percentage</label>
              <select
                className={styles.select}
                value={depositPercentage}
                onChange={(e) => setDepositPercentage(e.target.value)}
              >
                <option>10%</option>
                <option>15%</option>
                <option>20%</option>
                <option>25%</option>
                <option>30%</option>
              </select>
              <p className={styles.explanation}>Default deposit percentage when required.</p>
            </div>
          )}
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

