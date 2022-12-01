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
  // you can invoke jQuery "val" method
  // or use the "have.prop" assertion
  .should('have.prop', 'value')
  // yields the string value
  .should('match', /^\d\d\d-\d\d-\d\d\d\d$/)
  // alternate regular expression
  .and('match', /^\d{3}-\d{2}-\d{4}$/)
```

Watch this recipe explained in the video [Input Text Value Matches A Regular Expression](https://youtu.be/88sIuUz6Jh0).

<!-- fiddle-end -->

## See also

- [Input value as a number](./input-value-as-number.md)
