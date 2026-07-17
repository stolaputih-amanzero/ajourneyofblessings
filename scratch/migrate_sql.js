const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..');
const filesToMigrate = [
  path.join(projectDir, 'supabase', 'admin_setup.sql'),
  path.join(projectDir, 'scratch', 'setup_admin.js'),
  path.join(projectDir, 'scratch', 'reset-password.js')
];

const oldEmail = 'admin@meinita.amanloka.com';
const newEmail = 'admin@journeyofblessing.com';

filesToMigrate.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    console.log(`Migrating: ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Count occurrences
    const regex = new RegExp(oldEmail, 'g');
    const matches = content.match(regex);
    const count = matches ? matches.length : 0;
    
    if (count > 0) {
      content = content.replace(regex, newEmail);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Successfully replaced ${count} occurrences in ${path.basename(filePath)}`);
    } else {
      console.log(`No occurrences of "${oldEmail}" found in ${path.basename(filePath)}`);
    }
  } else {
    console.warn(`File not found: ${filePath}`);
  }
});
