import { ReactNode } from 'react'
import { useLocation, Link } from 'react-router-dom'
import PageTransition from './PageTransition'
import styles from './Layout.module.css'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const getBreadcrumb = () => {
    if (location.pathname === '/') {
      return 'Home'
    } else if (location.pathname === '/settings/instructions') {
      return 'Settings / Instructions'
    } else if (location.pathname === '/settings/instructions/new') {
      return (
        <>
          <Link to="/settings/instructions" className={styles.breadcrumbLink}>
            &lt; Instructions
          </Link>
        </>
      )
    } else if (location.pathname === '/proposal') {
      return 'Proposal / Client Message'
    } else if (location.pathname === '/settings/client-message-templates') {
      return 'Settings / Client Message Templates'
    } else if (location.pathname === '/settings/defaults') {
      return 'Settings / Default values'
    } else if (location.pathname === '/ai-docs') {
      return 'AI docs templates'
    }
    return 'Home'
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Link to="/" className={styles.sidebarLabel}>Navigation</Link>
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

