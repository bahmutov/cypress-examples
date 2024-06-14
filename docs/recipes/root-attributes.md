# Root Element Attributes

An example showing the [cy.root](https://on.cypress.io/root) in action.

<!-- fiddle Root element attributes -->

```html hide
<div id="bread" data-bread="none">
  Please pick the bread by clicking a button

  <div>
    <button id="rye">Rye</button>
    <button id="wheat">Wheat</button>
  </div>
</div>
<script>
  const el = document.getElementById('bread')
  document
    .getElementById('rye')
    .addEventListener('click', () => {
      el.setAttribute('data-bread', 'rye')
    })
  document
    .getElementById('wheat')
    .addEventListener('click', () => {
      el.setAttribute('data-bread', 'wheat')
    })
</script>
```

```js
cy.get('#bread')
  .should('have.attr', 'data-bread', 'none')
  .within(() => {
    cy.contains('button', 'Rye').click()
    cy.root().should('have.attr', 'data-bread', 'rye')
    cy.log('**pick wheat**')
    cy.contains('button', 'Wheat').click()
    cy.root().should('have.attr', 'data-bread', 'wheat')
  })
```

<!-- fiddle-end -->
