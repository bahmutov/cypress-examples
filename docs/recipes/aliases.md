# Multiple aliases

Let's get several elements at once using [aliases](../commands/aliasing.md) and `this` properties.

<!-- fiddle Multiple aliases -->

```html
<style>
  .dollars::before {
    content: '$';
    margin-right: 2px;
  }
  .dollars {
    width: 6rem;
    text-align: right;
  }
</style>
<div id="subtotal" class="dollars">20.15</div>
<div id="tax" class="dollars">1.70</div>
<div id="tip" class="dollars">3.00</div>
<div id="total" class="dollars">24.85</div>
```

We could use multiple `.then` callbacks to get each value.

```text
cy.get('#subtotal')
  .invoke('text')
  .then(parseFloat)
  .then((subtotal) => {
    cy.get('#tax')
      .invoke('text')
      .then(parseFloat)
      .then((tax) => {
        cy.get('#tip')
          .invoke('text')
          .then(parseFloat)
          .then((tip) => {
            // get the total and compare
          })
      })
  })
```

But a much better approach is to save the values as Cypress aliases using `cy.as` commands, and then use a single function callback to get all values via `this` object.

```js
cy.get('#subtotal')
  .invoke('text')
  .then(parseFloat)
  .as('subtotal')
cy.get('#tax').invoke('text').then(parseFloat).as('tax')
cy.get('#tip').invoke('text').then(parseFloat).as('tip')
cy.get('#total')
  .invoke('text')
  .then(parseFloat)
  .as('total')
  .then(function () {
    expect(this.total, 'total').to.be.closeTo(
      this.subtotal + this.tax + this.tip,
      0.01,
    )
  })
```

<!-- fiddle-end -->

See the above test explained in the video [Use Multiple Aliases To Avoid Pyramid of Doom Callbacks](https://youtu.be/0LLsdI0o9Iw).
