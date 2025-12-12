import { useState, useEffect } from 'react'
import styles from './GeneralSettingsModal.module.css'

interface GeneralSettingsModalProps {
  companyName: string
  licenseNumber: string
  phone: string
  email: string
  address: string
  onSave: (data: {
    companyName: string
    licenseNumber: string
    phone: string
    email: string
    address: string
  }) => void
  onClose: () => void
}

export default function GeneralSettingsModal({
  companyName: initialCompanyName,
  licenseNumber: initialLicenseNumber,
  phone: initialPhone,
  email: initialEmail,
  address: initialAddress,
  onSave,
  onClose
}: GeneralSettingsModalProps) {
  const [companyName, setCompanyName] = useState(initialCompanyName)
  const [licenseNumber, setLicenseNumber] = useState(initialLicenseNumber)
  const [phone, setPhone] = useState(initialPhone)
  const [email, setEmail] = useState(initialEmail)
  const [address, setAddress] = useState(initialAddress)

  useEffect(() => {
    setCompanyName(initialCompanyName)
    setLicenseNumber(initialLicenseNumber)
    setPhone(initialPhone)
    setEmail(initialEmail)
    setAddress(initialAddress)
  }, [initialCompanyName, initialLicenseNumber, initialPhone, initialEmail, initialAddress])

  const handleSave = () => {
    onSave({
      companyName,
      licenseNumber,
      phone,
      email,
      address
    })
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Company information</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          <div className={styles.form}>
            <div className={styles.formField}>
              <label className={styles.label}>Company name</label>
              <input
                type="text"
                className={styles.input}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.label}>License number</label>
              <input
                type="text"
                className={styles.input}
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.label}>Phone</label>
              <input
                type="text"
                className={styles.input}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.label}>Address</label>
              <input
                type="text"
                className={styles.input}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
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

