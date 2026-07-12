const { createClient } = require('@supabase/supabase-js')

const url = 'https://razanxfefihxrbdqdlcm.supabase.co'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhemFueGZlZmloeHJiZHFkbGNtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjkyMDMzNSwiZXhwIjoyMDk4NDk2MzM1fQ.wTRFKTUc3aWoSyaIIc0iy95DIJaN13uoq0YPdTpQePs'

const supabase = createClient(url, key)

async function test() {
  // Let's first fetch one guest id
  const { data: guests, error: fetchErr } = await supabase.from('guests').select('id, full_name').limit(1)
  if (fetchErr) {
    console.error('Fetch error:', fetchErr)
    return
  }
  
  if (!guests || guests.length === 0) {
    console.log('No guests found in database.')
    return
  }
  
  const guest = guests[0]
  console.log(`Testing with guest: ${guest.full_name} (${guest.id})`)
  
  const { data, error } = await supabase.rpc('admin_update_guest', {
    p_id: guest.id,
    p_title: 'Bpk.',
    p_full_name: guest.full_name,
    p_email: null,
    p_phone: null,
    p_table_number: null,
    p_rsvp_status: true,
    p_attendance_count: 2
  })
  
  if (error) {
    console.error('RPC Error:', JSON.stringify(error, null, 2))
  } else {
    console.log('RPC Success:', data)
  }
}

test()
