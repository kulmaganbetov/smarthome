import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, ShieldAlert, X } from 'lucide-react'
import { useSecurity } from '../../context/SecurityContext.jsx'

const PALETTE = {
  success: {
    border: 'border-cyber-green/60',
    glow: 'shadow-[0_0_25px_rgba(0,255,157,0.35)]',
    text: 'text-cyber-green',
    Icon: CheckCircle2,
  },
  warning: {
    border: 'border-cyber-yellow/60',
    glow: 'shadow-[0_0_25px_rgba(255,214,10,0.35)]',
    text: 'text-cyber-yellow',
    Icon: AlertTriangle,
  },
  danger: {
    border: 'border-cyber-red/70',
    glow: 'shadow-[0_0_30px_rgba(255,45,85,0.45)]',
    text: 'text-cyber-red',
    Icon: ShieldAlert,
  },
}

export default function NotificationStack() {
  const { notifications, dismissNotification } = useSecurity()
  return (
    <div className="pointer-events-none fixed right-6 top-6 z-50 flex w-[360px] flex-col gap-3">
      <AnimatePresence initial={false}>
        {notifications.map((n) => {
          const p = PALETTE[n.level] ?? PALETTE.warning
          const Icon = p.Icon
          return (
            <motion.div
              key={n.id}
              layout
              initial={{ opacity: 0, x: 80, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.94 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className={`pointer-events-auto relative overflow-hidden rounded-xl glass-strong border ${p.border} ${p.glow} p-3 pr-9`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 ${p.text}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${p.text}`}>{n.title}</p>
                  <p className="mt-1 text-sm text-slate-200/90 leading-snug">{n.msg}</p>
                </div>
              </div>
              <button
                aria-label="Dismiss"
                className="absolute right-2 top-2 rounded p-1 text-slate-400 hover:text-white"
                onClick={() => dismissNotification(n.id)}
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <motion.span
                className={`absolute inset-x-0 bottom-0 h-px ${p.text}`}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 6.5, ease: 'linear' }}
                style={{ transformOrigin: 'left', background: 'currentColor' }}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
