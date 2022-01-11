# Network Errors

You can simulate network errors using the command [cy.intercept](https://on.cypress.io/intercept) and the `forceNetworkError` response property.

<!-- fiddle cy.intercept() simulates a network error -->

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
          $('.result').text('Network error')
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
