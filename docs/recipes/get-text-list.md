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
cy.get('.matching').then(($els) =>
  Cypress._.map($els, 'innerText'),
)
```

## Array vs jQuery object

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
    expect(Cypress.dom.isJquery($els), 'jQuery object').to.be
      .true
    const elements = Cypress.$.makeArray($els)
    expect(Cypress.dom.isJquery(elements), 'converted').to.be
      .false
    expect(elements, 'to array').to.be.an('array')
    // we are returning an array of DOM elements
    return elements
  })
  .then((x) => {
    // but get back a jQuery object again
    expect(Cypress.dom.isJquery(x), 'back to jQuery object').to
      .be.true
    expect(x, 'an not a array').to.not.be.an('array')
    expect(x.length, '3 elements').to.equal(3)
  })
```

<!-- fiddle-end -->

## Confirm the number of items

Let's imagine the page shows the number of items in the list, and we want to confirm the displayed number is correct.

<!-- fiddle Confirm the number of items -->

```html
<div>There are <span id="items-count">4</span> items</div>
<ul id="items">
  <li>Apples</li>
  <li>Oranges</li>
  <li>Pears</li>
  <li>Grapes</li>
</div>
```

Because the commands are asynchronous we cannot get the number "4" and immediately use it to assert the number of `<LI>` items. Instead we need to use `.then` callback.

```js
cy.get('#items-count')
  .invoke('text')
  .then(parseInt)
  .then((n) => {
    cy.get('#items li').should('have.length', n)
  })
```

<!-- fiddle-end -->

### with text matching

Sometimes the number of items is a part of the text and needs to be extracted first before parsing into a number. Notice the number "4" is hiding inside the brackets and does not have its own element to query.

<!-- fiddle Confirm the number of items with parsing -->

```html
<div id="items-intro">There are [ 4 ] items</div>
<ul id="my-items">
  <li>Apples</li>
  <li>Oranges</li>
  <li>Pears</li>
  <li>Grapes</li>
</div>
```

We need to grab the entire text

```js
cy.get('#items-intro')
  .invoke('text')
  .then((s) => {
    // by adding an assertion here we print
    // the text in the command log for simple debugging
    expect(s).to.be.a('string')
    const matches = /\[\s*(\d+)\s*\]/.exec(s)
    return matches[1]
  })
  .then(parseInt)
  // another assertion to log the parsed number in the command log
  .should('be.a', 'number')
  // we expect between 1 and 10 items
  .and('be.within', 1, 10)
  .then((n) => {
    cy.get('#my-items li').should('have.length', n)
  })
```

<!-- fiddle-end -->

## Text at index K

Let's say we want to robustly check each item's text. But the items can be added dynamically, and the item's order matters.

<!-- fiddle text at index k -->

```html
<ul id="fruits"></ul>
<script>
  const fruits = document.getElementById('fruits')
  function addFruit(name, timeout) {
    setTimeout(function () {
      const li = document.createElement('li')
      li.appendChild(document.createTextNode(name))
      fruits.appendChild(li)
    }, timeout)
  }
  // insert each list item asynchronously
  addFruit('apples', 500)
  addFruit('kiwi', 1000)
  addFruit('grapes', 1600)
</script>
```

Let's check if "apples" is in the list at first position. Then "kiwi", followed by "grapes"

```js
// check each fruit in this list
const fruits = ['apples', 'kiwi', 'grapes']
fruits.forEach((fruit, k) => {
  // the order matters, thus we use the index k
  // to form CSS "nth-child" selector
  // Note: the CSS selector starts at 1, thus
  // we need to add 1 to the index k
  cy.contains(`#fruits li:nth-child(${k + 1})`, fruit)
})
```

<!-- fiddle-end -->
