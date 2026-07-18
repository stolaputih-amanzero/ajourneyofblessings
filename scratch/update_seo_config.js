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
      const key = match[1];
      let value = match[2] || '';
      if (value.length > 0 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
        value = value.replace(/^"|"$/g, '');
      }
      envConfig[key] = value.trim();
    }
  });
}

const supabaseUrl = envConfig['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseServiceKey = envConfig['SUPABASE_SERVICE_ROLE_KEY'];

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing credentials in .env.local");
  process.exit(1);
}

// Use service role client to bypass RLS
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  console.log("Updating seo_config to point to /og-image.jpeg...");
  const { data, error } = await supabase
    .from('event_config')
    .update({ value: { og_image_url: '/og-image.jpeg' } })
    .eq('key', 'seo_config')
    .select();
    
  if (error) {
    console.error("Error updating seo_config:", error.message);
  } else {
    console.log("Update success! New config:", data);
  }
}

main();
