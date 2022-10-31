# Offline event

<!-- fiddle Offline and online window events -->

```html hide
<script>
  window.addEventListener('offline', () => {
    alert('Now offline!')
  })
  window.addEventListener('online', () => {
    alert('Back online!')
  })
</script>
```

```js
cy.window().then((win) => {
  cy.stub(win, 'alert').as('alert')
})
cy.window().trigger('offline')
cy.get('@alert')
  .should('have.been.calledOnceWith', 'Now offline!')
  .invoke('resetHistory')
```

After we reset the stub, we can check if the application calls `alert` when the browser signals the network is available again.

```js
cy.window().trigger('online')
cy.get('@alert').should(
  'have.been.calledOnceWith',
  'Back online!',
)
```

<!-- fiddle-end -->
