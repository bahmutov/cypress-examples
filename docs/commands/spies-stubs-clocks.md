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

### Checking the call arguments

You can verify the spy or stub was called with expected arguments.

<!-- fiddle cy.spy and cy.stub / checking arguments -->

```js
const person = {
  setName(first, last) {
    this.name = first + ' ' + last
  },
}

cy.spy(person, 'setName').as('setName')
// simulate the application calling the method
// after some random delay
setTimeout(() => {
  person.setName('Joe', 'Smith')
}, Math.random() * 2000)
// check if the spy was called
cy.get('@setName').should('have.been.called')
// check if the spy was called exactly once
cy.get('@setName').should('have.been.calledOnce')
// check if the spy was called with first argument 'Joe'
// the call might have had more arguments, but we do not check them
cy.get('@setName').should('have.been.calledOnceWith', 'Joe')
// check if the spy was called with these arguments
cy.get('@setName').should(
  'have.been.calledOnceWith',
  'Joe',
  'Smith',
)
// check if the spy was called once with a string and "Smith"
cy.get('@setName').should(
  'have.been.calledOnceWith',
  Cypress.sinon.match.string,
  'Smith',
)
// verify the property was set
cy.wrap(person).should('have.property', 'name', 'Joe Smith')
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
expect(spy).to.be.calledWith(
  Cypress.sinon.match.in([1, 2, 3]),
  3,
)

/**
 * Returns true if the given number is event
 * @param {number} x
 */
const isEven = (x) => x % 2 === 0

// expect the value to pass a custom predicate function
// the second argument to "sinon.match(predicate, message)" is
// shown if the predicate does not pass and assertion fails
expect(spy).to.be.calledWith(
  Cypress.sinon.match(isEven, 'isEven'),
  3,
)

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
  document
    .getElementById('greet')
    .addEventListener('click', function () {
      setTimeout(function () {
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

### Reset call count

You can reset a spy / stub using the `.resetHistory` method.

<!-- fiddle cy.spy and cy.stub / reset history -->

```js
// test subject
const person = {
  age: 0,
  birthday() {
    this.age += 1
  },
}
// spy on the subject's method
cy.spy(person, 'birthday').as('birthday')
cy.wrap(person)
  .its('age')
  .should('equal', 0)
  .then(() => {
    // the application calls the method twice
    person.birthday()
    person.birthday()
  })
// verify the spy recorded two calls
cy.get('@birthday').should('have.been.calledTwice')
cy.wrap(person)
  .its('age')
  .should('equal', 2)
  .then(() => {
    person.birthday()
    person.birthday()
  })
cy.get('@birthday').its('callCount').should('equal', 4)
cy.log('**reset history**')
cy.get('@birthday').invoke('resetHistory')
// the spy call count and the history have been cleared
cy.get('@birthday').its('callCount').should('equal', 0)
cy.get('@birthday').should('not.have.been.called')
```

<!-- fiddle-end -->

### Returned value

We can check the value returned by the method.

<!-- fiddle cy.spy() / returned value -->

```js
const calc = {
  add(a, b) {
    return a + b
  },
}
cy.spy(calc, 'add').as('add')
expect(calc.add(4, 5), 'sum').to.equal(9)
cy.get('@add').should('have.returned', 9)
// if there are several calls
calc.add(1, 2)
calc.add(100, 200)
// the assertion will pass if at least one returned 3
cy.get('@add').should('have.returned', 3)
```

<!-- fiddle-end -->

### Resolved value

We can check the value returned by the method.

<!-- fiddle cy.spy() / resolved values -->

```js
const calc = {
  async add(a, b) {
    const sum = await Cypress.Promise.resolve(a + b).delay(1000)
    return sum
  },
}
cy.spy(calc, 'add').as('add')
// wait for the promise to resolve
// then confirm its resolved value
cy.wrap(calc.add(4, 5)).should('equal', 9)
// make a few more calls
cy.wrap(calc.add(1, 90)).should('equal', 91)
cy.wrap(calc.add(-5, -8)).should('equal', -13)
// example of confirming one of the calls used add(4, 5)
cy.get('@add').should('have.been.calledWith', 4, 5)
// now let's confirm the resolved values
// first we need to wait for all promises to resolve
cy.get('@add')
  .its('returnValues')
  // yields N promises, let's wait for them to resolve
  // in this test they should be resolved already
  // since we used cy.wrap() individually
  .then(Promise.all.bind(Promise))
  // alternative: to avoid the wrong "this" value when using Promise.all
  // .then((ps) => Promise.all(ps))
  .should('deep.equal', [9, 91, -13])
