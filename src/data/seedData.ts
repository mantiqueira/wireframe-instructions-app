import { Instruction } from '../types'

export const seedInstructions: Instruction[] = [
  {
    id: '1',
    title: 'Required cost code structure',
    where: 'Estimates',
    body: 'All estimates must include cost codes organized by phase. Use the standard CSI MasterFormat numbering system. Each line item must have a corresponding cost code.',
    status: 'active',
    appliedCount: 32
  },
  {
    id: '2',
    title: 'Material markup tiers',
    where: 'Estimates',
    body: 'Apply markup to materials based on these tiers: Standard materials 15%, Premium materials 20%, Specialty items 25%.',
    status: 'active',
    appliedCount: 18
  },
  {
    id: '3',
    title: 'Labor rate calculations',
    where: 'Estimates',
    body: 'Use regional labor rates from the latest BLS data. Include fringe benefits at 35% of base rate.',
    status: 'conflicting',
    appliedCount: 5
  },
  {
    id: '4',
    title: 'Proposal presentation format',
    where: 'Proposals',
    body: 'All proposals must start with an executive summary, followed by scope of work, timeline, and pricing breakdown. Use company letterhead template.',
    status: 'active',
    appliedCount: 24
  },
  {
    id: '5',
    title: 'Client communication tone',
    where: 'Proposals',
    body: 'Maintain professional and friendly tone. Avoid technical jargon unless client is technical. Always include next steps.',
    status: 'disabled',
    appliedCount: 12
  },
  {
    id: '6',
    title: 'Pricing transparency rules',
    where: 'Proposals',
    body: 'Break down all costs clearly. Show material costs, labor costs, overhead, and profit margin separately.',
    status: 'active',
    appliedCount: 31
  },
  {
    id: '7',
    title: 'Document version control',
    where: 'Other',
    body: 'All documents must include version number and date in footer. Use format: v1.0 - 2024-01-15',
    status: 'active',
    appliedCount: 45
  },
  {
    id: '8',
    title: 'Quality assurance checklist',
    where: 'Other',
    body: 'Before finalizing any document, verify: spelling, calculations, client name, project address, and all required signatures.',
    status: 'invalid',
    appliedCount: 0
  }
]

