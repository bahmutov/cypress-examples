const { removePlugin } = require('@vuepress/markdown')

let _highlight

module.exports = {
  title: 'Cypress examples',
  description:
    'Static site with Cypress examples tested right from the Markdown sources',
  base: '/cypress-examples/',
  plugins: [],
  themeConfig: {
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
      // console.log(md)
      if (!_highlight) {
        _highlight = md.options.highlight
      }

      md.options.highlight = (str, lang) => {
        // return _highlight(str, lang)

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
