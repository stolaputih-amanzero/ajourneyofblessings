const http = require('http');

http.get('http://localhost:3000/invite/adri-manafe', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('Includes Envelope:', data.includes('envelope'));
    console.log('Includes RSVP:', data.includes('rsvp'));
    console.log('Includes Gallery:', data.includes('gallery'));
    console.log('Includes PhotoGallery:', data.includes('PhotoGallery') || data.includes('gallery_photos'));
    
    // Save to a file for review
    const fs = require('fs');
    fs.writeFileSync('scratch/invite_response.html', data);
    console.log('Saved response to scratch/invite_response.html');
  });
}).on('error', (err) => {
  console.error('Error fetching page:', err.message);
});
