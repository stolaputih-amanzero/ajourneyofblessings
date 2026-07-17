'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { motion } from 'framer-motion'
import { PlayCircle, AlertCircle } from 'lucide-react'

export default function VideoTribute() {
  const [videoData, setVideoData] = useState<{ youtube_id: string; title: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const fetchVideo = async () => {
      const { data, error } = await supabase
        .from('event_config')
        .select('value')
        .eq('key', 'video_tribute')
        .single()

      if (!error && data) {
        setVideoData(data.value as any)
      }
      setLoading(false)
    }
    fetchVideo()
  }, [supabase])

  if (loading || !videoData?.youtube_id) return null

  const youtubeUrl = `https://www.youtube.com/embed/${videoData.youtube_id}?rel=0&modestbranding=1`

  return (
    <div className="py-8 w-full max-w-full">
      {/* Header */}
      <div className="flex items-center justify-center space-x-2 mb-6">
        <PlayCircle size={14} className="text-[#D4AF37]" />
        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-bold">
          Video Tribute
        </span>
      </div>

      {/* Cinematic Video Container - FIXED: No Overflow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative w-full max-w-full aspect-video rounded-2xl overflow-hidden border-2 border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.15)] bg-black"
      >
        {!error ? (
          <iframe
            src={youtubeUrl}
            title={videoData.title || "Video Tribute"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            onError={() => setError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <AlertCircle size={48} className="text-[#D4AF37]/50 mb-4" />
            <p className="text-white/60 text-sm mb-2">
              Video cannot be played
            </p>
            <a
              href={`https://www.youtube.com/watch?v=${videoData.youtube_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] text-xs underline underline-offset-4 hover:text-white transition-colors"
            >
              Open in YouTube
            </a>
          </div>
        )}
      </motion.div>

      <p className="text-center text-white/60 text-xs font-serif italic mt-4 break-words">
        {videoData.title || "70 Years of Grace"}
      </p>
    </div>
  )
}