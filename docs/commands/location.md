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

```js
// https://on.cypress.io/location
cy.location().should((location) => {
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

## [cy.url()](https://on.cypress.io/url)

To get the current URL, use the `cy.url()` command.

```js
// https://on.cypress.io/url
cy.url().should('eq', 'https://example.cypress.io/commands/location')
```
