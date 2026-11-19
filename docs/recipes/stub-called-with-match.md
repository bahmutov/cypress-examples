# Stub called with the match

## Match a string

<!-- fiddle Match a string -->

Imagine the application calling `console.log` after some delay. We want to check the first argument the application passes to the `console.log`.

```html
<script>
  setTimeout(() => {
    console.log('the answer is 42', 'not a joke')
  }, 1000)
</script>
```

```js
cy.window()
  .its('console')
  .then((console) => {
    cy.spy(console, 'log').as('log')
  })
```

If we know the exact argument to the `console.log` call, we can use `calledWith` assertion

```js
// we know the exact method call argument
cy.get('@log').should('have.been.calledWith', 'the answer is 42')
```

**Note:** the method call might have additional arguments, but we only provided the first one.

If we know that the first argument is a string:

```js
// the first argument is a string
cy.get('@log').should(
  'have.been.calledWith',
  Cypress.sinon.match.string,
)
```

If we know that it is a string in specific format, we can use `calledWithMatch` assertion:

```js
// argument matches a regular assertion
cy.get('@log').should(
  'have.been.calledWithMatch',
  /^the answer is \d+$/,
)
```

If we want to provide our own matching logic

```js
// we can pass a predicate function
cy.get('@log').should(
  'have.been.calledWithMatch',
  (x) => typeof x === 'string' && x.endsWith('42'),
)

// this is how you can use a predicate plus show a custom assertion message
cy.get('@log').should(
  'have.been.calledWithMatch',
  Cypress.sinon.match(
    (x) => typeof x === 'string' && x.endsWith('42'), // predicate
    'checking the answer', // assertion message
  ),
)
```

<!-- fiddle-end -->

## Match complex objects

If you are spying or stubbing a method, and it is called with complex arguments, you can confirm the call was made by using your own match predicate. For example, if the calls to `dataLayer.push` method are made with objects with the `event: ...` property, we could find the expected call:

<!-- fiddle Match a complex object argument -->

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

## Matching nested properties

The assertion `calledWithMatch` supports matching nested objects, just specify all properties you are interested in checking.

<!-- fiddle Nested object match -->

```html
<script>
  setTimeout(() => {
    const s = JSON.stringify({
      person: {
        name: {
          first: 'Joe',
          last: 'Smith',
        },
        id: 10001,
      },
      type: '__student',
    })
  }, 1000)
</script>
```

The application above calls `JSON.stringify`, but we don't know every property value. All we know is that the `person.name.last = "Smith"`. We can provide `Cypress.sinon.match` for other properties.

```js
cy.window()
  .its('JSON')
  .then((JSON) => {
    cy.spy(JSON, 'stringify').as('stringify')
  })
// some time later the app will call stringify
cy.get('@stringify').should('have.been.calledWithMatch', {
  person: {
    name: {
      first: Cypress.sinon.match.string,
      last: 'Smith',
    },
    id: Cypress.sinon.match.number,
  },
  // for regular expressions, wrap in Cypress.sinon.match
  type: Cypress.sinon.match(/^__(student|employee)$/),
})
```

<!-- fiddle-end -->
