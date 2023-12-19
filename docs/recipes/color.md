# Color

📺 Watch this recipe explained in [Check CSS Color Using jQuery-Chai Assertion "have.css"](https://youtu.be/A54BmxosAzI).

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

## Parse RGB with retries

📺 Watch this example explained in the video [Parse RGB Color With Retries](https://youtu.be/Cn3Xx4w0OeQ).

<!-- fiddle Parse RGB with retries -->

```html hide
<style>
  .information {
    color: red;
  }
</style>
<div id="information">Joe</div>
<script>
  const el = document.getElementById('information')
  el.addEventListener('click', () => {
    setTimeout(() => {
      el.classList.add('information')
    }, 1500)
  })
</script>
```

Using query commands from [cypress-map](https://github.com/bahmutov/cypress-map) to write a retryable chain that queries the element's color, parses it into RGB array of numbers, and confirms the numbers.

**Tip:** using [named capturing groups](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Named_capturing_group)

**Note:** we cannot extract the color using an assertion `should('have.css', 'color')` because it will break retrying the entire chain.

```js
cy.get('#information').click()
cy.get('#information')
  .invoke('css', 'color')
  .invoke(
    'match',
    /^rgb\((?<red>\d+)\, (?<green>\d+)\, (?<blue>\d+)\)$/,
  )
  .print()
  .its('groups')
  // transform each string into a number
  .map({
    red: Number,
    green: Number,
    blue: Number,
  })
  .print()
  .should('deep.equal', {
    red: 255,
    green: 0,
    blue: 0,
  })
```

<!-- fiddle-end -->
