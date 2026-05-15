import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Bot,
  Cpu,
  EyeOff,
  Globe,
  Lock,
  Network,
  Radar,
  Shield,
  ShieldCheck,
  Wifi,
  Zap,
} from 'lucide-react'
import Background from '../components/common/Background.jsx'
import AnimatedCounter from '../components/common/AnimatedCounter.jsx'
import HouseScheme from '../components/scheme/HouseScheme.jsx'

const features = [
  { icon: Radar, title: 'Realtime Threat Detection', desc: 'Stream-based anomaly engine flags suspicious behavior the instant a packet looks wrong.', accent: 'cyan' },
  { icon: Lock, title: 'Encrypted IoT Communication', desc: 'AES-256-GCM channels with ephemeral keys keep your devices private end-to-end.', accent: 'purple' },
  { icon: Bot, title: 'AI Device Monitoring', desc: 'Behavioural models build a unique fingerprint of every device and react to deviations.', accent: 'cyan' },
  { icon: Zap, title: 'Attack Visualization', desc: 'Cinematic live topology renders attacker IPs, vectors and propagation in real time.', accent: 'red' },
  { icon: Cpu, title: 'Remote Device Control', desc: 'Reboot, isolate, rotate keys or kill the power from one cockpit-grade console.', accent: 'purple' },
  { icon: Network, title: 'Smart Network Isolation', desc: 'Automatic micro-segmentation quarantines compromised devices in milliseconds.', accent: 'green' },
]

const stats = [
  { label: 'Devices Protected', value: 18432, suffix: '+', icon: ShieldCheck },
  { label: 'Attacks Blocked', value: 248751, icon: Shield },
  { label: 'Active Connections', value: 9421, icon: Wifi },
  { label: 'Threats Detected', value: 1289, suffix: ' / day', icon: EyeOff },
]

