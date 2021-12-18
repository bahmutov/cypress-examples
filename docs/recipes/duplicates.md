# Checking for duplicates

## Checking the list for duplicates

<!-- fiddle List does not have duplicates -->

```html
<ul>
  <li>Apples</li>
  <li>Oranges</li>
  <li>Bananas</li>
</ul>
```

The check below reports if the array of unique elements has the same length as the original. It does not report which elements are duplicates.

```js
// destructure Cypress._ for convenience
const { map, uniq, countBy, pickBy } = Cypress._
cy.get('li')
  // wait for the list to be stable
  .should('have.length', 3)
  .and(($list) => {
    const values = Cypress._.map($list, 'innerText')
    const distinct = uniq(values)
    expect(distinct, 'all strings are different').to.have.length(
      values.length,
    )
  })
```

If you need to report the duplicate elements, I suggest using Lodash `countBy` and `pickBy` functions and reporting all entries with the count larger than 1.

```js
cy.get('li').should(($list) => {
  const counts = countBy(map($list, 'innerText'))
  const duplicates = pickBy(counts, (n) => n > 1)
  expect(duplicates, 'duplicates').to.be.empty
})
```

<!-- fiddle-end -->

## Checking for duplicate attributes

Let's say we need to compare the items by an attribute and detect any duplicates. Grab all the items and build the assertion inside the `should(cb)` function for [retry-ability](https://on.cypress.io/retry-ability).

<!-- fiddle Items do not have duplicate attributes -->

```html
<ul>
  <li data-product-id="a11">Apples</li>
  <li data-product-id="b20">Oranges</li>
  <li data-product-id="c11">Bananas</li>
</ul>
```

```js
// destructure Cypress._ for convenience
const { map, countBy, pickBy } = Cypress._
cy.get('li').should(($list) => {
  const ids = map($list, ($el) => $el.getAttribute('data-product-id'))
  const counts = countBy(ids)
  const duplicates = pickBy(counts, (n) => n > 1)
  expect(duplicates, 'duplicates').to.be.empty
})
```

<!-- fiddle-end -->
