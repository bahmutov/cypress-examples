# Replace cy.then command

Many people have a problem with the [cy.then](https://on.cypress.io/then) command. It behaves _almost_ like a promise, causing confusion. Let's replace it with a custom `cy.later` command.

<!-- fiddle Rename and replace the cy.then command -->

```js
// if anyone tries to use cy.then in the spec code or in a plugin
// we will get an error
Cypress.Commands.overwrite('then', function (
  then,
  subject,
  cb,
  allowUse,
) {
  if (!allowUse) {
    throw new Error('Using cy.then command is disallowed')
  }
  return then(subject, cb)
})

Cypress.Commands.add(
  'later',
  { prevSubject: true },
  (subject, cb) => {
    // cy.later behaves just like cy.then
    // which we implement by calling the original cy.then command
    return cy.now('then', subject, cb, true)
  },
)

cy.wrap('Hello')
  .should('be.a', 'string')
  .later((x) => x + x)
  .should('equal', 'HelloHello')
```

<!-- fiddle-end -->

Read the blog post [Replace The cy.then Command](https://glebbahmutov.com/blog/replace-and-remove-cy-then-command/).
