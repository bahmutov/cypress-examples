const mdPreprocessor = require('cypress-markdown-preprocessor')
const {
  registerPlugin: registerBookScreenshots,
} = require('cypress-book')

module.exports = (on, config) => {
  on('file:preprocessor', mdPreprocessor)

  on('before:run', (details) => {
    const { group, parallel, runUrl } = details
    if (runUrl) {
      console.log('Run URL %s', runUrl)
      if (parallel) {
        console.log('Running specs in parallel')
      }
      if (group) {
        console.log('Group %s', group)
      }
    }
  })

  on('after:spec', (spec, results) => {
    const { relative } = spec
    const failures = results.stats?.failures
    if (failures) {
      console.log('Spec %s had %d failures', relative, failures)
      // look into results.tests objects
      // attempts, displayError, duration, state, title (array of strings)
    }
  })

  on('after:run', (results) => {
    const { runUrl, totalTests, totalFailed } = results
    console.log('after:run')
    console.log(
      '%d total tests, %d failed tests',
      totalTests,
      totalFailed,
    )
    if (runUrl) {
      console.log('Run URL %s', runUrl)
    }
  })

  // https://github.com/bahmutov/cypress-book/issues/82
  // registerBookScreenshots(on, config)
  return config
}
