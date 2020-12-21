# CSS

## Class names

Getting the full CSS class list for [issue 8592](https://github.com/cypress-io/cypress/issues/8592)

<!-- fiddle Class names -->

```html
<div class="profiler__header">
  <div
    class="c-accordion c-accordion-active collapsed"
    id="accordion"
  >
    things inside
  </div>
</div>
```

```js
cy.get('#accordion')
  .should('have.class', 'c-accordion')
  .and('have.class', 'collapsed')
  .and('not.have.class', 'c-disabled')
  .then(($el) => {
    expect($el[0].className).to.equal(
      'c-accordion c-accordion-active collapsed',
    )
  })
```

<!-- fiddle-end -->
