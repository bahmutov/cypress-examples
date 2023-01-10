# CSS classes

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
  // check individual class names using "have.class"
  .should('have.class', 'c-accordion')
  .and('have.class', 'collapsed')
  .and('not.have.class', 'c-disabled')
```

You can grab the full class name using jQuery property

```js
cy.get('#accordion').then(($el) => {
  // you can grab the full class name using jQuery property
  expect($el[0].className).to.equal(
    'c-accordion c-accordion-active collapsed',
  )
})
cy.get('#accordion')
  .should('have.prop', 'className')
  .should('equal', 'c-accordion c-accordion-active collapsed')
```

<!-- fiddle-end -->

## Full list of classes

<!-- fiddle Class list -->

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

We can get the full HTML class list

```js
cy.get('#accordion')
  .then(($el) => $el[0].classList.value)
  .should('equal', 'c-accordion c-accordion-active collapsed')
// alternative shortcut using the have.prop assertion
cy.get('#accordion')
  .should('have.prop', 'classList')
  .its('value') // normal property
  .should('equal', 'c-accordion c-accordion-active collapsed')
```

<!-- fiddle-end -->

<!-- fiddle Class name matching a rule -->

Imagine the classes are dynamic, and we do not know the exact class name, just how it starts.

```html
<div class="profiler__header">
  <div class="c-accordion-xyz123 collapsed" id="accordion">
    things inside
  </div>
</div>
```

```js
cy.get('#accordion')
  .should('have.prop', 'classList')
  .then(Array.from)
  .then(console.log)
  .invoke('some', (s) => s.startsWith('c-accordion'))
  .should('be.true')
```

<!-- fiddle-end -->
