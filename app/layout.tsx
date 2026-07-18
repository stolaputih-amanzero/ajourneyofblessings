import type { Viewport, Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { headers } from 'next/headers'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers()
  const host = headerList.get('host') || 'yvonne.amanzero.space'
  const protocol = headerList.get('x-forwarded-proto') || 'https'
  const dynamicBaseUrl = `${protocol}://${host}`
  let siteUrl = process.env.NEXT_PUBLIC_APP_URL || dynamicBaseUrl

  // Self-healing check: If env URL contains localhost but current request host does not, use dynamicBaseUrl
  if (siteUrl.includes('localhost') && !host.includes('localhost')) {
    siteUrl = dynamicBaseUrl
  }

  return {
    metadataBase: new URL(siteUrl),
    title: 'A Journey of Blessing | 70th Birthday Thanksgiving Service',
    description: '70th Birthday Thanksgiving Service Invitation for Yvonne Wakkary Rumambi',
    icons: {
      icon: '/icon.png',
      apple: '/apple-icon.png',
    },
    openGraph: {
      title: 'A Journey of Blessing | 70th Birthday Thanksgiving Service',
      description: '70th Birthday Thanksgiving Service Invitation for Yvonne Wakkary Rumambi',
      url: siteUrl,
      siteName: 'A Journey of Blessing',
      images: [
        {
          url: `${dynamicBaseUrl}/og-image.jpeg`,
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
      images: [`${dynamicBaseUrl}/og-image.jpeg`],
    },
  }
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
