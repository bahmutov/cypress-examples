# Window close

<!-- fiddle Testing the window.close method call -->

```html hide
<div>Action saved, you can close this window</div>
<button id="closeit">Close</button>
<script>
  document
    .getElementById('closeit')
    .addEventListener('click', () => {
      window.close()
    })
</script>
```

First, stub the `window.close` method the button is expected to call.

```js
cy.window().then((win) => {
  cy.stub(win, 'close').as('close')
})
```

Next, click on the button.

```js
cy.contains('button', 'Close').click()
```

Finally, confirm the `window.close` method was called by the application.

```js
cy.get('@close').should('have.been.calledOnce')
```

<!-- fiddle-end -->

## See also

- [Testing the `window.open` method](./window-open.md)
- [Testing the `window.confirm` popup](./window-confirm.md)
- [Testing window object properties](./window-property.md)
