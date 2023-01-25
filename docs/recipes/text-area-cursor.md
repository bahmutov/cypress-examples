# Text area cursor

## Text area cursor position

<!-- fiddle Text area cursor position -->

```html
<textarea id="essay" rows="3" cols="20"></textarea>
```

```js
cy.get('textarea#essay')
  .type('My name is{enter}Joe')
  .should('have.prop', 'selectionStart', 14)
```

<!-- fiddle-end -->
