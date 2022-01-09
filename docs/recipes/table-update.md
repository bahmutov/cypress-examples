# Table update

Imagine a table with rows, and each row has a button to fetch some data. How do we assert the data has finished fetching? The cell does change its text contents when the update is finished, but we want to [retry](https://on.cypress.io/retry-ability) without hitting the dreaded "the element has detached from DOM" error, thus we need to express the query as a single command ...

<!-- fiddle Table update -->

```html
<table id="example-table">
  <tbody>
    <tr id="a1">
      <td>First row</td>
      <td class="status">Pending.</td>
      <td>
        <button>Load row</button>
      </td>
    </tr>
    <tr id="b1">
      <td>Second row</td>
      <td class="status">Pending..</td>
      <td>
        <button>Load row</button>
      </td>
    </tr>
    <tr id="c1">
      <td>Third row</td>
      <td class="status">Pending...</td>
      <td>
        <button id="load-row-c1">Load row</button>
      </td>
    </tr>
  </tbody>
</table>
<script>
  document
    .getElementById('load-row-c1')
    .addEventListener('click', () => {
      setTimeout(() => {
        const table = document.querySelector(
          'table#example-table',
        )
        table.innerHTML = table.innerHTML.replace(
          'Pending...',
          'Loaded!!!',
        )
      }, 1500)
    })
</script>
```

```js
// first, find the row of interest
// and save its ID in a local variable
let rowId
cy.contains('tr', 'Third row')
  .should('have.attr', 'id')
  .then((id) => (rowId = id))
  .then(() => {
    // click the button in the row we want
    const rowSelector = `tr#${rowId}`
    cy.get(rowSelector).contains('Load row').click()

    // notice the click replaces the entire table DOM structure
    // thus we want to write the entire query as a single command
    // to be retried at once: find a row with cell
    // with specific class with text "Loaded"
    cy.contains(`table ${rowSelector} td.status`, 'Loaded')
      // and now we can "move" up the tree to the parent row
      // and confirm other values ...
      .parent('tr')
      .contains('td', 'Third row')
  })
```

<!-- fiddle-end -->