```

<!-- fiddle-end -->

### Call the spy from the test

When spying on the object's method typically you call the method. If you do call the created spy function, it does not have the `this` pointing at the original object. You can bind the `this` to point to the object by using `.bind` method.

<!-- fiddle cy.spy() / call the method spy and have this correctly set -->

```js
const testRunner = {
  name: 'Cypress',
  getName() {
    return this.name
  },
}

const getNameSpy = cy.spy(testRunner, 'getName')
// the created spy is just a function
expect(getNameSpy).to.be.a('function')
// call the object's method
expect(testRunner.getName(), 'object.method').to.equal('Cypress')
expect(getNameSpy, 'method was called').to.be.calledOnce
expect(
  getNameSpy.call(testRunner),
  'call the spy directly',
).to.equal('Cypress')
expect(getNameSpy, 'method was called twice').to.be.calledTwice
```

<!-- fiddle-end -->

Watch the video [How To Call The Spy Function](https://youtu.be/g_7LZXuEIMA).

## [cy.stub()](https://on.cypress.io/stub)

To create a stub and/or replace a function with a stub, use the `cy.stub()` command.

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

const stub = cy.stub(obj, 'foo')

obj.foo('foo', 'bar')

expect(stub).to.be.called
```

<!-- fiddle-end -->

### Return different values for different calls

If you want to return one value on the first call, then another value on the second call, etc

<!-- fiddle cy.stub() / returns different values -->

```html
<button id="fav-color">Ask about color</button>
<div id="color-output" />
<script>
  document
    .getElementById('fav-color')
    .addEventListener('click', function () {
      const color = window.prompt('What is your favorite color?')
      document.getElementById('color-output').innerText = color
    })
</script>
```

```js
cy.window().then((w) => {
  // see how to use Sinon stubs
  // https://sinonjs.org/releases/v10.0.0/stubs/
  cy.stub(w, 'prompt')
    .onFirstCall()
    .returns('green')
    .onSecondCall()
    .returns('red')
    // after the first 2 calls, always return purple
    .returns('purple')
    // give the stub an alias
    // so we can check the number of calls later
    .as('color-stub')
})
cy.get('#fav-color').click()
cy.contains('#color-output', 'green')
cy.get('#fav-color').click()
cy.contains('#color-output', 'red')
cy.get('#fav-color').click().click().click()
cy.contains('#color-output', 'purple')
cy.get('@color-stub').should('have.property', 'callCount', 5)
```

<!-- fiddle-end -->

### Return different dynamic values

If you want to return one value on the first call, then another value on the second call, etc and the return values come from an array, you cannot use `stub.onFirstCall`, `stub.onSecondCall`, etc. Instead use `stub.onCall(k)` method

<!-- fiddle cy.stub() / returns different dynamic values -->

```html
<button id="fav-colors">Ask about color</button>
<div id="colors-output" />
<script>
  document
    .getElementById('fav-colors')
    .addEventListener('click', function () {
      const color = window.prompt('What is your favorite color?')
      document.getElementById('colors-output').innerText = color
    })
</script>
```

```js
cy.window().then((w) => {
  const colors = ['green', 'red']

  // see how to use Sinon stubs
  // https://sinonjs.org/releases/v10.0.0/stubs/
  const s = cy.stub(w, 'prompt')
  colors.forEach(function (color, k) {
    s.onCall(k).returns(color)
  })
  // after that always return purple
  s.returns('purple')
    // give the stub an alias
    // so we can check the number of calls later
    .as('colors-stub')
})
cy.get('#fav-colors').click()
cy.contains('#colors-output', 'green')
cy.get('#fav-colors').click()
cy.contains('#colors-output', 'red')
cy.get('#fav-colors').click().click().click()
cy.contains('#colors-output', 'purple')
cy.get('@colors-stub').should('have.property', 'callCount', 5)
```

