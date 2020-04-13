# Cypress API

Examples of uses of the Cypress API, for a full reference, go to [docs.cypress.io](https://on.cypress.io/custom-commands)

## [Cypress.Commands.add()](https://on.cypress.io/custom-commands)

To add a command, use `Cypress.Commands.add()`.

<!-- fiddle add command -->

```js
Cypress.Commands.add(
  'console',
  {
    prevSubject: true,
  },
  (subject, method) => {
    method = method || 'log'

    // log the subject to the console
    console[method]('The subject is', subject)
    return subject
  },
)
// prints the object to the window console
cy.wrap({ life: 42 }).console('info')
```

<!-- fiddle-end -->
