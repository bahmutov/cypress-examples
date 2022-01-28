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

## Sales table

Let's imagine we need to confirm the total price for each row in the table.

<!-- fiddle Sales table -->

```html
<table id="sales" class="table table-bordered">
  <thead>
    <tr>
      <th>Item</th>
      <th>Price</th>
      <th>Quantity</th>
      <th><strong>Total<strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Apples</td>
      <td>$1.01</td>
      <td>4</td>
      <td>$4.04</td>
    </tr>
    <tr>
      <td>Chips</td>
      <td>$3.99</td>
      <td>2</td>
      <td>$7.98</td>
    </tr>
    <tr>
      <td>Juice</td>
      <td>$0.75</td>
      <td>1</td>
      <td>$0.75</td>
    </tr>
  </tbody>
</table>
```

Let's confirm the second row has the correct total.

```js
cy.get('#sales tbody tr')
  .eq(1)
  // get the row cells
  .find('td')
  // spread the table cells into individual DOM elements
  .spread((nameEl, priceEl, quantityEl, totalEl) => {
    const name = nameEl.innerText
    const price = parseFloat(priceEl.innerText.replace('$', ''))
    const quantity = parseInt(quantityEl.innerText)
    const total = parseFloat(totalEl.innerText.replace('$', ''))
    expect(price * quantity, `total for ${name}`).to.equal(total)
  })
```

If you want to iterate and confirm the total in every row, use [cy.each](https://on.cypress.io/each)

```js
function confirmRowCells(nameEl, priceEl, quantityEl, totalEl) {
  const name = nameEl.innerText
  const price = parseFloat(priceEl.innerText.replace('$', ''))
  const quantity = parseInt(quantityEl.innerText)
  const total = parseFloat(totalEl.innerText.replace('$', ''))
  expect(price * quantity, `total for ${name}`).to.equal(total)
}

cy.get('#sales tbody tr').each(($row) => {
  cy.wrap($row).find('td').spread(confirmRowCells)
})
```

<!-- fiddle-end -->
