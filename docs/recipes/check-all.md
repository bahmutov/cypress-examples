# Check All Checkboxes

## Test and check boxes

📺 Watch this recipe explained in the video [Check All Boxes](https://youtu.be/s7qFSFa4eT8).

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

## Checkboxes with confirmations

Imagine that the application asks the user to confirm before checking the box. You click on the "Apple" checkbox and it pops the window `confirm` dialog with the question "Turn apple on?". Let's confirm the the `confirm` is asked correctly.

<!-- fiddle Check boxes with confirmation popups -->

```html hide
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
<script>
  Cypress.$(':checkbox').on('change', (e) => {
    if (e.target.checked) {
      if (!confirm(`Turn ${e.target.value} on?`)) {
        e.target.checked = false
      }
    }
  })
</script>
```

```js
// stub the "confirm" method to always return true
cy.window().then((window) => {
  cy.stub(window, 'confirm').returns(true).as('confirm')
})
// check each unchecked box one by one
cy.get(':checkbox:not(:checked)').each(($box) => {
  cy.wrap($box).check()
  // confirm the "window.confirm" stub was called
  // with the expected message
  const value = $box.attr('value')
  cy.get('@confirm').should(
    'have.been.calledWith',
    `Turn ${value} on?`,
  )
})
```

<!-- fiddle-end -->
