# Sorted dates

## Static list

Let's assume our page shows a static list of dates. We can grab the elements just once and convert the text content into dates. Then we can check if the list is sorted by sorting the timestamps ourselves and comparing the arrays.

<!-- fiddle Confirm the list of dates is sorted -->

```html
<ol id="dates">
  <li>Jan 2, 2019</li>
  <li>March 15, 2020</li>
  <li>Feb 20, 2022</li>
  <li>October 31, 2025</li>
</ol>
```

```js
cy.log('**using cy.then callback**')
cy.get('#dates li')
  // once the elements are present, they won't change
  // thus it is ok to pass the found elements into cy.then callback
  .then(($el) => {
    // extract timestamps from the elements
    const text = Cypress._.map($el, 'innerText')
    const dates = text.map((s) => new Date(s))
    const times = dates.map((d) => d.getTime())
    // confirm the list of timestamps is sorted
    const sorted = [...times].sort()
    expect(sorted, 'times are sorted').to.deep.equal(times)
  })
```

We can write a better and clearer chain of commands using [cypress-map](https://github.com/bahmutov/cypress-map) commands and [chai-sorted](https://www.chaijs.com/plugins/chai-sorted/) assertions.

```js
cy.log('**using cypress-map and chai-sorted**')
cy.get('#dates li') // yields jQuery object
  .map('innerText') // yields string[]
  .mapMake(Date) // yields Date[]
  .mapInvoke('getTime') // yields number[]
  .should('be.sorted') // confirms the numbers are sorted
```

<!-- fiddle-end -->

## Dynamic list

Let's change our application to show the list of dates first and then sort it. The above solution that uses [cypress-map](https://github.com/bahmutov/cypress-map) should work unchanged; the chain of queries retries the entire pipeline until the dates are sorted.

### Cypress-map solution

<!-- fiddle Confirm the list of dates is sorted after a delay -->

```html
<!-- initially the list is unsorted -->
<ol id="dates">
  <li>Jan 2, 2019</li>
  <li>October 31, 2025</li>
  <li>Feb 20, 2022</li>
  <li>March 15, 2020</li>
</ol>
```

```js app
setTimeout(() => {
  // set the sorted list of dates
  const dates = document.getElementById('dates')
  dates.innerHTML = `
    <li>Jan 2, 2019</li>
    <li>March 15, 2020</li>
    <li>Feb 20, 2022</li>
    <li>October 31, 2025</li>
  `
}, 2000)
```

```js
cy.log('**using cypress-map and chai-sorted**')
cy.get('#dates li') // yields jQuery object
  .map('innerText') // yields string[]
  .mapMake(Date) // yields Date[]
  .mapInvoke('getTime') // yields number[]
  .should('be.sorted') // confirms the numbers are sorted
```

<!-- fiddle-end -->

If we need to write plain Cypress test, we can retry querying the page by writing `cy.get(...).should(callback)` instead of `cy.get(...).then(callback)` test.

### Plain Cypress commands solution

<!-- fiddle Dynamic list is sorted (plain Cypress solution) -->

```html
<!-- initially the list is unsorted -->
<ol id="dates">
  <li>Jan 2, 2019</li>
  <li>October 31, 2025</li>
  <li>Feb 20, 2022</li>
  <li>March 15, 2020</li>
</ol>
```

```js app
setTimeout(() => {
  // set the sorted list of dates
  const dates = document.getElementById('dates')
  dates.innerHTML = `
    <li>Jan 2, 2019</li>
    <li>March 15, 2020</li>
    <li>Feb 20, 2022</li>
    <li>October 31, 2025</li>
  `
}, 2000)
```

```js
cy.log('**using cy.should callback**')
cy.get('#dates li')
  // elements WILL change, thus we need to run cy.get again
  // if the assertion fails, so we use cy.should(callback)
  .should(($el) => {
    // extract timestamps from the elements
    const text = Cypress._.map($el, 'innerText')
    const dates = text.map((s) => new Date(s))
    const times = dates.map((d) => d.getTime())
    // confirm the list of timestamps is sorted
    const sorted = [...times].sort()
    expect(sorted, 'times are sorted').to.deep.equal(times)
  })
```

<!-- fiddle-end -->
