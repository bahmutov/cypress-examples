# Same Text

## Two text elements

Imagine you have two elements on the page. You do not know the exact text, but you know it should be the same.

<!-- fiddle Two text elements -->

```html
<h2 id="one">a moth</h2>
<p>
  The next paragraph is about <span id="subject">a moth</span>
</p>
```

```css hide
#subject {
  font-weight: bolder;
}
```

Any time you get something from the page, you can use it inside the `cy.then(callback)` function.

```js
cy.get('#one')
  .invoke('text')
  .then((text) => {
    cy.contains('#subject', text)
  })
```

<!-- fiddle-end -->

## Three elements

Once you get a value from the page, you can use it to check multiple elements. In the example below we pick a random `<select>` option, then confirm the application is showing the selected text in a couple of places.

<!-- fiddle Three elements -->

```html hide
<select id="fruit">
  <option value="apples">Apples</option>
  <option value="grapes">Grapes</option>
  <option value="bananas">Bananas</option>
</select>
<p>
  <div>You have selected <span id="selected-fruit"></span></div>
  <div><span id="name"></span> are delicious</div>
</p>
<script>
  document
    .getElementById('fruit')
    .addEventListener('change', (e) => {
      const fruit = e.target.value
      document.getElementById('selected-fruit').innerText = fruit
      document.getElementById('name').innerText = fruit
    })
</script>
```

Let's select a random fruit option, then check the two places that should be updated.

```js
cy.get('#fruit option')
  .should('have.length.greaterThan', 1)
  // cy.mapInvoke, cy.print, cy.sample
  // come from cypress-map plugin
  .mapInvoke('getAttribute', 'value')
  .print()
  .sample()
  .print('Picked randomly %o')
  .then((randomFruit) => {
    cy.get('#fruit').select(randomFruit)
    cy.contains('#selected-fruit', randomFruit)
    cy.contains('#name', randomFruit)
  })
```

**Tip:** we are using several utility queries like `cy.mapInvoke` and `cy.print` from the [cypress-map](https://github.com/bahmutov/cypress-map) plugin.

<!-- fiddle-end -->
