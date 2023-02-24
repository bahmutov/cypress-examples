# First table column

<!-- fiddle First column of the second table -->

```html hide
<table id="people" class="table table-bordered">
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Joe</td>
      <td>42</td>
    </tr>
  </tbody>
</table>
<table id="fruit" class="table table-bordered">
  <thead>
    <tr>
      <th>Name</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Apple</td>
      <td>$1.49</td>
    </tr>
    <tr>
      <td>Pear</td>
      <td>$2.99</td>
    </tr>
  </tbody>
</table>
```

By default, `cy.get` starts its search from the root of the element.

```js
cy.get('table')
  .should('have.length', 2)
  .eq(1)
  .should('have.id', 'fruit')
  .get('tr td:nth-child(1)')
  // picks the "TR" elements from both tables
  .should('have.length', 3)
```

We can use `cy.within` to force `cy.get` to pick elements only from its parent subject.

```js
cy.get('table')
  .should('have.length', 2)
  .eq(1)
  .should('have.id', 'fruit')
  .within(() => {
    cy.get('tr td:nth-child(1)').should('have.length', 2)
  })
```

<!-- fiddle-end -->
