# Match assertion

If the current subject is a jQuery element, the `match` assertion uses [jQuery .is](https://api.jquery.com/is/) method to check if the element matches the selector. If the current subject is text, the `match` assertion checks it against the given regular expression.

Watch the video [Using Should Match Assertion Against Elements Or Text](https://youtu.be/FTjWAeCWpHQ) or continue reading.

## Match jQuery element selector

<!-- fiddle Match jQuery element selector -->

```html
<div id="one" class="btn btn-large">First</div>
```

```js
cy.contains('div', 'First')
  // the current subject should match the selector
  // "#one.btn-large"
  .should('match', '#one.btn-large')
  // we can use other jQuery selectors like
  // :contains to confirm the text
  .and('match', 'div:contains("First")')
```

<!-- fiddle-end -->

## Match the text using regular expression

<!-- fiddle Match text using regular expression -->

```html
<div id="fruit">Orange</div>
```

```js
// using https://on.cypress.io/contains
cy.contains('#fruit', /(orange|apple|grape)/i)
// using the "match" assertion
cy.get('#fruit')
  .invoke('text')
  .should('match', /orange/i)
```

<!-- fiddle-end -->
