import { useEffect } from 'react'
import styles from './Toast.module.css'

interface ToastProps {
  message: string
  onDismiss: () => void
  duration?: number
}

export default function Toast({ message, onDismiss, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss()
    }, duration)

    return () => clearTimeout(timer)
  }, [onDismiss, duration])

  return (
    <div className={styles.toast}>
      <span className={styles.message}>{message}</span>
      <button className={styles.dismissButton} onClick={onDismiss}>
        ×
      </button>
    </div>
  )
}

