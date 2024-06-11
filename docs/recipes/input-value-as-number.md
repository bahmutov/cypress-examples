# Input valueAsNumber example

<!-- fiddle valueAsNumber -->

If the input element has type "number" you can check its property `valueAsNumber` to avoid converting the string value into a number.

```html
<input type="number" id="age" value="22" />
<input type="number" id="glass" value="0.5" />
```

```js
cy.get('#age')
  .should('have.value', '22')
  .and('have.prop', 'valueAsNumber', 22)
```

You can yield the property value to run more assertions

```js
cy.get('#age')
  // yields the value of the prop
  .should('have.prop', 'valueAsNumber')
  // if we only know the lower and upper limits
  .should('be.within', 15, 25)
```

It works with floating point values too.

```js
cy.get('#glass')
  .should('have.value', '0.5')
  .and('have.prop', 'valueAsNumber', 0.5)
// if we know the value approximately
cy.get('#glass')
  .should('have.prop', 'valueAsNumber')
  .should('be.closeTo', 0.49, 0.1)
```

📺 Watch this example in the video [Input With Type Number Checking valueAsNumber Prop Example](https://youtu.be/Xymm3phZQRk).

<!-- fiddle-end -->

## See also

- [Input value](./input-value.md)
- [Input has value](./input-has-value.md)
