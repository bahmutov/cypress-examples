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
cy.get('form').within(() => {
  cy.get('[name=email]')
    .invoke('attr', 'type', 'password')
    .type('my@email.com', { log: false })
  cy.get('[name=password]').type('Secret!', { log: false })
  cy.get('button[type=submit]')
    .invoke('click', (e) => e.preventDefault())
    .invoke('click', cy.stub().as('clicked'))
    .click()
})
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
cy.intercept('POST', 'submit.php', {
  statusCode: 304,
  headers: {
    location: '/',
  },
}).as('post')
cy.get('form').within(() => {
  cy.get('[name=email]')
    .invoke('attr', 'type', 'password')
    .type('my@email.com', { log: false })
  cy.get('[name=password]').type('Secret!', { log: false })
  cy.get('button[type=submit]').click()
})
cy.wait('@post')
  .its('request.body')
  .should('include', encodeURIComponent('my@email.com'))
```

<!-- fiddle-end -->

I also suggest you read the blog post [Keep passwords secret in E2E tests](https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests).
