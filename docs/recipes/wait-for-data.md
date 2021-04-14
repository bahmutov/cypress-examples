# Wait for data

Sometimes you want to wait for the data to populate the list. For example, a network `cy.intercept` could listen for all requests and grab a list of posted items, and the test needs to check this list.

## Using cy.should callback function

<!-- fiddle using the cy.should callback -->

```html
<button id="post-list">Upload list</button>
<script>
  document
    .getElementById('post-list')
    .addEventListener('click', function () {
      // post the list of users after a delay
      setTimeout(function () {
        const users = [
          {
            id: 101,
            name: 'Joe',
          },
          {
            id: 102,
            name: 'Mary',
          },
        ]
        fetch('https://jsonplaceholder.cypress.io/users', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(users),
        })
      }, 1300)
    })
</script>
```

We can use the [cy.should](https://on.cypress.io/should) callback function that re-runs until the assertions inside pass. Then we can use [cy.then](https://on.cypress.io/then) command to return the `list` value - it should be an array by then.

```js
let list
// spy on the POST requests
cy.intercept('POST', '/users', (req) => {
  if (Array.isArray(req.body)) {
    list = req.body
  }
})

cy.get('#post-list').click()
// need to somehow wait for the list to be defined
// we cannot simply do expect(list).to.be.defined
// since it will be just evaluated once
// instead we need to use cy.should() assertions
cy.should(() => {
  expect(list).to.be.an('array')
})
  .then(() => {
    // now that we have the list let's yield it
    return list
  })
  // now the assertions will run against the list
  .should('have.length', 2)
```

<!-- fiddle-end -->

## Alternative: use [cy.wrap](https://on.cypress.io/wrap)

Another alternative to the `cy.should` with callback function is to use an object with [cy.wrap](https://on.cypress.io/wrap) command to check a property of an object.

<!-- fiddle using the cy.wrap -->

```html
<button id="post-list">Upload list</button>
<script>
  document
    .getElementById('post-list')
    .addEventListener('click', function () {
      // post the list of users after a delay
      setTimeout(function () {
        const users = [
          {
            id: 101,
            name: 'Joe',
          },
          {
            id: 102,
            name: 'Mary',
          },
        ]
        fetch('https://jsonplaceholder.cypress.io/users', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(users),
        })
      }, 1300)
    })
</script>
```

```js
// instead of a plain variable, store the list
// as a property of an object
const data = {}
// spy on the POST requests
cy.intercept('POST', '/users', (req) => {
  if (Array.isArray(req.body)) {
    data.list = req.body
  }
})

cy.get('#post-list').click()
// the "data" variable is going to be the same
// only its contents is going to change. Thus we
// can wrap the "data" variable right away
cy.wrap(data)
  // note that "have.property" assertion is special,
  // it yields the property!
  .should('have.property', 'list')
  // thus the next assertion runs against the "data.list" value
  .should('be.an', 'array')
  // and now the assertions will run against the list
  .and('have.length', 2)
```

<!-- fiddle-end -->

For more information about `have.property` assertion, see the [assertions](../commands/assertions.md) page.
