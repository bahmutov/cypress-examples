# Misc

Examples of miscellaneous commands in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [.end()](https://on.cypress.io/end)

To end the command chain, use the `.end()` command.

<!-- fiddle .end() - end the command chain -->

```html
<table class="table table-bordered misc-table">
  <thead>
    <tr>
      <th>Table</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>User: Cheryl</td>
    </tr>
    <tr>
      <td>User: Charles</td>
    </tr>
    <tr>
      <td>User: Darryl</td>
    </tr>
  </tbody>
</table>
```

```js
// cy.end is useful when you want to end a chain of commands
// and force Cypress to re-query from the root element
cy.get('.misc-table').within(() => {
  // ends the current chain and yields null
  cy.contains('Cheryl').click().end()

  // queries the entire table again
  cy.contains('Charles').click()
})
```

<!-- fiddle-end -->

## [cy.screenshot()](https://on.cypress.io/screenshot)

To take a screenshot, use the `cy.screenshot()` command.

<!-- run this test in exported specs, since it reports zero width from fiddle -->
<!-- fiddle.export Cypress.Screenshot / cy.screenshot() - take a screenshot -->

```html
<code>cypress/screenshots/my-image.png</code>
```

```js
cy.screenshot('my-image')
```

<!-- fiddle-end -->

<!-- fiddle Cypress.Screenshot / Cypress.Screenshot.defaults() - change default config of screenshots -->

```js
Cypress.Screenshot.defaults({
  blackout: ['.foo'],
  capture: 'viewport',
  clip: { x: 0, y: 0, width: 200, height: 200 },
  scale: false,
  disableTimersAndAnimations: true,
  screenshotOnRunFailure: true,
  beforeScreenshot() {},
  afterScreenshot() {},
})
```

<!-- fiddle-end -->

## [cy.wrap()](https://on.cypress.io/wrap)

To wrap an object, use the `cy.wrap()` command.

<!-- fiddle cy.wrap() - wrap an object -->

```js
// https://on.cypress.io/wrap
cy.wrap({ foo: 'bar' })
  .should('have.property', 'foo')
  .and('include', 'bar')
```

<!-- fiddle-end -->
