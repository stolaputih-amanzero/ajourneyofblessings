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
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center min-h-screen px-6 relative overflow-hidden bg-gradient-to-b from-[var(--color-ivory)] to-[var(--color-secondary)]/20"
                >
                    {/* Earthy Botanical Corner Ornaments */}
                    <div className="absolute top-0 left-0 w-40 h-40 pointer-events-none opacity-40 z-10 select-none">
                        <svg viewBox="0 0 120 120" fill="none" className="w-full h-full text-[var(--color-accent)]">
                            <path d="M0,0 Q30,5 40,40 T10,80 Q5,40 0,0 Z" fill="currentColor" opacity="0.3"/>
                            <path d="M0,0 Q5,30 40,40 T80,10 Q40,5 0,0 Z" fill="currentColor" opacity="0.3"/>
                            <path d="M10,10 Q30,60 80,80" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3"/>
                        </svg>
                    </div>

                    <div className="absolute bottom-0 right-0 w-40 h-40 pointer-events-none opacity-40 rotate-180 z-10 select-none">
                        <svg viewBox="0 0 120 120" fill="none" className="w-full h-full text-[var(--color-accent)]">
                            <path d="M0,0 Q30,5 40,40 T10,80 Q5,40 0,0 Z" fill="currentColor" opacity="0.3"/>
                            <path d="M0,0 Q5,30 40,40 T80,10 Q40,5 0,0 Z" fill="currentColor" opacity="0.3"/>
                            <path d="M10,10 Q30,60 80,80" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3"/>
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
                        <div className="w-[290px] h-[390px] bg-gradient-to-br from-white to-[#FAF7F2] rounded-[16px] shadow-2xl flex flex-col items-center justify-between py-10 px-6 relative overflow-hidden border-2 border-[var(--color-primary)] earthy-shadow">
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
                                className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[var(--color-secondary)]/10 to-transparent skew-x-12 pointer-events-none z-10"
                            />

                            {/* Minimalist Earthy Frame */}
                            <div className="absolute inset-3 border border-[var(--color-secondary)]/30 rounded-lg pointer-events-none z-10" />

                            {/* Top Minimal Leaf Ornament */}
                            <div className="w-16 h-8 text-[var(--color-accent)] z-10 relative flex justify-center items-center opacity-70">
                                <svg viewBox="0 0 100 30" fill="currentColor" className="w-full h-full">
                                    <path d="M50,20 Q40,5 20,15 Q40,25 50,20 Z" />
                                    <path d="M50,20 Q60,5 80,15 Q60,25 50,20 Z" />
                                    <circle cx="50" cy="20" r="2" />
                                </svg>
                            </div>

                            {/* Soft Radial Beige Glow behind text */}
                            <div className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-[var(--color-primary)]/40 to-transparent blur-2xl pointer-events-none z-0" />
                            
                            {/* Guest Name - The Focal Point */}
                            <div className="w-full text-center z-20 px-4 flex-1 flex flex-col justify-center">
                                <p className="text-[8px] text-[var(--color-text)]/70 uppercase tracking-[0.4em] font-bold mb-2.5 font-sans">Dear</p>
                                <div className="w-8 h-[2px] bg-[var(--color-tertiary)]/50 mx-auto mb-4"></div>
                                <h3 className={`text-[var(--color-text)] font-serif italic ${nameFontSizeClass} leading-tight drop-shadow-sm`}>
                                    {fullName}
                                </h3>
                                <div className="w-8 h-[2px] bg-[var(--color-tertiary)]/50 mx-auto mt-4"></div>
                            </div>

                            {/* Bottom Minimal Branch Wrapper framing the seal */}
                            <div className="w-20 h-10 text-[var(--color-accent)] z-10 relative flex justify-center items-center mb-6 opacity-60">
                                <svg viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                                    <path d="M20,15 Q50,35 80,15" />
                                    <path d="M30,20 L25,12" />
                                    <path d="M50,27 L50,18" />
                                    <path d="M70,20 L75,12" />
                                </svg>
                            </div>
                        </div>

                        {/* Interactive Earthy Wax Seal */}
                        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
                            {/* Rotating Soft Accent Ring around Seal */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-3.5 rounded-full border border-dashed border-[var(--color-tertiary)]/40 pointer-events-none"
                            />
                            {/* Subtle Breathing Glow to Indicate Interactivity */}
                            <motion.div
                                animate={{ scale: [1, 1.12, 1], opacity: [0.1, 0.4, 0.1] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 rounded-full bg-[var(--color-secondary)] pointer-events-none blur-[4px]"
                            />
                            <motion.button 
                                onClick={() => setIsOpen(true)}
                                whileHover={{ scale: 1.05, rotate: 3 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative w-15 h-15 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-full flex items-center justify-center border-2 border-white shadow-[0_4px_15px_rgba(212,163,115,0.4)] cursor-pointer z-10 overflow-hidden"
                            >
                                <img 
                                    src="/70.jpeg" 
                                    alt="70 Wax Seal" 
                                    className="w-full h-full object-cover mix-blend-multiply opacity-90 contrast-125 sepia-[.3]"
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
                        <h2 className="text-gradient-earth font-serif italic text-4xl md:text-5xl leading-normal mb-1 drop-shadow-sm text-center px-4 font-medium">
                            A Journey of Blessing
                        </h2>
                        <p className="text-[var(--color-text)]/70 text-[8px] tracking-[0.3em] uppercase font-bold text-center mt-2 font-sans">
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
                            className="text-[8px] tracking-[0.2em] text-[var(--color-text)]/40 hover:text-[var(--color-accent)] transition-all duration-300 font-sans uppercase font-medium"
                        >
                            exclusively designed by <span className="underline decoration-[var(--color-accent)]/40 hover:decoration-[var(--color-accent)] decoration-1 underline-offset-4 text-[var(--color-text)]/60">AMAN ecosystem</span>
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