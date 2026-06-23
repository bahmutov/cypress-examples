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

## Overflowing dialog container

In the example below the element might overflow not its immediate parent container, but a `<dialog>` element. Thus we need to check the elements' bounding rectangles.

📺 Watch this recipe explained in the video [Custom Assertion Catches Elements Overflowing The Container](https://youtu.be/OdUdmMmKq2Y).

<!-- fiddle Elements overflow dialog container -->

```html
<dialog open id="terms-dialog">
  <div>
    <p>Line 1: This dialog has a constrained height.</p>
    <p>Line 2: Additional copy creates vertical overflow.</p>
    <p>Line 3: Users can still scroll to read all lines.</p>
    <p>
      Line 4: This line intentionally pushes the content down.
    </p>
    <p>Line 5: Final line in this short text block.</p>
    <div>
      <button>Get 10% Off</button>
    </div>
  </div>
</dialog>
```

```css hide
#terms-dialog {
  width: 280px;
  height: 110px;
  overflow-y: auto;
  overflow-x: visible;
}
#terms-dialog button {
  position: absolute;
  /* change these numbers to move the button around */
  top: 10px;
  left: 10px;
}
```

```js hide
// checks if the first rectangle is completely inside
// the second bounding rectangle
const isOverflown = (rect, parentRect) => {
  return (
    rect.left < parentRect.left ||
    rect.right > parentRect.right ||
    rect.top < parentRect.top ||
    rect.bottom > parentRect.bottom
  )
}
```

```js hide
chai.use((_chai, utils) => {
  // use "function" syntax to make sure when Chai
  // calls it, the "this" object points at Chai

  function overflowing(containerSelector = 'body') {
    if (!Cypress.dom.isJquery(this._obj)) {
      throw new Error('Expected a jQuery object')
    }

    // find the parent container using the given selector
    // and jQuery method "parents"
    const container = this._obj.parents(containerSelector)
    // get both bounding rectangles
    const parentContainer = container[0].getBoundingClientRect()
    const rect = this._obj[0].getBoundingClientRect()

    this.assert(
      isOverflown(rect, parentContainer),
      `expected element to overflow ${containerSelector}`,
      `expected element not to overflow ${containerSelector}`,
    )
  }
  _chai.Assertion.addMethod('overflow', overflowing)
})
```

Let's confirm that every button is visible inside the dialog element.

```js
cy.get('#terms-dialog')
  .should('be.visible')
  .within(() => {
    cy.get('button').each(($el) => {
      // every button should be within the dialog container
      cy.wrap($el).should('not.overflow', 'dialog')
    })
  })
```

<!-- fiddle-end -->
