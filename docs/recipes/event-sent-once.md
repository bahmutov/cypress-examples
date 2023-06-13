# Event Triggered Once

## Click events

<!-- fiddle Each click logs a message -->

```html
<button>Click</button>
<script>
  document
    .querySelector('button')
    .addEventListener('click', () => {
      console.log('clicked')
    })
</script>
```

Let's spy on `console.log` method calls and click the button several times.

```js
cy.window()
  .its('console')
  .then((console) => {
    cy.spy(console, 'log').as('log')
  })
cy.contains('button', 'Click').click().click().click()
// confirm the console.log was called 3 times
cy.get('@log').should('have.been.calledThrice')
```

<!-- fiddle-end -->

## Single click event

By adding `{ once: true }` to the event listener registration, we limit the execution to the first event.

<!-- fiddle Only the first click logs a message -->

```html
<button>Click</button>
<script>
  document.querySelector('button').addEventListener(
    'click',
    () => {
      console.log('clicked')
    },
    { once: true },
  )
</script>
```

We can set up spy the same way.

```js
cy.window()
  .its('console')
  .then((console) => {
    cy.spy(console, 'log').as('log')
  })
```

The first button click triggers the event handler

```js
cy.contains('button', 'Click').click()
cy.get('@log').should('have.been.calledOnce')
```

No matter how many times we click the button after that, the `log` spy count remains at one.

```js
cy.contains('button', 'Click').click().click().click()
cy.get('@log').should('have.been.calledOnce')
```

We can reset the count and try again.

```js
cy.get('@log').invoke('resetHistory')
cy.contains('button', 'Click').click().click().click()
cy.get('@log').should('not.be.called')
```

<!-- fiddle-end -->
