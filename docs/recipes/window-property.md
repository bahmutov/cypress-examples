# Window property

For question [#5419](https://github.com/cypress-io/cypress/issues/5419)

<!-- fiddle Property is set after delay -->

With custom timeout

```html
<script>
  // application code, start with window.Hash = null
  window.myproperty = {
    Hash: null,
  }
  // and set the value after 10 seconds
  setTimeout(() => {
    window.myproperty.Hash = '1234'
  }, 10000)
</script>
```

Now our code should retry, until `Hash` is really `1234`. See [`should(cb)`](https://on.cypress.io/should#Function).

```js
// increase the command timeout
cy.window({ timeout: 11000 }).should((win) => {
  expect(win.myproperty.Hash).to.equal('1234')
})
// alternative: use cy.its
cy.window({ timeout: 11000 })
  .its('myproperty.Hash')
  .should('equal', '1234')
```

<!-- fiddle-end -->
