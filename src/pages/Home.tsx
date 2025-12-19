import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.card} onClick={() => navigate('/settings')}>
        <div className={styles.cardText}>Settings</div>
      </div>
      <div className={styles.card} onClick={() => navigate('/ai-docs')}>
        <div className={styles.cardText}>AI docs templates</div>
      </div>
      <div className={styles.card} onClick={() => navigate('/settings/client-message-templates')}>
        <div className={styles.cardText}>Client message templates</div>
      </div>
      <div className={styles.card} onClick={() => navigate('/proposal')}>
        <div className={styles.cardText}>Proposal</div>
      </div>
    </div>
  )
}

