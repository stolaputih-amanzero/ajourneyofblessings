'use client'

import { useRef, useState } from 'react'
import html2canvas from 'html2canvas-pro'
import { Download, QrCode } from 'lucide-react'
import { motion } from 'framer-motion'

interface DigitalRSVPCardProps {
  guestName: string
  count: number
}

export default function DigitalRSVPCard({ guestName, count }: DigitalRSVPCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownload = async () => {
    if (!cardRef.current) return
    setIsGenerating(true)

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // Higher resolution
        backgroundColor: '#0A192F', // Match background for ticket cutouts
        logging: false,
      })

      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `Emeritus_VIP_Pass_${guestName.replace(/\s+/g, '_')}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('Failed to generate image:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex flex-col items-center mt-8 w-full">
      <motion.div 
        style={{ perspective: 1000 }}
        animate={{ rotateX: [-3, 3, -3], rotateY: [-3, 3, -3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="w-full max-w-[320px]"
      >
        <div 
          ref={cardRef}
          className="w-full bg-[#05101E] relative flex flex-col items-center justify-center border border-[#D4AF37]/50 rounded-xl overflow-hidden metallic-shadow"
        >
          {/* Top Section */}
          <div className="w-full p-8 text-center border-b-[2px] border-dashed border-[#D4AF37]/30 bg-[#0A192F]">
            <p className="text-[#D4AF37] text-[10px] tracking-[0.4em] uppercase font-bold mb-3">
              VIP Entry Pass
            </p>
            <h3 className="text-3xl font-serif text-[#FFDF73] italic leading-tight drop-shadow-md">
              {guestName}
            </h3>
            <p className="text-white/60 text-[9px] uppercase tracking-[0.2em] font-bold mt-3">
              Valid for {count} Guest(s)
            </p>
          </div>

          {/* Bottom Section */}
          <div className="w-full p-8 flex flex-col items-center bg-gradient-to-b from-[#05101E] to-[#0A192F]">
            <QrCode size={80} strokeWidth={1} className="text-[#D4AF37] mb-5 opacity-80" />
            <p className="text-white/80 text-[10px] font-sans uppercase tracking-[0.3em] mb-2">
              Emeritus Ceremony
            </p>
            <p className="text-gradient-gold text-sm font-serif italic mb-5 text-center">
              Pdt. Ny. Meinita M.E. Wungo-Damping
            </p>
            {/* Random ID generator for aesthetic purpose based on name length */}
            <div className="text-[9px] text-white/40 font-mono tracking-[0.4em]">
              ID: {Math.abs(guestName.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0)).toString(16).toUpperCase()}-{count}
            </div>
          </div>
          
          {/* Ticket Cutouts */}
          <div className="absolute top-[48%] -left-4 w-8 h-8 bg-[#0A192F] border-r border-[#D4AF37]/50 rounded-full" />
          <div className="absolute top-[48%] -right-4 w-8 h-8 bg-[#0A192F] border-l border-[#D4AF37]/50 rounded-full" />
        </div>
      </motion.div>

      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="mt-8 flex items-center justify-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-[#0A192F] bg-gradient-to-r from-[#E6C875] via-[#D4AF37] to-[#B8860B] px-8 py-4 rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all disabled:opacity-50 active:scale-95"
      >
        <Download size={14} />
        <span>{isGenerating ? 'Saving Pass...' : 'Save VIP Pass'}</span>
      </button>
    </div>
  )
}