<!-- fiddle-end -->

### Saving stub under an alias

<!-- fiddle cy.stub() / save under an alias -->

```js
const obj = {
  foo() {},
}

cy.stub(obj, 'foo').as('foo')
obj.foo('foo', 'bar')

// access the stub using alias
cy.get('@foo').should('have.been.called')
```

<!-- fiddle-end -->

### Restore a stub

When you no longer want to use the stub, call `.restore()` method on the stub

<!-- fiddle cy.stub() / restore -->

```js
const person = {
  getName() {
    return 'Joe'
  },
}

expect(person.getName(), 'true name').to.equal('Joe')
cy.stub(person, 'getName').returns('Cliff')
expect(person.getName(), 'mock name').to.equal('Cliff')
// restore the original method
person.getName.restore()
expect(person.getName(), 'restored name').to.equal('Joe')
```

<!-- fiddle-end -->

### Restore a stub from an alias

You can also restore the original method from its alias

<!-- fiddle cy.stub() / restore from an alias -->

```js
const person = {
  getName() {
    return 'Joe'
  },
}

expect(person.getName(), 'true name').to.equal('Joe')
cy.stub(person, 'getName').returns('Cliff').as('getName')
expect(person.getName(), 'mock name').to.equal('Cliff')
cy.get('@getName')
  .should('have.been.calledOnce')
  .invoke('restore')
  .then(() => {
    expect(person.getName(), 'restored name').to.equal('Joe')
  })
```

<!-- fiddle-end -->

### Matching stub depending on arguments

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

