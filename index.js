const { parse } = require('csv-parse/sync');
const fs = require('fs');

//https://www.freecodecamp.org/news/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27/
function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}

const rawZips = fs.readFileSync('places_and_zips.txt', { encoding: 'utf-8', flag: 'r' }).split('\n');
const keys = rawZips.shift().split('|');

const unprocessedZips = rawZips.map((zip) => {
  const data = zip.split('|');
  let final = {};

  data.forEach((item, i) => {
    final[keys[i]] = item;
  });

  return final;
})

const unprocessedZipCoords = JSON.parse(fs.readFileSync('coordsData.json', { encoding: 'utf-8', flag: 'r' }));
const unprocessedPops = parse(fs.readFileSync('places_and_pops.csv', { encoding: 'utf-8', flag: 'r' }), { columns: true, skip_empty_lines: true });

let processed = {};
unprocessedPops.forEach((place) => {
  processed[place.GEO_ID.split('US')[1]] = {
    name: titleCase(place.NAME.replace('cdp, ', 'CDP, ')),
    geoID: place.GEO_ID.split('US')[1],
    population: Number(place.P1_001N),
    zipCodes: [],
    coordinates: []
  }
});

unprocessedZips.forEach((zip) => {
  if (zip.GEOID_PLACE_20 !== '' && processed[zip.GEOID_PLACE_20]) {
    processed[zip.GEOID_PLACE_20].zipCodes.push(Number(zip.GEOID_ZCTA5_20));
  }
})

unprocessedZipCoords.forEach((zip) => {
  if (processed[zip.GEOID]) {
    processed[zip.GEOID].coordinates = [Number(zip.INTPTLAT), Number(zip.INTPTLON)]
  }
})

let processedNameAsKey = {};
Object.keys(processed).forEach((key) => {
  const item = processed[key];
  processedNameAsKey[item.name] = item;
})

console.log(processedNameAsKey['Sandy Springs City, Georgia'])
console.log(processedNameAsKey['Chicago City, Illinois'])

fs.writeFileSync('output.json', JSON.stringify(processedNameAsKey, null, 2));
fs.writeFileSync('keys.json', JSON.stringify(Object.keys(processedNameAsKey), null, 2));

fs.writeFileSync('outputMin.json', JSON.stringify(processedNameAsKey));
fs.writeFileSync('keysMin.json', JSON.stringify(Object.keys(processedNameAsKey)));