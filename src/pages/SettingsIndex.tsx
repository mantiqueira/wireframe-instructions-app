import { useNavigate } from 'react-router-dom'
import styles from './SettingsIndex.module.css'

export default function SettingsIndex() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      {/* Header with Logo */}
      <div className={styles.header}>
        <div className={styles.logoSection}>
          <div className={styles.logoPlaceholder}>
            <span className={styles.logoIcon}>🏠</span>
          </div>
          <div className={styles.logoActions}>
            <button className={styles.logoAction}>Edit Logo</button>
            <button className={styles.logoAction}>Delete Logo</button>
          </div>
          <h1 className={styles.companyName}>Summit Construction Group</h1>
        </div>
      </div>

      {/* Referral Banner */}
      <div className={styles.referralBanner}>
        <div className={styles.referralContent}>
          <div className={styles.referralText}>
            <div className={styles.referralTitle}>Refer & earn gift cards</div>
            <div className={styles.referralSubtitle}>$100 gift cards for each referral</div>
          </div>
          <div className={styles.referralIcon}>🎁</div>
        </div>
      </div>

      {/* Settings Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>SETTINGS</h2>
        <div className={styles.menuList}>
          <button className={styles.menuItem} onClick={() => navigate('/settings/general')}>
            <span>General settings</span>
            <span className={styles.chevron}>›</span>
          </button>
          <button className={styles.menuItem} onClick={() => navigate('/settings/ai-presets/instructions')}>
            <span>AI presets</span>
            <span className={styles.chevron}>›</span>
          </button>
          <button className={styles.menuItem} onClick={() => {}}>
            <span>Manage terms & conditions</span>
            <span className={styles.chevron}>›</span>
          </button>
          <button className={styles.menuItem} onClick={() => {}}>
            <span>QuickBooks sync</span>
            <span className={styles.chevron}>›</span>
          </button>
          <button className={styles.menuItem} onClick={() => {}}>
            <span>Finance & payments</span>
            <span className={styles.chevron}>›</span>
          </button>
        </div>
      </div>

      {/* Team & Account Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>TEAM & ACCOUNT</h2>
        <div className={styles.menuList}>
          <button className={styles.menuItem} onClick={() => {}}>
            <span>Team users</span>
            <span className={styles.chevron}>›</span>
          </button>
          <button className={styles.menuItem} onClick={() => {}}>
            <span>Contact support</span>
            <span className={styles.chevron}>›</span>
          </button>
        </div>
      </div>

      {/* Legal & Privacy Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>LEGAL & PRIVACY</h2>
        <div className={styles.menuList}>
          <button className={styles.menuItem} onClick={() => {}}>
            <span>Terms of service</span>
            <span className={styles.chevron}>›</span>
          </button>
          <button className={styles.menuItem} onClick={() => {}}>
            <span>Privacy policy</span>
            <span className={styles.chevron}>›</span>
          </button>
        </div>
      </div>

      {/* Danger Zone Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>DANGER ZONE</h2>
        <div className={styles.menuList}>
          <button className={`${styles.menuItem} ${styles.dangerItem}`} onClick={() => {}}>
            <span>Delete account</span>
            <span className={styles.chevron}>›</span>
          </button>
        </div>
      </div>

      {/* Sign Out Button */}
      <button className={styles.signOutButton}>
        <span>Sign out</span>
        <span className={styles.signOutIcon}>→</span>
      </button>

      {/* Footer */}
      <div className={styles.footer}>
        <span className={styles.buildVersion}>Build version 1766107067</span>
        <button className={styles.updateLink}>Check for updates</button>
      </div>
    </div>
  )
}

