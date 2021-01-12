# Selected value

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
