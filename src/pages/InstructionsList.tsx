import { useState, useMemo, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { InstructionWhere, Instruction } from '../types'
import { useInstructions } from '../context/InstructionsContext'
import InstructionCard from '../components/InstructionCard'
import InstructionUsagePanel from '../components/InstructionUsagePanel'
import styles from './InstructionsList.module.css'

const GROUP_CONFIG: Record<InstructionWhere, { title: string; helper: string }> = {
  Estimates: {
    title: 'Estimate instructions',
    helper: 'Tell AI how to create your estimates.'
  },
  Proposals: {
    title: 'Proposal instructions',
    helper: 'Tell AI how to present your proposals.'
  },
  Other: {
    title: 'Other instructions',
    helper: 'General rules that apply across estimates, proposals, and other documents.'
  }
}

export default function InstructionsList() {
  const { instructions, deleteInstruction, updateInstructionStatus } = useInstructions()
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const [bannerDismissed, setBannerDismissed] = useState(() => {
    return sessionStorage.getItem('estimateBannerDismissed') === 'true'
  })
  const [learnMenuOpen, setLearnMenuOpen] = useState(false)
  const learnMenuRef = useRef<HTMLDivElement>(null)
  const [selectedInstruction, setSelectedInstruction] = useState<Instruction | null>(null)

  const filteredInstructions = useMemo(() => {
    if (!searchQuery.trim()) {
      return instructions
    }
    const query = searchQuery.toLowerCase()
    return instructions.filter(
      (inst) =>
        inst.title.toLowerCase().includes(query) ||
        inst.body.toLowerCase().includes(query)
    )
  }, [instructions, searchQuery])

  const groupedInstructions = useMemo(() => {
    const groups: Record<InstructionWhere, Instruction[]> = {
      Estimates: [],
      Proposals: [],
      Other: []
    }
    filteredInstructions.forEach((inst) => {
      groups[inst.where].push(inst)
    })
    return groups
  }, [filteredInstructions])

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this instruction?')) {
      deleteInstruction(id)
    }
  }

  const handleToggleStatus = (id: string) => {
    const instruction = instructions.find((inst) => inst.id === id)
    if (instruction) {
      const newStatus = instruction.status === 'disabled' ? 'active' : 'disabled'
      updateInstructionStatus(id, newStatus)
    }
  }

  const handleAddInstruction = (where: InstructionWhere) => {
    navigate(`/settings/ai-presets/instructions/new?group=${where}`)
  }

  const handleDismissBanner = () => {
    setBannerDismissed(true)
    sessionStorage.setItem('estimateBannerDismissed', 'true')
  }

  // Reset banner when navigating back from home
  useEffect(() => {
    const lastPath = sessionStorage.getItem('lastPath')
    
    // If we're on instructions page and last path was home, reset banner
    if (location.pathname === '/settings/ai-presets/instructions' && lastPath === '/') {
      sessionStorage.removeItem('estimateBannerDismissed')
      setBannerDismissed(false)
    }
    
    // Store current path for next navigation
    sessionStorage.setItem('lastPath', location.pathname)
  }, [location.pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (learnMenuRef.current && !learnMenuRef.current.contains(event.target as Node)) {
        setLearnMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLearnClick = () => {
    setLearnMenuOpen(!learnMenuOpen)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Instructions</h1>
          <p className={styles.subtitle}>Control how AI works for your business</p>
        </div>
        <div className={styles.headerRight}>
          <input
            type="text"
            placeholder="Search…"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className={styles.learnMenuContainer} ref={learnMenuRef}>
            <button className={styles.learnButton} onClick={handleLearnClick}>Learn</button>
            {learnMenuOpen && (
              <div className={styles.learnMenu}>
                <a href="#" className={styles.learnMenuItem}>
                  <span className={styles.learnMenuIcon}>📖</span>
                  Get started
                </a>
                <a href="#" className={styles.learnMenuItem}>
                  <span className={styles.learnMenuIcon}>📖</span>
                  Best practices
                </a>
                <a href="#" className={styles.learnMenuItem}>
                  <span className={styles.learnMenuIcon}>📖</span>
                  AI's basics
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.groups}>
        {(Object.keys(GROUP_CONFIG) as InstructionWhere[]).map((where) => {
          const config = GROUP_CONFIG[where]
          const groupInstructions = groupedInstructions[where]
          const isEstimates = where === 'Estimates'

          return (
            <div key={where} className={styles.group}>
              {isEstimates && !bannerDismissed && (
                <div className={styles.banner}>
                  <button className={styles.bannerDismiss} onClick={handleDismissBanner}>
                    ×
                  </button>
                  <div className={styles.bannerContent}>
                    <div className={styles.bannerLeft}>
                      <h3 className={styles.bannerTitle}>Customize how Instructions guide your work</h3>
                      <p className={styles.bannerDescription}>
                        Define clear rules for how AI creates estimates and proposals. Set your communication style, pricing guidelines, and document structure to ensure every output matches your brand and standards.
                      </p>
                      <div className={styles.bannerLinks}>
                        <button className={styles.bannerLink}>
                          <span className={styles.bannerLinkIcon}>📖</span>
                          Get started
                        </button>
                        <button className={styles.bannerLink}>
                          <span className={styles.bannerLinkIcon}>📖</span>
                          Best practices
                        </button>
                        <button className={styles.bannerLink}>
                          <span className={styles.bannerLinkIcon}>📖</span>
                          AI's basics
                        </button>
                      </div>
                    </div>
                    <div className={styles.bannerRight}>
                      <div className={styles.bannerPreview}>
                        <div className={styles.bannerPreviewCard}>
                          Always include a 15% markup on all materials. Apply labor rates of $85/hour for standard work and $120/hour for specialized tasks.
                        </div>
                        <div className={styles.bannerPreviewCard}>
                          Use professional language and avoid contractions. Refer to clients as "customers" and projects as "engagements" throughout proposals.
                        </div>
                        <div className={styles.bannerPreviewCard}>
                          Include a detailed timeline with milestones. Break down costs by category: materials, labor, and overhead. Always add a contingency of 10%.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className={styles.groupHeader}>
                <div>
                  <h2 className={styles.groupTitle}>{config.title}</h2>
                  <p className={styles.groupHelper}>{config.helper}</p>
                </div>
                <button
                  className={styles.addButton}
                  onClick={() => handleAddInstruction(where)}
                >
                  + Add instruction
                </button>
              </div>
              <div className={styles.cardsList}>
                {groupInstructions.length === 0 ? (
                  <div className={styles.emptyState}>
                    Nothing found in this instruction type.
                  </div>
                ) : (
                  groupInstructions.map((instruction) => (
                    <InstructionCard
                      key={instruction.id}
                      instruction={instruction}
                      onDelete={handleDelete}
                      onToggleStatus={handleToggleStatus}
                      onSeeUsage={setSelectedInstruction}
                    />
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>

      {selectedInstruction && (
        <InstructionUsagePanel
          instruction={selectedInstruction}
          onClose={() => setSelectedInstruction(null)}
        />
      )}
    </div>
  )
}

