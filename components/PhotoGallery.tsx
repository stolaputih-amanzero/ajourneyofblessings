'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'

type Photo = {
  id: string
  image_url: string
  caption: string
}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('order_index', { ascending: true })

      if (!error && data) {
        setPhotos(data as Photo[])
      }
      setLoading(false)
    }
    fetchPhotos()
  }, [supabase])

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-6 h-6 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
      </div>
    )
  }

  if (photos.length === 0) return null

  return (
    <div className="py-8 w-full max-w-full">
      {/* Header */}
      <div className="flex items-center justify-center space-x-2 mb-6">
        <Camera size={14} className="text-[#D4AF37]" />
        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-bold">
          Dokumentasi Pelayanan
        </span>
      </div>

      {/* Swipeable Carousel Container - FIXED: No Overflow */}
      <div className="relative w-full max-w-full">
        <div
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex-shrink-0 w-[280px] snap-center aspect-[4/5] rounded-2xl overflow-hidden border border-[#D4AF37]/20 shadow-2xl"
            >
              <img
                src={photo.image_url}
                alt={photo.caption}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Gradient Overlay for Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-80" />

              {/* Caption */}
              {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-xs font-serif italic leading-relaxed break-words">
                    "{photo.caption}"
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <p className="text-center text-white/40 text-[9px] uppercase tracking-widest mt-2">
        Geser untuk melihat kenangan
      </p>
    </div>
  )
}