# Array Includes A Primitive Value

<!-- fiddle Checking array -->

```js
const countries = ['Germany', 'US', 'Denmark', 'China']
// explicit assertion
expect(countries, 'Denmark is a country').to.include('Denmark')
```

You can check the current subject with automatic retries

```js
const ages = []
// implicit assertion on the current subject
cy.wrap(ages, { log: false })
  // "include" and "contain" are aliases to the same assertion
  .should('include', 30)
  .and('contain', 42)
  // the values are strictly equal, so "42" is not the same as 42
  .and('not.include', '42')
// the array is modified at some point
setTimeout(() => {
  ages.push(10)
}, 500)
setTimeout(() => {
  ages.push(30)
}, 1000)
setTimeout(() => {
  ages.push(42)
}, 1500)
```

<!-- fiddle-end -->

## See also

- [Array includes another array](./array-includes-another-array.md)
