const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env.local');
const envConfig = {};
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[0].split('=')[0].trim();
      const value = match[0].substring(match[0].indexOf('=') + 1).trim().replace(/^"|"$/g, '');
      envConfig[key] = value;
    }
  });
}

const supabaseUrl = envConfig['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseAnonKey = envConfig['NEXT_PUBLIC_SUPABASE_ANON_KEY'];
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  console.log("Fetching all guests...");
  const { data: guests, error } = await supabase.from('guests').select('*');
  if (error) {
    console.error("Error fetching guests:", error.message);
  } else {
    console.log(`Successfully fetched ${guests.length} guests:`);
    console.log(guests);
  }
}

main();
