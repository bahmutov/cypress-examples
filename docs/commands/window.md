---
title: Window APIs
---

# Window

Examples of referencing window and other properties on window in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [cy.window()](https://on.cypress.io/window)

To get the global window object, use the `cy.window()` command.

<!-- fiddle window -->

```js
cy.window().should('have.property', 'top')
```

<!-- fiddle-end -->

## [cy.document()](https://on.cypress.io/document)

To get the document object, use the `cy.document()` command.

<!-- fiddle document -->

```js
cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
```

<!-- fiddle-end -->

## [cy.title()](https://on.cypress.io/title)

To get the title, use the `cy.title()` command.

<!-- fiddle title -->

```html
<script>
  document.title = 'Window APIs'
</script>
```

```js
cy.title().should('include', 'Window APIs')
```

<!-- fiddle-end -->
