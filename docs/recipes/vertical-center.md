# Vertical Center

Let's confirm that the element is centered vertically in its parent element.

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
