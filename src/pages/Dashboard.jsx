import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  Bot,
  Cpu,
  Eye,
  Gauge,
  Network,
  Radar,
  Shield,
  ShieldCheck,
  Skull,
  Wifi,
  Zap,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from 'recharts'
import Panel from '../components/common/Panel.jsx'
import StatCard from '../components/common/StatCard.jsx'
import HouseScheme from '../components/scheme/HouseScheme.jsx'
import DevicePanel from '../components/scheme/DevicePanel.jsx'
import { useSecurity } from '../context/SecurityContext.jsx'
import { ATTACK_TYPES } from '../data/devices.js'

function TimeLabel({ ts }) {
  const d = new Date(ts)
  return <span className="font-mono text-[10px] text-slate-500">{d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
}

export default function Dashboard() {
  const { devices, stats, metrics, attacks, logs, aiInsights, simulateRandomAttack } = useSecurity()
  const [activeDevice, setActiveDevice] = useState(null)

  const trafficSeries = useMemo(
    () => metrics.map((m, i) => ({ idx: i, packets: m.packets, threats: m.threats * 50, network: m.network })),
    [metrics],
  )

  const attackTypeStats = useMemo(() => {
    const counts = ATTACK_TYPES.map((a) => ({ name: a.label.split(' ')[0], v: 0 }))
    attacks.forEach((a) => {
      const idx = ATTACK_TYPES.findIndex((x) => x.id === a.type)
      if (idx >= 0) counts[idx].v += 1
    })
    return counts
  }, [attacks])

  const radial = [
    {
      name: 'score',
      value: stats.securityScore,
      fill: stats.securityScore > 75 ? '#00ff9d' : stats.securityScore > 50 ? '#ffd60a' : '#ff2d55',
    },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap items-end justify-between gap-3"
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-cyber-cyan">Command Center</p>
          <h1 className="font-display text-3xl font-bold">Defense Overview</h1>
          <p className="text-sm text-slate-400">Realtime telemetry from every device, channel and threat in the mesh.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full glass px-3 py-1.5 text-[10px] uppercase tracking-widest text-cyber-green flex items-center gap-2">
            <span className="status-dot green" /> Mesh Online
          </span>
          <span className="rounded-full glass px-3 py-1.5 text-[10px] uppercase tracking-widest text-cyber-cyan flex items-center gap-2">
            <Activity className="h-3 w-3" /> {stats.online}/{stats.total} devices
          </span>
        </div>
      </motion.div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Security Score" value={stats.securityScore} unit="%" icon={ShieldCheck} accent={stats.securityScore > 75 ? 'green' : stats.securityScore > 50 ? 'yellow' : 'red'} />
        <StatCard label="Active Threats" value={stats.underAttack} icon={AlertTriangle} accent={stats.underAttack ? 'red' : 'green'} />
        <StatCard label="Devices Online" value={stats.online} unit={`/ ${stats.total}`} icon={Wifi} accent="cyan" />
        <StatCard label="Packets / sec" value={(metrics.at(-1)?.packets ?? 0).toLocaleString()} icon={Activity} accent="purple" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Network Throughput" subtitle="Aggregated mesh traffic · last 60s" className="lg:col-span-2">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradCyan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00f0ff" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="#00f0ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff2d55" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#ff2d55" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(0,240,255,0.07)" strokeDasharray="3 3" />
                <XAxis dataKey="idx" hide />
                <YAxis stroke="rgba(148,163,184,0.4)" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(7,13,28,0.95)',
                    border: '1px solid rgba(0,240,255,0.3)',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Area type="monotone" dataKey="packets" stroke="#00f0ff" strokeWidth={2} fill="url(#gradCyan)" />
                <Area type="monotone" dataKey="threats" stroke="#ff2d55" strokeWidth={1.5} fill="url(#gradRed)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Security Posture" subtitle="Composite defense score">
          <div className="flex flex-col items-center">
            <div className="relative h-44 w-44">
              <ResponsiveContainer>
                <RadialBarChart innerRadius="78%" outerRadius="100%" data={radial} startAngle={210} endAngle={-30}>
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar dataKey="value" cornerRadius={20} background={{ fill: 'rgba(255,255,255,0.05)' }} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-4xl font-bold">{stats.securityScore}</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Score</span>
              </div>
            </div>
            <div className="mt-2 grid w-full grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-widest">
              <div className="rounded border border-cyber-green/25 bg-cyber-green/5 py-1.5 text-cyber-green">
                Secure {stats.secure}
              </div>
              <div className="rounded border border-cyber-yellow/25 bg-cyber-yellow/5 py-1.5 text-cyber-yellow">
                Watch {stats.suspicious}
              </div>
              <div className="rounded border border-cyber-red/25 bg-cyber-red/5 py-1.5 text-cyber-red">
                Threat {stats.underAttack}
              </div>
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel
          title="Smart Home"
          subtitle="Top-view floor plan · live status"
          className="lg:col-span-2"
          actions={
            <button
              onClick={simulateRandomAttack}
              className="rounded-md border border-cyber-red/40 bg-cyber-red/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-cyber-red hover:bg-cyber-red/20"
            >
              <Radar className="h-3.5 w-3.5 inline mr-1" /> Trigger Attack
            </button>
          }
        >
          <HouseScheme devices={devices} onDeviceClick={setActiveDevice} />
        </Panel>

        <Panel title="AI Threat Stream" subtitle="Behavioural anomaly engine">
          <div className="space-y-2 max-h-[24rem] overflow-y-auto pr-1">
            {aiInsights.slice(0, 12).map((a) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-start gap-2 rounded-lg border p-2.5 text-xs ${
                  a.severity === 'high'
                    ? 'border-cyber-red/30 bg-cyber-red/5'
                    : a.severity === 'warn'
                    ? 'border-cyber-yellow/25 bg-cyber-yellow/5'
                    : 'border-cyber-cyan/20 bg-cyber-cyan/5'
                }`}
              >
                <Bot className={`mt-0.5 h-4 w-4 ${a.severity === 'high' ? 'text-cyber-red' : a.severity === 'warn' ? 'text-cyber-yellow' : 'text-cyber-cyan'}`} />
                <div className="flex-1">
                  <p className="text-slate-200">{a.text}</p>
                  <TimeLabel ts={a.t} />
                </div>
              </motion.div>
            ))}
            {aiInsights.length === 0 && <p className="text-xs text-slate-500">AI is calibrating models…</p>}
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Attack Vectors" subtitle="Distribution of detected attempts">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attackTypeStats} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid stroke="rgba(0,240,255,0.07)" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="rgba(148,163,184,0.5)" fontSize={10} />
                <YAxis allowDecimals={false} stroke="rgba(148,163,184,0.4)" fontSize={10} />
                <Tooltip
                  contentStyle={{ background: 'rgba(7,13,28,0.95)', border: '1px solid rgba(0,240,255,0.3)', borderRadius: 8, fontSize: 12 }}
                />
                <Bar dataKey="v" radius={[6, 6, 0, 0]} fill="url(#gradCyan)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Recent Attacks" subtitle="Auto-mitigated by SmarthomeKZ">
          <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {attacks.slice(0, 6).map((a) => (
              <li key={a.id} className="flex items-center justify-between rounded-md border border-cyber-red/15 bg-cyber-red/[0.04] px-3 py-2 text-xs">
                <div className="flex items-center gap-2 text-cyber-red">
                  <Skull className="h-3.5 w-3.5" />
                  <span className="font-medium uppercase tracking-widest">{a.label}</span>
                </div>
                <div className="text-right">
                  <p className="font-mono text-slate-200">{a.deviceName}</p>
                  <p className="font-mono text-[10px] text-slate-500">{a.attackerIp}</p>
                </div>
              </li>
            ))}
            {attacks.length === 0 && (
              <li className="rounded border border-cyber-green/20 bg-cyber-green/5 p-3 text-center text-xs text-cyber-green">
                <ShieldCheck className="mx-auto mb-1 h-4 w-4" /> No active intrusions.
              </li>
            )}
          </ul>
        </Panel>

        <Panel title="Live Event Log" subtitle="Edge gateway · stream">
          <ul className="space-y-1.5 max-h-48 overflow-y-auto pr-1 font-mono text-[11px]">
            {logs.slice(0, 12).map((l) => (
              <li key={l.id} className="flex items-start gap-2">
                <TimeLabel ts={l.t} />
                <span
                  className={`uppercase ${
                    l.level === 'danger' ? 'text-cyber-red' : l.level === 'warn' ? 'text-cyber-yellow' : 'text-cyber-cyan'
                  }`}
                >
                  [{l.level}]
                </span>
                <span className="text-slate-200">{l.msg}</span>
              </li>
            ))}
            {logs.length === 0 && <li className="text-slate-500">Stream idle…</li>}
          </ul>
        </Panel>
      </div>

      <DevicePanel device={activeDevice} onClose={() => setActiveDevice(null)} />
    </div>
  )
}
