# Number of rows

## Dynamic table

Let's test a table where the rows appear after a delay. We want to confirm the table is fully loaded by checking the number of rows.

<!-- fiddle Dynamic table -->

```html
<style>
  table td {
    border: 3px solid black;
  }
</style>
<table>
  <tbody></tbody>
</table>
<script>
  // the first two rows appear after one second
  // and the remaining rows appear after two seconds
  setTimeout(function () {
    document.querySelector('table tbody').innerHTML = `
      <tr><td>First row</td></tr>
      <tr><td>Row 2</td></tr>
    `
  }, 1000)
  setTimeout(function () {
    document.querySelector('table tbody').innerHTML += `
      <tr><td>Row 3</td></tr>
      <tr><td>Row 4</td></tr>
      <tr><td>Row 5</td></tr>
    `
  }, 2000)
</script>
```

```js
cy.get('table tbody tr').should('have.length', 5)
```

<!-- fiddle-end -->

## Match rows with the number

Let's confirm the number of rows in the table matches the number specified in an element.

<!-- fiddle Number of rows -->

```html
<style>
  table td {
    border: 3px solid black;
  }
</style>
<div>There are <span data-cy="rowsN">5</span> rows</div>
<table>
  <tbody>
    <tr>
      <td>First row</td>
    </tr>
    <tr>
      <td>Row 2</td>
    </tr>
    <tr>
      <td>Row 3</td>
    </tr>
    <tr>
      <td>Row 4</td>
    </tr>
    <tr>
      <td>Row 5</td>
    </tr>
  </tbody>
</table>
```

```js
// first, get the expected number of rows from the element
cy.get('[data-cy=rowsN]')
  .invoke('text')
  .then(parseInt)
  .then((n) => {
    expect(n, 'rows N').to.be.gt(0)
    // now let's get the number of rows in the table
    // it should be equal to the N
    cy.get('table tr').should('have.length', n)
  })
```

<!-- fiddle-end -->

## See also

- [Number of elements](./number-of-elements.md)
