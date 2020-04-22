# Navigation

Examples of navigating to pages within your application in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [cy.go()](https://on.cypress.io/go)

To go back or forward in the browser's history, use the `cy.go()` command.

<!--
TODO will work once we implement export fiddles
https://github.com/cypress-io/cypress-fiddle/issues/97
-->

<!-- fiddle.export cy.go -->

```js
cy.get('.navbar-nav').contains('Commands').click()
cy.get('.dropdown-menu').contains('Navigation').click()

cy.location('pathname').should('include', 'navigation')

cy.go('back')
cy.location('pathname').should('not.include', 'navigation')

cy.go('forward')
cy.location('pathname').should('include', 'navigation')

// clicking back
cy.go(-1)
cy.location('pathname').should('not.include', 'navigation')

// clicking forward
cy.go(1)
cy.location('pathname').should('include', 'navigation')
```

<!-- fiddle-end -->

## [cy.reload()](https://on.cypress.io/reload)

To reload the page, use the `cy.reload()` command.

<!-- fiddle.export cy.reload -->

```js
cy.get('.navbar-nav').contains('Commands').click()
cy.get('.dropdown-menu').contains('Navigation').click()

cy.reload()

// reload the page without using the cache
cy.reload(true)
```

<!-- fiddle-end -->

## [cy.visit()](https://on.cypress.io/visit)

To visit a remote page, use the `cy.visit()` command.

```js
cy.get('.navbar-nav').contains('Commands').click()
cy.get('.dropdown-menu').contains('Navigation').click()

// Visit any sub-domain of your current domain
// Pass options to the visit
cy.visit('/commands/navigation', {
  timeout: 50000, // increase total time for the visit to resolve
  onBeforeLoad: function (contentWindow) {
    // contentWindow is the remote page's window object
    expect(typeof contentWindow === 'object').to.be.true
  },
  onLoad: function (contentWindow) {
    // contentWindow is the remote page's window object
    expect(typeof contentWindow === 'object').to.be.true
  },
})
```
