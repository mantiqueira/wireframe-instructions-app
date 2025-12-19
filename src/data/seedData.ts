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
    title: 'Group line items by trade',
    where: 'Estimates',
    body: 'Always organize estimate line items by trade category: electrical, plumbing, HVAC, carpentry, etc. Each trade should be a separate section with subtotals.',
    status: 'conflicting',
    appliedCount: 5,
    conflictDetails: {
      conflictingWith: ['Required cost code structure'],
      conflictingWithIds: ['1'],
      conflictReason: 'Both instructions define structure for estimate organization. "Group line items by trade" requires trade-based grouping, while "Required cost code structure" requires phase-based CSI MasterFormat grouping. They cannot be applied simultaneously.'
    }
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
    title: 'Add company logo to proposal footer',
    where: 'Proposals',
    body: 'Always include the company logo image in the footer of every proposal. The logo should be centered and sized at 150px width. Use the file located at /assets/company-logo.png',
    status: 'invalid',
    appliedCount: 0,
    invalidReason: 'Images can be attached manually using the interface, but the logo can only be placed in one specific location. It is not possible to place the logo in the footer.'
  }
]

