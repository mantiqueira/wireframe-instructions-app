import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClientMessageTemplates } from '../context/ClientMessageTemplatesContext'
import TemplateDropdown from '../components/TemplateDropdown'
import MessageLoadingState from '../components/MessageLoadingState'
import TemplateEditorModal from '../components/TemplateEditorModal'
import ExamplesModal from '../components/ExamplesModal'
import { exampleClientMessageTemplates } from '../data/exampleClientMessageTemplates'
import { useAutoResizeTextarea } from '../hooks/useAutoResizeTextarea'
import styles from './ClientMessageTemplates.module.css'

export default function ClientMessageTemplates() {
  const navigate = useNavigate()
  const { templates, duplicateTemplate, deleteTemplate } = useClientMessageTemplates()
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)
  const [message, setMessage] = useState('Thank you for considering our services. We are excited about the opportunity to work with you on this project. Please review the estimate below and let us know if you have any questions or would like to discuss any details.')
  const [isLoading, setIsLoading] = useState(false)
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null)
  const [showExamplesModal, setShowExamplesModal] = useState(false)
  const [initialTemplate, setInitialTemplate] = useState<any>(null)
  const messageTextareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea based on content
  useAutoResizeTextarea(messageTextareaRef, message)

  const handleSelectTemplate = (template: any) => {
    setSelectedTemplateId(template.id)
    setIsLoading(true)
    // Simulate AI rewriting with placeholder replacement
    setTimeout(() => {
      let processedMessage = template.body
      
      // Replace placeholders with actual values
      processedMessage = processedMessage.replace(/\[client name\]/g, 'Adam Appleseed')
      processedMessage = processedMessage.replace(/\[brief description of the project\]/g, 'the bathroom remodel at 452 Maple St')
      
      // Simulate AI enhancement based on instructions
      // In a real app, this would call an AI service
      setMessage(processedMessage)
      setIsLoading(false)
    }, 2500)
  }

  const handleNewTemplate = () => {
    setInitialTemplate(null)
    setEditingTemplateId('new')
  }

  const handleEditTemplate = (id: string) => {
    setEditingTemplateId(id)
  }

  const handleUseExample = (example: any) => {
    setInitialTemplate(example)
    setEditingTemplateId('new')
    setShowExamplesModal(false)
  }

  const handleCloseModal = () => {
    setEditingTemplateId(null)
    setInitialTemplate(null)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backButton} onClick={() => navigate('/settings')}>
            ← Back
          </button>
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
          </div>
          <div className={styles.companyRight}>
            <div>
              <div className={styles.companyName}>Acme Construction</div>
              <div className={styles.companyDetails}>
                <div>hello@acmeconstruction.com</div>
                <div>(748) 490-9922</div>
                <div>Licence #438F829</div>
              </div>
            </div>
            <button className={styles.menuButton}>⋯</button>
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
          <div className={styles.messageContainer}>
            <div className={styles.messageHeader}>
              <span className={styles.messageLabel}>Client message</span>
              <div className={styles.templateDropdownWrapper}>
                <TemplateDropdown
                  templates={templates}
                  selectedTemplateId={selectedTemplateId}
                  onSelectTemplate={handleSelectTemplate}
                  onNewTemplate={handleNewTemplate}
                  onEdit={handleEditTemplate}
                  onDuplicate={duplicateTemplate}
                  onDelete={deleteTemplate}
                  onSeeExamples={() => setShowExamplesModal(true)}
                />
              </div>
            </div>
            {isLoading ? (
              <MessageLoadingState />
            ) : (
              <textarea
                ref={messageTextareaRef}
                className={styles.messageTextarea}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder=""
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
              <ul className={styles.itemList}>
                <li>Install ceramic wall tile and porcelain floor tile throughout the space</li>
                <li>Create custom shower with large format wall tile, mosaic floor tile, marble threshold, and foam core curb</li>
                <li>Install cement backer board as substrate for all tile work</li>
              </ul>
            </div>
          </div>
          <div className={styles.phase}>
            <div className={styles.phaseHeader}>
              <span className={styles.phaseTitle}>Phase 2</span>
              <span className={styles.phaseTotal}>$4,480.00</span>
            </div>
            <div className={styles.phaseItem}>
              <div className={styles.itemHeader}>
                <span className={styles.itemName}>Plumbing</span>
                <span className={styles.itemSubtotal}>$480.00</span>
                <button className={styles.menuButton}>⋯</button>
              </div>
              <ul className={styles.itemList}>
                <li>Remove existing bathroom fixtures and finishes</li>
                <li>Demolish shower, vanity, lighting, and flooring</li>
                <li>Protect work area and dispose of debris</li>
              </ul>
            </div>
            <div className={styles.phaseItem}>
              <div className={styles.itemHeader}>
                <span className={styles.itemName}>Demolition</span>
                <span className={styles.itemSubtotal}>$480.00</span>
                <button className={styles.menuButton}>⋯</button>
              </div>
              <ul className={styles.itemList}>
                <li>Remove existing bathroom fixtures and finishes</li>
                <li>Demolish shower, vanity, lighting, and flooring</li>
                <li>Protect work area and dispose of debris</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.summarySection}>
          <div className={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>$ 55,662.14</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Discount 5.5%:</span>
            <span>- $ 5,240.00</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Tax 4.2%:</span>
            <span>$ 1,047.37</span>
          </div>
          <div className={styles.summaryRowTotal}>
            <span>Total:</span>
            <span>$50,662.14</span>
          </div>
          <div className={styles.financingOption}>
            <label className={styles.financingToggle}>
              <input type="checkbox" defaultChecked className={styles.toggleInput} />
              <span className={styles.toggleSlider}></span>
              <span>Offer financing</span>
            </label>
            <span className={styles.financingInfo}>ℹ️</span>
            <span className={styles.financingLink}>from $377/month Learn more</span>
          </div>
        </div>

        <div className={styles.footerSection}>
          <div className={styles.footerLabel}>FOOTER</div>
          <div className={styles.footerButtons}>
            <button className={styles.footerButton}>
              <span>💰</span>
              <span>Payment schedule</span>
            </button>
            <button className={styles.footerButton}>
              <span>✍️</span>
              <span>Request signature</span>
            </button>
            <button className={styles.footerButton}>
              <span>📄</span>
              <span>Add terms & conditions</span>
            </button>
            <button className={styles.footerButton}>
              <span>📎</span>
              <span>Attach files</span>
            </button>
          </div>
        </div>
      </div>

      {editingTemplateId && (
        <TemplateEditorModal
          templateId={editingTemplateId}
          onClose={handleCloseModal}
          initialTemplate={initialTemplate || undefined}
        />
      )}

      {showExamplesModal && (
        <ExamplesModal
          examples={exampleClientMessageTemplates}
          onUseTemplate={handleUseExample}
          onClose={() => setShowExamplesModal(false)}
          type="client-message"
        />
      )}
    </div>
  )
}
