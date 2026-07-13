import { useState } from 'react'
import { checkCredentials, setAuthenticated } from '../auth.js'

export default function LoginPage({ onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const ok = await checkCredentials(username.trim(), password)
    setLoading(false)
    if (ok) {
      setAuthenticated()
      onSuccess()
    } else {
      setError('Incorrect username or password.')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-ibm-bg flex flex-col items-center justify-center px-4">
      {/* Card */}
      <div className="bg-white rounded-xl shadow-sm w-full max-w-sm overflow-hidden">

        {/* Card header accent */}
        <div className="bg-gradient-to-r from-ibm-indigo to-ibm-purple p-6 flex flex-col items-center">
          <img
            src="/UMB-Bobathon/Bob.png"
            alt="IBM Bob"
            className="h-20 w-20 object-contain mb-3"
          />
          <h1 className="text-white text-xl font-bold text-center leading-tight">
            IBM Bob Premium Package for Z
          </h1>
          <p className="text-white/70 text-sm mt-1">Bobathon Guide</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-gray-400 text-center mb-2">
            Sign in to access the lab guide
          </p>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Username
            </label>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="w-full border border-ibm-border rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-ibm-blue focus:ring-1 focus:ring-ibm-blue transition"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full border border-ibm-border rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-ibm-blue focus:ring-1 focus:ring-ibm-blue transition pr-10"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs px-1"
                tabIndex={-1}
              >
                {showPass ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded px-3 py-2 text-xs">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ibm-blue text-white font-semibold rounded py-2.5 text-sm hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>

      {/* Footer hint */}
      <p className="text-xs text-gray-400 mt-6 text-center">
        Contact your instructor for access credentials.
      </p>
    </div>
  )
}
