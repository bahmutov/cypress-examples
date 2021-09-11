# Overlapping elements

Sometimes you want to make sure the DOM elements are overlapping or non-overlapping on the page.

<!-- fiddle Overlapping elements -->

```html
<div class="example-container">
  <div class="rect A">A</div>
  <div class="rect B">B</div>
  <div class="rect C">C</div>
</div>
<style>
  .example-container {
    position: relative;
  }
  .rect {
    width: 100px;
    height: 100px;
    position: absolute;
  }
  .A {
    top: 0;
    left: 0;
    border: 1px red solid;
  }
  .B {
    top: 10;
    left: 120;
    border: 1px green solid;
  }
  .C {
    top: 40;
    left: 30;
    border: 1px blue solid;
  }
</style>
```

```js
/**
 * Returns true if two DOM rectangles are overlapping
 * @param {DOMRect} rect1 the bounding client rectangle of the first element
 * @param {DOMRect} rect2 the bounding client rectangle of the second element
 * @returns {boolean}
 */
const areOverlapping = (rect1, rect2) => {
  // if one rectangle is on the left side of the other
  if (rect1.right < rect2.left || rect2.right < rect1.left) {
    return false
  }

  // if one rectangle is above the other
  if (rect1.bottom < rect2.top || rect2.bottom < rect1.top) {
    return false
  }

  // the rectangles must overlap
  return true
}

/**
 * Returns the bounding rectangle of the first DOM
 * element in the given jQuery object.
 */
const getRectangle = ($el) => $el[0].getBoundingClientRect()

// get each element and compute its bounding rectangle
// then use the areOverlapping predicate to check
// for overlap and assert the result
cy.get('.A')
  .then(getRectangle)
  .then((rectA) => {
    cy.get('.B')
      .then(getRectangle)
      .then((rectB) => {
        cy.get('.C')
          .then(getRectangle)
          .then((rectC) => {
            // now check which rectangles are overlapping
            expect(
              areOverlapping(rectA, rectB),
              'A and B are overlapping?',
            ).to.be.false
            expect(
              areOverlapping(rectA, rectC),
              'A and C are overlapping?',
            ).to.be.true
            expect(
              areOverlapping(rectB, rectC),
              'B and C are overlapping?',
            ).to.be.true
          })
      })
  })
```

<!-- fiddle-end -->
