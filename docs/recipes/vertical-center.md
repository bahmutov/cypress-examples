# Vertical Center

Let's confirm that the element is centered vertically in its parent element.

📺 Watch this recipe explained in the video [Vertical Center](https://youtu.be/YCyOxdBfYQM).

<!-- fiddle Vertical center -->

```html hide
<div id="parent">
  <div id="child1">Child 1</div>
  <div id="child2">Child 2</div>
</div>
```

```css hide
#parent {
  width: 200px;
  height: 50px;
  display: flex;
  background-color: green;
  justify-content: space-between;
  /* comment out vertical center to see the
  items shift in the parent container */
  align-items: center;
}
#child1 {
  width: 70px;
  height: 30px;
  background-color: lightBlue;
  text-align: center;
}
#child2 {
  width: 70px;
  height: 30px;
  background-color: pink;
  text-align: center;
}
```

Let's check if the first child element is vertically centered in its parent element. First, get the computed rectangle of the parent element

```js
// utility function returning client rectangle of the first jQuery element
const getClientRectangle = ($el) =>
  $el[0].getBoundingClientRect()
// utility function computing the vertical center of a client rectangle
const verticalCenter = (rect) => (rect.top + rect.bottom) / 2

cy.get('#parent')
  .then(getClientRectangle)
  // compute the Y center of the parent element
  .then(verticalCenter)
  .then((parentCenter) => {
    // get the child bounding rectangle
    cy.get('#child1')
      .then(getClientRectangle)
      // compute the Y center of the child element
      .then(verticalCenter)
      // confirm the child is vertically aligned inside the
      // we want to use approximate equality because floating-points
      .should('be.closeTo', parentCenter, 0.1)
  })
```

<!-- fiddle-end -->

## Using cypress-map plugin

If we use [cypress-map](https://github.com/bahmutov/cypress-map) we can simplify the check and even make it retry.

<!-- fiddle Vertical center after a delay using cypress-map -->

```html hide
<div id="parent">
  <div id="child1">Child 1</div>
  <div id="child2">Child 2</div>
</div>
```

```css hide
#parent {
  width: 200px;
  height: 50px;
  display: flex;
  background-color: green;
  justify-content: space-between;
}
#child1 {
  width: 70px;
  height: 30px;
  background-color: lightBlue;
  text-align: center;
}
#child2 {
  width: 70px;
  height: 30px;
  background-color: pink;
  text-align: center;
}
```

Let's say the application centers the child elements after one-second delay.

```js app hide
setTimeout(() => {
  document.getElementById('parent').style.alignItems = 'center'
}, 1000)
```

We can use [cypress-map](https://github.com/bahmutov/cypress-map) to retry computing the vertical center of the child element. After failing for one second, the centers should match and the test should pass.

```js
// utility function computing the vertical center of a client rectangle
const verticalCenter = (rect) => (rect.top + rect.bottom) / 2

cy.get('#parent')
  .invokeFirst('getBoundingClientRect')
  .apply(verticalCenter)
  .should('be.a', 'number')
  .then((parentCenter) => {
    cy.get('#child1')
      .invokeFirst('getBoundingClientRect')
      .apply(verticalCenter)
      // confirm the child is vertically aligned inside the
      // we want to use approximate equality because floating-points
      .should('be.closeTo', parentCenter, 0.1)
  })
```

<!-- fiddle-end -->

## Recomputing both centers

In the previous recipe, the parent element was fixed. We retried getting the child element's center until the test passed. What if both elements can move? We need to retry computing both centers until they match. Here is my solution:

<!-- fiddle Recomputing both centers -->

```html hide
<div id="parent">
  <div id="child1">Child 1</div>
  <div id="child2">Child 2</div>
</div>
```

```css hide
#parent {
  width: 200px;
  height: 50px;
  display: flex;
  background-color: green;
  justify-content: space-between;
}
#child1 {
  width: 70px;
  height: 30px;
  background-color: lightBlue;
  text-align: center;
}
#child2 {
  width: 70px;
  height: 30px;
  background-color: pink;
  text-align: center;
}
```

The application centers the child elements after one-second delay.

```js app hide
setTimeout(() => {
  document.getElementById('parent').style.alignItems = 'center'
}, 1000)
```

Our test needs to query the elements and compute both vertical centers until the assertion callback passes.

```js
// utility function computing the vertical center of a client rectangle
const verticalCenter = (rect) => (rect.top + rect.bottom) / 2

cy.getInOrder('#parent', '#child1') // yields 2 elements
  .mapInvoke('getBoundingClientRect') // yields 2 rectangles
  .map(verticalCenter) // yields two numbers
  .print() // yields two numbers
  .should(([y1, y2]) => {
    // if this assertion fails, the test goes back to cy.getInOrder
    expect(y1, 'vertical centers').to.be.closeTo(y2, 0.1)
  })
```

<!-- fiddle-end -->

## Window center

Let's confirm that a dialog is vertically centered inside the `window` object.

<!-- fiddle.skip Dialog in the window center -->

```html
<dialog open data-cy="ok-example">
  <p>Greetings, one and all!</p>
</dialog>
```

```js
// utility function computing the vertical center of a client rectangle
const verticalCenter = (rect) => (rect.top + rect.bottom) / 2

cy.window()
  .its('innerHeight')
  .should('be.a', 'number')
  .then((w) => w / 2)
  .then((centerY) => {
    cy.get('dialog[data-cy=ok-example]')
      .invokeFirst('getBoundingClientRect')
      .apply(verticalCenter)
      .then(Math.round)
      .should('be.closeTo', centerY, 1)
  })
```

<!-- fiddle-end -->

## Window center assertion

Let's write a custom assertion to confirm that an element is vertically and horizontally centered inside the `window`.

<!-- fiddle.skip Element is centered assertion -->

```html
<dialog open data-cy="ok-example">
  <p>I am in the center</p>
</dialog>
```

```js
chai.use((_chai) => {
  const win = cy.state('window')
  _chai.Assertion.addMethod(
    'centered',
    function centered(tolerance = 1) {
      // get the window center coordinates
      const centerX = Math.round(win.innerWidth / 2)
      const centerY = Math.round(win.innerHeight / 2)

      // get the element's center coordinates
      const rect = this._obj[0].getBoundingClientRect()
      const x = Math.round((rect.left + rect.right) / 2)
      const y = Math.round((rect.top + rect.bottom) / 2)

      // compare the two coordinates, should be close
      const deltaX = Math.abs(x - centerX)
      const deltaY = Math.abs(y - centerY)
      this.assert(
        deltaX < tolerance && deltaY < tolerance,
        `expected element to be centered (at ${centerX},${centerY} was ${x}, ${y})`,
      )
    },
  )
})

cy.get('dialog[data-cy=ok-example]').should('be.centered', 1000)
```

<!-- fiddle-end -->
