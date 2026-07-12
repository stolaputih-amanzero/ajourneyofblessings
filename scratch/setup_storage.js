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
  console.error("Missing SUPABASE URL or SERVICE ROLE KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  console.log("Checking storage buckets...");
  
  // List buckets
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) {
    console.error("Error listing buckets:", listError);
    process.exit(1);
  }

  const galleryBucket = buckets.find(b => b.name === 'gallery');

  if (galleryBucket) {
    console.log(`Bucket "gallery" already exists. Public status: ${galleryBucket.public}`);
    if (!galleryBucket.public) {
      console.log('Updating "gallery" bucket to be public...');
      const { data, error } = await supabase.storage.updateBucket('gallery', { public: true });
      if (error) {
        console.error("Error updating bucket:", error);
      } else {
        console.log("Bucket updated to public successfully!");
      }
    }
  } else {
    console.log('Creating public bucket "gallery"...');
    const { data, error } = await supabase.storage.createBucket('gallery', {
      public: true,
      allowedMimeTypes: ['image/*'],
      fileSizeLimit: 5242880 // 5MB
    });
    if (error) {
      console.error("Error creating bucket:", error);
    } else {
      console.log("Bucket \"gallery\" created successfully as public!");
    }
  }
}

main();
