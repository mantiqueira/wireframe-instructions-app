import { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { InstructionWhere } from '../types'
import { useInstructions } from '../context/InstructionsContext'
import { instructionExamples } from '../data/exampleTemplates'
import InstructionToolbar from '../components/InstructionToolbar'
import ExampleModal from '../components/ExampleModal'
import Toast from '../components/Toast'
import WarningBanner from '../components/WarningBanner'
import { useAutoResizeTextarea } from '../hooks/useAutoResizeTextarea'
import styles from './NewInstruction.module.css'

export default function NewInstruction() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { addInstruction, instructions } = useInstructions()
  const groupParam = searchParams.get('group') as InstructionWhere | null
  const instructionId = searchParams.get('id')

  const [title, setTitle] = useState('')
  const [where, setWhere] = useState<InstructionWhere>(
    groupParam && ['Estimates', 'Proposals', 'Other'].includes(groupParam)
      ? groupParam
      : 'Estimates'
  )
  const [enabled, setEnabled] = useState(true)
  const [body, setBody] = useState('')
  const [history, setHistory] = useState<string[]>([''])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [currentInstructionStatus, setCurrentInstructionStatus] = useState<'active' | 'disabled' | 'conflicting' | 'invalid' | null>(null)

  const bodyRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea based on content
  useAutoResizeTextarea(bodyRef, body)

  // Load instruction data if ID is provided
  useEffect(() => {
    if (instructionId) {
      const instruction = instructions.find(inst => inst.id === instructionId)
      if (instruction) {
        setTitle(instruction.title)
        setWhere(instruction.where)
        setBody(instruction.body)
        setEnabled(instruction.status !== 'disabled')
        setCurrentInstructionStatus(instruction.status)
        setHistory([instruction.body])
        setHistoryIndex(0)
      }
    } else {
      setCurrentInstructionStatus(null)
    }
  }, [instructionId, instructions])

  const getInstructionLabel = () => {
    switch (where) {
      case 'Estimates':
        return 'Tell AI what to do on estimates:'
      case 'Proposals':
        return 'Tell AI what to do on proposals:'
      case 'Other':
        return 'Tell AI what to do:'
      default:
        return 'Tell AI what to do:'
    }
  }

  const addToHistory = (text: string) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(text)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const handleBodyChange = (value: string) => {
    setBody(value)
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
      setBody(history[newIndex])
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setBody(history[newIndex])
    }
  }

  const handleTranscribe = () => {
    const transcribed = 'Transcribed example: Apply markup to materials based on these tiers.'
    const newBody = body ? `${body}\n\n${transcribed}` : transcribed
    handleBodyChange(newBody)
  }

  const handleOptimize = () => {
    const optimized = `Improved instruction:\n\n${body}\n\n[Enhanced with clearer structure and actionable steps]`
    handleBodyChange(optimized)
  }

  const handleUseExample = (example: typeof instructionExamples[0]) => {
    setTitle(example.title)
    setWhere(example.where)
    setBody(example.body)
    setEnabled(true)
    setShowModal(false)
    addToHistory(example.body)
  }

  const handleTest = () => {
    setIsTesting(true)
    setShowPreview(false)
    setTimeout(() => {
      setIsTesting(false)
      setShowPreview(true)
    }, 1500)
  }

  const handleSave = () => {
    if (!title.trim() || !body.trim()) {
      alert('Please fill in both title and instruction body')
      return
    }
    addInstruction({
      title: title.trim(),
      where,
      body: body.trim(),
      status: enabled ? 'active' : 'disabled'
    })
    setShowToast(true)
    setTimeout(() => {
      navigate('/settings/instructions')
    }, 500)
  }

  const getPreviewColor = () => {
    switch (where) {
      case 'Estimates':
        return '#fff9e6'
      case 'Proposals':
        return '#e6f3ff'
      case 'Other':
        return '#e6f6e6'
      default:
        return '#f5f5f5'
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.form}>
          <div className={styles.formField}>
            <label className={styles.label}>Instruction title</label>
            <input
              type="text"
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter instruction title"
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.label}>Where it should be used?</label>
            <select
              className={styles.select}
              value={where}
              onChange={(e) => setWhere(e.target.value as InstructionWhere)}
            >
              <option value="Estimates">Estimates</option>
              <option value="Proposals">Proposals</option>
              <option value="Other">Other</option>
            </select>
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
            <label className={styles.label}>{getInstructionLabel()}</label>
            {(currentInstructionStatus === 'conflicting' || currentInstructionStatus === 'invalid') && (
              <div className={styles.warningBannerContainer}>
                <WarningBanner type={currentInstructionStatus} />
              </div>
            )}
            <div className={styles.instructionCard}>
              <InstructionToolbar
                onUndo={handleUndo}
                onRedo={handleRedo}
                canUndo={historyIndex > 0}
                canRedo={historyIndex < history.length - 1}
                onTranscribe={handleTranscribe}
                onOptimize={handleOptimize}
              />
              <textarea
                ref={bodyRef}
                className={styles.textarea}
                value={body}
                onChange={(e) => handleBodyChange(e.target.value)}
                placeholder="Enter your instruction..."
              />
            </div>
          </div>

          <button
            className={styles.exampleLink}
            onClick={() => setShowModal(true)}
          >
            Get started with examples
          </button>

          <div className={styles.formActions}>
            <button
              className={styles.secondaryButton}
              onClick={() => navigate('/settings/instructions')}
            >
              Cancel
            </button>
            <button
              className={styles.secondaryButton}
              onClick={handleTest}
              disabled={isTesting}
            >
              Test instruction
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
          {isTesting ? (
            <div className={styles.loadingState}>
              <div className={styles.loadingText}>Running test…</div>
              <div className={styles.shimmer}></div>
            </div>
          ) : showPreview ? (
            <div
              className={styles.previewBlock}
              style={{ backgroundColor: getPreviewColor() }}
            >
              {where === 'Estimates' && 'Estimate view only screen'}
              {where === 'Proposals' && 'Proposal view only screen'}
              {where === 'Other' && 'Other view only screen'}
            </div>
          ) : (
            <div className={styles.placeholder}>
              See your instruction in action
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <ExampleModal
          examples={instructionExamples}
          onClose={() => setShowModal(false)}
          onUseExample={handleUseExample}
        />
      )}
      {showToast && (
        <Toast
          message="Instruction saved successfully"
          onDismiss={() => setShowToast(false)}
        />
      )}
    </div>
  )
}

