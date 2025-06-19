# Contains text in a list

Let's take a list and check if it contains a given text string. We can write this test in several ways.

📺 Watch the video [Find Text Item Without Flake Using cy.contains Command](https://youtu.be/RyHSIk7nzD0) to see the explanation behind this recipe.

## Query the items first

<!-- fiddle Test 1: find items then check their text -->

Confirm that the list includes the item with the text "three"

```html
<ul id="list">
  <li>one</li>
  <li>two</li>
  <li>three</li>
  <li>four</li>
  <li>five</li>
</ul>
```

```js
// uncomment the threshold to see the full array
// chai.config.truncateThreshold = 300
cy.get('#list')
  .find('li')
  .then((items) => {
    const list = Array.from(items, (item) => item.innerText)
    expect(list).to.include('three')
  })
```

<!-- fiddle-end -->

## Dynamic list

What if the list is dynamic? The added items will NOT be seen by the `.then` command unfortunately, since Cypress retries the last command only, see the [retry-ability guide](https://on.cypress.io/retry-ability).

<!-- fiddle Test 2: find text in the dynamic items -->

```html
<ul id="list">
  <li>one</li>
  <li>two</li>
</ul>
<script>
  setTimeout(function () {
    const list = document.getElementById('list')
    list.innerHTML += `
      <li>three</li>
      <li>four</li>
      <li>five</li>
    `
  }, 1000)
</script>
```

```js skip
// 🔥 WILL NOT WORK
// the ".then(cb)" will never retry checking the page
// and won't see the added items
cy.get('#list')
  .find('li')
  .then((items) => {
    const list = Array.from(items, (item) => item.innerText)
    expect(list).to.include('three')
  })
```

```js
// ✅ a single cy.contains command retries searching the entire page
// until the list item "three" is added and the test passes
cy.contains('#list li', 'three')
```

What if you want to check multiple items?

```js
const items = ['three', 'four', 'one']
items.forEach((item) => {
  cy.contains('#list li', item)
})
```

<!-- fiddle-end -->

## Using cypress-map

If we are using [cypress-map](https://github.com/bahmutov/cypress-map) plugin, we have additional queries that make writing the test much simpler. Let's find the string "three" on the page.

<!-- fiddle Test 3: find text in the dynamic items using cypress-map queries -->

```html
<ul id="list">
  <li>one</li>
  <li>two</li>
</ul>
<script>
  setTimeout(function () {
    const list = document.getElementById('list')
    list.innerHTML += `
      <li>three</li>
      <li>four</li>
      <li>five</li>
    `
  }, 1000)
</script>
```

We can query the DOM, then map each element to its text contents using the query `cy.map`. This produces a "live" list of strings, which updates if the DOM changes.

```js
// a chain of query commands
// which retries until the assertion passes
cy.get('#list li').map('innerText').should('include', 'three')
```

<!-- fiddle-end -->
