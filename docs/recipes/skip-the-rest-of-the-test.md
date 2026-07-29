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
