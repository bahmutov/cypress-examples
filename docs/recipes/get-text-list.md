# Getting Text from List of Elements

<!-- fiddle Get text list -->

Imagine we have HTML elements.

```html
<div>
  <div class="matching">first</div>
  <div>second</div>
  <div class="matching">third</div>
  <div class="matching">fourth</div>
  <div>fifth</div>
</div>
```

We want to get the text values of elements with the class `matching`

```js
cy.get('.matching')
  .should('have.length', 3)
  .then(($els) => {
    // we get a list of jQuery elements
    // let's convert the jQuery object into a plain array
    return (
      Cypress.$.makeArray($els)
        // and extract inner text from each
        .map((el) => el.innerText)
    )
  })
  .should('deep.equal', ['first', 'third', 'fourth'])

// let's use Lodash to get property "innerText"
// from every item in the array
cy.log('**using Lodash**')
cy.get('.matching')
  .should('have.length', 3)
  .then(($els) => {
    // jQuery => Array => get "innerText" from each
    return Cypress._.map(Cypress.$.makeArray($els), 'innerText')
  })
  .should('deep.equal', ['first', 'third', 'fourth'])

cy.log('**using Lodash to convert and map**')
cy.get('.matching')
  .should('have.length', 3)
  .then(($els) => {
    expect(Cypress.dom.isJquery($els), 'jQuery input').to.be.true
    // Lodash can iterate over jQuery object
    return Cypress._.map($els, 'innerText')
  })
  .should('be.an', 'array')
  .and('deep.equal', ['first', 'third', 'fourth'])
```

<!-- fiddle-end -->

So the final advice to extract text from the list of found elements is to use the Lodash `_.map` method.

```js
cy.get('.matching').then(($els) => Cypress._.map($els, 'innerText'))
```

**Note:** we cannot use `cy.get(...).then(Cypress.$.makeArray).then(els => ...)` to convert from jQuery object first, because the result of the `$.makeArray` is an array of elements, and it gets immediately wrapped back into jQuery object after returning from `.then`

<!-- fiddle Array becomes jQuery -->

```html
<div>
  <div class="matching">first</div>
  <div>second</div>
  <div class="matching">third</div>
  <div class="matching">fourth</div>
  <div>fifth</div>
</div>
```

```js
cy.get('.matching')
  .then(($els) => {
    expect(Cypress.dom.isJquery($els), 'jQuery object').to.be.true
    const elements = Cypress.$.makeArray($els)
    expect(Cypress.dom.isJquery(elements), 'converted').to.be.false
    expect(elements, 'to array').to.be.an('array')
    // we are returning an array of DOM elements
    return elements
  })
  .then((x) => {
    // but get back a jQuery object again
    expect(Cypress.dom.isJquery(x), 'back to jQuery object').to.be
      .true
    expect(x, 'an not a array').to.not.be.an('array')
    expect(x.length, '3 elements').to.equal(3)
  })
```

<!-- fiddle-end -->
