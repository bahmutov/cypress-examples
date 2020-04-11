module.exports = {
  title: 'Cypress examples',
  description: 'Static site with Cypress examples tested right from the Markdown sources',
  base: '/cypress-examples/',
  plugins: [
    [
      'vuepress-plugin-clean-urls',
      {
        normalSuffix: '/',
        indexSuffix: '/',
        notFoundPath: '/404.html',
      },
    ],
  ],
}
