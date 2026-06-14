import { useState } from 'react'
import { runAudit } from '../lib/api'

export default function Compare() {
  const [url1, setUrl1] = useState('')
  const [url2, setUrl2] = useState('')
  const [results, setResults] = useState([null, null])
  const [loading, setLoading] = useState(false)

  const handleCompare = async (e) => {
    e.preventDefault()
    setLoading(true)
    const [r1, r2] = await Promise.all([
      runAudit(url1, 'audit'),
      runAudit(url2, 'audit')
    ])
    setResults([r1, r2])
    setLoading(false)
  }

  const scoreColor = s => s >= 80 ? 'text-green-400' : s >= 50 ? 'text-yellow-400' : 'text-red-400'

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold"><span className="gradient-text">Compare</span> URLs</h1>
        <p className="text-gray-400 mt-2">Analyze 2 websites side by side</p>
      </div>
      <form onSubmit={handleCompare} className="glass border border-white/5 rounded-2xl p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <input className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 w-full"
            placeholder="https://site1.com" value={url1} onChange={e => setUrl1(e.target.value)} required type="url" />
          <input className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 w-full"
            placeholder="https://site2.com" value={url2} onChange={e => setUrl2(e.target.value)} required type="url" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl py-3 font-semibold transition-all">
          {loading ? '⏳ Comparing...' : '⚔️ Compare Now'}
        </button>
      </form>

      {results[0] && results[1] && (
        <div className="grid md:grid-cols-2 gap-6">
          {results.map((r, i) => (
            <div key={i} className="glass border border-white/5 rounded-2xl p-6">
              <p className="text-indigo-400 font-semibold truncate mb-4">{r.url}</p>
              <p className={`text-6xl font-bold text-center mb-4 ${scoreColor(r.score)}`}>{r.score}</p>
              <ul className="space-y-2">
                {r.issues?.slice(0, 3).map((issue, j) => (
                  <li key={j} className="text-red-400 text-sm">• {issue}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}