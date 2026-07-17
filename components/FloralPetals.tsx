'use client'

import { useEffect, useState } from 'react'

type Petal = {
  id: number
  x: number // initial horizontal percentage
  size: number // diameter in px
  delay: number // animation delay in seconds
  duration: number // animation duration in seconds
  swayDuration: number // horizontal sway speed in seconds
  rotateStart: number
  rotateEnd: number
}

export default function FloralPetals() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    // Generate randomized petals with negative delay so they cover the screen initially
    const newPetals = Array.from({ length: 10 }).map((_, i) => ({ // Slightly reduced from 16 to 10 for better rendering budget
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 14 + 10,
      delay: Math.random() * -20, // Negative delay prevents initial empty screen
      duration: Math.random() * 12 + 10,
      swayDuration: Math.random() * 4 + 4,
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 360 + 360,
    }))
    setPetals(newPetals)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            width: petal.size,
            height: petal.size,
            animation: `fallDown ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
            opacity: 0,
            ['--rotate-start' as any]: `${petal.rotateStart}deg`,
            ['--rotate-end' as any]: `${petal.rotateEnd}deg`,
          }}
        >
          {/* Subtle curved watercolor-style floral petal SVG */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full fill-[#EBB7B5]/40 filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]"
            style={{
              animation: `sway ${petal.swayDuration}s ease-in-out infinite`,
            }}
          >
            <path d="M50 0 C75 25, 90 60, 50 100 C10 60, 25 25, 50 0 Z" />
          </svg>
        </div>
      ))}
    </div>
  )
}
