# Labels for Checkboxes

Imagine we have a list of checkboxes, some of them checked. We want to find the labels for all checked checkboxes and print them, or confirm that list.

<!-- fiddle Labels for checkboxes -->

```html
<input type="checkbox" id="apples" checked />
<label for="apples">I ❤️ apples</label><br />
<input type="checkbox" id="peaches" />
<label for="peaches">I ❤️ peaches</label><br />
<input type="checkbox" id="grapes" checked />
<label for="grapes">I ❤️ grapes</label><br />
<input type="checkbox" id="mango" />
<label for="mango">I ❤️ mango</label><br />
```

```js
const labels = []
// get all checked checkboxes
cy.get('input[type=checkbox]:checked')
  .should('have.length', 2)
  // for each checkbox, get its label using
  // the "for=<checkbox id>" attribute
  .each(($checkbox) => {
    cy.get(`label[for=${$checkbox.attr('id')}]`)
      // and save the label's text in the "labels" array
      .invoke('text')
      .then((text) => labels.push(text))
  })
  .then(() => {
    // we need to check the labels array
    // using deep equality and only AFTER all previous
    // Cypress commands have finished running
    // and filling the labels array with values
    expect(labels).to.deep.equal(['I ❤️ apples', 'I ❤️ grapes'])
  })
// ALTERNATIVE to using .then callback above
// because the labels array is immediately available
// we can use cy.wrap to start a new command chain
// that will only evaluate the assertion AFTER
// all previous querying commands finish
cy.wrap(labels).should('deep.equal', [
  'I ❤️ apples',
  'I ❤️ grapes',
])
```

Watch the video "[Labels For Checkboxes](https://youtu.be/0iXISW0owWM)".

<!-- fiddle-end -->
