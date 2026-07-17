const fs = require('fs');

function getPngDimensions(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    // PNG signature check
    if (buffer.toString('ascii', 1, 4) !== 'PNG') {
      return { error: 'Not a PNG' };
    }
    // IHDR block starts at offset 12, width is 4 bytes at offset 16, height is 4 bytes at offset 20
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height };
  } catch (err) {
    return { error: err.message };
  }
}

console.log('og-image.png:', getPngDimensions('d:\\PROJECT\\journey-of-blessing\\public\\og-image.png'));
console.log('logo_keep_shining.png:', getPngDimensions('d:\\PROJECT\\journey-of-blessing\\public\\logo_keep_shining.png'));
console.log('icon.png:', getPngDimensions('d:\\PROJECT\\journey-of-blessing\\app\\icon.png'));
