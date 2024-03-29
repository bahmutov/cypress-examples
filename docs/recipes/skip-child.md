# Skip Child Element

Watch this recipe examples in my video [Remove Child Element Before Comparing The Element's Own Text](https://youtu.be/h5fdNd-SN8k).

## Remove child elements by selector

<!-- fiddle Remove child elements by selector -->

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

## Remove all children elements

<!-- fiddle Remove all children elements -->

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
cy.get('#make')
  .invoke('clone')
  .then(($el) => {
    // remove all children elements
    // leaving just the element itself
    $el.children().remove()
    return $el.text().trim()
  })
  .should('equal', 'Honda Civic')
```

<!-- fiddle-end -->

## Use a test selector

Instead of removing children elements, a better solution would be to have a test selector for the element we are interested in.

<!-- fiddle Use a test selector -->

```html
<div id="make">
  <span class="model">Honda Civic</span>
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
// using cy.get() plus assertion combination
cy.get('#make .model').should('have.text', 'Honda Civic')
// or even simpler by using cy.contains command
cy.contains('#make .model', 'Honda Civic')
```

<!-- fiddle-end -->

## See also

- [Own text recipe](./own-text.md)
