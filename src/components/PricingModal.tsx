import { useState, useEffect } from 'react'
import styles from './SettingsModal.module.css'

type PricingMode = 'markup' | 'margin' | 'disabled'

interface PricingModalProps {
  mode: PricingMode
  // Markup values
  markupOption: string
  laborMarkup: string
  materialMarkup: string
  laborMaterialMarkup: string
  otherMarkup: string
  // Margin values
  minProfitMargin: string
  onSave: (data: {
    mode: PricingMode
    markupOption: string
    laborMarkup: string
    materialMarkup: string
    laborMaterialMarkup: string
    otherMarkup: string
    minProfitMargin: string
  }) => void
  onClose: () => void
}

export default function PricingModal({
  mode: initialMode,
  markupOption: initialMarkupOption,
  laborMarkup: initialLaborMarkup,
  materialMarkup: initialMaterialMarkup,
  laborMaterialMarkup: initialLaborMaterialMarkup,
  otherMarkup: initialOtherMarkup,
  minProfitMargin: initialMinProfitMargin,
  onSave,
  onClose
}: PricingModalProps) {
  const [mode, setMode] = useState<PricingMode>(initialMode)
  const [markupOption, setMarkupOption] = useState(initialMarkupOption)
  const [laborMarkup, setLaborMarkup] = useState(initialLaborMarkup)
  const [materialMarkup, setMaterialMarkup] = useState(initialMaterialMarkup)
  const [laborMaterialMarkup, setLaborMaterialMarkup] = useState(initialLaborMaterialMarkup)
  const [otherMarkup, setOtherMarkup] = useState(initialOtherMarkup)
  const [minProfitMargin, setMinProfitMargin] = useState(initialMinProfitMargin.replace('%', ''))

  useEffect(() => {
    setMode(initialMode)
    setMarkupOption(initialMarkupOption)
    setLaborMarkup(initialLaborMarkup)
    setMaterialMarkup(initialMaterialMarkup)
    setLaborMaterialMarkup(initialLaborMaterialMarkup)
    setOtherMarkup(initialOtherMarkup)
    setMinProfitMargin(initialMinProfitMargin.replace('%', ''))
  }, [initialMode, initialMarkupOption, initialLaborMarkup, initialMaterialMarkup, initialLaborMaterialMarkup, initialOtherMarkup, initialMinProfitMargin])

  const handleSave = () => {
    onSave({
      mode,
      markupOption,
      laborMarkup,
      materialMarkup,
      laborMaterialMarkup,
      otherMarkup,
      minProfitMargin: `${minProfitMargin}%`
    })
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Pricing</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          {/* Mode Toggle - Radio Buttons */}
          <div className={styles.formField}>
            <label className={styles.label}>Pricing mode</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="pricingMode"
                  value="markup"
                  checked={mode === 'markup'}
                  onChange={() => setMode('markup')}
                />
                <span>Markup</span>
              </label>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="pricingMode"
                  value="margin"
                  checked={mode === 'margin'}
                  onChange={() => setMode('margin')}
                />
                <span>Profit margin</span>
              </label>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="pricingMode"
                  value="disabled"
                  checked={mode === 'disabled'}
                  onChange={() => setMode('disabled')}
                />
                <span>Disabled</span>
              </label>
            </div>
          </div>

          {/* Markup Section */}
          {mode === 'markup' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
            </>
          )}

          {/* Margin Section */}
          {mode === 'margin' && (
            <div className={styles.formField}>
              <label className={styles.label}>Minimum profit margin</label>
              <div className={styles.inputWithSuffix}>
                <input
                  type="number"
                  className={styles.input}
                  value={minProfitMargin}
                  onChange={(e) => setMinProfitMargin(e.target.value)}
                  min="0"
                  max="100"
                  step="1"
                />
                <span className={styles.suffix}>%</span>
              </div>
              <p className={styles.explanation}>
                Set the minimum profit margin percentage for all projects. This ensures projects meet your minimum profitability requirements.
              </p>
            </div>
          )}

          {/* Disabled Section */}
          {mode === 'disabled' && (
            <div className={styles.formField}>
              <p className={styles.explanation}>
                Pricing calculations are disabled. The system will use the last pricing values you entered for each project, allowing you to set prices manually without automatic calculations.
              </p>
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

