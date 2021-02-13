# Waiting

Examples of waiting for an amount of time or resource to resolve in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [cy.wait()](https://on.cypress.io/wait)

To wait for a specific amount of time or resource to resolve, use the `cy.wait()` command.

<!-- fiddle cy.wait() / wait for a specific amount of time-->

```html
<form>
  <div class="form-group">
    <input type="text" class="form-control wait-input1" />
  </div>
  <div class="form-group">
    <input type="text" class="form-control wait-input2" />
  </div>
  <div class="form-group">
    <input type="text" class="form-control wait-input3" />
  </div>
</form>
```

```js
cy.get('.wait-input1').type('Wait 1000ms after typing')
cy.wait(1000)
cy.get('.wait-input2').type('Wait 1000ms after typing')
cy.wait(1000)
cy.get('.wait-input3').type('Wait 1000ms after typing')
cy.wait(1000)
```

<!-- fiddle-end -->

### Waiting does not change the subject

<!-- fiddle cy.wait() / wait keeps the subject -->

```html
<div id="wait-subject">The subject</div>
```

```js
cy.wrap('Hello').wait(100).should('equal', 'Hello')
cy.get('#wait-subject').wait(100).should('have.text', 'The subject')
// if there is no subject, yields undefined
cy.wait(100).should('equal', undefined)
```

<!-- fiddle-end -->

### Waiting for network

You can wait for a specific route

<!-- fiddle cy.wait() / waiting for specific route -->

```html
<button class="network-btn btn btn-primary">Get Comment</button>
<div class="network-comment"></div>
<script>
  function getComment() {
    // we fetch all data from this REST json backend
    const root = 'https://jsonplaceholder.cypress.io'
    $.ajax({
      url: `${root}/comments/1`,
      method: 'GET',
    }).then(function (data) {
      $('.network-comment').text(data.body)
    })
  }
  $('.network-btn').on('click', function (e) {
    e.preventDefault()
    getComment(e)
  })
</script>
```

```js
cy.server()

// Listen to GET to comments/1
cy.route('GET', 'comments/*').as('getComment')

// we have code that gets a comment when
// the button is clicked in scripts.js
cy.get('.network-btn').click()

// wait for GET comments/1
cy.wait('@getComment').its('status').should('eq', 200)
```

<!-- fiddle-end -->

**Tip:** be careful of adding unnecessary wait times, see our [Best Practices: Unnecessary Waiting](https://on.cypress.io/best-practices#Unnecessary-Waiting) guide.

## Waiting on promises

If you want to wait on a promise, use [cy.wrap()](https://on.cypress.io/wrap).

<!-- fiddle cy.wrap / a promise -->

```js
const asyncAdd = (a, b) => Promise.resolve(a + b)
const asyncSub = (a, b) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(a - b), 1000)
  })
}

cy.wrap(asyncAdd(2, 3)).should('equal', 5)
cy.wrap(asyncSub(2, 3)).should('equal', -1)
```

<!-- fiddle-end -->

More information:

- [Asserting Network Calls from Cypress Tests](https://www.cypress.io/blog/2019/12/23/asserting-network-calls-from-cypress-tests/) blog post
- [Unit testing application code](https://github.com/cypress-io/cypress-example-recipes#unit-testing) recipe
- Avoid hard-coded waits using built-in [retry-ability](https://on.cypress.io/retry-ability)
