import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://journeyofblessing.com'),
  title: 'A Journey of Blessing | 70th Birthday Thanksgiving Service',
  description: '70th Birthday Thanksgiving Service Invitation for Yvonne Wakkary Rumambi',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'A Journey of Blessing | 70th Birthday Thanksgiving Service',
    description: '70th Birthday Thanksgiving Service Invitation for Yvonne Wakkary Rumambi',
    url: 'https://journeyofblessing.com',
    siteName: 'A Journey of Blessing',
    images: [
      {
        url: '/og-image.jpeg',
        width: 1080,
        height: 720,
        alt: 'A Journey of Blessing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A Journey of Blessing | 70th Birthday Thanksgiving Service',
    description: '70th Birthday Thanksgiving Service Invitation for Yvonne Wakkary Rumambi',
    images: ['/og-image.jpeg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <main className="desktop-fallback">
          {/* Main Mobile Constraint Container */}
          <div className="mobile-container">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
