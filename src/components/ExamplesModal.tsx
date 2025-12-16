import { useState } from 'react'
import { ClientMessageTemplate, AIDocsTemplate } from '../types'
import styles from './ExamplesModal.module.css'

type ExampleTemplate = Omit<ClientMessageTemplate, 'id'> | Omit<AIDocsTemplate, 'id'>

interface ExamplesModalProps {
  examples: ExampleTemplate[]
  onUseTemplate: (template: ExampleTemplate) => void
  onClose: () => void
  type: 'client-message' | 'ai-docs'
}

export default function ExamplesModal({ examples, onUseTemplate, onClose, type }: ExamplesModalProps) {
  const [selectedExample, setSelectedExample] = useState<ExampleTemplate | null>(null)
  const [previewContent, setPreviewContent] = useState<string | null>(null)
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false)

  const handleSelectExample = (example: ExampleTemplate) => {
    setSelectedExample(example)
    setIsGeneratingPreview(true)
    setPreviewContent(null)

    // Simulate AI processing to generate preview
    setTimeout(() => {
      const sampleData = {
        clientName: 'Adam Appleseed',
        documentType: 'estimate',
        projectType: 'bathroom remodel',
        projectLocation: '452 Maple St',
        extraContext: 'the comprehensive scope of work including demolition, plumbing, electrical, drywall, tile work, fixtures, and painting',
        projectTitle: '3x5 Bathroom Remodel - Standard Finishes',
        location: 'Miranda, CA, USA',
        aiDocsClientName: 'Fernando',
        date: 'December 11, 2024',
        value: '$25,457.35'
      }

      let processedContent = example.body || example.instructions

      if (type === 'client-message') {
        // Process client message template
        if (processedContent.includes('Write a friendly and excited message') && processedContent.includes('[client name]')) {
          processedContent = `Hi ${sampleData.clientName}! 🎉

I'm excited to share the ${sampleData.documentType} for the ${sampleData.projectType} at ${sampleData.projectLocation}.

This project is going to transform your space with ${sampleData.extraContext}, and I can't wait to see it come together!

Take a look at the details below. Let me know if you want to chat or have any questions.`
        } else {
          processedContent = processedContent.replace(/\[client name\]/gi, sampleData.clientName)
          processedContent = processedContent.replace(/\[document type\]/gi, sampleData.documentType)
          processedContent = processedContent.replace(/\[project type\]/gi, sampleData.projectType)
          processedContent = processedContent.replace(/\[project location\]/gi, sampleData.projectLocation)
          processedContent = processedContent.replace(/\[extra context\]/gi, sampleData.extraContext)
        }
      } else {
        // Process AI docs template
        if (processedContent.includes('SCOPE OF WORK') || processedContent.includes('[Project Title]')) {
          processedContent = `SCOPE OF WORK

${sampleData.projectTitle}

Project Location: ${sampleData.location}
Client: ${sampleData.aiDocsClientName}
Date: ${sampleData.date}
Project Value: ${sampleData.value}

PROJECT OVERVIEW

This scope of work outlines the complete renovation of a 3x5 bathroom featuring standard-grade finishes and fixtures. The project involves full demolition of existing bathroom components followed by comprehensive reconstruction including new plumbing, electrical, tile work, fixtures, and finishes.

The renovation will transform the existing bathroom into a modern, functional space while maintaining cost-effective standard finishes suitable for the project budget and location requirements.

SPECIFIC TASKS AND DELIVERABLES

PHASE 1: PREPARATION WORK

Demolition Services
• Complete removal of existing vanity and bathroom sink
• Demolition of shower faucet, shower pan, and shower surround
• Removal of existing shower door and wall tile
• Demolition of floor tile and light fixtures
• Removal of electrical switches and outlets
• Proper disposal of all demolished materials

Rough Plumbing Installation
• Installation of 40 LF PEX piping (SharkBite brand)
• Installation of 25 LF PVC drain piping (Charlotte Pipe brand)
• Installation of pipe insulation (25 LF) and pipe supports
• Installation of shower valve and mixing valve
• Installation of shower drain assembly and toilet flange`
        } else {
          processedContent = processedContent.replace(/\[Project Title\]/g, sampleData.projectTitle)
          processedContent = processedContent.replace(/\[Location\]/g, sampleData.location)
          processedContent = processedContent.replace(/\[Client Name\]/g, sampleData.aiDocsClientName)
          processedContent = processedContent.replace(/\[Date\]/g, sampleData.date)
          processedContent = processedContent.replace(/\[Value\]/g, sampleData.value)
          processedContent = processedContent.replace(/\[PO Number\]/g, 'PO-2024-001')
          processedContent = processedContent.replace(/\[Project Name\]/g, sampleData.projectTitle)
          processedContent = processedContent.replace(/\[Vendor Name\]/g, 'ABC Supply Co.')
          processedContent = processedContent.replace(/\[Vendor Address\]/g, '123 Main St, City, State 12345')
          processedContent = processedContent.replace(/\[Contact Person\]/g, 'John Smith')
          processedContent = processedContent.replace(/\[Phone Number\]/g, '(555) 123-4567')
          processedContent = processedContent.replace(/\[WO Number\]/g, 'WO-2024-001')
          processedContent = processedContent.replace(/\[Project Location\]/g, sampleData.location)
          processedContent = processedContent.replace(/\[Team\/Contractor Name\]/g, 'Construction Team A')
          processedContent = processedContent.replace(/\[Supervisor Name\]/g, 'Mike Johnson')
          processedContent = processedContent.replace(/\[Priority Level\]/g, 'High')
          processedContent = processedContent.replace(/\[Name\]/g, 'Site Manager')
        }
      }

      setPreviewContent(processedContent)
      setIsGeneratingPreview(false)
    }, 1500)
  }

  const handleUseTemplate = () => {
    if (selectedExample) {
      onUseTemplate(selectedExample)
      onClose()
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>See examples</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.leftPanel}>
              <div className={styles.examplesList}>
                <h3 className={styles.sectionTitle}>Example templates</h3>
                <div className={styles.examples}>
                  {examples.map((example, index) => (
                    <button
                      key={index}
                      className={`${styles.exampleCard} ${selectedExample === example ? styles.exampleCardActive : ''}`}
                      onClick={() => handleSelectExample(example)}
                    >
                      <div className={styles.exampleTitle}>{example.title}</div>
                      <div className={styles.exampleDescription}>
                        {example.instructions.substring(0, 100)}...
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.rightPanel}>
              <div className={styles.previewLabel}>Preview</div>
              <div className={styles.previewContent}>
                {!selectedExample ? (
                  <div className={styles.placeholder}>
                    Select an example to see the preview
                  </div>
                ) : isGeneratingPreview ? (
                  <div className={styles.loadingState}>
                    <div className={styles.shimmer}></div>
                    <div className={styles.loadingText}>Generating preview...</div>
                  </div>
                ) : previewContent ? (
                  <div className={styles.previewMessage}>
                    {previewContent.split('\n').map((line, i) => (
                      <div key={i}>{line || '\u00A0'}</div>
                    ))}
                  </div>
                ) : null}
              </div>
              {selectedExample && (
                <div className={styles.previewActions}>
                  <button className={styles.useButton} onClick={handleUseTemplate}>
                    Use this template
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

