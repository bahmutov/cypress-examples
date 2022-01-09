# Confirm the sorted list

## Static list

Let's confirm that all `<LI>` elements are sorted by the prices displayed inside. The price is a child element with its own selector, but could have additional text words there like 'On Sale'.

<!-- fiddle Confirm the static list is sorted -->

```html
<ol>
  <li class="item">Pin <span class="price">$1.50</span></li>
  <li class="item">
    Notebook <span class="price">$1.99 10% off</span>
  </li>
  <li class="item">
    Water bottle <span class="price">$3.50 on sale</span>
  </li>
  <li class="item">
    Backpack <span class="price">$42.99</span>
  </li>
</ol>
<style>
  .item {
    margin: 1em 0;
  }
  .price {
    background-color: gold;
    text-transform: uppercase;
    font-weight: bold;
    padding: 0.25em 0.5em;
    border-radius: 1em;
  }
</style>
```

First, let's confirm each item element has a price element by confirming the two numbers are equal.

```js
cy.get('.item')
  // use the "have.length.gt" assertion to retry
  // until there are items on the page
  .should('have.length.gt', 1)
  .then((items) => {
    // confirm the numbers of elements are equal
    cy.get('.price').should('have.length', items.length)
  })
```

Now we can extract all the prices (as strings), clean them up, and convert to numbers, before confirming the list is sorted.

```js
cy.get('.price')
  .then(($prices) =>
    Cypress._.map($prices, (el) => el.innerText),
  )
  // because cy.log returns nothing, the original list continues
  .then((list) => cy.log(list.slice(0, 3).join(', ')))
  // only the first word is the price
  .then((list) => list.map((text) => text.split(' ')[0]))
  .then((list) => list.map((str) => str.replace(/[^0-9.]/g, '')))
  .then((list) => cy.log(list.slice(0, 3).join(', ')))
  .then((list) => list.map(parseFloat))
  .then((list) => cy.log(list.slice(0, 3).join(', ')))
  .then((list) => {
    // confirm the list is sorted by sorting it using Lodash
    // and comparing the original and sorted lists
    const sorted = Cypress._.sortBy(list)
    expect(sorted).to.deep.equal(list)
    // we can also confirm each number is between min and max
    sorted.forEach((price) => {
      expect(price).to.be.within(1, 1000)
    })
  })
```

Of course, the above code has a lot of duplication and is hard to read. You should refactor it to make it easy to understand. For example, we could avoid using individual `.then` commands and just extract the prices in a single callback.

```js
// alternative: extract and convert the prices using single .then callback
cy.get('.price').then(($prices) => {
  const innerText = (el) => el.innerText
  const firstWord = (text) => text.split(' ')[0]
  const justDigits = (str) => str.replace(/[^0-9.]/g, '')
  const prices = Cypress._.map($prices, (el) =>
    parseFloat(justDigits(firstWord(innerText(el)))),
  )
  // confirm the "prices" array is already sorted
  const sorted = Cypress._.sortBy(prices)
  expect(sorted).to.deep.equal(prices)
  return prices
})
```

<!-- fiddle.end -->

## Dynamic sorted table

Imagine we have a table that is NOT sorted at first, but it gets sorted on a click.

<!-- fiddle Confirm the table is sorted -->

