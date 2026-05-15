import { motion } from 'framer-motion'

export default function Panel({ title, subtitle, accent = 'cyan', actions, children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`glass corner-frame relative rounded-xl p-5 ${className}`}
    >
      {(title || actions) && (
        <header className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && (
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyber-cyan/90">
                <span className={`inline-block h-2 w-2 rounded-full bg-cyber-${accent} glow-${accent}`} />
                {title}
              </h3>
            )}
            {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
          </div>
          {actions}
        </header>
      )}
      <div>{children}</div>
    </motion.div>
  )
}
