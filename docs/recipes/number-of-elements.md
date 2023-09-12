# Number Of Elements

Imagine you want to confirm the number of list items. The best test syntax depends on how the elements are loaded: are they present already or load dynamically? Do you know the exact number or are there several possible answers? Can the number of elements be zero? The following examples show every scenario.

## Static list

Let's start with the simplest case: the static list with a known number of elements to expect.

<!-- fiddle Static list -->

```html
<ul id="fruits">
  <li>Apples</li>
  <li>Pears</li>
  <li>Kiwi</li>
</ul>
```

Let's confirm we have three fruits

```js
cy.get('#fruits li').should('have.length', 3)
```

<!-- fiddle-end -->

## Dynamic list

Let's say the list with three elements appears after a delay

<!-- fiddle Dynamic list -->

```html
<ul id="fruits"></ul>
<script>
  setTimeout(function () {
    document.querySelector('ul#fruits').innerHTML = `
      <li>Apples</li>
      <li>Pears</li>
      <li>Kiwi</li>
    `
  }, 1000)
</script>
```

Let's confirm we have three fruits. Notice the test does not change because the `cy.get(...).should(...)` query chain retries until the elements appear.

```js
cy.get('#fruits li').should('have.length', 3)
```

<!-- fiddle-end -->

## Slowly loading dynamic list

Let's see a scenario where each element loads slowly

<!-- fiddle Slow list -->

```html
<ul id="fruits"></ul>
<script>
  setTimeout(function () {
    document.querySelector('ul#fruits').innerHTML =
      '<li>Apples</li>'
  }, 2000)
  setTimeout(function () {
    document.querySelector('ul#fruits').innerHTML +=
      '<li>Pears</li>'
  }, 4000)
  setTimeout(function () {
    document.querySelector('ul#fruits').innerHTML +=
      '<li>Kiwi</li>'
  }, 6000)
</script>
```

We want to wait for 6 seconds for all elements to load. We can increase the command timeout by adding a section to the `cy.get` command

```js
cy.get('#fruits li', { timeout: 6500 }).should('have.length', 3)
```

<!-- fiddle-end -->

## Dynamic list

Let's say the list with three elements appears after a delay

<!-- fiddle Print number of elements -->

```html
<ul id="fruits"></ul>
<script>
  setTimeout(function () {
    document.querySelector('ul#fruits').innerHTML = `
      <li>Apples</li>
      <li>Pears</li>
      <li>Kiwi</li>
    `
  }, 1000)
</script>
```

Let's confirm we have three fruits and then print the number of elements. By default `cy.get` command yields the jQuery element with found elements. We want to print its `length` property. We can chain the commands to form a single test.

```js
cy.get('#fruits li')
  .should('have.length', 3)
  .its('length')
  .then((n) => cy.log(`found ${n} elements`))
```

<!-- fiddle-end -->

## See also

- [Number of rows](./number-of-rows.md)
