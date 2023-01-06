# Spy called with an object

Imagine you are spying on a call using [cy.spy](https://on.cypress.io/spy) command. How do you check if the caller passed the right arguments? If you already read the examples from my [Spies, Stubs & Clocks](../commands/spies-stubs-clocks.md) page, then keep reading.

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

If the method is called with an object, you need to confirm the object separately by yielding it after the match.

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
cy.get('@log')
  .should('be.calledWith', 'User %o', Cypress.sinon.match.object)
  .its('firstCall.args.1')
  .should('deep.equal', { id: 123, name: 'Joe' })
```

<!-- fiddle-end -->

## Partial object

If we know some properties of the object, we can use `deep.include` assertion

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

<!-- fiddle-end -->

**Tip:** try using [cy-spok](https://github.com/bahmutov/cy-spok) plugin for such assertions.
