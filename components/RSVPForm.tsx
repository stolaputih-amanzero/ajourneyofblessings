'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import confetti from 'canvas-confetti'
import DigitalRSVPCard from '@/components/DigitalRSVPCard'

interface RSVPFormProps {
  token: string
  guestName: string
  initialStatus: boolean | null
  initialCount: number
  initialNotes?: string
}

export default function RSVPForm({
  token,
  guestName,
  initialStatus,
  initialCount,
  initialNotes = '',
}: RSVPFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<boolean | null>(initialStatus)
  const [count, setCount] = useState<number>(initialCount || 1)
  const [notes, setNotes] = useState<string>(initialNotes)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(initialStatus !== null)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const handleUpdate = async () => {
    if (status === null) return

    setIsSubmitting(true)
    setError(null)

    // ✅ SECURITY FIX: Menggunakan RPC Function (Bukan direct update)
    const { error: updateError } = await supabase.rpc('update_rsvp_by_token', {
      p_token: token,
      p_status: status,
      p_count: status ? count : 0,
      p_notes: notes || ''
    })

    setIsSubmitting(false)

    if (updateError) {
      console.error('RSVP Error:', updateError)
      setError('A system error occurred. Please try again.')
    } else {
      setIsSuccess(true)
      setIsOpen(false)

      // Confetti effect if guest is attending
      if (status === true) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#E5989B', '#B5838D', '#FFB4A2']
        })
      }
    }
  }

  // Success view
  if (isSuccess && !isOpen) {
    return (
      <div className="flex flex-col items-center w-full mt-6">
        <div className="w-full border border-[#E5989B]/40 p-6 text-center bg-white/60 backdrop-blur-md rounded-2xl shadow-md">
          <p className="text-[#E5989B] text-[10px] uppercase tracking-[0.2em] font-bold mb-2">
            RSVP Confirmed
          </p>
          <p className="text-[#B5838D] text-2xl font-script mb-1">
            {status ? `Joyfully attending (${count})` : 'Respectfully declining'}
          </p>
          {notes && (
            <p className="text-[#B5838D]/70 text-xs mt-3 italic font-sans">"{notes}"</p>
          )}
          <button
            onClick={() => setIsOpen(true)}
            className="text-[#E5989B] text-[9px] uppercase tracking-widest underline underline-offset-4 mt-4 hover:text-[#B5838D] transition-colors"
          >
            Update RSVP
          </button>
        </div>
        {status && (
          <div className="mt-4 w-full">
            <DigitalRSVPCard token={token} guestName={guestName} count={count} />
          </div>
        )}
      </div>
    )
  }

  // Initial call-to-action button
  if (!isOpen && !isSuccess) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-gradient-to-r from-[#FFB4A2] to-[#E5989B] text-white py-4 mt-6 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:shadow-lg hover:shadow-[#E5989B]/30 transition-all active:scale-95 shadow-md"
      >
        Confirm Attendance (RSVP)
      </button>
    )
  }

  // Form view
  return (
    <div className="mt-6 border border-[#E5989B]/30 p-6 flex flex-col space-y-6 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg">
      <div className="flex flex-col space-y-4">
        <span className="text-[#E5989B] text-[10px] uppercase tracking-[0.2em] font-bold text-center">
          Will you be attending?
        </span>
        <div className="flex space-x-3">
          <button
            onClick={() => setStatus(true)}
            className={`flex-1 py-3 text-[10px] uppercase tracking-widest font-bold rounded-full border transition-all ${status === true
                ? 'bg-[#E5989B] text-white border-[#E5989B] shadow-md shadow-[#E5989B]/30'
                : 'bg-white/50 text-[#B5838D] border-[#E5989B]/30 hover:border-[#E5989B]'
              }`}
          >
            Yes, Attending
          </button>
          <button
            onClick={() => setStatus(false)}
            className={`flex-1 py-3 text-[10px] uppercase tracking-widest font-bold rounded-full border transition-all ${status === false
                ? 'bg-[#E5989B] text-white border-[#E5989B] shadow-md shadow-[#E5989B]/30'
                : 'bg-white/50 text-[#B5838D] border-[#E5989B]/30 hover:border-[#E5989B]'
              }`}
          >
            Regretfully Declining
          </button>
        </div>
      </div>

      {status === true && (
        <div className="flex flex-col space-y-4 items-center border-t border-[#E5989B]/20 pt-6">
          <span className="text-[#E5989B] text-[10px] uppercase tracking-[0.2em] font-bold text-center">
            Number of Guests
          </span>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setCount(Math.max(1, count - 1))}
              className="w-10 h-10 rounded-full border border-[#E5989B]/50 bg-white/50 text-[#B5838D] flex items-center justify-center text-xl font-sans hover:bg-[#E5989B] hover:text-white hover:border-[#E5989B] transition-colors shadow-sm"
            >
              -
            </button>
            <span className="text-2xl font-sans font-medium text-[#B5838D] w-6 text-center">{count}</span>
            <button
              onClick={() => setCount(Math.min(5, count + 1))}
              className="w-10 h-10 rounded-full border border-[#E5989B]/50 bg-white/50 text-[#B5838D] flex items-center justify-center text-xl font-sans hover:bg-[#E5989B] hover:text-white hover:border-[#E5989B] transition-colors shadow-sm"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Special wishes block */}
      <div className="flex flex-col space-y-2 border-t border-[#E5989B]/20 pt-6">
        <span className="text-[#E5989B] text-[10px] uppercase tracking-[0.2em] font-bold text-center">
          Special Notes / Wishes (Optional)
        </span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write a message or prayer for Ibu Yvonne..."
          className="w-full bg-white/50 border border-[#E5989B]/30 rounded-xl p-3 text-sm text-[#B5838D] placeholder-[#B5838D]/40 focus:outline-none focus:border-[#E5989B] focus:ring-1 focus:ring-[#E5989B]/50 transition-all resize-none h-20 shadow-inner"
        />
      </div>

      {error && <p className="text-red-400 text-xs text-center">{error}</p>}

      <div className="flex flex-col space-y-3 pt-2">
        <button
          onClick={handleUpdate}
          disabled={status === null || isSubmitting}
          className="w-full bg-gradient-to-r from-[#FFB4A2] to-[#E5989B] text-white py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:shadow-lg hover:shadow-[#E5989B]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-md"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Confirmation'}
        </button>
        {isSuccess && (
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#B5838D]/60 text-[9px] uppercase tracking-widest py-2 hover:text-[#B5838D] transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}