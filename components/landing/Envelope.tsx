'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloralPetals from '@/components/FloralPetals'

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
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center min-h-screen px-6 relative overflow-hidden bg-gradient-to-b from-[#2C1E17] to-[#120B07]"
                >
                    {/* Floating Petals Layer */}
                    <FloralPetals />

                    {/* Floral Background Watermark */}
                    <div className="fixed inset-0 pointer-events-none opacity-[0.08] z-0 select-none">
                        <img 
                            src="/images/floral_header.png" 
                            alt="Floral background" 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Elegant Watercolor Floral Corner Ornaments */}
                    <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none opacity-45 z-10 select-none">
                        <svg viewBox="0 0 120 120" fill="none" className="w-full h-full text-[#D4AF37]">
                            <path d="M0,0 Q30,10 40,30 T20,70 Q10,40 0,0 Z" fill="currentColor" opacity="0.15"/>
                            <path d="M0,0 Q10,30 30,40 T70,20 Q40,10 0,0 Z" fill="currentColor" opacity="0.15"/>
                            <circle cx="20" cy="20" r="2" fill="currentColor"/>
                            <circle cx="35" cy="15" r="1.5" fill="currentColor"/>
                            <circle cx="15" cy="35" r="1.5" fill="currentColor"/>
                            <path d="M5,5 Q15,45 60,60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2"/>
                            <path d="M5,5 Q45,15 60,60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2"/>
                        </svg>
                    </div>

                    <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none opacity-45 rotate-180 z-10 select-none">
                        <svg viewBox="0 0 120 120" fill="none" className="w-full h-full text-[#D4AF37]">
                            <path d="M0,0 Q30,10 40,30 T20,70 Q10,40 0,0 Z" fill="currentColor" opacity="0.15"/>
                            <path d="M0,0 Q10,30 30,40 T70,20 Q40,10 0,0 Z" fill="currentColor" opacity="0.15"/>
                            <circle cx="20" cy="20" r="2" fill="currentColor"/>
                            <circle cx="35" cy="15" r="1.5" fill="currentColor"/>
                            <circle cx="15" cy="35" r="1.5" fill="currentColor"/>
                            <path d="M5,5 Q15,45 60,60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2"/>
                            <path d="M5,5 Q45,15 60,60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2"/>
                        </svg>
                    </div>

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
                        className="relative mb-8 flex flex-col items-center z-10"
                    >
                        <div className="w-[290px] h-[390px] bg-gradient-to-br from-[#2C1E17] to-[#19110B] rounded-2xl shadow-2xl flex flex-col items-center justify-between py-10 px-6 relative overflow-hidden border border-[#D4AF37]/50 metallic-shadow">
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

                            {/* Luxury Double Frame */}
                            <div className="absolute inset-2.5 border border-[#D4AF37]/20 rounded-xl pointer-events-none z-10" />
                            <div className="absolute inset-3.5 border-2 border-[#D4AF37]/35 rounded-[10px] pointer-events-none z-10" />

                            {/* Classic Top Floral Vine Ornament */}
                            <div className="w-24 h-10 text-[#D4AF37]/55 z-10 relative flex justify-center items-center">
                                <svg viewBox="0 0 100 30" fill="currentColor" className="w-full h-full">
                                    <path d="M50,15 C45,8 30,12 18,12 C28,12 40,17 50,15 Z" opacity="0.8"/>
                                    <path d="M50,15 C55,8 70,12 82,12 C72,12 60,17 50,15 Z" opacity="0.8"/>
                                    <circle cx="50" cy="15" r="3.5"/>
                                    <circle cx="35" cy="11" r="1.5"/>
                                    <circle cx="65" cy="11" r="1.5"/>
                                    <circle cx="24" cy="13" r="1"/>
                                    <circle cx="76" cy="13" r="1"/>
                                </svg>
                            </div>

                            {/* Soft Radial Gold Glow behind text */}
                            <div className="absolute w-36 h-36 rounded-full bg-gradient-to-r from-[#D4AF37]/10 to-transparent blur-2xl pointer-events-none z-0" />
                            
                            {/* Guest Name - The Focal Point */}
                            <div className="w-full text-center z-20 px-4 flex-1 flex flex-col justify-center">
                                <p className="text-[8px] text-[#D4AF37]/75 uppercase tracking-[0.4em] font-bold mb-2.5">Dear</p>
                                <div className="w-8 h-px bg-[#D4AF37]/30 mx-auto mb-4"></div>
                                <h3 className={`text-gradient-gold font-serif italic ${nameFontSizeClass} leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
                                    {fullName}
                                </h3>
                                <div className="w-8 h-px bg-[#D4AF37]/30 mx-auto mt-4"></div>
                            </div>

                            {/* Bottom Laurel Branch Wrapper framing the seal */}
                            <div className="w-24 h-12 text-[#D4AF37]/30 z-10 relative flex justify-center items-center mb-6">
                                <svg viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
                                    <path d="M15,10 Q50,32 85,10" />
                                    <path d="M25,14 L20,9" />
                                    <path d="M38,20 L33,15" />
                                    <path d="M62,20 L67,15" />
                                    <path d="M75,14 L80,9" />
                                    <circle cx="50" cy="22" r="1.5" fill="currentColor" />
                                </svg>
                            </div>
                        </div>

                        {/* Interactive Classic Wax Seal with Laurel Wreath Pattern */}
                        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
                            {/* Rotating Gold Accent Ring around Seal */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-3.5 rounded-full border border-dashed border-[#D4AF37]/50 pointer-events-none"
                            />
                            {/* Subtle Breathing Glow to Indicate Interactivity */}
                            <motion.div
                                animate={{ scale: [1, 1.12, 1], opacity: [0.1, 0.35, 0.1] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 rounded-full bg-[#D4AF37] pointer-events-none blur-[4px]"
                            />
                            <motion.button 
                                onClick={() => setIsOpen(true)}
                                whileHover={{ scale: 1.08, rotate: 6 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative w-15 h-15 bg-gradient-to-br from-[#E6C875] via-[#D4AF37] to-[#B8860B] rounded-full metallic-shadow flex items-center justify-center border border-white/30 shadow-[0_0_20px_rgba(212,175,55,0.35)] cursor-pointer z-10"
                            >
                                {/* Classic Floral / Wreath inside the wax seal */}
                                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-2 text-[#4A321A]/30 fill-none stroke-currentColor stroke-[1.5]">
                                    <circle cx="50" cy="50" r="32" strokeDasharray="3,3" />
                                    <path d="M28,50 C28,38 38,28 50,28 C62,28 72,38 72,50" />
                                    <path d="M28,50 C28,62 38,72 50,72 C62,72 72,62 72,50" />
                                    <path d="M38,38 L42,42" />
                                    <path d="M62,38 L58,42" />
                                    <path d="M38,62 L42,58" />
                                    <path d="M62,62 L58,58" />
                                </svg>
                                <span className="text-[#19110B] font-serif text-2xl font-bold drop-shadow-sm z-10 select-none">70</span>
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Elegant Theme Text Lockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center mt-16 pb-8 z-10"
                    >
                        <h2 className="text-gradient-gold font-serif italic text-3xl md:text-4xl leading-normal mb-1 drop-shadow-lg text-center px-4">
                            A Journey of Blessing
                        </h2>
                        <p className="text-[#D4AF37]/80 text-[8px] tracking-[0.3em] uppercase font-bold text-center mt-1">
                            Honoring a life beautifully blessed
                        </p>
                    </motion.div>

                    {/* Bottom Signature */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 1.2 }}
                        className="absolute bottom-4 left-0 right-0 text-center z-20"
                    >
                        <a 
                            href="https://amanloka.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[8px] tracking-[0.2em] text-white/30 hover:text-white/70 transition-all duration-300 font-sans uppercase font-medium"
                        >
                            exclusively designed by <span className="underline decoration-[#D4AF37]/45 hover:decoration-[#D4AF37] decoration-1 underline-offset-4 text-white/50">AMAN ecosystem</span>
                        </a>
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