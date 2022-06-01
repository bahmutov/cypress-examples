# Dialog HTML Element

This recipe shows how to test the new [HTML Dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)

## Modeless OK dialog

<!-- fiddle Modeless OK dialog -->

```html
<dialog open data-cy="ok-example">
  <p>Greetings, one and all!</p>
  <form method="dialog">
    <button>OK</button>
  </form>
</dialog>
```

```js
cy.get('dialog[data-cy=ok-example]')
  .should('be.visible')
  .contains('button', 'OK')
  .click()
cy.get('dialog').should('not.be.visible')
```

<!-- fiddle-end -->
