# Input value

You can use the `have.prop` assertion to grab the text value and yield it to the next assertion.

<!-- fiddle The text input value matching a regular expression -->

```html
<input id="user-ssn" value="123-45-6789" />
```

```js
// it looks best if we know the exact value to check
cy.get('#user-ssn').should('have.value', '123-45-6789')
```

If we don't know the exact value to expect, we can grab the `value` property and check if it follows a regular expression.

```js
cy.get('#user-ssn')
  .should('have.prop', 'value')
  // yields the string value
  .should('match', /^\d\d\d-\d\d-\d\d\d\d$/)
```

<!-- fiddle-end -->
