'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'none'
  className?: string
}) {
  const yOffset = direction === 'up' ? 20 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
