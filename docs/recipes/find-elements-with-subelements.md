# Find elements with subelements

Imagine we have a list of elements. Some elements can have `<span class="label">...</span>` inside. We want to filter the top level list to only have elements that have a label inside.

<!-- fiddle Find elements with labels inside -->

```html
<ol id="list">
  <li>first</li>
  <li>second</li>
  <li>
    <p>third <span class="label">New!</span></p>
  </li>
  <li>
    <p>fourth <span class="label">New!</span></p>
  </li>
  <li>
    <p>fifth <span class="label">Advanced!</span></p>
  </li>
</ol>
<style>
  .label {
    background-color: #8b8bee;
    padding: 0.2rem 0.5rem;
    border-radius: 0.5rem;
  }
</style>
```

```js
// select all list elements
cy.get('#list li')
  .should('have.length', 5)
  // filter the list by inspecting the children elements
  .then(($elements) => {
    // we can use the Lodash _.filter method to iterate
    // over the DOM elements and filter by a predicate
    const filtered = Cypress._.filter($elements, (el) => {
      return el.querySelector('.label')
    })

    return filtered
  })
  .should('have.length', 3)
  // confirm one of the list items
  .last()
  .should('include.text', 'fifth')
  .find('.label')
  .should('have.text', 'Advanced!')
```

<!-- fiddle.end -->
