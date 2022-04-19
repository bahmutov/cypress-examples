# Combine lists

You can select multiple elements using separate `cy.get` and other querying commands. You can even combine multiple lists of elements into a single list to be yielded to the next command or assertion.

<!-- fiddle Combine lists -->

```html
<ol id="fruits">
  <li>Apples</li>
  <li>Grapes</li>
  <li>Pears</li>
  <li>Plums</li>
</ol>
<ol id="people">
  <li>Anna</li>
  <li>Joe</li>
</ol>
```

```js
// first we select all fruits
cy.get('#fruits li')
  .then(($fruits) => {
    // second we select all people
    cy.get('#people li').then(($people) => {
      // combine the elements arrays into a single list
      return $fruits.toArray().concat($people.toArray())
    })
  })
  // Cypress automatically makes a jQuery object
  // from an array of DOM elements
  .should('have.length', 6)
  .and((list) => {
    expect(Cypress.dom.isJquery(list), 'is jQuery object').to.be
      .true
  })
```

Using the callbacks to combine two lists of elements might be an overkill for this simple case. You can select items from both lists using a single CSS selector instead:

```js
cy.get('#fruits li, #people li').should('have.length', 6)
```

<!-- fiddle-end -->
