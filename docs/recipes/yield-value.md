# Yield value

Sometimes you might get an error that your test is "mixing up async and sync code". This happens when inside a Cypress chain of commands callback you have a Cypress command and a separate `return X` statement. Cypress is unsure if you want to yield the value `X` or the result of the last command.

<!-- fiddle Yield value -->

Let's say you want to find the last name of the person in the DIV below.

```html
<div id="person">Joe Smith</div>
```

The following code block will cause an error "mixing up async and sync code"

```jss
cy.get('#person')
  .invoke('text')
  .then((text) => {
    cy.log('text', text)
    return text.split(' ')[1]
  })
  .should('equal', 'Smith')
```

![Async and sync code error](./pics/async-error.png)

Cypress is unsure which value do you want to yield to the assertion `.should('equal', 'Smith')` - the result of the Cypress command `cy.log`? Or the result returned using the `return ...` statement?

Printing using `cy.log` can unexpectedly cause an error, because you do not assume it yields a value. But it is a Cypress command, just like `cy.wrap`. In the test below (which also causes the same error as above), do you expect to yield "Anna" or "Smith"?

```jss
cy.get('#person')
  .invoke('text')
  .then((text) => {
    cy.wrap('Anna')
    return text.split(' ')[1]
  })
  .should('equal', 'Smith')
```

## Solutions

1. Move the return statement into its own `.then` callback

```js
cy.get('#person')
  .invoke('text')
  .then((text) => {
    cy.wrap('Anna').then(() => {
      return text.split(' ')[1]
    })
  })
  .should('equal', 'Smith')
```

2. Wrap the value to return using the [cy.wrap](https://on.cypress.io/wrap) command

```js
cy.get('#person')
  .invoke('text')
  .then((text) => {
    cy.log('text', text)
    cy.wrap(text.split(' ')[1])
  })
  .should('equal', 'Smith')
```

3. Print the text using a separate `.then` callback. If the `.then` callback returns `undefined`, then its original value is yielded to the next command by Cypress.

```js
cy.get('#person')
  .invoke('text')
  .then(cy.log)
  .then((text) => {
    return text.split(' ')[1]
  })
  .should('equal', 'Smith')
```

**Tip:** you can perform data manipulation steps using [cy.invoke](https://on.cypress.io/invoke) and [cy.its](https://on.cypress.io/its) commands

```js
cy.get('#person')
  .invoke('text')
  .then(cy.log)
  .invoke('split', ' ')
  .its(1)
  .should('equal', 'Smith')
```

<!-- fiddle-end -->

To see the same explanation, you can watch the video [Fix The Cypress Error "You are mixing async and sync code"](https://www.youtube.com/watch?v=f_H7EH0n9tE)
