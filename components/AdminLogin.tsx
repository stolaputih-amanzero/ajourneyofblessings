'use client'

import { useState } from 'react'
import { loginAdmin } from '@/app/admin/actions'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const result = await loginAdmin(formData)
    
    if (result.error) {
      setError(result.error)
      setIsPending(false)
    } else {
      router.refresh()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-[#0A192F] text-white h-full relative z-10 w-full">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-serif text-[#D4AF37] mb-6 text-center italic">Organizer Access</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input 
            type="password" 
            name="passkey" 
            placeholder="Enter Passkey" 
            className="w-full bg-white/5 border border-white/20 p-4 text-center text-white focus:outline-none focus:border-[#D4AF37] rounded-none"
            required
          />
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
          <button 
            type="submit"
            disabled={isPending}
            className="w-full bg-[#D4AF37] text-[#0A192F] py-4 uppercase tracking-[0.2em] font-bold text-xs hover:bg-[#C19A2D] transition-colors disabled:opacity-50"
          >
            {isPending ? 'Verifying...' : 'Access Dashboard'}
          </button>
        </form>
      </div>
    </div>
  )
}
