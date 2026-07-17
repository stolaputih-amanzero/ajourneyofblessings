'use client'

import { motion } from 'framer-motion'

interface Guest {
    full_name: string
    title: string
}

interface GreetingProps {
    guest: Guest
}

// Variabel animasi untuk efek muncul berurutan (staggered)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Jeda antar elemen
            delayChildren: 0.3,   // Jeda awal sebelum animasi dimulai
        },
    },
} as const

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: 'easeOut' },
    },
} as const

export default function Greeting({ guest }: GreetingProps) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full px-6 py-12 flex flex-col items-center"
        >
            {/* Header Section: Welcome --- Guest */}
            <motion.div variants={itemVariants} className="w-full flex items-center justify-between mb-12 text-[10px] tracking-[0.2em] font-bold uppercase text-white">
                <div className="w-1/3 text-left">
                    Welcome
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="w-8 h-px bg-[#D4AF37]"></div>
                </div>
                <div className="w-1/3 text-right">
                    <span className="underline decoration-[#D4AF37] decoration-2 underline-offset-4">
                        Guest
                    </span>
                </div>
            </motion.div>

            {/* Name Section */}
            <motion.div variants={itemVariants} className="text-center mb-10">
                <h2 className="text-xl text-[#FFDF73]/80 mb-2 font-serif italic drop-shadow-md">Dearest</h2>
                <h1 className="text-gradient-gold font-serif text-3xl leading-tight tracking-tight px-2">
                    {guest.title ? `${guest.title} ` : ''}{guest.full_name}
                </h1>
                <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent mt-6 mx-auto"></div>
            </motion.div>

            {/* Elegant Floral Watercolor Header */}
            <motion.div variants={itemVariants} className="w-48 h-auto mb-2 opacity-85 pointer-events-none select-none">
                <img 
                    src="/images/floral_header.png" 
                    alt="Floral Header Decoration" 
                    className="w-full h-auto object-contain"
                />
            </motion.div>

            {/* Arch/Card Section */}
            <motion.div variants={itemVariants} className="relative w-full flex-1 mt-4 mb-8 flex justify-center">
                <div className="premium-glass rounded-t-full flex flex-col items-center justify-center text-center px-6 py-10 w-full max-w-sm">
                    <p className="text-white/80 text-sm italic font-serif leading-relaxed mb-6">
                        We are deeply honored to invite you to the 70th Birthday Thanksgiving Service of
                    </p>

                    {/* Monogram Y */}
                    <div className="w-20 h-20 rounded-full border border-[#D4AF37]/50 p-1 mb-4 metallic-shadow">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#2C1E17] to-[#19110B] flex items-center justify-center text-[#FFDF73] italic font-serif text-2xl border border-white/10 metallic-shadow">
                            Y
                        </div>
                    </div>

                    <h2 className="text-white/90 font-serif text-xl px-2 leading-snug drop-shadow-sm">
                        Yvonne Wakkary Rumambi
                    </h2>
                    <p className="mt-4 text-[#E6C875] text-[9px] tracking-[0.2em] uppercase font-bold drop-shadow-sm">
                        Honoring a life beautifully blessed
                    </p>
                </div>
            </motion.div>
        </motion.div>
    )
}