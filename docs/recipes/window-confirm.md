# Window confirm popup

<!-- fiddle Window confirm popup -->

```html
<button id="ask">Ask user</button>
<output id="output" />
<script>
  document
    .getElementById('ask')
    .addEventListener('click', () => {
      const output = document.getElementById('output')
      const ok = confirm('Should I proceed?')
      output.innerText = ok ? 'Yes' : 'No'
    })
</script>
```

**Note:** this test only passes when doing full browser reload. On normal file watching or re-run it pops the browser Confirm dialog instead of auto-accepting it. Seems like a bug to me.

```js skip
// Cypress auto-accepts the confirmation
cy.contains('Ask user').click()
cy.contains('output', 'Yes').then(() => {
  cy.on('window:confirm', cy.stub().returns(false))
  cy.contains('Ask user').click()
  cy.contains('output', 'No')
})
```

Luckily, there is an easy workaround by using `cy.stub` command to control the `window.confirm` method instead.

```js
cy.window().then((win) =>
  cy.stub(win, 'confirm').as('confirm').returns(true),
)
cy.contains('Ask user').click()
cy.contains('output', 'Yes')
cy.get('@confirm')
  .should('have.been.calledOnce')
  .invoke('restore')
cy.window().then((win) =>
  cy.stub(win, 'confirm').as('confirm').returns(false),
)
cy.contains('Ask user').click()
cy.contains('output', 'No')
```

Watch the video [Stub The Window Confirm Popups](https://youtu.be/4nxrivWXYnM).

<!-- fiddle-end -->
