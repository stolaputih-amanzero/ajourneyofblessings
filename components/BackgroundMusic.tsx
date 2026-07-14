'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Disc3 } from 'lucide-react'

export default function BackgroundMusic({ musicUrl }: { musicUrl?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Auto-play instantly on mount (since it now mounts upon clicking the wax seal)
  useEffect(() => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
        setHasInteracted(true)
      }).catch((e) => {
        console.log("Auto-play blocked by browser:", e)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const togglePlay = async () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
        setHasInteracted(true)
      } catch (error) {
        console.error("Error playing audio:", error)
      }
    }
  }

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={musicUrl || "/audio/theme.mp3"}
        loop
        preload="auto"
      />

      {/* Floating Music Toggle Button - POSISI KIRI BAWAH, UKURAN SAMA DENGAN SHARE */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[375px] flex justify-start px-6 z-50 pointer-events-none">
        <button
          onClick={togglePlay}
          className="pointer-events-auto relative bg-[#0A192F] text-[#D4AF37] p-3 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.4)] hover:bg-[#05101E] hover:text-[#C19A2D] transition-transform hover:scale-105 active:scale-95 flex items-center justify-center border border-[#D4AF37]/50 overflow-visible"
          aria-label={isPlaying ? "Matikan Musik" : "Putar Musik"}
        >
          {/* PULSE EFFECT - Hanya muncul saat musik MATI */}
          <AnimatePresence>
            {!isPlaying && (
              <>
                <motion.div
                  initial={{ scale: 1, opacity: 0.4 }}
                  animate={{ scale: [1, 1.3, 1.6], opacity: [0.4, 0.1, 0] }}
                  exit={{ opacity: 0, scale: 1.6 }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-full border border-[#D4AF37]"
                />
                <motion.div
                  initial={{ scale: 1, opacity: 0.4 }}
                  animate={{ scale: [1, 1.2, 1.4], opacity: [0.4, 0.1, 0] }}
                  exit={{ opacity: 0, scale: 1.4 }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    delay: 1,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-full border border-[#D4AF37]"
                />
              </>
            )}
          </AnimatePresence>

          {/* Spinning Disc - Hanya muncul saat musik BERPUTAR */}
          {isPlaying && (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center text-[#D4AF37]/20"
            >
              <Disc3 size={40} strokeWidth={1} />
            </motion.div>
          )}

          {/* Icon di tengah */}
          <motion.div
            initial={false}
            animate={{ scale: isPlaying ? 0.9 : 1 }}
            className="relative z-10"
          >
            {isPlaying ? <Volume2 size={22} strokeWidth={2} /> : <VolumeX size={22} strokeWidth={2} />}
          </motion.div>
        </button>
      </div>
    </>
  )
}