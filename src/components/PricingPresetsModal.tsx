import { useState, useEffect } from 'react'
import styles from './PricingPresetsModal.module.css'

interface PricingPresetsModalProps {
  markupOption: string
  laborMarkup: string
  materialMarkup: string
  laborMaterialMarkup: string
  otherMarkup: string
  onSave: (data: {
    markupOption: string
    laborMarkup: string
    materialMarkup: string
    laborMaterialMarkup: string
    otherMarkup: string
  }) => void
  onClose: () => void
}

export default function PricingPresetsModal({
  markupOption: initialMarkupOption,
  laborMarkup: initialLaborMarkup,
  materialMarkup: initialMaterialMarkup,
  laborMaterialMarkup: initialLaborMaterialMarkup,
  otherMarkup: initialOtherMarkup,
  onSave,
  onClose
}: PricingPresetsModalProps) {
  const [markupOption, setMarkupOption] = useState(initialMarkupOption)
  const [laborMarkup, setLaborMarkup] = useState(initialLaborMarkup)
  const [materialMarkup, setMaterialMarkup] = useState(initialMaterialMarkup)
  const [laborMaterialMarkup, setLaborMaterialMarkup] = useState(initialLaborMaterialMarkup)
  const [otherMarkup, setOtherMarkup] = useState(initialOtherMarkup)

  useEffect(() => {
    setMarkupOption(initialMarkupOption)
    setLaborMarkup(initialLaborMarkup)
    setMaterialMarkup(initialMaterialMarkup)
    setLaborMaterialMarkup(initialLaborMaterialMarkup)
    setOtherMarkup(initialOtherMarkup)
  }, [initialMarkupOption, initialLaborMarkup, initialMaterialMarkup, initialLaborMaterialMarkup, initialOtherMarkup])

  const handleSave = () => {
    onSave({
      markupOption,
      laborMarkup,
      materialMarkup,
      laborMaterialMarkup,
      otherMarkup
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
              <option>Use defaults every time</option>
              <option>Use the last used values</option>
            </select>
            <p className={styles.explanation}>
              {markupOption === 'Use defaults every time' 
                ? 'Set the default markup values that will be used for all projects.'
                : 'The last used markup values will be automatically applied to new projects.'
              }
            </p>
          </div>

          <div className={styles.markupGrid}>
            <div className={styles.formField}>
              <label className={styles.label}>Labor markup</label>
              <input
                type="text"
                className={styles.input}
                value={laborMarkup}
                onChange={(e) => setLaborMarkup(e.target.value)}
                disabled={markupOption === 'Use the last used values'}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.label}>Material markup</label>
              <input
                type="text"
                className={styles.input}
                value={materialMarkup}
                onChange={(e) => setMaterialMarkup(e.target.value)}
                disabled={markupOption === 'Use the last used values'}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.label}>Labor + Material markup</label>
              <input
                type="text"
                className={styles.input}
                value={laborMaterialMarkup}
                onChange={(e) => setLaborMaterialMarkup(e.target.value)}
                disabled={markupOption === 'Use the last used values'}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.label}>Other markup</label>
              <input
                type="text"
                className={styles.input}
                value={otherMarkup}
                onChange={(e) => setOtherMarkup(e.target.value)}
                disabled={markupOption === 'Use the last used values'}
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

