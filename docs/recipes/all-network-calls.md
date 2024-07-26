# Get All Intercepted Network Calls

Cypress has built-in syntax for getting all intercepted network alls for an alias. This recipe shows it in action. For more, see my course [Cypress Network Testing Exercises](https://cypress.tips/courses/network-testing).

## Wait for each call separately

Imagine the application makes 3 calls. How do you confirm it? You can spy on the network call, then use [cy.wait](https://on.cypress.io/wait) three times.

<!-- fiddle Wait for each call -->

```html hide
<button class="network-count-btn btn btn-primary">
  3 network calls
</button>
<script>
  // we fetch all data from this REST json backend
  const root = 'https://jsonplaceholder.cypress.io'

  function getComment() {
    $.ajax({
      url: `${root}/comments/1`,
    })
  }

  $('.network-count-btn').on('click', function (e) {
    e.preventDefault()
    setTimeout(getComment, 1000)
    setTimeout(getComment, 2000)
    setTimeout(getComment, 3000)
  })
</script>
```

```js
// 💡 always set up network intercepts BEFORE the action
cy.intercept('GET', '/comments/*').as('networkCall')
cy.contains('button', '3 network calls').click()
// confirm the 3 calls are made
cy.wait('@networkCall').wait('@networkCall').wait('@networkCall')
```

<!-- fiddle-end -->

## Use the `cy.get` "alias.all" syntax

Alternative is to get all intercepted call for an alias using the [cy.get](https://on.cypress.io/get) command with `alias.all` syntax. It yields the "intercept" object with the application's request and response objects.

<!-- fiddle Get all intercepts -->

```html hide
<button class="network-count-btn btn btn-primary">
  3 network calls
</button>
<script>
  // we fetch all data from this REST json backend
  const root = 'https://jsonplaceholder.cypress.io'

  function getComment() {
    $.ajax({
      url: `${root}/comments/1`,
    })
  }

  $('.network-count-btn').on('click', function (e) {
    e.preventDefault()
    setTimeout(getComment, 1000)
    setTimeout(getComment, 2000)
    setTimeout(getComment, 3000)
  })
</script>
```

Let's get all intercepted calls as an array using the syntax `cy.get('@networkCall.all')`

```js
// 💡 always set up network intercepts BEFORE the action
cy.intercept('GET', '/comments/*').as('networkCall')
cy.contains('button', '3 network calls').click()
// confirm the 3 calls are made using cy.get
cy.get('@networkCall.all').should('have.length', 3)
```

**Tip:** each intercepted call has `responseWaited` property that shows if the test executed `cy.wait` command. For example, we have 3 intercepts currently with zero `cy.wait` commands. I will use the `cy.map` command from the [cypress-map](https://github.com/bahmutov/cypress-map) plugin to map each interception object to its property `responseWaited`.

```js
cy.log('**cy.wait effect**')
cy.get('@networkCall.all')
  .map('responseWaited')
  .should('deep.equal', [false, false, false])
cy.wait('@networkCall')
cy.get('@networkCall.all')
  .map('responseWaited')
  .should('deep.equal', [true, false, false])
cy.wait('@networkCall')
cy.get('@networkCall.all')
  .map('responseWaited')
  .should('deep.equal', [true, true, false])
```

<!-- fiddle-end -->

## Flexible assertions

Using `cy.get(alias.all)` lets you create very flexible assertions. For example, the application might make multiple calls to the backend. We are only interested in specific responses. In the test below, we confirm the application eventually returns comment with `id=2`

<!-- fiddle Flexible assertions -->

```html hide
<button class="network-count-btn btn btn-primary">
  3 network calls
</button>
<script>
  // we fetch all data from this REST json backend
  const root = 'https://jsonplaceholder.cypress.io'

  function getComment(id = 1) {
    $.ajax({
      url: `${root}/comments/${id}`,
    })
  }

  $('.network-count-btn').on('click', function (e) {
    e.preventDefault()
    setTimeout(getComment, 1000 * Math.random())
    setTimeout(getComment.bind(null, 2), 2000 * Math.random())
    setTimeout(getComment, 3000 * Math.random())
  })
</script>
```

```js
cy.intercept('GET', '/comments/*').as('networkCall')
cy.contains('button', '3 network calls').click()
// confirm that at least one call returns an object with ID = 2
cy.get('@networkCall.all').should((interceptions) => {
  const hasId2 = interceptions.some(
    (x) => x.response.body.id === 2,
  )
  expect(hasId2, 'response with id 2').to.be.true
})
```

<!-- fiddle-end -->

### Check interceptions using cypress-map queries

You can simplify the above test using queries from [cypress-map](https://github.com/bahmutov/cypress-map) plugin.

<!-- fiddle Check all interceptions -->

```html hide
<button class="network-count-btn btn btn-primary">
  3 network calls
</button>
<script>
  // we fetch all data from this REST json backend
  const root = 'https://jsonplaceholder.cypress.io'

  function getComment(id = 1) {
    $.ajax({
      url: `${root}/comments/${id}`,
    })
  }

  $('.network-count-btn').on('click', function (e) {
    e.preventDefault()
    setTimeout(getComment, 1000 * Math.random())
    setTimeout(getComment.bind(null, 2), 2000 * Math.random())
    setTimeout(getComment, 3000 * Math.random())
  })
</script>
```

```js
cy.intercept('GET', '/comments/*').as('networkCall')
cy.contains('button', '3 network calls').click()
// confirm that at least one call returns an object with ID = 2
cy.get('@networkCall.all')
  .map('response.body.id')
  .print()
  .should('include', 2)
```

<!-- fiddle-end -->
