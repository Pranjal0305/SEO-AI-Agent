import { useState } from 'react'

const MODES = [
  { key: 'audit', icon: '🔧', label: 'Full Audit', desc: 'Technical SEO analysis' },
  { key: 'geo', icon: '🤖', label: 'GEO', desc: 'AI search optimization' },
  { key: 'competitor', icon: '⚔️', label: 'Competitor', desc: 'Gap analysis' },
  { key: 'cluster', icon: '🗂️', label: 'Clusters', desc: 'Keyword strategy' },
]

export default function AuditForm({ onSubmit, loading }) {
  const [url, setUrl] = useState('')
  const [mode, setMode] = useState('audit')

  const handleSubmit = async (e) => {
    e.preventDefault()
    onSubmit(url, mode)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🌐</span>
        <input
          className="w-full bg-gray-900/80 border border-gray-700 rounded-xl pl-11 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
          placeholder="https://yourwebsite.com"
          value={url}
          onChange={e => setUrl(e.target.value)}
          required
          type="url"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {MODES.map(m => (
          <button key={m.key} type="button" onClick={() => setMode(m.key)}
            className={`p-4 rounded-xl border text-left transition-all duration-200 ${
              mode === m.key
                ? 'border-indigo-500 bg-indigo-500/15 shadow-lg shadow-indigo-500/10'
                : 'border-gray-800 bg-gray-900/50 hover:border-gray-600'
            }`}>
            <div className="text-xl mb-2">{m.icon}</div>
            <div className={`font-semibold text-sm ${mode === m.key ? 'text-indigo-300' : 'text-gray-300'}`}>{m.label}</div>
            <div className="text-xs text-gray-500 mt-0.5">{m.desc}</div>
          </button>
        ))}
      </div>

      <button type="submit" disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl py-4 font-semibold text-white transition-all duration-200">
        {loading
          ? <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Analyzing...
            </span>
          : '🚀 Run SEO Analysis'}
      </button>
    </form>
  )
}