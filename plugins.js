const mdPreprocessor = require('@cypress/fiddle/src/markdown-preprocessor')
module.exports = (on, config) => {
  on('file:preprocessor', mdPreprocessor)
}
