import { ReactNode } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useInstructions } from '../context/InstructionsContext'
import { useClientMessageTemplates } from '../context/ClientMessageTemplatesContext'
import { useAIDocsTemplates } from '../context/AIDocsTemplatesContext'
import PageTransition from './PageTransition'
import styles from './Layout.module.css'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { resetInstructions } = useInstructions()
  const { resetTemplates: resetClientTemplates } = useClientMessageTemplates()
  const { resetTemplates: resetAIDocsTemplates } = useAIDocsTemplates()

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data to initial state? This will clear all changes.')) {
      resetInstructions()
      resetClientTemplates()
      resetAIDocsTemplates()
      // Clear session storage
      sessionStorage.clear()
      // Navigate to home
      navigate('/')
    }
  }

  const getBreadcrumb = () => {
    if (location.pathname === '/') {
      return 'Home'
    } else if (location.pathname === '/settings') {
      return 'Settings'
    } else if (location.pathname === '/settings/general') {
      return (
        <>
          <Link to="/settings" className={styles.breadcrumbLink}>
            Settings
          </Link>
          {' / '}
          <span>General settings</span>
        </>
      )
    } else if (location.pathname === '/settings/ai-presets/instructions') {
      return (
        <>
          <Link to="/settings" className={styles.breadcrumbLink}>
            Settings
          </Link>
          {' / '}
          <Link to="/settings/ai-presets/instructions" className={styles.breadcrumbLink}>
            AI presets
          </Link>
          {' / '}
          <span>Instructions</span>
        </>
      )
    } else if (location.pathname === '/settings/ai-presets/instructions/new') {
      return (
        <>
          <Link to="/settings" className={styles.breadcrumbLink}>
            Settings
          </Link>
          {' / '}
          <Link to="/settings/ai-presets/instructions" className={styles.breadcrumbLink}>
            AI presets / Instructions
          </Link>
          {' / '}
          <span>New</span>
        </>
      )
    } else if (location.pathname === '/proposal') {
      return 'Proposal / Client Message'
    } else if (location.pathname === '/settings/client-message-templates') {
      return 'Settings / Client Message Templates'
    } else if (location.pathname === '/ai-docs') {
      return 'AI docs templates'
    }
    return 'Home'
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Link to="/" className={styles.sidebarLabel}>
          <span className={styles.homeIcon}>🏠</span>
          <span>Home</span>
        </Link>
        <button className={styles.resetButton} onClick={handleReset} title="Reset all data to initial state">
          🔄 Reset
        </button>
      </div>
      <div className={styles.main}>
        <div className={styles.breadcrumb}>{getBreadcrumb()}</div>
        <div className={styles.content}>
          <PageTransition key={location.pathname}>{children}</PageTransition>
        </div>
      </div>
    </div>
  )
}

