import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatSidebar, { ChatSidebarRef } from '../components/ChatSidebar'
import styles from './EstimateFeedback.module.css'

export default function EstimateFeedback() {
  const navigate = useNavigate()
  const [showMissingPanel, setShowMissingPanel] = useState(false)
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false)
  const chatSidebarRef = useRef<ChatSidebarRef>(null)
  
  const handleAnswerQuestions = () => {
    if (isLoadingQuestions) return
    
    setIsLoadingQuestions(true)
    setShowMissingPanel(false)
    
    // Simulate a small delay for the loading state
    setTimeout(() => {
      chatSidebarRef.current?.showQuestions()
      setIsLoadingQuestions(false)
    }, 500)
  }

  const handleUpdateAnswers = (answers: Record<string, string>) => {
    // Handle the answers and update estimate
    console.log('Answers:', answers)
    // Here you would update the estimate with the answers
  }
  
  return (
    <div className={styles.container}>
      <ChatSidebar 
        ref={chatSidebarRef}
        onAnswerQuestions={handleAnswerQuestions}
        onUpdateAnswers={handleUpdateAnswers}
      />
      <div className={styles.mainContent}>
        <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backButton} onClick={() => navigate('/')}>←</button>
          <button className={styles.undoButton}>↶</button>
          <button className={styles.redoButton}>↷</button>
          <button className={styles.menuButton}>⋯</button>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.editColumnsButton}>Edit columns</button>
          <button className={styles.convertButton}>Convert to ▼</button>
        </div>
      </div>

      <div className={styles.content}>
        <h1 className={styles.projectTitle}>3x5 Bathroom Remodel - Standard Finishes</h1>
        <div className={styles.projectId}>EST-10027</div>

        <div className={styles.badges}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>27</span>
            <span className={styles.badgeText}>AI updates</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeLogo}>Lowe's</span>
            <span className={styles.badgeText}>49 items from 1 catalog</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>☰</span>
            <span className={styles.badgeText}>1 instruction</span>
          </div>
          <div className={styles.badgeWarning} onClick={() => setShowMissingPanel(true)}>
            Missing for high accuracy
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  Item
                  <span className={styles.sortIcon}>⇅</span>
                </th>
                <th>Quantity</th>
                <th>Unit cost</th>
                <th>Cost t</th>
                <th>Client total</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.phaseRow}>
                <td colSpan={5}>
                  <div className={styles.phaseHeader}>
                    <span>1 PHASE 1: PREP - Demolition</span>
                    <span className={styles.phaseItemCount}>11 items</span>
                    <span className={styles.phaseTotal}>$2,165.48</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>1.1 Demo Vanity</td>
                <td>1</td>
                <td>$65.00 (HRS)</td>
                <td>Lab</td>
                <td>$154.68</td>
              </tr>
              <tr>
                <td>1.2 Demo Bathroom Sink</td>
                <td>1</td>
                <td>$65.00 (HRS)</td>
                <td>Lab</td>
                <td>$154.68</td>
              </tr>
              <tr>
                <td>1.3 Demo Shower Faucet</td>
                <td>1</td>
                <td>$65.00 (HRS)</td>
                <td>Lab</td>
                <td>$154.68</td>
              </tr>
              <tr>
                <td>1.4 Demo Shower Pan</td>
                <td>1</td>
                <td>$65.00 (HRS)</td>
                <td>Lab</td>
                <td>$154.68</td>
              </tr>
              <tr>
                <td>1.5 Demo Shower Surround</td>
                <td>2</td>
                <td>$65.00 (HRS)</td>
                <td>Lab</td>
                <td>$309.35</td>
              </tr>
              <tr>
                <td>1.6 Demo Shower Door</td>
                <td>1</td>
                <td>$65.00 (HRS)</td>
                <td>Lab</td>
                <td>$154.68</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.summary}>
          <button className={styles.showBreakdownButton}>Show breakdown</button>
          <div className={styles.summaryStats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Profit margin</span>
              <span className={styles.statValue}>58.0%</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Total cost</span>
              <span className={styles.statValue}>$12,005.69</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Total markup</span>
              <span className={styles.statValue}>$17,456.47</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Estimate total</span>
              <span className={styles.statValue}>$29,462.16</span>
            </div>
          </div>
        </div>
      </div>

      {showMissingPanel && (
        <>
          <div className={styles.overlay} onClick={() => !isLoadingQuestions && setShowMissingPanel(false)}></div>
          <div className={styles.sidePanel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Missing for higher accuracy</h2>
              <button 
                className={styles.panelCloseButton} 
                onClick={() => !isLoadingQuestions && setShowMissingPanel(false)}
                disabled={isLoadingQuestions}
              >×</button>
            </div>
            <div className={styles.panelContent}>
              <ul className={styles.missingList}>
                <li>Vanity cabinet size and configuration (24" vs 30" vs 36", single vs double sink ready)</li>
                <li>Shower door type (framed vs semi-frameless vs frameless)</li>
                <li>Tile size and pattern complexity (standard grid vs herringbone vs custom pattern)</li>
              </ul>
              <button 
                className={styles.answerButton} 
                onClick={handleAnswerQuestions}
                disabled={isLoadingQuestions}
              >
                {isLoadingQuestions ? 'Loading...' : 'Answer question'}
              </button>
            </div>
          </div>
        </>
      )}

      </div>
    </div>
  )
}

