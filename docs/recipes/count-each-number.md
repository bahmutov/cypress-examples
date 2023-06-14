# Count Each Number

<!-- fiddle Count each number -->

Every row in this table has a button that loads some count and shows it in the next cell.

```html hide
<table class="as-table table table-bordered">
  <thead>
    <tr>
      <th>Command</th>
      <th>Count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><button id="load1">Load</button></td>
      <td id="count1"></td>
    </tr>
    <tr>
      <td><button id="load2">Load</button></td>
      <td id="count2"></td>
    </tr>
    <tr>
      <td><button id="load3">Load</button></td>
      <td id="count3"></td>
    </tr>
  </tbody>
</table>
<script>
  const get = document.getElementById.bind(document)
  ;[1, 2, 3].forEach((k) => {
    get('load' + k).addEventListener('click', () => {
      setTimeout(() => {
        get('count' + k).innerText = k + 4
      }, 1000)
    })
  })
</script>
```

Can we iterate over the rows, clicking the "Load" buttons, and summing up the revealed numbers? The total sum should be 18.

```js
let clicked = 0
let count = 0
// let's iterate over all buttons in the first column
cy.get('table tbody td:nth-child(1) button')
  .each(($button, k) => {
    // wrap the jQuery button object and click on it
    cy.wrap($button).click()
    // the same row "k" should now have a cell with a number
    cy.get('tbody tr')
      .eq(k)
      .contains('td', /^\d+$/)
      // get the text and convert it into an integer
      .invoke('text')
      .then(parseInt)
      // when we get something from the application
      // we can use the value in cy.then callback
      .then((n) => {
        clicked += 1
        count += n
      })
  })
  // we MUST access the updated "clicked" and "count" values
  // in another cy.then callback so the values are computed
  // by the time this cy.then callback executes
  .then(() => {
    expect(count, 'count').to.equal(18)
    cy.get('table tbody tr').should('have.length', clicked)
  })
```

**Tip:** read the blog post [Visualize Cypress Command Queue](https://glebbahmutov.com/blog/visualize-cypress-command-queue/) to understand how to use the local variables with Cypress commands.

<!-- fiddle-end -->
