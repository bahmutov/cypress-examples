# Chain of commands

<!-- fiddle Cannot add commands out of band -->

You cannot "insert" new command into [Cypress command chain](https://glebbahmutov.com/blog/visualize-cypress-command-queue/) from outside.

```js skip
cy.wait(10_000) // sleep 10 seconds
setTimeout(() => {
  cy.log('New command!')
}, 5_000)
```

![Cypress throws an error if you try to add more commands from outside](./pics/out-of-band-error.png)

Instead, you should be able to add commands from other Cypress commands, like [cy.then](https://on.cypress.io/then):

```js
cy.log('first').then(() => {
  // insert more commands
  // before the "LOG third" command
  cy.log('second')
})
cy.log('third')
```

![Cypress inserts new commands correctly](./pics/insert.png)

Read the blog post [Cypress Cannot Add Out-Of-Band Commands](https://glebbahmutov.com/blog/cypress-out-of-band/).

<!-- fiddle-end -->
