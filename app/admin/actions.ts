'use server'

import { cookies } from 'next/headers'

export async function loginAdmin(formData: FormData) {
  const passkey = formData.get('passkey')
  const expectedPasskey = process.env.ORGANIZER_PASSKEY || 'emeritus2026'

  if (passkey === expectedPasskey) {
    const cookieStore = await cookies()
    cookieStore.set('admin_auth', 'true', { secure: process.env.NODE_ENV === 'production', httpOnly: true, path: '/' })
    return { success: true }
  }
  
  return { error: 'Invalid passkey' }
}
