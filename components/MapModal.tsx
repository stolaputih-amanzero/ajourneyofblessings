'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, X, Navigation } from 'lucide-react'

export default function MapModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const mapQuery = "GPIB+Bukit+Moria,+Tebet,+Jakarta+Selatan"
  const iframeSrc = `https://maps.google.com/maps?q=${mapQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          {/* Backdrop click to close */}
          <div className="absolute inset-0 cursor-zoom-out" onClick={() => setIsOpen(false)} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-[#0A192F] border border-[#D4AF37]/30 w-full max-w-[375px] rounded-2xl flex flex-col relative shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b border-white/10 bg-[#0A192F]">
              <span className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-semibold">
                Lokasi Acara
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Map Frame */}
            <div className="w-full h-64 bg-white/5 relative">
              <iframe 
                src={iframeSrc} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>

            {/* Detail Info */}
            <div className="p-6 bg-[#05101E] flex flex-col space-y-4">
              <div>
                <p className="text-white text-lg font-serif italic mb-1">
                  GPIB "Bukit Moria"
                </p>
                <p className="text-white/60 text-xs leading-relaxed font-sans">
                  Jl. Soepomo No. 4, Tebet, Jakarta Selatan, Indonesia.
                </p>
              </div>
              
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#0A192F] py-3.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:shadow-lg hover:shadow-amber-500/20 transition-all active:scale-95 text-center"
              >
                <Navigation size={12} />
                <span>Buka di Google Maps</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg hover:bg-[#D4AF37]/20 transition-all active:scale-[0.98] group cursor-pointer"
      >
        <MapPin size={14} className="text-[#D4AF37]" />
        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-bold group-hover:underline underline-offset-4">
          Lihat Detail Lokasi
        </span>
      </button>
      {mounted ? createPortal(modalContent, document.body) : null}
    </>
  )
}