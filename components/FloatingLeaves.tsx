'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function FloatingLeaves() {
  const [leaves, setLeaves] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number; rotation: number; type: number }>>([])

  useEffect(() => {
    // Generate fewer, larger elements for a more subtle organic feel
    const newLeaves = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 20, // 15-35s
      size: 10 + Math.random() * 20, // 10-30px
      rotation: Math.random() * 360,
      type: Math.floor(Math.random() * 3) // 3 different leaf/shape styles
    }))
    setLeaves(newLeaves)
  }, [])

  if (leaves.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute top-[-5%]"
          initial={{
            x: `${leaf.left}vw`,
            y: '-10vh',
            rotate: leaf.rotation,
            opacity: 0
          }}
          animate={{
            y: '110vh',
            x: [`${leaf.left}vw`, `${leaf.left + (Math.random() * 10 - 5)}vw`, `${leaf.left}vw`],
            rotate: leaf.rotation + 360 * (Math.random() > 0.5 ? 1 : -1),
            opacity: [0, 0.4, 0.4, 0]
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
            opacity: {
              duration: leaf.duration,
              times: [0, 0.1, 0.9, 1]
            },
            x: {
              duration: leaf.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          style={{
            width: leaf.size,
            height: leaf.size * (leaf.type === 0 ? 1.5 : 1), // some longer leaves
            borderRadius: leaf.type === 1 ? '50%' : leaf.type === 2 ? '0 50% 50% 50%' : '50% 0 50% 0', // organic shapes
            backgroundColor: leaf.type === 0 ? 'var(--color-accent)' : leaf.type === 1 ? 'var(--color-secondary)' : 'var(--color-tertiary)',
            filter: 'blur(1px)'
          }}
        />
      ))}
    </div>
  )
}
