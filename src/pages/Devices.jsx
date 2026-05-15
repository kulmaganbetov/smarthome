import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { Filter, Search } from 'lucide-react'
import Panel from '../components/common/Panel.jsx'
import DevicePanel from '../components/scheme/DevicePanel.jsx'
import { useSecurity } from '../context/SecurityContext.jsx'
import { DEVICE_TYPES, ROOMS } from '../data/devices.js'

const STATUS_LABELS = {
  all: 'All Statuses',
  green: 'Secure',
  yellow: 'Suspicious',
  red: 'Under Attack',
  gray: 'Offline',
}

export default function Devices() {
  const { devices } = useSecurity()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [room, setRoom] = useState('all')
  const [active, setActive] = useState(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return devices.filter((d) => {
      if (status !== 'all' && d.status !== status) return false
      if (room !== 'all' && d.room !== room) return false
      if (q && !`${d.name} ${d.ip} ${d.id}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [devices, search, status, room])

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-[10px] uppercase tracking-[0.4em] text-cyber-cyan">Asset Inventory</p>
        <h1 className="font-display text-3xl font-bold">IoT Device Registry</h1>
        <p className="text-sm text-slate-400">Every connected node. Filter, search, inspect, control.</p>
      </motion.div>

      <Panel>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-1 min-w-[220px] items-center gap-2 rounded-lg border border-white/10 bg-cyber-bg/60 px-3 py-2">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, IP, ID…"
              className="flex-1 bg-transparent text-sm placeholder:text-slate-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Filter className="h-3.5 w-3.5 text-cyber-cyan" />
            {Object.entries(STATUS_LABELS).map(([k, v]) => (
              <button
                key={k}
                onClick={() => setStatus(k)}
                className={`rounded-full border px-3 py-1.5 uppercase tracking-widest text-[10px] ${
                  status === k ? 'border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan' : 'border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <select
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="rounded-lg border border-white/10 bg-cyber-bg/60 px-3 py-2 text-xs text-slate-200"
          >
            <option value="all">All Rooms</option>
            {ROOMS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </Panel>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((d) => {
          const meta = DEVICE_TYPES[d.type] ?? { icon: 'Cpu', label: 'Device' }
          const Icon = LucideIcons[meta.icon] ?? LucideIcons.Cpu
          return (
            <motion.button
              key={d.id}
              layout
              onClick={() => setActive(d)}
              whileHover={{ y: -3 }}
              className="glass group relative overflow-hidden rounded-xl p-4 text-left transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                      d.status === 'red'
                        ? 'border-cyber-red/50 text-cyber-red bg-cyber-red/10'
                        : d.status === 'yellow'
                        ? 'border-cyber-yellow/50 text-cyber-yellow bg-cyber-yellow/10'
                        : d.status === 'gray'
                        ? 'border-slate-500/40 text-slate-400 bg-slate-500/10'
                        : 'border-cyber-green/40 text-cyber-green bg-cyber-green/10'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{meta.label}</p>
                    <p className="text-sm font-semibold text-white">{d.name}</p>
                  </div>
                </div>
                <span className={`status-dot ${d.status}`} />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] uppercase tracking-widest text-slate-400">
                <div className="rounded border border-white/5 bg-white/[0.02] px-2 py-1.5">
                  <p>IP</p>
                  <p className="font-mono text-slate-200 text-[11px] normal-case tracking-normal">{d.ip}</p>
                </div>
                <div className="rounded border border-white/5 bg-white/[0.02] px-2 py-1.5">
                  <p>CPU</p>
                  <p className="font-mono text-cyber-cyan text-[11px] normal-case tracking-normal">{d.cpu}%</p>
                </div>
                <div className="rounded border border-white/5 bg-white/[0.02] px-2 py-1.5">
                  <p>Traffic</p>
                  <p className="font-mono text-cyber-cyan text-[11px] normal-case tracking-normal">{d.traffic} KB/s</p>
                </div>
                <div className="rounded border border-white/5 bg-white/[0.02] px-2 py-1.5">
                  <p>Threat</p>
                  <p
                    className={`font-mono text-[11px] normal-case tracking-normal ${
                      d.threatScore > 60 ? 'text-cyber-red' : d.threatScore > 25 ? 'text-cyber-yellow' : 'text-cyber-green'
                    }`}
                  >
                    {d.threatScore}
                  </p>
                </div>
              </div>

              <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </motion.button>
          )
        })}
      </div>

      <DevicePanel device={active} onClose={() => setActive(null)} />
    </div>
  )
}
