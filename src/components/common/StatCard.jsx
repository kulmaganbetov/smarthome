import { motion } from 'framer-motion'

const accents = {
  cyan: 'from-cyber-cyan/30 to-cyber-blue/20 text-cyber-cyan',
  purple: 'from-cyber-purple/30 to-cyber-pink/15 text-cyber-purple',
  red: 'from-cyber-red/30 to-cyber-pink/15 text-cyber-red',
  green: 'from-cyber-green/25 to-cyber-cyan/10 text-cyber-green',
  yellow: 'from-cyber-yellow/25 to-cyber-red/10 text-cyber-yellow',
}

export default function StatCard({ label, value, unit, icon: Icon, accent = 'cyan', delta, sparkline }) {
  const cls = accents[accent] ?? accents.cyan
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -3 }}
      className="glass relative overflow-hidden rounded-xl p-4"
    >
      <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${cls} blur-2xl opacity-60`} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">{label}</p>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-display text-3xl font-bold text-white">{value}</span>
            {unit && <span className="text-xs uppercase tracking-widest text-slate-400">{unit}</span>}
          </div>
          {delta && (
            <p className={`mt-1 text-[10px] font-mono uppercase tracking-widest ${delta.startsWith('+') ? 'text-cyber-green' : 'text-cyber-red'}`}>
              {delta}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 ${cls.split(' ').slice(-1)}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      {sparkline}
    </motion.div>
  )
}
