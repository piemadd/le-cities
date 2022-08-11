//custom csv parser lets gooooooo
const fs = require('fs');

const input = fs.readFileSync('input.csv', { encoding: 'utf-8', flag: 'r' });
const lines = input.split('\r\n');

const processed = lines.map((line) => {
  return line.replaceAll('"', '');
});

fs.writeFileSync('output.json', JSON.stringify(processed, null, 2));