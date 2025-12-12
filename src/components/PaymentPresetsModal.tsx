import { useState, useEffect } from 'react'
import styles from './PaymentPresetsModal.module.css'

interface PaymentPresetsModalProps {
  paymentTerms: string
  requireDeposit: string
  depositPercentage: string
  taxRate: string
  paymentMethods: {
    debitCredit: boolean
    achTransfer: boolean
    none: boolean
    other: boolean
  }
  onSave: (data: {
    paymentTerms: string
    requireDeposit: string
    depositPercentage: string
    taxRate: string
    paymentMethods: {
      debitCredit: boolean
      achTransfer: boolean
      none: boolean
      other: boolean
    }
  }) => void
  onClose: () => void
}

export default function PaymentPresetsModal({
  paymentTerms: initialPaymentTerms,
  requireDeposit: initialRequireDeposit,
  depositPercentage: initialDepositPercentage,
  taxRate: initialTaxRate,
  paymentMethods: initialPaymentMethods,
  onSave,
  onClose
}: PaymentPresetsModalProps) {
  const [paymentTerms, setPaymentTerms] = useState(initialPaymentTerms)
  const [requireDeposit, setRequireDeposit] = useState(initialRequireDeposit)
  const [depositPercentage, setDepositPercentage] = useState(initialDepositPercentage)
  const [taxRate, setTaxRate] = useState(initialTaxRate)
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods)

  useEffect(() => {
    setPaymentTerms(initialPaymentTerms)
    setRequireDeposit(initialRequireDeposit)
    setDepositPercentage(initialDepositPercentage)
    setTaxRate(initialTaxRate)
    setPaymentMethods(initialPaymentMethods)
  }, [initialPaymentTerms, initialRequireDeposit, initialDepositPercentage, initialTaxRate, initialPaymentMethods])

  const handlePaymentMethodChange = (method: keyof typeof paymentMethods) => {
    setPaymentMethods(prev => ({
      ...prev,
      [method]: !prev[method]
    }))
  }

  const handleSave = () => {
    onSave({
      paymentTerms,
      requireDeposit,
      depositPercentage,
      taxRate,
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
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={paymentMethods.none}
                onChange={() => handlePaymentMethodChange('none')}
                className={styles.checkbox}
              />
              <span>None</span>
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={paymentMethods.other}
                onChange={() => handlePaymentMethodChange('other')}
                className={styles.checkbox}
              />
              <span>?????</span>
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

