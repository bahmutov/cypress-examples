# Computed style

Let's say we want to find all anchor links that are red. They could be red because of the inline style, or some CSS class. We need to filter all anchor links by the computed style. Let's use a combination of [cy.get](https://on.cypress.io/get) and [cy.filter](https://on.cypress.io/filter) commands.

<!-- fiddle Red anchors -->

```html
<a href="article1.html" class="help external">Article 1</a>
<a href="article2.html" class="help">Article 2</a>
<a href="article3.html" class="help external">Article 3</a>
<a href="index.html" class="help" style="color: red"
  >Full Index</a
>
<style>
  .external {
    color: red;
  }
</style>
```

```js
cy.get('a')
  // using the jQuery filter function
  // https://api.jquery.com/filter/
  // to filter all elements yielded by the parent command
  .filter((k, el) => {
    const color = window.getComputedStyle(el).color
    // the computed color is an RGB string
    // with each channel going from 0 to 255
    return color === 'rgb(255, 0, 0)'
  })
  // 3 anchor links are red
  .should('have.length', 3)
```

<!-- fiddle-end -->
