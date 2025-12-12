import { useState, useRef, useEffect } from 'react'
import { useAIDocsTemplates } from '../context/AIDocsTemplatesContext'
import InstructionToolbar from './InstructionToolbar'
import { useAutoResizeTextarea } from '../hooks/useAutoResizeTextarea'
import styles from './TemplateEditorModal.module.css'

interface AIDocsTemplateEditorModalProps {
  templateId: string | null
  onClose: () => void
}

const DEFAULT_PROMPT = `Create a comprehensive scope of work document using this structure:

SCOPE OF WORK

[Project Title]

Project Location: [Location]
Client: [Client Name]
Date: [Date]
Project Value: [Value]

PROJECT OVERVIEW

[Project overview description]

SPECIFIC TASKS AND DELIVERABLES

[Detailed tasks and phases organized by project phases]`

export default function AIDocsTemplateEditorModal({ templateId, onClose }: AIDocsTemplateEditorModalProps) {
  const { templates, addTemplate, updateTemplate } = useAIDocsTemplates()
  const isEditing = templateId && templateId !== 'new'
  const existingTemplate = isEditing ? templates.find((t) => t.id === templateId) : null

  const [title, setTitle] = useState('')
  const [prompt, setPrompt] = useState('')
  const [history, setHistory] = useState<string[]>([''])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [isTesting, setIsTesting] = useState(false)
  const [previewContent, setPreviewContent] = useState<string | null>(null)

  const promptRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea based on content
  useAutoResizeTextarea(promptRef, prompt)

  useEffect(() => {
    if (existingTemplate) {
      setTitle(existingTemplate.title)
      setPrompt(existingTemplate.instructions || existingTemplate.body)
      setHistory([existingTemplate.instructions || existingTemplate.body])
      setHistoryIndex(0)
    } else if (templateId === 'new') {
      setPrompt(DEFAULT_PROMPT)
      setHistory([DEFAULT_PROMPT])
      setHistoryIndex(0)
    }
  }, [existingTemplate, templateId])

  const addToHistory = (text: string) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(text)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const handlePromptChange = (value: string) => {
    setPrompt(value)
    if (historyIndex === history.length - 1) {
      addToHistory(value)
    } else {
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push(value)
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setPrompt(history[newIndex])
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setPrompt(history[newIndex])
    }
  }

  const handleTest = () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt to test')
      return
    }

    setIsTesting(true)
    setPreviewContent(null)

    setTimeout(() => {
      const sampleData = {
        projectTitle: '3x5 Bathroom Remodel - Standard Finishes',
        location: 'Miranda, CA, USA',
        clientName: 'Fernando',
        date: 'December 11, 2024',
        value: '$25,457.35'
      }

      let generatedDocument = prompt
      
      if (generatedDocument.includes('Create a comprehensive scope of work') && generatedDocument.includes('[Project Title]')) {
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
        generatedDocument = generatedDocument.replace(/\[Project Title\]/g, sampleData.projectTitle)
        generatedDocument = generatedDocument.replace(/\[Location\]/g, sampleData.location)
        generatedDocument = generatedDocument.replace(/\[Client Name\]/g, sampleData.clientName)
        generatedDocument = generatedDocument.replace(/\[Date\]/g, sampleData.date)
        generatedDocument = generatedDocument.replace(/\[Value\]/g, sampleData.value)
      }

      setPreviewContent(generatedDocument)
      setIsTesting(false)
    }, 1500)
  }

  const handleSave = () => {
    if (!title.trim() || !prompt.trim()) {
      alert('Please fill in both title and prompt')
      return
    }

    if (isEditing && templateId) {
      updateTemplate(templateId, {
        title: title.trim(),
        body: '',
        instructions: prompt.trim(),
        enabled: true
      })
    } else {
      addTemplate({
        title: title.trim(),
        body: '',
        instructions: prompt.trim(),
        enabled: true
      })
    }
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isEditing ? 'Edit template' : 'New template'}
          </h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.leftPanel}>
              <div className={styles.form}>
                <div className={styles.formField}>
                  <label className={styles.label}>Template title</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter template title"
                  />
                </div>

                <div className={styles.formField}>
                  <label className={styles.label}>Prompt</label>
                  <div className={styles.instructionCard}>
                    <InstructionToolbar
                      onUndo={handleUndo}
                      onRedo={handleRedo}
                      canUndo={historyIndex > 0}
                      canRedo={historyIndex < history.length - 1}
                      onTranscribe={() => {}}
                      onOptimize={() => {}}
                    />
                    <textarea
                      ref={promptRef}
                      className={styles.textarea}
                      value={prompt}
                      onChange={(e) => handlePromptChange(e.target.value)}
                      placeholder="Create a comprehensive scope of work document using this structure:"
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button className={styles.secondaryButton} onClick={onClose}>
                    Cancel
                  </button>
                  <button 
                    className={styles.secondaryButton} 
                    onClick={handleTest}
                    disabled={isTesting}
                  >
                    {isTesting ? 'Testing...' : 'Test template'}
                  </button>
                  <button className={styles.primaryButton} onClick={handleSave}>
                    Save
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.rightPanel}>
              <div className={styles.previewLabel}>Preview</div>
              <div className={`${styles.previewContent} ${!previewContent && !isTesting ? styles.previewContentCentered : ''}`}>
                {isTesting ? (
                  <div className={styles.loadingState}>
                    <div className={styles.loadingText}>Generating preview...</div>
                    <div className={styles.shimmer}></div>
                  </div>
                ) : previewContent ? (
                  <div className={styles.previewMessage}>
                    {previewContent.split('\n').map((line, index) => (
                      <div key={index}>{line || '\u00A0'}</div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.placeholder}>
                    See your template in action
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

