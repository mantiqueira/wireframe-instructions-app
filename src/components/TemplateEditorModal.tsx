import { useState, useRef, useEffect } from 'react'
import { useClientMessageTemplates } from '../context/ClientMessageTemplatesContext'
import InstructionToolbar from './InstructionToolbar'
import { useAutoResizeTextarea } from '../hooks/useAutoResizeTextarea'
import styles from './TemplateEditorModal.module.css'

interface TemplateEditorModalProps {
  templateId: string | null
  onClose: () => void
}

const DEFAULT_PROMPT = `Write a friendly and excited message to the client using this structure:

Hi [client name]! 🎉

I'm excited to share the [document type] for the [project type] at [project location].

[One short sentence about why this update is exciting, using: [extra context]].

Take a look at the details below. Let me know if you want to chat or have any questions.`

export default function TemplateEditorModal({ templateId, onClose }: TemplateEditorModalProps) {
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
      // Set default prompt for new templates
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
