// @ts-check
const path = require('path')
const fs = require('fs')

let baseUrl = process.argv[2]
if (!baseUrl) {
  console.error('Missing base url to scrape')
  process.exit(1)
}

const algoliaConfigFilename = path.join(
  __dirname,
  'algolia-config.json',
)
const algoliaConfig = JSON.parse(
  fs.readFileSync(algoliaConfigFilename, 'utf8'),
)
algoliaConfig.start_urls = [baseUrl]
console.log('set algolia starting config url to %s', baseUrl)
const text = JSON.stringify(algoliaConfig, null, 2) + '\n'
fs.writeFileSync(algoliaConfigFilename, text, 'utf8')
