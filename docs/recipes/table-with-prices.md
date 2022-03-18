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
<div id="total">The total price is $12.77 (without any discounts)</div>
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

See the video [Check The Prices Table Rows](https://youtu.be/DxlqDA7tIOw).

Under the table we see the total amount. Let's parse the totals from the cells and confirm the displayed value is correct. We will sum the prices from the last column (after removing the `$` character and converting to floats). Then we will compare the sum to the total displayed under the table.

```js
// get the last column with prices
cy.get('table#sales tbody td:nth-child(4)').then(($cells) => {
  const totals = $cells
    .toArray()
    .map((el) => el.innerText)
    .map((s) => s.replace('$', ''))
    .map(parseFloat)
  const sum = Cypress._.sum(totals)
  cy.log(`sum from rows ${sum}`)
  // extract the total shown from the page element
  // let's parse the text shown in the element
  // to find the dollar amount
  cy.get('#total')
    .invoke('text')
    .then((s) => s.split(' '))
    .invoke('find', (s) => s.startsWith('$'))
    .then((s) => s.replace('$', ''))
    .then(parseFloat)
    .should('equal', sum)
  // alternative: we know the sum, let's just find it
  // as a substring in the element showing the total
  cy.contains('#total', '$' + sum)
})
```

Watch the video [Confirm The Total Sum Shown Under The Table Of Prices](https://youtu.be/M43XVZrZRtU).

<!-- fiddle-end -->
