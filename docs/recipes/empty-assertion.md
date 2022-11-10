# Empty assertion

## Empty string

<!-- fiddle Empty string -->

```js
cy.wrap('').should('be.empty')
cy.wrap('Hello').should('not.be.empty')
```

**Note:** trying to use "empty" assertion with `undefined`, `null`, or numbers will lead to an error.

```js skip
// 🚨 DOES NOT WORK
cy.wrap(undefined).should('be.empty')
cy.wrap(null).should('be.empty')
cy.wrap(0).should('be.empty')
```

<!-- fiddle-end -->

## Empty array

<!-- fiddle Empty array -->

```js
cy.wrap([]).should('be.empty')
cy.wrap(['Hello']).should('not.be.empty')
// any value inside the array
// makes it not empty
cy.wrap(['']).should('not.be.empty')
cy.wrap([0]).should('not.be.empty')
cy.wrap([null]).should('not.be.empty')
cy.wrap([undefined]).should('not.be.empty')
```

<!-- fiddle-end -->
