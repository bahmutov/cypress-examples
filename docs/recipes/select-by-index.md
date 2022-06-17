# Select value by partial text via its index

<!-- fiddle Select value by partial text via its index -->

```html
<select>
  <option value="270">Green apples</option>
  <option value="381">Fresh oranges</option>
  <option value="718">Juicy melons</option>
</select>
```

How would we select the option with the text "melon"? We need to find it using a partial text match using the [cy.contains](https://on.cypress.io/contains), then grab the index of the element among its siblings, and then use the index to select the option.

```js
cy.get('select option')
  .contains('melon')
  .invoke('index')
  .then((index) => {
    cy.get('select').select(index)
  })
// confirm the selected value
cy.get('select').should('have.value', '718')
```

<!-- fiddle-end -->
