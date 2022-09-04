# Find table cell by the column heading

## Find a specific cell

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

## Find all rows with certain cell values

Imagine we have a table with multiple rows and want to find all rows by the certain cell values. We will use the column headings.

You can find this recipe shown in the video [Find Table Rows With The Given Cells By The Column Titles](https://youtu.be/PI5EOTNwKuQ).

<!-- fiddle Find all rows with certain cell values -->

```html hide
<table>
  <thead>
    <tr>
      <th>Team</th>
      <th>Location</th>
      <th>Result</th>
      <th>Game ID</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Marlins</td>
      <td>away</td>
      <td>loss</td>
      <td>G1</td>
    </tr>
    <tr>
      <td>Marlins</td>
      <td>home</td>
      <td>win</td>
      <td>G2</td>
    </tr>
    <tr>
      <td>Marlins</td>
      <td>home</td>
      <td>win</td>
      <td>G3</td>
    </tr>
    <tr>
      <td>Sharks</td>
      <td>away</td>
      <td>loss</td>
      <td>G4</td>
    </tr>
    <tr>
      <td>Sharks</td>
      <td>away</td>
      <td>win</td>
      <td>G5</td>
    </tr>
  </tbody>
</table>
```

```css hide
table thead tr {
  margin: 5px;
}
table td {
  outline: 1px solid black;
  padding: 10px 5px;
}
```

First, we need to find the column indices for each search property "Location", "Result", and any others. Before we do this, let's review CSS + jQuery selectors `:has`, `:nth-child`, and `:contains`. Here are some examples:

- find all rows where the first column has "Sharks" text. The column index starts at 1

```js skip
cy.get(
  'table tbody tr:has(td:nth-child(1):contains("Sharks"))',
).should('have.length', 2)
```

- find all rows where Sharks won. The simplest way is to grab all rows, filter to just the Sharks, then filter the result to where they won

```js skip
cy.get('table tbody tr')
  .filter(':has(td:nth-child(1):contains("Sharks"))')
  .filter(':has(td:nth-child(3):contains("win"))')
  .should('have.length', 1)
  .and('include.text', 'G5')
```

We can do similar filter using jQuery methods

```js skip
cy.get('table tbody tr')
  .then(($tr) => {
    return $tr
      .filter(':has(td:nth-child(1):contains("Sharks"))')
      .filter(':has(td:nth-child(3):contains("win"))')
  })
  // Cypress automatically yields the returned jQuery
  // to the next command or assertion
  .should('have.length', 1)
  .and('include.text', 'G5')
```

Let's make a search object that tries to find all teams that won their away games

```js
const search = {
  Location: 'away',
  Result: 'win',
}
```

So we need to find the indices of columns from the headings and then filter the rows by the text contents at that specific index. We first, find the column indices, and use them to filter the rows.

```js
cy.get('table thead').then(($thead) => {
  const indices = Cypress._.mapKeys(search, (value, heading) => {
    // we are only interested in the heading
    // immediately make the indices start at 1
    return $thead.find(`th:contains("${heading}")`).index() + 1
  })
  // our search was mapped to the column indices
  // let's print it to the Command Log
  cy.log(JSON.stringify(indices))

  cy.get('table tbody tr')
    .then(($tr) => {
      // filter the rows by each index + text value pair
      Cypress._.mapKeys(indices, (textValue, index) => {
        $tr = $tr.filter(
          `:has(td:nth-child(${index}):contains("${textValue}"))`,
        )
      })
      return $tr
    })
    // only Sharks have won their away game this season
    .should('have.length', 1)
    .and('include.text', 'G5')
})
```

<!-- fiddle-end -->
