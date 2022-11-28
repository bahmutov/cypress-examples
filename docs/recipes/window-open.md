# Window open

If the page tries to open a new window using the `window.open` method call, we can stub it to confirm the parameters of the call, or redirect to the current window.

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

## See also

- 📝 blog post [Stub window.open](https://glebbahmutov.com/blog/stub-window-open/)
- [Stub `window.print`](./stub-window-print.md) recipe
