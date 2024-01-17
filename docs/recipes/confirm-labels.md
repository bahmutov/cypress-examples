# Confirm Labels

HTML `<input>` elements have `labels` property with the linked `<label>` elements for that input (if any). The labels are kept inside a `NodeList`. Let's see how we can use the labels in our tests.

## Confirm a single label

<!-- fiddle Confirm one input has a label -->

```html
<label for="accept">Accept terms</label>
<input type="checkbox" id="accept" />
```

```js
cy.get('input#accept')
  .should('have.prop', 'labels')
  // yields a NodeList
  .should('have.length', 1)
  // get the first DOM element
  .its('0')
  .and('have.text', 'Accept terms')
```

<!-- fiddle-end -->

## Confirm each input has a label

Let's go through every `input` element and confirm it has a corresponding label.

<!-- fiddle Confirm each input has a label -->

```html
<input type="checkbox" id="accept" />
<label for="accept">Accept terms</label>
<input type="checkbox" id="grapes" checked />
<label for="grapes">I ❤️ grapes</label><br />
<input type="checkbox" id="mango" />
<label for="mango">I ❤️ mango</label><br />
```

We can confirm that each input element has a matching label by going through the inputs, taking the id attribute, and looking for the label element with the matching `for=...` attribute.

```js
cy.log('**query the attribute**')
cy.get('input').each(($input) => {
  const id = $input.attr('id')
  cy.get(`label[for="${id}"]`)
})
```

Alternative: use the `labels` property of the `input` element.

```js
cy.get('input').each(($input) => {
  const element = $input[0]
  expect(element).to.have.property('labels')
  expect(element.labels.length).to.be.greaterThan(0)
})
```

<!-- fiddle-end -->
