# Spy On Constructor Function

<!-- fiddle Spy on constructor function -->

```js
// application:
// the constructor function
// we will "share" with the test via a dummy "win" object
function Person(name, age) {
  this.name = name
  this.age = age
}

const win = {
  Person,
}
```

Let's spy on the function `Person` by using [cy.spy](https://on.cypress.io/spy) command. In regular tests, this could be something like

```js skip
cy.window().then((win) => {
  cy.spy(win, 'Error').as('Error')
})
```

In our example, let's spy on the `Person` constructor which we get through the object `win`.

```js
cy.spy(win, 'Person').as('Person')
```

Application will call the constructor after some time period

```js
// "application" code calls the "Person" constructor
// after some delay
setTimeout(() => {
  const kid = new win.Person('Joe', 10)
  // experiment with a mistake of calling the constructor
  // function without using the "new" keyword
  // const kid = win.Person('Joe', 10)
  // save the reference to the person instance
  win.kid = kid
}, 1000)
```

Confirm the `Person` function was called with expected arguments: the string "Joe" and an age number.

```js
cy.get('@Person').should(
  'have.been.calledWith',
  'Joe',
  Cypress.sinon.match.number,
)
```

Confirm the application code used `new Person` syntax and not accidentally skipped the `new` keyword.

```js
cy.get('@Person')
  .its('firstCall.thisValue', { timeout: 0 })
  .should('be.instanceof', win.Person)
```

Check the created object instance

```js
cy.wrap(win)
  .should('have.property', 'kid')
  // confirm the instance has its properties set
  .should('have.keys', ['name', 'age'])
  .and('deep.equal', {
    name: 'Joe',
    age: 10,
  })
```

<!-- fiddle-end -->
