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

## Empty object

<!-- fiddle Empty object -->

```js
cy.wrap({}).should('be.empty')
cy.wrap({ name: 'Joe' }).should('not.be.empty')
```

<!-- fiddle-end -->

## jQuery object is never empty

<!-- fiddle jQuery object is never empty -->

```html
<ul>
  <li class="count">One</li>
  <li class="count">Two</li>
</ul>
```

Even if there are not DOM elements, the jQuery object is not empty.

```js
cy.get('li.selected')
  .should('not.be.empty')
  .and('have.length', 0)
cy.get('li.count').should('not.be.empty').and('have.length', 2)
```

<!-- fiddle-end -->
