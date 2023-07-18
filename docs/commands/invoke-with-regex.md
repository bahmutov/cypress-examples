<!-- fiddle .log() / use invoke with regex args -->

```html
<div data-cy="magic-number">'22\t\n\n-\n\n\t\n\n-'</div>
```

```js
cy.get('[data-cy=magic-number]')
  .map('innerText')
  .invoke('join') // convert to string
  .then((str) => str.replace(/\D/g, ''))
  // .invoke('replace', `${/\D/g}`, '') // make this work instead;
  .print()
  .should('eq', '22')
```

<!-- fiddle-end -->
