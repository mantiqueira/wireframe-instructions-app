import { useState, useEffect } from 'react'
import styles from './AIPersonalityModal.module.css'

interface AIPersonalityModalProps {
  clientTone: string
  clientLength: string
  teamTone: string
  teamLength: string
  onSave: (data: {
    clientTone: string
    clientLength: string
    teamTone: string
    teamLength: string
  }) => void
  onClose: () => void
}

export default function AIPersonalityModal({
  clientTone: initialClientTone,
  clientLength: initialClientLength,
  teamTone: initialTeamTone,
  teamLength: initialTeamLength,
  onSave,
  onClose
}: AIPersonalityModalProps) {
  const [clientTone, setClientTone] = useState(initialClientTone)
  const [clientLength, setClientLength] = useState(initialClientLength)
  const [teamTone, setTeamTone] = useState(initialTeamTone)
  const [teamLength, setTeamLength] = useState(initialTeamLength)

  useEffect(() => {
    setClientTone(initialClientTone)
    setClientLength(initialClientLength)
    setTeamTone(initialTeamTone)
    setTeamLength(initialTeamLength)
  }, [initialClientTone, initialClientLength, initialTeamTone, initialTeamLength])

  const handleSave = () => {
    onSave({
      clientTone,
      clientLength,
      teamTone,
      teamLength
    })
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>AI personality</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          <div className={styles.formField}>
            <label className={styles.label}>Client messages and proposals</label>
            
            <div className={styles.subField}>
              <label className={styles.subLabel}>Tone of voice</label>
              <select
                className={styles.select}
                value={clientTone}
                onChange={(e) => setClientTone(e.target.value)}
              >
                <option>Professional</option>
                <option>Friendly</option>
                <option>Casual</option>
                <option>Formal</option>
              </select>
              <p className={styles.explanation}>How Handoff writes to your customers</p>
            </div>

            <div className={styles.subField}>
              <label className={styles.subLabel}>Length</label>
              <select
                className={styles.select}
                value={clientLength}
                onChange={(e) => setClientLength(e.target.value)}
              >
                <option>Concise</option>
                <option>Thorough</option>
                <option>Brief</option>
                <option>Detailed</option>
              </select>
              <p className={styles.explanation}>How Handoff writes to your customers</p>
            </div>
          </div>

          <div className={styles.formField}>
            <label className={styles.label}>To you and your team</label>
            
            <div className={styles.subField}>
              <label className={styles.subLabel}>Tone of voice</label>
              <select
                className={styles.select}
                value={teamTone}
                onChange={(e) => setTeamTone(e.target.value)}
              >
                <option>Professional</option>
                <option>Friendly</option>
                <option>Casual</option>
                <option>Formal</option>
              </select>
              <p className={styles.explanation}>How Handoff writes to your customers</p>
            </div>

            <div className={styles.subField}>
              <label className={styles.subLabel}>Length</label>
              <select
                className={styles.select}
                value={teamLength}
                onChange={(e) => setTeamLength(e.target.value)}
              >
                <option>Concise</option>
                <option>Thorough</option>
                <option>Brief</option>
                <option>Detailed</option>
              </select>
              <p className={styles.explanation}>How Handoff writes to your customers</p>
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

