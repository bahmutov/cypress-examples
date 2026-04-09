# Resolved Value

Let's spy on an application method which returns a Promise object. Can we get the resolved value to use in our tests? We can - by using [cy.wrap](https://on.cypress.io/wrap) to wait for the promise to be resolved inside a Cypress chain step.

<!-- fiddle Spy on resolved value -->

```html
<button id="generate">Click</button>
<div id="result"></div>
```

```js app
window.generateRandomNumber = () => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(Math.round(Math.random() * 10)),
      1000,
    )
  })
}
document
  .getElementById('generate')
  .addEventListener('click', () => {
    window.generateRandomNumber().then((n) => {
      document.getElementById('result').innerText = n
    })
  })
```

Let's confirm that the generated number is shown by the `#result` element after some time.

```js
cy.get('#result').should('have.text', '')
cy.window().then((win) => {
  cy.spy(win, 'generateRandomNumber').as('generateRandomNumber')
})
cy.get('#generate').click()
cy.get('@generateRandomNumber')
  .should('have.been.calledOnce')
  // get the returned value, which should be a promise
  .its('firstCall')
  .its('returnValue')
  .should('be.an.instanceOf', Promise)
  // use cy.wrap command to "wait" until the promise is resolved
  .then(cy.wrap)
  // with a number
  .should('be.a', 'number')
  .then((n) => {
    // and use the number to check the page
    cy.get('#result').should('have.text', String(n))
  })
```

<!-- fiddle-end -->
