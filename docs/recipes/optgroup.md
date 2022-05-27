# Select by optgroup

If you have a `<select>` element with [optgroup](), you might need to select a `<optgroup>` first, and then pick the value.

<!-- fiddle Select by optgroup -->

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
    cy.get('select').select(optionText)
  })
// confirm we have selected the 2nd option
// of the 3rd optgroup element
cy.get('select').should('have.value', 'Option 3.2')
```

<!-- fiddle-end -->
