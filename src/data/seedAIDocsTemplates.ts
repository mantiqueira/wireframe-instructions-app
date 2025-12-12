import { AIDocsTemplate } from '../types'

export const seedAIDocsTemplates: AIDocsTemplate[] = [
  {
    id: '1',
    title: 'Scope of Work',
    body: 'SCOPE OF WORK\n\n[Project Title]\n\nProject Location: [Location]\nClient: [Client Name]\nDate: [Date]\nProject Value: [Value]\n\nPROJECT OVERVIEW\n\n[Project overview description]\n\nSPECIFIC TASKS AND DELIVERABLES\n\n[Detailed tasks and phases]',
    instructions: 'Create a comprehensive scope of work document with project details, overview, and specific tasks organized by phases.',
    enabled: true
  },
  {
    id: '2',
    title: 'Purchase Order',
    body: 'PURCHASE ORDER\n\nPO Number: [PO Number]\nDate: [Date]\nProject: [Project Name]\nClient: [Client Name]\n\nVENDOR INFORMATION\n\nVendor: [Vendor Name]\nAddress: [Vendor Address]\nContact: [Contact Person]\nPhone: [Phone Number]\n\nITEMS ORDERED\n\n[Itemized list of materials/equipment]\n[Quantity | Description | Unit Price | Total]\n\nDELIVERY INFORMATION\n\nDelivery Date: [Date]\nDelivery Address: [Address]\nSpecial Instructions: [Instructions]\n\nTOTAL AMOUNT: [Total]\n\nAPPROVAL\n\n[Signature section]',
    instructions: 'Generate a professional purchase order document with vendor information, itemized list of materials or equipment, delivery details, and approval section.',
    enabled: true
  },
  {
    id: '3',
    title: 'Work Order',
    body: 'WORK ORDER\n\nWork Order Number: [WO Number]\nDate: [Date]\nProject: [Project Name]\nClient: [Client Name]\nLocation: [Project Location]\n\nWORK ASSIGNMENT\n\nAssigned To: [Team/Contractor Name]\nSupervisor: [Supervisor Name]\nPriority: [Priority Level]\n\nWORK DESCRIPTION\n\n[Detailed description of work to be performed]\n\nSCOPE OF WORK\n\n[Specific tasks and requirements]\n\nMATERIALS NEEDED\n\n[List of required materials]\n\nTIMELINE\n\nStart Date: [Date]\nExpected Completion: [Date]\n\nNOTES/INSTRUCTIONS\n\n[Additional notes or special instructions]\n\nAPPROVAL\n\n[Signature section]',
    instructions: 'Create a work order document with work assignment details, description, scope, materials needed, timeline, and approval section.',
    enabled: true
  },
  {
    id: '4',
    title: 'Daily Log',
    body: 'DAILY LOG\n\nProject: [Project Name]\nDate: [Date]\nWeather: [Weather Conditions]\nTemperature: [Temperature]\n\nCREW/PERSONNEL\n\n[Names and roles of personnel on site]\n\nWORK PERFORMED\n\n[Description of work completed during the day]\n\nMATERIALS DELIVERED/USED\n\n[Materials received or used]\n\nEQUIPMENT ON SITE\n\n[Equipment used or available]\n\nISSUES/INCIDENTS\n\n[Any problems, delays, or incidents]\n\nVISITORS/CONSULTATIONS\n\n[Visitors, inspectors, or consultations]\n\nNOTES\n\n[Additional observations or notes]\n\nSIGNATURE\n\nPrepared by: [Name]\n[Signature]',
    instructions: 'Generate a daily log document recording daily activities, personnel, work performed, materials, equipment, issues, and observations for the project day.',
    enabled: true
  }
]

