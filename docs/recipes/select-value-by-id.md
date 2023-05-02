# Select value by test id

If we have a `<select>` element with individual options with `data-testid` attribute, we can select an option and verify its text. First, we get the option with the given test id attribute and grab its value. Using the value we can select the option.

<!-- fiddle -->

```html
<select data-testid="select-example">
  <option data-testid="pick-apples" value="270">Apples</option>
  <option data-testid="pick-oranges" value="381">Oranges</option>
  <option data-testid="pick-watermelon" value="889">
    Watermelon
  </option>
</select>
```

```js
// let's find the option with the given test-id
const optionid = 'pick-oranges'
cy.get('[data-testid=select-example]')
  .find(`option[data-testid=${optionid}]`)
  .invoke('attr', 'value')
  .then((value) => {
    // now that we know the value of the <option>
    cy.get('[data-testid=select-example]').select(value)
  })
// confirm the selected option
cy.get('[data-testid=select-example] option:selected').should(
  'have.text',
  'Oranges',
)
```

<!-- fiddle-end -->
