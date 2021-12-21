# Location

Examples of get the url within your application in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [cy.hash()](https://on.cypress.io/hash)

To get the current URL hash, use the `cy.hash()` command.

<!-- fiddle cy.hash() - get the current URL hash -->

```js
// https://on.cypress.io/hash
cy.hash().should('be.empty')
```

<!-- fiddle-end -->

## [cy.location()](https://on.cypress.io/location)

To get `window.location`, use the `cy.location()` command.

<!-- fiddle cy.location() / get the current location object -->

```js
cy.visit('https://example.cypress.io/commands/location')
// https://on.cypress.io/location
cy.location().should((location) => {
  // returns an object with every part of the URL
  expect(location.hash).to.be.empty
  expect(location.href).to.eq(
    'https://example.cypress.io/commands/location',
  )
  expect(location.host).to.eq('example.cypress.io')
  expect(location.hostname).to.eq('example.cypress.io')
  expect(location.origin).to.eq('https://example.cypress.io')
  expect(location.pathname).to.eq('/commands/location')
  expect(location.port).to.eq('')
  expect(location.protocol).to.eq('https:')
  expect(location.search).to.be.empty
})
```

<!-- fiddle-end -->

You can pass an argument to return just the part you are interested in

<!-- fiddle cy.location() / get part of the URL -->

```js
cy.visit(
  'https://example.cypress.io/commands/location?search=value#top',
)
// yields a specific part of the location
cy.location('protocol').should('equal', 'https:')
cy.location('hostname').should('equal', 'example.cypress.io')
cy.location('pathname').should('equal', '/commands/location')
cy.location('search').should('equal', '?search=value')
cy.location('hash').should('equal', '#top')
```

<!-- fiddle-end -->

## [cy.url()](https://on.cypress.io/url)

To get the current URL string, use the `cy.url()` command.

<!-- fiddle cy.url() - get the current URL string -->

```js
cy.visit('https://example.cypress.io/commands/location')
// https://on.cypress.io/url
cy.url().should('eq', 'https://example.cypress.io/commands/location')
```

<!-- fiddle-end -->
