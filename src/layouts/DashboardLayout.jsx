import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  Bell,
  Bot,
  Cpu,
  Gauge,
  Home,
  LogOut,
  Menu,
  Radar,
  Search,
  Shield,
  ShieldAlert,
  Terminal,
  Workflow,
  X,
} from 'lucide-react'
import Background from '../components/common/Background.jsx'
import NotificationStack from '../components/common/NotificationStack.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useSecurity } from '../context/SecurityContext.jsx'

const NAV = [
  { to: '/dashboard', label: 'Overview', icon: Gauge, end: true },
  { to: '/dashboard/home', label: 'Smart Home', icon: Home },
  { to: '/dashboard/network', label: 'Network Topology', icon: Workflow },
  { to: '/dashboard/ai', label: 'AI Analysis', icon: Bot },
  { to: '/dashboard/attacks', label: 'Attack Center', icon: ShieldAlert },
  { to: '/dashboard/devices', label: 'Devices', icon: Cpu },
  { to: '/dashboard/logs', label: 'Event Logs', icon: Terminal },
]

function Clock() {
  return (
    <span className="font-mono text-xs text-slate-300/80">
      {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </span>
  )
}

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const { stats, notifications, simulateRandomAttack } = useSecurity()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="relative min-h-screen text-slate-100">
      <Background />
      <NotificationStack />

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform glass-strong border-r border-cyber-cyan/15 transition-transform md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/5 px-5">
          <NavLink to="/dashboard" className="flex items-center gap-2">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg glass glow-cyan">
              <Shield className="h-5 w-5 text-cyber-cyan" />
            </span>
            <span className="font-display text-sm tracking-[0.35em] text-gradient">SMARTHOMEKZ</span>
          </NavLink>
          <button className="md:hidden text-slate-300" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="px-3 py-5 space-y-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyber-cyan/15 to-cyber-purple/10 text-white border border-cyber-cyan/30 glow-cyan'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`h-4 w-4 ${isActive ? 'text-cyber-cyan' : 'text-slate-400 group-hover:text-cyber-cyan'}`} />
                  <span className="uppercase tracking-[0.18em] text-[11px] font-medium">{item.label}</span>
                  {isActive && <span className="absolute right-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyber-cyan glow-cyan" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="absolute inset-x-3 bottom-4 space-y-3">
          <div className="glass rounded-lg p-3">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-slate-400">
              <span>Security Score</span>
              <span className={`font-mono ${stats.securityScore > 75 ? 'text-cyber-green' : stats.securityScore > 50 ? 'text-cyber-yellow' : 'text-cyber-red'}`}>
                {stats.securityScore}%
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded bg-cyber-panel">
              <motion.div
                className={`h-full bg-gradient-to-r ${
                  stats.securityScore > 75
                    ? 'from-cyber-green to-cyber-cyan'
                    : stats.securityScore > 50
                    ? 'from-cyber-yellow to-cyber-cyan'
                    : 'from-cyber-red to-cyber-purple'
                }`}
                animate={{ width: `${stats.securityScore}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
          <button onClick={handleLogout} className="w-full btn-ghost py-2 text-xs">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      <div className="md:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 border-b border-white/5 bg-cyber-bg/60 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
            <button className="md:hidden text-slate-300" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden sm:flex flex-1 items-center gap-2 max-w-md">
              <div className="flex w-full items-center gap-2 rounded-lg glass px-3 py-2">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  placeholder="Search devices, IPs, logs…"
                  className="flex-1 bg-transparent text-sm placeholder:text-slate-500 focus:outline-none"
                />
                <kbd className="text-[10px] font-mono text-slate-500 border border-white/10 rounded px-1.5 py-0.5">⌘K</kbd>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <button
                onClick={simulateRandomAttack}
                className="hidden md:inline-flex items-center gap-2 rounded-lg border border-cyber-red/40 bg-cyber-red/10 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-cyber-red hover:bg-cyber-red/20 transition"
              >
                <Radar className="h-3.5 w-3.5" /> Simulate Attack
              </button>

              <div className="hidden lg:flex items-center gap-3 rounded-lg glass px-3 py-2">
                <Activity className="h-4 w-4 text-cyber-green" />
                <span className="text-xs font-mono text-slate-300">{stats.online} online</span>
                <span className="h-3 w-px bg-white/10" />
                <Clock />
              </div>

              <div className="relative">
                <Bell className="h-5 w-5 text-slate-300" />
                {notifications.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyber-red text-[9px] font-bold text-white">
                    {notifications.length}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 rounded-lg glass px-2.5 py-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-cyber-cyan to-cyber-purple text-xs font-bold text-cyber-bg">
                  {user?.username?.[0]?.toUpperCase() ?? 'A'}
                </div>
                <div className="hidden sm:block">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400">Clearance · {user?.clearance}</p>
                  <p className="text-xs font-semibold text-white">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="relative px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
