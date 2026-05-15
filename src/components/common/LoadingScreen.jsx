import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

export default function LoadingScreen({ label = 'Initializing secure session' }) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cyber-bg">
      <div className="grid-bg absolute inset-0 opacity-40 animate-grid-move" />
      <div className="relative flex flex-col items-center gap-6">
        <motion.div
          className="relative h-28 w-28 rounded-full glass glow-cyan flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute inset-0 rounded-full border border-cyber-cyan/40 animate-ping" />
          <span className="absolute inset-2 rounded-full border border-cyber-purple/40" />
          <Shield className="h-12 w-12 text-cyber-cyan neon-text" />
        </motion.div>

        <div className="flex flex-col items-center gap-2">
          <span className="font-display text-2xl tracking-[0.4em] text-gradient">SMARTHOMEKZ</span>
          <span className="text-xs text-cyan-200/70 font-mono uppercase tracking-widest">{label}…</span>
        </div>

        <div className="relative h-1 w-72 overflow-hidden rounded bg-cyber-panel">
          <motion.span
            className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-cyan"
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  )
}
