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
const supabaseAnonKey = envConfig['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing SUPABASE URL or ANON KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  console.log("Testing file upload to bucket 'gallery' using ANON key...");
  
  const content = 'Test file content';
  const filePath = `test_uploads/test_${Date.now()}.txt`;
  
  const { data, error } = await supabase.storage
    .from('gallery')
    .upload(filePath, Buffer.from(content), {
      contentType: 'text/plain'
    });

  if (error) {
    console.error("Upload failed!");
    console.error("Error details:", error);
  } else {
    console.log("Upload succeeded!");
    console.log("Upload data:", data);
  }
}

main();
