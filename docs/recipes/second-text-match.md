# Second Text Match

Imagine we have multiple elements on the page with the same text, and we want to grab the _second_ element with the given text. The command [cy.contains](https://on.cypress.io/contains) is great, but it gives us the _first_ element. We need the second. We can use the [cy.get](https://on.cypress.io/get) command with jQuery [:contains](https://api.jquery.com/contains-selector/) selector that matches the elements by the partial text. Then we can use the [cy.eq](https://on.cypresss.io/eq) command to pick the element by index.

<!-- fiddle The second text match -->

```html
<ul>
  <li>Apples</li>
  <li>Grapes</li>
  <li>Apple pies</li>
  <li>Sour grapes</li>
</ul>
```

```js
// cy.contains returns the first match for "Apple"
cy.contains('Apple').should('have.text', 'Apples')
// use jQuery :contains selector to find all elements
// by the partial text match
cy.get('li:contains(Apple)')
  .should('have.length', 2)
  // grab the second match
  .eq(1)
  .should('have.text', 'Apple pies')
```

<!-- fiddle-end -->
