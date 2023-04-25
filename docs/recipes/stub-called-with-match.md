# Stub called with the match

If you are spying or stubbing a method, and it is called with complex arguments, you can confirm the call was made by using your own match predicate. For example, if the calls to `dataLayer.push` method are made with objects with the `event: ...` property, we could find the expected call:

<!-- fiddle dataLayer.push -->

```html
<script>
  window.dataLayer = window.dataLayer || []
  setTimeout(() => {
    window.dataLayer.push({ event: 'load' })
  }, 10)
</script>
<button
  onclick="dataLayer.push({ event: 'click', buttonId:'abc123' })"
>
  Apply
</button>
```

Create a spy or stub before the action.

```js
cy.window()
  .its('dataLayer')
  .then((dataLayer) => {
    cy.stub(dataLayer, 'push').as('push')
  })
```

Interact with the application

```js
cy.contains('button', 'Apply').click()
```

Confirm the stub was called with an object with `event: click` by using an assertion `calledWithMatch`. The assertion retries.

```js
cy.get('@push').should(
  'be.calledWithMatch',
  Cypress.sinon.match((x) => x.event === 'click', 'click event'),
)
```

We can write the same assertion differently, but we need to know the shape of the argument. In our case, we know it has the `event: click` property plus a string `buttonId` property.

```js
cy.get('@push').should('be.calledWith', {
  event: 'click',
  buttonId: Cypress.sinon.match.string,
})
```

If you want to find the event, let's map all calls to their first arguments

```js
cy.get('@push')
  .invoke('getCalls')
  .invoke('map', (c) => c.args[0])
  // find the first matching event object
  .invoke('find', (x) => x.event === 'click')
  // and confirm the event properties
  .should('deep.equal', { event: 'click', buttonId: 'abc123' })
```

<!-- fiddle-end -->
