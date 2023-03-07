# Enabled elements

## Get all enabled buttons

<!-- fiddle Get all enabled buttons -->

```html
<button>
  one
</button>
<button disabled="disabled">two</button>
<button disabled="disabled">three</button>
<button>four</button>
<button>five</button>
<button>six</button>
```

You can use the jQuery `:enabled` selector to query the page using `cy.get`

```js
cy.get('button:enabled').should('have.length', 4)
```

You can use the jQuery `:disabled` selector, which is the opposite of `:enabled`

```js
cy.get('button:disabled').should('have.length', 2)
```

You can get the "is enabled" status of each element using `cy.then` callback

```js
cy.get('button')
  // note: cy.then is not a query, so it won't retry
  .then(($btn) =>
    // use jQuery bundled to with Cypress to check each DOM element
    $btn.toArray().map((el) => Cypress.$(el).is(':enabled')),
  )
  .should('deep.equal', [true, false, false, true, true, true])
```

Let's use built-in HTML element property `disabled` to check the buttons.

```js
cy.get('button')
  // note: cy.then is not a query, so it won't retry
  .then(($btn) => $btn.toArray().map((el) => !el.disabled))
  .should('deep.equal', [true, false, false, true, true, true])
```

If you are using [cypress-map](https://github.com/bahmutov/cypress-map), which you should, you can grab the property of each element using the `cy.map` query. Note that you need to flip the boolean values by mapping them through the `not` function.

```js
// construct the "not" function that simply
// returns the inverse of the boolean value
const not = Cypress._.negate(Cypress._.identity)
cy.get('button')
  // cy.map and cy.print are from cypress-map plugin
  .map('disabled')
  .print('disabled %o')
  .map(not)
  .should('deep.equal', [true, false, false, true, true, true])
```

<!-- fiddle-end -->

## See also

- [Check enabled checkboxes](./check-enabled-checkboxes.md)
