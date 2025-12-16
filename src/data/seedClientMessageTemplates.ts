import { ClientMessageTemplate } from '../types'

export const seedClientMessageTemplates: ClientMessageTemplate[] = [
  {
    id: '1',
    title: 'Standard Proposal',
    body: 'Hi [client name],\n\nI\'ve prepared the proposal for your [project type] at [project location].\n\nThe proposal includes [extra context], with detailed breakdowns for materials, labor, and timeline. We\'ve carefully considered all aspects of the project to ensure quality results.\n\nPlease review the estimate below. Once approved, we can schedule the start date and begin work. I\'m available to discuss any questions or adjustments you\'d like to make before approval.',
    instructions: 'Write a friendly and excited message to the client using this structure:\n\nHi [client name]! 🎉\n\nI\'m excited to share the [document type] for the [project type] at [project location].\n\n[One short sentence about why this update is exciting, using: [extra context]].\n\nTake a look at the details below. Let me know if you want to chat or have any questions.',
    enabled: true
  },
  {
    id: '2',
    title: 'Urgent Proposal',
    body: 'Hi [client name],\n\nI\'ve prepared an urgent proposal for your [project type] at [project location] to address [extra context].\n\nGiven the circumstances, we\'ve prioritized the most critical work to ensure your property is safe and secure. The proposal includes emergency repairs and necessary work. Please review the estimate carefully, and let me know if you\'d like to approve and proceed. Don\'t hesitate to reach out with any concerns or questions.',
    instructions: 'Write a friendly and excited message to the client using this structure:\n\nHi [client name]! 🎉\n\nI\'m excited to share the [document type] for the [project type] at [project location].\n\n[One short sentence about why this update is exciting, using: [extra context]].\n\nTake a look at the details below. Let me know if you want to chat or have any questions.',
    enabled: true
  },
  {
    id: '3',
    title: 'Super Excited',
    body: 'Hi [client name]! 🎉\n\nI\'m so excited to share the proposal for your [project type] at [project location]! This is going to be amazing!\n\nWe\'ve put together something really special that I think you\'re going to love. The project will transform your space and bring your vision to life. I can\'t wait to get started!\n\nTake a look at the estimate below - please review and let me know if you\'d like to approve and move forward. I\'m here if you want to discuss anything or have questions. Let\'s make this happen!',
    instructions: 'Write a friendly and excited message to the client using this structure:\n\nHi [client name]! 🎉\n\nI\'m excited to share the [document type] for the [project type] at [project location].\n\n[One short sentence about why this update is exciting, using: [extra context]].\n\nTake a look at the details below. Let me know if you want to chat or have any questions.',
    enabled: true
  }
]
