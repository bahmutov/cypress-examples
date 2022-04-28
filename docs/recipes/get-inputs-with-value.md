# Get input elements with the given value

<!-- fiddle Get input elements with the given value -->

```html
<div id="inputs">
  <input type="text" id="i1" />
  <input type="text" id="i2" />
  <input type="text" id="i3" value="fox" />
</div>
```

```js
// change one of the inputs by typing "fox" into it
cy.get('#i2').type('fox')
```

Find all input elements with value "fox"

```js
// NOTE: only the elements with the markup attribute "value" are returned
cy.get('#inputs input[value=fox]').should('have.length', 1)
```

If we want to find the input elements with _the current_ run-time value, we need to get all potential input elements and filter them using the `cy.filter(callback)` command.

```js
cy.get('#inputs input')
  .filter((k, el) => {
    return el.value === 'fox'
  })
  // finds both input elements with the value "fox"
  .should('have.length', 2)
```

<!-- fiddle-end -->
