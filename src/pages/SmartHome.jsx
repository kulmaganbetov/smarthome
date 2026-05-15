import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, Maximize2 } from 'lucide-react'
import Panel from '../components/common/Panel.jsx'
import HouseScheme from '../components/scheme/HouseScheme.jsx'
import DevicePanel from '../components/scheme/DevicePanel.jsx'
import { useSecurity } from '../context/SecurityContext.jsx'
import { ROOMS } from '../data/devices.js'

export default function SmartHome() {
  const { devices, stats } = useSecurity()
  const [active, setActive] = useState(null)
  const [filter, setFilter] = useState('all')

  const filtered = devices.filter((d) => filter === 'all' || d.room === filter)

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-cyber-cyan">Floor Plan</p>
          <h1 className="font-display text-3xl font-bold">Smart Home Layout</h1>
          <p className="text-sm text-slate-400">Tap any device to inspect telemetry, run controls or simulate threats.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Filter className="h-3.5 w-3.5 text-cyber-cyan" />
          <button
            onClick={() => setFilter('all')}
            className={`rounded-full px-3 py-1.5 uppercase tracking-widest text-[10px] border ${filter === 'all' ? 'border-cyber-cyan text-cyber-cyan bg-cyber-cyan/10' : 'border-white/10 text-slate-400 hover:text-white'}`}
          >
            All
          </button>
          {ROOMS.map((r) => (
            <button
              key={r.id}
              onClick={() => setFilter(r.id)}
              className={`rounded-full px-3 py-1.5 uppercase tracking-widest text-[10px] border ${filter === r.id ? 'border-cyber-cyan text-cyber-cyan bg-cyber-cyan/10' : 'border-white/10 text-slate-400 hover:text-white'}`}
            >
              {r.name}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-4">
        <Panel
          title="Live Floor Plan"
          subtitle="Top-view smart house · interactive"
          className="lg:col-span-3"
          actions={
            <span className="text-[10px] uppercase tracking-widest text-slate-400 flex items-center gap-1">
              <Maximize2 className="h-3.5 w-3.5" /> {filtered.length} devices
            </span>
          }
        >
          <HouseScheme devices={devices} onDeviceClick={setActive} />
        </Panel>

        <div className="space-y-4">
          <Panel title="Status Distribution">
            <div className="space-y-2 text-xs">
              {[
                { label: 'Secure', dot: 'green', value: stats.secure, color: 'text-cyber-green' },
                { label: 'Suspicious', dot: 'yellow', value: stats.suspicious, color: 'text-cyber-yellow' },
                { label: 'Under Attack', dot: 'red', value: stats.underAttack, color: 'text-cyber-red' },
                { label: 'Offline', dot: 'gray', value: stats.total - stats.online, color: 'text-slate-400' },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between rounded border border-white/5 bg-white/[0.02] px-3 py-2">
                  <span className="flex items-center gap-2 text-slate-300">
                    <span className={`status-dot ${row.dot}`} /> {row.label}
                  </span>
                  <span className={`font-display text-lg ${row.color}`}>{row.value}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Devices in View">
            <ul className="max-h-72 space-y-1.5 overflow-y-auto pr-1 text-xs">
              {filtered.map((d) => (
                <li
                  key={d.id}
                  onClick={() => setActive(d)}
                  className="flex cursor-pointer items-center justify-between rounded-md border border-white/5 bg-white/[0.02] px-3 py-2 transition hover:border-cyber-cyan/40 hover:bg-cyber-cyan/[0.04]"
                >
                  <div>
                    <p className="font-medium text-slate-200">{d.name}</p>
                    <p className="font-mono text-[10px] text-slate-500">{d.ip}</p>
                  </div>
                  <span className={`status-dot ${d.status}`} />
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>

      <DevicePanel device={active} onClose={() => setActive(null)} />
    </div>
  )
}
