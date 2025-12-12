import { useState, useEffect } from 'react'
import styles from './PricingPresetsModal.module.css'

interface PricingPresetsModalProps {
  markupOption: string
  laborMarkup: string
  materialMarkup: string
  laborMaterialMarkup: string
  otherMarkup: string
  minProfitMargin: string
  maxProfitMargin: string
  onSave: (data: {
    markupOption: string
    laborMarkup: string
    materialMarkup: string
    laborMaterialMarkup: string
    otherMarkup: string
    minProfitMargin: string
    maxProfitMargin: string
  }) => void
  onClose: () => void
}

export default function PricingPresetsModal({
  markupOption: initialMarkupOption,
  laborMarkup: initialLaborMarkup,
  materialMarkup: initialMaterialMarkup,
  laborMaterialMarkup: initialLaborMaterialMarkup,
  otherMarkup: initialOtherMarkup,
  minProfitMargin: initialMinProfitMargin,
  maxProfitMargin: initialMaxProfitMargin,
  onSave,
  onClose
}: PricingPresetsModalProps) {
  const [markupOption, setMarkupOption] = useState(initialMarkupOption)
  const [laborMarkup, setLaborMarkup] = useState(initialLaborMarkup)
  const [materialMarkup, setMaterialMarkup] = useState(initialMaterialMarkup)
  const [laborMaterialMarkup, setLaborMaterialMarkup] = useState(initialLaborMaterialMarkup)
  const [otherMarkup, setOtherMarkup] = useState(initialOtherMarkup)
  const [minProfitMargin, setMinProfitMargin] = useState(initialMinProfitMargin)
  const [maxProfitMargin, setMaxProfitMargin] = useState(initialMaxProfitMargin)

  useEffect(() => {
    setMarkupOption(initialMarkupOption)
    setLaborMarkup(initialLaborMarkup)
    setMaterialMarkup(initialMaterialMarkup)
    setLaborMaterialMarkup(initialLaborMaterialMarkup)
    setOtherMarkup(initialOtherMarkup)
    setMinProfitMargin(initialMinProfitMargin)
    setMaxProfitMargin(initialMaxProfitMargin)
  }, [initialMarkupOption, initialLaborMarkup, initialMaterialMarkup, initialLaborMaterialMarkup, initialOtherMarkup, initialMinProfitMargin, initialMaxProfitMargin])

  const handleSave = () => {
    onSave({
      markupOption,
      laborMarkup,
      materialMarkup,
      laborMaterialMarkup,
      otherMarkup,
      minProfitMargin,
      maxProfitMargin
    })
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Markups</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          <div className={styles.formField}>
            <label className={styles.label}>Markups</label>
            <select
              className={styles.select}
              value={markupOption}
              onChange={(e) => setMarkupOption(e.target.value)}
            >
              <option>Use defaults everytime.</option>
              <option>Custom</option>
            </select>
            <p className={styles.explanation}>Some explanation here.</p>
          </div>

          <div className={styles.markupGrid}>
            <div className={styles.formField}>
              <label className={styles.label}>Labor markup</label>
              <input
                type="text"
                className={styles.input}
                value={laborMarkup}
                onChange={(e) => setLaborMarkup(e.target.value)}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.label}>Material markup</label>
              <input
                type="text"
                className={styles.input}
                value={materialMarkup}
                onChange={(e) => setMaterialMarkup(e.target.value)}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.label}>Labor + Material markup</label>
              <input
                type="text"
                className={styles.input}
                value={laborMaterialMarkup}
                onChange={(e) => setLaborMaterialMarkup(e.target.value)}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.label}>Other markup</label>
              <input
                type="text"
                className={styles.input}
                value={otherMarkup}
                onChange={(e) => setOtherMarkup(e.target.value)}
              />
            </div>
          </div>

          <button className={styles.addButton}>+ Add markup</button>
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

