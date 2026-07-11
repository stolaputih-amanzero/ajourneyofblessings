'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="sticky top-0 z-[100] w-full h-0">
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-[#D4AF37] origin-left shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
        style={{ scaleX }}
      />
    </div>
  )
}

