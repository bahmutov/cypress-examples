// @ts-check
const shell = require('shelljs')
const path = require('path')
const { findCypressVersion } = require('./src/utils')

// converts Markdown fiddle specs into JavaScript specs
let baseUrl = process.argv[2]
if (!baseUrl) {
  const cypressVersion = findCypressVersion()
  const DEFAULT_BASE_URL = `http://localhost:5000/cypress-examples/${cypressVersion}`
  console.log('Setting empty baseUrl to %s', DEFAULT_BASE_URL)
  baseUrl = DEFAULT_BASE_URL
}

console.log(
  'Each spec file will visit %s before tests in each spec',
  baseUrl,
)

const rootFolder = 'docs'
const markdownFiles = shell.ls(`${rootFolder}/**/*.md`)
console.log('Markdown files\n' + markdownFiles.join('\n'))

markdownFiles.forEach((filename) => {
  const inRoot = path.relative(rootFolder, filename)
  const pagePath = inRoot.replace(/\.md$/, '')
  // navigation spec is a little different - it will navigate to its page itself
  const beforeVisitUrl = filename.endsWith('navigation.md')
    ? baseUrl
    : `${baseUrl}/${pagePath}`
  shell.exec(
    `npx export-fiddle ${filename} --before ${beforeVisitUrl}`,
  )
})

shell.exec('ls -lAR docs/**/*.js')
console.log(
  'You can run these specs against %s with command',
  baseUrl,
)
console.log('npx cypress open --config-file cypress-dist.json')
