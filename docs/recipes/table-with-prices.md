# Table with prices

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
