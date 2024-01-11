# Multiple aliases

## Remove pyramid of callbacks

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

```js skip
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
  // we need to use the "function () {...}" callback
  // to have the "this" object point at the text context
  // where each set alias is a property
  // for example: .as('tax') can be accessed via "this.tax"
  .then(function () {
    expect(this.total, 'total').to.be.closeTo(
      this.subtotal + this.tax + this.tip,
      0.01,
    )
  })
```

<!-- fiddle-end -->

See the above test explained in the video [Use Multiple Aliases To Avoid Pyramid of Doom Callbacks](https://youtu.be/0LLsdI0o9Iw).

## Element is delayed

<!-- fiddle Element creation is delayed -->

```html
<div id="element-delayed"></div>
<script>
  setTimeout(function () {
    const parent = document.getElementById('element-delayed')
    parent.innerHTML = '<div id="child">New element</div>'
  }, 3000)
</script>
```

```js skip
// while we create an alias to a non-existing element
// it really is an empty alias
cy.get('#child').should('not.exist').as('newElement')
cy.get('@newElement').should('not.exist')
// and this command chain fails with "null" subject
cy.get('@newElement').should('be.visible')
```

```js
// instead, overwrite the alias when the element is created
cy.get('#child').should('not.exist').as('newElement')
cy.get('@newElement').should('not.exist')
// at some point element with id "child" exists
// and will be saved as the alias, overwriting the null value
cy.get('#child').as('newElement')
cy.get('@newElement').should('be.visible')
```

<!-- fiddle-end -->
