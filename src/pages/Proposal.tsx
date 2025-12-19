import { useState, useRef } from 'react'
import { useClientMessageTemplates } from '../context/ClientMessageTemplatesContext'
import TemplateDropdown from '../components/TemplateDropdown'
import MessageLoadingState from '../components/MessageLoadingState'
import TemplateEditorModal from '../components/TemplateEditorModal'
import { useAutoResizeTextarea } from '../hooks/useAutoResizeTextarea'
import styles from './Proposal.module.css'

export default function Proposal() {
  const { templates, duplicateTemplate, deleteTemplate } = useClientMessageTemplates()
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)
  const [message, setMessage] = useState('We are delighted to work with you on turning your project dreams into reality. Our goal is to make this process as smooth and transparent as possible for you. Our estimate includes comprehensive demolition, drywall installation, electrical work, fixture installation, painting, plumbing, and tile work. Please take your time to review the estimate and let us know if you have any questions or need further clarification. Our goal is to ensure that you feel confident and comfortable with every aspect of the project. We value your trust and are committed to delivering the highest quality of work. Looking forward to starting this exciting project together.')
  const [isLoading, setIsLoading] = useState(false)
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null)
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
    setEditingTemplateId('new')
  }

  const handleCloseModal = () => {
    setEditingTemplateId(null)
  }

  const handleEditTemplate = (id: string) => {
    setEditingTemplateId(id)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.backArrow}>←</span>
          <span className={styles.projectTitle}>EST-10027 3x5 Bathroom Remodel - Standard Finishes</span>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.viewTabs}>
            <button className={styles.tab}>Estimate</button>
            <button className={`${styles.tab} ${styles.tabActive}`}>Client view</button>
          </div>
          <button className={styles.iconButton}>↻</button>
          <button className={styles.iconButton}>⋯</button>
          <button className={styles.iconButton}>🖨</button>
          <button className={styles.doneButton}>Preview & send</button>
        </div>
      </div>

      <div className={styles.document}>
        <div className={styles.companyInfo}>
          <div className={styles.companyHeader}>
            <div className={styles.companyLogo}>SUMMIT</div>
          </div>
          <div className={styles.companyRight}>
            <div>
              <div className={styles.companyName}>Summit Construction Group</div>
              <div className={styles.companyDetails}>
                <div>fernando@handoff.ai</div>
                <div>(786) 469-5675</div>
              </div>
            </div>
            <button className={styles.menuButton}>⋯</button>
          </div>
        </div>

        <div className={styles.changeOrderInfo}>
          <div className={styles.changeOrderRef}>EST-10027</div>
          <h1 className={styles.changeOrderTitle}>3x5 Bathroom Remodel - Standard Finishes</h1>
          <div className={styles.changeOrderDate}>Sent on Dec 12, 2025</div>
          <button className={styles.addClientButton}>Add client</button>
        </div>

        <div className={styles.clientMessageSection}>
          <div className={styles.clientMessageHeader}>
            <h2 className={styles.sectionTitle}>Client message</h2>
            <button className={styles.menuButton}>⋯</button>
          </div>
          <div className={styles.messageContainer}>
            <div className={styles.messageHeader}>
              <span className={styles.messageLabel}>Client message (AI gen)</span>
              <div className={styles.templateDropdownWrapper}>
                <TemplateDropdown
                  templates={templates}
                  selectedTemplateId={selectedTemplateId}
                  onSelectTemplate={handleSelectTemplate}
                  onNewTemplate={handleNewTemplate}
                  onEdit={handleEditTemplate}
                  onDuplicate={duplicateTemplate}
                  onDelete={deleteTemplate}
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
            <button className={styles.bulletedButton}>Lump Sum</button>
          </div>
          <div className={styles.phase}>
            <div className={styles.phaseHeader}>
              <span className={styles.phaseTitle}>PHASE 1: PREP - Demolition</span>
              <span className={styles.phaseTotal}>$2,165.48</span>
            </div>
            <div className={styles.phaseItem}>
              <ul className={styles.itemList}>
                <li>Remove existing electrical fixtures, outlets, switches, and light fixtures</li>
                <li>Demo and remove all bathroom tile including floor and wall tile</li>
                <li>Remove shower components including surround and pan</li>
                <li>Remove existing vanity, sink, and plumbing fixtures</li>
              </ul>
            </div>
          </div>
          <div className={styles.phase}>
            <div className={styles.phaseHeader}>
              <span className={styles.phaseTitle}>PHASE 1: PREP - Rough Plumbing</span>
              <span className={styles.phaseTotal}>$4,834.71</span>
            </div>
            <div className={styles.phaseItem}>
              <ul className={styles.itemList}>
                <li>Install plumbing infrastructure including supply lines and drain pipes</li>
                <li>Set up shower and toilet rough-in connections</li>
                <li>Add roof flashing and insulate pipes as needed</li>
              </ul>
            </div>
          </div>
          <div className={styles.phase}>
            <div className={styles.phaseHeader}>
              <span className={styles.phaseTitle}>PHASE 1: PREP - Rough Electrical</span>
              <span className={styles.phaseTotal}>$3,870.19</span>
            </div>
            <div className={styles.phaseItem}>
              <ul className={styles.itemList}>
                <li>Install electrical wiring for outlets, switches, and lighting</li>
                <li>Set up recessed lighting infrastructure</li>
                <li>Establish waterproof electrical connections for bathroom fixtures</li>
              </ul>
            </div>
          </div>
          <div className={styles.phase}>
            <div className={styles.phaseHeader}>
              <span className={styles.phaseTitle}>PHASE 2: MID PROJECT - Drywall</span>
              <span className={styles.phaseTotal}>$1,852.13</span>
            </div>
            <div className={styles.phaseItem}>
              <ul className={styles.itemList}>
                <li>Install drywall sheets on walls and ceiling</li>
                <li>Apply tape and joint compound for seamless finish</li>
                <li>Complete drywall finishing and sanding</li>
              </ul>
            </div>
          </div>
          <div className={styles.phase}>
            <div className={styles.phaseHeader}>
              <span className={styles.phaseTitle}>PHASE 2: MID PROJECT - Tile Work</span>
              <span className={styles.phaseTotal}>$5,534.49</span>
            </div>
            <div className={styles.phaseItem}>
              <ul className={styles.itemList}>
                <li>Install tile work for shower walls, floor, bathroom walls, and floor areas</li>
                <li>Install cement backer board as substrate for all tile work</li>
                <li>Create shower curb, install marble thresholds</li>
                <li>Apply thinset mortar, grout, and edge trim</li>
              </ul>
            </div>
          </div>
          <div className={styles.phase}>
            <div className={styles.phaseHeader}>
              <span className={styles.phaseTitle}>PHASE 3: FINISHES - Fixtures</span>
              <span className={styles.phaseTotal}>$5,280.20</span>
            </div>
            <div className={styles.phaseItem}>
              <ul className={styles.itemList}>
                <li>Install vanity cabinet with sink, faucet, and mirror</li>
                <li>Install toilet and shower fixtures including head, valve trim, and door</li>
                <li>Install recessed and standard lighting, outlets, and switches</li>
              </ul>
            </div>
          </div>
          <div className={styles.phase}>
            <div className={styles.phaseHeader}>
              <span className={styles.phaseTitle}>PHASE 3: FINISHES - Paint</span>
              <span className={styles.phaseTotal}>$1,332.53</span>
            </div>
            <div className={styles.phaseItem}>
              <ul className={styles.itemList}>
                <li>Apply primer and paint to walls and ceiling</li>
                <li>Labor and supplies for painting work</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.summarySection}>
          <div className={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>$ 24,869.76</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Material tax:</span>
            <span>$ 587.59</span>
          </div>
          <div className={styles.summaryRowTotal}>
            <span>Total:</span>
            <span>$ 25,457.35</span>
          </div>
          <div className={styles.financingOption}>
            <label className={styles.financingToggle}>
              <input type="checkbox" defaultChecked className={styles.toggleInput} />
              <span className={styles.toggleSlider}></span>
              <span>Offer financing</span>
            </label>
            <span className={styles.financingInfo}>ℹ️</span>
            <span className={styles.financingLink}>from $252/month Learn more</span>
          </div>
        </div>

        <div className={styles.footerSection}>
          <div className={styles.footerLabel}>FOOTER</div>
          <div className={styles.footerButtons}>
            <button className={styles.footerButton}>
              <span>💰</span>
              <span>Set up payments</span>
            </button>
            <button className={styles.footerButton}>
              <span>📎</span>
              <span>Attach file</span>
            </button>
            <button className={styles.footerButton}>
              <span>📄</span>
              <span>Add terms & conditions</span>
            </button>
            <button className={styles.footerButton}>
              <span>✍️</span>
              <span>Require signature</span>
            </button>
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
