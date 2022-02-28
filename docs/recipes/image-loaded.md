# Image Has Loaded

To check if an image has successfully loaded, check its property `naturalWidth`. It is only set if the browser downloaded and displayed the image.

<!-- fiddle Image has loaded -->

Here is an image that successfully loads.

```html
<img
  id="loads"
  src="https://glebbahmutov.com/images/warming-stripes.png"
  width="400"
  height="50"
/>
```

```js
cy.get('#loads')
  .should('be.visible')
  .and('have.prop', 'naturalWidth')
  .should('be.greaterThan', 0)
```

<!-- fiddle-end -->

Watch the video [Check If An Image Loads](https://youtu.be/R79ai463xIM).
