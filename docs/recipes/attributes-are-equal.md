# Attributes are equal

Let's confirm the fact that the two elements have equal "data-name" attributes. We don't know the expected value of the attribute, unfortunately, just that both elements have the same non-empty string value.

<!-- fiddle attributes are equal -->

```html
<div id="el1" data-name="Venus">The first planet</div>
<div id="el2" data-name="Venus">Another planet</div>
```

```js
cy.get('#el1')
  .invoke('attr', 'data-name')
  // use assertions to ensure the data attribute is set
  .should('be.a', 'string')
  .and('be.not.empty')
  .then((s) => {
    // now we know the attribute value
    // and can directly confirm the second element
    // has the same attribute
    cy.get('#el2').should('have.attr', 'data-name', s)
  })
```

**Tip:** I recommend striving knowing exactly the values to expect in the test, see the video [Good Cypress Test Syntax](https://www.youtube.com/watch?v=X8iIoTxu_8k). A better test would be:

```js
cy.get('#el1').should('have.attr', 'data-name', 'Venus')
cy.get('#el2').should('have.attr', 'data-name', 'Venus')
```

<!-- fiddle-end -->

## See also

- Recipe [Confirm attribute](./confirm-attribute.md)
