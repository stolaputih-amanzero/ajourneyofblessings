'use client'

import { useState, useEffect } from 'react'
export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  } | null>(null)

  useEffect(() => {
    const end = new Date(targetDate)

    const updateTimer = () => {
      const now = new Date()
      const diffMs = end.getTime() - now.getTime()

      if (diffMs <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const totalSeconds = Math.floor(diffMs / 1000)
      const days = Math.floor(totalSeconds / (24 * 3600))
      const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      setTimeLeft({ days, hours, minutes, seconds })
    }

    updateTimer() // Initial call
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  if (!timeLeft) {
    return (
      <div className="flex justify-center space-x-4 mt-6 py-6 border-t border-white/10 opacity-0">
        <div className="w-12 h-12"></div>
      </div>
    )
  }

  const units = [
    { label: 'Days', value: timeLeft.days || 0 },
    { label: 'Hours', value: timeLeft.hours || 0 },
    { label: 'Minutes', value: timeLeft.minutes || 0 },
    { label: 'Seconds', value: timeLeft.seconds || 0 },
  ]

  return (
    <div className="flex justify-center space-x-4 mt-6 pt-6 border-t border-white/10">
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full border border-[#D4AF37]/50 bg-white/5">
            <span className="text-[#D4AF37] font-serif text-lg">{unit.value.toString().padStart(2, '0')}</span>
          </div>
          <span className="text-[8px] uppercase tracking-widest text-white/60 font-bold mt-2">{unit.label}</span>
        </div>
      ))}
    </div>
  )
}
