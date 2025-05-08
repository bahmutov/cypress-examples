# jQuery :contains and custom pseudo-selectors

You can select multiple elements using partial text match and jQuery [`:contains`](https://api.jquery.com/contains-selector/) pseudo-selector. You can even make your own new pseudo-selectors.

<!-- fiddle jQuery contains and icontains pseudo-selectors -->

```html
<ul id="people">
  <li>John Resig</li>
  <li>George Martin</li>
  <li>Malcom john Sinclair</li>
  <li>J. Ohn</li>
</ul>
```

```js
cy.get('#people li').should('have.length', 4)
```

Cypress query command [cy.contains](https://on.cypress.io/contains) returns a single element with the partial text match.

```js
cy.log('**cy.contains**')
cy.contains('li', 'John').should('have.text', 'John Resig')
```

By default `cy.contains` is case-sensitive

```js
cy.contains('li', 'john').should(
  'have.text',
  'Malcom john Sinclair',
)
```

You can tell `cy.contains` to ignore case

```js
cy.contains('li', 'john', { matchCase: false }).should(
  'have.text',
  'John Resig',
)
```

Let's find _all_ items with the text "John" in them, the case should match

```js
cy.log('**jQuery :contains**')
cy.get('#people li:contains("John")').should('read', [
  'John Resig',
])
```

Let's ignore string case and find both "John" and "john" and even "jOhN". We can create a new jQuery pseudo-selector

```js
Cypress.$.expr[':'].icontains = Cypress.$.expr.createPseudo(
  function (arg) {
    return function (elem) {
      return (
        Cypress.$(elem)
          .text()
          .toUpperCase()
          .indexOf(arg.toUpperCase()) >= 0
      )
    }
  },
)
```

Use the `:icontains` custom selector to find both items. I will use `should read` assertion from [cypress-map](https://github.com/bahmutov/cypress-map) to confirm the elements.

```js
cy.get('#people li:icontains("John")').should('read', [
  'John Resig',
  'Malcom john Sinclair',
])
```

<!-- fiddle-end -->
