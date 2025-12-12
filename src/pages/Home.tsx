import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${styles.clickable}`} onClick={() => navigate('/settings/instructions')}>
        <div className={styles.cardText}>Settings / instructions</div>
      </div>
      <div className={styles.card}>
        <div className={styles.cardText}>AI docs templates</div>
      </div>
      <div className={`${styles.card} ${styles.clickable}`} onClick={() => navigate('/settings/client-message-templates')}>
        <div className={styles.cardText}>Client message templates</div>
      </div>
      <div className={`${styles.card} ${styles.clickable}`} onClick={() => navigate('/settings/defaults')}>
        <div className={styles.cardText}>Settings / default values</div>
      </div>
    </div>
  )
}

