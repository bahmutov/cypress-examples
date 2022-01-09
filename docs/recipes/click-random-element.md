# Click a random element

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
