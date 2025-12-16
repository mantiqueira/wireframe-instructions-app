import { createContext, useContext, useState, ReactNode } from 'react'
import { ClientMessageTemplate } from '../types'
import { seedClientMessageTemplates } from '../data/seedClientMessageTemplates'

interface ClientMessageTemplatesContextType {
  templates: ClientMessageTemplate[]
  addTemplate: (template: Omit<ClientMessageTemplate, 'id'>) => void
  updateTemplate: (id: string, template: Partial<ClientMessageTemplate>) => void
  deleteTemplate: (id: string) => void
  duplicateTemplate: (id: string) => void
  resetTemplates: () => void
}

const ClientMessageTemplatesContext = createContext<ClientMessageTemplatesContextType | undefined>(undefined)

export function ClientMessageTemplatesProvider({ children }: { children: ReactNode }) {
  const [templates, setTemplates] = useState<ClientMessageTemplate[]>(seedClientMessageTemplates)

  const addTemplate = (templateData: Omit<ClientMessageTemplate, 'id'>) => {
    const newTemplate: ClientMessageTemplate = {
      ...templateData,
      id: Date.now().toString()
    }
    setTemplates((prev) => [newTemplate, ...prev])
  }

  const updateTemplate = (id: string, updates: Partial<ClientMessageTemplate>) => {
    setTemplates((prev) =>
      prev.map((template) => (template.id === id ? { ...template, ...updates } : template))
    )
  }

  const deleteTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((template) => template.id !== id))
  }

  const duplicateTemplate = (id: string) => {
    const template = templates.find((t) => t.id === id)
    if (template) {
      const duplicated: ClientMessageTemplate = {
        ...template,
        id: Date.now().toString(),
        title: `${template.title} (Copy)`
      }
      setTemplates((prev) => [duplicated, ...prev])
    }
  }

  const resetTemplates = () => {
    setTemplates(seedClientMessageTemplates)
  }

  return (
    <ClientMessageTemplatesContext.Provider
      value={{ templates, addTemplate, updateTemplate, deleteTemplate, duplicateTemplate, resetTemplates }}
    >
      {children}
    </ClientMessageTemplatesContext.Provider>
  )
}

export function useClientMessageTemplates() {
  const context = useContext(ClientMessageTemplatesContext)
  if (context === undefined) {
    throw new Error('useClientMessageTemplates must be used within a ClientMessageTemplatesProvider')
  }
  return context
}
