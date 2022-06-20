# Check style

<!-- fiddle Check style -->

```html
<div
  id="contains-example"
  style="font-weight: 600; text-decoration: underline"
>
  <span>Some text</span>
</div>
```

We can check what the element declares using the "have.css" assertion

```js
cy.get('#contains-example')
  .should('include.text', 'Some text')
  .and('have.css', 'text-decoration')
  // the text-decoration style string includes color and line type
  // we are only interested in the presence of the "underline" keyword
  .should('include', 'underline')
```

If we need to check the `<span>` element inside to confirm it has an underlined text, we need at the _computed style_, see the recipe [Computed style](./computed-style.md).

```js
cy.get('#contains-example')
  .then(($el) => {
    return window.getComputedStyle($el[0])
  })
  .invoke('getPropertyValue', 'font-weight')
  .should('equal', '600')
```

<!-- fiddle-end -->
