import { Routes, Route } from 'react-router-dom'
import { InstructionsProvider } from './context/InstructionsContext'
import { ClientMessageTemplatesProvider } from './context/ClientMessageTemplatesContext'
import { AIDocsTemplatesProvider } from './context/AIDocsTemplatesContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import SettingsIndex from './pages/SettingsIndex'
import GeneralSettings from './pages/GeneralSettings'
import AIPresets from './pages/AIPresets'
import InstructionsList from './pages/InstructionsList'
import NewInstruction from './pages/NewInstruction'
import Proposal from './pages/Proposal'
import ClientMessageTemplates from './pages/ClientMessageTemplates'
import AIDocs from './pages/AIDocs'

function App() {
  return (
    <InstructionsProvider>
      <ClientMessageTemplatesProvider>
        <AIDocsTemplatesProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<SettingsIndex />} />
              <Route path="/settings/general" element={<GeneralSettings />} />
              <Route path="/settings/ai-presets" element={<AIPresets />}>
                <Route path="instructions" element={<InstructionsList />} />
                <Route path="instructions/new" element={<NewInstruction />} />
              </Route>
              <Route path="/proposal" element={<Proposal />} />
              <Route path="/settings/client-message-templates" element={<ClientMessageTemplates />} />
              <Route path="/ai-docs" element={<AIDocs />} />
            </Routes>
          </Layout>
        </AIDocsTemplatesProvider>
      </ClientMessageTemplatesProvider>
    </InstructionsProvider>
  )
}

export default App

