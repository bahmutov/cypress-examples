const mdPreprocessor = require('cypress-markdown-preprocessor')
const {
  registerPlugin: registerBookScreenshots,
} = require('cypress-book')

module.exports = (on, config) => {
  on('file:preprocessor', mdPreprocessor)
  // https://github.com/bahmutov/cypress-book/issues/82
  // registerBookScreenshots(on, config)
  return config
}
