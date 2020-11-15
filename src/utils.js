// @ts-check
const assertCypressVersion = (version) => {
  if (!version) {
    throw new Error('Expected version string argument')
  }

  const exactVersionRe = /^\d+\.\d+\.\d+$/
  if (!exactVersionRe.test(version)) {
    throw new Error(
      `Cypress version "${version}" does not match exact version x.y.z`,
    )
  }
}

const findCypressVersion = () => {
  const pkg = require('../package.json')
  const deps = pkg.devDependencies
  const cypressVersion = deps.cypress
  if (!cypressVersion) {
    throw new Error('Cannot find Cypress dev dependency')
  }

  assertCypressVersion(cypressVersion)
  return cypressVersion
}

module.exports = { findCypressVersion, assertCypressVersion }
