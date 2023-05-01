// @ts-check

const {
  collectFiddlesIn,
} = require('cypress-markdown-preprocessor/src/collect-utils')
const fs = require('fs')

const baseUrl = 'https://glebbahmutov.com/cypress-examples'

async function collectExamples() {
  const fiddles = await collectFiddlesIn('docs/**/*.md')
  console.log('%d Cypress examples', fiddles.length)
  // transform filename to URL
  const pages = fiddles.map((fiddle) => {
    const url =
      baseUrl +
      '/' +
      fiddle.filename
        .replace(/^docs\//, '')
        .replace(/\.md$/, '.html')
        // if URL ends with "/index.html"
        // omit the "index.html" filename
        .replace(/\/index\.html$/, '/')
    return {
      ...fiddle,
      url,
    }
  })

  const text = JSON.stringify(pages, null, 2)
  fs.writeFileSync('fiddles.json', text)
  console.log('wrote fiddles.json')
}

collectExamples().catch((e) => {
  console.error(e)
  process.exit(1)
})
