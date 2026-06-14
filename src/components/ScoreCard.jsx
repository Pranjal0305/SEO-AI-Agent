import React from 'react'

const getScoreConfig = (score) => {
  if (score >= 70) return {
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/30',
    ring: 'rgba(52,211,153,0.4)',
    label: 'Excellent',
    emoji: '🟢',
    bar: 'bg-emerald-400',
  }
  if (score >= 40) return {
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/30',
    ring: 'rgba(251,191,36,0.4)',
    label: 'Needs Work',
    emoji: '🟡',
    bar: 'bg-amber-400',
  }
  return {
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    border: 'border-red-400/30',
    ring: 'rgba(248,113,113,0.4)',
    label: 'Critical',
    emoji: '🔴',
    bar: 'bg-red-400',
  }
}

const MODE_LABELS = {
  audit: 'Technical Audit',
  geo: 'Geo / Local SEO',
  competitor: 'Competitor Analysis',
  cluster: 'Content Cluster',
}

export default function ScoreCard({ score, mode, url }) {
  const config = getScoreConfig(score)

  return (
    <div className={`relative rounded-2xl border ${config.border} ${config.bg} p-6 animate-slide-up`}>
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none"
        style={{ boxShadow: `0 0 40px ${config.ring}` }}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Score circle */}
        <div className="flex-shrink-0">
          <div className={`relative w-28 h-28 rounded-full border-4 ${config.border} flex flex-col items-center justify-center`}
               style={{ boxShadow: `0 0 24px ${config.ring}` }}>
            <span className={`text-4xl font-bold font-mono ${config.color}`}>{score}</span>
            <span className="text-xs text-gray-500 mt-0.5">/ 100</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm">{config.emoji}</span>
            <span className={`text-sm font-semibold uppercase tracking-widest ${config.color}`}>
              {config.label}
            </span>
          </div>
          <p className="text-xs text-gray-500 font-mono truncate mb-1">{url}</p>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700">
            {MODE_LABELS[mode] || mode}
          </span>

          {/* Progress bar */}
          <div className="mt-3 h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${config.bar} rounded-full transition-all duration-1000 ease-out`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
