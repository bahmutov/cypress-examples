# Parse price

Let's say that in the element's text we have a price that we need to find and extract as a number. The price could be simple `$1.99` or could have `-` sign in front of it `discount coupon -$2.12 applied`.

<!-- fiddle Find and parse the price -->

Watch explanation for this recipe in the video [How To Unit Test Find And Parse The Price Function That Needs A jQuery Object](https://youtu.be/1iOU9ZPd0pg).

```js
function parsePrice($el) {
  const text = $el.text()
  const matched = text.match(/(?<price>-?\$\d+\.\d{2})/)
  const priceText = Cypress._.get(matched, 'groups.price')
  if (!priceText) {
    return NaN
  }
  return parseFloat(priceText.replace('$', ''))
}
```

A convenient way to test multiple DOM elements is to construct them on the fly using `Cypress.$(html)` and [cy.wrap](https://on.cypress.io/wrap) command.

```js
cy.wrap(Cypress.$('<p>$1.99</p>'))
  .then(parsePrice)
  .should('equal', 1.99)
cy.wrap(Cypress.$('<p>-$1.99</p>'))
  .then(parsePrice)
  .should('equal', -1.99)
cy.wrap(Cypress.$('<p>Final price $10.99</p>'))
  .then(parsePrice)
  .should('equal', 10.99)
cy.wrap(Cypress.$('<p>Total discount -$10.99 applied</p>'))
  .then(parsePrice)
  .should('equal', -10.99)
```

Testing cases without a price

```js
cy.wrap(Cypress.$('<p>loading...</p>'))
  .then(parsePrice)
  .should('be.a.NaN')
cy.wrap(Cypress.$('<p>20</p>'))
  .then(parsePrice)
  .should('be.a.NaN')
cy.wrap(Cypress.$('<p>$20.1</p>'))
  .then(parsePrice)
  .should('be.a.NaN')
```

<!-- fiddle-end -->

## Fluent chain

You can rewrite the above command to be a fluent chain of queries (except for `cy.then` step).

<!-- fiddle Parse price using fluent programming -->

```js
cy.wrap(Cypress.$('<p>Final price $10.99</p>'))
  .invoke('text')
  .invoke('match', /(?<price>-?\$\d+\.\d{2})/)
  .its('groups.price')
  .invoke('slice', 1)
  .then(parseFloat)
  .should('equal', 10.99)
```

**Tip:** instead of `cy.then(parseFloat)` use `cy.apply(parseFloat)` from [cypress-map](https://github.com/bahmutov/cypress-map) to preserve retry-ability of the entire query chain.

<!-- fiddle-end -->
