# Overlapping elements

Sometimes you want to make sure the DOM elements are overlapping or non-overlapping on the page. We can get the bounding rectangle of an element on the page by calling the method `getBoundingClientRect`, then compare the two rectangles to see if they overlap. Using it from the Cypress test is simple: get both elements, get their rectangles, compute the overlap boolean, and assert if it matches the expected result. Note, that this version does not retry getting the elements or their rectangles if the assertion fails, thus it is not suitable to check the overlap between moving elements.

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
    width: 200px;
    height: 160px;
    margin-top: 20px;
  }
  .rect {
    width: 100px;
    height: 100px;
    position: absolute;
  }
  .A {
    top: 0px;
    left: 0px;
    border: 1px red solid;
  }
  .B {
    top: 10px;
    left: 120px;
    border: 1px green solid;
  }
  .C {
    top: 40px;
    left: 30px;
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

Just for completeness, let's show which rectangles are considered visible by Cypress; I believe currently they all are.

```js
cy.get('.A').should('be.visible')
cy.get('.B').should('be.visible')
cy.get('.C').should('be.visible')
```

<!-- fiddle-end -->
