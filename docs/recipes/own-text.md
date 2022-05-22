# Own text

<!-- fiddle Own text of an element -->

How do we confirm the button's _own_ text without including the text from any child elements?

```html
<button id="save">
  Save item
  <span class="status">Done!</span>
</button>
```

Using `have.text` or `include.text` assertions makes us dependent on the children elements and the whitespace characters.

```js
cy.get('button#save')
  .should('include.text', 'Save item')
  .and('have.text', '\n  Save item\n  Done!\n')
  .invoke('text')
  .should('equal', '\n  Save item\n  Done!\n')
```

Using DOM element's `innerText` property is slightly more convenient, as it strips the whitespace around each text node.

```js
cy.get('button#save').should(($el) => {
  expect($el[0].innerText, 'innerText').to.equal(
    'Save item Done!',
  )
})
```

**Tip:** look at the DOM element's `childNodes` property.

```js
cy.get('button#save').should(($el) => {
  const ownText = Cypress._.filter($el[0].childNodes, {
    nodeType: Node.TEXT_NODE,
  })
    .map((el) => el.textContent.trim())
    .filter(Boolean)
    .join(' ')
  expect(ownText, 'own text').to.equal('Save item')
})
```

Watch the video [Get And Confirm Element's Own Text Without Children Elements](https://youtu.be/yMiJj8qRx1s)

<!-- fiddle-end -->
