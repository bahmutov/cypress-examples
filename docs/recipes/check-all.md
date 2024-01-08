# Check All Checkboxes

<!-- fiddle Check all checkboxes -->

```html
<form id="fruit">
  <input type="checkbox" value="orange" id="orange" />
  <label for="orange">Orange</label>
  <input
    type="checkbox"
    value="apple"
    id="apple"
    checked="checked"
  />
  <label for="apple">Apple</label>
  <input type="checkbox" value="banana" id="banana" />
  <label for="banana">Banana</label>
</form>
```

If some of the checkboxes are checked, the assertion `be.checked` passes.

```js
cy.get(':checkbox').should('have.length', 3).and('be.checked')
```

Let's check all checkboxes. If the checkbox is checked already, `cy.check` continues.

```js
cy.get(':checkbox').check()
// Let's confirm _each_ checkbox is checked.
cy.get(':checkbox').each(($check, k) => {
  expect($check, `check ${k + 1}`).to.be.checked
})
// another way is to confirm there are no unchecked boxes
cy.get(':checkbox:not(:checked)').should('not.exist')
```

Let's get the value from each checkbox. I will use `cy.map` query from [cypress-map](https://github.com/bahmutov/cypress-map).

```js
cy.get(':checkbox')
  .map('value')
  .print()
  .should('deep.equal', ['orange', 'apple', 'banana'])
```

<!-- fiddle-end -->
