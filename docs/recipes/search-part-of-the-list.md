# Search part of the list

If we have a list, and want to find an element in just some items, we need to use the jQuery list. For example, let's find the `<li id="answer">workspace1</li>` element in the items _after_ the `<li>org2</li>` item.

## Find the index yourself

<!-- fiddle Find the index yourself -->

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

## Use cy.nextUntil

Another solution is to use [.nextUntil](https://on.cypress.io/nextuntil) command.

<!-- fiddle Use cy.nextUntil -->

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
// alternative solution: slice using cy.nextUntil
cy.get('#list li')
  .contains('li', 'org2')
  // all LI siblings after "<li>org2</li>" element
  .nextUntil()
  .should('have.length', 2)
  .contains('workspace1')
  .should('have.id', 'answer')
```

<!-- fiddle.end -->

## jQuery index and slice

Yet another solution would find the index of the list item using [jQuery index](https://api.jquery.com/index/), then slice the list using [jQuery slice](https://api.jquery.com/slice/), and continue the search from there.

<!-- fiddle jQuery index and slice -->

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
cy.get('#list li')
  .contains('li', 'org2')
  // call jQuery index method
  .invoke('index')
  .should('be.gte', 0)
  .then((k) => {
    cy.get('#list li')
      // call jQuery slice method
      .invoke('slice', k)
      .should('have.length', 3)
      // hmm, for some reason fails
      // to call cy.contains unless we call cy.wrap
      .then(cy.wrap)
      .contains('workspace1')
      .should('have.id', 'answer')
  })
```

<!-- fiddle.end -->
