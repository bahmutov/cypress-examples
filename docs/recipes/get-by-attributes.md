# Get By Attributes

You can query elements on the page that have multiple attributes with the given values.

<!-- fiddle Two attributes -->

```html
<ul>
  <li data-area="grocery" data-type="veggies">Potatoes</li>
  <li data-area="grocery" data-type="fruits">Apples</li>
  <li data-area="grocery" data-type="veggies" class="sale">
    Carrots
  </li>
  <li data-area="misc" data-type="snack">Chips</li>
</ul>
```

```css hide
.sale::after {
  content: '🤑';
}
```

Let's find all vegetable in the grocery isle.

```js
cy.get('[data-area=grocery][data-type=veggies]').should(
  'have.length',
  2,
)
```

Let's find the only snack

```js
cy.contains('[data-area=misc][data-type=snack]', 'Chips')
```

Let's find the grocery items on sale through a combination of an attribute and a class selectors:

```js
cy.get('[data-area=grocery].sale')
  .should('have.length', 1)
  .and('include.text', 'Carrots')
```

**Tip:** if the attribute value contains spaces or special characters, use double quotes: `cy.get('[data-area="grocery"]')`.

<!-- fiddle-end -->
