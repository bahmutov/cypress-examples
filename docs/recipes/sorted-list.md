# Confirm the sorted list

## Static list

Let's confirm that all `<LI>` elements are sorted by the prices displayed inside. The price is a child element with its own selector, but could have additional text words there like 'On Sale'.

<!-- fiddle Confirm the sorted list -->

```html
<ol>
  <li class="item">Pin <span class="price">$1.50</span></li>
  <li class="item">
    Notebook <span class="price">$1.99 10% off</span>
  </li>
  <li class="item">
    Water bottle <span class="price">$3.50 on sale</span>
  </li>
  <li class="item">Backpack <span class="price">$42.99</span></li>
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
  .then(($prices) => Cypress._.map($prices, (el) => el.innerText))
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
