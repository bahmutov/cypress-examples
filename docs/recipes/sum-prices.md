# Sum Of Prices

Let's pretend we have a table, and we want to sum prices shown in the California cells only. These cells start with "CA". How can we write a little utility function to do it for us? How do we return the sum?

📺 Watch this recipe explained in the video [Filter And Parse Table Cells To Confirm The Sum Of Prices](https://youtu.be/x9fTpOwp600).

<!-- fiddle Sum Of Prices -->

```html hide
<table class="table table-bordered" id="prices">
  <thead>
    <tr>
      <th>Item</th>
      <th>State and price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Apples</td>
      <td>MA $2</td>
    </tr>
    <tr>
      <td>Apples</td>
      <td>CA $3</td>
    </tr>
    <tr>
      <td>Widgets</td>
      <td>NY $1</td>
    </tr>
    <tr>
      <td>Widgets</td>
      <td>CA $5</td>
    </tr>
  </tbody>
</table>
```

First, let's take a look at something that does not work.

```js skip
function sumCaPrices() {
  let sum = 0

  cy.get('tbody')
    .children()
    .each(($row, index, $rows) => {
      cy.wrap($row).within(() => {
        cy.get('td').each(($col, index, $cols) => {
          if ($col.text().startsWith('CA $')) {
            sum += parseInt($col.text().split('$')[1])
          }
        })
      })
    })
  // how do we return the sum?!
}
```

Hmm, how do we return the sum? Let's rewrite the function to _return_ the `cy` chain of commands. For example, let's write a small function to yield all "state and price" cells.

```js
function getPriceCells() {
  return cy.get('#prices tbody tr td:nth-child(2)')
}
```

Now we can call the function and attach _more_ commands or assertions. For example, we could filter cells to only leave elements with the text that start with `CA` string. Then we can easily map elements into text, and then split into prices, and convert prices into numbers using query commands from [cypress-map](https://github.com/bahmutov/cypress-map) plugin.

```js
getPriceCells()
  .filter((k, el) => el.innerText.startsWith('CA'))
  .map('innerText') // elements => [s1, s2, ...]
  .mapInvoke('split', '$') // => [ [s1, s2], [s3, s4], ...]
  .mapInvoke('at', 1) // => [s2, s4, ...]
  .map(Number) // => [n1, n2, ...]
  .print('prices %o')
  .reduce((sum, n) => sum + n, 0) // => m
  .should('equal', 8)
```

So the final sum of parsed prices yielded by the chain of transformations is 8.

<!-- fiddle-end -->
