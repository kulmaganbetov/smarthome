import { motion } from 'framer-motion'

export default function Background({ particles = true }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg animate-grid-move opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-bg/60 to-cyber-bg" />

      {/* Glow orbs */}
      <motion.div
        className="absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-cyber-cyan/20 blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-40 top-1/2 h-[460px] w-[460px] rounded-full bg-cyber-purple/20 blur-[140px]"
        animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 -top-32 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-cyber-blue/15 blur-[120px]"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {particles && (
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-cyber-cyan/70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 6px rgba(0,240,255,0.8)',
              }}
              animate={{
                y: [0, -40 - Math.random() * 60, 0],
                opacity: [0.2, 0.9, 0.2],
              }}
              transition={{
                duration: 6 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 6,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