```html
<style>
  table td {
    border: 3px solid black;
    padding: 3px 5px;
  }
  #sort-by-date {
    margin: 10px 0px;
  }
</style>
<table id="people">
  <thead>
    <tr>
      <td>Name</td>
      <td>Date (YYYY-MM-DD)</td>
    </tr>
  </thead>
  <tbody id="people-data">
    <tr>
      <td>Dave</td>
      <td>2023-12-23</td>
    </tr>
    <tr>
      <td>Cary</td>
      <td>2024-01-24</td>
    </tr>
    <tr>
      <td>Joe</td>
      <td>2022-02-25</td>
    </tr>
    <tr>
      <td>Anna</td>
      <td>2027-03-26</td>
    </tr>
  </tbody>
</table>
<button id="sort-by-date">Sort by date</button>
<button id="sort-reverse">Reverse sort</button>
<script>
  function sortTable() {
    document.getElementById('people-data').innerHTML = `
      <tr><td>Joe</td><td>2022-02-25</td></tr>
      <tr><td>Dave</td><td>2023-12-23</td></tr>
      <tr><td>Cary</td><td>2024-01-24</td></tr>
      <tr><td>Anna</td><td>2027-03-26</td></tr>
    `
  }
  function reverseSortTable() {
    document.getElementById('people-data').innerHTML = `
      <tr><td>Anna</td><td>2027-03-26</td></tr>
      <tr><td>Cary</td><td>2024-01-24</td></tr>
      <tr><td>Dave</td><td>2023-12-23</td></tr>
      <tr><td>Joe</td><td>2022-02-25</td></tr>
    `
  }
  document
    .getElementById('sort-by-date')
    .addEventListener('click', function () {
      // sort the table after some random interval
      setTimeout(sortTable, Math.random() * 2000 + 500)
    })
  document
    .getElementById('sort-reverse')
    .addEventListener('click', function () {
      // sort the table after some random interval
      setTimeout(reverseSortTable, Math.random() * 2000 + 500)
    })
</script>
```

```js
cy.get('#people').scrollIntoView()
cy.get('#sort-by-date').click()
// confirm the second column is sorted at some time later
// Tip: select the cells in the second column using "tbody td + td" selector
cy.get('table#people tbody td + td').should(($cells) => {
  // tip: Lodash has a shortcut notation
  // instead of _.map($cells, ($cell) => $cell.innerText)
  // you can write _.map($cells, 'innerText')
  const timestamps = Cypress._.map(
    $cells,
    ($cell) => $cell.innerText,
  )
    .map((str) => new Date(str))
    .map((d) => d.getTime())
  // check if the timestamps are sorted
  const sorted = Cypress._.sortBy(timestamps)
  expect(timestamps, 'sorted timestamps').to.deep.equal(sorted)
})
```

You can find the explanation for the above test in the video [Confirm The Table Is Sorted By A Column](https://youtu.be/21MXha13qCU).

For convenience, you can use 3rd party Chai assertions, for example [chai-sorted](https://www.chaijs.com/plugins/chai-sorted/). We have already registered the `chai-sorted` in the support file `cypress/support/index.js`

```js
cy.get('table#people tbody td + td').should(function ($cells) {
  // again, convert the date strings into timestamps
  const timestamps = Cypress._.map(
    $cells,
    ($cell) => $cell.innerText,
  )
    .map((str) => new Date(str))
    .map((d) => d.getTime())
  // and use an assertion from chai-sorted to confirm
  expect(timestamps).to.be.sorted()
})
// notice that after sorting, the first column of names
// is also sorted by in reverse alphabetical order
// Let's confirm this by grabbing inner text from each cell
cy.get('table#people tbody td +').should(($cells) => {
  const names = Cypress._.map($cells, ($cell) => $cell.innerText)
  expect(names).to.be.ascending
})
```

You can take advantage of advanced Lodash methods, for example you can wrap the entire jQuery object and conveniently extract the inner text from every element, convert strings to dates, then to timestamps, and check if they are sorted.

```js
cy.log('**reverse sort**')
cy.get('#sort-reverse').click()
cy.get('table#people tbody td + td').should(($cells) => {
  expect(
    Cypress._($cells) // wrap jQuery object
      .map('innerText') // extract "innerText" from each element
      .map((s) => new Date(s)) // convert string to Date
      .invokeMap('getTime') // convert Date to timestamp
      .value(), // get back an array of timestamps
  ).to.be.descending
})
```

<!-- fiddle.end -->
