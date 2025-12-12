import styles from './InstructionToolbar.module.css'

interface InstructionToolbarProps {
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
  onTranscribe: () => void
  onOptimize: () => void
}

export default function InstructionToolbar({
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onTranscribe,
  onOptimize
}: InstructionToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <button
        className={styles.toolbarButton}
        onClick={onUndo}
        disabled={!canUndo}
        title="Undo"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.5 8C3.5 10.4853 5.51472 12.5 8 12.5C10.4853 12.5 12.5 10.4853 12.5 8C12.5 5.51472 10.4853 3.5 8 3.5C6.77609 3.5 5.67157 4.02369 4.875 4.875L3 3V7H7L5.125 5.125C5.67157 4.52369 6.77609 4 8 4C9.65685 4 11 5.34315 11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        className={styles.toolbarButton}
        onClick={onRedo}
        disabled={!canRedo}
        title="Redo"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 8C12.5 5.51472 10.4853 3.5 8 3.5C5.51472 3.5 3.5 5.51472 3.5 8C3.5 10.4853 5.51472 12.5 8 12.5C9.22391 12.5 10.3284 11.9763 11.125 11.125L13 13V9H9L10.875 10.875C10.3284 11.4763 9.22391 12 8 12C6.34315 12 5 10.6569 5 9C5 7.34315 6.34315 6 8 6C9.65685 6 11 7.34315 11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        className={styles.toolbarButton}
        onClick={onTranscribe}
        title="Transcribe"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2C7.17157 2 6.5 2.67157 6.5 3.5V7.5C6.5 8.32843 7.17157 9 8 9C8.82843 9 9.5 8.32843 9.5 7.5V3.5C9.5 2.67157 8.82843 2 8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 7V7.5C5 9.433 6.567 11 8.5 11H8C9.933 11 11.5 9.433 11.5 7.5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 11V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        className={`${styles.toolbarButton} ${styles.optimizeButton}`}
        onClick={onOptimize}
        title="Optimize"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2L9.5 6L13.5 6.5L10.5 9.5L11 13.5L8 11.5L5 13.5L5.5 9.5L2.5 6.5L6.5 6L8 2Z" fill="currentColor"/>
          <path d="M8 2L9.5 6L13.5 6.5L10.5 9.5L11 13.5L8 11.5L5 13.5L5.5 9.5L2.5 6.5L6.5 6L8 2Z" stroke="currentColor" strokeWidth="0.5"/>
        </svg>
        <span className={styles.optimizeText}>Optimize</span>
      </button>
    </div>
  )
}

