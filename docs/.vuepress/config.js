module.exports = {
  title: 'Cypress examples',
  description:
    'Static site with Cypress examples tested right from the Markdown sources',
  base: '/cypress-examples/',
  plugins: [
    // [
    //   'vuepress-plugin-clean-urls',
    //   {
    //     normalSuffix: '/',
    //     indexSuffix: '/',
    //     notFoundPath: '/404.html',
    //   },
    // ],
  ],
  themeConfig: {
    nav: [
      {
        text: 'Commands',
        items: [
          { text: 'Querying', link: '/commands/querying/' },
          { text: 'Traversal', link: '/commands/traversal/' },
        ],
      },
      { text: 'Utilities', link: '/utilities/' },
      { text: 'Cypress API', link: '/cypress-api/' },
    ],
    algolia: {
      // DANGER 🧨💀: ONLY USE ALGOLIA PUBLIC SEARCH-ONLY API KEY
      apiKey: 'd2cc2084df39806bdefb04f60f16e856',
      indexName: 'cypress-examples',
      appId: '48DTXR75RW',
    },
  },
}
