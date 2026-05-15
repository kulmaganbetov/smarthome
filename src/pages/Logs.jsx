import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Filter, Terminal } from 'lucide-react'
import Panel from '../components/common/Panel.jsx'
import { useSecurity } from '../context/SecurityContext.jsx'

const LEVELS = {
  all: { label: 'All', color: 'text-slate-300' },
  info: { label: 'Info', color: 'text-cyber-cyan' },
  warn: { label: 'Warn', color: 'text-cyber-yellow' },
  danger: { label: 'Danger', color: 'text-cyber-red' },
}

export default function Logs() {
  const { logs } = useSecurity()
  const [filter, setFilter] = useState('all')
  const filtered = useMemo(() => (filter === 'all' ? logs : logs.filter((l) => l.level === filter)), [logs, filter])

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-[10px] uppercase tracking-[0.4em] text-cyber-cyan">SIEM</p>
        <h1 className="font-display text-3xl font-bold">Event Logs</h1>
        <p className="text-sm text-slate-400">Continuous append-only stream from the edge gateway and AI engine.</p>
      </motion.div>

      <Panel
        title="Live Console"
        subtitle="press · scroll · investigate"
        actions={
          <div className="flex items-center gap-2 text-xs">
            <Filter className="h-3.5 w-3.5 text-cyber-cyan" />
            {Object.entries(LEVELS).map(([k, v]) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`rounded-full border px-3 py-1.5 uppercase tracking-widest text-[10px] ${
                  filter === k ? 'border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan' : 'border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        }
      >
        <div className="relative rounded-xl border border-cyber-cyan/15 bg-cyber-bg/60 p-4 font-mono text-[12px]">
          <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-widest text-cyber-cyan">
            <Terminal className="h-3 w-3" /> tail -f /var/log/smarthomekz/edge.stream
            <span className="ml-auto flex items-center gap-2 text-cyber-green"><Activity className="h-3 w-3" /> stream live</span>
          </div>
          <div className="max-h-[28rem] overflow-y-auto pr-2 space-y-1">
            {filtered.map((l) => (
              <motion.div
                key={l.id}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-3"
              >
                <span className="text-slate-500">{new Date(l.t).toLocaleTimeString('en-GB')}</span>
                <span className={`w-16 uppercase ${LEVELS[l.level]?.color ?? 'text-slate-300'}`}>[{l.level}]</span>
                <span className="text-slate-200">{l.msg}</span>
              </motion.div>
            ))}
            {filtered.length === 0 && <p className="text-slate-500">Stream idle…</p>}
          </div>
        </div>
      </Panel>
    </div>
  )
}
