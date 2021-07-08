# Misc

Examples of miscellaneous commands in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [cy.log()](https://on.cypress.io/log)

To print a value into Command Log on the left side of the test runner, use `cy.log()` command.

<!-- fiddle .log() / prints a string -->

```js
cy.log('this is a string')
// you can use a small subset of Markdown: italics, bold
cy.log('this is **important**')
// you can pass arguments
const user = { name: 'Joe', age: 20 }
cy.log('user object', user)
cy.log('name', user.name, 'age', user.age)
// or form the message yourself
cy.log(`name \`${user.name}\` age \`${user.age}\``)
```

<!-- fiddle-end -->

### cy.log binds its arguments

When you call `cy.log(arg)` due to JavaScript rules, the value of the argument `arg` is _bound_ immediately, but the printing happens _asynchronously_ because every declared Cypress command is chained and executes after the previous command has finished. The following test shows both incorrect and correct way of printing the value of an HTML element.

<!-- fiddle .log() / binds the primitive value -->

```html
<div id="username">Mary</div>
```

```js
// ⛔️ INCORRECT - PRINTS NULL
let username = null
cy.get('#username').then(($el) => (username = $el.text()))
cy.log(username) // always prints null ⚠️
```

When `cy.log(username)` is called in the above text block, the value of `username` is `null`. JavaScript passes primitive types by value. Thus the value `null` is passed into `cy.log()` call. Later, when the `cy.get` and `.then` commands complete, the command `cy.log` in the chain gets its turn to run - and it prints the value of the argument it has received _at the start_ which is `null`.

Instead we need to call `cy.log` only when the argument value is known and set.

```js
// ✅ CORRECT - prints "Mary"
cy.get('#username')
  .then(($el) => (username = $el.text()))
  .then(() => {
    // by this point the "username" primitive variable
    // has been set, and the call is made cy.log("Mary")
    cy.log(username)
  })
```

<!-- fiddle-end -->

<!-- fiddle .log() / prints an object -->

```html
<div id="last-user">Mary</div>
```

An alternative to using a primitive variable with `cy.log` is to pass an object by reference, then fill a value in the object. Since the reference passed to `cy.log` is unchanged, the Command Log will print the values inside the object at the moment `LOG` runs after previous commands have finished.

```js
const user = { name: null }
cy.get('#last-user').then(($el) => (user.name = $el.text()))
cy.log(user) // prints { user: "Mary" }
```

<!-- fiddle-end -->

## [.end()](https://on.cypress.io/end)

To end the command chain, use the `.end()` command.

<!-- fiddle .end() - end the command chain -->

```html
<table class="table table-bordered misc-table">
  <thead>
    <tr>
      <th>Table</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>User: Cheryl</td>
    </tr>
    <tr>
      <td>User: Charles</td>
    </tr>
    <tr>
      <td>User: Darryl</td>
    </tr>
  </tbody>
</table>
```

```js
// cy.end is useful when you want to end a chain of commands
// and force Cypress to re-query from the root element
cy.get('.misc-table').within(() => {
  // ends the current chain and yields null
  cy.contains('Cheryl').click().end()

  // queries the entire table again
  cy.contains('Charles').click()
})
```

<!-- fiddle-end -->

## [cy.exec()](https://on.cypress.io/exec)

To execute a system command, use the `cy.exec()` command.

<!-- fiddle cy.exec() - execute a system command -->

```js
// execute a system command.
// so you can take actions necessary for
// your test outside the scope of Cypress.
// https://on.cypress.io/exec

// we can use Cypress.platform string to
// select appropriate command
// https://on.cypress/io/platform
cy.log(`Platform ${Cypress.platform} architecture ${Cypress.arch}`)

// on CircleCI Windows build machines we have a failure to run bash shell
// https://github.com/cypress-io/cypress/issues/5169
// so skip some of the tests by passing flag "--env circle=true"
const isCircleOnWindows =
  Cypress.platform === 'win32' && Cypress.env('circle')

if (isCircleOnWindows) {
  cy.log('Skipping test on CircleCI')

  return
}

// cy.exec problem on Shippable CI
// https://github.com/cypress-io/cypress/issues/6718
const isShippable =
  Cypress.platform === 'linux' && Cypress.env('shippable')

