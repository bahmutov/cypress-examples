const mdPreprocessor = require('cypress-markdown-preprocessor')
module.exports = (on, config) => {
  on('file:preprocessor', mdPreprocessor)
  return config
}
