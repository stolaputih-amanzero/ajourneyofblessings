export default function InvalidInvitePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-6 bg-[#0A192F] text-[#FDFBF7]">
      <h1 className="text-3xl font-serif text-[#D4AF37]">Invitation Not Found</h1>
      <p className="text-sm opacity-80 max-w-xs">
        The invitation link appears to be invalid or has expired. Please check the link provided in your message.
      </p>
    </div>
  )
}
