# Positive number

Imagine a page component that initially shows zero, but then loads and shows a number. We want to confirm that number is positive.

<!-- fiddle Positive number -->

```html
<div id="app">
  <div id="points">0</div>
  <p>Total points</p>
</div>
```

```css hide
#points {
  font-weight: bold;
}
```

```html hide
<script>
  setTimeout(() => {
    const app = document.getElementById('app')
    app.innerHTML = `
      <div id="points">200</div>
      <p>Total points</p>
    `
  }, 1000)
</script>
```

My initial code will show a wrong solution. We will get the text of the element, convert it to a number, and then check if the number is greater than zero. Unfortunately, the `cy.then(parseInt)` stops the retries, plus the entire element `#points` is replaced anyway when the application overwrites it.

```js skip
// 🚨 DOES NOT WORK
cy.get('#points')
  .invoke('text')
  .then(parseInt)
  .should('be.greaterThan', 0)
```

Instead, let's wait for the number to appear by checking the `#points` element using the [cy.contains](https://on.cypress.io/contains) command. When the text matches a digit other than zero, we know the number has been loaded. We can then get the text, convert it to a number, and check if that number is above zero.

```js
cy.contains('#points', /[1-9]/)
  .invoke('text')
  .then(parseInt)
  .should('be.greaterThan', 0)
```

<!-- fiddle-end -->

## See alos

- recipe [Compare two numbers](./compare-numbers.md)
