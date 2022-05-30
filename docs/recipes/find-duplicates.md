# Find duplicates

Imagine we have a list and there are two items with the same text (the rest are all different). How do we confirm that there two duplicates?

## If we know the duplicate value

<!-- fiddle Find known duplicate value -->

```html
<ul>
  <li>Apples</li>
  <li>Kiwi</li>
  <li>Melon</li>
  <li>Grapes</li>
  <li>Pears</li>
  <li>Kiwi</li>
</ul>
```

In the list example above, there should be two list items with the text "Kiwi". We cannot use the `cy.contains` command as it returns the first element with the text

```js
cy.contains('li', 'Kiwi').should('have.length', 1)
```

We can use the jQuery selector `:contains` instead to find all elements with the given text.

```js
cy.get('li:contains(Kiwi)').should('have.length', 2)
```

But what about the rest of the items? They should be all unique.

```js
cy.get('li:not(:contains("Kiwi"))')
  .then(($el) => Cypress._.map($el, 'innerText'))
  // confirm the list has unique elements
  .then((values) => {
    const distinct = Cypress._.uniq(values)
    expect(distinct, 'all strings are different').to.have.length(
      values.length,
    )
  })
```

<!-- fiddle-end -->

You can watch the above recipe derivation in the video [Find Duplicate Text Kiwi And Confirm The Rest Of Elements Are Unique](https://youtu.be/MU08Air76bI). If we do not know the duplicate value, see the recipe [Checking for duplicates](./duplicates.md)
