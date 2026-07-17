'use client'

import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number // percentage width
  y: number // percentage height
  size: number // px
  duration: number // seconds
  delay: number // seconds
  swayX: number // px
}

export default function GoldDust() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Generate particles on the client side only
    const newParticles: Particle[] = []
    for (let i = 0; i < 20; i++) { // Slightly reduced count from 30 to 20 for even better mobile performance
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * -20, // Negative delay so particles are pre-rendered scattered across the screen
        swayX: Math.random() * 30 - 15,
      })
    }
    setParticles(newParticles)
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-r from-[#FFDF73] to-[#D4AF37]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            filter: 'blur(1px)',
            animation: `floatUp ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            opacity: 0,
            ['--sway-x' as any]: `${p.swayX}px`,
          }}
        />
      ))}
    </div>
  )
}
