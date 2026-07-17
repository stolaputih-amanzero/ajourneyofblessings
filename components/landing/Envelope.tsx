'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Guest {
    full_name: string
    title: string
}

interface EnvelopeProps {
    guest: Guest
    children: React.ReactNode
}

export default function Envelope({ guest, children }: EnvelopeProps) {
    const [isOpen, setIsOpen] = useState(false)

    const fullName = guest.title ? `${guest.title} ${guest.full_name}` : guest.full_name
    const nameFontSizeClass = fullName.length > 40 
        ? 'text-base md:text-lg' 
        : fullName.length > 25 
            ? 'text-lg md:text-xl' 
            : 'text-xl md:text-2xl'

    return (
        <AnimatePresence mode="wait">
            {!isOpen ? (
                <motion.div
                    key="envelope"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center min-h-screen px-6"
                >
                    {/* Envelope Icon with 3D Float Effect */}
                    <motion.div
                        style={{ perspective: 1000 }}
                        initial={{ y: 20 }}
                        animate={{ 
                            y: 0,
                            rotateX: [-2, 2, -2],
                            rotateY: [-2, 2, -2] 
                        }}
                        transition={{ 
                            y: { delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                            rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                            rotateY: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="relative mb-8 flex flex-col items-center"
                    >
                        <div className="w-[280px] h-44 bg-gradient-to-br from-[#2C1E17] to-[#19110B] rounded-lg shadow-2xl flex items-center justify-center relative overflow-hidden border border-[#D4AF37]/50 metallic-shadow">
                            {/* Sweeping Gold Shine Reflection */}
                            <motion.div
                                animate={{
                                    left: ['-100%', '200%']
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatDelay: 4,
                                    ease: "easeInOut"
                                }}
                                className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none z-10"
                            />

                            {/* Envelope Side Flaps Illusion */}
                            <div className="absolute top-0 w-full h-full border-t border-[#D4AF37]/20 opacity-50"></div>
                            
                            {/* Envelope Top Flap Accent */}
                            <div className="absolute top-[-60%] left-1/2 -translate-x-1/2 w-[280px] h-[280px] rotate-45 border-b border-r border-[#D4AF37]/40 rounded-br-2xl bg-gradient-to-br from-[#19110B]/40 to-[#D4AF37]/5 shadow-[0_6px_15px_rgba(0,0,0,0.6)] z-10 pointer-events-none"></div>

                            {/* Luxury Double Frame */}
                            <div className="absolute inset-2 border border-[#D4AF37]/25 rounded-md pointer-events-none z-10" />
                            <div className="absolute inset-3 border border-[#D4AF37]/40 rounded-[4px] pointer-events-none z-10" />

                            {/* Art Deco Luxury Corner Ornaments */}
                            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#D4AF37]/65 pointer-events-none z-10">
                                <div className="absolute top-0.5 left-0.5 w-2.5 h-2.5 border-t border-l border-[#D4AF37]/50"></div>
                            </div>
                            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#D4AF37]/65 pointer-events-none z-10">
                                <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 border-t border-r border-[#D4AF37]/50"></div>
                            </div>
                            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#D4AF37]/65 pointer-events-none z-10">
                                <div className="absolute bottom-0.5 left-0.5 w-2.5 h-2.5 border-b border-l border-[#D4AF37]/50"></div>
                            </div>
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#D4AF37]/65 pointer-events-none z-10">
                                <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 border-b border-r border-[#D4AF37]/50"></div>
                            </div>

                            {/* Soft Radial Gold Glow behind text */}
                            <div className="absolute w-36 h-36 rounded-full bg-gradient-to-r from-[#D4AF37]/10 to-transparent blur-2xl pointer-events-none z-0" />
                            
                            {/* Guest Name - The Focal Point */}
                            <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-20 px-8">
                                <p className="text-[8px] text-[#D4AF37]/75 uppercase tracking-[0.4em] font-bold mb-1.5 drop-shadow">Dear</p>
                                <p className={`text-gradient-gold font-serif italic ${nameFontSizeClass} leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
                                    {fullName}
                                </p>
                            </div>
                        </div>
                        {/* Interactive Wax Seal with Ripple */}
                        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
                            {/* Rotating Gold Accent Ring around Seal */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-2 rounded-full border border-dashed border-[#D4AF37]/60 pointer-events-none"
                            />
                            {/* Subtle Breathing Glow to Indicate Interactivity */}
                            <motion.div
                                animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.4, 0.1] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 rounded-full bg-[#D4AF37] pointer-events-none blur-[4px]"
                            />
                            <motion.button 
                                onClick={() => setIsOpen(true)}
                                whileHover={{ scale: 1.1, rotate: 10 }}
                                whileTap={{ scale: 0.9 }}
                                className="relative w-14 h-14 bg-gradient-to-br from-[#E6C875] via-[#D4AF37] to-[#B8860B] rounded-full metallic-shadow flex items-center justify-center border border-white/30 shadow-[0_0_20px_rgba(212,175,55,0.4)] cursor-pointer z-10"
                            >
                                <span className="text-[#19110B] font-serif text-2xl font-bold drop-shadow-sm">Y</span>
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Elegant Theme Text Lockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center mt-16 pb-8"
                    >
                        <h2 className="text-gradient-gold font-serif italic text-4xl leading-normal drop-shadow-lg mb-1">
                            A Journey of Blessing
                        </h2>
                        <p className="text-[#D4AF37]/80 text-[8px] tracking-[0.3em] uppercase font-bold text-center mt-1">
                            Honoring a life beautifully blessed
                        </p>
                    </motion.div>
                </motion.div>
            ) : (
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}