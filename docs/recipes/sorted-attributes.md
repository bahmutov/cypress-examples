# Sorted Attributes

<!-- fiddle Dynamic list with attributes -->

Let's take a dynamically populated list of items.

```html hide
<ul id="purchases"></ul>
<script>
  const ul = document.getElementById('purchases')
  setTimeout(() => {
    ul.innerHTML += '<li data-sku="0044B">Chair</li>'
  }, 1000)
  setTimeout(() => {
    ul.innerHTML += '<li data-sku="00500A">Table</li>'
  }, 2000)
  setTimeout(() => {
    ul.innerHTML += '<li data-sku="00100C">Bed</li>'
  }, 2500)
  setTimeout(() => {
    ul.innerHTML += '<li data-sku="00991C">Frame</li>'
  }, 3000)
</script>
```

Each element in the list has `data-sku` attribute. Can we confirm the final list of attributes? We do not care about the order of the items, so we want to confirm the sorted list of attributes.

```js
// the sorted expected SKU numbers
const skus = ['00991C', '00100C', '00500A', '0044B'].sort()
```

Let's use [cypress-map](https://github.com/bahmutov/cypress-map) to map all found DOM elements to their attribute `data-sku` and then sort the array of strings.

**Tip:** increase the Chai truncate threshold to see both arrays in the assertion

```js
chai.config.truncateThreshold = 300
cy.get('#purchases li')
  // cy.mapInvoke from cypress-map
  .mapInvoke('getAttribute', 'data-sku')
  .invoke('sort')
  // cy.print from cypress-map
  .print()
  .should('deep.equal', skus)
```

Alternative solution: use `cy.map` from `cypress-map` to get the `data-...` attributes.

```js
cy.log('**use cy.map**')
cy.get('#purchases li')
  // get the "data-sku" from each DOM element
  .map('dataset.sku')
  .invoke('sort')
  .should('deep.equal', skus)
```

If you cannot use `cypress-map`, you should write a single `should(callback)` to keep extracting the data attributes and compare them to the expected list.

```js
cy.log('**use should(callback)**')
cy.get('#purchases li').should(($elements) => {
  // a single callback to process and assert the attributes
  const attrs = $elements
    .toArray()
    .map((li) => {
      return li.dataset.sku
    })
    .sort()
  expect(attrs).to.deep.equal(skus)
})
```

<!-- fiddle-end -->
