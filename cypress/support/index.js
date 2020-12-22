/// <reference types="cypress" />

// a little utility command for taking the screenshot of the entire runner
// to be used only in the recipes that are NOT distributed as JavaScript specs
// since this requires the support file
Cypress.Commands.add('takeRunnerPic', (name) => {
  if (!name || !Cypress._.isString(name)) {
    throw new Error('Expected a snapshot name')
  }

  // let the DOM stabilize
  cy.wait(500, {
    log: false,
  })

  // escape the cy.within normally done within a fiddle
  // https://github.com/cypress-io/cypress/issues/14253
  cy.document({
    log: false,
  }).within({ log: false }, () => {
    cy.screenshot(name, {
      capture: 'runner',
      log: false,
    })
  })
})
