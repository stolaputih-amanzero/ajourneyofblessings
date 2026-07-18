async function main() {
  const url = 'https://journeyofblessing.com/lander';
  console.log(`Fetching ${url}...`);
  try {
    const res = await fetch(url);
    console.log('Status:', res.status, res.statusText);
    const html = await res.text();
    console.log('HTML length:', html.length);
    console.log('HTML snippet:', html.slice(0, 800));
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}
main();
