# Selected value

## Option's value

<!-- fiddle Selected value -->

```html
<select>
  <option value="456">apples</option>
  <option value="457">oranges</option>
  <option value="458">bananas</option>
</select>
```

Let's select the option "oranges" and see what value it has. We can use [cy.select](https://on.cypress.io/select) It yields the jQuery for the original `<select>` element.

```js
cy.get('select')
  .select('oranges')
  .should(($el) => {
    expect(Cypress.dom.isElement($el), 'yields DOM element').to.be
      .true
    expect(Cypress.dom.isJquery($el), 'wrapped in jQuery').to.be.true
    // note: the yielded element is the <select>
    expect($el.prop('nodeName'), 'element type').to.equal('SELECT')
    expect($el.val(), 'option value').to.equal('457')
  })
// shorter assertion using chaining
cy.get('select')
  .select('oranges')
  .invoke('val')
  .should('equal', '457')
// you can yield the value without retrying
cy.get('select')
  .select('oranges')
  .invoke('val')
  .then((value) => {
    expect(value).to.equal('457')
  })
```

<!-- fiddle-end -->

You can select multiple options, yielding list of elements

<!-- fiddle Selected multiple values -->

```html
<select multiple>
  <option value="456">apples</option>
  <option value="457">oranges</option>
  <option value="458">bananas</option>
</select>
```

```js
cy.get('select')
  .select(['apples', 'bananas']) // yields <select> element
  .invoke('val') // calls $(<select>).val() which returns list of selected values
  .should('deep.equal', ['456', '458'])
```

<!-- fiddle-end -->

## Selecting option by index

<!-- fiddle Select by index -->

Imagine we have a `<select>` element and want to select an option _by index_. Let's say we want to select the option at index 1 and confirm it has text "oranges" and value "457".

```html
<select>
  <option value="456">apples</option>
  <option value="457">oranges</option>
  <option value="458">bananas</option>
</select>
```

```js
// every child of <select> is an <option> element
cy.get('select')
  .children()
  .eq(1)
  .then(($option) => {
    expect($option.prop('label'), 'cannot compare 🍎 to 🍊').to.equal(
      'oranges',
    )

    const value = $option.attr('value')
    expect(value).to.equal('457')
    // if we want to select the oranges,
    // let's use the value we got
    cy.get('select').select(value)
  })
// let's confirm the selected option
cy.get('select').invoke('val').should('equal', '457')
```

<!-- fiddle-end -->
