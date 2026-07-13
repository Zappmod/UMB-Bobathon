import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isResources = location.pathname === '/resources'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-ibm-border h-12 flex items-center px-6 gap-8">
      {/* Wordmark */}
      <Link to="/" className="flex items-center gap-2 shrink-0">
        <img src="/UMB-Bobathon/Bob2.png" alt="Bob" className="h-7 w-7 object-contain" />
        <span className="text-gray-900 text-base tracking-tight">
          <span className="font-light">IBM </span>
          <span className="font-bold">Bob</span>
          <span className="font-light text-gray-400 ml-2 text-sm">Premium Package for Z</span>
        </span>
      </Link>

      {/* Nav links */}
      <nav className="flex items-center gap-1 flex-1">
        <Link
          to="/"
          className={`px-3 py-3 text-sm font-medium border-b-2 transition-colors ${
            isHome
              ? 'border-ibm-blue text-ibm-blue'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Bobathon Guide
        </Link>
        <Link
          to="/resources"
          className={`px-3 py-3 text-sm font-medium border-b-2 transition-colors ${
            isResources
              ? 'border-ibm-blue text-ibm-blue'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Downloads
        </Link>
        <a
          href="https://bob.ibm.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-3 text-sm font-medium border-b-2 border-transparent text-gray-600 hover:text-gray-900 transition-colors"
        >
          bob.ibm.com ↗
        </a>
      </nav>

      {/* Avatar */}
      <div className="shrink-0 w-8 h-8 rounded-full bg-ibm-active text-ibm-indigo flex items-center justify-center text-xs font-bold select-none">
        BZ
      </div>
    </header>
  )
}
