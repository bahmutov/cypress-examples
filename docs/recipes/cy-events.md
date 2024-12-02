# Cy events

Cypress test runner fires events you can subscribe to. For example, we can listen to the command start and finish events. See the full [Cypress Catalog of Events](https://docs.cypress.io/api/cypress-api/catalog-of-events) for more.

<!-- fiddle Command start -->

```js
cy.on('command:start', (cmd) => {
  console.log('started command', cmd)
})
cy.wrap('hello').should('equal', 'hello')
```

![Cypress command start event](./pics/command-start.png)

<!-- fiddle-end -->

**Tip:** I used these events to log all commands and their arguments in my [cypress-failed-log](https://github.com/bahmutov/cypress-failed-log) plugin.
