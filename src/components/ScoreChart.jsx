import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function ScoreChart({ history }) {
  if (!history || history.length === 0) return null

  const data = history.slice(0, 6).map(h => ({
    mode: h.mode.toUpperCase(),
    score: h.score || 0,
  }))

  const colors = ['#6366f1', '#a855f7', '#ec4899', '#06b6d4']

  return (
    <div className="glass border border-white/5 rounded-2xl p-6 mt-5">
      <h3 className="text-gray-300 font-semibold mb-5">📊 Score History</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="mode" tick={{ fill: '#9ca3af', fontSize: 12 }} />
          <YAxis domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 12 }} />
          <Tooltip
            contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8 }}
            labelStyle={{ color: '#fff' }}
          />
          <Bar dataKey="score" radius={[6, 6, 0, 0]}>
            {data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}