import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'A Journey of Blessing | 70th Birthday Thanksgiving Service',
  description: '70th Birthday Thanksgiving Service Invitation for Ibu Yvonne Wakkary Rumambi',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0', // Prevents zooming on mobile inputs
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
