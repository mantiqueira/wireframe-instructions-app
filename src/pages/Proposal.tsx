import { useState } from 'react'
import { useClientMessageTemplates } from '../context/ClientMessageTemplatesContext'
import TemplateDropdown from '../components/TemplateDropdown'
import MessageLoadingState from '../components/MessageLoadingState'
import TemplateEditorModal from '../components/TemplateEditorModal'
import styles from './Proposal.module.css'

export default function Proposal() {
  const { templates, duplicateTemplate, deleteTemplate } = useClientMessageTemplates()
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null)

  const handleSelectTemplate = (template: any) => {
    setSelectedTemplateId(template.id)
    setIsLoading(true)
    // Simulate AI rewriting
    setTimeout(() => {
      setMessage(template.body)
      setIsLoading(false)
    }, 2500)
  }

  const handleNewTemplate = () => {
    setEditingTemplateId('new')
  }

  const handleCloseModal = () => {
    setEditingTemplateId(null)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.backArrow}>←</span>
          <span className={styles.projectTitle}>EST-10200 Bathroom Remodel - Smith's House</span>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.viewTabs}>
            <button className={styles.tab}>Estimate</button>
            <button className={`${styles.tab} ${styles.tabActive}`}>Client view</button>
          </div>
          <button className={styles.iconButton}>↻</button>
          <button className={styles.iconButton}>⋯</button>
          <button className={styles.iconButton}>🖨</button>
          <button className={styles.doneButton}>✓ Done</button>
        </div>
      </div>

      <div className={styles.document}>
        <div className={styles.companyInfo}>
          <div className={styles.companyHeader}>
            <div className={styles.companyLogo}>ACME</div>
            <button className={styles.menuButton}>⋯</button>
          </div>
          <div className={styles.companyName}>Acme Construction</div>
          <div className={styles.companyDetails}>
            <div>hello@acmeconstruction.com</div>
            <div>(748) 490-9922</div>
            <div>Licence #438F829</div>
          </div>
        </div>

        <div className={styles.changeOrderInfo}>
          <div className={styles.changeOrderRef}>CO-10034-1</div>
          <h1 className={styles.changeOrderTitle}>Change order: Upgrade to Hardwood Flooring</h1>
          <div className={styles.changeOrderSubtitle}>From 452 Maple St Bathroom remodel</div>
          <div className={styles.changeOrderDate}>May 4, 2025</div>
        </div>

        <div className={styles.preparedFor}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Prepared for</h2>
            <button className={styles.menuButton}>⋯</button>
          </div>
          <div className={styles.clientInfo}>
            <div className={styles.clientName}>Adam Appleseed</div>
            <div>aappleseed@email.com</div>
            <div>(748) 710-0964</div>
            <div>136 Main Street, San Francisco, CA</div>
          </div>
        </div>

        <div className={styles.clientMessageSection}>
          <div className={styles.clientMessageHeader}>
            <h2 className={styles.sectionTitle}>Client message</h2>
            <button className={styles.menuButton}>⋯</button>
          </div>
          <div className={styles.templateDropdownContainer}>
            <TemplateDropdown
              templates={templates}
              selectedTemplateId={selectedTemplateId}
              onSelectTemplate={handleSelectTemplate}
              onNewTemplate={handleNewTemplate}
              onDuplicate={duplicateTemplate}
              onDelete={deleteTemplate}
            />
          </div>
          <div className={styles.messageContainer}>
            {isLoading ? (
              <MessageLoadingState />
            ) : (
              <textarea
                className={styles.messageTextarea}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Client message (AI gen)"
                rows={8}
              />
            )}
          </div>
        </div>

        <div className={styles.estimateSection}>
          <div className={styles.estimateHeader}>
            <h2 className={styles.sectionTitle}>ESTIMATE</h2>
            <button className={styles.bulletedButton}>Bulleted</button>
          </div>
          <div className={styles.phase}>
            <div className={styles.phaseHeader}>
              <span className={styles.phaseTitle}>Phase 1</span>
              <span className={styles.phaseTotal}>$2,480.00</span>
            </div>
            <div className={styles.phaseItem}>
              <div className={styles.itemHeader}>
                <span className={styles.itemName}>Demolition</span>
                <span className={styles.itemSubtotal}>$2,165.48</span>
                <button className={styles.menuButton}>⋯</button>
              </div>
              <ul className={styles.itemList}>
                <li>Remove existing vanity, sink, and plumbing fixtures</li>
                <li>Demo and remove all floor and wall tile including shower surround and pan</li>
                <li>Remove electrical components including outlets, switches, and light fixtures</li>
              </ul>
            </div>
            <div className={styles.phaseItem}>
              <div className={styles.itemHeader}>
                <span className={styles.itemName}>Tile</span>
                <span className={styles.itemSubtotal}>$5,521.25</span>
                <button className={styles.menuButton}>⋯</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {editingTemplateId && (
        <TemplateEditorModal
          templateId={editingTemplateId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
