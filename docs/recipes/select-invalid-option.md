# How To Select An Invalid Option

Imagine your application responds to the user selection an option from a `<select>` element. You handle the valid options, but how would you test handling of the invalid option by the `default` switch case?

📺 Watch this recipe explained in [Select Invalid Option](https://youtu.be/X0uiViQoAO0).

<!-- fiddle Select invalid option -->

```html hide
<span>Sort items</span>
<select id="sort">
  <option value="a to z">A to Z (name)</option>
  <option value="z to a">Z to A (name)</option>
  <option value="low to high">Low to high (price)</option>
  <option value="high to low">High to low (price)</option>
</select>
<script>
  document
    .getElementById('sort')
    .addEventListener('change', (e) => {
      console.log('selected "%s"', e.target.value)
      switch (e.target.value) {
        case 'a to z':
          console.log('sorting by name A to Z')
          break
        case 'z to a':
          console.log('sorting by name Z to A')
          break
        case 'low to high':
          console.log('sorting by price from lowest')
          break
        case 'high to low':
          console.log('sorting by price from highest')
          break
        default:
          console.error(`Unknown sort order ${e.target.value}`)
      }
    })
</script>
```

Let's confirm we can pick a valid option using the [cy.select](https://on.cypress.io/select) command.

```js
cy.get('#sort').select('z to a').should('have.value', 'z to a')
```

How would you reach the `default` select case statement?

```js
cy.window()
  .its('console')
  .then((console) => {
    cy.spy(console, 'error').as('error')
  })
cy.get('#sort').invoke(
  'append',
  '<option value="nope">Nope</option>',
)
cy.get('#sort').select('nope')
```

Let's confirm the `default` case statement called the `console.error` method:

```js
cy.get('@error').should('have.been.calledOnce')
// we can also check to confirm the select has the option Nope selected
cy.get('#sort').should('have.value', 'nope')
```

**Tip:** We need to re-query the element to select the newly added option because Cypress v12 made `cy.invoke` a retry-able query, causing multiple `<option value="nope">Nope</option>` elements to be appended. You can use `cy.invokeOnce` from my [cypress-map](https://github.com/bahmutov/cypress-map) plugin instead:

```js
cy.get('#sort')
  .invokeOnce('append', '<option value="wrong">Wrong</option>')
  .select('wrong')
```

<!-- fiddle-end -->
