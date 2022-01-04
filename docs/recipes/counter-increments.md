# Counter increments

In this example, we want to confirm that the number shown is incremented by one after we click on the button

<!-- fiddle Counter increments -->

```html
<div id="count"></div>
<button id="add">Add 1</button>
<button id="add-x">Add X</button>
<script>
  // we do not know the initial count value
  let count = Math.round(Math.random() * 100)
  document.getElementById('count').innerText = count
  document
    .getElementById('add')
    .addEventListener('click', function () {
      // change the text, but do it after a random delay,
      // almost like the application is loading something from the backend
      setTimeout(function () {
        count += 1
        document.getElementById('count').innerText = count
      }, 1000 + 1000 * Math.random())
    })
  document
    .getElementById('add-x')
    .addEventListener('click', function () {
      setTimeout(function () {
        // increment the count by some random positive number
        count += Math.ceil(Math.random() * 10)
        document.getElementById('count').innerText = count
      }, 1000 + 1000 * Math.random())
    })
</script>
```

```js
// grab the initial count
cy.get('#count')
  .invoke('text')
  .then(Number)
  .then((n) => {
    cy.get('#add').click()
    // check the incremented value
    cy.contains('#count', String(n + 1))
  })
```

What if the count is incremented by some unknown positive integer? We cannot use `cy.contains(text)` and rely on it to [retry](./retry-ability.md). Thus we need to move calling `invoke` and converting to number into a single `.should(callback)`

```js
// grab the starting number
cy.get('#count')
  .invoke('text')
  .then(Number)
  .then((n) => {
    cy.get('#add-x').click()
    // check that the number eventually increases
    cy.get('#count').should(($count) => {
      const value = Number($count[0].innerText)
      expect(value, 'new value').to.be.greaterThan(n)
    })
  })
```

<!-- fiddle-end -->

See also [Text changes](./text-changes.md)
