# Table column order

## Check all columns

Let's confirm that the column headings are exactly what we expect them to be.

<!-- fiddle Order of all columns -->

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

For definition of `getTexts`, see the recipe [Getting Text from List of Elements](./get-text-list.md).

```js
const getTexts = ($el) => {
  return Cypress._.map($el, 'innerText')
}
```

If the arrays are different, we want to print them in the error message, and not to truncate them to `[Array(6)]` short message

```js
chai.config.truncateThreshold = 300
```

```js
// the list of column headings
const headings = [
  'N',
  'Users',
  'Items',
  'Dates',
  'Duration',
  'Projects',
]
```

```js
cy.get('table thead th')
  .then(getTexts)
  // confirm each column title we need is present
  // and they are in the expected order
  .should('deep.equal', headings)
```

<!-- fiddle-end -->

## Check order of some columns

Imagine we have a table with multiple columns. We don't need to check every column, but we want to confirm that there are three columns "Users", "Items", and "Projects" in that order.

You can watch this recipe at [Confirm The Table Columns Order](https://youtu.be/zOLM8fodASY).

<!-- fiddle Order of some columns -->

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

For definition of `getTexts`, see the recipe [Getting Text from List of Elements](./get-text-list.md).

```js
const getTexts = ($el) => {
  return Cypress._.map($el, 'innerText')
}
```

```js
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

<!-- fiddle-end -->
