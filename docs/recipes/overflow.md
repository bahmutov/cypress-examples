# Overflow

## Button with overflowing text

<!-- fiddle Button with overflowing text -->

```html
<button id="click">Click This Button</button>
<button id="big-button">Click That Button</button>
```

```css hide
#click {
  max-width: 60px;
  max-height: 30px;
}
```

Let's confirm the first button overflows it 60x30 pixel boundary, while the second button "grows" to enclose the entire text. First, let's write a utility function that returns true if the DOM element is overflowing its client dimensions.

```js
const isOverflown = ({
  clientWidth,
  clientHeight,
  scrollWidth,
  scrollHeight,
}) => {
  return scrollHeight > clientHeight || scrollWidth > clientWidth
}
```

Now let's add a new Chai method that checks the current jQuery subject to be overflowing or now.

```js
chai.use((_chai, utils) => {
  // use "function" syntax to make sure when Chai
  // calls it, the "this" object points at Chai

  function overflowing() {
    if (!Cypress.dom.isJquery(this._obj)) {
      throw new Error('Expected a jQuery object')
    }

    // the _obj should be a jQuery object
    this.assert(
      isOverflown(this._obj[0]),
      'expected element to overflow',
      'expected element not to overflow',
    )
  }
  _chai.Assertion.addMethod('overflow', overflowing)
})
```

Finally, let's use the new assertion method using implicit `should('overflow')` and its negative `should('not.overflow')` variants.

```js
cy.get('#click').should('overflow')
cy.get('#big-button').should('not.overflow')
```

Let's confirm the assertion correctly fails for non-jQuery or empty objects. Here are some skipped examples.

```js skip
cy.wrap(null).should('not.overflow')
cy.get('#does-not-exist').should('not.overflow')
```

<!-- fiddle-end -->
