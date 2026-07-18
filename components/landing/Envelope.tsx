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
                    className="flex flex-col items-center justify-center min-h-screen px-6 relative overflow-hidden bg-gradient-to-b from-[var(--color-ivory)] to-[#FFCDB2]/30"
                >
                    {/* Floating Petals Layer */}
                    <FloralPetals />

                    {/* Soft CSS Floral Gradient Overlay */}
                    <div className="fixed inset-0 pointer-events-none z-0 select-none bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#FFB4A2]/20 via-transparent to-transparent"></div>
                    <div className="fixed inset-0 pointer-events-none z-0 select-none bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[#E5989B]/15 via-transparent to-transparent"></div>

                    {/* Elegant Watercolor Floral Corner Ornaments */}
                    <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none opacity-60 z-10 select-none">
                        <svg viewBox="0 0 120 120" fill="none" className="w-full h-full text-[#B5838D]">
                            <path d="M0,0 Q30,10 40,30 T20,70 Q10,40 0,0 Z" fill="currentColor" opacity="0.25"/>
                            <path d="M0,0 Q10,30 30,40 T70,20 Q40,10 0,0 Z" fill="currentColor" opacity="0.25"/>
                            <circle cx="20" cy="20" r="2" fill="currentColor"/>
                            <circle cx="35" cy="15" r="1.5" fill="currentColor"/>
                            <circle cx="15" cy="35" r="1.5" fill="currentColor"/>
                            <path d="M5,5 Q15,45 60,60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2"/>
                            <path d="M5,5 Q45,15 60,60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2"/>
                        </svg>
                    </div>

                    <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none opacity-60 rotate-180 z-10 select-none">
                        <svg viewBox="0 0 120 120" fill="none" className="w-full h-full text-[#B5838D]">
                            <path d="M0,0 Q30,10 40,30 T20,70 Q10,40 0,0 Z" fill="currentColor" opacity="0.25"/>
                            <path d="M0,0 Q10,30 30,40 T70,20 Q40,10 0,0 Z" fill="currentColor" opacity="0.25"/>
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
                        <div className="w-[290px] h-[390px] bg-gradient-to-br from-white to-[#FDFBF7] rounded-[24px] shadow-xl flex flex-col items-center justify-between py-10 px-6 relative overflow-hidden border border-[#E5989B]/40 shadow-[0_10px_40px_rgba(181,131,141,0.12)]">
                            {/* Sweeping Soft Shine Reflection */}
                            <motion.div
                                animate={{
                                    left: ['-100%', '200%']
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    repeatDelay: 5,
                                    ease: "easeInOut"
                                }}
                                className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#FFCDB2]/30 to-transparent skew-x-12 pointer-events-none z-10"
                            />

                            {/* Soft Floral Frame */}
                            <div className="absolute inset-2.5 border border-[#E5989B]/30 rounded-xl pointer-events-none z-10" />
                            <div className="absolute inset-3.5 border border-[#B5838D]/20 rounded-[10px] pointer-events-none z-10" />

                            {/* Classic Top Floral Vine Ornament */}
                            <div className="w-24 h-10 text-[#B5838D]/70 z-10 relative flex justify-center items-center">
                                <svg viewBox="0 0 100 30" fill="currentColor" className="w-full h-full">
                                    <path d="M50,15 C45,8 30,12 18,12 C28,12 40,17 50,15 Z" opacity="0.6"/>
                                    <path d="M50,15 C55,8 70,12 82,12 C72,12 60,17 50,15 Z" opacity="0.6"/>
                                    <circle cx="50" cy="15" r="3.5"/>
                                    <circle cx="35" cy="11" r="1.5"/>
                                    <circle cx="65" cy="11" r="1.5"/>
                                    <circle cx="24" cy="13" r="1"/>
                                    <circle cx="76" cy="13" r="1"/>
                                </svg>
                            </div>

                            {/* Soft Radial Blush Glow behind text */}
                            <div className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-[#FFB4A2]/20 to-transparent blur-2xl pointer-events-none z-0" />
                            
                            {/* Guest Name - The Focal Point */}
                            <div className="w-full text-center z-20 px-4 flex-1 flex flex-col justify-center">
                                <p className="text-[8px] text-[#B5838D]/80 uppercase tracking-[0.4em] font-bold mb-2.5">Dear</p>
                                <div className="w-8 h-px bg-[#E5989B]/60 mx-auto mb-4"></div>
                                <h3 className={`text-gradient-gold font-script ${nameFontSizeClass} leading-tight drop-shadow-sm`}>
                                    {fullName}
                                </h3>
                                <div className="w-8 h-px bg-[#E5989B]/60 mx-auto mt-4"></div>
                            </div>

                            {/* Bottom Laurel Branch Wrapper framing the seal */}
                            <div className="w-24 h-12 text-[#B5838D]/50 z-10 relative flex justify-center items-center mb-6">
                                <svg viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
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
                            {/* Rotating Soft Accent Ring around Seal */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-3.5 rounded-full border border-dashed border-[#E5989B]/50 pointer-events-none"
                            />
                            {/* Subtle Breathing Glow to Indicate Interactivity */}
                            <motion.div
                                animate={{ scale: [1, 1.12, 1], opacity: [0.1, 0.4, 0.1] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 rounded-full bg-[#FFCDB2] pointer-events-none blur-[4px]"
                            />
                            <motion.button 
                                onClick={() => setIsOpen(true)}
                                whileHover={{ scale: 1.05, rotate: 3 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative w-15 h-15 bg-gradient-to-br from-[#FDFBF7] via-[#FFB4A2] to-[#E5989B] rounded-full flex items-center justify-center border border-white shadow-[0_0_15px_rgba(229,152,155,0.3)] cursor-pointer z-10 overflow-hidden"
                            >
                                <img 
                                    src="/70.jpeg" 
                                    alt="70 Wax Seal" 
                                    className="w-full h-full object-cover mix-blend-multiply opacity-80"
                                />
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
                        <h2 className="text-gradient-gold font-script text-4xl md:text-5xl leading-normal mb-1 drop-shadow-sm text-center px-4">
                            A Journey of Blessing
                        </h2>
                        <p className="text-[#B5838D]/80 text-[8px] tracking-[0.3em] uppercase font-bold text-center mt-2">
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
                            className="text-[8px] tracking-[0.2em] text-[var(--color-primary)]/40 hover:text-[var(--color-primary)]/80 transition-all duration-300 font-sans uppercase font-medium"
                        >
                            exclusively designed by <span className="underline decoration-[#B5838D]/40 hover:decoration-[#B5838D] decoration-1 underline-offset-4 text-[var(--color-primary)]/60">AMAN ecosystem</span>
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