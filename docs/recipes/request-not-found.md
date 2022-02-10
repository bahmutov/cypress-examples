# Requested resource not found

Sometimes you use [cy.request](https://on.cypress.io/request) to get a resource that might not exist. The server returns 404 and the command fails. In this recipe, I show how to deal with this error by abstracting it away in an utility function.

First, let's look at an _incorrect_ solution.

<!-- fiddle cy.request() - handle an error response -->

```jss
// 🚨 INCORRECT, this will NOT WORK, just for DEMO
function getTodo(id) {
  const serverUrl = 'https://jsonplaceholder.cypress.io'
  cy.request(`${serverUrl}/todos/${id}`).its('body')
  // if the Todo is not found, return an error
  return 'Todo not found'
}
getTodo(1)
```

The above function `getTodo` schedules the `cy.request` command to run by adding it to the Cypress command queue. The `getTodo` also returns a string right away - probably not something you expect. Instead you want to return _the Cypress command_ to let you attach more commands and assertions.

```jss
// 🚨 SLIGHTLY BETTER solution
// DOES NOT HANDLE 404 responses
function getTodo(id) {
  const serverUrl = 'https://jsonplaceholder.cypress.io'
  return cy.request(`${serverUrl}/todos/${id}`).its('body')
  // Hmm, we will never get here. How do we handle
  // a response from the server "Todo not found"?
  return 'Todo not found'
}
// getTodos now returns a Cypress command, so we can validate
// the value it yields when the request completes
getTodo(1)
  .should('deep.include', {
    // we know only some properties from the object
    id: 1,
    userId: 1,
  })
  // continue working with the yielded Todo object
  .its('title')
  .should('be.a', 'string')
```

The above approach is slightly better. Now let's add handling of 404 response.

```js
// ✅ Good utility function
// that handles 404 responses and yields the object
function getTodo(id) {
  const serverUrl = 'https://jsonplaceholder.cypress.io'
  return cy
    .request({
      url: `${serverUrl}/todos/${id}`,
      failOnStatusCode: false,
    })
    .then((response) => {
      if (response.status === 404) {
        return 'Todo not found'
      }
      return response.body
    })
}
getTodo(1)
  .should('deep.include', {
    // we know only some properties from the object
    id: 1,
    userId: 1,
  })
  // continue working with the yielded Todo object
  .its('title')
  .should('be.a', 'string')
// asking for resource that does not exist
getTodo('does-not-exist').should('equal', 'Todo not found')
```

<!-- fiddle-end -->
