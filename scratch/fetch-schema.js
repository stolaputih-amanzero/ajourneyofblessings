const url = 'https://razanxfefihxrbdqdlcm.supabase.co/rest/v1/'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhemFueGZlZmloeHJiZHFkbGNtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjkyMDMzNSwiZXhwIjoyMDk4NDk2MzM1fQ.wTRFKTUc3aWoSyaIIc0iy95DIJaN13uoq0YPdTpQePs'

async function inspect() {
  const res = await fetch(url, {
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`
    }
  })
  const spec = await res.json()
  console.log('Path Info:', JSON.stringify(spec.paths['/rpc/admin_update_guest'], null, 2))
}

inspect()
