export default function HomePage() {
  return (
    <>
      {/* Top accent bar in Olive Green */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-accent)] opacity-80"></div>
      
      <div className="px-8 pt-12 flex items-center justify-between text-[10px] tracking-[0.2em] font-bold uppercase text-[var(--color-text)]">
        <div className="w-1/3 text-left opacity-70">
          Invitation
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-6 h-px bg-[var(--color-secondary)]"></div>
        </div>
        <div className="w-1/3 text-right">
          <span className="underline decoration-[var(--color-secondary)] decoration-2 underline-offset-4 opacity-70">
            Thanksgiving
          </span>
        </div>
      </div>

      <div className="px-8 mt-12">
        <h1 className="text-[var(--color-text)] font-serif italic text-4xl leading-tight font-medium">
          A Journey <br/>
          <span className="not-italic text-5xl block mt-1 tracking-tighter text-gradient-earth">of Blessing</span>
        </h1>
        <div className="w-12 h-[2px] bg-[var(--color-tertiary)] opacity-60 mt-6"></div>
      </div>

      <div className="px-8 relative flex-1 mt-8">
        <div className="bg-white/40 rounded-t-[4rem] border-x border-t border-[var(--color-secondary)]/30 earthy-shadow flex flex-col items-center justify-center text-center px-8 py-12 h-full">
          <p className="text-sm font-sans text-[var(--color-text)] leading-relaxed font-semibold">
            Yvonne Wakkary Rumambi
          </p>
          <p className="text-[var(--color-tertiary)] text-[10px] tracking-widest uppercase font-bold mt-2">
            70 Years of Grace &amp; Blessings
          </p>
          <p className="text-xs text-[var(--color-text)]/60 mt-8 italic max-w-[200px] font-serif">
            Please use your personalized invitation link to access the full details and RSVP.
          </p>
        </div>
      </div>

      <div className="pb-8 flex justify-center text-center px-4 mt-6 z-10">
        <a 
          href="https://amanloka.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[9px] tracking-[0.2em] text-[var(--color-text)]/50 hover:text-[var(--color-accent)] transition-all duration-300 font-sans uppercase font-bold"
        >
          exclusively designed by <span className="underline decoration-[var(--color-accent)]/50 decoration-2 underline-offset-4 font-extrabold text-[var(--color-text)]/80">AMAN ecosystem</span>
        </a>
      </div>
      
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-[var(--color-text)]/10 rounded-full"></div>
    </>
  )
}
