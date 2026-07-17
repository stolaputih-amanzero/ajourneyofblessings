'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { jsPDF } from 'jspdf'

interface DownloadPDFProps {
  guestName: string
  guestTitle?: string
  eventDate?: string
  eventTime?: string
  eventLocation?: string
  eventAddress?: string
}

export default function DownloadPDF({ 
  guestName, 
  guestTitle,
  eventDate = 'Monday, August 3rd, 2026',
  eventTime = '18:00 WIB',
  eventLocation = 'Restaurant Beautika, 3rd Floor',
  eventAddress = 'Jalan Panglima Polim - Jakarta Selatan'
}: DownloadPDFProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = () => {
    setIsGenerating(true)
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      // Add elegant background color: Blush Cream #FAF0EB (250, 240, 235)
      doc.setFillColor(250, 240, 235)
      doc.rect(0, 0, 210, 297, 'F')
      
      // Gold Border
      doc.setDrawColor(212, 175, 55) // #D4AF37
      doc.setLineWidth(1)
      doc.rect(15, 15, 180, 267)
      
      doc.setDrawColor(212, 175, 55)
      doc.setLineWidth(0.3)
      doc.rect(17, 17, 176, 263)

      // Text color: Earth Brown #2C1E17 (44, 30, 23)
      doc.setTextColor(44, 30, 23)

      // Title
      doc.setFont('times', 'italic')
      doc.setFontSize(18)
      doc.text('Dearest', 105, 50, { align: 'center' })

      doc.setFont('times', 'normal')
      doc.setFontSize(28)
      const fullName = guestTitle ? `${guestTitle} ${guestName}` : guestName
      doc.text(fullName, 105, 65, { align: 'center' })

      // Divider
      doc.setDrawColor(212, 175, 55)
      doc.setLineWidth(0.5)
      doc.line(85, 80, 125, 80)

      doc.setFont('times', 'italic')
      doc.setFontSize(16)
      doc.text('We are deeply honored to invite you to the', 105, 100, { align: 'center' })
      doc.text('70th Birthday Thanksgiving Service of', 105, 110, { align: 'center' })

      doc.setFont('times', 'bold')
      doc.setFontSize(24)
      doc.text('Ibu Yvonne Wakkary Rumambi', 105, 130, { align: 'center' })

      doc.setFont('times', 'bold')
      doc.setFontSize(12)
      doc.text('HONORING A LIFE BEAUTIFULLY BLESSED', 105, 145, { align: 'center' })

      // Divider
      doc.line(85, 165, 125, 165)

      // Details
      doc.setFont('times', 'bold')
      doc.setFontSize(14)
      doc.setTextColor(212, 175, 55) // Gold
      doc.text('DATE & TIME', 105, 185, { align: 'center' })
      
      doc.setFont('times', 'normal')
      doc.setTextColor(44, 30, 23)
      doc.text(eventDate, 105, 195, { align: 'center' })
      doc.text(eventTime, 105, 205, { align: 'center' })

      doc.setFont('times', 'bold')
      doc.setTextColor(212, 175, 55)
      doc.text('LOCATION', 105, 225, { align: 'center' })

      doc.setFont('times', 'normal')
      doc.setTextColor(44, 30, 23)
      doc.text(eventLocation, 105, 235, { align: 'center' })
      doc.text(eventAddress, 105, 245, { align: 'center' })
      
      // Footer
      doc.setFont('times', 'italic')
      doc.setFontSize(14)
      doc.text('A Journey of Blessing', 105, 275, { align: 'center' })

      doc.save(`Thanksgiving_Invitation_${guestName.replace(/\s+/g, '_')}.pdf`)
    } catch (error) {
      console.error('Error generating PDF', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="flex items-center justify-center space-x-2 border border-[#D4AF37]/50 text-[#D4AF37] px-6 py-3 rounded-full hover:bg-[#D4AF37]/10 transition-colors disabled:opacity-50 text-[10px] tracking-[0.2em] uppercase font-bold"
    >
      <Download size={14} />
      <span>{isGenerating ? 'Generating...' : 'Download PDF'}</span>
    </button>
  )
}