function FeatureCard({ icon: Icon, title, desc, accent, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      whileHover={{ y: -6 }}
      className="glass cyber-border group relative overflow-hidden rounded-2xl p-6"
    >
      <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyber-${accent}/30 blur-3xl opacity-50 transition-opacity group-hover:opacity-80`} />
      <div className={`relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyber-${accent}/40 bg-cyber-${accent}/10 text-cyber-${accent}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="relative text-lg font-semibold text-white">{title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-slate-300/80">{desc}</p>
      <div className="relative mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cyber-cyan opacity-0 transition-opacity group-hover:opacity-100">
        Learn more <ArrowRight className="h-3 w-3" />
      </div>
    </motion.div>
  )
}

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />

      {/* Header */}
      <header className="relative z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl glass glow-cyan">
              <Shield className="h-5 w-5 text-cyber-cyan" />
            </span>
            <div>
              <p className="font-display text-sm tracking-[0.4em] text-gradient">SMARTHOMEKZ</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-400">IoT Security Platform</p>
            </div>
          </Link>
          <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
            <a href="#features" className="hover:text-cyber-cyan transition">Features</a>
            <a href="#stats" className="hover:text-cyber-cyan transition">Live Stats</a>
            <a href="#scheme" className="hover:text-cyber-cyan transition">Topology</a>
            <a href="#footer" className="hover:text-cyber-cyan transition">Contact</a>
          </nav>
          <Link to="/login" className="btn-ghost py-2 text-xs">
            <Globe className="h-3.5 w-3.5" /> Enter Console
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-8 md:grid-cols-2 md:pb-24 md:pt-16">
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.3em] text-cyber-cyan"
          >
            <span className="status-dot green" /> Threat-Mesh v3.0 · Online
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-bold leading-tight md:text-6xl"
          >
            Protect Your Smart Home With <span className="text-gradient">AI-Powered IoT Security</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-base text-slate-300/90 md:text-lg"
          >
            SmarthomeKZ fuses realtime telemetry, encrypted device mesh and an AI threat-hunter into a single cockpit — so every camera,
            lock and lamp in your home stays under your control, not theirs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link to="/login" className="btn-primary">
              Enter Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#features" className="btn-ghost">
              Discover Features
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 grid grid-cols-3 gap-3 max-w-md"
          >
            {[
              { v: '99.98%', l: 'Uptime SLA' },
              { v: '< 80ms', l: 'Detection latency' },
              { v: '24/7', l: 'Autonomous defense' },
            ].map((s, i) => (
              <div key={i} className="glass rounded-lg p-3 text-center">
                <p className="font-display text-lg text-cyber-cyan">{s.v}</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-400">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative"
        >
          <div className="relative glass-strong corner-frame overflow-hidden rounded-2xl p-3">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-cyber-cyan/15 to-transparent" />
            <HouseScheme compact />
            <div className="absolute inset-0 scanline pointer-events-none" />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] uppercase tracking-widest text-slate-400">
            <div className="flex items-center gap-2"><span className="status-dot green" /> Secure</div>
            <div className="flex items-center gap-2"><span className="status-dot yellow" /> Suspicious</div>
            <div className="flex items-center gap-2"><span className="status-dot red" /> Under Attack</div>
            <div className="flex items-center gap-2"><span className="status-dot gray" /> Offline</div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.4em] text-cyber-cyan">Capabilities</p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">
            The <span className="text-gradient">Cybersecurity Cockpit</span> for the modern home
          </h2>
          <p className="mt-4 text-slate-300/80">
            Built for households that take privacy seriously — and for the engineers who run them like a NOC.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} i={i} />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="glass corner-frame relative overflow-hidden rounded-3xl p-8 md:p-12">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyber-cyan/30 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-cyber-purple/30 blur-3xl" />
          <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <s.icon className="mx-auto h-7 w-7 text-cyber-cyan neon-text" />
                <p className="mt-3 text-3xl md:text-5xl text-white">
                  <AnimatedCounter value={s.value} suffix={s.suffix ?? ''} />
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-slate-400">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visualization */}
      <section id="scheme" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyber-purple">Live Topology</p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight">
              See <span className="text-gradient">every device</span>, every connection, every threat.
            </h2>
            <p className="mt-4 text-slate-300/80">
              The SmarthomeKZ scheme animates encrypted traffic flowing between your hub and devices. The moment a node turns red,
              you already know who, where and how.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {['Floor-plan view with per-room device clusters', 'Animated MQTT/TLS channels with health telemetry', 'One-click isolation and key rotation', 'Replay-able attack timeline for forensics'].map(
                (line, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-cyber-green flex-shrink-0" /> {line}
                  </li>
                ),
              )}
            </ul>
            <Link to="/login" className="btn-primary mt-8">
              Launch Console <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative">
            <div className="glass-strong corner-frame overflow-hidden rounded-2xl p-3">
              <HouseScheme compact={false} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="relative z-10 mt-12 border-t border-white/5">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl glass glow-cyan">
                <Shield className="h-5 w-5 text-cyber-cyan" />
              </span>
              <span className="font-display text-sm tracking-[0.4em] text-gradient">SMARTHOMEKZ</span>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              The cybersecurity cockpit for the connected home. Built in Almaty · Engineered for the future.
            </p>
          </div>
          {[
            { t: 'Product', l: ['Dashboard', 'Topology', 'AI Engine', 'Pricing'] },
            { t: 'Resources', l: ['Documentation', 'API', 'Status', 'Changelog'] },
            { t: 'Company', l: ['About', 'Careers', 'Contact', 'Security'] },
          ].map((c) => (
            <div key={c.t}>
              <p className="text-xs uppercase tracking-[0.3em] text-cyber-cyan">{c.t}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {c.l.map((x) => (
                  <li key={x} className="hover:text-white cursor-pointer transition">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row">
            <p className="text-xs text-slate-500">© {new Date().getFullYear()} SmarthomeKZ · All systems nominal.</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
              build · 2026.05 · region: AP-CENTRAL-1 · uplink: secure
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
