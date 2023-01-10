# Hide the entered email

Watch the video [Hide The Entered Email In The Form](https://youtu.be/512p4E4fQAc).

## Prevent the default action on the form

<!-- fiddle Hide the entered email / Prevent the default action on the form -->

```html
<form action="submit.php" method="post">
  <input type="text" name="email" />
  <input type="password" name="password" />
  <button type="submit">Submit</button>
</form>
```

```js
// get the form and limit ourselves to finding elements inside
cy.get('form').within(() => {
  // hide the entered email completely
  cy.get('[name=email]')
    .invoke('attr', 'type', 'password')
    .type('my@email.com', { log: false })
  cy.get('[name=password]').type('Secret!', { log: false })
  // prevent the test form navigation
  // by attaching a dummy event handlers
  cy.get('button[type=submit]')
    // cannot use cy.invoke, as it retries
    .then(($btn) => {
      $btn.click((e) => e.preventDefault())
      $btn.click(cy.stub().as('clicked'))
    })
    .click()
})
// confirm our click event handler worked
cy.get('@clicked').should('have.been.calledOnce')
```

<!-- fiddle-end -->

## Intercept the form submission network call

<!-- fiddle Hide the entered email / Intercept the network call -->

```html
<form action="submit.php" method="post">
  <input type="text" name="email" />
  <input type="password" name="password" />
  <button type="submit">Submit</button>
</form>
```

```js
// intercept the form submission network call
// and return a redirect back to the origin
cy.intercept('POST', 'submit.php', {
  statusCode: 304,
  headers: {
    location: '/',
  },
}).as('post')
// enter the values in the form
// and submit the form
cy.get('form').within(() => {
  cy.get('[name=email]')
    .invoke('attr', 'type', 'password')
    .type('my@email.com', { log: false })
  cy.get('[name=password]').type('Secret!', { log: false })
  cy.get('button[type=submit]').click()
})
// confirm the form was sent with expected values
cy.wait('@post')
  .its('request.body')
  .should('include', encodeURIComponent('my@email.com'))
```

<!-- fiddle-end -->

I also suggest you read the blog post [Keep passwords secret in E2E tests](https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests).
