import { useState, useMemo } from 'react'
import { useClientMessageTemplates } from '../context/ClientMessageTemplatesContext'
import TemplateEditorModal from '../components/TemplateEditorModal'
import styles from './ClientMessageTemplates.module.css'

export default function ClientMessageTemplates() {
  const { templates, deleteTemplate } = useClientMessageTemplates()
  const [searchQuery, setSearchQuery] = useState('')
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null)

  const filteredTemplates = useMemo(() => {
    if (!searchQuery.trim()) {
      return templates
    }
    const query = searchQuery.toLowerCase()
    return templates.filter(
      (template) =>
        template.title.toLowerCase().includes(query) ||
        template.body.toLowerCase().includes(query)
    )
  }, [templates, searchQuery])

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      deleteTemplate(id)
    }
  }

  const handleEdit = (id: string) => {
    setEditingTemplateId(id)
  }

  const handleAddTemplate = () => {
    setEditingTemplateId('new')
  }

  const handleCloseModal = () => {
    setEditingTemplateId(null)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Client message templates</h1>
          <p className={styles.subtitle}>Manage templates for AI-generated client messages</p>
        </div>
        <div className={styles.headerRight}>
          <input
            type="text"
            placeholder="Search…"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className={styles.addButton} onClick={handleAddTemplate}>
            + Add template
          </button>
        </div>
      </div>

      <div className={styles.templatesList}>
        {filteredTemplates.length === 0 ? (
          <div className={styles.emptyState}>
            {searchQuery ? 'No templates found.' : 'No templates yet. Create your first template!'}
          </div>
        ) : (
          filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onEdit={() => handleEdit(template.id)}
              onDelete={() => handleDelete(template.id)}
            />
          ))
        )}
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

interface TemplateCardProps {
  template: any
  onEdit: () => void
  onDelete: () => void
}

function TemplateCard({ template, onEdit, onDelete }: TemplateCardProps) {
  const preview = template.body.split('\n')[0].substring(0, 120) + '...'

  return (
    <div className={styles.card} onClick={onEdit}>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{template.title}</h3>
        <p className={styles.preview}>{preview}</p>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.badge}>
          {template.enabled ? 'Enabled' : 'Disabled'}
        </div>
        <button
          className={styles.deleteButton}
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
