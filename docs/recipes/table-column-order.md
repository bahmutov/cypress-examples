# Table column order

Imagine we have a table with multiple columns. We don't need to check every column, but we want to confirm that there are three columns "Users", "Items", and "Projects" in that order.

You can watch this recipe at [Confirm The Table Columns Order](https://youtu.be/zOLM8fodASY).

<!-- fiddle Table column order -->

```html
<table>
  <thead>
    <tr>
      <th>N</th>
      <th>Users</th>
      <th>Items</th>
      <th>Dates</th>
      <th>Duration</th>
      <th>Projects</th>
    </tr>
  </thead>
</table>
<style>
  table,
  th,
  td {
    border: 1px solid;
    padding: 5px 10px;
  }
</style>
```

```js
const getTexts = ($el) => {
  return Cypress._.map($el, 'innerText')
}
// the list of columns we are looking for
const target = ['Users', 'Items', 'Projects']
cy.get('table thead th')
  .then(getTexts)
  .then((list) => list.filter((s) => target.includes(s)))
  // show the items of interest
  // in the Cypress Command Log
  .should('be.an', 'array')
  // confirm each column title we need is present
  // and they are in the expected order
  .should('deep.equal', target)
```

For definition of `getTexts`, see the recipe [Getting Text from List of Elements](./get-text-list.md).

<!-- fiddle-end -->
