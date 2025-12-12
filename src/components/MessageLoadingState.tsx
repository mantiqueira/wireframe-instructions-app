import styles from './MessageLoadingState.module.css'

export default function MessageLoadingState() {
  return (
    <div className={styles.container}>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={`${styles.bar} ${styles.shortBar}`}></div>
    </div>
  )
}
