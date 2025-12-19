import { Outlet } from 'react-router-dom'
import styles from './AIPresets.module.css'

export default function AIPresets() {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  )
}

