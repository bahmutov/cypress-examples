# Find row by the exact table cell text

## Using text

<!-- fiddle Find row using cell text -->

Imagine that in this table we want to find the row with the second cell having the exact text "b". You can watch a video explaining this recipe at [Find row by the exact table cell text](https://youtu.be/ag8dClTP-kw).

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
    <tr data-k="1">
      <td>1</td>
      <td>bbb</td>
    </tr>
    <tr data-k="2">
      <td>2</td>
      <td>b</td>
    </tr>
  </tbody>
</table>
```

We want to pick a table row that has the second cell with exact text "b" (while avoiding matching cells like "bbb"). We can use the [cy.contains](https://on.cypress.io/contains) and [cy.parent](https://on.cypress.io/parent) to find that row. We can also use the [cy.get](https://on.cypress.io/get) + [cy.filter](https://on.cypress.io/filter) combination.

```js
// select the cells in the second column
cy.get('table tbody td:nth-child(2)').should('have.length', 2)
// select that cell in the second column with the exact test "b"
// using the cy.contains command
cy.contains('table tbody td:nth-child(2)', /^b$/)
  .parent('tr')
  .should('have.attr', 'data-k', '2')
// Alternative: use a custom cy.filter callback
cy.get('table tbody tr')
  .filter((k, tr) => {
    return tr.children[1].innerText === 'b'
  })
  .should('have.attr', 'data-k', '2')
```

<!-- fiddle-end -->

## Using a variable

Imagine we have a variable with the exact text we want to find in one of the cells, and then we want to grab the table row. But our text is in a variable `name`. How do we find a table cell _with that exact_ text?

Find this recipe explained in the video 📺 [Find The Table Row Using The Exact Cell Text](https://youtu.be/_7A7ESfPPDM).

<!-- fiddle Find row using cell text from a variable -->

```css hide
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
      <td>Product name</td>
    </tr>
  </thead>
  <tbody>
    <tr data-k="1">
      <td>1</td>
      <td>apple cider</td>
    </tr>
    <tr data-k="2">
      <td>2</td>
      <td>apple sauce</td>
    </tr>
    <tr data-k="3">
      <td>3</td>
      <td>crab apple</td>
    </tr>
    <tr data-k="4">
      <td>4</td>
      <td>apple</td>
    </tr>
  </tbody>
</table>
```

```js
// the exact cell text to find
const name = 'apple'
// find the cell with the exact text by constructing
// a regular expression from our variable
cy.contains('td', new RegExp('^' + name + '$'))
  .parent('tr')
  .should('have.attr', 'data-k', '4')
  // or get the row's index among its siblings
  // 4th row = index 3 (zero-based)
  .invoke('index')
  .should('equal', 3)
```

<!-- fiddle-end -->
