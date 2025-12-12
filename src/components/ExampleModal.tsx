import { InstructionExample } from '../types'
import styles from './ExampleModal.module.css'

interface ExampleModalProps {
  examples: InstructionExample[]
  onClose: () => void
  onUseExample: (example: InstructionExample) => void
}

export default function ExampleModal({
  examples,
  onClose,
  onUseExample
}: ExampleModalProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Instruction examples</h2>
        <p className={styles.description}>
          Pick an example to start, then edit it for your own business.
        </p>
        <div className={styles.examplesList}>
          {examples.map((example, index) => (
            <div key={index} className={styles.exampleCard}>
              <h3 className={styles.exampleTitle}>{example.title}</h3>
              <p className={styles.exampleWhere}>Where: {example.where}</p>
              <p className={styles.exampleBody}>{example.body}</p>
              <button
                className={styles.useButton}
                onClick={() => onUseExample(example)}
              >
                Use this template
              </button>
            </div>
          ))}
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

