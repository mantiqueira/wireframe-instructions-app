import { ClientMessageTemplate } from '../types'

export const exampleClientMessageTemplates: Omit<ClientMessageTemplate, 'id'>[] = [
  {
    title: 'Proposal - Enthusiastic & Friendly',
    body: 'Hi [client name]! 🎉\n\nI\'m excited to share the proposal for your [project type] at [project location]!\n\nThis project is going to transform your space with [extra context], and I can\'t wait to get started. I\'ve put together a comprehensive proposal that covers all the details.\n\nPlease review the estimate below and let me know if you\'d like to approve and move forward. I\'m here to answer any questions you might have!',
    instructions: 'Write a friendly and enthusiastic message to the client about getting their estimate/proposal approved using this structure:\n\nHi [client name]! 🎉\n\nI\'m excited to share the proposal for your [project type] at [project location]!\n\nThis project is going to transform your space with [extra context], and I can\'t wait to get started. I\'ve put together a comprehensive proposal that covers all the details.\n\nPlease review the estimate below and let me know if you\'d like to approve and move forward. I\'m here to answer any questions you might have!',
    enabled: true
  },
  {
    title: 'Proposal - Professional & Detailed',
    body: 'Hi [client name],\n\nI\'ve prepared the proposal for your [project type] at [project location].\n\nThe proposal includes [extra context], with detailed breakdowns for materials, labor, and timeline. We\'ve carefully considered all aspects of the project to ensure quality results.\n\nPlease review the attached estimate. Once approved, we can schedule the start date and begin work. I\'m available to discuss any questions or adjustments you\'d like to make before approval.',
    instructions: 'Write a professional and detailed message to the client about getting their estimate/proposal approved using this structure:\n\nHi [client name],\n\nI\'ve prepared the proposal for your [project type] at [project location].\n\nThe proposal includes [extra context], with detailed breakdowns for materials, labor, and timeline. We\'ve carefully considered all aspects of the project to ensure quality results.\n\nPlease review the attached estimate. Once approved, we can schedule the start date and begin work. I\'m available to discuss any questions or adjustments you\'d like to make before approval.',
    enabled: true
  },
  {
    title: 'Proposal - Value-Focused',
    body: 'Hi [client name],\n\nI\'ve put together the proposal for your [project type] at [project location].\n\nThis proposal outlines [extra context], designed to deliver the best value for your investment. We\'ve selected quality materials and efficient processes to keep costs reasonable while ensuring excellent results.\n\nReview the estimate below and let me know if you\'d like to approve and proceed. I\'m happy to discuss any options or modifications before you sign off.',
    instructions: 'Write a value-focused message to the client about getting their estimate/proposal approved using this structure:\n\nHi [client name],\n\nI\'ve put together the proposal for your [project type] at [project location].\n\nThis proposal outlines [extra context], designed to deliver the best value for your investment. We\'ve selected quality materials and efficient processes to keep costs reasonable while ensuring excellent results.\n\nReview the estimate below and let me know if you\'d like to approve and proceed. I\'m happy to discuss any options or modifications before you sign off.',
    enabled: true
  },
  {
    title: 'Proposal - Quick & Direct',
    body: 'Hi [client name],\n\nHere\'s the proposal for your [project type] at [project location].\n\nThe estimate covers [extra context]. All pricing is itemized below.\n\nPlease review and let me know if you\'d like to approve and move forward. Thanks!',
    instructions: 'Write a quick and direct message to the client about getting their estimate/proposal approved using this structure:\n\nHi [client name],\n\nHere\'s the proposal for your [project type] at [project location].\n\nThe estimate covers [extra context]. All pricing is itemized below.\n\nPlease review and let me know if you\'d like to approve and move forward. Thanks!',
    enabled: true
  },
  {
    title: 'Proposal - Premium & Upscale',
    body: 'Hi [client name],\n\nI\'m pleased to present the proposal for your [project type] at [project location].\n\nThis proposal features [extra context], using premium materials and craftsmanship to create an exceptional result. We\'ve designed this project to exceed expectations and add significant value to your property.\n\nPlease review the detailed estimate. Once you approve, we can begin scheduling and procurement. I\'d be happy to discuss the specifications and answer any questions before you sign off.',
    instructions: 'Write a premium and upscale message to the client about getting their estimate/proposal approved using this structure:\n\nHi [client name],\n\nI\'m pleased to present the proposal for your [project type] at [project location].\n\nThis proposal features [extra context], using premium materials and craftsmanship to create an exceptional result. We\'ve designed this project to exceed expectations and add significant value to your property.\n\nPlease review the detailed estimate. Once you approve, we can begin scheduling and procurement. I\'d be happy to discuss the specifications and answer any questions before you sign off.',
    enabled: true
  },
  {
    title: 'Proposal - Budget-Conscious',
    body: 'Hi [client name],\n\nI\'ve prepared the proposal for your [project type] at [project location].\n\nThe proposal includes [extra context], with cost-effective solutions that still deliver quality results. We\'ve optimized the scope to stay within budget while meeting your needs.\n\nReview the estimate below. If you\'d like to approve and proceed, or if you want to explore different options or materials, I\'m happy to discuss. Let me know what you think!',
    instructions: 'Write a budget-conscious message to the client about getting their estimate/proposal approved using this structure:\n\nHi [client name],\n\nI\'ve prepared the proposal for your [project type] at [project location].\n\nThe proposal includes [extra context], with cost-effective solutions that still deliver quality results. We\'ve optimized the scope to stay within budget while meeting your needs.\n\nReview the estimate below. If you\'d like to approve and proceed, or if you want to explore different options or materials, I\'m happy to discuss. Let me know what you think!',
    enabled: true
  }
]

