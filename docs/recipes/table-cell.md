# Find row by the exact table cell text

<!-- fiddle Table cell -->

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
