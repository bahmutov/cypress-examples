# Same Height

Imagine the element's height changes based on CSS. This might look annoying, since it shifts the entire layout by a few pixels. Let's write a test that ensures that adding a CSS class does not change the computed height of an element.

## Compare heights as strings

🚨 This approach mostly _does not work_, since the computed height is a floating-point and might differ. For example, the height might change from 31.998px to 31.99802589416504px which is imperceivable to the human eye, yet causes the test to fail.

<!-- fiddle.skip Same height as strings (fails)-->

```css
#first {
  min-height: 2rem;
}
#first.selected {
  background-color: #eee;
  /* uncomment to see the test catch the height change */
  /* min-height: 2.2rem; */
}
```

```html hide
<div id="first">First element</div>
<div>Second element</div>
<button id="setClass">Set class</button>
```

```js app
document
  .getElementById('setClass')
  .addEventListener('click', () => {
    document.getElementById('first').classList.add('selected')
  })
```

```js hide
cy.log('**get the initial height**')
cy.get('#first')
  .invoke('css', 'height')
  .should('be.a', 'string') // something like "XYpx"
  .then((height) => {
    cy.log('**change the style**')
    cy.contains('button', 'Set class').click()
    cy.get('#first.selected').should(
      'have.css',
      'height',
      height,
    )
  })
```

<!-- fiddle-end -->

## Compare heights as numbers

Instead of matching strings, we can parse the computed heights into numbers and compare them approximately using the `closeTo` assertion.

<!-- fiddle Same height as numbers -->

```css
#first {
  min-height: 2rem;
}
#first.selected {
  background-color: #eee;
  /* uncomment to see the test catch the height change */
  /* min-height: 2.2rem; */
}
```

```html hide
<div id="first">First element</div>
<div>Second element</div>
<button id="setClass">Set class</button>
```

```js app
document
  .getElementById('setClass')
  .addEventListener('click', () => {
    document.getElementById('first').classList.add('selected')
  })
```

```js hide
cy.log('**get the initial height**')
cy.get('#first')
  .invoke('css', 'height')
  .should('be.a', 'string') // something like "XYpx"
  .then(parseFloat)
  .should('be.within', 10, 50)
  .then((height) => {
    cy.log('**change the style**')
    cy.contains('button', 'Set class').click()
    cy.get('#first.selected')
      .invoke('css', 'height')
      .should('be.a', 'string') // something like "XYpx"
      .then(parseFloat)
      .should('be.closeTo', height, 0.1)
  })
```

<!-- fiddle-end -->
