import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import Envelope from '@/components/landing/Envelope'
import InvitationDetails from '@/components/landing/InvitationDetails'
import GoldDust from '@/components/GoldDust'
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
          width: 1024,
          height: 1024,
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
          <InvitationDetails
            guest={guest}
            eventDate={eventDate}
            eventTime={eventTime}
            eventLocation={eventLocation}
            eventAddress={eventAddress}
            mapLink={mapLink}
            musicUrl={musicUrl}
            targetDate={targetDate}
            initialPrayers={initialPrayers}
            token={resolvedParams.token}
          />
          <div className="sticky bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/10 rounded-full mx-auto my-4 z-50"></div>
        </Envelope>
      </main>
    </>
  )
}