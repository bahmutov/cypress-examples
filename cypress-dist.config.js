const { defineConfig } = require('cypress')

module.exports = defineConfig({
  fixturesFolder: 'cypress/fixtures',
  viewportHeight: 1000,
  viewportWidth: 600,
  projectId: 'dis6wg',
  e2e: {
    supportFile: false,
    specPattern: 'docs/**/*.js',
    testIsolation: false,
    retries: {
      runMode: 2,
    },
    videoCompression: 1,
  },
})
