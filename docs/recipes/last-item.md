# Last item in an array

<!-- fiddle Last item -->

Imagine we have a list of items and want to check the last one. Assume the list is the current subject of a Cypress chain of commands.

```js
const list = [1, 2, 3]
```

We can grab the last item by invoking the Array's `at` method. By passing the `-1` parameter, we get the last item.

```js
cy.wrap(list).invoke('at', -1).should('equal', 3)
// get the second to last item
cy.wrap(list).invoke('at', -2).should('equal', 2)
```

Cypress bundles Lodash library. We can use its `_.last` method to get the last item of a collection.

```js
// get the last item using Lodash _.last method
cy.wrap(list).then(Cypress._.last).should('equal', 3)
```

<!-- fiddle-end -->
