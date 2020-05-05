# Local Storage

Examples of managing local storage in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [cy.clearLocalStorage()](https://on.cypress.io/clearlocalstorage)

To clear all data in local storage, use the `cy.clearLocalStorage()` command.

<!-- fiddle cy.clearLocalStorage() - clear all data in local storage -->

```html
<button class="ls-btn btn btn-success">Populate Local Storage</button>
<script>
  $('.ls-btn').on('click', function (e) {
    e.preventDefault()
    populateStorage(e)
  })

  // populate local storage to demonstrate cy.clearLocalStorage()
  function populateStorage() {
    localStorage.setItem('prop1', 'red')
    localStorage.setItem('prop2', 'blue')
    localStorage.setItem('prop3', 'magenta')
  }
</script>
```

```js
cy.get('.ls-btn')
  .click()
  .should(() => {
    expect(localStorage.getItem('prop1')).to.eq('red')
    expect(localStorage.getItem('prop2')).to.eq('blue')
    expect(localStorage.getItem('prop3')).to.eq('magenta')
  })

// clearLocalStorage() yields the localStorage object
cy.clearLocalStorage().should((ls) => {
  expect(ls.getItem('prop1')).to.be.null
  expect(ls.getItem('prop2')).to.be.null
  expect(ls.getItem('prop3')).to.be.null
})

// Clear key matching string in Local Storage
cy.get('.ls-btn')
  .click()
  .should(() => {
    expect(localStorage.getItem('prop1')).to.eq('red')
    expect(localStorage.getItem('prop2')).to.eq('blue')
    expect(localStorage.getItem('prop3')).to.eq('magenta')
  })

cy.clearLocalStorage('prop1').should((ls) => {
  expect(ls.getItem('prop1')).to.be.null
  expect(ls.getItem('prop2')).to.eq('blue')
  expect(ls.getItem('prop3')).to.eq('magenta')
})

// Clear keys matching regex in Local Storage
cy.get('.ls-btn')
  .click()
  .should(() => {
    expect(localStorage.getItem('prop1')).to.eq('red')
    expect(localStorage.getItem('prop2')).to.eq('blue')
    expect(localStorage.getItem('prop3')).to.eq('magenta')
  })

cy.clearLocalStorage(/prop1|2/).should((ls) => {
  expect(ls.getItem('prop1')).to.be.null
  expect(ls.getItem('prop2')).to.be.null
  expect(ls.getItem('prop3')).to.eq('magenta')
})
```

<!-- fiddle-end -->
