const fs = require('fs');
const html = fs.readFileSync('d:\\PROJECT\\journey-of-blessing\\scratch\\invite_response.html', 'utf8');

console.log('HTML Length:', html.length);
const idx = html.toLowerCase().indexOf('gallery');
if (idx !== -1) {
  console.log('Found "gallery" at index:', idx);
  console.log('Surrounding content:');
  console.log(html.substring(Math.max(0, idx - 150), Math.min(html.length, idx + 150)));
} else {
  console.log('"gallery" not found in HTML source');
}
