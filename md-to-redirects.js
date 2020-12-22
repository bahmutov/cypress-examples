// @ts-check
const path = require('path')
const fs = require('fs')
const globby = require('globby')
const pluralize = require('pluralize')
const { stripIndent } = require('common-tags')

// converts Markdown files into HTML file that redirects to version-specific page
// for example the top level "index.html" should redirect to "<version>/index.html"
const baseUrl = process.argv[2]
if (!baseUrl) {
  console.error('Missing the top-level domain argument')
  process.exit(1)
}

console.log(
  'Each spec file will visit %s before tests in each spec',
  baseUrl,
)

const docsFolder = 'docs'
const markdownFiles = globby.sync(
  [
    '**/*.md',
    // we skip the recipes Markdown files,
    // let's not make JavaScript spec out of it
    '!recipes/**/*.md',
  ],
  {
    cwd: docsFolder,
  },
)

console.log(
  '%d Markdown %s',
  markdownFiles.length,
  pluralize('file', markdownFiles.length, false),
)
console.log(markdownFiles.join('\n'))

const makeFolder = (filename) => {
  const dir = path.dirname(filename)
  try {
    fs.mkdirSync(dir, { recursive: true })
  } catch {}
}

const getHtml = (baseUrl, mdFile) => {
  let dir
  if (mdFile.endsWith('index.md')) {
    dir = path.dirname(mdFile)
    if (dir === '.') {
      dir = ''
    }
  } else {
    dir =
      path.dirname(mdFile) +
      '/' +
      path.basename(mdFile, '.md') +
      '.html'
  }

  const redirectUrl = baseUrl + '/' + dir

  const html = stripIndent`
    <html>
      <head>
        <meta
          http-equiv="Refresh"
          content="0; url='${redirectUrl}'"
        />
      </head>
    </html>
  `
  return html
}

const destinationFolder = 'redirects'

markdownFiles.forEach((mdFile) => {
  const filename = mdFile.replace('.md', '.html')
  const destinationFile = path.join(destinationFolder, filename)
  console.log('output: %s', destinationFile)
  makeFolder(destinationFile)

  const html = getHtml(baseUrl, mdFile)
  fs.writeFileSync(destinationFile, html + '\n', 'utf8')
})
