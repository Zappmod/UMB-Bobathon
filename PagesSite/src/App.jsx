import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import HomePage from './components/HomePage.jsx'
import LabView from './components/LabView.jsx'
import ResourcesPage from './components/ResourcesPage.jsx'
import LoginPage from './components/LoginPage.jsx'
import { isAuthenticated } from './auth.js'

export default function App() {
  const [authed, setAuthed] = useState(isAuthenticated())

  if (!authed) {
    return <LoginPage onSuccess={() => setAuthed(true)} />
  }

  return (
    <BrowserRouter basename="/UMB-Bobathon">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lab/:labId" element={<LabView />} />
        <Route path="/resources" element={<ResourcesPage />} />
      </Routes>
    </BrowserRouter>
  )
}
