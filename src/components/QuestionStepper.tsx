import { useState } from 'react'
import styles from './QuestionStepper.module.css'

interface QuestionStepperProps {
  onUpdate: (answers: Record<string, string>) => void
  onCancel: () => void
}

export default function QuestionStepper({ onUpdate, onCancel }: QuestionStepperProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({
    vanity: '',
    vanityConfig: '',
    showerDoor: '',
    tile: ''
  })

  const questions = [
    {
      id: 'vanity',
      question: 'Vanity cabinet size',
      options: ['24"', '30"', '36"', 'Other']
    },
    {
      id: 'vanityConfig',
      question: 'Vanity cabinet configuration',
      options: ['Single sink ready', 'Double sink ready', 'Other']
    },
    {
      id: 'showerDoor',
      question: 'Shower door type',
      options: ['Framed', 'Semi-frameless', 'Frameless', 'Other']
    },
    {
      id: 'tile',
      question: 'Tile size and pattern complexity',
      options: ['Standard grid', 'Herringbone', 'Custom pattern', 'Other']
    }
  ]

  const currentQuestion = questions[currentStep]
  const isLastStep = currentStep === questions.length - 1
  const showOtherInput = answers[currentQuestion.id] === 'Other'
  const canProceed = answers[currentQuestion.id] !== '' && (!showOtherInput || answers[`${currentQuestion.id}Other`]?.trim() !== '')

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }


  const handleNext = () => {
    if (isLastStep) {
      onUpdate(answers)
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep === 0) {
      onCancel()
    } else {
      setCurrentStep(prev => prev - 1)
    }
  }

  return (
    <div className={styles.stepper}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h3 className={styles.title}>Questions</h3>
          <button className={styles.infoButton}>ℹ️</button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.question}>
          <label className={styles.questionLabel}>
            {currentStep + 1}. {currentQuestion.question}
          </label>
          <div className={styles.options}>
            {currentQuestion.options.map((option) => (
              <label key={option} className={styles.option}>
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option}
                  checked={answers[currentQuestion.id] === option || (option === 'Other' && showOtherInput)}
                  onChange={(e) => {
                    if (e.target.value === 'Other') {
                      handleAnswerChange(currentQuestion.id, 'Other')
                    } else {
                      handleAnswerChange(currentQuestion.id, e.target.value)
                    }
                  }}
                />
                <span>{option}</span>
              </label>
            ))}
            {showOtherInput && (
              <input
                type="text"
                className={styles.otherInput}
                placeholder="Please specify..."
                value={answers[`${currentQuestion.id}Other`] || ''}
                onChange={(e) => {
                  setAnswers(prev => ({
                    ...prev,
                    [`${currentQuestion.id}Other`]: e.target.value
                  }))
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <button className={styles.backButton} onClick={handleBack}>
          {currentStep === 0 ? 'Cancel' : 'Back'}
        </button>
        <div className={styles.progress}>
          {questions.map((_, index) => (
            <span
              key={index}
              className={`${styles.progressDot} ${index <= currentStep ? styles.progressDotActive : ''}`}
            ></span>
          ))}
        </div>
        <button 
          className={styles.nextButton} 
          onClick={handleNext}
          disabled={!canProceed || (showOtherInput && !answers[`${currentQuestion.id}Other`])}
        >
          {isLastStep ? 'Update' : 'Next'}
        </button>
      </div>
    </div>
  )
}

