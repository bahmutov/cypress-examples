# Spy called with an object

Imagine you are spying on a call using [cy.spy](https://on.cypress.io/spy) command. How do you check if the caller passed the right arguments? If you already read the examples from my [Spies, Stubs & Clocks](../commands/spies-stubs-clocks.md) page, then keep reading.

📺 watch this recipe explained in the video [Check If A Spy Was Called With The Right Object](https://youtu.be/Re4bNOBqes8).

## Primitive types

If the method is called with primitive arguments like strings, then it is simple to check.

<!-- fiddle Primitive types -->

```html
<script>
  setTimeout(() => {
    console.log('Hello', 'world')
  }, 10)
</script>
```

```js
cy.window()
  .its('console')
  .then((console) => {
    cy.spy(console, 'log').as('log')
  })
cy.get('@log').should('be.calledWith', 'Hello', 'world')
```

<!-- fiddle-end -->

## Exact object

If the method is called with an object, you can do two things: either yield it to the next assertion `deep.equal` or use the Sinon's built-in matching assertion.

<!-- fiddle Exact object -->

```html
<script>
  setTimeout(() => {
    console.log('User %o', { id: 123, name: 'Joe' })
  }, 10)
</script>
```

```js
cy.window()
  .its('console')
  .then((console) => {
    cy.spy(console, 'log').as('log')
  })
// yield the object to the next assertion
cy.get('@log')
  .should('be.calledWith', 'User %o', Cypress.sinon.match.object)
  .its('firstCall.args.1')
  .should('deep.equal', { id: 123, name: 'Joe' })
// use Sinon's built-in object by value match
cy.get('@log').should('be.calledWith', 'User %o', {
  id: 123,
  name: 'Joe',
})
```

<!-- fiddle-end -->

## Partial object

If we know some properties of the object, we can use `deep.include` assertion on the yielded object.

<!-- fiddle Partial object -->

```html
<script>
  setTimeout(() => {
    console.log('User %o', { id: 123, name: 'Joe' })
  }, 10)
</script>
```

```js
cy.window()
  .its('console')
  .then((console) => {
    cy.spy(console, 'log').as('log')
  })
cy.get('@log')
  .should('be.calledWith', 'User %o', Cypress.sinon.match.object)
  .its('firstCall.args.1')
  // imagine we do not know all object fields
  .should('deep.include', { name: 'Joe' })
```

Alternatively, if we know all the expected field names, we can use Sinon matchers as placeholders:

```js
cy.get('@log').should('be.calledWith', 'User %o', {
  id: Cypress.sinon.match.number,
  name: 'Joe',
})
```

<!-- fiddle-end -->

**Tip:** try using [cy-spok](https://github.com/bahmutov/cy-spok) plugin for such assertions.
