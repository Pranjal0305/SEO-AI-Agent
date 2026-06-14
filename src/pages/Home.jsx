import React, { useState } from 'react'
import AuditForm from '../components/AuditForm'
import Dashboard from '../components/Dashboard'
import { runAudit } from '../lib/api'

export default function Home() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAudit = async (url, mode) => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await runAudit(url, mode)
      setResult(data)
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || 'Unknown error'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <div className="relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 pt-16 pb-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono mb-4">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
              Powered by Groq · llama-3.3-70b-versatile
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">
              SEO{' '}
              <span className="text-gradient">AI Agent</span>
            </h1>
            <p className="text-gray-400 text-base leading-relaxed max-w-lg mx-auto">
              Instant AI-powered SEO analysis. Paste any URL, choose your analysis mode, and get actionable insights in seconds.
            </p>
          </div>

          {/* Form card */}
          <div className="glass rounded-2xl border border-gray-800 p-6 border-glow">
            <AuditForm onSubmit={handleAudit} loading={loading} />
          </div>

          {/* Loading overlay message */}
          {loading && (
            <div className="mt-6 rounded-2xl border border-teal-900/40 bg-teal-950/20 p-5 flex items-center gap-4 animate-fade-in">
              <div className="flex-shrink-0">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 rounded-full border-2 border-teal-500/30 animate-ping" />
                  <div className="absolute inset-0 rounded-full border-2 border-t-teal-400 animate-spin" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-teal-300">Analyzing with AI…</p>
                <p className="text-xs text-gray-500 mt-0.5">This may take 5–15 seconds. Groq LLM is processing your request.</p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-2xl border border-red-900/40 bg-red-950/20 p-4 animate-fade-in">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-red-300">Analysis Failed</p>
                  <p className="text-xs text-gray-400 mt-1 font-mono break-all">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="mt-6">
              <Dashboard result={result} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
