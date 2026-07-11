'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useToast } from '@/components/admin/Toast'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  Trash2, 
  Search, 
  Download, 
  Calendar,
  X,
  Loader2,
  AlertTriangle,
  FileText
} from 'lucide-react'

type Prayer = {
  id: string
  message: string
  created_at: string
  guest_id: string | null
  guest_title: string | null
  guest_full_name: string | null
  guest_token: string | null
  total_count: string
}

export default function PrayersPage() {
  const supabase = createClient()
  const { success, error } = useToast()

  const [prayers, setPrayers] = useState<Prayer[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [deletingPrayer, setDeletingPrayer] = useState<Prayer | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Fetch Prayers
  const fetchPrayers = useCallback(async () => {
    setLoading(true)
    try {
      const { data, error: err } = await supabase.rpc('admin_get_prayers', {
        p_limit: 200, // Fetch up to 200 for dashboard
        p_offset: 0
      })

      if (err) throw err

      if (data) {
        setPrayers(data as Prayer[])
      } else {
        setPrayers([])
      }
    } catch (e: any) {
      error('Gagal memuat buku tamu: ' + e.message)
    } finally {
      setLoading(false)
    }
  }, [supabase, error])

  useEffect(() => {
    fetchPrayers()
  }, [fetchPrayers])

  // Delete Prayer Action
  const handleDelete = async () => {
    if (!deletingPrayer) return
    setSubmitting(true)
    try {
      const { error: err } = await supabase.rpc('admin_delete_prayer', {
        p_id: deletingPrayer.id
      })

      if (err) throw err

      success('Pesan buku tamu berhasil dihapus')
      setIsDeleteModalOpen(false)
      setDeletingPrayer(null)
      fetchPrayers()
    } catch (e: any) {
      error('Gagal menghapus pesan: ' + e.message)
    } finally {
      setSubmitting(false)
    }
  }

  // Export to CSV Action
  const handleExportCSV = () => {
    if (prayers.length === 0) {
      error('Tidak ada pesan untuk diekspor')
      return
    }

    const headers = ['ID', 'Nama Tamu', 'Gelar', 'Pesan Ucapan', 'Tanggal Dikirim']
    const csvRows = [
      headers.join(','),
      ...prayers.map(p => [
        p.id,
        `"${p.guest_full_name || 'Anonymous'}"`,
        `"${p.guest_title || ''}"`,
        `"${p.message.replace(/"/g, '""')}"`,
        `"${new Date(p.created_at).toLocaleString('id-ID')}"`
      ].join(','))
    ]

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + csvRows.join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `Buku_Tamu_Keep_Shining_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    success('Buku tamu berhasil diekspor ke CSV')
  }

  // Filter logic in JS
  const filteredPrayers = prayers.filter((p) => {
    const matchesSearch = 
      (p.guest_full_name || '').toLowerCase().includes(search.toLowerCase()) ||
      p.message.toLowerCase().includes(search.toLowerCase())
    
    const matchesDate = filterDate 
      ? new Date(p.created_at).toISOString().split('T')[0] === filterDate
      : true

    return matchesSearch && matchesDate
  })

  return (
    <div className="space-y-6 text-white font-sans pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gradient-gold">Buku Tamu / Doa</h1>
          <p className="text-white/50 text-xs mt-1">
            Total {prayers.length} doa &amp; ucapan dari tamu undangan terdaftar.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center space-x-2 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#0A192F] px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:shadow-lg transition-all cursor-pointer shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Ekspor Buku Tamu</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative sm:col-span-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/40 pointer-events-none">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Cari berdasarkan nama tamu atau isi pesan ucapan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 placeholder-white/30 text-white text-xs pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Date Filter */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/40 pointer-events-none">
            <Calendar className="w-4 h-4" />
          </span>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full bg-[#020C1B] border border-white/10 text-white text-xs pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#D4AF37] cursor-pointer"
          />
          {filterDate && (
            <button 
              onClick={() => setFilterDate('')} 
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid List of Prayers */}
      {loading ? (
        <div className="p-20 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
          <p className="text-xs text-white/50 tracking-widest uppercase font-bold">Memuat Doa...</p>
        </div>
      ) : filteredPrayers.length === 0 ? (
        <div className="premium-glass bg-white/5 border border-white/10 rounded-2xl p-20 text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
            <MessageSquare className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-white/50">Tidak ada ucapan ditemukan</p>
          <p className="text-xs text-white/30 max-w-xs">
            Belum ada ucapan yang cocok dengan filter pencarian Anda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPrayers.map((p) => (
            <motion.div
              key={p.id}
              layout
              className="premium-glass bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-md relative group hover:border-[#D4AF37]/35 transition-all"
            >
              <p className="text-white/80 text-xs italic leading-relaxed font-sans">
                "{p.message}"
              </p>
              
              <div className="flex items-center justify-between border-t border-white/5 pt-3 text-[10px]">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-serif text-[10px] italic">
                    {p.guest_full_name ? p.guest_full_name[0] : 'A'}
                  </div>
                  <span className="font-bold text-white/90">
                    {p.guest_title ? `${p.guest_title} ` : ''}{p.guest_full_name || 'Anonymous'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3 text-white/40">
                  <span>
                    {new Date(p.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                  <button
                    onClick={() => {
                      setDeletingPrayer(p)
                      setIsDeleteModalOpen(true)
                    }}
                    className="text-white/20 hover:text-red-400 p-1 rounded transition-colors cursor-pointer"
                    title="Hapus Pesan"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* MODAL: DELETE CONFIRMATION */}
      <AnimatePresence>
        {isDeleteModalOpen && deletingPrayer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsDeleteModalOpen(false)
                setDeletingPrayer(null)
              }}
              className="absolute inset-0 bg-black"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0A192F] border border-red-500/30 p-6 rounded-2xl w-full max-w-sm shadow-2xl relative z-10 text-white"
            >
              <div className="flex items-center space-x-3 text-red-400 mb-4">
                <AlertTriangle className="w-6 h-6 shrink-0" />
                <h3 className="text-base font-serif font-bold">Hapus Ucapan?</h3>
              </div>
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                Apakah Anda yakin ingin menghapus doa/ucapan dari <strong>{deletingPrayer.guest_full_name || 'Anonymous'}</strong> secara permanen?
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsDeleteModalOpen(false)
                    setDeletingPrayer(null)
                  }}
                  className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-lg text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  disabled={submitting}
                  className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-bold text-xs rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  {submitting ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                  <span>Hapus</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
