# Disabled button

<!-- fiddle Button becomes enabled -->

Command `cy.click` automatically waits for the element to be enabled before clicking.

📺 Watch this example in the video [A Cypress Example With Disabled Button And Has Text jQuery Selectors](https://youtu.be/GYW4vIehd6Y).

```html
<div>
  <label>My button</label>
  <button disabled>Click</button>
</div>
<script>
  setTimeout(() => {
    document
      .querySelector('div button')
      .removeAttribute('disabled')
  }, 1000)
</script>
```

```js
cy.get('div')
  .find('button')
  // this assertion is optional
  // .should('not.be.disabled')
  .click()
```

<!-- fiddle-end -->
