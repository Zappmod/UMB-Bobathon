import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import LabContent from './LabContent.jsx'

export default function LabView() {
  const { labId } = useParams()
  const [labs, setLabs] = useState([])

  useEffect(() => {
    fetch('/UMB-Bobathon/lab-instructions/index.json')
      .then(r => r.json())
      .then(data => setLabs(data.labs))
  }, [])

  const currentLab = labs.find(l => l.id === labId)

  return (
    <div className="flex h-screen pt-12 bg-ibm-bg">
      <Sidebar labs={labs} />
      <main className="flex-1 overflow-y-auto">
        <LabContent lab={currentLab} />
      </main>
    </div>
  )
}
