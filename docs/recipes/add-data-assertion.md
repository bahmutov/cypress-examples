# Add A Custom Data Assertion

Let's say our code is using "data-test-id" attribute, and we want to verify that the current element has the expected test id value.

<!-- fiddle Check data test id -->

```html
<ul id="data-attributes">
  <li data-test-id="first">first</li>
  <li>second</li>
</ul>
```

```js
cy.contains('#data-attributes li', 'first')
  // use the built-in Chai-jQuery "have.data" assertion
  // https://www.chaijs.com/plugins/chai-jquery/
  .should('have.data', 'testId', 'first')
  // unfortunately, we can no longer work with the element
  // since the assertion yields the value of the data attribute
  .should('equal', 'first')
```

We can add our own assertion to verify the "data-test-id" attribute (with optional value), and yield the original element to keep chaining commands to it.

```js
chai.use((_chai, utils) => {
  // use "function" syntax to make sure when Chai
  // calls it, the "this" object points at Chai

  function testId(expectedValue) {
    const attr = 'data-test-id'
    if (expectedValue) {
      const value = this._obj.attr(attr)
      this.assert(
        value === expectedValue,
        `expected to find data-test-id="${expectedValue}", found value "${value}"`,
      )
    } else {
      // only confirm the "data-test-id" attribute is present

      this.assert(
        this._obj.attr(attr) !== undefined,
        `expected to find data-test-id attribute`,
      )
    }
  }
  _chai.Assertion.addMethod('testId', testId)
})

cy.contains('#data-attributes li', 'first')
  .should('have.testId', 'first')
  // continue working with the original element
  .and('have.text', 'first')

// confirm the presence of the "data-test-id" attribute
cy.contains('#data-attributes li', 'first').should('have.testId')
```

<!-- fiddle-end -->
