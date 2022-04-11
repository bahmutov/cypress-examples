# Check multiplication

Users are often confused how to get values from the page and use them in Cypress tests. Remember: Cypress commands [are queued up](https://on.cypress.io/introduction-to-cypress#Commands-Are-Asynchronous) and the commands yield the value from the page into the next command. The commands _never_ return the value directly. You must use `cy.then` or other commands to work with the values extracted from the page or from other commands.

```js
// THIS IS INCORRECT, WILL NOT WORK 🔥
const n = cy.get('#counter').invoke('text').then(parseInt)
// The correct way ✅
cy.get('#counter')
  .invoke('text')
  .then(parseInt)
  .then((n) => {
    // use the value "n" to write more commands or assertions
  })
```

For example, let's confirm that our calculator is showing the correct multiplication.

<!-- fiddle Multiplication -->

```html
<div id="calculator">
  <span id="op1">23</span> * <span id="op2">66</span> =
  <span id="result">1518</span>
</div>
```

```js
// get each operand from the page
cy.get('#op1')
  // call jQuery method "text()"
  // to get the text of the HTML element
  .invoke('text')
  .then(parseInt)
  .then((op1) => {
    cy.get('#op2')
      .invoke('text')
      .then(parseInt)
      .then((op2) => {
        // get the result shown on the page
        cy.get('#result')
          .invoke('text')
          // convert it to an integer
          .then(parseInt)
          // because op1 and op2 are in the closure scope
          // we can immediately use them to create an assertion
          .should('equal', op1 * op2)
      })
  })
```

The above chain of nested commands to get the operands creates a "Pyramid of Doom" code. We can avoid the pyramid by storing the intermediate values as aliases, and then using "function () { ... }" syntax to get the aliased values using the test context object.

```js
// get each operand separately and store under an alias
cy.get('#op1').invoke('text').then(parseInt).as('op1')
cy.get('#op2')
  .invoke('text')
  .then(parseInt)
  .as('op2')

  // important: use the "function () { ... }"
  // callback syntax to be able to use "this.op1" and "this.op2"
  .then(function () {
    // get the result shown on the page
    cy.get('#result')
      .invoke('text')
      .then(parseInt)
      // previously created aliases are available
      // under "this.<alias>" property
      .should('equal', this.op1 * this.op2)
  })
```

<!-- fiddle-end -->