Read the blog post [Lock Down Sinon Stub](https://glebbahmutov.com/blog/lock-down-sinon-stub/).

### Stub a property

If we want to temporarily replace an object's property (not a method), we can use `.value`

<!-- fiddle cy.stub() / property -->

```js
const person = {
  name: 'Joe',
  getName() {
    return this.name
  },
}
expect(person.getName(), 'real name').to.equal('Joe')
// change the property using cy.stub
cy.stub(person, 'name').value('Mike')
cy.then(() => {
  expect(person.getName(), 'stub name').to.equal('Mike')
})
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

### Call the original method from the stub

<!-- fiddle cy.stub() / call the original method -->

Sometimes you might want to call the original method from the stub.

```js
const person = {
  getName() {
    return 'Joe'
  },
}

cy.stub(person, 'getName').callsFake(() => {
  // call the real person.getName()
  return (
    person.getName
      .wrappedMethod()
      // but then reverse the returned string
      .split('')
      .reverse()
      .join('')
  )
})
expect(person.getName()).to.equal('eoJ')
```

<!-- fiddle-end -->

### Check the order of calls

<!-- fiddle cy.stub() / check the order of calls -->

You can check if one stub was called before or after another stub.

```js
const cart = {
  init() {
    return 'initialized'
  },
  finalize() {
    return 'finalized'
  },
  execute() {
    this.init()
    this.finalize()
  },
}
cy.spy(cart, 'init')
cy.spy(cart, 'finalize')
cart.execute()
// confirm the "init" method was called before the "finalize" method
expect(cart.init).to.have.been.calledBefore(cart.finalize)
```

<!-- fiddle-end -->

### Stub window.open

If an application tries to open a second tab by calling `window.open(url, ...)`, you must [prevent it](https://glebbahmutov.com/blog/cypress-second-tab/). Let's stub the method `open` and check the arguments after the call.

<!-- fiddle cy.stub() / stub window.open -->

```html
<button id="help">Show help</button>
<script>
  document
    .getElementById('help')
    .addEventListener('click', function () {
      open('/help', '_blank')
    })
</script>
```

```js
cy.window().then((win) => cy.stub(win, 'open').as('open'))
cy.contains('button', 'Show help').click()
// confirm the call arguments
cy.get('@open').should('have.been.calledWith', '/help', '_blank')
```

Watch the video [Stub Window Open Method And Confirm The Call Arguments](https://youtu.be/zPLr_YHZckU).

<!-- fiddle-end -->

### Stub window.alert

If the application is using `window.alert` to show short messages to the user, you can use `cy.stub` to intercept those calls and avoid blocking the test runner.

<!-- fiddle cy.stub() / stub window.alert -->

```html
<button id="sayhi">Click me</button>
<script>
  document
    .getElementById('sayhi')
    .addEventListener('click', function () {
      alert('Hello there!')
    })
</script>
```

```js
cy.window().then((win) => {
  cy.stub(win, 'alert').as('alert')
})
cy.get('#sayhi').click()
cy.get('@alert').should(
  'have.been.calledOnceWith',
  'Hello there!',
)
// the application can trigger the alert several times
cy.get('#sayhi').click().click()
// we can confirm the total number of calls
cy.get('@alert').its('callCount').should('equal', 3)
```

<!-- fiddle-end -->

### Stub window.prompt

If the application is asking the user for simple information using `window.prompt`, you can use `cy.stub` to respond with a test answer.

<!-- fiddle cy.stub() / stub window.prompt -->

```html
<button id="greet-by-name">Greet me</button>
<script>
  document
    .getElementById('greet-by-name')
    .addEventListener('click', function () {
      const name = prompt('What is your name?')
      alert('Hello ' + name)
    })
</script>
```

```js
cy.window().then((win) => {
  cy.stub(win, 'prompt').returns('Cy')
  cy.stub(win, 'alert').as('alert')
})
cy.get('#greet-by-name').click()
cy.get('@alert').should('have.been.calledOnceWith', 'Hello Cy')
```

<!-- fiddle-end -->

### Stub a method and restore

<!-- fiddle cy.stub() / stub a method and restore -->

```js
const person = {
  name() {
    return 'Joe'
  },
}
expect(person.name(), 'before stub').to.equal('Joe')
// return "Anna" on the first call
// all calls after that will return "undefined"
cy.stub(person, 'name').onFirstCall().returns('Anna')
expect(person.name(), 'first stubbed call').to.equal('Anna')
expect(person.name(), 'second stubbed call').to.equal(undefined)
person.name.restore()
expect(person.name(), 'restored method').to.equal('Joe')
```

<!-- fiddle-end -->

Note: all Cypress stubs and spies are restored automatically before each test.

## [cy.clock()](https://on.cypress.io/clock)

To control time in the browser, use the `cy.clock()` command.

<!-- fiddle clock / set the application clock -->

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

### Changes the application clock only

When running Cypress tests, the tests themselves are outside the application's iframe. When you use `cy.clock()` command you change the application clock, and not the spec's clock.

<!-- fiddle clock / does not change the spec clock -->

Fist, let's show that the two `Date` constructors are different between the application and the spec iframes.

```js
cy.window().its('Date').should('not.equal', Date)
```

Now let's confirm that `cy.clock()` controls the application's `Date`, but not the spec `Date`.

```js
const specNow = new Date()
const now = new Date(Date.UTC(2017, 2, 14)).getTime()
cy.clock(now) // sets the application clock and pause time
  .then(() => {
    // spec clock keeps ticking
    const specNow2 = new Date()
    // confirm by comparing the timestamps in milliseconds
    expect(+specNow2, 'spec timestamps').to.be.greaterThan(
      +specNow,
    )
  })
// but the application's time is frozen
cy.window()
  .its('Date')
  .then((appDate) => {
    const appNow = new appDate()
    expect(+appNow, 'application timestamps')
      .to.equal(+now)
      .and.to.equal(1489449600000) // the timestamp in milliseconds
  })
// we can advance the application clock by 5 seconds
cy.tick(5000)
cy.window()
  .its('Date')
  .then((appDate) => {
    const appNow = new appDate()
    expect(
      +appNow,
      'timestamp after 5 synthetic seconds',
    ).to.equal(1489449605000)
  })
  // meanwhile the spec clock only advanced by probably less than 200ms
  .then(() => {
    const specNow3 = new Date()
    expect(
      +specNow3,
      'elapsed on the spec clock',
    ).to.be.lessThan(+specNow + 200)
  })
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

## See also

- Read the blog post [Spy On A Complex Method Call](https://glebbahmutov.com/blog/spy-on-complex-method-call/)
