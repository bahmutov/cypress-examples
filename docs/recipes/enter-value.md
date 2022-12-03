# Enter value into the form

Imagine we have a form that shows the available money balance. The user can enter up to that amount into the input field (for example to transfer some money out of the account). Let's write a test for it.

<!-- fiddle Enter value into the form -->

```css hide
table {
  padding: 1rem;
  margin-bottom: 1rem;
}
table td {
  padding-right: 1rem;
}
table td:nth-child(2) {
  font-weight: bold;
  float: right;
}
```

```html hide
<form>
  <table>
    <tbody>
      <tr>
        <td>Available balance</td>
        <td>$800.00</td>
      </tr>
      <tr>
        <td>Last deposit</td>
        <td>$230.00</td>
      </tr>
      <tr>
        <td>Last withdrawal</td>
        <td>-$100.00</td>
      </tr>
    </tbody>
  </table>
  <input
    type="number"
    id="transfer"
    placeholder="transfer amount"
  />
</form>
```

Our test is less than optimal. We do not know the available balance, thus we need to read it from the table. Since there are no [good test selectors](https://on.cypress.io/best-practices#Selecting-Elements), we will use text and

```js
// find the row that includes the balance text
// and then find a child TD cell with "$"
cy.contains('tr', 'Available balance')
  .contains('td', '$') // yields jQuery object
  .invoke('text') // yields its text
  .invoke('replace', '$', '') // removes "$" character
  .then(parseFloat) // yields a number
  // confirm the balance is reasonable
  .should('be.within', 1, 10_000)
  .then((balance) => {
    // now we can type this balance into the input field
    cy.get('#transfer').type(balance)
  })
```

**Tip:** a much better test would know _exactly_ the balance shown on the page, and would enter it without using `cy.then` callbacks.

```js
cy.contains('tr', 'Available balance').contains('td', '$800')
cy.get('#transfer').clear().type(800)
```

**Tip 2:** if you find using `cy.then` confusing, you might like my plugin [cypress-aliases](https://github.com/bahmutov/cypress-aliases) useful.

<!-- fiddle-end -->
