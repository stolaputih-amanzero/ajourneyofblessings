'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

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
    // Generate 15 randomized petals
    const newPetals = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // 0% to 100%
      size: Math.random() * 14 + 10, // 10px to 24px
      delay: Math.random() * 8, // up to 8s delay
      duration: Math.random() * 12 + 10, // 10s to 22s drop duration
      swayDuration: Math.random() * 4 + 4, // 4s to 8s horizontal sway
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 360 + 360,
    }))
    setPetals(newPetals)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ 
            top: '-10%', 
            left: `${petal.x}%`,
            rotate: petal.rotateStart,
            opacity: 0
          }}
          animate={{
            top: '110%',
            rotate: petal.rotateEnd,
            opacity: [0, 0.75, 0.75, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute"
          style={{ width: petal.size, height: petal.size }}
        >
          {/* Subtle curved watercolor-style floral petal SVG */}
          <motion.svg
            viewBox="0 0 100 100"
            animate={{
              x: [-15, 15, -15],
            }}
            transition={{
              duration: petal.swayDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-full h-full fill-[#EBB7B5]/40 filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]"
          >
            <path d="M50 0 C75 25, 90 60, 50 100 C10 60, 25 25, 50 0 Z" />
          </motion.svg>
        </motion.div>
      ))}
    </div>
  )
}
