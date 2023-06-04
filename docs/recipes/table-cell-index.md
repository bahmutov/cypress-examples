# Table cell index

<!-- fiddle Confirm the cell index -->

📺 Watch this recipe explained in the video [Find Table Column Index](https://youtu.be/QkwYEQmf-VI).

```html
<table class="as-table table table-bordered">
  <thead>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Jill</td>
      <td>Smith</td>
      <td>50</td>
    </tr>
  </tbody>
</table>
```

Invoke the jQuery `.index()` method to confirm the "Age" column is 3rd in this table. Index starts at zero.

```js
cy.contains('th', 'Age').invoke('index').should('equal', 2)
```

Find a cell by text and confirm its index.

```js
cy.contains('tbody td', 'Jill')
  .invoke('index')
  .should('equal', 0)
```

<!-- fiddle-end -->

## See also

- [Find table cell by the column heading](./table-cell-by-column-heading.md)