if (isShippable) {
  cy.log('Skipping test on ShippableCI')

  return
}

cy.exec('echo Jane Lane').its('stdout').should('contain', 'Jane Lane')

if (Cypress.platform === 'win32') {
  cy.exec('print cypress.json').its('stderr').should('be.empty')
} else {
  cy.exec('cat cypress.json').its('stderr').should('be.empty')

  cy.exec('pwd').its('code').should('eq', 0)
}
```

<!-- fiddle-end -->

## [cy.focused()](https://on.cypress.io/focused)

To get the DOM element that has focus, use the `cy.focused()` command.

<!-- fiddle cy.focused() - get the DOM element that has focus -->

```html
<form class="misc-form">
  <div class="form-group">
    <label for="name">Name</label>
    <input
      type="text"
      class="form-control"
      id="name"
      placeholder="Name"
    />
  </div>
  <div class="form-group">
    <label for="description">Description</label>
    <textarea class="form-control" id="description"></textarea>
  </div>
</form>
```

```js
// https://on.cypress.io/focused
cy.get('.misc-form').find('#name').click()
cy.focused().should('have.id', 'name')

cy.get('.misc-form').find('#description').click()
cy.focused()
  // we can check if the focused element has a specific ID
  .should('have.id', 'description')
  // or if it matches the entire given CSS selector
  .and('match', '.misc-form textarea#description')
```

<!-- fiddle-end -->

## [cy.screenshot()](https://on.cypress.io/screenshot)

To take a screenshot, use the `cy.screenshot()` command.

<!-- run this test in exported specs, since it reports zero width from fiddle -->
<!-- fiddle.export Cypress.Screenshot / cy.screenshot() - take a screenshot -->

```html
<code>cypress/screenshots/my-image.png</code>
```

```js
cy.screenshot('my-image')
```

<!-- fiddle-end -->

<!-- fiddle Cypress.Screenshot / Cypress.Screenshot.defaults() - change default config of screenshots -->

```js
Cypress.Screenshot.defaults({
  blackout: ['.foo'],
  capture: 'viewport',
  clip: { x: 0, y: 0, width: 200, height: 200 },
  scale: false,
  disableTimersAndAnimations: true,
  screenshotOnRunFailure: true,
  beforeScreenshot() {},
  afterScreenshot() {},
})
```

<!-- fiddle-end -->

## [cy.wrap()](https://on.cypress.io/wrap)

To wrap an object or a value, use the `cy.wrap()` command.

<!-- fiddle cy.wrap() - wrap an object -->

```js
// https://on.cypress.io/wrap
cy.wrap({ foo: 'bar' })
  .should('have.property', 'foo')
  .and('include', 'bar')
cy.wrap(42).should('equal', 42)
```

<!-- fiddle-end -->

Once you have an object wrapped, you can access its properties, invoke its methods, and even pass it via an alias.

<!-- fiddle cy.wrap() - invoke a method -->

```js
cy.wrap({
  name: 'Joe',
  getName() {
    return this.name
  },
})
  .invoke('getName')
  .should('equal', 'Joe')

// the method could be a function
const getMagicNumber = () => 42
cy.wrap({
  getNumber: getMagicNumber,
})
  .invoke('getNumber')
  .should('equal', 42)

// you can wrap the object as alias
cy.wrap({
  name: 'Joe',
  getName() {
    return this.name
  },
  getNumber: getMagicNumber,
}).as('wrappedObject')
// some time later get the alias and use it
cy.get('@wrappedObject').its('name').should('equal', 'Joe')
cy.get('@wrappedObject').invoke('getName').should('equal', 'Joe')
cy.get('@wrappedObject').invoke('getNumber').should('equal', 42)
```

<!-- fiddle-end -->

If `cy.wrap` receives a Promise as an argument, Cypress automatically waits for the promise to complete.

<!-- fiddle cy.wrap() - waits on a promise automatically -->

```js
const p = new Promise((resolve) => {
  resolve('Hello')
}, 100)
cy.wrap(p).should('equal', 'Hello')
```

<!-- fiddle-end -->
