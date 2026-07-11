'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export default function GoldDust() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Generate particles only on the client side to prevent hydration mismatches
    const generateParticles = () => {
      const newParticles: Particle[] = []
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100, // percentage width
          y: Math.random() * 100, // percentage height
          size: Math.random() * 3 + 1, // 1px to 4px
          duration: Math.random() * 20 + 10, // 10s to 30s
          delay: Math.random() * 5, // 0s to 5s delay
        })
      }
      setParticles(newParticles)
    }

    generateParticles()
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, Math.random() * 30 - 15, Math.random() * 30 - 15],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}
