# Skip The Rest Of The Test

Looking into skipping the rest of the test on demand. One way is to use Mocha's built-in mechanism

```js
it('works', function () => {
  // some commands...
  // mark the test skipped
  this.skip()
})
```

The same strategy works inside Cypress, or you can grab the reference to the test object and call `skip()` method.

<!-- fiddle Skip the rest of the test -->

```js
cy.wrap(42)
  .should('equal', 42)
  .wait(1000)
  .then(() => {
    cy.log('**skipping the rest of the test**')

    // this skips the test, but also hides all commands and assertions
    // so not the best strategy to "pass" the test
    Cypress.state('test').ctx.test.skip()
  })

// this command and assertion should fail on purpose
cy.wrap('hello', { timeout: 0 }).should('equal', 'goodbye')
```

<!-- fiddle-end -->

## Skip the remaining commands

You can also "finish" the test by skipping all remaining commands. The test is marked passed.

<!-- fiddle Skip the remaining commands -->

```js
cy.wrap(42)
  .should('equal', 42)
  .wait(1000)
  .then(() => {
    console.log('skipping the rest of the commands')

    const current = Cypress.state('current')
    let next = current.attributes?.next
    while (next) {
      next.skip()
      next = next.attributes?.next
    }
  })

// this command and assertion should fail on purpose
cy.wrap('hello', { timeout: 0 }).should('equal', 'goodbye')
```

<!-- fiddle-end -->

## Skip commands using a command

Let's write a custom command to skip the remaining commands based on the argument.

```js
// do not skip the rest of the commands (do nothing)
cy.skip()

// skip the rest of the test
cy.skip(true)
```

<!-- fiddle cy.skip custom command -->

```js
Cypress.Commands.add('skip', (shouldSkip) => {
  if (!shouldSkip) {
    return
  }
  const log = Cypress.log({
    message: 'Skipping the rest of commands',
  })
  let next = Cypress.state('current').attributes?.next
  while (next) {
    next.skip()
    next = next.attributes?.next
  }
})

cy.wrap(42)
  .should('equal', 42)
  .wait(1000)
  .then(Boolean)
  // pass the current subject as Boolean to cy.skip
  // to skip the rest of the test
  .then(cy.skip)

// this command and assertion should fail on purpose
cy.wrap('hello', { timeout: 0 }).should('equal', 'goodbye')
```

<!-- fiddle-end -->
