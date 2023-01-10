let _highlight

const { findCypressVersion } = require('../../src/utils')
const path = require('path')

const cypressVersion = findCypressVersion()
const base = `/cypress-examples/`
const dest = path.join('public', 'cypress-examples')
console.log('output folder: %s', dest)
const title = `Cypress examples (v${cypressVersion})`

module.exports = {
  title,
  description:
    'Static site with Cypress examples tested right from the Markdown sources',
  base,
  dest,
  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href:
          'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
      },
    ],
    [
      'style',
      {},
      '.action-focus.focus { border: 5px solid orange; } .hidden { display: none !important; }',
    ],
    // include jQuery and Bootstrap on every page
    [
      'script',
      {
        src: 'https://code.jquery.com/jquery-3.5.0.min.js',
        integrity:
          'sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ=',
        crossorigin: 'anonymous',
      },
    ],
    [
      'script',
      {
        src:
          'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js',
        integrity:
          'sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx',
        crossorigin: 'anonymous',
      },
    ],
  ],
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
          {
            text: 'Traversal',
            link: '/commands/traversal/',
          },
          { text: 'Actions', link: '/commands/actions/' },
          { text: 'Window', link: '/commands/window/' },
          { text: 'Viewport', link: '/commands/viewport/' },
          { text: 'Location', link: '/commands/location/' },
          {
            text: 'Navigation',
            link: '/commands/navigation/',
          },
          {
            text: 'Assertions',
            link: '/commands/assertions/',
          },
          {
            text: 'Misc',
            link: '/commands/misc/',
          },
          {
            text: 'Connectors',
            link: '/commands/connectors/',
          },
          {
            text: 'Aliasing',
            link: '/commands/aliasing/',
          },
          {
            text: 'Waiting',
            link: '/commands/waiting/',
          },
          {
            text: 'Network Requests',
            link: '/commands/network-requests/',
          },
          {
            text: 'Files',
            link: '/commands/files/',
          },
          {
            text: 'Local Storage',
            link: '/commands/local-storage/',
          },
          {
            text: 'Cookies',
            link: '/commands/cookies/',
          },
          {
            text: 'Spies, Stubs & Clocks',
            link: '/commands/spies-stubs-clocks/',
          },
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
    extendMarkdown(md) {
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
