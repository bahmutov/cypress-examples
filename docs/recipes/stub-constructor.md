# Stub The Constructor Function

<!-- fiddle Stub the constructor function -->

```js app
// application:
// the constructor function
// we will "share" with the test via a dummy "win" object
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.getGreeting = function () {
  return `Hello from ${this.name}`
}

const win = {
  Person,
}

// The application will call the constructor function
// after some delay
setTimeout(() => {
  const kid = new win.Person('Joe', 10)
  window.alert(kid.getGreeting())
}, 1000)
```

Prepare for the app using `alert` function

```js
cy.window().then((win) => {
  cy.stub(win, 'alert').as('alert')
})
```

Let's replace the real `Person` constructor function with our mock.

```js
cy.stub(win, 'Person')
  .callsFake(function (name, age) {
    // confirm the constructor was called with the "new" keyword
    expect(this, 'called used new').to.be.an.instanceof(
      win.Person,
    )
    // returns a fake object
    return {
      name: 'Mary',
      age: 8,
      // set a fake instance method
      getGreeting: cy
        .stub()
        .returns('Mary says hi')
        .as('getGreeting'),
    }
  })
  .as('Person')
```

Confirm the constructor function was called

```js
cy.get('@Person')
  .should(
    'have.been.calledOnceWithExactly',
    Cypress.sinon.match.string,
    10,
  )
  .its('firstCall.thisValue')
  .should('be.an.instanceof', win.Person)
```

Let's confirm the application called `kid.getGreeting` and then called `alert` function

```js
cy.get('@getGreeting').should('have.been.calledOnce')
cy.get('@alert').should(
  'have.been.calledOnceWith',
  'Mary says hi',
)
```

<!-- fiddle-end -->
