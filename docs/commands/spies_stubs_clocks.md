# Spies, Stubs & Clocks

Examples of using stubs, spies, and controlling clock time - for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [cy.spy()](https://on.cypress.io/spy)

To wrap a method in a spy, use the `cy.spy()` command.

<!-- fiddle cy.spy() - wrap a method in a spy -->

```js
const obj = {
  foo() {},
}

const spy = cy.spy(obj, 'foo').as('anyArgs')

obj.foo()

expect(spy).to.be.called
```

<!-- fiddle-end -->

<!-- fiddle cy.spy() retries until assertions pass -->

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

`cy.spy` and `cy.stub` match call arguments using [Sinon matchers](https://sinonjs.org/releases/latest/matchers/).

<!-- fiddle cy.spy and cy.stub match call arguments using Sinon matchers -->

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

## [cy.stub()](https://on.cypress.io/stub)

To create a stub and/or replace a function with a stub, use the `cy.stub()` command.

<!-- fiddle cy.stub -->

```js
let obj = {
  foo() {},
}

const stub = cy.stub(obj, 'foo').as('foo')

obj.foo('foo', 'bar')

expect(stub).to.be.called
```

<!-- fiddle-end -->

<!-- fiddle cy.stub() - create a stub and/or replace a function with stub -->

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

<!-- fiddle cy.stub() matches depending on arguments -->

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
