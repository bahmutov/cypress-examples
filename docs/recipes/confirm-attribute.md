# Confirm attribute

Let's say we want to confirm an element's attribute, like its `id`. We can do this in a variety of ways.

<!-- fiddle invoke jQuery attr method -->

We can use [cy.invoke](https://on.cypress.io/invoke) to execute the jQuery `attr` method on the parent element.

```html
<div id="code-snippet">The code example</div>
```

```js
cy.contains('The code example')
  .invoke('attr', 'id')
  .should('equal', 'code-snippet')

// tip: there is a built-in Chai-Jquery assertion
// to confirm an attribute exists and optionally its value
cy.contains('The code example')
  // the "have.attr" assertion yields the value
  .should('have.attr', 'id')
  .should('equal', 'code-snippet')

// tip 2: you can use the "have.attr" form with expected value
cy.contains('The code example').should(
  'have.attr',
  'id',
  'code-snippet',
)
```

<!-- fiddle-end -->
