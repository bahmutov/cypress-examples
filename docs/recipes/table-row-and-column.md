# Get Table Cell Using Row and Column Indices

## Chain queries

<!-- fiddle Get the cell element using row and column -->

```css
table td {
  border: 1px solid gray;
  padding: 5px;
}
```

```html hide
<table>
  <thead>
    <tr>
      <td>ID</td>
      <td>Title</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>crispy</td>
      <td>aaa</td>
    </tr>
    <tr>
      <td>medium</td>
      <td>b</td>
    </tr>
  </tbody>
</table>
```

Let's get the cell in the row 2 and column 2 (index starts with 1)

```js
cy.get('table tbody')
  .find('tr')
  // index starts with 0
  .eq(1)
  .find('td')
  .eq(1)
  .should('have.text', 'b')
```

Let's confirm the very first cell.

```js
cy.get('table tbody')
  .find('tr')
  // index starts with 0
  .eq(0)
  .find('td')
  .eq(0)
  .should('have.text', 'crispy')
```

<!-- fiddle-end -->

## Custom query

Let's create a custom query command to access the table's cell using the row and column indices.

<!-- fiddle Get the cell using a custom query -->

```css
table td {
  border: 1px solid gray;
  padding: 5px;
}
```

```html hide
<table>
  <thead>
    <tr>
      <td>ID</td>
      <td>Title</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>crispy</td>
      <td>aaa</td>
    </tr>
    <tr>
      <td>medium</td>
      <td>b</td>
    </tr>
  </tbody>
</table>
```

```js
Cypress.Commands.addQuery('cell', (row, column) => {
  return ($table) => {
    // use jQuery methods to find the row
    // and then access the cell
    // jQuery .find and .eq methods are very close to the Cypress commands
    return $table.find('tbody tr').eq(row).find('td').eq(column)
  }
})
cy.get('table').cell(1, 0).should('have.text', 'medium')
```

<!-- fiddle-end -->
