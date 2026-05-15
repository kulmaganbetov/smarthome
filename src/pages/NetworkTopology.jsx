import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { Cloud, Cpu, Globe, ServerCog, Shield } from 'lucide-react'
import Panel from '../components/common/Panel.jsx'
import DevicePanel from '../components/scheme/DevicePanel.jsx'
import { useSecurity } from '../context/SecurityContext.jsx'
import { DEVICE_TYPES } from '../data/devices.js'

const COLORS = {
  green: '#00ff9d',
  yellow: '#ffd60a',
  red: '#ff2d55',
  gray: '#64748b',
}

export default function NetworkTopology() {
  const { devices } = useSecurity()
  const [active, setActive] = useState(null)

  const layout = useMemo(() => {
    // central server -> mqtt broker -> devices around an inner circle
    const center = { x: 50, y: 50 }
    const broker = { x: 50, y: 28 }
    const cloud = { x: 22, y: 22 }
    const internet = { x: 78, y: 22 }
    const n = devices.length
    const placed = devices.map((d, i) => {
      const angle = (i / n) * Math.PI * 2 + Math.PI / 2
      const radius = 32
      return {
        ...d,
        nx: center.x + Math.cos(angle) * radius,
        ny: center.y + Math.sin(angle) * radius * 0.78,
      }
    })
    return { center, broker, cloud, internet, devices: placed }
  }, [devices])

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-[10px] uppercase tracking-[0.4em] text-cyber-cyan">Mesh Map</p>
        <h1 className="font-display text-3xl font-bold">Network Topology</h1>
        <p className="text-sm text-slate-400">Encrypted MQTT/TLS channels between every IoT actor in the home.</p>
      </motion.div>

      <Panel title="Live Topology" subtitle="Click a node to inspect">
        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-25" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0,240,255,0.6)" />
                <stop offset="100%" stopColor="rgba(0,240,255,0)" />
              </radialGradient>
              <linearGradient id="link" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="rgba(0,240,255,0.1)" />
                <stop offset="50%" stopColor="rgba(0,240,255,0.7)" />
                <stop offset="100%" stopColor="rgba(0,240,255,0.1)" />
              </linearGradient>
              <linearGradient id="linkRed" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="rgba(255,45,85,0.1)" />
                <stop offset="50%" stopColor="rgba(255,45,85,0.9)" />
                <stop offset="100%" stopColor="rgba(255,45,85,0.1)" />
              </linearGradient>
            </defs>

            {/* Center glow */}
            <circle cx={layout.center.x} cy={layout.center.y} r="22" fill="url(#centerGlow)" />

            {/* Cloud / Internet -> Broker */}
            <line x1={layout.cloud.x} y1={layout.cloud.y} x2={layout.broker.x} y2={layout.broker.y} stroke="url(#link)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
            <line x1={layout.internet.x} y1={layout.internet.y} x2={layout.broker.x} y2={layout.broker.y} stroke="url(#link)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
            {/* Broker -> Core */}
            <line x1={layout.broker.x} y1={layout.broker.y} x2={layout.center.x} y2={layout.center.y} stroke="url(#link)" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />

            {/* Core -> devices */}
            {layout.devices.map((d) => {
              const stroke = d.status === 'red' ? 'url(#linkRed)' : d.status === 'yellow' ? 'rgba(255,214,10,0.55)' : d.status === 'gray' ? 'rgba(100,116,139,0.25)' : 'url(#link)'
              return (
                <line
                  key={d.id}
                  x1={layout.center.x}
                  y1={layout.center.y}
                  x2={d.nx}
                  y2={d.ny}
                  stroke={stroke}
                  strokeWidth={d.status === 'red' ? 0.45 : 0.2}
                  strokeDasharray={d.status === 'red' ? '0.5 0.4' : undefined}
                  vectorEffect="non-scaling-stroke"
                />
              )
            })}
          </svg>

          {/* Floating packets along device links */}
          {layout.devices.filter((d) => d.status !== 'gray').slice(0, 14).map((d, i) => (
            <motion.span
              key={d.id}
              className="absolute h-1.5 w-1.5 rounded-full"
              style={{
                background: d.status === 'red' ? '#ff2d55' : d.status === 'yellow' ? '#ffd60a' : '#00f0ff',
                boxShadow: d.status === 'red' ? '0 0 10px #ff2d55' : '0 0 8px #00f0ff',
              }}
              initial={{
                left: `calc(${layout.center.x}% - 3px)`,
                top: `calc(${layout.center.y}% - 3px)`,
                opacity: 0,
              }}
              animate={{
                left: [`calc(${layout.center.x}% - 3px)`, `calc(${d.nx}% - 3px)`],
                top: [`calc(${layout.center.y}% - 3px)`, `calc(${d.ny}% - 3px)`],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.8 + (i % 4) * 0.3,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}

          {/* Core node */}
          <Node label="Core Server" sublabel="iot-core.smarthome.kz" Icon={ServerCog} x={layout.center.x} y={layout.center.y} accent="cyan" big />
          <Node label="MQTT Broker" sublabel=":8883 · TLS" Icon={Shield} x={layout.broker.x} y={layout.broker.y} accent="purple" />
          <Node label="Cloud Sync" sublabel="encrypted" Icon={Cloud} x={layout.cloud.x} y={layout.cloud.y} accent="cyan" small />
          <Node label="Internet" sublabel="edge ingress" Icon={Globe} x={layout.internet.x} y={layout.internet.y} accent="cyan" small />

          {/* IoT device nodes */}
          {layout.devices.map((d) => {
            const meta = DEVICE_TYPES[d.type] ?? { icon: 'Cpu', label: 'Device' }
            const Icon = LucideIcons[meta.icon] ?? LucideIcons.Cpu
            return (
              <button
                key={d.id}
                onClick={() => setActive(d)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${d.nx}%`, top: `${d.ny}%` }}
              >
                <span className="absolute inset-0 rounded-full" style={{ boxShadow: `0 0 16px ${COLORS[d.status]}` }} />
                {d.status !== 'gray' && (
                  <span
                    className="absolute -inset-2 rounded-full animate-ping"
                    style={{ background: `${COLORS[d.status]}15`, border: `1px solid ${COLORS[d.status]}66` }}
                  />
                )}
                <span
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border bg-cyber-bg/85 group-hover:scale-110 transition"
                  style={{ borderColor: COLORS[d.status], color: COLORS[d.status] }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span
                  className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-black/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest"
                  style={{ color: COLORS[d.status] }}
                >
                  {d.name}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-3 flex flex-wrap gap-4 text-[10px] uppercase tracking-widest">
          <span className="flex items-center gap-2 text-cyber-green"><span className="status-dot green" /> Encrypted Channel</span>
          <span className="flex items-center gap-2 text-cyber-yellow"><span className="status-dot yellow" /> Suspicious Traffic</span>
          <span className="flex items-center gap-2 text-cyber-red"><span className="status-dot red" /> Compromised Link</span>
          <span className="flex items-center gap-2 text-slate-400"><span className="status-dot gray" /> Offline</span>
        </div>
      </Panel>

      <div className="grid gap-4 md:grid-cols-3">
        <Panel title="Mesh Layers">
          <ul className="space-y-2 text-xs">
            {[
              { Icon: Globe, label: 'Edge Ingress', value: '1 · WAF Active' },
              { Icon: Shield, label: 'TLS / MQTT Broker', value: '1.3 · mTLS' },
              { Icon: ServerCog, label: 'IoT Core Server', value: 'iot-core.smarthome.kz' },
              { Icon: Cpu, label: 'IoT Devices', value: `${devices.length} nodes` },
            ].map((row) => (
              <li key={row.label} className="flex items-center justify-between rounded border border-white/5 bg-white/[0.02] px-3 py-2 text-slate-300">
                <span className="flex items-center gap-2"><row.Icon className="h-3.5 w-3.5 text-cyber-cyan" /> {row.label}</span>
                <span className="font-mono text-[10px] text-cyber-cyan">{row.value}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Encryption Channels" className="md:col-span-2">
          <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
            {devices.slice(0, 9).map((d) => (
              <div key={d.id} className="rounded border border-cyber-cyan/15 bg-cyber-cyan/[0.03] px-3 py-2">
                <p className="font-mono text-[10px] text-slate-500">{d.ip}</p>
                <p className="truncate text-slate-200">{d.name}</p>
                <div className="mt-1 flex items-center gap-2 text-[10px] uppercase tracking-widest">
                  <span className={`status-dot ${d.status}`} />
                  <span className="text-cyber-cyan">{d.encryption}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <DevicePanel device={active} onClose={() => setActive(null)} />
    </div>
  )
}

function Node({ label, sublabel, Icon, x, y, accent = 'cyan', big = false, small = false }) {
  const size = big ? 'h-16 w-16' : small ? 'h-10 w-10' : 'h-12 w-12'
  const iconSize = big ? 'h-7 w-7' : small ? 'h-4 w-4' : 'h-5 w-5'
  return (
    <div className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: `${x}%`, top: `${y}%` }}>
      <span className={`relative inline-flex ${size} items-center justify-center rounded-full glass border border-cyber-${accent}/50 text-cyber-${accent} glow-${accent}`}>
        <Icon className={iconSize} />
        {big && (
          <motion.span
            className="absolute inset-0 rounded-full border border-cyber-cyan/40"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}
      </span>
      <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.25em] text-cyber-cyan">{label}</div>
      {sublabel && <div className="text-[9px] text-slate-500">{sublabel}</div>}
    </div>
  )
}
