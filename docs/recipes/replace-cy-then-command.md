# Replace cy.then command

Many people have a problem with the [cy.then](https://on.cypress.io/then) command. It behaves _almost_ like a promise, causing confusion. Let's replace it with a custom `cy.later` command.

<!-- fiddle Rename and replace the cy.then command -->

```js
// find and save the reference to the original cy.then command
// by inspecting the internals of the Cypress.Commands object
const thenCommand = Cypress.Commands._commands.then.fn

// if anyone tries to use cy.then in the spec code or in a plugin
// we will get an error
Cypress.Commands.overwrite('then', function (then, subject, cb) {
  throw new Error('Using cy.then command is disallowed')
})

Cypress.Commands.add(
  'later',
  { prevSubject: true },
  (subject, cb) => {
    // cy.later behaves just like cy.then
    // which we implement by calling the original cy.then command
    return thenCommand(subject, cb)
  },
)

cy.wrap('Hello')
  .later(cy.log)
  .later((x) => x + x)
  .should('equal', 'HelloHello')
```

<!-- fiddle-end -->
