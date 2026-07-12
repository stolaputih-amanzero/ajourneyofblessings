export default function HomePage() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]"></div>
      
      <div className="px-8 pt-12 flex items-center justify-between text-[10px] tracking-[0.2em] font-bold uppercase text-[#0A192F]">
        <div className="w-1/3 text-left">
          Invitation
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-6 h-px bg-[#D4AF37]"></div>
        </div>
        <div className="w-1/3 text-right">
          <span className="underline decoration-[#D4AF37] decoration-2 underline-offset-4">
            Emeritus
          </span>
        </div>
      </div>

      <div className="px-8 mt-12">
        <h1 className="text-[#0A192F] font-serif italic text-4xl leading-tight">
          Keep Shining <br/>
          <span className="not-italic text-5xl block mt-1 tracking-tighter">in His grace</span>
        </h1>
        <div className="w-12 h-[2px] bg-[#D4AF37] mt-6"></div>
      </div>

      <div className="px-8 relative flex-1 mt-8">
        <div className="bg-[#0A192F]/5 rounded-t-full border-x border-t border-[#D4AF37]/30 flex flex-col items-center justify-center text-center px-8 py-12 h-full">
          <p className="text-sm font-sans text-[#0A192F] leading-relaxed font-semibold">
            Pdt. Ny. Meinita M.E. Wungo-Damping
          </p>
          <p className="text-[#0A192F]/60 text-[10px] tracking-widest uppercase font-bold mt-2">
            38 Years of Faithful Service
          </p>
          <p className="text-xs text-[#0A192F]/50 mt-8 italic max-w-[200px]">
            Please use your personalized invitation link to access the full details and RSVP.
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/10 rounded-full"></div>
    </>
  )
}
