import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import PieChart from '@/components/admin/PieChart'
import BarChart from '@/components/admin/BarChart'
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowUpRight, 
  Plus, 
  Download, 
  MessageSquare,
  Sparkles,
  Activity,
  Settings
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.email !== 'admin@journeyofblessing.com') {
    redirect('/admin/login')
  }

  // Fetch stats from RPC
  const { data: statsArray, error: statsError } = await supabase.rpc('admin_get_stats')
  const stats = statsArray?.[0] || {
    total_guests: 0,
    attending: 0,
    declining: 0,
    no_response: 0,
    total_attendance_count: 0,
    total_prayers: 0
  }

  // Fetch recent guests from RPC
  const { data: guests, error: guestsError } = await supabase.rpc('admin_get_guests', {
    p_limit: 100,
  })

  if (statsError || guestsError) {
    console.error('Dashboard error:', statsError || guestsError)
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 font-sans">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-4">
          <XCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-serif text-white font-bold mb-2">Gagal Memuat Data</h2>
        <p className="text-white/60 text-sm max-w-md mb-6">
          Terjadi kesalahan saat berkomunikasi dengan database. Silakan pastikan skema database dan fungsi RPC telah dipasang dengan benar.
        </p>
      </div>
    )
  }

  // Group RSVPs by date for the Bar Chart
  const rsvpByDateMap: Record<string, number> = {}
  
  if (guests) {
    // We sort chronologically to build the chart correctly
    const sortedGuests = [...guests].reverse()
    
    sortedGuests
      .filter((g: any) => g.rsvp_status === true && g.created_at)
      .forEach((g: any) => {
        const date = new Date(g.created_at).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
        })
        rsvpByDateMap[date] = (rsvpByDateMap[date] || 0) + (g.attendance_count || 1)
      })
  }

  const barChartData = Object.entries(rsvpByDateMap)
    .map(([label, value]) => ({ label, value }))
    .slice(-7) // Last 7 unique dates

  const finalBarData = barChartData.length > 0 
    ? barChartData 
    : [
        { label: 'Belum', value: 0 },
        { label: 'Ada', value: 0 },
        { label: 'Data', value: 0 }
      ]

  // Filter recent confirmations for the activity feed
  const recentConfirmations = guests
    ? guests.filter((g: any) => g.rsvp_status !== null).slice(0, 5)
    : []

  return (
    <div className="space-y-8 font-sans pb-16 text-white">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gradient-gold">
            Dashboard Utama
          </h1>
          <p className="text-white/50 text-xs mt-1">
            Selamat datang kembali, Panitia Penerima Tamu. Monitor data kehadiran secara real-time.
          </p>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <Link
            href="/admin/guests"
            className="flex items-center space-x-2 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#0A192F] px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Tamu</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Guests */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Total Undangan</span>
            <span className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/80">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-serif font-bold text-white">{stats.total_guests}</h3>
            <p className="text-[10px] text-white/40 mt-1">Kontak terdaftar</p>
          </div>
        </div>

        {/* Card 2: Attending */}
        <div className="backdrop-blur-md bg-white/5 border border-[#D4AF37]/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold">Hadir (RSVP)</span>
            <span className="p-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37]">
              <CheckCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-serif font-bold text-white">{stats.attending}</h3>
            <p className="text-[10px] text-white/40 mt-1">Mengonfirmasi hadir</p>
          </div>
        </div>

        {/* Card 3: Declined */}
        <div className="backdrop-blur-md bg-white/5 border border-rose-500/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-widest text-rose-400 font-bold">Tidak Hadir</span>
            <span className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <XCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-serif font-bold text-white">{stats.declining}</h3>
            <p className="text-[10px] text-white/40 mt-1">Berhalangan hadir</p>
          </div>
        </div>

        {/* Card 4: Pending */}
        <div className="backdrop-blur-md bg-white/5 border border-slate-500/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Belum Respon</span>
            <span className="p-2 rounded-lg bg-slate-500/10 border border-slate-500/20 text-slate-400">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-serif font-bold text-white">{stats.no_response}</h3>
            <p className="text-[10px] text-white/40 mt-1">Menunggu konfirmasi</p>
          </div>
        </div>
      </div>

      {/* Projected Headcount Summary Card */}
      <div className="backdrop-blur-md bg-gradient-to-br from-[#0A192F] to-[#020C1B] border border-[#D4AF37]/35 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 transform translate-x-12 -translate-y-12 text-[#D4AF37]/5 pointer-events-none">
          <Sparkles className="w-64 h-64" />
        </div>
        <div className="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left mb-4 sm:mb-0">
          <div className="flex items-center space-x-2 text-[#D4AF37] mb-1">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Proyeksi Jumlah Kehadiran</span>
          </div>
          <h2 className="text-xl font-serif italic text-white/90">
            Total Estimasi Porsi Makanan &amp; Kursi
          </h2>
          <p className="text-white/40 text-xs mt-1 max-w-lg">
            Angka ini dihitung berdasarkan total konfirmasi kehadiran + jumlah tamu tambahan yang diajak oleh masing-masing tamu undangan.
          </p>
        </div>
        <div className="relative z-10 bg-white/5 border border-white/10 px-8 py-5 rounded-2xl text-center shrink-0 min-w-[140px]">
          <span className="text-5xl font-serif font-bold text-gradient-gold">{stats.total_attendance_count}</span>
          <span className="text-[9px] uppercase tracking-widest text-white/50 block mt-1 font-bold">Orang</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RSVP Distribution (Pie) */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col shadow-lg">
          <div className="border-b border-white/5 pb-4 mb-4">
            <h2 className="text-sm font-serif font-bold text-white/90 flex items-center">
              <Activity className="w-4 h-4 mr-2 text-[#D4AF37]" />
              Persentase RSVP
            </h2>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <PieChart 
              attending={stats.attending} 
              declining={stats.declining} 
              noResponse={stats.no_response} 
            />
          </div>
        </div>

        {/* RSVP Trend (Bar) */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col shadow-lg">
          <div className="border-b border-white/5 pb-4 mb-4">
            <h2 className="text-sm font-serif font-bold text-white/90 flex items-center">
              <Activity className="w-4 h-4 mr-2 text-[#D4AF37]" />
              Tren Konfirmasi Hadir
            </h2>
          </div>
          <div className="flex-1">
            <BarChart data={finalBarData} title="Kehadiran Tambahan Per Tanggal Konfirmasi" />
          </div>
        </div>
      </div>

      {/* Row 3: Activity Feed & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg flex flex-col">
          <div className="border-b border-white/5 pb-4 mb-4 flex items-center justify-between">
            <h2 className="text-sm font-serif font-bold text-white/90 flex items-center">
              <Activity className="w-4 h-4 mr-2 text-[#D4AF37]" />
              Aktivitas RSVP Terbaru
            </h2>
            <span className="text-[9px] uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded text-white/40">Real-time</span>
          </div>

          <div className="flex-1 divide-y divide-white/5">
            {recentConfirmations.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center py-10 text-white/40 italic text-xs">
                Belum ada konfirmasi RSVP masuk.
              </div>
            ) : (
              recentConfirmations.map((g: any) => (
                <div key={g.id} className="py-3 flex justify-between items-center text-xs">
                  <div className="flex flex-col">
                    <span className="text-white font-semibold">{g.title ? `${g.title} ` : ''}{g.full_name}</span>
                    <span className="text-white/40 text-[9px] mt-0.5">
                      {new Date(g.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="text-right">
                    {g.rsvp_status === true ? (
                      <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase tracking-wider">Hadir ({g.attendance_count})</span>
                    ) : (
                      <span className="text-[9px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded uppercase tracking-wider">Berhalangan</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <div className="border-b border-white/5 pb-4 mb-6">
              <h2 className="text-sm font-serif font-bold text-white/90 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-[#D4AF37]" />
                Akses Pintar &amp; Fitur
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link 
                href="/admin/guests"
                className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 rounded-xl text-center group transition-all"
              >
                <Users className="w-6 h-6 text-[#D4AF37] mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase tracking-wider font-bold text-white">Kelola Tamu</span>
              </Link>
              <Link 
                href="/admin/guests?export=true"
                className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 rounded-xl text-center group transition-all"
              >
                <Download className="w-6 h-6 text-[#D4AF37] mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase tracking-wider font-bold text-white">Ekspor CSV</span>
              </Link>
              <Link 
                href="/admin/prayers"
                className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 rounded-xl text-center group transition-all"
              >
                <MessageSquare className="w-6 h-6 text-[#D4AF37] mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase tracking-wider font-bold text-white">Buku Tamu</span>
              </Link>
              <Link 
                href="/admin/settings"
                className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 rounded-xl text-center group transition-all"
              >
                <Settings className="w-6 h-6 text-[#D4AF37] mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase tracking-wider font-bold text-white">Pengaturan</span>
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-white/30 font-bold uppercase tracking-wider">
            <span>Keep Shining App v0.1.0</span>
            <span className="flex items-center text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Sistem Aktif
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
