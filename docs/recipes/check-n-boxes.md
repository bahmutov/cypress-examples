# Check The First N Checkboxes

<!-- fiddle Check the first N checkboxes -->

```html
<ul>
  <li><input type="checkbox" id="box-1" /> One</li>
  <li><input type="checkbox" id="box-2" /> Two</li>
  <li><input type="checkbox" id="box-3" /> Three</li>
  <li><input type="checkbox" id="box-4" /> Four</li>
  <li><input type="checkbox" id="box-5" /> Five</li>
</ul>
```

CSS pseudo-selector `:checked` comes from [jQuery](https://api.jquery.com/checked-selector/).

```js
// there are no checked boxes at first
cy.get('input[type=checkbox]:checked').should('have.length', 0)
```

Let's check the first N checkboxes. We can use Lodash `_.random` to pick a number of boxes to check. We will need to check each box separately, since there is no `multiple: true` option for the [cy.check](https://on.cypress.io/check) command.

```js
// pick a random number of checkboxes to check
// https://lodash.com/docs
const n = Cypress._.random(1, 5)
cy.log(`checking ${n} boxes`)
for (let k = 0; k < n; k += 1) {
  cy.get('input[type=checkbox]').eq(k).check()
}
// confirm the right number of boxes was checked
cy.log(`there should be ${n} boxes checked`)
cy.get('input[type=checkbox]:checked').should('have.length', n)
```

To confirm the number of boxes _not checked_, we can combine `:not` and `:checked` selectors

```js
cy.log(`there should be ${5 - n} boxes not checked`)
cy.get('input[type=checkbox]:not(:checked)').should(
  'have.length',
  5 - n,
)
```

<!-- fiddle-end -->
