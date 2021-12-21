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

<!-- fiddle.skip cy.location() / get the current location object -->

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

### location part

You can pass an argument to return just the part you are interested in

<!-- fiddle.skip cy.location() / get part of the URL -->

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

### parsed search

If you want to check a specific value inside the search part of the URL, use the browser built-in object [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

<!-- fiddle.skip cy.location() / parsed search -->

```js
// the full URL includes several search terms
cy.visit(
  'https://example.cypress.io/commands/location?search=value&id=1234',
)
cy.location('search')
  .should('equal', '?search=value&id=1234')
  // let's parse the search value
  .then((s) => new URLSearchParams(s))
  .invoke('get', 'id') // check a specific key
  .should('equal', '1234')
```

We can convert the `URLSearchParams` into a plain object using the bundled Lodash function

```js
// tip: move the conversion from the search string to
// a plain object to an utility function
cy.location('search').should((search) => {
  const parsed = new URLSearchParams(search)
  const pairs = Array.from(parsed.entries())
  const plain = Cypress._.fromPairs(pairs)
  expect(plain, 'search params').to.deep.equal({
    search: 'value',
    id: '1234',
  })
})
```

<!-- fiddle-end -->

## [cy.url()](https://on.cypress.io/url)

To get the current URL string, use the `cy.url()` command.

<!-- fiddle.skip cy.url() - get the current URL string -->

```js
cy.visit('https://example.cypress.io/commands/location')
// https://on.cypress.io/url
cy.url().should('eq', 'https://example.cypress.io/commands/location')
```

<!-- fiddle-end -->
