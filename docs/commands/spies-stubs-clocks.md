# Spies, Stubs & Clocks

Examples of using stubs, spies, and controlling clock time - for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [cy.spy()](https://on.cypress.io/spy)

To wrap a method in a spy, use the `cy.spy()` command.

<!-- fiddle cy.spy() / wrap a method in a spy -->

```js
const obj = {
  foo() {},
}

const spy = cy.spy(obj, 'foo').as('anyArgs')

obj.foo()

// assert against the spy directly
expect(spy).to.be.called
// or get the spy via its reference
cy.get('@anyArgs').should('have.been.called')
```

<!-- fiddle-end -->

### Spy retries

<!-- fiddle cy.spy() / retries until assertions pass -->

`cy.spy()` retries until the assertions that follow it pass.

```js
const obj2 = {
  foo() {},
}

cy.spy(obj2, 'foo').as('foo')

setTimeout(() => {
  obj2.foo()
}, 500)

setTimeout(() => {
  obj2.foo()
}, 2500)

cy.get('@foo').should('have.been.calledTwice')
```

<!-- fiddle-end -->

### Matchers

`cy.spy` and `cy.stub` match call arguments using [Sinon matchers](https://sinonjs.org/releases/latest/matchers/).

<!-- fiddle cy.spy and cy.stub / match call arguments using Sinon matchers -->

```js
// see all possible matchers at
// https://sinonjs.org/releases/latest/matchers/
const calculator = {
  /**
   * returns the sum of two arguments
   * @param a {number}
   * @param b {number}
   */
  add(a, b) {
    return a + b
  },
}

const spy = cy.spy(calculator, 'add').as('add')

expect(calculator.add(2, 3)).to.equal(5)

// if we want to assert the exact values used during the call
expect(spy).to.be.calledWith(2, 3)

// let's confirm "add" method was called with two numbers
expect(spy).to.be.calledWith(
  Cypress.sinon.match.number,
  Cypress.sinon.match.number,
)

// alternatively, provide the value to match
expect(spy).to.be.calledWith(
  Cypress.sinon.match(2),
  Cypress.sinon.match(3),
)

// match any value
expect(spy).to.be.calledWith(Cypress.sinon.match.any, 3)

// match any value from a list
expect(spy).to.be.calledWith(Cypress.sinon.match.in([1, 2, 3]), 3)

/**
 * Returns true if the given number is event
 * @param {number} x
 */
const isEven = (x) => x % 2 === 0

// expect the value to pass a custom predicate function
// the second argument to "sinon.match(predicate, message)" is
// shown if the predicate does not pass and assertion fails
expect(spy).to.be.calledWith(Cypress.sinon.match(isEven, 'isEven'), 3)

/**
 * Returns a function that checks if a given number is larger than the limit
 * @param {number} limit
 * @returns {(x: number) => boolean}
 */
const isGreaterThan = (limit) => (x) => x > limit

/**
 * Returns a function that checks if a given number is less than the limit
 * @param {number} limit
 * @returns {(x: number) => boolean}
 */
const isLessThan = (limit) => (x) => x < limit

// you can combine several matchers using "and", "or"
expect(spy).to.be.calledWith(
  Cypress.sinon.match.number,
  Cypress.sinon
    .match(isGreaterThan(2), '> 2')
    .and(Cypress.sinon.match(isLessThan(4), '< 4')),
)

expect(spy).to.be.calledWith(
  Cypress.sinon.match.number,
  Cypress.sinon
    .match(isGreaterThan(200), '> 200')
    .or(Cypress.sinon.match(3)),
)

// matchers can be used from BDD assertions
cy.get('@add').should(
  'have.been.calledWith',
  Cypress.sinon.match.number,
  Cypress.sinon.match(3),
)

// you can alias matchers for shorter test code
const { match: M } = Cypress.sinon

cy.get('@add').should('have.been.calledWith', M.number, M(3))
```

<!-- fiddle-end -->

### Call count

A spy is just an object. You can access and assert its individual properties using [.its](https://on.cypress.io/its) command.

<!-- fiddle cy.spy and cy.stub / call count -->

```html
<button id="greet">Log greeting</button>
<script>
  // note to make things more interesting
  // we will log the message asynchronously
  document.getElementById('greet').addEventListener('click', () => {
    setTimeout(() => {
      console.log('Happy Testing!')
    }, 200)
  })
</script>
```

```js
// first, let's spy on the console.log method
cy.window()
  .its('console')
  .then((console) => cy.spy(console, 'log').as('log'))
// second, act on the UI
cy.get('#greet').click().click().click()
// third assert the spy was called three times
cy.get('@log').its('callCount').should('eq', 3)
```

<!-- fiddle-end -->

## [cy.stub()](https://on.cypress.io/stub)

To create a stub and/or replace a function with a stub, use the `cy.stub()` command.

<!-- fiddle cy.stub() / replace method -->

```js
let obj = {
  foo() {},
}

const stub = cy.stub(obj, 'foo').as('foo')

obj.foo('foo', 'bar')

// access the stub directly
expect(stub).to.be.called
// access the stub using alias
cy.get('@foo').should('have.been.called')
```

<!-- fiddle-end -->

<!-- fiddle cy.stub() / replace a method with a stub -->

```js
const obj = {
  /**
   * prints both arguments to the console
   * @param a {string}
   * @param b {string}
   */
  foo(a, b) {
    // eslint-disable-next-line no-console
    console.log('a', a, 'b', b)
  },
}

const stub = cy.stub(obj, 'foo').as('foo')

obj.foo('foo', 'bar')

expect(stub).to.be.called
```

<!-- fiddle-end -->

<!-- fiddle cy.stub() / matches depending on arguments -->

```js
// see all possible matchers at
// https://sinonjs.org/releases/latest/matchers/
const greeter = {
  /**
   * Greets a person
   * @param {string} name
   */
  greet(name) {
    return `Hello, ${name}!`
  },
}

const stub = cy.stub(greeter, 'greet')
stub.callThrough() // if you want non-matched calls to call the real method
stub.withArgs(Cypress.sinon.match.string).returns('Hi')
stub
  .withArgs(Cypress.sinon.match.number)
  .throws(new Error('Invalid name'))

expect(greeter.greet('World')).to.equal('Hi')
// @ts-ignore
expect(() => greeter.greet(42)).to.throw('Invalid name')
expect(greeter.greet).to.have.been.calledTwice

// non-matched calls goes the actual method
// @ts-ignore
expect(greeter.greet()).to.equal('Hello, undefined!')
```

<!-- fiddle-end -->

### Stub application code

If you want to stub a method deep inside the application's code, access it using App Actions by passing the object reference via `window` object.

<!-- fiddle cy.stub() / method is inside application -->

```html
<button id="alerter">Alert me</button>
<script>
  const actions = {
    alertTheUser() {
      alert('📣 you clicked the button')
    },
  }
  document
    .getElementById('alerter')
    // 🛑 it is important to NOT pass the method but call the method on click
    // THIS WILL NOT WORK
    // .addEventListener('click', actions.alertTheUser)
    //
    // ✅ This will work.
    // If the "alertsTheUser" method is replaced in the "actions" object
    // then the stub is called during test
    .addEventListener('click', function () {
      actions.alertTheUser()
    })

  // if we are running inside Cypress test
  // expose the object with methods to be stubbed from tests
  if (window.Cypress) {
    console.log('running inside Cypress')
    window.actions = actions
  } else {
    console.log('not running inside Cypress')
  }
</script>
```

```js
cy.window()
  .its('actions')
  .then((actions) => {
    cy.stub(actions, 'alertTheUser').as('alerted')
  })
cy.get('#alerter').click()
cy.get('@alerted').should('have.been.called')
```

<!-- fiddle-end -->

## [cy.clock()](https://on.cypress.io/clock)

To control time in the browser, use the `cy.clock()` command.

<!-- fiddle clock -->

```html
<div id="clock-div">
  Click for current time!
</div>
<script>
  $('#clock-div').on('click', function (e) {
    let $div = $(e.currentTarget)
    // seconds from the unix epoch
    $div.text(new Date().getTime() / 1000)
  })
</script>
```

```js
// create the date in UTC so its always the same
// no matter what local timezone the browser is running in
const now = new Date(Date.UTC(2017, 2, 14)).getTime()

cy.clock(now)
cy.get('#clock-div').click().should('have.text', '1489449600')
```

<!-- fiddle-end -->

## [cy.tick()](https://on.cypress.io/tick)

To move time in the browser, use the `cy.tick()` command.

<!-- fiddle tick -->

```html
<div id="tick-div">
  Click for current time!
</div>
<script>
  $('#tick-div').on('click', function (e) {
    let $div = $(e.currentTarget)
    // seconds from the unix epoch
    $div.text(new Date().getTime() / 1000)
  })
</script>
```

```js
// create the date in UTC so its always the same
// no matter what local timezone the browser is running in
const now = new Date(Date.UTC(2017, 2, 14)).getTime()

cy.clock(now)
cy.get('#tick-div').click().should('have.text', '1489449600')
cy.tick(10000) // 10 seconds passed
cy.get('#tick-div').click().should('have.text', '1489449610')
```

<!-- fiddle-end -->
