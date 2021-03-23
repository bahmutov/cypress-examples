# Retry-ability

For more information see [Cypress retry-ability guide](https://on.cypress.io/retry-ability).

<!-- fiddle Retry-ability / text appears and becomes red -->

```html
<div id="example"></div>
<script>
  setTimeout(() => {
    document.getElementById('example').innerHTML = `
    <button id="inner">Submit</button>
  `
  }, 2000)
  setTimeout(() => {
    document
      .getElementById('inner')
      .setAttribute('style', 'color: red')
  }, 3000)
</script>
```

```js
cy.get('#inner')
  .should('have.text', 'Submit')
  .and('have.css', 'color', 'rgb(255, 0, 0)')
  .click()
```

<!-- fiddle-end -->
