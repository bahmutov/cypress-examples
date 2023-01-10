// @ts-check
const shell = require('shelljs')
const path = require('path')
const globby = require('globby')
const pluralize = require('pluralize')
const { findCypressVersion } = require('./src/utils')

// converts Markdown fiddle specs into JavaScript specs
let baseUrl = process.argv[2]
if (!baseUrl) {
  const DEFAULT_BASE_URL = `http://localhost:5000/cypress-examples/`
  console.log('Setting empty baseUrl to %s', DEFAULT_BASE_URL)
  baseUrl = DEFAULT_BASE_URL
}

console.log(
  'Each spec file will visit %s before tests in each spec',
  baseUrl,
)

const rootFolder = 'docs'
const markdownFiles = globby.sync([
  `${rootFolder}/**/*.md`,
  // we skip the recipes Markdown files,
  // let's not make JavaScript spec out of it
  `!${rootFolder}/recipes/**/*.md`,
  // also skip the root index file
  `!${rootFolder}/index.md`,
])
console.log(
  '%d Markdown %s',
  markdownFiles.length,
  pluralize('file', markdownFiles.length, false),
)
console.log(markdownFiles.join('\n'))

markdownFiles.forEach((filename) => {
  const inRoot = path.relative(rootFolder, filename)
  const pagePath = inRoot.replace(/\.md$/, '')
  // navigation spec is a little different - it will navigate to its page itself
  const beforeVisitUrl = filename.endsWith('navigation.md')
    ? baseUrl
    : `${baseUrl}/${pagePath}`
  shell.exec(
    `npx export-fiddles ${filename} --before ${beforeVisitUrl}`,
  )
})

shell.exec('ls -lAR docs/**/*.js')
console.log(
  'You can run these specs against %s with command',
  baseUrl,
)
console.log('npx cypress open --config-file cypress-dist.json')
