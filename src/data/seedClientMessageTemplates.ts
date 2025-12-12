import { ClientMessageTemplate } from '../types'

export const seedClientMessageTemplates: ClientMessageTemplate[] = [
  {
    id: '1',
    title: 'Template A',
    body: 'Hi, Adam\n\nI\'ve put together a change order based on your recent requests. Here\'s a breakdown of the updated work and costs.',
    instructions: 'Use a professional and friendly tone. Reference the client by name. Explain the change order clearly and provide context for the updates.',
    enabled: true
  },
  {
    id: '2',
    title: 'Template B',
    body: 'Hi, Adam\n\nI\'ve put together a change order based on your recent requests. Here\'s a breakdown of the updated work and costs.',
    instructions: 'Maintain a professional tone while being approachable. Clearly outline what has changed and why. Include next steps.',
    enabled: true
  },
  {
    id: '3',
    title: 'Template C',
    body: 'Hi there,\n\nI wanted to follow up on our recent conversation about the project updates.',
    instructions: 'Keep the message concise and action-oriented. Focus on clarity and next steps.',
    enabled: true
  }
]
