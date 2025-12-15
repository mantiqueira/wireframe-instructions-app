import { useState, useEffect } from 'react'
import styles from './PaymentPresetsModal.module.css'

interface PaymentPresetsModalProps {
  paymentMethods: {
    debitCredit: boolean
    achTransfer: boolean
  }
  onSave: (data: {
    paymentMethods: {
      debitCredit: boolean
      achTransfer: boolean
    }
  }) => void
  onClose: () => void
}

export default function PaymentPresetsModal({
  paymentMethods: initialPaymentMethods,
  onSave,
  onClose
}: PaymentPresetsModalProps) {
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods)

  useEffect(() => {
    setPaymentMethods(initialPaymentMethods)
  }, [initialPaymentMethods])

  const handlePaymentMethodChange = (method: keyof typeof paymentMethods) => {
    setPaymentMethods(prev => ({
      ...prev,
      [method]: !prev[method]
    }))
  }

  const handleSave = () => {
    onSave({
      paymentMethods
    })
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Accepted payment methods</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          <p className={styles.explanation}>Some explanation here.</p>
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={paymentMethods.debitCredit}
                onChange={() => handlePaymentMethodChange('debitCredit')}
                className={styles.checkbox}
              />
              <span>Debit/Credit</span>
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={paymentMethods.achTransfer}
                onChange={() => handlePaymentMethodChange('achTransfer')}
                className={styles.checkbox}
              />
              <span>ACH transfer</span>
            </label>
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

