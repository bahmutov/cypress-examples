# Compare Two Lists

📺 You can watch these examples explained in the video [Compare Two Lists Of Elements Examples](https://youtu.be/8IXrq9BEWSg).

Let's compare two lists of DOM elements by extracting the text content and then comparing the arrays.

## Same items

Let's confirm that these two lists have identical items. I will use `cy.map` child command from [cypress-map](https://github.com/bahmutov/cypress-map) to write elegant code.

<!-- fiddle Lists have the same elements -->

```html
<ol id="first">
  <li>Apples</li>
  <li>Oranges</li>
  <li>Melons</li>
  <li>Grapes</li>
</ol>
<ol id="second">
  <li>Apples</li>
  <li>Oranges</li>
  <li>Melons</li>
  <li>Grapes</li>
</ol>
```

We assume the strings arrays are identical; the same length and the same order.

```js
cy.get('#first li')
  .map('innerText')
  .then((list) => {
    cy.get('#second li')
      .map('innerText')
      .should('deep.equal', list)
  })
// pro-tip: cypress-map includes an assertion "read" for comparing elements text
cy.log('**should read assertion**')
cy.get('#first li')
  .map('innerText')
  .then((list) => {
    cy.get('#second li').should('read', list)
  })
```

<!-- fiddle-end -->

## Same items in different order

If the items are the same, but could be in different order, we can use the assertion `have.all.members` to compare two arrays.

<!-- fiddle Lists have the same elements in different order -->

```html
<ol id="first">
  <li>Apples</li>
  <li>Oranges</li>
  <li>Melons</li>
  <li>Grapes</li>
</ol>
<ol id="second">
  <li>Grapes</li>
  <li>Oranges</li>
  <li>Apples</li>
  <li>Melons</li>
</ol>
```

```js
cy.get('#first li')
  .map('innerText')
  .then((list) => {
    cy.get('#second li')
      .map('innerText')
      .should('have.all.members', list)
  })
```

We can also approach this problem differently. If the two arrays have the same members, and the order does not matter, we can sort the two arrays before comparing.

```js
cy.log('**sort then compare**')
cy.get('#first li')
  .map('innerText')
  .invoke('sort')
  .then((sortedList) => {
    cy.get('#second li')
      .map('innerText')
      .invoke('sort')
      .should('deep.equal', sortedList)
  })
```

<!-- fiddle-end -->

## The second list is a subset of the first

Let's say the second list must have only items that are in the first list. The first list might have extra items.

<!-- fiddle List subset -->

```html
<ol id="first">
  <li>Apples</li>
  <li>Oranges</li>
  <li>Melons</li>
  <li>Grapes</li>
</ol>
<ol id="second">
  <li>Grapes</li>
  <li>Melons</li>
</ol>
```

I will start by grabbing the shorter list and will use the `include.all.members` assertion.

```js
cy.get('#second li')
  .map('innerText')
  .then((shorterList) => {
    cy.get('#first li')
      .map('innerText')
      .should('include.all.members', shorterList)
  })
```

<!-- fiddle-end -->
