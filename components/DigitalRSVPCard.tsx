'use client'

import { useRef, useState, useEffect } from 'react'
import html2canvas from 'html2canvas-pro'
import QRCode from 'qrcode'
import { Download } from 'lucide-react'
import { motion } from 'framer-motion'

interface DigitalRSVPCardProps {
  token: string
  guestName: string
  count: number
}

export default function DigitalRSVPCard({ token, guestName, count }: DigitalRSVPCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')

  // Generate scannable QR Code on mount
  useEffect(() => {
    const generateQR = async () => {
      try {
        const inviteUrl = `${window.location.origin}/invite/${token}`
        const url = await QRCode.toDataURL(inviteUrl, {
          width: 300,
          margin: 1.5,
          color: {
            dark: '#3D405B',   // Charcoal text color code
            light: '#FFFFFF'  // White background
          }
        })
        setQrCodeUrl(url)
      } catch (err) {
        console.error('Failed to generate QR Code:', err)
      }
    }
    generateQR()
  }, [token])

  const handleDownload = async () => {
    if (!cardRef.current) return
    setIsGenerating(true)

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2.5, // High resolution capture
        backgroundColor: '#FFFFFF', // Background matches parent wrapper
        logging: false,
        useCORS: true // Allow rendering QR code image correctly
      })

      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `VIP_Pass_${guestName.replace(/\s+/g, '_')}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('Failed to generate image:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex flex-col items-center mt-6 w-full font-sans select-none">
      <motion.div 
         style={{ perspective: 1000 }}
        animate={{ rotateX: [-2.5, 2.5, -2.5], rotateY: [-2.5, 2.5, -2.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="w-full max-w-[300px]"
      >
        {/* VIP Pass Card */}
        <div 
          ref={cardRef}
          className="w-full bg-white relative flex flex-col items-center justify-center border border-[var(--color-secondary)]/40 rounded-2xl overflow-hidden shadow-lg shadow-[var(--color-secondary)]/10"
        >
          {/* Top Section - Earthy Border Accent */}
          <div className="w-full p-6 text-center border-b-[2px] border-dashed border-[var(--color-secondary)]/40 bg-gradient-to-b from-white to-[var(--color-background)]">
            <span className="text-[var(--color-tertiary)] text-[8px] tracking-[0.4em] uppercase font-bold block mb-2 font-sans">
              VIP Entry Pass
            </span>
            <h3 className="text-2xl font-serif italic text-[var(--color-text)] px-1 truncate">
              {guestName}
            </h3>
            <p className="text-[var(--color-text)]/60 text-[8px] uppercase tracking-[0.2em] font-bold mt-2.5 font-sans">
              Confirmation: {count} Guests
            </p>
          </div>

          {/* Bottom Section */}
          <div className="w-full p-6 flex flex-col items-center bg-white">
            
            {/* Real QR Code instead of static icon */}
            <div className="w-32 h-32 p-1.5 bg-white border border-[var(--color-secondary)]/40 rounded-xl flex items-center justify-center mb-4 shadow-sm">
              {qrCodeUrl ? (
                <img 
                  src={qrCodeUrl} 
                  alt="Scannable QR Code" 
                  className="w-full h-full object-contain rounded-lg"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-full h-full bg-gray-50 animate-pulse rounded-lg" />
              )}
            </div>

            <p className="text-[var(--color-text)]/50 text-[7px] font-sans uppercase tracking-[0.3em] mb-1 font-bold">
              Thanksgiving Service
            </p>
            <p className="text-[var(--color-tertiary)] text-lg font-serif italic mb-4 text-center">
              Yvonne Wakkary Rumambi
            </p>
            
            {/* Unique VIP Pass Hex Code */}
            <div className="text-[8px] text-[var(--color-text)]/40 font-sans font-bold tracking-[0.3em]">
              PASS: {Math.abs(guestName.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0)).toString(16).toUpperCase()}-{count}
            </div>
          </div>
          
          {/* Ticket Edge Cutouts */}
          <div className="absolute top-[37.5%] -left-3.5 w-7 h-7 bg-white border-r border-[var(--color-secondary)]/40 rounded-full shadow-inner" />
          <div className="absolute top-[37.5%] -right-3.5 w-7 h-7 bg-white border-l border-[var(--color-secondary)]/40 rounded-full shadow-inner" />
        </div>
      </motion.div>

      {/* Elegant CTA Download Button */}
      <button
        onClick={handleDownload}
        disabled={isGenerating || !qrCodeUrl}
        className="mt-6 flex items-center justify-center space-x-2 text-[9px] uppercase tracking-widest font-bold text-white bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] px-7 py-3.5 rounded-full hover:shadow-lg hover:shadow-[var(--color-secondary)]/30 transition-all active:scale-95 disabled:opacity-50 cursor-pointer shadow-md"
      >
        <Download size={13} className="text-white" />
        <span>{isGenerating ? 'Saving...' : 'Download VIP Card'}</span>
      </button>
    </div>
  )
}
