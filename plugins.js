const mdPreprocessor = require('cypress-markdown-preprocessor')
const {
  registerPlugin: registerBookScreenshots,
} = require('cypress-book')

module.exports = (on, config) => {
  on('file:preprocessor', mdPreprocessor)
  registerBookScreenshots(on, config)
  return config
}
