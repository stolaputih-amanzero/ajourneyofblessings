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
import Envelope from '@/components/landing/Envelope'
import Greeting from '@/components/landing/Greeting'
import Timeline from '@/components/Timeline'
import GoldDust from '@/components/GoldDust'
import HologramGreeting from '@/components/HologramGreeting'
import FloralPetals from '@/components/FloralPetals'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// Helper to parse event date & time into ISO string for the countdown timer
function parseEventDateTimeToISO(dateStr: string, timeStr: string): string {
  try {
    const months: { [key: string]: string } = {
      januari: '01', january: '01',
      februari: '02', february: '02',
      maret: '03', march: '03',
      april: '04',
      mei: '05', may: '05',
      juni: '06', june: '06',
      juli: '07', july: '07',
      agustus: '08', august: '08',
      september: '09',
      oktober: '10', october: '10',
      november: '11',
      desember: '12', december: '12'
    }

    const cleanDate = dateStr.toLowerCase()
    let year = '2026'
    const yearMatch = cleanDate.match(/\b(20\d{2})\b/)
    if (yearMatch) year = yearMatch[1]

    let month = '08'
    for (const [name, num] of Object.entries(months)) {
      if (cleanDate.includes(name)) {
        month = num
        break
      }
    }

    let day = '03'
    const numbers = cleanDate.match(/\b\d+\b/g)
    if (numbers) {
      const dayNum = numbers.find(n => n !== year)
      if (dayNum) day = dayNum.padStart(2, '0')
    }

    let hours = '18'
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
      return '2026-08-03T18:00:00+07:00'
    }
    return isoStr
  } catch (e) {
    return '2026-08-03T18:00:00+07:00'
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
    : 'Special Guest'

  // Fetch configurations
  const { data: configs } = await supabase
    .from('event_config')
    .select('key, value')

  let eventDate = 'Monday, August 3rd, 2026'
  let eventLocation = 'Restaurant Beautika, 3rd Floor'
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
    title: 'Thanksgiving Invitation - Yvonne Wakkary Rumambi',
    description: `Dear ${guestName}, you are cordially invited to the 70th Birthday Thanksgiving Service of Yvonne Wakkary Rumambi on ${eventDate} at ${eventLocation}.`,
    openGraph: {
      title: 'Thanksgiving Invitation - Yvonne Wakkary Rumambi',
      description: `Dear ${guestName}, you are cordially invited to the 70th Birthday Thanksgiving Service of Yvonne Wakkary Rumambi.`,
      url: `${baseUrl}/invite/${resolvedParams.token}`,
      siteName: 'A Journey of Blessing',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'Thanksgiving Invitation Yvonne Wakkary Rumambi',
        },
      ],
      locale: 'en_US',
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

  let eventDate = 'Monday, August 3rd, 2026'
  let eventTime = '18:00 WIB'
  let eventLocation = 'Restaurant Beautika, 3rd Floor'
  let eventAddress = 'Jalan Panglima Polim - Jakarta Selatan'
  let mapLink = 'https://maps.app.goo.gl/wRypd7zL2XfQd6t47'
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
      <main className="relative mx-auto w-full flex min-h-screen max-w-md flex-col bg-[#2C1E17] bg-spotlight text-white overflow-x-hidden">
        <GoldDust />
        <FloralPetals />
        
        {/* Subtle Background Watermark */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.06] z-0 select-none">
          <img 
            src="/images/floral_header.png" 
            alt="Floral background watermark" 
            className="w-full h-full object-cover"
          />
        </div>

        <Envelope guest={guest}>
          <BackgroundMusic musicUrl={musicUrl} />
          <ShareButton
            title="Thanksgiving Invitation - Yvonne Wakkary Rumambi"
            text={`Shalom, you are cordially invited to the 70th Birthday Thanksgiving Service of Yvonne Wakkary Rumambi on ${eventDate} at ${eventLocation}. God bless you.`}
          />
          <ScrollProgress />

          <Greeting guest={guest} />

          {/* Standalone Sweet Countdown Card */}
          <div className="px-6 pb-6 z-10 relative">
            <CountdownTimer targetDate={targetDate} />
          </div>
          
          {/* ✅ HOLOGRAM VIDEO GREETING */}
          <HologramGreeting token={resolvedParams.token} />
          
          <Timeline />

          {/* Standalone Blush-Cream Paper Card for detailed event info */}
          <FadeIn delay={0.4} className="px-6 py-8 z-10 relative">
            <div className="bg-[#FAF0EB] text-[#2C1E17] border-2 border-[#D4AF37]/40 rounded-2xl p-6 flex flex-col space-y-6 shadow-xl relative overflow-hidden">
              {/* Watercolor Floral watermark inside the card */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.12] mix-blend-multiply w-full h-full">
                <img 
                  src="/images/floral_header.png" 
                  alt="Floral background"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>

              <div className="flex justify-between items-end border-b border-[#2C1E17]/10 pb-4 z-10 relative">
                <div className="flex flex-col">
                  <span className="text-[#5F7A61] text-[9px] uppercase tracking-widest font-bold">Date &amp; Day</span>
                  <span className="text-sm font-serif italic mt-1 text-[#2C1E17]">{eventDate}</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[#5F7A61] text-[9px] uppercase tracking-widest font-bold">Time</span>
                  <span className="text-sm font-serif italic mt-1 text-[#2C1E17]">{eventTime}</span>
                </div>
              </div>

              <div className="flex flex-col z-10 relative">
                <span className="text-[#5F7A61] text-[9px] uppercase tracking-widest font-bold mb-2">Venue</span>
                <p className="text-[#2C1E17] font-serif text-base mb-1">{eventLocation}</p>
                <p className="text-[#2C1E17]/70 text-xs font-sans mb-3">{eventAddress}</p>
                <MapModal location={eventLocation} address={eventAddress} mapLink={mapLink} />
              </div>
            </div>
          </FadeIn>

          {/* Spacing for Photo Gallery */}
          <div className="px-6 py-4 z-10 relative">
            <div className="w-full max-w-full overflow-hidden">
              <PhotoGallery />
            </div>
          </div>

          {/* Spacing for RSVP Form */}
          <div className="px-6 py-4 pb-12 z-10 relative">
            <RSVPForm
              token={guest.unique_token}
              guestName={guest.title ? `${guest.title} ${guest.full_name}` : guest.full_name}
              initialStatus={guest.rsvp_status}
              initialCount={guest.attendance_count}
            />
          </div>

          <FadeIn delay={0.2} className="bg-[#FAF0EB] text-[#2C1E17] border-t border-[#D4AF37]/20 relative z-10">
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