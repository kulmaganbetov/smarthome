import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { INITIAL_DEVICES, ATTACK_TYPES } from '../data/devices.js'

const SecurityContext = createContext(null)

const MAX_LOGS = 80
const MAX_ATTACKS = 30
const MAX_AI = 30
const MAX_NOTIFS = 8
const MAX_METRICS = 30

let uid = 0
const nextId = (p = 'id') => `${p}-${Date.now().toString(36)}-${(++uid).toString(36)}`

const randomAttackerIp = () => {
  const a = () => Math.floor(Math.random() * 230) + 10
  return `${a()}.${a()}.${a()}.${a()}`
}

const AI_TEMPLATES = [
  '{device} → abnormal packet frequency detected',
  'Potential MITM attack identified near {device}',
  'Unusual outbound traffic pattern from {device}',
  'Authentication anomaly observed on {device}',
  'Encrypted channel renegotiation flagged for {device}',
  'AI heuristics indicate reconnaissance scan targeting {device}',
  'Behavioural model deviated 4.2σ on {device}',
  'Suspicious firmware-handshake from {device}',
]

export function SecurityProvider({ children }) {
  const [devices, setDevices] = useState(INITIAL_DEVICES)
  const [attacks, setAttacks] = useState([])
  const [logs, setLogs] = useState([])
  const [aiInsights, setAiInsights] = useState([])
  const [notifications, setNotifications] = useState([])
  const [metrics, setMetrics] = useState(() => {
    const now = Date.now()
    return Array.from({ length: MAX_METRICS }).map((_, i) => ({
      t: now - (MAX_METRICS - i) * 2000,
      packets: 1200 + Math.floor(Math.random() * 800),
      threats: Math.floor(Math.random() * 4),
      cpu: 28 + Math.floor(Math.random() * 18),
      network: 60 + Math.floor(Math.random() * 80),
    }))
  })

  const pushLog = useCallback((entry) => {
    setLogs((prev) => [{ id: nextId('log'), t: Date.now(), ...entry }, ...prev].slice(0, MAX_LOGS))
  }, [])

  const pushNotification = useCallback((n) => {
    const id = nextId('notif')
    setNotifications((prev) => [{ id, t: Date.now(), ...n }, ...prev].slice(0, MAX_NOTIFS))
    setTimeout(() => {
      setNotifications((prev) => prev.filter((x) => x.id !== id))
    }, 6500)
  }, [])

  const dismissNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const pushAI = useCallback((insight) => {
    setAiInsights((prev) => [{ id: nextId('ai'), t: Date.now(), ...insight }, ...prev].slice(0, MAX_AI))
  }, [])

  /* ----------------------------- Device actions ----------------------------- */

  const updateDevice = useCallback((id, patch) => {
    setDevices((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch, lastActivity: Date.now() } : d)))
  }, [])

  const toggleDevice = useCallback(
    (id) => {
      setDevices((prev) =>
        prev.map((d) => {
          if (d.id !== id) return d
          const next = d.status === 'gray' ? 'green' : 'gray'
          return { ...d, status: next, lastActivity: Date.now() }
        }),
      )
      const dev = devices.find((d) => d.id === id)
      pushLog({ level: 'info', msg: `Device toggled — ${dev?.name ?? id}` })
    },
    [devices, pushLog],
  )

  const rebootDevice = useCallback(
    (id) => {
      setDevices((prev) =>
        prev.map((d) =>
          d.id === id
            ? { ...d, status: 'gray', cpu: 5, traffic: 0, lastActivity: Date.now() }
            : d,
        ),
      )
      pushLog({ level: 'info', msg: `Reboot sequence triggered on ${id}` })
      setTimeout(() => {
        setDevices((prev) =>
          prev.map((d) =>
            d.id === id
              ? {
                  ...d,
                  status: 'green',
                  cpu: 18 + Math.floor(Math.random() * 20),
                  traffic: 40 + Math.floor(Math.random() * 80),
                  threatScore: 0,
                  lastActivity: Date.now(),
                }
              : d,
          ),
        )
        pushNotification({ level: 'success', title: 'Device Restored', msg: `${id} back online — security key rotated.` })
      }, 1800)
    },
    [pushLog, pushNotification],
  )

  const isolateDevice = useCallback(
    (id) => {
      updateDevice(id, { isolated: true, status: 'yellow', threatScore: 0 })
      pushLog({ level: 'warn', msg: `Network isolation applied to ${id}` })
      pushNotification({ level: 'warning', title: 'Device Isolated', msg: `Traffic for ${id} routed to quarantine VLAN.` })
    },
    [updateDevice, pushLog, pushNotification],
  )

  const blockIp = useCallback(
    (id) => {
      const dev = devices.find((d) => d.id === id)
      pushLog({ level: 'warn', msg: `Firewall rule added → block ${dev?.ip ?? id}` })
      pushNotification({ level: 'warning', title: 'IP Blocked', msg: `${dev?.ip ?? id} denied at the edge gateway.` })
    },
    [devices, pushLog, pushNotification],
  )

  const refreshKey = useCallback(
    (id) => {
      updateDevice(id, { encryption: 'AES-256-GCM', firmware: `v${(Math.random() * 3 + 1).toFixed(2)}.${Math.floor(Math.random() * 9) + 1}` })
      pushLog({ level: 'info', msg: `Security key rotated for ${id}` })
      pushNotification({ level: 'success', title: 'Key Rotated', msg: `Fresh AES-256 session key issued to ${id}.` })
    },
    [updateDevice, pushLog, pushNotification],
  )

  /* ----------------------------- Attack simulator ---------------------------- */

  const launchAttack = useCallback(
    (deviceId, attackTypeId) => {
      const dev = devices.find((d) => d.id === deviceId)
      const type = ATTACK_TYPES.find((a) => a.id === attackTypeId) ?? ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)]
      if (!dev) return
      const attack = {
        id: nextId('atk'),
        t: Date.now(),
        deviceId: dev.id,
        deviceName: dev.name,
        room: dev.room,
        type: type.id,
        label: type.label,
        level: type.level,
        attackerIp: randomAttackerIp(),
        status: 'active',
      }
      setAttacks((prev) => [attack, ...prev].slice(0, MAX_ATTACKS))
      updateDevice(deviceId, { status: 'red', threatScore: 90 + Math.floor(Math.random() * 10), traffic: 220 + Math.floor(Math.random() * 200) })
      pushLog({ level: 'danger', msg: `${type.label} → ${dev.name} from ${attack.attackerIp}` })
      pushNotification({ level: 'danger', title: `${type.label} detected`, msg: `${dev.name} under active attack from ${attack.attackerIp}.` })
      pushAI({ severity: 'high', text: `Real-time model classifies traffic on ${dev.name} as ${type.label}. Confidence 97%.` })

      // Auto-mitigate after a few seconds
      setTimeout(() => {
        setAttacks((prev) => prev.map((a) => (a.id === attack.id ? { ...a, status: 'mitigated' } : a)))
        updateDevice(deviceId, { status: 'yellow', threatScore: 20 })
        pushLog({ level: 'info', msg: `Auto-mitigation completed for ${dev.name}` })
        setTimeout(() => updateDevice(deviceId, { status: 'green', threatScore: 0 }), 4000)
      }, 6500)
    },
    [devices, updateDevice, pushLog, pushNotification, pushAI],
  )

  const simulateRandomAttack = useCallback(() => {
    const online = devices.filter((d) => d.status !== 'gray')
    if (!online.length) return
    const target = online[Math.floor(Math.random() * online.length)]
    const type = ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)]
    launchAttack(target.id, type.id)
  }, [devices, launchAttack])

  /* ----------------------------- Realtime engine ---------------------------- */

  const devicesRef = useRef(devices)
  useEffect(() => {
    devicesRef.current = devices
  }, [devices])

  useEffect(() => {
    const id = setInterval(() => {
      setDevices((prev) =>
        prev.map((d) => {
          if (d.status === 'gray') return d
          const cpu = Math.max(5, Math.min(95, d.cpu + (Math.random() * 10 - 5)))
          const traffic = Math.max(5, Math.min(d.status === 'red' ? 420 : 220, d.traffic + (Math.random() * 30 - 15)))
          return { ...d, cpu: Math.round(cpu), traffic: Math.round(traffic) }
        }),
      )

      setMetrics((prev) => {
        const list = devicesRef.current
        const online = list.filter((d) => d.status !== 'gray').length
        const threats = list.filter((d) => d.status === 'red').length
        const totalCpu = list.reduce((s, d) => s + (d.status === 'gray' ? 0 : d.cpu), 0)
        const totalNet = list.reduce((s, d) => s + (d.status === 'gray' ? 0 : d.traffic), 0)
        const next = [
          ...prev.slice(-MAX_METRICS + 1),
          {
            t: Date.now(),
            packets: Math.round(totalNet * 12 + Math.random() * 300),
            threats,
            cpu: online ? Math.round(totalCpu / online) : 0,
            network: Math.round(totalNet / Math.max(online, 1)),
          },
        ]
        return next
      })
    }, 2000)
    return () => clearInterval(id)
  }, [])

  // Periodic AI insight stream
  useEffect(() => {
    const id = setInterval(() => {
      const list = devicesRef.current.filter((d) => d.status !== 'gray')
      if (!list.length) return
      const dev = list[Math.floor(Math.random() * list.length)]
      const template = AI_TEMPLATES[Math.floor(Math.random() * AI_TEMPLATES.length)]
      pushAI({ severity: ['info', 'info', 'warn', 'high'][Math.floor(Math.random() * 4)], text: template.replace('{device}', dev.name) })
    }, 4500)
    return () => clearInterval(id)
  }, [pushAI])

  // Occasional random attack
  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() < 0.45) simulateRandomAttack()
    }, 14000)
    return () => clearInterval(id)
  }, [simulateRandomAttack])

  /* -------------------------------- Aggregate ------------------------------- */

  const stats = useMemo(() => {
    const total = devices.length
    const online = devices.filter((d) => d.status !== 'gray').length
    const secure = devices.filter((d) => d.status === 'green').length
    const suspicious = devices.filter((d) => d.status === 'yellow').length
    const underAttack = devices.filter((d) => d.status === 'red').length
    const securityScore = Math.max(0, Math.round(100 - (suspicious * 4 + underAttack * 18) - Math.max(0, total - online) * 1.5))
    return { total, online, secure, suspicious, underAttack, securityScore }
  }, [devices])

  const value = {
    devices,
    attacks,
    logs,
    aiInsights,
    notifications,
    metrics,
    stats,
    toggleDevice,
    rebootDevice,
    isolateDevice,
    blockIp,
    refreshKey,
    launchAttack,
    simulateRandomAttack,
    dismissNotification,
  }

  return <SecurityContext.Provider value={value}>{children}</SecurityContext.Provider>
}

export function useSecurity() {
  const ctx = useContext(SecurityContext)
  if (!ctx) throw new Error('useSecurity must be used within SecurityProvider')
  return ctx
}
