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

  const getBackPath = () => {
    const path = location.pathname
    
    // Pages with their own toolbars/headers handle back button themselves
    if (path === '/' || path === '/proposal' || path === '/ai-docs' || path === '/settings/client-message-templates' || path === '/estimate-feedback') {
      return null
    } else if (path === '/settings') {
      return '/'
    } else if (path === '/settings/general') {
      return '/settings'
    } else if (path === '/settings/ai-presets/instructions/new') {
      return '/settings/ai-presets/instructions'
    } else if (path === '/settings/ai-presets/instructions') {
      return '/settings'
    }
    
    // Default: go back in history or home
    return '/'
  }

  const handleBack = () => {
    const backPath = getBackPath()
    if (backPath) {
      navigate(backPath)
    } else {
      navigate(-1) // Go back in browser history
    }
  }

  const showSidebar = location.pathname !== '/estimate-feedback'
  
  return (
    <div className={styles.container}>
      {showSidebar && (
        <div className={styles.sidebar}>
          <Link to="/" className={styles.sidebarLabel}>
            <span className={styles.homeIcon}>🏠</span>
            <span>Home</span>
          </Link>
          <button className={styles.resetButton} onClick={handleReset} title="Reset all data to initial state">
            🔄 Reset
          </button>
        </div>
      )}
      <div className={styles.main}>
        {getBackPath() !== null && (
          <div className={styles.headerBar}>
            <button className={styles.backButton} onClick={handleBack}>
              ← Back
            </button>
          </div>
        )}
        <div className={`${styles.content} ${location.pathname === '/estimate-feedback' ? styles.fullWidth : ''}`}>
          <PageTransition key={location.pathname}>{children}</PageTransition>
        </div>
      </div>
    </div>
  )
}

