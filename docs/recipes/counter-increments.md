# Counter increments

In this example, we want to confirm that the number shown is incremented by one after we click on the button

<!-- fiddle Counter increments -->

```html
<div id="count"></div>
<button id="add">Add 1</button>
<script>
  // we do not know the initial count value
  let count = Math.round(Math.random() * 100)
  document.getElementById('count').innerText = count
  document.getElementById('add').addEventListener('click', () => {
    // change the text, but do it after a random delay,
    // almost like the application is loading something from the backend
    setTimeout(() => {
      count += 1
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

<!-- fiddle-end -->

See also [Text changes](./text-changes.md)
