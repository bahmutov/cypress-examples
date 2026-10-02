# Z-index

## Z-index is set on the element itself

<!-- fiddle Compare explicit z-index of two elements -->

Let's compare the `z-index` CSS property of two elements

```css hide
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

#one {
  z-index: 100;
  width: 300px;
  height: 200px;
  background-color: teal;
  color: white;
  font-size: x-large;
}

#two {
  z-index: 1000;
  width: 300px;
  height: 200px;
  background-color: orange;
  color: white;
  font-size: x-large;
}
```

```html hide
<div id="one" class="center">This is element one</div>
<div id="two" class="center">This is element two</div>
```

```js
cy.get('#one')
  .should('have.css', 'zIndex')
  .then(Number)
  .should('be.within', 10, 1000)
  .then((z1) => {
    cy.get('#two')
      .should('have.css', 'zIndex')
      .then(Number)
      .should('be.greaterThan', z1)
  })
```

<!-- fiddle-end -->

## Z-index is set on the parent

<!-- fiddle Compare inherited z-index of two elements -->

What happens if some parent element sets the `z-index`? We cannot use element's `have.css` assertion, since it will be "auto". Instead we need to walk up the parent chain and get the first explicit z-index number.

```css hide
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

#one {
  z-index: 100;
  width: 300px;
  height: 200px;
  background-color: teal;
  color: white;
  font-size: x-large;
}

#two {
  z-index: 1000;
  width: 300px;
  height: 200px;
  background-color: orange;
  color: white;
  font-size: x-large;
}
```

```html hide
<div id="one" class="center"><p>This is element one</p></div>
<div id="two" class="center"><p>This is element two</p></div>
```

We will compare the z-index of the two `<P>` elements, which inherit the index from their parents. Let's write a helper command to get the css value either from the element, or its parent(s). To simplify getting the CSS value from the element or its parents, I will add a custom command `cy.inheritedCss` which gets the given property from the element itself. If the element does not have a value, the command walks up the chain of parent elements until it finds a value, or runs out of elements. Pure integers are automatically converted to numbers.

```js
Cypress.Commands.add(
  'inheritedCss',
  { prevSubject: 'element ' },
  ($el, propertyName) => {
    if ($el.length !== 1) {
      throw new Error(
        'Cannot get inherited CSS of multiple elements',
      )
    }

    let cssValue
    do {
      if (cssValue || $el.length === 0) {
        break
      }

      cssValue = $el.css(propertyName)
      if (cssValue === 'auto' || cssValue === 'inherit') {
        cssValue = undefined
      }
      $el = $el.parent()
    } while (true)

    // automatically convert integers
    if (cssValue && /^\d+$/.test(cssValue)) {
      return Number(cssValue)
    }
    return cssValue
  },
)
```

```js
cy.get('#one p')
  .inheritedCss('zIndex')
  .should('be.within', 10, 1000)
  .then((z1) => {
    cy.get('#two p')
      .inheritedCss('zIndex')
      .should('be.greaterThan', z1)
  })
```

<!-- fiddle-end -->
