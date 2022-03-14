# Click a random element

## Click a single picked list item

Sometimes you might want to pick a random element from selected elements on the page. Make sure the elements are ready before picking - the elements might be added asynchronously.

<!-- fiddle Click a random element -->

```html
<style>
  .clicked {
    font-weight: bold;
  }
</style>
<ul id="items"></ul>
<script>
  setTimeout(() => {
    // add elements to the list
    const list = document.getElementById('items')
    list.innerHTML = `
      <li class="an-item">One</li>
      <li class="an-item">Two</li>
      <li class="an-item">Three</li>
      <li class="an-item">Four</li>
      <li class="an-item">Five</li>
    `
    list.addEventListener('click', (e) => {
      e.target.classList.add('clicked')
    })
  }, 1000)
</script>
```

```js
// first, make sure the elements are on the page
cy.get('#items li')
  .should('have.length.gt', 3)
  // pick a random item from the list
  .then(($li) => {
    const items = $li.toArray()
    // use Lodash _.sample method to pick
    // a random element from an array
    return Cypress._.sample(items)
  })
  .then(($li) => {
    // the yielded element is automatically wrapped in jQuery by Cypress
    expect(Cypress.dom.isJquery($li), 'jQuery element').to.be
      .true
    cy.log(`you picked "${$li.text()}"`)
    // we do not need to return anything from `cy.then`
    // if we want to continue working with the same element
  })
  .click()
// confirm 1 element got "clicked" class
cy.get('#items .clicked').should('have.length', 1)
```

<!-- fiddle-end -->

## Click several checkboxes

Let's say we have multiple checkboxes and we want to pick three of then randomly.

<!-- fiddle Click several checkboxes -->

```html
<div id="checkboxes">
  <input type="checkbox" id="apples" />
  <label for="apples">I ❤️ apples</label><br />
  <input type="checkbox" id="peaches" />
  <label for="peaches">I ❤️ peaches</label><br />
  <input type="checkbox" id="grapes" />
  <label for="grapes">I ❤️ grapes</label><br />
  <input type="checkbox" id="mango" />
  <label for="mango">I ❤️ mango</label><br />
</div>
```

First, let's confirm that there are four unchecked checkboxes, none of them checked.

```js
cy.get('#checkboxes input[type=checkbox]')
  .should('be.visible')
  .and('have.length', 4)
  .each(($checkbox) => expect($checkbox).to.not.be.checked)
  // use Lodash _.sampleSize to pick N
  // random elements from a jQuery array
  // while _.sampleSize can pull items from jQuery object
  // I found the entire test to be reliable
  // only when converting the jQuery to plain Array first
  .then(function ($items) {
    return Cypress._.sampleSize($items.toArray(), 2)
  })
  .should('have.length', 2)
  .click({ multiple: true })
```

Let's confirm that 2 checkboxes are checked now using the jQuery [:checked](https://api.jquery.com/checked-selector/) selector.

```js
// https://api.jquery.com/checked-selector/
cy.get('#checkboxes input[type=checkbox]:checked')
  .should('have.length', 2)
  // print the checked element IDs to the Command Log
  .then(($checked) => Cypress._.map($checked, 'id'))
  .then(cy.log)
```

<!-- fiddle-end -->

Watch the video [Randomly Pick Two Checkboxes Out Of Four And Click On Them](https://youtu.be/h8NfDFsgdW4).
