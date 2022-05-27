# Select from an optgroup

If you have a `<select>` element with [optgroup](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup), you might need to select a `<optgroup>` first, and then pick the value.

<!-- fiddle Select from an optgroup -->

```html
<select>
  <optgroup label="Group 1">
    <option>Option 1.1</option>
  </optgroup>
  <optgroup label="Group 2">
    <option>Option 2.1</option>
    <option>Option 2.2</option>
  </optgroup>
  <optgroup label="Group 3">
    <option>Option 3.1</option>
    <option>Option 3.2</option>
    <option>Option 3.3</option>
  </optgroup>
</select>
```

```js
// the first option is selected by default
cy.get('select')
  .should('have.value', 'Option 1.1')
  // get all <optgroup> elements
  .children()
  // pick the 3rd optgroup
  .eq(2)
  .should('have.attr', 'label', 'Group 3')
  // get the individual "<option>" elements
  .children()
  .should('have.length', 3)
  // let's select the middle option
  .eq(1)
  .invoke('text')
  .then((optionText) => {
    // https://on.cypress.io/select
    cy.get('select').select(optionText)
  })
// confirm we have selected the 2nd option
// of the 3rd optgroup element
cy.get('select').should('have.value', 'Option 3.2')
```

<!-- fiddle-end -->

## Duplicate value

Sometimes you might have duplicate values in the `select` element and need to select an option by index instead.

<!-- fiddle Select in the presence of duplicates -->

```html
<select>
  <!-- This optgroup shows recently selected options -->
  <optgroup label="Recent options">
    <option value="2.1">Option 2.1</option>
    <option value="3.2">Option 3.2</option>
    <option value="3.3">Option 3.3</option>
  </optgroup>
  <!-- which duplicates some of the options in the next groups -->
  <optgroup label="Group 1">
    <option value="1.1">Option 1.1</option>
  </optgroup>
  <optgroup label="Group 2">
    <option value="2.1">Option 2.1</option>
    <option value="2.1">Option 2.2</option>
  </optgroup>
  <optgroup label="Group 3">
    <option value="3.1">Option 3.1</option>
    <option value="3.2">Option 3.2</option>
    <option value="3.3">Option 3.3</option>
  </optgroup>
</select>
```

```js
// 🚨 CANNOT SELECT BY VALUE
// SINCE THE VALUE IS DUPLICATE
// cy.get('select').select('3.2')
//
// ✅ Select option by its index
cy.get('select')
  .find('option')
  .then(($option) => {
    // from the list of all options
    // find the first option with "value=3.2" attribute
    const index = Cypress._.findIndex(
      $option,
      (el) => el.getAttribute('value') === '3.2',
    )
    expect(index, 'found option').to.be.gte(0)
    // select the desired option by index to avoid
    // checking the value against duplicates
    cy.get('select').select(index)
  })
// confirm the selected value
cy.get('select').should('have.value', '3.2')
```

<!-- fiddle-end -->
