# Table cell index

<!-- fiddle Confirm the cell index -->

```html
<table>
  <thead>
    <tr>
      <th>Firstname</th>
      <th>Lastname</th>
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

Invoke the jQuery `.index()` method to confirm the "Age" column is 3rd in this table.

```js
cy.contains('th', 'Age').invoke('index').should('equal', 2)
```

<!-- fiddle-end -->
