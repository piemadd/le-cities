//custom csv parser lets gooooooo
const fs = require('fs');

//https://www.freecodecamp.org/news/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27/
function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}

const input = fs.readFileSync('input.csv', { encoding: 'utf-8', flag: 'r' });
const lines = input.split('\r\n');

const processed = lines.map((line) => {
  return titleCase(line.replaceAll('"', ''));
});

fs.writeFileSync('output.json', JSON.stringify(processed, null, 2));