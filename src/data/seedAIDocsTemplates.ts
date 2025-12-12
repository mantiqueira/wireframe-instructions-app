import { AIDocsTemplate } from '../types'

export const seedAIDocsTemplates: AIDocsTemplate[] = [
  {
    id: '1',
    title: 'Scope of Work - Standard',
    body: 'SCOPE OF WORK\n\n[Project Title]\n\nProject Location: [Location]\nClient: [Client Name]\nDate: [Date]\nProject Value: [Value]\n\nPROJECT OVERVIEW\n\n[Project overview description]\n\nSPECIFIC TASKS AND DELIVERABLES\n\n[Detailed tasks and phases]',
    instructions: 'Create a comprehensive scope of work document with project details, overview, and specific tasks organized by phases.',
    enabled: true
  },
  {
    id: '2',
    title: 'Change Order Template',
    body: 'CHANGE ORDER\n\n[Change Order Number]\n\nProject: [Project Name]\nClient: [Client Name]\nDate: [Date]\n\nDESCRIPTION OF CHANGE\n\n[Detailed description of the change]\n\nCOST BREAKDOWN\n\n[Itemized costs]\n\nAPPROVAL\n\n[Signature section]',
    instructions: 'Generate a professional change order document with clear sections for description, costs, and approval.',
    enabled: true
  }
]

