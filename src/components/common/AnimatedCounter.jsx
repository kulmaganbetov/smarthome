import { useEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion'

export default function AnimatedCounter({ value = 0, duration = 1.6, decimals = 0, suffix = '', prefix = '' }) {
  const [display, setDisplay] = useState(0)
  const last = useRef(0)
  useEffect(() => {
    const controls = animate(last.current, value, {
      duration,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate(v) {
        setDisplay(v)
      },
    })
    last.current = value
    return () => controls.stop()
  }, [value, duration])

  const formatted = display.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span className="font-display font-bold">
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
