import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import RSVPForm from '@/components/RSVPForm'
import Guestbook from '@/components/Guestbook'
import CountdownTimer from '@/components/CountdownTimer'
import FadeIn from '@/components/FadeIn'
import ShareButton from '@/components/ShareButton'
import PhotoGallery from '@/components/PhotoGallery'
import MapModal from '@/components/MapModal'
import BackgroundMusic from '@/components/BackgroundMusic'
import DownloadPDF from '@/components/DownloadPDF'
import ScrollProgress from '@/components/ScrollProgress'
import VideoTribute from '@/components/VideoTribute'
import Envelope from '@/components/landing/Envelope'
import Greeting from '@/components/landing/Greeting'
import Timeline from '@/components/Timeline'
import GoldDust from '@/components/GoldDust'
import HologramGreeting from '@/components/HologramGreeting'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://meinita.amanloka.com'

// Helper to parse Indonesian event date & time into ISO string for the countdown timer
function parseEventDateTimeToISO(dateStr: string, timeStr: string): string {
  try {
    const months: { [key: string]: string } = {
      januari: '01', februari: '02', maret: '03', april: '04', mei: '05', juni: '06',
      juli: '07', agustus: '08', september: '09', oktober: '10', november: '11', desember: '12'
    }

    const cleanDate = dateStr.toLowerCase()
    let year = new Date().getFullYear().toString()
    const yearMatch = cleanDate.match(/\b(20\d{2})\b/)
    if (yearMatch) year = yearMatch[1]

    let month = '01'
    for (const [name, num] of Object.entries(months)) {
      if (cleanDate.includes(name)) {
        month = num
        break
      }
    }

    let day = '01'
    const numbers = cleanDate.match(/\b\d+\b/g)
    if (numbers) {
      const dayNum = numbers.find(n => n !== year)
      if (dayNum) day = dayNum.padStart(2, '0')
    }

    let hours = '09'
    let minutes = '00'
    const timeMatch = timeStr.match(/(\d{2})[:.](\d{2})/)
    if (timeMatch) {
      hours = timeMatch[1]
      minutes = timeMatch[2]
    }

    let tzOffset = '+07:00'
    const cleanTime = timeStr.toUpperCase()
    if (cleanTime.includes('WITA')) tzOffset = '+08:00'
    else if (cleanTime.includes('WIT')) tzOffset = '+09:00'

    const isoStr = `${year}-${month}-${day}T${hours}:${minutes}:00${tzOffset}`
    if (isNaN(Date.parse(isoStr))) {
      return '2026-08-16T09:00:00+07:00'
    }
    return isoStr
  } catch (e) {
    return '2026-08-16T09:00:00+07:00'
  }
}

