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
// we can perform the opposite: only take the elements
// WITHOUT child element with class "badge" inside
cy.get('#list li')
  .then(($elements) =>
    // Lodash _.reject method is the opposite of _.filter
    Cypress._.reject($elements, (el) =>
      el.querySelector('.label'),
    ),
  )
  .should('have.length', 2)
  .first()
  .should('have.text', 'first')
```

What if we want to use Cypress commands inside the element filter callback? Like `cy.contains`? Let's find all `LI` elements that have labels with the text "Advanced" in them.

```js
cy.get('#list li')
  .should('have.length', 5)
  .then(($elements) => {
    // all found LI elements
    const filtered = []

    Cypress._.each($elements, (li) => {
      // to run a Cypress command against the DOM element
      // wrap it inside Cypress chain
      cy.wrap(li)
        .contains('.label', 'Advanced')
        .should(($label) => {
          // there might NOT be such element
          if ($label.length) {
            // only if there is such label,
            // put the original "li" element
            // into the filtered list
            filtered.push(li)
          }
        })
    })

    // yield the filtered list of DOM elements
    // to the next Cypress assertion / command
    cy.wrap(filtered)
  })
  .should('have.length', 1) // yields [li] array
  .its(0) // yields the first LI DOM element from the array
  .should('include.text', 'fifth') // confirm we found the right element
```

We can also use the jQuery `:has` selector to find `LI` elements with `.label` elements inside.

```js
cy.get('li:has(.label)')
  .should('have.length', 3)
  .last()
  .contains('Advanced')
```

We can even use the `:has` combined with `:contains` to find all `LI` elements with `.label` elements that have the text "New" in them.

```js
cy.get('li:has(.label:contains("New"))').should('have.length', 2)
```

<!-- fiddle.end -->

Watch the video "[jQuery :has and :contains Selectors in Cypress Tests](https://youtu.be/2NpHXkZN1SY)".

## Find labels OR warnings

Imagine that some list elements have plain labels and some have warnings. Can we find the list elements with labels OR warnings using `:has` selector?

<!-- fiddle Find list items with labels or warnings -->

```html
<ol id="list">
  <li>first</li>
  <li>second</li>
  <li>
    <p>third <span class="badge label">New!</span></p>
  </li>
  <li>
    <p>fourth <span class="badge label">New!</span></p>
  </li>
  <li>
    <p>fifth <span class="badge warning">Deprecated</span></p>
  </li>
</ol>
<style>
  .badge {
    padding: 0.2rem 0.5rem;
    border-radius: 0.5rem;
  }
  .label {
    background-color: #8b8bee;
  }
  .warning {
    background-color: #f99650;
  }
</style>
```

```js
// use jQuery CSS selector :has to find
// all list items with an element with class label or warning inside
cy.get('li:has(.label, .warning)').should('have.length', 3)
// alternative: split into two commands
// using the https://on.cypress.io/filter command
cy.get('li')
  .should('have.length', 5)
  .filter(':has(.label, .warning)')
  .should('have.length', 3)
```

Watch the video [Find Elements With Specific Child Elements Using Cypress jQuery :has Selector](https://youtu.be/_b6Mf8xI5bA).

<!-- fiddle.end -->
