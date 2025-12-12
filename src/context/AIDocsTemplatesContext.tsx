import { createContext, useContext, useState, ReactNode } from 'react'
import { AIDocsTemplate } from '../types'
import { seedAIDocsTemplates } from '../data/seedAIDocsTemplates'

interface AIDocsTemplatesContextType {
  templates: AIDocsTemplate[]
  addTemplate: (template: Omit<AIDocsTemplate, 'id'>) => void
  updateTemplate: (id: string, template: Partial<AIDocsTemplate>) => void
  deleteTemplate: (id: string) => void
  duplicateTemplate: (id: string) => void
}

const AIDocsTemplatesContext = createContext<AIDocsTemplatesContextType | undefined>(undefined)

export function AIDocsTemplatesProvider({ children }: { children: ReactNode }) {
  const [templates, setTemplates] = useState<AIDocsTemplate[]>(seedAIDocsTemplates)

  const addTemplate = (templateData: Omit<AIDocsTemplate, 'id'>) => {
    const newTemplate: AIDocsTemplate = {
      ...templateData,
      id: Date.now().toString()
    }
    setTemplates((prev) => [newTemplate, ...prev])
  }

  const updateTemplate = (id: string, updates: Partial<AIDocsTemplate>) => {
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
      const duplicated: AIDocsTemplate = {
        ...template,
        id: Date.now().toString(),
        title: `${template.title} (Copy)`
      }
      setTemplates((prev) => [duplicated, ...prev])
    }
  }

  return (
    <AIDocsTemplatesContext.Provider
      value={{ templates, addTemplate, updateTemplate, deleteTemplate, duplicateTemplate }}
    >
      {children}
    </AIDocsTemplatesContext.Provider>
  )
}

export function useAIDocsTemplates() {
  const context = useContext(AIDocsTemplatesContext)
  if (context === undefined) {
    throw new Error('useAIDocsTemplates must be used within an AIDocsTemplatesProvider')
  }
  return context
}

