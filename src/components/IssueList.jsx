import React from 'react'

export default function IssueList({ issues = [], recommendations = [] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up">
      {/* Issues */}
      <div className="rounded-2xl border border-red-900/40 bg-red-950/20 p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-red-300">Issues Found</h3>
            <p className="text-xs text-gray-500">{issues.length} problem{issues.length !== 1 ? 's' : ''} detected</p>
          </div>
        </div>

        {issues.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No issues found.</p>
        ) : (
          <ul className="space-y-2">
            {issues.map((issue, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 text-xs font-mono mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{issue}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recommendations */}
      <div className="rounded-2xl border border-emerald-900/40 bg-emerald-950/20 p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-emerald-300">Recommendations</h3>
            <p className="text-xs text-gray-500">{recommendations.length} action{recommendations.length !== 1 ? 's' : ''} suggested</p>
          </div>
        </div>

        {recommendations.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No recommendations available.</p>
        ) : (
          <ul className="space-y-2">
            {recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs mt-0.5">
                  ✓
                </span>
                <span className="leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
