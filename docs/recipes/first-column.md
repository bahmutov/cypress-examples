# First table column

## Rows with TD elements

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

## Rows with TH and TD elements

<!-- fiddle Second column skipping the TH cell -->

Sometimes the table row starts with `TH` element followed by `TD` elements, breaking the `td:nth-child(1)` selector.

```html hide
<table id="fruit" class="table table-bordered">
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>Apple</td>
      <td>$1.49</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Pear</td>
      <td>$2.99</td>
    </tr>
  </tbody>
</table>
```

We can solve this problem by coding the selection logic. Given the `tbody` element, find each `TR` element, and inside every row, grab the first `TD` element using the combination of jQuery `$.map`, `$.map`, and DOM `querySelector` commands.

```js
cy.get('table')
  .should('have.id', 'fruit')
  .find('tbody')
  .then(($tbody) =>
    $tbody.find('tr').map((k, tr) => tr.querySelector('td')),
  )
  .should('have.length', 2)
```

The same logic can be implemented using purely [cypress-map](https://github.com/bahmutov/cypress-map) queries

```js
cy.log('**using cypress-map**')
cy.get('table')
  .should('have.id', 'fruit')
  .find('tbody')
  .invoke('find', 'tr')
  // cy.map and cy.mapInvoke queries
  // come from the cypress-map plugin
  .mapInvoke('querySelector', 'td')
  .map('innerText')
  .should('deep.equal', ['Apple', 'Pear'])
```

<!-- fiddle-end -->
