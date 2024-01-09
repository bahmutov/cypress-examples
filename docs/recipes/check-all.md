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

Let's confirm there are two unchecked boxes and one checked one.

```js
cy.get(':checkbox:checked').should('have.length', 1)
cy.get(':checkbox:not(:checked)').should('have.length', 2)
```

If some of the checkboxes are checked, the assertion `be.checked` passes.

```js
cy.get(':checkbox').should('have.length', 3).and('be.checked')
```

Let's check all checkboxes. We can go through the boxes one by one

```js
cy.get(':checkbox').each(($check) => {
  cy.wrap($check).check()
})
```

Or we can just do `.check()` on all of them. If the checkbox is checked already, `cy.check` continues.

```js
cy.log('**check all at once**')
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

Let's uncheck all boxes

```js
cy.get(':checkbox').uncheck()
// confirm all boxes are unchecked
cy.get(':checkbox').should('not.be.checked')
```

<!-- fiddle-end -->
