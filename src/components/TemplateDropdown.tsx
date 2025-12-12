import { useState, useRef, useEffect } from 'react'
import { ClientMessageTemplate, AIDocsTemplate } from '../types'
import styles from './TemplateDropdown.module.css'

type Template = ClientMessageTemplate | AIDocsTemplate

interface TemplateDropdownProps {
  templates: Template[]
  selectedTemplateId: string | null
  onSelectTemplate: (template: Template) => void
  onNewTemplate: () => void
  onEdit: (id: string) => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
}

export default function TemplateDropdown({
  templates,
  selectedTemplateId,
  onSelectTemplate,
  onNewTemplate,
  onEdit,
  onDuplicate,
  onDelete
}: TemplateDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId)
  const filteredTemplates = templates.filter((template) =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelect = (template: Template) => {
    onSelectTemplate(template)
    setIsOpen(false)
    setSearchQuery('')
  }

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedTemplate?.title || 'Select template'}</span>
        <span className={styles.arrow}>▼</span>
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Q Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          <div className={styles.templateList}>
            {filteredTemplates.map((template) => (
              <TemplateItem
                key={template.id}
                template={template}
                isSelected={template.id === selectedTemplateId}
                onSelect={() => handleSelect(template)}
                onEdit={() => onEdit(template.id)}
                onDuplicate={() => onDuplicate(template.id)}
                onDelete={() => onDelete(template.id)}
              />
            ))}
          </div>
          <button className={styles.newTemplateButton} onClick={onNewTemplate}>
            New template
          </button>
        </div>
      )}
    </div>
  )
}

interface TemplateItemProps {
  template: Template
  isSelected: boolean
  onSelect: () => void
  onEdit: () => void
  onDuplicate: () => void
  onDelete: () => void
}

function TemplateItem({ template, isSelected, onSelect, onEdit, onDuplicate, onDelete }: TemplateItemProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const preview = template.body.split('\n')[0].substring(0, 120)

  return (
    <div className={styles.templateItem}>
      <div className={styles.templateContent} onClick={onSelect}>
        <div className={styles.checkbox}>
          {isSelected && <span className={styles.checkmark}>✓</span>}
        </div>
        <div className={styles.templateInfo}>
          <div className={styles.templateTitle}>{template.title}</div>
          <div className={styles.templatePreview}>{preview}</div>
        </div>
      </div>
      <div className={styles.menuContainer} ref={menuRef}>
        <button
          className={styles.menuButton}
          onClick={(e) => {
            e.stopPropagation()
            setMenuOpen(!menuOpen)
          }}
        >
          ⋯
        </button>
        {menuOpen && (
          <div className={styles.menu}>
            <button
              className={styles.menuItem}
              onClick={(e) => {
                e.stopPropagation()
                onEdit()
                setMenuOpen(false)
              }}
            >
              Edit
            </button>
            <button
              className={styles.menuItem}
              onClick={(e) => {
                e.stopPropagation()
                onDuplicate()
                setMenuOpen(false)
              }}
            >
              Duplicate
            </button>
            <button
              className={styles.menuItem}
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
                setMenuOpen(false)
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
