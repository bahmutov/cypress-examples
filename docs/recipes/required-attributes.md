# Required Attributes

Imagine a form with multiple input fields. Some of them are optional, some are required. Let's confirm that a certain list of input fields has elements with the `required` attribute.

<!-- fiddle required attributes -->

```html hide
<form class="action-form">
  <div class="form-group">
    <label for="item">Item (*)</label>
    <input
      type="text"
      class="form-control"
      id="item"
      name="item"
      required
    />
  </div>
  <div class="form-group">
    <label for="count">Count (*)</label>
    <input
      type="number"
      class="form-control"
      id="count"
      name="count"
      required
    />
  </div>
  <div class="form-group">
    <label for="couponCode1">Coupon Code</label>
    <input
      type="text"
      class="form-control"
      id="couponCode1"
      name="coupon"
    />
  </div>
  <div class="form-group">
    <label for="ZipCode">Zip code (*)</label>
    <input
      type="text"
      class="form-control"
      id="ZipCode"
      name="ZipCode"
      required
    />
  </div>
</form>
```

Let's confirm that the user must enter the item's name, its quantity, and the delivery zip code. We will use a single `should(callback)` syntax to ensure the check retries.

```js
cy.get('input[required]').should(($inputs) => {
  const names = $inputs
    .toArray()
    .map((el) => el.getAttribute('name'))
    // sort the names to avoid the test breaking
    // if we rearrange the inputs on the page
    .sort()
  expect(names, 'required inputs').to.deep.equal([
    'ZipCode',
    'count',
    'item',
  ])
})
```

We can write the same test concisely using [cypress-map](https://github.com/bahmutov/cypress-map) queries.

```js
cy.get('input[required]')
  // cy.mapInvoke query comes from cypress-map plugin
  .mapInvoke('getAttribute', 'name')
  .invoke('sort')
  .should('deep.equal', ['ZipCode', 'count', 'item'])
```

<!-- fiddle-end -->