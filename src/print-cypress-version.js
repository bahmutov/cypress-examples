// @ts-check
const { findCypressVersion } = require('./utils')
// prints found Cypress dependency version without newline
// to make it convenient to set the Cypress version
// in the workflow using set output command
// https://github.blog/changelog/2022-10-11-github-actions-deprecating-save-state-and-set-output-commands/
// https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-commands-for-github-actions#setting-an-output-parameter
// https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/metadata-syntax-for-github-actions#outputs
//
process.stdout.write(findCypressVersion())
