'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'

type Prayer = {
  id: string
  message: string
  created_at: string
  guests: {
    full_name: string
  } | {
    full_name: string
  }[] | null
}

export default function Guestbook({
  token,
  guestName,
  initialPrayers,
}: {
  token: string
  guestName: string
  initialPrayers: Prayer[]
}) {
  const [prayers, setPrayers] = useState<Prayer[]>(initialPrayers)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  // ✅ REALTIME SUBSCRIPTION - Doa baru muncul otomatis
  useEffect(() => {
    const channel = supabase
      .channel('prayers_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'prayers_guestbook',
        },
        async (payload) => {
          // Fetch full prayer data with guest name
          const { data: newPrayer } = await supabase
            .from('prayers_guestbook')
            .select('id, message, created_at, guests(full_name)')
            .eq('id', payload.new.id)
            .single()

          if (newPrayer) {
            setPrayers((prev) => [newPrayer as unknown as Prayer, ...prev])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    // ✅ SECURITY FIX: Menggunakan RPC Function (Bukan direct insert)
    const { data, error: insertError } = await supabase.rpc('insert_prayer_by_token', {
      p_token: token,
      p_message: message.trim(),
    })

    setIsSubmitting(false)

    if (insertError) {
      console.error('Guestbook Error:', insertError)
      setError('An error occurred. Please try again.')
    } else {
      setSuccess(true)
      setMessage('')

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  return (
    <div className="px-8 py-12 bg-[#FAF0EB]">
      <div className="flex flex-col items-center mb-10 text-center">
        <span className="text-[10px] tracking-[0.2em] text-[#2C1E17] font-bold uppercase mb-2">
          Guestbook
        </span>
        <h2 className="text-[#2C1E17] font-serif italic text-3xl mb-2">
          Prayers &amp; Wishes
        </h2>
        <div className="w-12 h-px bg-[#D4AF37]"></div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-5 mb-12">
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a prayer or wish for Ibu Yvonne..."
            className="w-full bg-white border border-[#2C1E17]/10 p-5 text-sm text-[#2C1E17] font-sans focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-amber-200/50 transition-all resize-none h-36 placeholder:text-[#2C1E17]/30 rounded-lg shadow-sm"
            required
          />
          <div className="absolute bottom-3 right-3 text-[10px] text-[#2C1E17]/30">
            {message.length} chars
          </div>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 text-xs text-center bg-red-50 py-2 px-4 rounded-lg"
            >
              {error}
            </motion.p>
          )}
          {success && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider text-center bg-amber-50 py-2 px-4 rounded-lg"
            >
              ✓ Message sent successfully!
            </motion.p>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={isSubmitting || !message.trim()}
          className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#2C1E17] py-4 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:shadow-lg hover:shadow-amber-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
        >
          {isSubmitting ? 'Sending...' : 'Send Wishes'}
        </button>
      </form>

      <div className="flex flex-col space-y-8">
        <AnimatePresence>
          {prayers.map((prayer, index) => (
            <motion.div
              key={prayer.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col border-l-2 border-[#D4AF37]/30 pl-5 py-2 bg-white/50 p-5 rounded-r-lg shadow-sm"
            >
              <p className="text-[#2C1E17]/80 text-sm italic font-serif leading-relaxed mb-3">
                "{prayer.message}"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-px bg-[#D4AF37]"></span>
                  <span className="text-[#2C1E17] text-[9px] font-bold uppercase tracking-widest">
                    {Array.isArray(prayer.guests)
                      ? prayer.guests[0]?.full_name || 'Anonymous'
                      : prayer.guests?.full_name || 'Anonymous'}
                  </span>
                </div>
                <span className="text-[#2C1E17]/40 text-[9px]">
                  {new Date(prayer.created_at).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {prayers.length === 0 && (
          <div className="text-center py-10">
            <p className="text-[#2C1E17]/40 text-sm italic mb-2">
              No prayers or wishes yet
            </p>
            <p className="text-[#2C1E17]/30 text-xs">
              Be the first to leave a message
            </p>
          </div>
        )}
      </div>
    </div>
  )
}