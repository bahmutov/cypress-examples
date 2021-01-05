# Find elements by class and text

This recipe answers the question [#14281](https://github.com/cypress-io/cypress/issues/14281) - how do I select an element having an exact class? We can use [cy.get](https://on.cypress.io/get) or [cy.contains](https://on.cypress.io/contains)

<!-- fiddle Filter by class -->

```html
<ul>
  <li class="day">first A</li>
  <li class="day old">first B</li>
  <li class="day disabled">first C</li>

  <li class="day">second A</li>
  <li class="day old">second B</li>
  <li class="day disabled">second C</li>

  <li class="day">third A</li>
  <li class="day old">third B</li>
  <li class="day disabled">third C</li>
</ul>
```

How do we select an element having class "day" with text "second" but NOT "day old" or "day disabled"?

```js
// this selects ALL elements
cy.get('.day').should('have.length', 9)
// this selects only elements with exactly class "day"
// because we are using the attribute selector
cy.get('[class=day]')
  .should('have.length', 3)
  // now we can find the one element with text "second"
  .contains('second')
  .should('have.text', 'second A')
  // confirm it does not have other classes
  .should('have.class', 'day')
  .and('not.have.class', 'old')
  .and('not.have.class', 'disabled')

// similarly we can use cy.contains directly
cy.contains('[class=day]', 'second A')
  // we can confirm classes like above
  // or by taking the classList from the DOM element
  .then(($el) => $el[0].className)
  .should('equal', 'day')

// similarly finding "third B"
cy.contains('[class="day old"]', 'third B')
  .then(($el) => $el[0].className)
  .should('equal', 'day old')
```

<!-- fiddle-end -->
