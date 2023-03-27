# Negative Assertions

## First example (bad)

In this example, the test finishes too quickly. It does not wait for the "Loading..." text to go away, it simply checks if _right now_ the error message does not exist. There is not error message yet, because the application is still loading.

<!-- fiddle First example -->

```html hide
<div id="app1">Loading...</div>
<script>
  setTimeout(() => {
    const el = document.getElementById('app1')
    el.innerText = 'Loaded'
  }, 1500)
</script>
```

```js
// negative assertion
cy.get('#error').should('not.exist')
```

<!-- fiddle-end -->

## Second example (slightly better)

Let's confirm first a change in the application, like the "Loading..." text going away.

<!-- fiddle Second example -->

```html hide
<div id="app1">Loading...</div>
<script>
  setTimeout(() => {
    const el = document.getElementById('app1')
    el.innerText = 'Loaded'
  }, 1500)
</script>
```

```js
// negative assertion
cy.contains('Loading...').should('not.exist')
// negative assertion
cy.get('#error').should('not.exist')
```

<!-- fiddle-end -->

We still have a problem: what if the "Loading..." text does not appear immediately? Then both negative assertions would pass even before the application renders or loads anything meaningful.

## Third example (better)

Let's put a positive assertion in first to confirm the Loading text appears. Then we can confirm the Loading text goes away, and only then we can check if the error does not exist.

<!-- fiddle Third example -->

```html hide
<div id="app1">Loading...</div>
<script>
  setTimeout(() => {
    const el = document.getElementById('app1')
    el.innerText = 'Loaded'
  }, 1500)
</script>
```

```js
// positive assertion
cy.contains('Loading...')
// negative assertion
cy.contains('Loading...').should('not.exist')
// negative assertion
cy.get('#error').should('not.exist')
```

<!-- fiddle-end -->

## Positive example (the best)

Finally, let's make every change in our application detected. For example, we could check if the component showing that the data has loaded appears before checking the error does not exist.

<!-- fiddle Positive example -->

```html hide
<div id="app1">Loading...</div>
<script>
  setTimeout(() => {
    const el = document.getElementById('app1')
    el.innerHTML =
      '<div id="timing" data-duration="2 seconds" /><div>Loaded</div>'
  }, 1500)
</script>
```

```js
// positive assertion
cy.contains('Loading...')
// negative assertion
cy.contains('Loading...').should('not.exist')
```

We know that when the load has finished, we will have `#timing`element. At the same time there could be an error element. Thus if the `#timing` exists, then it is safe to check if the error exists or not.

```js
// positive assertion
cy.get('#timing')
// negative assertion
cy.get('#error').should('not.exist')
```

<!-- fiddle-end -->

## See also

- [Be Careful With Negative Assertions](https://glebbahmutov.com/blog/negative-assertions/)
- [Negative Assertions And Missing States](https://glebbahmutov.com/blog/negative-assertions-and-missing-states/)
