# Table update

Imagine a table with rows, and each row has a button to fetch some data. How do we assert the data has finished fetching? The cell does change its text contents when the update is finished, but we want to [retry](https://on.cypress.io/retry-ability) without hitting the dreaded "the element has detached from DOM" error, thus we need to express the query as a single command ...

<!-- fiddle Table update -->

```html
<table>
  <tr id="a1">
    <td>First row</td>
    <td class="status">Pending</td>
    <td>
      <button>Load row</button>
    </td>
  </tr>
  <tr id="b1">
    <td>Second row</td>
    <td class="status">Pending</td>
    <td>
      <button>Load row</button>
    </td>
  </tr>
  <tr id="c1">
    <td>Third row</td>
    <td class="status">Pending</td>
    <td>
      <button>Load row</button>
    </td>
  </tr>
</table>
```

```js
// first, find the row of interest
// and save its ID in a local variable
let rowId
cy.contains('tr', 'Third row')
  .should('have.attr', 'id')
  .then((id) => (rowId = id))
```

<!-- fiddle-end -->
