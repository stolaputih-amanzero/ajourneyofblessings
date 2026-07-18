async function main() {
  const url = 'https://yvonne.amanzero.space/invite/adri-manafe';
  console.log(`Fetching ${url}...`);
  try {
    const res = await fetch(url);
    console.log('Status:', res.status, res.statusText);
    const html = await res.text();
    console.log('HTML length:', html.length);
    
    // Find all meta tags
    const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/i);
    const ogTitle = html.match(/<meta property="og:title" content="([^"]+)"/i);
    const ogDesc = html.match(/<meta property="og:description" content="([^"]+)"/i);
    const twitterImage = html.match(/<meta name="twitter:image" content="([^"]+)"/i);
    
    console.log('Results:');
    console.log('og:image:', ogImage ? ogImage[1] : 'NOT FOUND');
    console.log('og:title:', ogTitle ? ogTitle[1] : 'NOT FOUND');
    console.log('og:description:', ogDesc ? ogDesc[1] : 'NOT FOUND');
    console.log('twitter:image:', twitterImage ? twitterImage[1] : 'NOT FOUND');
    
    if (html.length < 1000) {
      console.log('HTML snippet:', html);
    }
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}
main();
