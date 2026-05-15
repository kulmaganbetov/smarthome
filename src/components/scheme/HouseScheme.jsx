import { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { ROOMS, DEVICE_TYPES, INITIAL_DEVICES } from '../../data/devices.js'

const STATUS_TINT = {
  green: { stroke: 'rgba(0,255,157,0.55)', fill: 'rgba(0,255,157,0.08)', text: '#00ff9d' },
  yellow: { stroke: 'rgba(255,214,10,0.55)', fill: 'rgba(255,214,10,0.08)', text: '#ffd60a' },
  red: { stroke: 'rgba(255,45,85,0.7)', fill: 'rgba(255,45,85,0.12)', text: '#ff2d55' },
  gray: { stroke: 'rgba(100,116,139,0.4)', fill: 'rgba(100,116,139,0.08)', text: '#94a3b8' },
}

function DeviceMarker({ device, onClick, compact }) {
  const meta = DEVICE_TYPES[device.type] ?? { label: 'Device', icon: 'Cpu' }
  const Icon = LucideIcons[meta.icon] ?? LucideIcons.Cpu
  const tint = STATUS_TINT[device.status] ?? STATUS_TINT.green
  return (
    <motion.button
      type="button"
      onClick={() => onClick?.(device)}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.15 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${device.x}%`, top: `${device.y}%` }}
    >
      <span className="absolute inset-0 rounded-full" style={{ boxShadow: `0 0 18px ${tint.stroke}` }} />
      {device.status !== 'gray' && (
        <span
          className="absolute -inset-2 rounded-full animate-ping"
          style={{ background: tint.fill, border: `1px solid ${tint.stroke}` }}
        />
      )}
      <span
        className={`relative flex items-center justify-center rounded-full border ${compact ? 'h-7 w-7' : 'h-9 w-9'} backdrop-blur`}
        style={{ background: 'rgba(7,13,28,0.85)', borderColor: tint.stroke, color: tint.text }}
      >
        <Icon className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      </span>
      {!compact && (
        <span
          className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-widest"
          style={{ color: tint.text }}
        >
          {device.name}
        </span>
      )}
    </motion.button>
  )
}

function Room({ room, compact }) {
  return (
    <div
      className="absolute rounded-xl border border-cyber-cyan/15 bg-cyber-cyan/[0.025]"
      style={{
        left: `${room.x}%`,
        top: `${room.y}%`,
        width: `${room.w}%`,
        height: `${room.h}%`,
        boxShadow: 'inset 0 0 30px rgba(0,240,255,0.04)',
      }}
    >
      <span className={`absolute left-2 top-1.5 font-mono uppercase tracking-[0.25em] text-cyber-cyan/70 ${compact ? 'text-[8px]' : 'text-[10px]'}`}>
        {room.name}
      </span>
      <div className="absolute -left-px -top-px h-2 w-2 border-l border-t border-cyber-cyan/70" />
      <div className="absolute -right-px -top-px h-2 w-2 border-r border-t border-cyber-cyan/70" />
      <div className="absolute -left-px -bottom-px h-2 w-2 border-l border-b border-cyber-cyan/70" />
      <div className="absolute -right-px -bottom-px h-2 w-2 border-r border-b border-cyber-cyan/70" />
    </div>
  )
}

// Demo data simulator used on landing only (so this works without security context)
function useDemoDevices(enabled) {
  const [list, setList] = useState(INITIAL_DEVICES)
  useEffect(() => {
    if (!enabled) return
    const id = setInterval(() => {
      setList((prev) =>
        prev.map((d) => {
          if (Math.random() > 0.92) {
            const roll = Math.random()
            const status = roll > 0.85 ? 'red' : roll > 0.7 ? 'yellow' : 'green'
            return { ...d, status }
          }
          return d
        }),
      )
    }, 1800)
    return () => clearInterval(id)
  }, [enabled])
  return list
}

/**
 * 2D smart-home top-view scheme.
 * - When `devices` prop is provided, uses live data. Otherwise generates demo states.
 * - `onDeviceClick` opens consumer's panel.
 */
export default function HouseScheme({ compact = false, devices: providedDevices, onDeviceClick, attacks = [] }) {
  const demo = useDemoDevices(!providedDevices)
  const devices = providedDevices ?? demo

  const hub = useMemo(() => devices.find((d) => d.type === 'hub') ?? devices[0], [devices])

  return (
    <div className={`relative w-full ${compact ? 'aspect-[5/3]' : 'aspect-[9/6]'} rounded-xl overflow-hidden`}>
      {/* Floor grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-bg/30 via-transparent to-cyber-bg/60" />

      {/* House outline */}
      <div className="absolute inset-3 rounded-xl border border-cyber-cyan/30" style={{ boxShadow: 'inset 0 0 30px rgba(0,240,255,0.07)' }} />

      {/* Rooms */}
      {ROOMS.map((r) => (
        <Room key={r.id} room={r} compact={compact} />
      ))}

      {/* Connection lines: hub -> each device */}
      {hub && (
        <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="line-secure" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="rgba(0,240,255,0.05)" />
              <stop offset="50%" stopColor="rgba(0,240,255,0.6)" />
              <stop offset="100%" stopColor="rgba(0,240,255,0.05)" />
            </linearGradient>
            <linearGradient id="line-attack" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="rgba(255,45,85,0.1)" />
              <stop offset="50%" stopColor="rgba(255,45,85,0.9)" />
              <stop offset="100%" stopColor="rgba(255,45,85,0.1)" />
            </linearGradient>
          </defs>
          {devices
            .filter((d) => d.id !== hub.id)
            .map((d) => {
              const color =
                d.status === 'red'
                  ? 'url(#line-attack)'
                  : d.status === 'yellow'
                  ? 'rgba(255,214,10,0.45)'
                  : d.status === 'gray'
                  ? 'rgba(100,116,139,0.2)'
                  : 'url(#line-secure)'
              return (
                <g key={d.id}>
                  <line
                    x1={hub.x}
                    y1={hub.y}
                    x2={d.x}
                    y2={d.y}
                    stroke={color}
                    strokeWidth={d.status === 'red' ? 0.5 : 0.2}
                    strokeDasharray={d.status === 'red' ? '0.6 0.4' : undefined}
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              )
            })}
        </svg>
      )}

      {/* Animated data packets */}
      <AnimatePresence>
        {hub &&
          devices
            .filter((d) => d.id !== hub.id && d.status !== 'gray')
            .slice(0, 12)
            .map((d, i) => (
              <motion.span
                key={`pkt-${d.id}`}
                className="absolute h-1.5 w-1.5 rounded-full"
                style={{
                  background: d.status === 'red' ? '#ff2d55' : d.status === 'yellow' ? '#ffd60a' : '#00f0ff',
                  boxShadow: d.status === 'red' ? '0 0 10px #ff2d55' : '0 0 8px #00f0ff',
                  left: 0,
                  top: 0,
                }}
                initial={{
                  x: `calc(${hub.x}% - 3px)`,
                  y: `calc(${hub.y}% - 3px)`,
                  opacity: 0,
                }}
                animate={{
                  x: [`calc(${hub.x}% - 3px)`, `calc(${d.x}% - 3px)`],
                  y: [`calc(${hub.y}% - 3px)`, `calc(${d.y}% - 3px)`],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.6 + (i % 4) * 0.3,
                  delay: i * 0.18,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
      </AnimatePresence>

      {/* Devices */}
      {devices.map((d) => (
        <DeviceMarker key={d.id} device={d} onClick={onDeviceClick} compact={compact} />
      ))}

      {/* Central hub label */}
      {hub && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ left: `${hub.x}%`, top: `${hub.y + 6}%` }}
        >
          <span className="rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-widest text-cyber-cyan">CORE HUB</span>
        </div>
      )}

      {/* Compass */}
      <div className="pointer-events-none absolute right-3 top-3 flex flex-col items-center gap-1 rounded glass px-2 py-1.5">
        <span className="font-mono text-[9px] uppercase tracking-widest text-cyber-cyan">N</span>
        <div className="h-6 w-px bg-gradient-to-b from-cyber-cyan to-transparent" />
      </div>
    </div>
  )
}
