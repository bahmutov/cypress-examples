# Viewport

Examples of changing the size of your application's viewport in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [cy.viewport()](https://on.cypress.io/viewport)

To set the viewport size and dimension, use the `cy.viewport()` command.

<!-- fiddle.export cy.viewport() - set the viewport size and dimension -->

```js
cy.get('.navbar').should('be.visible')
cy.viewport(320, 480)

// the navbar should have collapse since our screen is smaller
cy.get('#navbar').should('not.exit')
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
