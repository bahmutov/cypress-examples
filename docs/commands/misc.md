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

## [cy.exec()](https://on.cypress.io/exec)

To execute a system command, use the `cy.exec()` command.

<!-- fiddle.skip cy.exec() - execute a system command -->

```js
// execute a system command.
// so you can take actions necessary for
// your test outside the scope of Cypress.
// https://on.cypress.io/exec

// we can use Cypress.platform string to
// select appropriate command
// https://on.cypress/io/platform
cy.log(`Platform ${Cypress.platform} architecture ${Cypress.arch}`)

// on CircleCI Windows build machines we have a failure to run bash shell
// https://github.com/cypress-io/cypress/issues/5169
// so skip some of the tests by passing flag "--env circle=true"
const isCircleOnWindows =
  Cypress.platform === 'win32' && Cypress.env('circle')

if (isCircleOnWindows) {
  cy.log('Skipping test on CircleCI')

  return
}

// cy.exec problem on Shippable CI
// https://github.com/cypress-io/cypress/issues/6718
const isShippable =
  Cypress.platform === 'linux' && Cypress.env('shippable')

if (isShippable) {
  cy.log('Skipping test on ShippableCI')

  return
}

cy.exec('echo Jane Lane').its('stdout').should('contain', 'Jane Lane')

if (Cypress.platform === 'win32') {
  cy.exec('print cypress.json').its('stderr').should('be.empty')
} else {
  cy.exec('cat cypress.json').its('stderr').should('be.empty')

  cy.exec('pwd').its('code').should('eq', 0)
}
```

<!-- fiddle-end -->

## [cy.focused()](https://on.cypress.io/focused)

To get the DOM element that has focus, use the `cy.focused()` command.

<!-- fiddle cy.focused() - get the DOM element that has focus -->

```html
<form class="misc-form">
  <div class="form-group">
    <label for="name">Name</label>
    <input
      type="text"
      class="form-control"
      id="name"
      placeholder="Name"
    />
  </div>
  <div class="form-group">
    <label for="description">Description</label>
    <textarea class="form-control" id="description"></textarea>
  </div>
</form>
```

```js
// https://on.cypress.io/focused
cy.get('.misc-form').find('#name').click()
cy.focused().should('have.id', 'name')

cy.get('.misc-form').find('#description').click()
cy.focused().should('have.id', 'description')
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
