# Viewport

Examples of changing the size of your application's viewport in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [cy.viewport()](https://on.cypress.io/viewport)

To set the viewport size and dimension, use the `cy.viewport()` command.

<!-- fiddle.export cy.viewport() - set the viewport size and dimension -->

```js
cy.get('.navbar').should('be.visible')
cy.viewport(320, 480)

// the navbar should have collapse since our screen is smaller
cy.get('#navbar').should('not.exist')
// instead we have the "hamburger" icon
cy.get('.sidebar-button').should('be.visible').click()
cy.get('.nav-item').find('a').should('be.visible')

// lets see what our app looks like on a super large screen
cy.viewport(2999, 2999)

// cy.viewport() accepts a set of preset sizes
// to easily set the screen to a device's width and height

// We added a cy.wait() between each viewport change so you can see
// the change otherwise it is a little too fast to see :)

cy.viewport('macbook-15')
cy.wait(200)
cy.viewport('macbook-13')
cy.wait(200)
cy.viewport('macbook-11')
cy.wait(200)
cy.viewport('ipad-2')
cy.wait(200)
cy.viewport('ipad-mini')
cy.wait(200)
cy.viewport('iphone-6+')
cy.wait(200)
cy.viewport('iphone-6')
cy.wait(200)
cy.viewport('iphone-5')
cy.wait(200)
cy.viewport('iphone-4')
cy.wait(200)
cy.viewport('iphone-3')
cy.wait(200)

// cy.viewport() accepts an orientation for all presets
// the default orientation is 'portrait'
cy.viewport('ipad-2', 'portrait')
cy.wait(200)
cy.viewport('iphone-4', 'landscape')
cy.wait(200)

// The viewport will be reset back to the default dimensions
// in between tests (the  default can be set in cypress.json)
```

<!-- fiddle-end -->

### Viewport and the config viewport values

<!-- fiddle cy.viewport() - set the viewport size and dimension -->

```html
<p>Some text</p>
```

```js
// Cypress.config('viewportWidth') shows the current value
// cy.viewport() does not change it
const w = Cypress.config('viewportWidth')
expect(w, 'initial width').to.be.greaterThan(100)
cy.log('initial', w) // whatever value, probably 600
cy.viewport('ipad-2')
cy.log('still the same', Cypress.config('viewportWidth')) // same value
cy.viewport('iphone-4').then(() => {
  expect(
    Cypress.config('viewportWidth'),
    'after using viewport',
  ).to.equal(w)
})
```

To know the current viewport, use `cy.viewport(w, h)` and update the `Cypress.config` too using `cy.then` callback to make sure the values are set _after_ the command has changed the viewport.

```js
cy.viewport(1200, 400)
  .then(() => {
    Cypress.config('viewportWidth', 1200)
    Cypress.config('viewportHeight', 400)
  })
  // some time later
  .then(() => {
    cy.log('current width', Cypress.config('viewportWidth'))
  })
```

You can also get the current resolution from the application's window object.

```js
cy.window().its('innerWidth').should('equal', 1200)
```

<!-- fiddle-end -->
