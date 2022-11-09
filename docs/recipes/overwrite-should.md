# Convenient access to aliases values by overwriting the should command

In addition to overwriting regular Cypress commands, we can overwrite the `should` assertion command. For example, we can automatically look up aliased values (since they were already computed by the time we get to execute the `should` command). We could always look up any values that start with `@` character.

<!-- fiddle Overwrite should command -->

```html
<p>
  During the tournament, the player A got
  <span class="score">60</span> points, while the player B got
  <span class="score">81</span> points.
</p>
```

```css hide
.score {
  font-weight: 700;
}
```

```js
// automatically replace any string values that start with "@"
// with the aliased value, if it exists
Cypress.Commands.overwrite('should', (should, ...args) => {
  const aliases = cy.state('aliases')
  const lookedUp = args.map((a) => {
    if (typeof a === 'string' && a[0] === '@') {
      const key = a.slice(1)
      if (key in aliases) {
        return aliases[key].subject
      }
    }
    return a
  })
  return should(...lookedUp)
})
```

Here is a simple example of looking up the "answer" alias.

```js
cy.wrap(42).as('answer')
cy.wrap(20 + 22).should('equal', '@answer')
```

Now let's compare two scores we extract from the page. Automatically looking up aliased values inside the `should` assertions lets us avoid the pyramid of Doom and additional `cy.then(function () { ... })` callbacks.

```js
cy.get('.score')
  .first()
  .invoke('text')
  .then(parseInt)
  .as('scoreA')
cy.get('.score')
  .eq(1)
  .invoke('text')
  .then(parseInt)
  .should('be.above', '@scoreA')
```

<!-- fiddle-end -->
