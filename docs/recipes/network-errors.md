# Network Errors

<!-- fiddle cy.intercept() simulates a network error -->

## Error response from the server

Let's say the application is trying to fetch some data from the server. What happens when the server responds with 500 status code.

```html
<button id="fetch-comment" class="btn btn-primary">
  Try fetching a comment
</button>
<div class="result"></div>
<script>
  ;(function () {
    // we fetch all data from this REST json backend
    const root = 'https://jsonplaceholder.cypress.io'

    function getComment() {
      $.ajax({
        url: `${root}/comments/1`,
        method: 'GET',
      })
        .then(function (data) {
          console.log('data', data)
          $('.result').text(data.body)
        })
        .fail(function (err) {
          console.error(err)
          if (err.responseJSON) {
            $('.result').text(err.responseJSON.error)
          } else {
            $('.result').text('Network error')
          }
        })
    }

    $('#fetch-comment').on('click', function (e) {
      e.preventDefault()
      getComment(e)
    })
  })()
</script>
```

```js
// stub the fetch request, respond with status code 500
cy.intercept('/comments/1', {
  statusCode: 500,
  body: {
    error: 'Server has a day off',
  },
})
cy.get('#fetch-comment').click()
cy.contains('.result', 'Server has a day off').should(
  'be.visible',
)
```

## Connection error

You can simulate network error (like the connection dropping) using the command [cy.intercept](https://on.cypress.io/intercept) and the `forceNetworkError` response property.

```js
cy.log('**connection error**')
// first time return a stub text
// second time simulate a network error
// but cy.intercepts are applied in reverse order
cy.intercept('/comments/1', { forceNetworkError: true })
cy.intercept(
  '/comments/1',
  { times: 1 },
  { body: { body: 'Stub comment' } },
)
// click the button and check how the application shows the data
cy.get('#fetch-comment').click()
cy.contains('.result', 'Stub comment').should('be.visible')

// and then handles the error response
cy.get('#fetch-comment').click()
cy.contains('.result', 'Network error').should('be.visible')
```

<!-- fiddle-end -->
