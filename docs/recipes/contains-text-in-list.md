# Contains text in a list

Let's take a list and check if it contains a given text. We can write this test in several ways.

<!-- fiddle Test 1: find items then check their text -->

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
