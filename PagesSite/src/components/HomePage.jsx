import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const [labs, setLabs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/UMB-Bobathon/lab-instructions/index.json')
      .then(r => r.json())
      .then(data => { setLabs(data.labs); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const cardAccents = [
    'from-ibm-indigo to-ibm-purple',
    'from-ibm-blue to-ibm-indigo',
    'from-ibm-purple to-[#a78bfa]',
  ]

  return (
    <div className="min-h-screen bg-ibm-bg pt-12">
      {/* Hero */}
      <div className="bg-white border-b border-ibm-border">
        <div className="max-w-6xl mx-auto px-8 py-12 flex items-center justify-between gap-8">
          <div className="flex-1 max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <img src="/UMB-Bobathon/Bob.png" alt="Bob" className="h-14 w-14 object-contain" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-ibm-indigo mb-1">IBM Client Engineering</p>
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                  Bob Premium Package for Z
                </h1>
              </div>
            </div>
            <p className="text-lg text-gray-500 font-light mb-2">Bobathon Guide</p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Six hands-on labs to get you building with IBM Bob Premium Package for Z — from workspace setup through technical design, impact analysis, refactoring, spec-driven code generation, and UI modernization.
            </p>
            {labs.length > 0 && (
              <Link
                to={`/lab/${labs[0].id}`}
                className="inline-flex items-center gap-2 bg-ibm-blue text-white px-6 py-2.5 rounded text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Labs →
              </Link>
            )}
          </div>
          <div className="hidden md:block shrink-0">
            <img
              src="/UMB-Bobathon/BobMainframe.png"
              alt="Bob with mainframe"
              className="h-64 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Sample Code Download */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Before You Begin</h2>
        <div className="bg-white border border-ibm-border rounded-xl p-6 flex items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0 bg-ibm-active rounded-lg p-3">
              <svg className="h-6 w-6 text-ibm-indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-0.5">Sample Application Code</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Download the GenApp COBOL sample application used throughout all labs. Extract the zip and open the folder in IBM Bob before starting Lab 1.
              </p>
            </div>
          </div>
          <a
            href="/UMB-Bobathon/SampleCode.zip"
            download="SampleCode.zip"
            className="shrink-0 inline-flex items-center gap-2 bg-ibm-blue text-white px-5 py-2.5 rounded text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download (.zip)
          </a>
        </div>
      </div>

      {/* Lab Cards */}
      <div className="max-w-6xl mx-auto px-8 py-10">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-6">Labs</h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-sm h-52 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {labs.map((lab, idx) => (
              <Link
                key={lab.id}
                to={`/lab/${lab.id}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col no-underline"
              >
                {/* Card accent header */}
                <div className={`bg-gradient-to-r ${cardAccents[idx % cardAccents.length]} p-4 flex items-center justify-between`}>
                  <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    Lab {idx + 1}
                  </span>
                  <span className="text-white/70 text-2xl">{lab.icon}</span>
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-ibm-blue transition-colors leading-snug">
                    {lab.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">
                    {lab.description}
                  </p>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs bg-ibm-active text-ibm-indigo font-medium px-2.5 py-1 rounded-full">
                      ⏱ {lab.duration}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 font-medium px-2.5 py-1 rounded-full">
                      {lab.difficulty}
                    </span>
                    <span className="ml-auto text-ibm-blue text-sm font-semibold group-hover:translate-x-0.5 transition-transform">
                      Start →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Credit */}
      <div className="max-w-6xl mx-auto px-8 pb-12 pt-4">
        <p className="text-center text-xs text-gray-400">
          Created by Sophie Harrison &amp; Renate Hamrick — Application Modernization for Z team
        </p>
      </div>
    </div>
  )
}
