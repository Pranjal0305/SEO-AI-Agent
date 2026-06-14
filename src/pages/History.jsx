import { useEffect, useState } from 'react'
import { getAuditHistory } from '../lib/api'

const modeConfig = {
  audit: { icon: '🔧', label: 'Full Audit', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  geo: { icon: '🤖', label: 'GEO', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  competitor: { icon: '⚔️', label: 'Competitor', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  cluster: { icon: '🗂️', label: 'Cluster', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
}

export default function History() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAuditHistory()
      .then(data => { setReports(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const scoreColor = s => s >= 80 ? 'text-green-400' : s >= 50 ? 'text-yellow-400' : 'text-red-400'
  const scoreBg = s => s >= 80 ? 'bg-green-500/10 border-green-500/30' : s >= 50 ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-red-500/10 border-red-500/30'

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Audit History</h1>
          <p className="text-gray-500 mt-1">All previous SEO analyses</p>
        </div>
        <span className="glass border border-white/10 text-gray-400 text-sm px-4 py-2 rounded-xl">
          {reports.length} audits
        </span>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading...</p>
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-gray-400 font-medium">No audits yet!</p>
          <p className="text-gray-600 text-sm mt-1">Run an audit from the home page first</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map((r, i) => {
            const m = modeConfig[r.mode] || modeConfig.audit
            return (
              <div key={i} className="glass border border-white/5 rounded-2xl p-5 flex items-center gap-4 hover:border-white/10 transition-all">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-xl ${m.bg} shrink-0`}>
                  {m.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-indigo-400 font-medium truncate">{r.url}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-xs font-medium ${m.color}`}>{m.label}</span>
                    <span className="text-gray-600 text-xs">·</span>
                    <span className="text-gray-500 text-xs">
                      {r.created_at ? new Date(r.created_at).toLocaleString('en-IN') : 'Just now'}
                    </span>
                  </div>
                  <div className="flex gap-3 mt-1.5">
                    <span className="text-xs text-red-400/70">{r.issues?.length || 0} issues</span>
                    <span className="text-xs text-green-400/70">{r.recommendations?.length || 0} fixes</span>
                  </div>
                </div>
                <div className={`w-14 h-14 rounded-xl border flex items-center justify-center shrink-0 ${scoreBg(r.score)}`}>
                  <span className={`text-2xl font-bold ${scoreColor(r.score)}`}>{r.score ?? '—'}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}