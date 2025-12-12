import { ClientMessageTemplate } from '../types'

export const seedClientMessageTemplates: ClientMessageTemplate[] = [
  {
    id: '1',
    title: 'Standard change order',
    body: 'Hi, [client name]\n\nI\'ve put together a change order based on your recent requests for [brief description of the project]. Here\'s a breakdown of the updated work and costs.\n\nWe\'ve reviewed the scope and made the necessary adjustments to ensure everything aligns with your expectations. Please review the details below and let me know if you have any questions.',
    instructions: 'Use a professional and friendly tone. Reference the client by name. Explain the change order clearly and provide context for the updates. Replace [client name] with the actual client name and [brief description of the project] with a brief project description.',
    enabled: true
  },
  {
    id: '2',
    title: 'Natural Disaster - Serious',
    body: 'Hi [client name],\n\nI understand you\'re dealing with significant damage from [brief description of the project]. I\'ve prepared a detailed change order to address the urgent repairs needed.\n\nGiven the circumstances, we\'ve prioritized the most critical work to ensure your property is safe and secure. The scope includes emergency repairs and restoration work. Please review the estimate carefully, and don\'t hesitate to reach out with any concerns or questions.',
    instructions: 'Use a serious, empathetic, and professional tone. Acknowledge the difficult situation. Be clear about urgent repairs and safety concerns. Replace [client name] with the actual client name and [brief description of the project] with a description of the disaster or damage.',
    enabled: true
  },
  {
    id: '3',
    title: 'Super Excited',
    body: 'Hi [client name]! 🎉\n\nI\'m so excited to share the change order for [brief description of the project]! This is going to be amazing!\n\nWe\'ve put together something really special that I think you\'re going to love. The updates we\'ve planned will transform your space and bring your vision to life. I can\'t wait to get started on this!\n\nTake a look at the details below - I\'m here if you want to discuss anything or have questions. Let\'s make this happen!',
    instructions: 'Use an enthusiastic, energetic, and positive tone. Show genuine excitement about the project. Use exclamation points appropriately. Be warm and friendly. Replace [client name] with the actual client name and [brief description of the project] with a brief, exciting description of the project.',
    enabled: true
  }
]
