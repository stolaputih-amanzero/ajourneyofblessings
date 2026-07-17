'use client'

import dynamic from 'next/dynamic'

// Dynamically import all heavy interactive components with ssr: false so they don't load initially on cover page
const RSVPForm = dynamic(() => import('@/components/RSVPForm'), { ssr: false })
const Guestbook = dynamic(() => import('@/components/Guestbook'), { ssr: false })
const CountdownTimer = dynamic(() => import('@/components/CountdownTimer'), { ssr: false })
const FadeIn = dynamic(() => import('@/components/FadeIn'), { ssr: false })
const ShareButton = dynamic(() => import('@/components/ShareButton'), { ssr: false })
const PhotoGallery = dynamic(() => import('@/components/PhotoGallery'), { ssr: false })
const MapModal = dynamic(() => import('@/components/MapModal'), { ssr: false })
const BackgroundMusic = dynamic(() => import('@/components/BackgroundMusic'), { ssr: false })
const DownloadPDF = dynamic(() => import('@/components/DownloadPDF'), { ssr: false })
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false })
const Greeting = dynamic(() => import('@/components/landing/Greeting'), { ssr: false })
const Timeline = dynamic(() => import('@/components/Timeline'), { ssr: false })
const HologramGreeting = dynamic(() => import('@/components/HologramGreeting'), { ssr: false })

interface Guest {
  id: string
  full_name: string
  title: string
  unique_token: string
  rsvp_status: boolean | null
  attendance_count: number | null
}

interface InvitationDetailsProps {
  guest: Guest
  eventDate: string
  eventTime: string
  eventLocation: string
  eventAddress: string
  mapLink: string
  musicUrl: string
  targetDate: string
  initialPrayers: any[]
  token: string
}

export default function InvitationDetails({
  guest,
  eventDate,
  eventTime,
  eventLocation,
  eventAddress,
  mapLink,
  musicUrl,
  targetDate,
  initialPrayers,
  token,
}: InvitationDetailsProps) {
  return (
    <>
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
      <HologramGreeting token={token} />
      
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
          initialCount={guest.attendance_count || 1}
        />
      </div>

      <FadeIn delay={0.2} className="bg-[#FAF0EB] text-[#2C1E17] border-t border-[#D4AF37]/20 relative z-10">
        <Guestbook
          token={guest.unique_token}
          guestName={guest.full_name}
          initialPrayers={initialPrayers}
        />
        <div className="pb-6 flex justify-center pt-8 px-4">
          <DownloadPDF 
            guestName={guest.full_name} 
            guestTitle={guest.title} 
            eventDate={eventDate}
            eventTime={eventTime}
            eventLocation={eventLocation}
            eventAddress={eventAddress}
          />
        </div>
        
        <div className="pb-12 flex justify-center text-center px-4">
          <a 
            href="https://amanloka.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.2em] text-[#2C1E17]/50 hover:text-[#2C1E17] transition-all duration-300 font-sans uppercase font-bold"
          >
            exclusively designed by <span className="underline decoration-[#D4AF37] decoration-2 underline-offset-4 font-extrabold text-[#2C1E17]">AMAN ecosystem</span>
          </a>
        </div>
      </FadeIn>
    </>
  )
}
