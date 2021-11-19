---
title: Window APIs
---

# Window

Examples of referencing window and other properties on window in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [cy.window()](https://on.cypress.io/window)

To get the global window object, use the `cy.window()` command.

<!-- fiddle window / access a built-in property -->

```js
cy.window().should('have.property', 'top')
```

<!-- fiddle-end -->

You can use the yielded `window` object to call the methods on that window directly. For example, if the application code adds a method `getAppName` to the `window` object, you can execute the method from the spec. You can even pass arguments and confirm the result.

<!-- fiddle window / call a method -->

```html
<script>
  // the application adds a method "getAppName" at some point
  setTimeout(function () {
    window.getAppName = function (version) {
      return `App_v${version}`
    }
  }, 1000)
</script>
```

```js
// if the method exists on the "window" object, we can immediately call it
cy.window().then((w) => {
  expect(w.eval('2 + 2')).to.equal(4)
})
// if the method is added at some point in the future
// we can use built-in retry-ability using cy.invoke command
cy.window()
  // This command waits until the method exists
  // the calls it with the given arguments
  .invoke('getAppName', '1.0')
  // confirm the result
  .should('equal', 'App_v1.0')
```

<!-- fiddle-end -->

Watch the explanation in the video [Call Window Method From Cypress Spec](https://youtu.be/Z5i60En_33A).

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
