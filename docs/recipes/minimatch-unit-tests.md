# Minimatch unit tests

Using Cypress Command Log to see the commands and their arguments is so convenient during debugging, I am using them to even run unit tests.

<!-- fiddle Minimatch example -->

For example, we can use built-in Chai assertions to see them in the Command Log

```js
expect(
  Cypress.minimatch('/path/to/file.js', 'to/*.js'),
  'partial path',
).to.be.false
expect(
  Cypress.minimatch('/path/to/file.js', '**/to/*.js'),
  'with wildcard',
).to.be.true
```

Unfortunately in the example above we do not see the actual calls to `Cypress.minimatch`. An improvement would be to use `cy.wrap` and `cy.invoke`

```js
cy.log('**invoke as a method**')
cy.wrap(Cypress, { log: false })
  .invoke('minimatch', '/path/to/file.js', 'to/*.js')
  .should('be.false')
cy.wrap(Cypress, { log: false })
  .invoke('minimatch', '/path/to/file.js', '**/to/*.js')
  .should('be.true')
```

**Warning:** when using `cy.invoke` you need to consider the retries, since it is a query command. If you only want to call the method once and let it fail:

```js skip
// FAILS ON PURPOSE
cy.wrap(Cypress, { log: false })
  // disable retries using timeout:0 option
  .invoke(
    { timeout: 0 },
    'minimatch',
    '/path/to/file.js',
    'does not match',
  )
  .should('be.true')
```

Alternative solution is to use `cy.invokeOnce` query command from [cypress-map](https://github.com/bahmutov/cypress-map)

```js skip
// FAILS ON PURPOSE
cy.wrap(Cypress, { log: false })
  // does not retry when the assertion fails
  .invokeOnce('minimatch', '/path/to/file.js', 'does not match')
  .should('be.true')
```

You can even invoke the function by itself, not as an object's method. We can invoke the `Function.prototype.call` method following the advice in the [Retry-ability examples](./retry-ability.md).

```js
cy.wrap(Cypress.minimatch, { log: false })
  .invokeOnce(
    'call',
    // the first argument is the "this" object value
    // which we do not use anyway
    null,
    '/path/to/file.js',
    '/path/**/*.{js,ts}',
  )
  .should('be.true')
```

<!-- fiddle-end -->
