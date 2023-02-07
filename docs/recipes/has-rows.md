# Table rows having cells with the given attribute

## Plain Cypress commands

<!-- fiddle Plain Cypress commands -->

Imagine we see the following table, and need to find rows that have 2nd column cells inside with the attribute "data-testid=checked". We can use the jQuery `:has` selector.

```html
<table>
  <tr>
    <td>50</td>
    <td data-testid="unchecked"></td>
  </tr>

  <tr>
    <td>23</td>
    <td data-testid="checked"></td>
  </tr>

  <tr>
    <td>45</td>
    <td data-testid="checked"></td>
  </tr>
</table>
```

Finds table rows with _any_ cell with the attribute "data-testid=checked":

```js
cy.get('table tr:has(td[data-testid=checked])').should(
  'have.length',
  2,
)
```

Find the table rows with cells in the 2nd column only having possible attribute "data-testid=checked":

```js
cy.get('table tr:has(td:nth-child(2)[data-testid=checked])')
  .should('have.length', 2)
  // grab the values from the first column
  .find('td:nth-child(1)')
  // extract text from each element
  .then(($el) => Cypress._.map($el, 'innerText'))
  // convert strings to numbers
  .then((strings) => strings.map(Number))
  .should('deep.equal', [23, 45])
```

<!-- fiddle-end -->

## Cypress-map queries

**Tip:** the above data processing steps could be written simpler using the [cypress-map](https://github.com/bahmutov/cypress-map) plugin:

<!-- fiddle Cypress-map queries -->

```html
<table>
  <tr>
    <td>50</td>
    <td data-testid="unchecked"></td>
  </tr>

  <tr>
    <td>23</td>
    <td></td>
  </tr>

  <tr>
    <td>45</td>
    <td></td>
  </tr>
</table>
<script>
  // the application updates the cells after a delay
  setTimeout(() => {
    document
      .querySelector('table tr:nth-child(2) td:nth-child(2)')
      .setAttribute('data-testid', 'checked')
  }, 1000)
  setTimeout(() => {
    document
      .querySelector('table tr:nth-child(3) td:nth-child(2)')
      .setAttribute('data-testid', 'checked')
  }, 2000)
</script>
```

```js
cy.get('table tr:has(td:nth-child(2)[data-testid=checked])')
  // grab the values from the first column
  .find('td:nth-child(1)')
  // extract text from each element
  .map('innerText')
  // convert strings to numbers
  .map(Number)
  .should('deep.equal', [23, 45])
```

**Bonus:** the entire chain of queries will retry and work even if the cells and rows are updated asynchronously.

<!-- fiddle-end -->
