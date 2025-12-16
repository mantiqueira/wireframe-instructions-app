import { createContext, useContext, useState, ReactNode } from 'react'
import { Instruction } from '../types'
import { seedInstructions } from '../data/seedData'

interface InstructionsContextType {
  instructions: Instruction[]
  addInstruction: (instruction: Omit<Instruction, 'id' | 'appliedCount'>) => void
  deleteInstruction: (id: string) => void
  updateInstructionStatus: (id: string, status: Instruction['status']) => void
  resetInstructions: () => void
}

const InstructionsContext = createContext<InstructionsContextType | undefined>(undefined)

export function InstructionsProvider({ children }: { children: ReactNode }) {
  const [instructions, setInstructions] = useState<Instruction[]>(seedInstructions)

  const addInstruction = (instructionData: Omit<Instruction, 'id' | 'appliedCount'>) => {
    const newInstruction: Instruction = {
      ...instructionData,
      id: Date.now().toString(),
      appliedCount: 0
    }
    setInstructions((prev) => [newInstruction, ...prev])
  }

  const deleteInstruction = (id: string) => {
    setInstructions((prev) => prev.filter((inst) => inst.id !== id))
  }

  const updateInstructionStatus = (id: string, status: Instruction['status']) => {
    setInstructions((prev) =>
      prev.map((inst) => (inst.id === id ? { ...inst, status } : inst))
    )
  }

  const resetInstructions = () => {
    setInstructions(seedInstructions)
  }

  return (
    <InstructionsContext.Provider
      value={{ instructions, addInstruction, deleteInstruction, updateInstructionStatus, resetInstructions }}
    >
      {children}
    </InstructionsContext.Provider>
  )
}

export function useInstructions() {
  const context = useContext(InstructionsContext)
  if (context === undefined) {
    throw new Error('useInstructions must be used within an InstructionsProvider')
  }
  return context
}

