# Within Context Check

Imagine we have an HTML block and and accidentally use the `cy.within` command. We might get unexpected results or broken test. For example, we have the `#parent` element plus the `#uncle` element at the same level.

<!-- fiddle check if we are outside the cy.within context -->

```html
<div id="parent">
  Parent
  <div id="child">Child</div>
</div>
<div id="uncle">Uncle</div>
```

Let's say we want to detect if we are inside a custom element context or at the top level of the document.

```js
cy.get('#parent').within(() => {
  cy.get('#child')
  // cannot find the "#uncle" element within the "#parent"
  cy.get('#uncle').should('not.exist')
})
// at top level, we can find the "#uncle"
cy.get('#uncle')
```

Often when using custom commands, we call a custom command or a query inside `cy.within` which breaks the test, and it is hard to debug. We want to be able to confirm that we are inside the document root if we really have to be.

Let's create a small utility command that would tell us if we are currently inside a "root" HTML scope, or if we are called inside a `cy.within` command scope.

```js
Cypress.Commands.add('isTopLevel', () => {
  cy.root()
    // IMPORTANT: we call "cy.parent" twice
    // because cypress-examples renders the live HTML
    // inside its own "<div id="live">" container
    // and we need to go "up" to the <body> element
    // then to the "<html>" element.
    // In a "normal" test, you would not need these 2 cy.parent commands
    .parent()
    .parent()
    .then((root) => {
      cy.document()
        .its('documentElement')
        .then((html) => {
          return html[0] === root[0]
        })
    })
})
```

In the snippet below we are using the new custom command to confirm the top-level scope vs limited `cy.within` scope.

```js
cy.log('**at top level**')
cy.isTopLevel().should('be.true')

cy.log('**inside cy.within level**')
cy.get('#parent').within(() => {
  cy.isTopLevel().should('be.false')
})
```

<!-- fiddle-end -->
