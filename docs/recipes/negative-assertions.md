# Negative Assertions

📺 Watch the explanation for this video in [Negative Assertions](https://youtu.be/KRhpi2whppA).

## The basics

Cypress has built-in [retry-ability](./retry-ability.md) in most of its commands. If an assertion does not pass, Cypress keeps retrying. If an assertion is _positive_ then it is usually easy to reason.

<!-- fiddle The basics -->

For example, the page does not show the "Loaded" text initially. We want to check if the page shows "Loaded", thus we check if the _positive_ change happens on the page.

```html
<div id="basics">starting...</div>
<script>
  // the text appears after a delay
  setTimeout(function () {
    const el = document.getElementById('basics')
    el.innerText = 'Loaded'
  }, 1500)
</script>
```

```js
// cy.contains has a built-in "exists" assertion
cy.contains('#basics', 'Loaded')
```

<!-- fiddle-end -->

## A negative assertion

<!-- fiddle A negative assertion -->

A negative assertion checks if something is not there. If the element is present, then Cypress retries until the negative assertion passes.

```html
<div id="basics">starting...</div>
<script>
  // the text appears after a delay
  setTimeout(function () {
    const el = document.getElementById('basics')
    el.innerText = 'Loaded'
  }, 1500)
</script>
```

Let's use a negative assertion to confirm the text "starting..." goes away.

```js
cy.contains('#basics', 'starting').should('not.exist')
```

<!-- fiddle-end -->

A problem with negative assertions is timing. Often such assertions pass _too early_ when the application has not finished loading or updating. For example, I often see the test code like this that probably would happily be passing, while the application is broken:

```js
cy.get('button').click()
cy.location('pathname').should('equal', '/new-url')
cy.contains('#error').should('not.exist')
```

Guess what - the error element is not there when the page _just_ starts loading, right. The test finishes, while the application loads its data, and then "boom!" it shows an error. But our test has completed already. In the next couple of examples, I will explain how to solve this problem.

## First example (bad)

In this example, the test finishes too quickly. It does not wait for the "Loading..." text to go away, it simply checks if _right now_ the error message does not exist. There is not error message yet, because the application is still loading.

<!-- fiddle First example -->

```html hide
<div id="app1">Loading...</div>
<script>
  setTimeout(function () {
    const el = document.getElementById('app1')
    el.innerText = 'Loaded'
  }, 1500)
</script>
```

```js
// negative assertion
cy.get('#error').should('not.exist')
```

Here is the application code that might "break" the test and cause it to pass for the wrong reason:

```html skip
<div>About to load...</div>
```

<!-- fiddle-end -->

## Second example (slightly better)

Let's confirm first a change in the application, like the "Loading..." text going away.

<!-- fiddle Second example -->

```html hide
<div id="app2">Loading...</div>
<script>
  setTimeout(function () {
    const el = document.getElementById('app2')
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

Here is the application code that might show an error, yet the test would pass.

```html skip
<div id="app2b">Loading...</div>
<script>
  setTimeout(function () {
    const el = document.getElementById('app2b')
    el.innerText = '...'
  }, 1500)
  // the error is displayed after a short delay
  setTimeout(function () {
    const el = document.getElementById('app2b')
    el.innerText = 'Error'
  }, 1550)
</script>
```

<!-- fiddle-end -->

We still have a problem: what if the "Loading..." text does not appear immediately? Then both negative assertions would pass even before the application renders or loads anything meaningful.

## Third example (better)

Let's put a positive assertion in first to confirm the Loading text appears. Then we can confirm the Loading text goes away, and only then we can check if the error does not exist.

<!-- fiddle Third example -->

```html hide
<div id="app3">Loading...</div>
<script>
  setTimeout(function () {
    const el = document.getElementById('app3')
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

Again, if the application is showing an error after a short delay after the loading element goes away, our test will be green, yet the user would see an error.

```html skip
<div id="app2b">Loading...</div>
<script>
  setTimeout(function () {
    const el = document.getElementById('app2b')
    el.innerText = '...'
  }, 1500)
  // the error is displayed after a short delay
  setTimeout(function () {
    const el = document.getElementById('app2b')
    el.innerText = 'Error'
  }, 1550)
</script>
```

<!-- fiddle-end -->

## Positive example (the best)

Finally, let's make every change in our application detected. For example, we could check if the component showing that the data has loaded appears before checking the error does not exist.

<!-- fiddle Positive example -->

```html hide
<div id="app4">Loading...</div>
<script>
  setTimeout(function () {
    const el = document.getElementById('app4')
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
