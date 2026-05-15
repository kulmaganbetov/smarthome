import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Crosshair, Radar, Shield, ShieldAlert, Skull, Target, Zap } from 'lucide-react'
import Panel from '../components/common/Panel.jsx'
import { useSecurity } from '../context/SecurityContext.jsx'
import { ATTACK_TYPES } from '../data/devices.js'

export default function AttackCenter() {
  const { devices, attacks, launchAttack, simulateRandomAttack } = useSecurity()
  const [target, setTarget] = useState(devices[0]?.id ?? '')

  const stats = useMemo(() => {
    const active = attacks.filter((a) => a.status === 'active').length
    const mitigated = attacks.filter((a) => a.status === 'mitigated').length
    return { active, mitigated, total: attacks.length }
  }, [attacks])

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-[10px] uppercase tracking-[0.4em] text-cyber-red">Red Team</p>
        <h1 className="font-display text-3xl font-bold">Attack Simulation Center</h1>
        <p className="text-sm text-slate-400">Run controlled red-team scenarios to validate the autonomous defense mesh.</p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Panel title="Active Intrusions">
          <p className="font-display text-4xl text-cyber-red">{stats.active}</p>
          <p className="text-xs text-slate-400">in-progress attacks across mesh</p>
        </Panel>
        <Panel title="Auto-mitigated">
          <p className="font-display text-4xl text-cyber-green">{stats.mitigated}</p>
          <p className="text-xs text-slate-400">neutralised by SmarthomeKZ</p>
        </Panel>
        <Panel title="Total Simulated">
          <p className="font-display text-4xl text-cyber-cyan">{stats.total}</p>
          <p className="text-xs text-slate-400">red-team campaigns</p>
        </Panel>
      </div>

      <Panel title="Launch Simulation" subtitle="Pick a device + vector to drill the defense">
        <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-cyber-cyan">Target Device</p>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-cyber-bg/80 px-3 py-2.5 text-sm text-slate-200 focus:border-cyber-cyan/60 focus:outline-none"
            >
              {devices.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} — {d.ip}
                </option>
              ))}
            </select>
            <button
              onClick={simulateRandomAttack}
              className="mt-3 w-full btn-ghost text-xs"
            >
              <Radar className="h-3.5 w-3.5" /> Random surprise drill
            </button>
          </div>
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-cyber-cyan">Attack Vector</p>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
              {ATTACK_TYPES.map((a) => (
                <button
                  key={a.id}
                  onClick={() => target && launchAttack(target, a.id)}
                  className="group relative overflow-hidden rounded-lg border border-cyber-red/30 bg-cyber-red/5 p-3 text-left transition hover:bg-cyber-red/15"
                >
                  <Skull className="h-4 w-4 text-cyber-red" />
                  <p className="mt-2 text-sm font-semibold text-cyber-red">{a.label}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-cyber-red/70">{a.level} severity</p>
                  <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyber-red to-transparent" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </Panel>

      <Panel title="Attack Timeline" subtitle="Last detections · most recent first">
        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {attacks.map((a) => (
              <motion.div
                key={a.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`flex flex-wrap items-center justify-between gap-3 rounded-lg border px-4 py-3 text-xs ${
                  a.status === 'active' ? 'border-cyber-red/40 bg-cyber-red/[0.06]' : 'border-cyber-green/30 bg-cyber-green/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${a.status === 'active' ? 'bg-cyber-red/15 text-cyber-red' : 'bg-cyber-green/15 text-cyber-green'}`}>
                    {a.status === 'active' ? <ShieldAlert className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-semibold uppercase tracking-widest text-sm">
                      <span className={a.status === 'active' ? 'text-cyber-red' : 'text-cyber-green'}>{a.label}</span>{' '}
                      <span className="text-slate-300">→ {a.deviceName}</span>
                    </p>
                    <p className="font-mono text-[10px] text-slate-500">
                      attacker: {a.attackerIp} · severity: {a.level}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-mono uppercase tracking-widest text-[10px] ${a.status === 'active' ? 'text-cyber-red' : 'text-cyber-green'}`}>
                    {a.status === 'active' ? 'In progress' : 'Mitigated'}
                  </p>
                  <p className="font-mono text-[10px] text-slate-500">{new Date(a.t).toLocaleTimeString('en-GB')}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {attacks.length === 0 && (
            <div className="rounded-lg border border-cyber-green/30 bg-cyber-green/5 p-6 text-center text-cyber-green">
              <Crosshair className="mx-auto h-6 w-6" />
              <p className="mt-2 text-sm">No attacks recorded. Mesh is calm.</p>
              <p className="text-xs text-slate-400">Launch a simulation to drill the defense.</p>
            </div>
          )}
        </div>
      </Panel>
    </div>
  )
}
