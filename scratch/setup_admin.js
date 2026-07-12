const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local to avoid dependency on dotenv package
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
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function main() {
  const email = 'admin@meinita.amanloka.com';
  const password = 'AdminPassword123!';

  console.log(`Checking/Setting admin user: ${email}`);

  // Get user list to see if they exist
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error("Error listing users:", listError);
    process.exit(1);
  }

  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    console.log(`User exists with ID: ${existingUser.id}. Updating password...`);
    const { data, error } = await supabase.auth.admin.updateUserById(
      existingUser.id,
      { password: password }
    );
    if (error) {
      console.error("Error updating password:", error);
    } else {
      console.log("Password updated successfully!");
    }
  } else {
    console.log("User does not exist. Creating user...");
    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true
    });
    if (error) {
      console.error("Error creating user:", error);
    } else {
      console.log("User created successfully!");
    }
  }
}

main();
