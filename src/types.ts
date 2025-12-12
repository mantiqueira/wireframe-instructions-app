export type InstructionWhere = 'Estimates' | 'Proposals' | 'Other'

export type InstructionStatus = 'active' | 'disabled' | 'conflicting' | 'invalid'

export interface Instruction {
  id: string
  title: string
  where: InstructionWhere
  body: string
  status: InstructionStatus
  appliedCount: number
}

export interface InstructionExample {
  title: string
  where: InstructionWhere
  body: string
}

export interface ClientMessageTemplate {
  id: string
  title: string
  body: string
  instructions: string
  enabled: boolean
}

