# Find Row

<!-- fiddle Find table row with an index -->

Let's find the table row with text "Charles" and print its index.

```html hide
<table class="table table-bordered people">
  <thead>
    <tr>
      <th>User</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cheryl</td>
    </tr>
    <tr>
      <td>Charles</td>
    </tr>
    <tr>
      <td>Darryl</td>
    </tr>
  </tbody>
</table>
```

```js
cy.contains('tr', 'Charles')
  .invoke('index')
  .then((row) => cy.log(`Found text in row ${row}`))
```

<!-- fiddle-end -->
