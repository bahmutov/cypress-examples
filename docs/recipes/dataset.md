# Dataset HTML attributes

You can store non-html information in the element `data-*` attributes and access them via `dataset` property.

## Convert dataset to a plain object

📺 Watch this recipe explained at [Confirm All HTML data- Attributes At Once By Using The dataset Property](https://youtu.be/t8BSY2czges).

<!-- fiddle Using data attributes -->

```html
<article
  id="electric-cars"
  data-columns="3"
  data-index-number="12314"
  data-parent="cars"
>
  All about electric cards
</article>
```

All `data-*` properties are collected in a single object. Property names are camel-cased, all values are strings. We can confirm a single property

```js
cy.get('article#electric-cars')
  .should('have.prop', 'dataset')
  .its('indexNumber')
  .should('equal', '12314')
// equivalent to checking the "data-*" attribute
cy.get('article#electric-cars').should(
  'have.attr',
  'data-index-number',
  '12314',
)
```

Let's try confirming all `data-*` attributes. Directly comparing property with an object does not work

```js skip
// 🚨 INCORRECT
// cannot compare dataset object with a plain object
cy.get('article#electric-cars').should('have.prop', 'dataset', {
  columns: '3',
  indexNumber: '12314',
  parent: 'cars',
})
```

Instead, yield the `dataset` value and convert into a plain object first before using `deep.equal` assertion.

```js
cy.get('article#electric-cars')
  // yields "DOMStringMap" object
  .should('have.prop', 'dataset')
  // which we can convert into an object
  .then(JSON.stringify)
  .then(JSON.parse)
  // and compare as plain object
  .should('deep.equal', {
    columns: '3',
    indexNumber: '12314',
    parent: 'cars',
  })
```

**Tip:** you can use [cy-spok](https://github.com/bahmutov/cy-spok) to confirm object properties.

<!-- fiddle-end -->

## Query commands

Converting a browser object like `DOMStringMap` to a plain object using `JSON.parse(JSON.stringify(x))` is pretty common. If we use `cy.then(JSON.stringify).then(JSON.parse)` commands we are breaking retries because `cy.then` is not a query command. I suggest using my plugin [cypress-map](https://github.com/bahmutov/cypress-map) and its query commands to convert `DOMStringMap` to a plain JavaScript object.

<!-- fiddle Convert dataset with retries -->

In the example below, one of the data attributes is set after a delay.

```html
<article
  id="electric-cars"
  data-columns="3"
  data-index-number="loading..."
  data-parent="cars"
>
  All about electric cards
</article>
<script>
  // force the tests to retry by adding "data-index-number" attribute
  // after some delay
  setTimeout(() => {
    document
      .getElementById('electric-cars')
      .setAttribute('data-index-number', '12314')
  }, 1500)
</script>
```

If we simply use `cy.then(...)` callbacks to convert data collection into a plain object, it would convert it once and then try running the assertions. But it would not retry, thus failing the test.

```js skip
// 🚨 INCORRECT
// does not retry getting the attributes
cy.get('article')
  .should('have.prop', 'dataset')
  .then(JSON.stringify)
  .then(JSON.parse)
  .should('deep.equal', {
    columns: '3',
    indexNumber: '12314',
    parent: 'cars',
  })
```

We can keep querying the DOM and converting to a plain object until the assertion passes. A simple built-in way to do this is to replace `cy.then(callback)` with `cy.should(callback)` and let it retry

```js skip
// ✅ retries fetching attributes
cy.get('article')
  .should('have.prop', 'dataset')
  // a callback that converts dataset
  // and checks its values
  .should((dataset) => {
    const data = JSON.parse(JSON.stringify(dataset))
    expect(data, 'data-').to.deep.equal({
      columns: '3',
      indexNumber: '12314',
      parent: 'cars',
    })
  })
```

**Alternative:** use the query commands `cy.toPlainObject`, `cy.map`, and `cy.print` from [cypress-map](https://github.com/bahmutov/cypress-map) plugin. This way we can split all steps into smaller simpler subject transformations.

```js
cy.get('article')
  .should('have.prop', 'dataset')
  // "cy.toPlainObject" comes from cypress-map
  .toPlainObject()
  // convert the property "columns" to a number
  // leaving the rest of the properties unchanged
  .map({
    columns: Number,
  })
  .print('dataset %o')
  .should('deep.equal', {
    columns: 3,
    indexNumber: '12314',
    parent: 'cars',
  })
```

We can even map some property values to convert them before the assertion. For example, we can convert the number of columns from the string "3" to the number 3. Again, `cy.map` from `cypress-map` is our friend here:

<!-- fiddle-end -->

## List of elements

Let's confirm the data attributes from a list of elements. For example, let's confirm the `data-product-id` for every list element.

<!-- fiddle List of elements -->

```html
<ul class="a-list" data-list-type="products">
  <li data-product-id="001">Product A</li>
  <li data-product-id="002">Product B</li>
  <li data-product-id="003">Product C</li>
</ul>
```

```js
cy.get('.a-list')
  .should('have.attr', 'data-list-type', 'products')
  .children('li')
  // cy.map comes from cypress-map plugin
  .map('dataset.productId')
  .should('deep.equal', ['001', '002', '003'])
```

<!-- fiddle-end -->

## See also

- [Using data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)
- [data-\*](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*)
