# Resolved Value

Let's spy on an application method which returns a Promise object. Can we get the resolved value to use in our tests? We can - by using [cy.wrap](https://on.cypress.io/wrap) to wait for the promise to be resolved inside a Cypress chain step.

📺 Watch this recipe explained in [Spying On App Methods And Inspecting The Resolved Values](https://youtu.be/1eccWss3Eu4).

<!-- fiddle Spy on resolved value -->

```html
<button id="generate">Click</button>
<div id="result"></div>
```

```js app
window.generateRandomNumber = (x) => {
  if (x !== 42) {
    throw new Error('Wrong argument 1')
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      const answer = Math.round(Math.random() * 10)
      console.log('resolving with the answer', answer)
      resolve(answer)
    }, 1000)
  })
}
document
  .getElementById('generate')
  .addEventListener('click', () => {
    window.generateRandomNumber(42).then((n) => {
      document.getElementById('result').innerText = n
    })
  })
```

Let's confirm that the generated number is shown by the `#result` element after some time. Prepare to spy on the method.

```js hide
cy.get('#result').should('have.text', '')
cy.window().then((win) => {
  cy.spy(win, 'generateRandomNumber').as('generateRandomNumber')
})
```

Click the button to make the app call the method.

```js hide
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

Alternatively, you can call the original method from inside `callFake` stub. This is especially useful for inspecting the input arguments and the resolved value.

```js hide
// remove the previous spy
cy.get('@generateRandomNumber').invoke('restore')
// and replace it with a stub that calls the original method
// but allows us to inspect the input arguments
// and the resolved value
cy.window().then((win) => {
  cy.stub(win, 'generateRandomNumber')
    .as('inspectRandomNumber')
    .callsFake(async function () {
      console.log('generateRandomNumber arguments', arguments)
      // get the real result by calling the original wrapped method
      const result =
        await win.generateRandomNumber.wrappedMethod.apply(
          win,
          arguments,
        )
      console.log('generateRandomNumber result', result)
      return result
    })
})
// click on the button
cy.get('#generate').click()
// and confirm the call was made
cy.get('@inspectRandomNumber')
  .should('have.been.calledOnceWith', 42)
  // and confirm the result is shown on the page
  .its('firstCall.returnValue')
  .then(cy.wrap)
  .should('be.a', 'number')
  .then((n) => {
    cy.get('#result').should('have.text', String(n))
  })
```

<!-- fiddle-end -->
