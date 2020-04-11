# Querying

Examples of querying for DOM elements in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api) and read [Selecting Elements: Best Practices Guide](https://on.cypress.io/best-practices#Selecting-Elements)

## .within

We can find elements within a specific DOM element `.within()`

<!-- fiddle form example -->

```html
<input
  type="text"
  id="inputName"
  class="form-control"
  placeholder="Name"
/>
<h6>Form</h6>
<form class="query-form">
  <input
    type="text"
    id="inputEmail"
    class="form-control"
    placeholder="Email"
  />
  <input
    type="text"
    id="inputPassword"
    class="form-control"
    placeholder="Password"
  />
</form>
```

```js
cy.get('.query-form').within(() => {
  cy.get('input:first').should('have.attr', 'placeholder', 'Email')
  cy.get('input:last').should('have.attr', 'placeholder', 'Password')
})
```

<!-- fiddle-end -->
