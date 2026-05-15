import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  ChevronRight,
  Cpu,
  Globe2,
  Hash,
  KeySquare,
  Lock,
  Power,
  RefreshCw,
  ShieldOff,
  Siren,
  Skull,
  Timer,
  Wifi,
  X,
  Zap,
} from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { DEVICE_TYPES, ATTACK_TYPES } from '../../data/devices.js'
import { useSecurity } from '../../context/SecurityContext.jsx'

const STATUS = {
  green: { label: 'Secure', text: 'text-cyber-green', tag: 'bg-cyber-green/15 border-cyber-green/40' },
  yellow: { label: 'Suspicious', text: 'text-cyber-yellow', tag: 'bg-cyber-yellow/15 border-cyber-yellow/40' },
  red: { label: 'Under Attack', text: 'text-cyber-red', tag: 'bg-cyber-red/15 border-cyber-red/40' },
  gray: { label: 'Offline', text: 'text-slate-400', tag: 'bg-slate-500/15 border-slate-500/40' },
}

function formatRelative(ts) {
  const diff = Math.max(0, Math.floor((Date.now() - ts) / 1000))
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  return `${Math.floor(diff / 3600)}h ago`
}

function Metric({ label, value, accent = 'cyan', max = 100, suffix = '%' }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-slate-400">
        <span>{label}</span>
        <span className={`font-mono text-cyber-${accent}`}>{value}{suffix}</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded bg-cyber-panel">
        <motion.div
          className={`h-full bg-gradient-to-r ${accent === 'red' ? 'from-cyber-red to-cyber-pink' : accent === 'green' ? 'from-cyber-green to-cyber-cyan' : 'from-cyber-cyan to-cyber-purple'}`}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  )
}

export default function DevicePanel({ device, onClose }) {
  const { toggleDevice, rebootDevice, isolateDevice, blockIp, refreshKey, launchAttack } = useSecurity()
  const meta = device ? DEVICE_TYPES[device.type] ?? { label: 'Device', icon: 'Cpu' } : null
  const Icon = meta ? LucideIcons[meta.icon] ?? LucideIcons.Cpu : LucideIcons.Cpu
  const s = device ? STATUS[device.status] : null

  return (
    <AnimatePresence>
      {device && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            key={device.id}
            initial={{ x: '110%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '110%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col glass-strong border-l border-cyber-cyan/25"
          >
            <header className="relative flex items-start justify-between border-b border-white/5 p-5">
              <div className="absolute inset-0 scanline pointer-events-none opacity-50" />
              <div className="relative flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${s.tag} ${s.text}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400">{meta.label}</p>
                  <h2 className="font-display text-lg font-bold">{device.name}</h2>
                  <p className="mt-1 inline-flex items-center gap-2 text-xs">
                    <span className={`status-dot ${device.status}`} />
                    <span className={`uppercase tracking-widest ${s.text}`}>{s.label}</span>
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <section className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { Icon: Hash, label: 'Device ID', value: device.id },
                  { Icon: Globe2, label: 'IP Address', value: device.ip },
                  { Icon: Wifi, label: 'MAC', value: device.mac },
                  { Icon: Lock, label: 'Encryption', value: device.encryption },
                  { Icon: Cpu, label: 'Firmware', value: device.firmware },
                  { Icon: Timer, label: 'Last Activity', value: formatRelative(device.lastActivity) },
                ].map((it) => (
                  <div key={it.label} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400">
                      <it.Icon className="h-3 w-3 text-cyber-cyan" /> {it.label}
                    </div>
                    <p className="mt-1 font-mono text-[12px] text-slate-100 break-all">{it.value}</p>
                  </div>
                ))}
              </section>

              <section className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.3em] text-cyber-cyan/80">Telemetry</p>
                <div className="space-y-2">
                  <Metric label="CPU Usage" value={device.cpu} accent={device.cpu > 75 ? 'red' : 'cyan'} />
                  <Metric label="Network Traffic" value={device.traffic} max={420} suffix=" KB/s" accent="cyan" />
                  <Metric
                    label="Threat Score"
                    value={device.threatScore}
                    accent={device.threatScore > 60 ? 'red' : device.threatScore > 25 ? 'yellow' : 'green'}
                  />
                </div>
              </section>

              <section className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.3em] text-cyber-cyan/80">Controls</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Action onClick={() => toggleDevice(device.id)} icon={Power} label={device.status === 'gray' ? 'Power On' : 'Turn Off'} />
                  <Action onClick={() => rebootDevice(device.id)} icon={RefreshCw} label="Reboot" />
                  <Action onClick={() => isolateDevice(device.id)} icon={ShieldOff} label="Isolate" tone="yellow" />
                  <Action onClick={() => blockIp(device.id)} icon={Siren} label="Block IP" tone="red" />
                  <Action onClick={() => refreshKey(device.id)} icon={KeySquare} label="Rotate Key" tone="purple" full />
                </div>
              </section>

              <section className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.3em] text-cyber-red/80">Red Team Simulation</p>
                <div className="grid grid-cols-2 gap-2">
                  {ATTACK_TYPES.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => launchAttack(device.id, a.id)}
                      className="group flex items-center justify-between rounded-lg border border-cyber-red/25 bg-cyber-red/5 px-3 py-2 text-left text-xs transition hover:bg-cyber-red/15"
                    >
                      <span className="flex items-center gap-2 text-cyber-red">
                        <Skull className="h-3.5 w-3.5" /> {a.label}
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-cyber-red opacity-60 group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-2 rounded-lg border border-cyber-cyan/15 bg-cyber-cyan/[0.04] p-3">
                <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cyber-cyan">
                  <Activity className="h-3 w-3" /> Behavioural fingerprint
                </p>
                <div className="grid grid-cols-12 gap-0.5">
                  {Array.from({ length: 60 }).map((_, i) => (
                    <span
                      key={i}
                      className="h-6 rounded-sm"
                      style={{
                        background: `rgba(0,240,255,${0.1 + Math.random() * 0.7})`,
                        opacity: device.status === 'gray' ? 0.15 : 1,
                      }}
                    />
                  ))}
                </div>
              </section>
            </div>

            <footer className="border-t border-white/5 px-5 py-3 text-[10px] uppercase tracking-widest text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-2 text-cyber-cyan/80">
                <Zap className="h-3 w-3" /> Stream channel: <span className="font-mono">tls://hub.smarthome.kz:8883</span>
              </span>
              <span>v{device.firmware}</span>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function Action({ icon: Icon, label, onClick, tone = 'cyan', full = false }) {
  const tones = {
    cyan: 'border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/15',
    red: 'border-cyber-red/40 text-cyber-red hover:bg-cyber-red/15',
    yellow: 'border-cyber-yellow/40 text-cyber-yellow hover:bg-cyber-yellow/15',
    purple: 'border-cyber-purple/40 text-cyber-purple hover:bg-cyber-purple/15',
  }
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-lg border bg-white/[0.02] px-3 py-2.5 transition ${tones[tone]} ${full ? 'col-span-2' : ''}`}
    >
      <Icon className="h-3.5 w-3.5" /> <span className="uppercase tracking-widest text-[10px]">{label}</span>
    </button>
  )
}
