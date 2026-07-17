const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
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

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing SUPABASE URL or ANON KEY in .env.local");
  process.exit(1);
}

// Connect using ANON key (just like the frontend does to simulate RLS check)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  console.log("Querying gallery_photos using Anon Key (Frontend Simulation)...");
  
  const { data, error } = await supabase
    .from('gallery_photos')
    .select('*');

  if (error) {
    console.error("Database query error:", error.message, error.details, error.hint);
  } else {
    console.log(`Successfully fetched ${data.length} photos:`);
    console.log(data);
  }
}

main();
