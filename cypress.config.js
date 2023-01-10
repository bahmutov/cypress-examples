const { defineConfig } = require('cypress')

module.exports = defineConfig({
  fixturesFolder: 'cypress/fixtures',
  viewportHeight: 1000,
  viewportWidth: 600,
  env: {
    'cypress-fiddle': {
      stylesheets: [
        'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
      ],
      style:
        'body { padding: 2rem; } .action-focus.focus { border: 5px solid orange; } .hidden { display: none !important; }',
    },
    'cypress-book': {
      imageFolder: './pics',
      tolerance: 0.02,
    },
  },
  projectId: 'dis6wg',
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./plugins.js')(on, config)
    },
    specPattern: 'docs/**/*.md',
  },
})
