# Return value from a custom command that uses .within

Imagine you are using a custom command and it uses the [.within()](https://on.cypress.io/within) internally. How do you return some arbitrary value from that command if the `.within()` command always yields its parent element?

<!-- fiddle return value from .within -->

```html
<div id="parent">
  The parent div
  <div class="some-child">
    Magic number is <span class="magic">42</span>
  </div>
</div>
```

```js
// we can simply use a variable in the same lexical scope
let magicNumber
cy.get('#parent')
  .within(() => {
    cy.get('.magic')
      .invoke('text')
      .then(parseInt)
      .then((x) => {
        magicNumber = x
      })
  })
  .then(() => {
    // outside the .within() callback we can use the magicNumber
    // because it should be set by now
    expect(magicNumber).to.equal(42)
  })
```

You can use a custom command in this case, just wrap the final result so it becomes the value yielded from the custom command.

```js
cy.log('**using custom command**')
Cypress.Commands.add('getMagicNumber', (selector, options = {}) => {
  Cypress._.defaults(options, { log: true })
  cy.log(`getMagicNumber from **${selector}**`)

  let magicNumber
  cy.get(selector, options)
    .within(options, () => {
      cy.get('.magic', options)
        .invoke(options, 'text')
        .then(parseInt)
        .then((x) => {
          magicNumber = x
        })
    })
    .then(() => {
      cy.wrap(magicNumber, options)
    })
})
cy.getMagicNumber('#parent', { log: false }).should('equal', 42)
```

<!-- fiddle-end -->

## See also

- [querying commands](../commands/querying.md) including `.within()`
