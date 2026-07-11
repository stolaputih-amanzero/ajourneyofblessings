'use client'

import { Share } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ShareButton({ title, text, url }: { title: string, text: string, url?: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleShare = async () => {
    const shareUrl = url || window.location.href
    const shareData = {
      title,
      text,
      url: shareUrl,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${text}\n\n${shareUrl}`)
        alert('Invitation link copied to clipboard!')
      } catch (err) {
        console.error('Failed to copy', err)
      }
    }
  }

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[375px] flex justify-end px-6 z-50 pointer-events-none">
      <button
        onClick={handleShare}
        className="pointer-events-auto bg-[#0A192F] text-[#D4AF37] p-3 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.4)] hover:bg-[#05101E] hover:text-[#C19A2D] transition-transform hover:scale-105 active:scale-95 flex items-center justify-center border border-[#D4AF37]/50"
        aria-label="Share Invitation"
      >
        <Share size={22} strokeWidth={2} />
      </button>
    </div>
  )
}
