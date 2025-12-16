import { useState, useRef, useEffect } from 'react'
import { useClientMessageTemplates } from '../context/ClientMessageTemplatesContext'
import { ClientMessageTemplate } from '../types'
import InstructionToolbar from './InstructionToolbar'
import { useAutoResizeTextarea } from '../hooks/useAutoResizeTextarea'
import styles from './TemplateEditorModal.module.css'

interface TemplateEditorModalProps {
  templateId: string | null
  onClose: () => void
  initialTemplate?: Omit<ClientMessageTemplate, 'id'>
}

const DEFAULT_PROMPT = `Write a friendly and excited message to the client about getting their proposal/estimate approved using this structure:

Hi [client name]! 🎉

I'm excited to share the proposal for your [project type] at [project location].

This project is going to transform your space with [extra context], and I can't wait to get started.

Please review the estimate below and let me know if you'd like to approve and move forward. I'm here to answer any questions you might have!`

export default function TemplateEditorModal({ templateId, onClose, initialTemplate }: TemplateEditorModalProps) {
  const { templates, addTemplate, updateTemplate } = useClientMessageTemplates()
  const isEditing = templateId && templateId !== 'new'
  const existingTemplate = isEditing ? templates.find((t) => t.id === templateId) : null

  const [title, setTitle] = useState('')
  const [prompt, setPrompt] = useState('')
  const [history, setHistory] = useState<string[]>([''])
  const [historyIndex, setHistoryIndex] = useState(0)

  const promptRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea based on content
  useAutoResizeTextarea(promptRef, prompt)

  useEffect(() => {
    if (existingTemplate) {
      setTitle(existingTemplate.title)
      // Use instructions as the prompt, or combine with body if needed
      setPrompt(existingTemplate.instructions || existingTemplate.body)
      setHistory([existingTemplate.instructions || existingTemplate.body])
      setHistoryIndex(0)
    } else if (templateId === 'new') {
      // If initialTemplate is provided, use it; otherwise use default
      if (initialTemplate) {
        setTitle(initialTemplate.title)
        setPrompt(initialTemplate.instructions || initialTemplate.body)
        setHistory([initialTemplate.instructions || initialTemplate.body])
        setHistoryIndex(0)
      } else {
        // Set default prompt for new templates
        setPrompt(DEFAULT_PROMPT)
        setHistory([DEFAULT_PROMPT])
        setHistoryIndex(0)
      }
    }
  }, [existingTemplate, templateId, initialTemplate])

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

  const handleSave = () => {
    if (!title.trim() || !prompt.trim()) {
      alert('Please fill in both title and prompt')
      return
    }

    if (isEditing && templateId) {
      updateTemplate(templateId, {
        title: title.trim(),
        body: '', // Keep body empty or use prompt as body
        instructions: prompt.trim(),
        enabled: true // Always enabled
      })
    } else {
      addTemplate({
        title: title.trim(),
        body: '', // Keep body empty or use prompt as body
        instructions: prompt.trim(),
        enabled: true // Always enabled
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
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
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
                      placeholder="Write a friendly and excited message to the client using this structure:"
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button className={styles.secondaryButton} onClick={onClose}>
                    Cancel
                  </button>
                  <button className={styles.primaryButton} onClick={handleSave}>
                    Save
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.rightPanel}>
              <div className={styles.previewLabel}>Preview</div>
              <div className={styles.previewContent}>
                <div className={styles.placeholder}>
                  See your template in action
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
