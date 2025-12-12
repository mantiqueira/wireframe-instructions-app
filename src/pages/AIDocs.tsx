import { useState, useRef } from 'react'
import { useAIDocsTemplates } from '../context/AIDocsTemplatesContext'
import TemplateDropdown from '../components/TemplateDropdown'
import MessageLoadingState from '../components/MessageLoadingState'
import AIDocsTemplateEditorModal from '../components/AIDocsTemplateEditorModal'
import { useAutoResizeTextarea } from '../hooks/useAutoResizeTextarea'
import styles from './AIDocs.module.css'

export default function AIDocs() {
  const { templates, duplicateTemplate, deleteTemplate } = useAIDocsTemplates()
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)
  const [document, setDocument] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null)
  const documentTextareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea based on content
  useAutoResizeTextarea(documentTextareaRef, document)

  const handleSelectTemplate = (template: any) => {
    setSelectedTemplateId(template.id)
    setIsLoading(true)
    // Simulate AI document generation
    setTimeout(() => {
      const sampleData = {
        projectTitle: '3x5 Bathroom Remodel - Standard Finishes',
        location: 'Miranda, CA, USA',
        clientName: 'Fernando',
        date: 'December 11, 2024',
        value: '$25,457.35'
      }

      let generatedDocument = template.body || template.instructions
      
      // If it's a scope of work template, generate a complete document
      if (generatedDocument.includes('SCOPE OF WORK') || generatedDocument.includes('[Project Title]')) {
        generatedDocument = `SCOPE OF WORK

${sampleData.projectTitle}

Project Location: ${sampleData.location}
Client: ${sampleData.clientName}
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
        // Replace placeholders with actual values
        generatedDocument = generatedDocument.replace(/\[Project Title\]/g, sampleData.projectTitle)
        generatedDocument = generatedDocument.replace(/\[Location\]/g, sampleData.location)
        generatedDocument = generatedDocument.replace(/\[Client Name\]/g, sampleData.clientName)
        generatedDocument = generatedDocument.replace(/\[Date\]/g, sampleData.date)
        generatedDocument = generatedDocument.replace(/\[Value\]/g, sampleData.value)
      }
      
      // Simulate AI enhancement based on instructions
      // In a real app, this would call an AI service
      setDocument(generatedDocument)
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
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <button className={styles.toolbarButton}>←</button>
        </div>
        <div className={styles.toolbarCenter}>
          <button className={styles.toolbarButton}>
            <span>🎤</span> Voice to text
          </button>
          <div className={styles.formattingButtons}>
            <button className={styles.formatButton}>B</button>
            <button className={styles.formatButton}>I</button>
            <button className={styles.formatButton}>U</button>
            <button className={styles.formatButton}>🔗</button>
            <button className={styles.formatButton}>⛓</button>
          </div>
          <button className={styles.toolbarButton}>
            Text ▼
          </button>
        </div>
        <div className={styles.toolbarRight}>
          <button className={styles.toolbarButton}>↗</button>
          <button className={styles.toolbarButton}>⋯</button>
          <div className={styles.templateSelector}>
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
          <button className={styles.convertButton}>
            Convert to ▼
          </button>
        </div>
      </div>

      <div className={styles.documentContainer}>
        <button className={styles.addHeaderButton}>
          <span>📷</span> Add company header
        </button>
        
        <div className={styles.documentContent}>
          {isLoading ? (
            <MessageLoadingState />
          ) : (
            <textarea
              ref={documentTextareaRef}
              className={styles.documentTextarea}
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              placeholder="SCOPE OF WORK

3x5 Bathroom Remodel - Standard Finishes

Project Location: Miranda, CA, USA
Client: Fernando
Date: December 11, 2024
Project Value: $25,457.35

PROJECT OVERVIEW

This scope of work outlines the complete renovation of a 3x5 bathroom featuring standard-grade finishes and fixtures..."
            />
          )}
        </div>
      </div>

      {editingTemplateId && (
        <AIDocsTemplateEditorModal
          templateId={editingTemplateId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

