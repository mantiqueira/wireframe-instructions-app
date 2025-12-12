import { Routes, Route } from 'react-router-dom'
import { InstructionsProvider } from './context/InstructionsContext'
import { ClientMessageTemplatesProvider } from './context/ClientMessageTemplatesContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import InstructionsList from './pages/InstructionsList'
import NewInstruction from './pages/NewInstruction'
import Proposal from './pages/Proposal'
import ClientMessageTemplates from './pages/ClientMessageTemplates'
import Settings from './pages/Settings'

function App() {
  return (
    <InstructionsProvider>
      <ClientMessageTemplatesProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings/instructions" element={<InstructionsList />} />
            <Route path="/settings/instructions/new" element={<NewInstruction />} />
            <Route path="/proposal" element={<Proposal />} />
            <Route path="/settings/client-message-templates" element={<ClientMessageTemplates />} />
            <Route path="/settings/defaults" element={<Settings />} />
          </Routes>
        </Layout>
      </ClientMessageTemplatesProvider>
    </InstructionsProvider>
  )
}

export default App

