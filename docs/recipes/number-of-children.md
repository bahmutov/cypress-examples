# Number Of Children

<!-- fiddle Number of children -->

```html
<div id="parent">
  <div>One</div>
  <div>Two <strong>*</strong></div>
  <div>Three</div>
  <div>Four</div>
</div>
```

Let's confirm the number of immediate children of the parent element.

```js
// using cy.children query command
cy.get('#parent').children().should('have.length', 4)
// using DOM property "childElementCount"
cy.get('#parent').should('have.prop', 'childElementCount', 4)
```

<!-- fiddle-end -->

## See also

- [Number of elements](./number-of-elements.md)
