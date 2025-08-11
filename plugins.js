const mdPreprocessor = require('cypress-markdown-preprocessor')
const {
  registerPlugin: registerBookScreenshots,
} = require('cypress-book')

module.exports = (on, config) => {
  on('file:preprocessor', mdPreprocessor)

  on('after:spec', (spec, results) => {
    console.log('after:spec')
    console.log(spec)
    console.log(results)
  })

  on('after:run', (results) => {
    console.log('after:run')
    console.log(results)
  })

  // https://github.com/bahmutov/cypress-book/issues/82
  // registerBookScreenshots(on, config)
  return config
}
