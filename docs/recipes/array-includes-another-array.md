# Array includes another array

<!-- fiddle Array includes another array -->

```js
const countries = ['Germany', 'US', 'Denmark', 'China']
const list = ['China', 'US']
// we want to check if the "countries" array includes
// every country on the given list
list.forEach((country) => {
  expect(countries).to.include(country)
})
const difference = Cypress._.difference(list, countries)
expect(difference, 'extra countries').to.be.empty
```

We can also approach the problem differently. We can compute the difference between the small list and the large list using Lodash `_.difference` method. If the small list is included in the large list, then the small list should be empty. Otherwise, we get an error with the countries not on the list.

<!-- fiddle-end -->
