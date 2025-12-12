import { useState, useRef, useEffect } from 'react'
import { useClientMessageTemplates } from '../context/ClientMessageTemplatesContext'
import InstructionToolbar from './InstructionToolbar'
import styles from './TemplateEditorModal.module.css'

interface TemplateEditorModalProps {
  templateId: string | null
  onClose: () => void
}

export default function TemplateEditorModal({ templateId, onClose }: TemplateEditorModalProps) {
  const { templates, addTemplate, updateTemplate } = useClientMessageTemplates()
  const isEditing = templateId && templateId !== 'new'
  const existingTemplate = isEditing ? templates.find((t) => t.id === templateId) : null

  const [title, setTitle] = useState('')
  const [enabled, setEnabled] = useState(true)
  const [instructions, setInstructions] = useState('')
  const [body, setBody] = useState('')
  const [instructionsHistory, setInstructionsHistory] = useState<string[]>([''])
  const [instructionsHistoryIndex, setInstructionsHistoryIndex] = useState(0)
  const [bodyHistory, setBodyHistory] = useState<string[]>([''])
  const [bodyHistoryIndex, setBodyHistoryIndex] = useState(0)

  const instructionsRef = useRef<HTMLTextAreaElement>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (existingTemplate) {
      setTitle(existingTemplate.title)
      setEnabled(existingTemplate.enabled)
      setInstructions(existingTemplate.instructions)
      setBody(existingTemplate.body)
      setInstructionsHistory([existingTemplate.instructions])
      setBodyHistory([existingTemplate.body])
    }
  }, [existingTemplate])

  const addToHistory = (text: string, isBody: boolean) => {
    if (isBody) {
      const newHistory = bodyHistory.slice(0, bodyHistoryIndex + 1)
      newHistory.push(text)
      setBodyHistory(newHistory)
      setBodyHistoryIndex(newHistory.length - 1)
    } else {
      const newHistory = instructionsHistory.slice(0, instructionsHistoryIndex + 1)
      newHistory.push(text)
      setInstructionsHistory(newHistory)
      setInstructionsHistoryIndex(newHistory.length - 1)
    }
  }

  const handleInstructionsChange = (value: string) => {
    setInstructions(value)
    if (instructionsHistoryIndex === instructionsHistory.length - 1) {
      addToHistory(value, false)
    } else {
      const newHistory = instructionsHistory.slice(0, instructionsHistoryIndex + 1)
      newHistory.push(value)
      setInstructionsHistory(newHistory)
      setInstructionsHistoryIndex(newHistory.length - 1)
    }
  }

  const handleBodyChange = (value: string) => {
    setBody(value)
    if (bodyHistoryIndex === bodyHistory.length - 1) {
      addToHistory(value, true)
    } else {
      const newHistory = bodyHistory.slice(0, bodyHistoryIndex + 1)
      newHistory.push(value)
      setBodyHistory(newHistory)
      setBodyHistoryIndex(newHistory.length - 1)
    }
  }

  const handleUndo = (isBody: boolean) => {
    if (isBody) {
      if (bodyHistoryIndex > 0) {
        const newIndex = bodyHistoryIndex - 1
        setBodyHistoryIndex(newIndex)
        setBody(bodyHistory[newIndex])
      }
    } else {
      if (instructionsHistoryIndex > 0) {
        const newIndex = instructionsHistoryIndex - 1
        setInstructionsHistoryIndex(newIndex)
        setInstructions(instructionsHistory[newIndex])
      }
    }
  }

  const handleRedo = (isBody: boolean) => {
    if (isBody) {
      if (bodyHistoryIndex < bodyHistory.length - 1) {
        const newIndex = bodyHistoryIndex + 1
        setBodyHistoryIndex(newIndex)
        setBody(bodyHistory[newIndex])
      }
    } else {
      if (instructionsHistoryIndex < instructionsHistory.length - 1) {
        const newIndex = instructionsHistoryIndex + 1
        setInstructionsHistoryIndex(newIndex)
        setInstructions(instructionsHistory[newIndex])
      }
    }
  }

  const handleSave = () => {
    if (!title.trim() || !body.trim()) {
      alert('Please fill in both title and message body')
      return
    }

    if (isEditing && templateId) {
      updateTemplate(templateId, {
        title: title.trim(),
        body: body.trim(),
        instructions: instructions.trim(),
        enabled
      })
    } else {
      addTemplate({
        title: title.trim(),
        body: body.trim(),
        instructions: instructions.trim(),
        enabled
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
              <label className={styles.toggleLabel}>
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                  className={styles.toggleSwitch}
                />
                <span className={styles.switchSlider}></span>
                <span>Enable</span>
              </label>
            </div>

            <div className={styles.formField}>
              <label className={styles.label}>Instructions for AI</label>
              <div className={styles.instructionCard}>
                <InstructionToolbar
                  onUndo={() => handleUndo(false)}
                  onRedo={() => handleRedo(false)}
                  canUndo={instructionsHistoryIndex > 0}
                  canRedo={instructionsHistoryIndex < instructionsHistory.length - 1}
                  onTranscribe={() => {}}
                  onOptimize={() => {}}
                />
                <textarea
                  ref={instructionsRef}
                  className={styles.textarea}
                  value={instructions}
                  onChange={(e) => handleInstructionsChange(e.target.value)}
                  placeholder="Enter instructions for AI to follow when rewriting this template..."
                  rows={8}
                />
              </div>
            </div>

            <div className={styles.formField}>
              <label className={styles.label}>Message template</label>
              <div className={styles.instructionCard}>
                <InstructionToolbar
                  onUndo={() => handleUndo(true)}
                  onRedo={() => handleRedo(true)}
                  canUndo={bodyHistoryIndex > 0}
                  canRedo={bodyHistoryIndex < bodyHistory.length - 1}
                  onTranscribe={() => {}}
                  onOptimize={() => {}}
                />
                <textarea
                  ref={bodyRef}
                  className={styles.textarea}
                  value={body}
                  onChange={(e) => handleBodyChange(e.target.value)}
                  placeholder="Enter the message template content..."
                  rows={10}
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
      </div>
    </div>
  )
}
