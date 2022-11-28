# Window open

If the page tries to open a new window using the `window.open` method call, we can stub it to confirm the parameters of the call, or redirect to the current window.

## Stub the method call

<!-- fiddle Stub window open -->

```html
<button id="open">Open</button>
<script>
  document
    .getElementById('open')
    .addEventListener('click', () => {
      window.open('https://gleb.dev')
    })
</script>
```

```js
cy.window().then((win) => {
  cy.stub(win, 'open').as('open')
})
cy.contains('button', 'Open').click()
// confirm the window.open stub was called
// with expected URL
cy.get('@open').should(
  'have.been.calledWith',
  'https://gleb.dev',
)
```

<!-- fiddle-end -->

## Return a popup object

Sometimes the application code does not pass the URL to open. Instead the code gets the new window object and sets its location property to navigate to the new URL. From the Cypress test we can stub the call, return our object, and then observe the object's property `location` to confirm the application code works as expected.

<!-- fiddle Observe the returned object -->

```html
<button id="open">Open</button>
<script>
  document
    .getElementById('open')
    .addEventListener('click', () => {
      const popup = window.open('')
      popup.location = 'https://gleb.dev'
    })
</script>
```

```js
// mock popup object to return to the application
const popup = {}
cy.window().then((win) => {
  cy.stub(win, 'open').as('open').returns(popup)
})
cy.contains('button', 'Open').click()
// confirm the window.open stub was called
// with expected URL
cy.get('@open').should('have.been.calledWith', '')
// confirm the application code set the popup location property
cy.wrap(popup).should(
  'have.property',
  'location',
  'https://gleb.dev',
)
```

<!-- fiddle-end -->

## See also

- 📝 blog post [Stub window.open](https://glebbahmutov.com/blog/stub-window-open/)
- [Stub `window.print`](./stub-window-print.md) recipe
