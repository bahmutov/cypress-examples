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

Converting a browser object like `DOMStringMap` to a plain object using `JSON.parse(JSON.stringify(x))` is pretty common. If we use `cy.then(JSON.stringify).then(JSON.parse)` commands we are breaking retries because `cy.then` is not a query command.

## See also

- [Using data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)
- [data-\*](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*)
