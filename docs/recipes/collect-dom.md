# Collect Dom Values Example

<!-- fiddle Collect DOM values -->

Let's imagine a DOM where we don't have clear attributes / classes to pick different values, but the structure is pretty consistent. In the HTML below, the first `DIV` has the field names, and the next list of `DIV` elements follows the same structure:

```
<div>id</div>
<div>
  <div>fruit name</div>
  <div>fruit price</div>
  <div>available flag</div>
</div>
```

We need to extract the data from the DOM markup, create a list of objects, and confirm the extracted values.

```html
<div id="main">
  <div>
    <div>Fruit</div>
    <div>Price</div>
    <div>Available</div>
  </div>
  <div>
    <div>101</div>
    <div>
      <div>Apples</div>
      <div>$10</div>
      <div>true</div>
    </div>
  </div>
  <div>
    <div>102</div>
    <div>
      <div>Melons</div>
      <div>$15</div>
      <div>false</div>
    </div>
  </div>
</div>
```

```css hide
#main > div:first-child {
  font-weight: bold;
}
```

Let's confirm the titles

```js
function getTexts($li) {
  return Cypress._.map($li, 'innerText')
}
cy.get('#main > div:first-child div')
  .then(getTexts)
  .should('deep.equal', ['Fruit', 'Price', 'Available'])
```

Now let's extract the individual records, skipping the first `DIV`. We will create an object for each record, and push the object into the list called `records`.

```js
const records = []
cy.get('#main > div')
  // skip the titles DIV
  .not(':first')
  // iterate over each DIV after that
  .each(($div) => {
    // we need the text of the child DIVs
    const texts = getTexts($div.find('div'))
    const id = Number(texts[0])
    const fruit = texts[2]
    const price = texts[3]
    const available = texts[4] === 'true'
    records.push({ id, fruit, price, available })
  })
```

Now compare the records to the expected values.

```js
// make sure the assertion shows the full array
chai.config.truncateThreshold = 300
cy.wrap(records)
  // tip: print the extracted list to the DevTools console
  .then(console.table)
  .should('deep.equal', [
    { id: 101, fruit: 'Apples', price: '$10', available: true },
    { id: 102, fruit: 'Melons', price: '$15', available: false },
  ])
```

<!-- fiddle-end -->
