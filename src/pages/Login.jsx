import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, EyeOff, Fingerprint, Lock, Shield, ShieldCheck, User } from 'lucide-react'
import Background from '../components/common/Background.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await login(username.trim(), password)
    setLoading(false)
    if (res.ok) {
      navigate(from, { replace: true })
    } else {
      setError(res.error)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />

      <Link to="/" className="absolute left-6 top-6 z-10 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl glass glow-cyan">
          <Shield className="h-5 w-5 text-cyber-cyan" />
        </span>
        <div>
          <p className="font-display text-sm tracking-[0.4em] text-gradient">SMARTHOMEKZ</p>
          <p className="text-[10px] uppercase tracking-widest text-slate-400">Secure Access Portal</p>
        </div>
      </Link>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-20">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2">
          {/* Decorative left panel */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative glass corner-frame rounded-2xl p-8 overflow-hidden"
            >
              <div className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-cyber-cyan/30 blur-3xl" />
              <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-cyber-purple/30 blur-3xl" />
              <div className="absolute inset-0 grid-bg opacity-30" />

              <div className="relative">
                <p className="font-mono text-xs uppercase tracking-[0.4em] text-cyber-cyan">// CONTROL ROOM</p>
                <h2 className="mt-4 font-display text-4xl font-bold">Secure your <span className="text-gradient">connected world</span></h2>
                <p className="mt-4 text-sm text-slate-300/80">
                  This portal grants direct access to the SmarthomeKZ defense mesh. Multi-factor signals,
                  cryptographic device attestation, and AI-driven anomaly streams are continuously verified.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3 text-xs">
                  {[
                    { label: 'Sessions', value: '01' },
                    { label: 'Region', value: 'AP-CENTRAL-1' },
                    { label: 'Cipher', value: 'AES-256-GCM' },
                    { label: 'Latency', value: '38 ms' },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                      <p className="text-[10px] uppercase tracking-widest text-slate-400">{s.label}</p>
                      <p className="mt-1 font-mono text-cyber-cyan">{s.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-3 text-xs text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-cyber-green" /> All inbound traffic verified · Zero anomalies in last 24h
                </div>
              </div>
            </motion.div>
          </div>

          {/* Login form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-cyan opacity-30 blur-2xl" />
            <form
              onSubmit={submit}
              className="relative glass-strong corner-frame rounded-2xl p-8 space-y-5 overflow-hidden"
            >
              <div className="absolute inset-0 scanline pointer-events-none" />

              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full glass glow-cyan">
                  <Fingerprint className="h-6 w-6 text-cyber-cyan" />
                </div>
                <h1 className="mt-4 font-display text-2xl font-bold">Secure Sign-In</h1>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-400">Authenticate to enter the console</p>
              </div>

              <div className="space-y-3">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Operator</span>
                  <div className="relative mt-1.5">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin"
                      className="w-full rounded-lg border border-white/10 bg-cyber-bg/60 px-10 py-3 text-sm placeholder:text-slate-600 focus:border-cyber-cyan/60 focus:outline-none focus:ring-2 focus:ring-cyber-cyan/20"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Passphrase</span>
                  <div className="relative mt-1.5">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      autoComplete="current-password"
                      type={show ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="•••••"
                      className="w-full rounded-lg border border-white/10 bg-cyber-bg/60 px-10 py-3 pr-10 text-sm placeholder:text-slate-600 focus:border-cyber-cyan/60 focus:outline-none focus:ring-2 focus:ring-cyber-cyan/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShow((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyber-cyan"
                      aria-label={show ? 'Hide password' : 'Show password'}
                    >
                      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded border border-cyber-red/40 bg-cyber-red/10 px-3 py-2 text-xs text-cyber-red"
                >
                  {error}
                </motion.p>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
                {loading ? (
                  <>
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-cyber-bg border-t-transparent" />
                    Authenticating
                  </>
                ) : (
                  <>
                    Enter Console <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-slate-500">
                <span>Hint: admin / admin</span>
                <Link to="/" className="hover:text-cyber-cyan">← back</Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
