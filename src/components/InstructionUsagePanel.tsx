import { useState } from 'react'
import { Instruction } from '../types'
import styles from './InstructionUsagePanel.module.css'

interface UsageRecord {
  id: string
  estimateName: string
  date: string
  hour: string
  who: string
  link: string
  applied: boolean
  skippedReason?: string
}

interface InstructionUsagePanelProps {
  instruction: Instruction
  onClose: () => void
}

type TimePeriod = '30' | '60' | '90' | 'all'

// Generate mock records based on count
const generateUsageRecords = (count: number): UsageRecord[] => {
  const records: UsageRecord[] = []
  const names = [
    'Kitchen Remodel', 'Bathroom Renovation', 'Deck Installation', 'Roof Replacement',
    'Basement Finishing', 'Garage Conversion', 'Patio Construction', 'Window Replacement',
    'Siding Installation', 'HVAC Upgrade', 'Electrical Rewire', 'Plumbing Update'
  ]
  const streets = ['Maple St', 'Oak Ave', 'Pine Rd', 'Elm St', 'Cedar Ln', 'Birch Dr', 'Willow Way', 'Spruce Blvd']
  const users = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'David Brown']
  const skipReasons = [
    'Conflicts with instruction: Material markup tiers',
    'Missing required data fields',
    'Invalid format detected',
    'Conflicts with instruction: Labor rate calculations'
  ]
  
  const now = new Date()
  
  for (let i = 0; i < count + 2; i++) {
    const daysAgo = Math.floor(i / 2)
    const date = new Date(now)
    date.setDate(date.getDate() - daysAgo)
    
    const hours = ['9:00 AM', '10:15 AM', '11:30 AM', '2:00 PM', '3:45 PM', '4:30 PM', '5:15 PM']
    const randomHour = hours[Math.floor(Math.random() * hours.length)]
    
    // Mix of applied and skipped
    const applied = i < count
    const skippedReason = !applied ? skipReasons[i % skipReasons.length] : undefined
    
    records.push({
      id: `${i + 1}`,
      estimateName: `${names[i % names.length]} - ${streets[i % streets.length]}`,
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      hour: randomHour,
      who: users[i % users.length],
      link: `/estimates/${123 + i}`,
      applied,
      skippedReason
    })
  }
  
  return records.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  })
}

export default function InstructionUsagePanel({ instruction, onClose }: InstructionUsagePanelProps) {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('30')
  
  // Calculate percentage (mock calculation - in real app would come from API)
  // Assuming total estimates/proposals created
  const totalDocuments = 200 // Mock total
  const percentage = totalDocuments > 0 ? Math.round((instruction.appliedCount / totalDocuments) * 100) : 0
  
  // Generate records based on appliedCount
  const records = generateUsageRecords(instruction.appliedCount)
  
  // Calculate last used date
  const lastUsedDate = records.length > 0 && records[0].applied 
    ? records[0].date 
    : records.find(r => r.applied)?.date || 'Never'

  const getPeriodLabel = (period: TimePeriod): string => {
    switch (period) {
      case '30': return 'Last 30 days'
      case '60': return 'Last 60 days'
      case '90': return 'Last 90 days'
      case 'all': return 'All time'
      default: return 'Last 30 days'
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{instruction.title}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          {/* Summary Section */}
          <div className={styles.summarySection}>
            <h3 className={styles.sectionTitle}>Summary</h3>
            <div className={styles.totalizeSection}>
              <div className={styles.totalizeCard}>
                <div className={styles.totalizeNumber}>{instruction.appliedCount}</div>
                <div className={styles.totalizeLabel}>Applied {instruction.appliedCount === 1 ? 'time' : 'times'}</div>
              </div>
              <div className={styles.totalizeCard}>
                <div className={styles.totalizeNumber}>{lastUsedDate}</div>
                <div className={styles.totalizeLabel}>Last used date</div>
              </div>
            </div>
          </div>

          {/* History + Debug Section */}
          <div className={styles.historySection}>
            <h3 className={styles.sectionTitle}>History + Debug</h3>

          <div className={styles.periodSelector}>
            <button
              className={`${styles.periodButton} ${timePeriod === '30' ? styles.periodButtonActive : ''}`}
              onClick={() => setTimePeriod('30')}
            >
              Last 30 days
            </button>
            <button
              className={`${styles.periodButton} ${timePeriod === '60' ? styles.periodButtonActive : ''}`}
              onClick={() => setTimePeriod('60')}
            >
              Last 60 days
            </button>
            <button
              className={`${styles.periodButton} ${timePeriod === '90' ? styles.periodButtonActive : ''}`}
              onClick={() => setTimePeriod('90')}
            >
              Last 90 days
            </button>
            <button
              className={`${styles.periodButton} ${timePeriod === 'all' ? styles.periodButtonActive : ''}`}
              onClick={() => setTimePeriod('all')}
            >
              All time
            </button>
          </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Last estimates</th>
                  <th>Date</th>
                  <th>Applied or skipped</th>
                  <th>Why</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {records.length > 0 ? (
                  records.map((record) => (
                    <tr key={record.id}>
                      <td>{record.estimateName}</td>
                      <td>{record.date}</td>
                      <td>
                        <span className={record.applied ? styles.appliedStatus : styles.skippedStatus}>
                          {record.applied ? '✓ Applied' : '✗ Skipped'}
                        </span>
                      </td>
                      <td>
                        {record.applied ? (
                          <span style={{ color: '#666' }}>Successfully applied</span>
                        ) : (
                          <span style={{ color: '#c62828' }}>{record.skippedReason}</span>
                        )}
                      </td>
                      <td>
                        <a href={record.link} className={styles.linkButton} target="_blank" rel="noopener noreferrer">
                          ↗
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', color: '#666', padding: '24px' }}>
                      No usage records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

