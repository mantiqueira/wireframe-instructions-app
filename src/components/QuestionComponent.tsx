import { useState } from 'react'
import styles from './QuestionComponent.module.css'

interface QuestionComponentProps {
  onClose: () => void
  onUpdate: (answers: Record<string, string>) => void
}

export default function QuestionComponent({ onClose, onUpdate }: QuestionComponentProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({
    vanity: '',
    showerDoor: '',
    tile: ''
  })

  const questions = [
    {
      id: 'vanity',
      question: 'Vanity cabinet size and configuration',
      options: ['24"', '30"', '36"'],
      subOptions: ['Single sink ready', 'Double sink ready'],
      hasSubOptions: true
    },
    {
      id: 'showerDoor',
      question: 'Shower door type',
      options: ['Framed', 'Semi-frameless', 'Frameless'],
      hasSubOptions: false
    },
    {
      id: 'tile',
      question: 'Tile size and pattern complexity',
      options: ['Standard grid', 'Herringbone', 'Custom pattern'],
      hasSubOptions: false
    }
  ]

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const handleUpdate = () => {
    onUpdate(answers)
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Questions</h2>
            <button className={styles.infoButton}>ℹ️</button>
          </div>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          {questions.map((q, index) => (
            <div key={q.id} className={styles.question}>
              <label className={styles.questionLabel}>
                {index + 1}. {q.question}
              </label>
              <div className={styles.options}>
                {q.options.map((option) => (
                  <label key={option} className={styles.option}>
                    <input
                      type="radio"
                      name={q.id}
                      value={option}
                      checked={answers[q.id]?.startsWith(option) || false}
                      onChange={(e) => {
                        const baseValue = e.target.value
                        handleAnswerChange(q.id, baseValue)
                      }}
                    />
                    <span>{option}</span>
                  </label>
                ))}
                {q.hasSubOptions && q.subOptions && (
                  <div className={styles.subOptions}>
                    {q.subOptions.map((subOption) => (
                      <label key={subOption} className={styles.subOption}>
                        <input
                          type="checkbox"
                          checked={answers[q.id]?.includes(subOption) || false}
                          onChange={(e) => {
                            const base = answers[q.id]?.split(',')[0] || ''
                            if (e.target.checked) {
                              handleAnswerChange(q.id, base ? `${base}, ${subOption}` : subOption)
                            } else {
                              handleAnswerChange(q.id, base)
                            }
                          }}
                        />
                        <span>{subOption}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <button className={styles.backButton} onClick={onClose}>
            Back
          </button>
          <div className={styles.progress}>
            <span className={styles.progressDot}></span>
            <span className={styles.progressDot}></span>
            <span className={styles.progressDot}></span>
          </div>
          <button className={styles.updateButton} onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  )
}

