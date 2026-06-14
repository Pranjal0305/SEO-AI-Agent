import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60s timeout for LLM calls
})

/**
 * Run a new SEO audit
 * @param {string} url - The URL to audit
 * @param {string} mode - "audit" | "geo" | "competitor" | "cluster"
 * @returns {Promise<AuditResult>}
 */
export const runAudit = async (url, mode = 'audit') => {
  const { data } = await api.post('/audit/', { url, mode })
  return data
}

/**
 * Fetch all past audits
 * @returns {Promise<{audits: AuditResult[]}>}
 */
export const getAuditHistory = async () => {
  const { data } = await api.get('/audit/history')
  return data
}

/**
 * Fetch aggregated reports
 * @returns {Promise<ReportSummary>}
 */
export const getReports = async () => {
  const { data } = await api.get('/reports/')
  return data
}

export default api
