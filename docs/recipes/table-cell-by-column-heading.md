# Find table cell by the column heading

<!-- fiddle Find the cell by the column heading and row text -->

```html hide
<table>
  <thead>
    <tr>
      <th>Col A</th>
      <th>Col B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Val X</td>
      <td>ValY</td>
    </tr>
    <tr>
      <td>Val A</td>
      <td>Val B</td>
    </tr>
  </tbody>
</table>
```

```js
// let's find the table row with some text (in any cell)
// then in that row find the cell from the "Col B" column
cy.contains('table th', 'Col B')
  // use jQuery index() method to return
  // the index of the found element among its siblings
  .invoke('index')
  .then(cy.log)
  .then((columnIndex) => {
    // find the table row with text "Val A"
    cy.contains('tbody tr', 'Val A')
      // find all table cells in the row
      .find('td')
      // get the table cell using the column index
      .eq(columnIndex)
      // confirm we found the right cell
      .should('have.text', 'Val B')
      // change CSS using jQuery css() method
      .invoke('css', 'color', 'blue')
  })
```

<!-- fiddle-end -->
