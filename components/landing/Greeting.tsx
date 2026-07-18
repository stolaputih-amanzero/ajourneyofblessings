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
            <motion.div variants={itemVariants} className="w-full flex items-center justify-between mb-12 text-[10px] tracking-[0.2em] font-bold uppercase text-[var(--color-primary)]">
                <div className="w-1/3 text-left">
                    Welcome
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="w-8 h-px bg-[#E5989B]"></div>
                </div>
                <div className="w-1/3 text-right">
                    <span className="underline decoration-[#E5989B] decoration-2 underline-offset-4">
                        Guest
                    </span>
                </div>
            </motion.div>

            {/* Name Section */}
            <motion.div variants={itemVariants} className="text-center mb-10">
                <h2 className="text-2xl text-[#E5989B] mb-2 font-script drop-shadow-sm">Dearest</h2>
                <h1 className="text-gradient-gold font-script text-4xl leading-tight tracking-tight px-2">
                    {guest.title ? `${guest.title} ` : ''}{guest.full_name}
                </h1>
                <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#E5989B] to-transparent mt-6 mx-auto"></div>
            </motion.div>

            {/* Premium Gold Frame Rectangle Card Section */}
            <motion.div variants={itemVariants} className="relative w-full flex-1 mt-4 mb-8 flex justify-center">
                <div className="premium-glass rounded-2xl flex flex-col items-center justify-center text-center px-6 py-10 w-full max-w-sm relative overflow-hidden border border-[#E5989B]/40 shadow-xl">
                    {/* Soft Radial Floral-like Gradient instead of image watermark */}
                    <div className="absolute inset-0 z-0 pointer-events-none select-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FFB4A2]/10 via-[#FFCDB2]/5 to-transparent w-full h-full">
                    </div>

                    <p className="text-[#B5838D]/90 text-sm font-sans font-light leading-relaxed mb-6 z-10">
                        We are deeply honored to invite you to the 70th Birthday Thanksgiving Service of
                    </p>

                    {/* Monogram 70 */}
                    <div className="w-20 h-20 rounded-full border border-[#E5989B]/60 p-1 mb-4 shadow-md z-10 relative overflow-hidden bg-white/50">
                        <div className="w-full h-full rounded-full overflow-hidden border border-white/40 shadow-inner select-none">
                            <img 
                                src="/70.jpeg" 
                                alt="70 Monogram" 
                                className="w-full h-full object-cover mix-blend-multiply opacity-90"
                            />
                        </div>
                    </div>

                    <h2 className="text-[#B5838D] font-script text-3xl px-2 leading-snug drop-shadow-sm z-10 relative">
                        Yvonne Wakkary Rumambi
                    </h2>
                    <p className="mt-4 text-[#E5989B] text-[9px] tracking-[0.2em] uppercase font-bold drop-shadow-sm z-10 relative">
                        Honoring a life beautifully blessed
                    </p>
                </div>
            </motion.div>
        </motion.div>
    )
}