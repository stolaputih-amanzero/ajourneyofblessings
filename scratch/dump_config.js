const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://razanxfefihxrbdqdlcm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhemFueGZlZmloeHJiZHFkbGNtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjkyMDMzNSwiZXhwIjoyMDk4NDk2MzM1fQ.wTRFKTUc3aWoSyaIIc0iy95DIJaN13uoq0YPdTpQePs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function dump() {
  const { data: configs, error: configErr } = await supabase
    .from('event_config')
    .select('*');
  
  if (configErr) {
    console.error('Error fetching configs:', configErr);
  } else {
    console.log('Configs:', JSON.stringify(configs, null, 2));
  }
}

dump();
