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

const input = fs.readFileSync('input.json', { encoding: 'utf-8', flag: 'r' });
const unprocessedCities = JSON.parse(input);

let processed = {};

unprocessedCities.forEach((city) => {

  const cityName = titleCase(city.cityName.replaceAll('"', ''));
  const cityPopulation = isNaN(city.cityPopulation) ? Number(city.cityPopulation.replaceAll(',', '')) : city.cityPopulation;

  processed[cityName] = cityPopulation;
});

fs.writeFileSync('output.json', JSON.stringify(processed, null, 2));