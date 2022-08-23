# Check enabled checkboxes

<!-- fiddle Check the enabled checkboxes -->

Watch this example in the video [Check The Enabled Checkboxes](https://youtu.be/YQGGtz00JA8).

```html
<ul>
  <li>
    <input type="checkbox" name="c1" disabled="disabled" />
    <label for="c1">I have a bike</label>
  </li>
  <li>
    <input type="checkbox" name="c2" />
    <label for="c2">I have a car</label>
  </li>
  <li>
    <input type="checkbox" name="c3" />
    <label for="c3">I have a boat</label>
  </li>
</ul>
```

```css hide
li {
  list-style-type: none;
}
```

We can get all the checkboxes, filter out the disabled ones using the attribute selector, then click on each one via [cy.click](https://on.cypress.io/click)

```js skip
// check all enabled checkboxes using multiple clicks
cy.get(':checkbox').not('[disabled]').click({ multiple: true })
```

**Better:** use the [cy.check](https://on.cypress.io/check) command

```js skip
cy.get(':checkbox').not('[disabled]').check()
```

**Best:** use the jQuery [`:enabled`](https://api.jquery.com/enabled-selector/) selector plus the [cy.check](https://on.cypress.io/check) command

```js
// use the jQuery :checkbox + :enabled selectors
// and the cy.check command
cy.get(':checkbox:enabled').check()
```

```js
// confirm the number of checked inputs
// using the jQuery :checked selector
cy.get(':checked').should('have.length', 2)
```

<!-- fiddle-end -->
