# Skip Child Element

<!-- fiddle Skip child element -->

We need to get the "div#make" element's text, but without the text of the child element "span.picked".

```html
<div id="make">
  Honda Civic
  <span class="picked">(3 out of 4)</span>
</div>
```

```css hide
.picked {
  font-size: smaller;
  font-weight: lighter;
}
```

```js
// by default "trim()" returns the inner text of
// the element, including the children elements' text
cy.get('#make')
  .invoke('text')
  .invoke('trim')
  .should('equal', 'Honda Civic\n  (3 out of 4)')
```

To remove the `span.picked` from the found element, we can use the jQuery [`remove`](https://api.jquery.com/remove/) method. We must make sure we are not removing it from the page itself, thus we call jQuery [`clone`](https://api.jquery.com/clone/) method first.

```js
// clone the parent element,
// remove the child element we do not need
// to include in the text comparison
cy.get('#make')
  .invoke('clone')
  .then(($el) => {
    $el.find('.picked').remove()
    return $el.text().trim()
  })
  .should('equal', 'Honda Civic')
```

<!-- fiddle-end -->
