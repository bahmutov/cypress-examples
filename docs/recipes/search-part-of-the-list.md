# Search part of the list

If we have a list, and want to find an element in just some items, we need to use the jQuery list. For example, let's find the `<li id="answer">workspace1</li>` element in the items _after_ the `<li>org2</li>` item.

<!-- fiddle Search part of th list -->

```html
<ul id="list">
  <li>org1</li>
  <li>workspace1</li>
  <li>org2</li>
  <li>people</li>
  <li id="answer">workspace1</li>
</ul>
```

```js
// first, let's grab all list items
cy.get('#list li')
  .then(($allItems) => {
    // find the index of the "org2" item
    const org2Index = Cypress._.findIndex(
      $allItems,
      ($item) => $item.innerText === 'org2',
    )
    expect(org2Index, 'found org2 item index').to.be.gte(0)
    // return part of the list after the found item
    return Cypress._.slice($allItems, org2Index + 1)
  })
  // we now are working with part of the list after "org2" item
  // let's make sure we have a few items
  .should('not.be.empty')
  .contains('workspace1')
  .should('have.id', 'answer')
```

<!-- fiddle.end -->
