# Same Text

📺 You can watch this recipe explained in the video [Confirm The Same Text In A Couple Of Elements](https://youtu.be/xvImOlCSul4).

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
cy.get('h2#one')
  .invoke('text')
  .then(function (text) {
    cy.contains('#subject', text)
  })
```

<!-- fiddle-end -->

## Three elements

Once you get a value from the page, you can use it to check multiple elements. In the example below we pick a random `<select>` option, then confirm the application is showing the selected text in a couple of places.

<!-- fiddle.skip Three elements -->

```html
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
      console.log('picked', fruit)
      document.getElementById('selected-fruit').innerText = fruit
      document.getElementById('name').innerText = fruit
    })
</script>
```

Let's select a random fruit option, then check the two places that should be updated.

```js
cy.get('#fruit option')
  .should('have.length.greaterThan', 2)
  .mapInvoke('getAttribute', 'value')
  .print()
  .sample()
  .print('picked %o')
  .then(function (name) {
    // found the cy.select to be flaky
    cy.get('#fruit').select(name)
    cy.contains('#selected-fruit', name)
    cy.contains('#name', name)
  })
```

**Tip:** we are using several utility queries like `cy.mapInvoke` and `cy.print` from the [cypress-map](https://github.com/bahmutov/cypress-map) plugin.

<!-- fiddle-end -->
