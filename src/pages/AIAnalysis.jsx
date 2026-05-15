import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Bot, BrainCircuit, Cpu, Eye, Radar, Sparkles, Waves, Workflow } from 'lucide-react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Panel from '../components/common/Panel.jsx'
import { useSecurity } from '../context/SecurityContext.jsx'

export default function AIAnalysis() {
  const { aiInsights, metrics, stats, devices } = useSecurity()

  const series = useMemo(
    () =>
      metrics.map((m, i) => ({
        idx: i,
        anomaly: Math.min(100, Math.round(20 + Math.sin(i / 3) * 15 + (m.threats * 8) + Math.random() * 5)),
        confidence: Math.min(100, Math.round(86 + Math.sin(i / 5) * 4)),
      })),
    [metrics],
  )

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-[10px] uppercase tracking-[0.4em] text-cyber-purple">Neural Defense</p>
        <h1 className="font-display text-3xl font-bold">AI Threat Analysis</h1>
        <p className="text-sm text-slate-400">Behavioural baselines and live anomaly classification across every device fingerprint.</p>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Neural Scanner" subtitle="Pattern · classification · scoring" className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-xl border border-cyber-purple/20 bg-cyber-purple/[0.03] p-4">
            <div className="absolute inset-0 grid-bg opacity-25" />
            <div className="absolute inset-0 scanline opacity-40 pointer-events-none" />

            <div className="relative grid items-center gap-4 md:grid-cols-[1fr_240px]">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyber-purple/40 bg-cyber-purple/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-cyber-purple">
                  <Sparkles className="h-3 w-3" /> Engine · GRYPHON-v3
                </div>
                <p className="text-sm text-slate-200">
                  Aggregating 2.1M packet samples / s across {devices.length} devices. The neural mesh continuously verifies a behavioural
                  baseline per node and triggers immediate countermeasures on anomalies above 3.5σ.
                </p>
                <div className="grid grid-cols-3 gap-2 text-[10px] uppercase tracking-widest">
                  {[
                    { l: 'Models', v: '12' },
                    { l: 'Vectors', v: '38' },
                    { l: 'Accuracy', v: '99.4%' },
                  ].map((s) => (
                    <div key={s.l} className="rounded border border-white/10 bg-white/[0.02] p-2 text-center">
                      <p className="text-slate-400">{s.l}</p>
                      <p className="font-display text-base text-cyber-cyan">{s.v}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative aspect-square">
                <motion.div
                  className="absolute inset-2 rounded-full border-2 border-cyber-cyan/60"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-6 rounded-full border-2 border-cyber-purple/60"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-10 rounded-full border border-cyber-cyan/40"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <BrainCircuit className="absolute inset-0 m-auto h-12 w-12 text-cyber-cyan neon-text" />
                <motion.span
                  className="absolute left-0 right-0 h-px bg-cyber-cyan/80"
                  animate={{ top: ['10%', '90%', '10%'] }}
                  transition={{ duration: 3.6, repeat: Infinity }}
                  style={{ boxShadow: '0 0 12px #00f0ff' }}
                />
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Posture Snapshot">
          <ul className="space-y-2 text-xs">
            {[
              { Icon: Eye, label: 'Devices Watched', value: devices.length },
              { Icon: Cpu, label: 'Models Live', value: 12 },
              { Icon: Waves, label: 'Anomaly Window', value: '60 s' },
              { Icon: Workflow, label: 'Auto-mitigations', value: '∞' },
              { Icon: Radar, label: 'Threats Active', value: stats.underAttack },
            ].map((r) => (
              <li key={r.label} className="flex items-center justify-between rounded border border-white/5 bg-white/[0.02] px-3 py-2 text-slate-300">
                <span className="flex items-center gap-2"><r.Icon className="h-3.5 w-3.5 text-cyber-purple" /> {r.label}</span>
                <span className="font-display text-base text-cyber-cyan">{r.value}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Anomaly Confidence" subtitle="Streaming inference per second">
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="rgba(168,85,247,0.08)" strokeDasharray="3 3" />
              <XAxis dataKey="idx" hide />
              <YAxis stroke="rgba(148,163,184,0.4)" fontSize={10} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ background: 'rgba(7,13,28,0.95)', border: '1px solid rgba(168,85,247,0.4)', borderRadius: 8, fontSize: 12 }}
              />
              <Line type="monotone" dataKey="anomaly" stroke="#ff2d55" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="confidence" stroke="#00f0ff" strokeWidth={2} dot={false} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex gap-4 text-[10px] uppercase tracking-widest">
          <span className="flex items-center gap-2 text-cyber-red"><span className="h-2 w-2 rounded-full bg-cyber-red" /> Anomaly score</span>
          <span className="flex items-center gap-2 text-cyber-cyan"><span className="h-2 w-2 rounded-full bg-cyber-cyan" /> Model confidence</span>
        </div>
      </Panel>

      <Panel title="AI Insight Stream" subtitle="Latest classifications">
        <ul className="grid gap-2 md:grid-cols-2">
          {aiInsights.slice(0, 12).map((a) => (
            <motion.li
              key={a.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative overflow-hidden rounded-lg border p-3 text-xs ${
                a.severity === 'high'
                  ? 'border-cyber-red/40 bg-cyber-red/5'
                  : a.severity === 'warn'
                  ? 'border-cyber-yellow/30 bg-cyber-yellow/5'
                  : 'border-cyber-cyan/20 bg-cyber-cyan/5'
              }`}
            >
              <span
                className={`absolute inset-y-0 left-0 w-0.5 ${
                  a.severity === 'high' ? 'bg-cyber-red' : a.severity === 'warn' ? 'bg-cyber-yellow' : 'bg-cyber-cyan'
                }`}
              />
              <p className="flex items-center gap-2 text-slate-200">
                <Bot className="h-3.5 w-3.5 text-cyber-cyan" /> {a.text}
              </p>
              <p className="mt-1 font-mono text-[10px] text-slate-500">
                {new Date(a.t).toLocaleTimeString('en-GB')} · classifier: behaviour-v3
              </p>
            </motion.li>
          ))}
          {aiInsights.length === 0 && <li className="text-xs text-slate-500">AI is calibrating…</li>}
        </ul>
      </Panel>
    </div>
  )
}
