# Text Variants

<!-- fiddle Text variants -->

```html hide
<div>Logged in user</div>
<div id="user"></div>
```

```js app
setTimeout(() => {
  const el = document.getElementById('user')
  if (Math.random() < 0.5) {
    el.innerText = 'Joe Smith'
  } else {
    el.innerText = '@joe123'
  }
}, 500)
```

The username element might show the full user name or an alias. How do we confirm the possible text variants?

```js skip
cy.contains('#user', '???')
```

We could use [cy.contains](https://on.cypress.io/contains) with a regular expression

```js
cy.contains('#user', /^(Joe Smith|@joe123)$/)
```

There are two downsides to the above approach.

1. Writing a dynamic regular expression with the value coming from a variable is complicated
2. `cy.contains` would not give you a good error if the element with id `user` is present, but its text does not match the given regular expression. It simply would say "0 elements found"

We could solve the second error by combining `cy.get` and `cy.invoke` queries

```js
const username = '@joe123'
cy.get('#user')
  .invoke('text')
  .should('match', new RegExp(`^(Joe Smith|${username})$`))
```

Even better would be to use `oneOf` assertion

```js
cy.get('#user')
  .invoke('text')
  .should('be.oneOf', ['Joe Smith', username])
```

<!-- fiddle-end -->
