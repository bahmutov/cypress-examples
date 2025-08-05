# cy.get Vs cy.find

⚠️ This is a pretty common mistake I see: using `.get(...)` in the middle of the command chain while meaning to use the `.find(...)` query.

The [cy.get](https://on.cypress.io/get) command always starts its search from the `document` element, or, if used inside `.within`, from the [cy.root](https://on.cypress.io/root) element. The [.find](https://on.cypress.io/find) command starts the search from the current subject.

<!-- fiddle cy.get vs .find -->

```html
<div class="test-title">cy.get vs .find</div>
<section id="comparison">
  <div class="feature">Both are querying commands</div>
</section>
```

First, let's see what the `cy.get` does in the middle of the command chain:

```js
cy.get('#comparison')
  .get('div')
  // finds the DIV .test-title outside the #parent
  // and the DIV .feature inside
  .should('have.length', 2)
  // one DIV is _outside_ the #comparison element
  .and('have.class', 'test-title')
  // the other DIV is inside the #comparison element
  .and('have.class', 'feature')
```

We probably meant to search _inside_ the parent element with ID "comparison", so we should use the `cy.find` child command.

```js
cy.get('#comparison')
  .find('div')
  // the search is limited to the tree at #comparison element
  .should('have.length', 1)
  .and('have.class', 'feature')
  .and('have.text', 'Both are querying commands')
```

<!-- fiddle-end -->
