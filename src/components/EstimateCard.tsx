import styles from './EstimateCard.module.css'

interface EstimateCardProps {
  estimateId: string
  projectTitle: string
  itemCount: number
  total: string
  onViewEstimate?: () => void
}

export default function EstimateCard({ 
  estimateId, 
  projectTitle, 
  itemCount, 
  total,
  onViewEstimate 
}: EstimateCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <button className={styles.minimizeButton}>▼</button>
        <button className={styles.closeButton}>×</button>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.estimateId}>{estimateId}</div>
        <h3 className={styles.projectTitle}>{projectTitle}</h3>
        <div className={styles.itemCount}>{itemCount} items</div>
        <div className={styles.total}>{total}</div>
        <button className={styles.viewButton} onClick={onViewEstimate}>
          View estimate
        </button>
      </div>
      <div className={styles.feedback}>
        <span className={styles.feedbackLabel}>Give feedback</span>
        <div className={styles.feedbackButtons}>
          <button className={styles.thumbsButton}>👍</button>
          <button className={styles.thumbsButton}>👎</button>
        </div>
      </div>
    </div>
  )
}

