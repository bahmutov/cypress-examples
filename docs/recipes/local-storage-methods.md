# Local Storage Methods

Local storage methods like `setItem` and `getItem` are synchronous. You must be careful when combining them with Cypress commands. For example, you might have a page where the appearance of the dialog depends on the local storage item.

```js
// the new user should see the dialog
localStorage.setItem('newUserDialog', 'true')
cy.visit('/')
cy.get('dialog#new-user').should('be.visible')
// when the value is 'false', the dialog should not exist
localStorage.setItem('newUserDialog', 'false')
cy.reload()
cy.get('dialog#new-user').should('not.exist')
```

The above test might surprise you, since it will NOT show the dialog initially. Remember: Cypress queues up its commands first, then starts executing them. Meanwhile, synchronous commands like `localStorage.setItem` are executed _immediately_. Thus the effect of the test above is the same as:

```js
localStorage.setItem('newUserDialog', 'true')
localStorage.setItem('newUserDialog', 'false')
// ...
// now Cypress starts executing the queue of commands
cy.visit('/')
cy.get('dialog#new-user').should('be.visible')
cy.reload()
cy.get('dialog#new-user').should('not.exist')
```

You can make `localStorage.setItem` execute with the Cypress commands in the correct order by adding them to the queue. One way is to use `cy.then(callback)` syntax

```js
cy.then(() => {
  // the new user should see the dialog
  localStorage.setItem('newUserDialog', 'true')
})
cy.visit('/')
cy.get('dialog#new-user').should('be.visible')
cy.then(() => {
  // when the value is 'false', the dialog should not exist
  localStorage.setItem('newUserDialog', 'false')
})
cy.reload()
cy.get('dialog#new-user').should('not.exist')
```

Another solution is to use `cy.wrap` + `cy.invoke` combination

```js
cy.wrap(localStorage).invoke('setItem', 'newUserDialog', 'true')
cy.visit('/')
cy.get('dialog#new-user').should('be.visible')
cy.wrap(localStorage).invoke('setItem', 'newUserDialog', 'false')
cy.reload()
cy.get('dialog#new-user').should('not.exist')
```

Finally, you can use the plugin [cypress-localstorage-commands](https://www.npmjs.com/package/cypress-localstorage-commands) that has Cypress commands wrappers for `localStorage` methods plus more.
