# OR Attributes assertion

Let's confirm that an element we found has an attribute X OR has an attribute Y.

<!-- fiddle OR attributes -->

```html
<div id="person1" data-name="A">first person</div>
<div id="person2" data-job="B">second person</div>
```

We want to confirm the given element either has the `data-name` attribute or has the `data-job` attribute. We can write such non-deterministic logic using `should(callback)` function.

```js
function hasAttribute($el) {
  if ($el.attr('data-name') || $el.attr('data-job')) {
    // all good, the element has one of the attributes
  } else {
    throw new Error('Missing the attributes')
  }
}

cy.get('#person1').should(hasAttribute)
cy.get('#person2').should(hasAttribute)
```

<!-- fiddle-end -->
