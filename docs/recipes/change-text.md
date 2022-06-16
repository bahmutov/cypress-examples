# Change textContent

<!-- fiddle Change textContent -->

```html
<div id="name">Anonymous</div>
```

```js
cy.contains('Joe').should('not.exist')
// we can change the "innerText" using
// the jQuery "text()" method
cy.get('#name').invoke('text', 'Joe')
// to specifically confirm the "textContent"
// we grab the DOM element from the jQuery object
cy.contains('#name', 'Joe').should(($el) => {
  expect($el[0]).to.have.property('textContent', 'Joe')
})
```

To change the "textContent" we need to use the DOM element that we can get from the jQuery

```js
cy.contains('#name', 'Joe').then(($el) => {
  $el[0].textContent = 'Mary'
})
// the text has been changed
cy.contains('#name', 'Mary')
```

<!-- fiddle-end -->
