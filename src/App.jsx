import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import RightsGuide from './pages/RightsGuide'
import DeEscalationScripts from './pages/DeEscalationScripts'
import StateGuides from './pages/StateGuides'
import EncounterRecorder from './pages/EncounterRecorder'
import MyEncounters from './pages/MyEncounters'
import Subscription from './pages/Subscription'

function App() {
  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main className="pb-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rights" element={<RightsGuide />} />
          <Route path="/scripts" element={<DeEscalationScripts />} />
          <Route path="/state-guides" element={<StateGuides />} />
          <Route path="/record" element={<EncounterRecorder />} />
          <Route path="/encounters" element={<MyEncounters />} />
          <Route path="/subscription" element={<Subscription />} />
        </Routes>
      </main>
      
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#4ade80',
              secondary: '#000',
            },
          },
          error: {
            duration: 4000,
            theme: {
              primary: '#ef4444',
              secondary: '#000',
            },
          },
        }}
      />
    </div>
  )
}

export default App
