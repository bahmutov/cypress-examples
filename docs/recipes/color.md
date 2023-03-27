# Color

## Confirmed the declared CSS color

<!-- fiddle CSS color -->

Imagine we have an element that changes its color. We can confirm the CSS color attribute using "have.css" [jQuery Chai](https://www.chaijs.com/plugins/chai-jquery/) assertion.

```html
<div id="name">Joe</div>
<script>
  setTimeout(() => {
    const el = document.getElementById('name')
    el.style = 'color: red'
  }, 1500)
</script>
```

```js
cy.get('#name')
  // the current CSS definition is expressed in RGB triple string
  .should('have.css', 'color', 'rgb(255, 0, 0)')
```

<!-- fiddle-end -->

## Parent declared CSS color

The same assertion "have.css" works if the parent element sets its style.

<!-- fiddle Parent declares CSS color -->

```html
<div id="information">
  <div><strong>Personal information</strong></div>
  <div id="name">Joe</div>
</div>
<script>
  setTimeout(() => {
    const el = document.getElementById('information')
    el.style = 'color: red'
  }, 1500)
</script>
```

```js
cy.get('#name')
  // the current CSS definition is expressed in RGB triple string
  .should('have.css', 'color', 'rgb(255, 0, 0)')
```

<!-- fiddle-end -->

## Style class with CSS color

<!-- fiddle Style class with color -->

An applied CSS class with text color also can be detected using "have.css" assertion.

```html
<style>
  .information {
    color: red;
  }
</style>
<div id="information">
  <div><strong>Personal information</strong></div>
  <div id="name">Joe</div>
</div>
<script>
  setTimeout(() => {
    const el = document.getElementById('information')
    el.classList.add('information')
  }, 1500)
</script>
```

```js
cy.get('#name')
  // the current CSS definition is expressed in RGB triple string
  .should('have.css', 'color', 'rgb(255, 0, 0)')
```

<!-- fiddle-end -->