// ✅ WHATSAPP PREVIEW METADATA
export async function generateMetadata({ params }: { params: Promise<{ token: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const supabase = await createClient()
  
  const { data: guests } = await supabase.rpc('get_guest_by_token', { 
    p_token: resolvedParams.token 
  })
  const guest = guests?.[0]
  
  const guestName = guest 
    ? (guest.title ? `${guest.title} ${guest.full_name}` : guest.full_name) 
    : 'Tamu Undangan'

  // Fetch configurations
  const { data: configs } = await supabase
    .from('event_config')
    .select('key, value')

  let eventDate = 'Minggu, 16 Agustus 2026'
  let eventLocation = 'GPIB Bukit Moria'
  let ogImageUrl = `${baseUrl}/og-image.png`

  if (configs) {
    configs.forEach((cfg: any) => {
      if (cfg.key === 'event_info') {
        eventDate = cfg.value?.date || eventDate
        eventLocation = cfg.value?.location || eventLocation
      }
      if (cfg.key === 'seo_config') {
        ogImageUrl = cfg.value?.og_image_url || ogImageUrl
      }
    })
  }

  return {
    title: 'Undangan Emeritus - Pdt. Ny. Meinita M.E. Wungo-Damping',
    description: `Shalom ${guestName}, Anda diundang ke Ibadah Emeritus Pdt. Ny. Meinita M.E. Wungo-Damping (38 Tahun Pelayanan) pada ${eventDate} di ${eventLocation}.`,
    openGraph: {
      title: 'Undangan Emeritus - Pdt. Ny. Meinita M.E. Wungo-Damping',
      description: `Shalom ${guestName}, Anda diundang ke Ibadah Emeritus Pdt. Ny. Meinita M.E. Wungo-Damping (38 Tahun Pelayanan).`,
      url: `${baseUrl}/invite/${resolvedParams.token}`,
      siteName: 'Keep Shining in His Grace',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'Undangan Emeritus Pdt. Ny. Meinita M.E. Wungo-Damping',
        },
      ],
      locale: 'id_ID',
      type: 'website',
    },
  }
}

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const resolvedParams = await params
  const supabase = await createClient()

  // ✅ SECURE: Menggunakan RPC Function
  const { data: guests, error } = await supabase.rpc('get_guest_by_token', {
    p_token: resolvedParams.token
  })

  const guest = guests?.[0]

  if (error || !guest) {
    notFound()
  }

  const { data: prayers } = await supabase
    .from('prayers_guestbook')
    .select('id, message, created_at, guests(full_name)')
    .order('created_at', { ascending: false })

  const initialPrayers = (prayers as any) || []

  // Fetch configurations
  const { data: configs } = await supabase
    .from('event_config')
    .select('key, value')

  let eventDate = 'Minggu, 16 Agustus 2026'
  let eventTime = '09:00 WIB'
  let eventLocation = 'GPIB "Bukit Moria"'
  let eventAddress = 'Jl. Soepomo No. 4, Tebet, Jakarta Selatan'
  let mapLink = 'https://maps.app.goo.gl/...'
  let musicUrl = '/audio/theme.mp3'

  if (configs) {
    configs.forEach((cfg: any) => {
      if (cfg.key === 'event_info') {
        eventDate = cfg.value?.date || eventDate
        eventTime = cfg.value?.time || eventTime
        eventLocation = cfg.value?.location || eventLocation
        eventAddress = cfg.value?.address || eventAddress
        mapLink = cfg.value?.map_link || mapLink
      }
      if (cfg.key === 'music_config') {
        musicUrl = cfg.value?.music_url || musicUrl
      }
    })
  }

  const targetDate = parseEventDateTimeToISO(eventDate, eventTime)

  return (
    <>
      <main className="relative mx-auto w-full flex min-h-screen max-w-md flex-col bg-[#0A192F] bg-spotlight text-white overflow-x-hidden">
        <GoldDust />

        <Envelope guest={guest}>
          <BackgroundMusic musicUrl={musicUrl} />
          <ShareButton
            title="Undangan Emeritus - Pdt. Ny. Meinita M.E. Wungo-Damping"
            text={`Shalom, Anda diundang ke Ibadah Emeritus Pdt. Ny. Meinita M.E. Wungo-Damping (38 Tahun Pelayanan) pada ${eventDate} di ${eventLocation}. Tuhan Yesus memberkati.`}
          />
          <ScrollProgress />

          <Greeting guest={guest} />
          
          {/* ✅ HOLOGRAM VIDEO GREETING */}
          <HologramGreeting token={resolvedParams.token} />
          
          <Timeline />

          <FadeIn delay={0.4} className="bg-[#0A192F] text-white px-4 py-8 border-t border-[#D4AF37]/20">
            <div className="flex flex-col space-y-6">

              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div className="flex flex-col">
                  <span className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-semibold">Hari / Tanggal</span>
                  <span className="text-base font-serif italic mt-1 text-white">{eventDate}</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-semibold">Waktu</span>
                  <span className="text-base font-serif italic mt-1 text-white">{eventTime}</span>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-semibold mb-2">Tempat</span>
                <p className="text-white font-serif text-base mb-1">{eventLocation}</p>
                <p className="text-white/70 text-xs font-sans mb-3">{eventAddress}</p>
                <MapModal location={eventLocation} address={eventAddress} mapLink={mapLink} />
              </div>

              <CountdownTimer targetDate={targetDate} />

              <div className="w-full max-w-full overflow-hidden">
                <PhotoGallery />
                <VideoTribute />
              </div>

              <RSVPForm
                token={guest.unique_token}
                guestName={guest.title ? `${guest.title} ${guest.full_name}` : guest.full_name}
                initialStatus={guest.rsvp_status}
                initialCount={guest.attendance_count}
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="bg-[#FDFBF7] text-[#0A192F]">
            <Guestbook
              token={guest.unique_token}
              guestName={guest.full_name}
              initialPrayers={initialPrayers}
            />
            <div className="pb-12 flex justify-center pt-8 px-4">
              <DownloadPDF 
                guestName={guest.full_name} 
                guestTitle={guest.title} 
                eventDate={eventDate}
                eventTime={eventTime}
                eventLocation={eventLocation}
                eventAddress={eventAddress}
              />
            </div>
          </FadeIn>

          <div className="sticky bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/10 rounded-full mx-auto my-4 z-50"></div>
        </Envelope>
      </main>
    </>
  )
}