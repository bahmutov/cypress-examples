const { removePlugin } = require('@vuepress/markdown')

let _highlight

module.exports = {
  title: 'Cypress examples',
  description:
    'Static site with Cypress examples tested right from the Markdown sources',
  base: '/cypress-examples/',
  plugins: [],
  themeConfig: {
    // point pages back at the GitHub documents
    repo: 'bahmutov/cypress-examples',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
    nav: [
      {
        text: 'Commands',
        items: [
          { text: 'Querying', link: '/commands/querying/' },
          { text: 'Traversal', link: '/commands/traversal/' },
          { text: 'Connectors', link: '/commands/connectors/' },
        ],
      },
      { text: 'Utilities', link: '/utilities/' },
      { text: 'Cypress API', link: '/cypress-api/' },
    ],
    sidebar: 'auto',
    algolia: {
      // DANGER 🧨💀: ONLY USE ALGOLIA PUBLIC SEARCH-ONLY API KEY
      apiKey: 'd2cc2084df39806bdefb04f60f16e856',
      indexName: 'cypress-examples',
      appId: '48DTXR75RW',
    },
  },
  markdown: {
    extendMarkdown: (md) => {
      if (!_highlight) {
        _highlight = md.options.highlight
      }

      // every time we see HTML code block
      // it is part of Cypress mini test
      // so we really want to show the HTML source
      // AND mount it as a live example block to run tests against
      md.options.highlight = (str, lang) => {
        if (lang !== 'html') {
          return _highlight(str, lang)
        }

        const highlightedHtml = _highlight(str, 'html')
        return (
          highlightedHtml +
          `
            <div class="example">
              ${str}
            </div>
          `
        )
      }
    },
  },
}
