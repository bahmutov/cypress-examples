# Number Of Elements

Imagine you want to confirm the number of list items. The best test syntax depends on how the elements are loaded: are they present already or load dynamically? Do you know the exact number or are there several possible answers? Can the number of elements be zero? The following examples show every scenario.

📺 watch video [Confirm The Number Of Elements In Different Scenarios](https://youtu.be/uKpJZbEc6HY)

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

## Print number of elements

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

## Print number of elements using cypress-map

Let's say the list with three elements appears after a delay

<!-- fiddle Print number of elements using cypress-map -->

We can print the number of elements using query `cy.print` from [cypress-map](https://github.com/bahmutov/cypress-map) plugin.

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

```js
cy.get('#fruits li')
  .its('length')
  .print('found %d elements')
  // the number is passed to the assertion
  .should('equal', 3)
```

<!-- fiddle-end -->

## Confirm the first element

Let's confirm the first element's text. We first confirm the list loads 3 elements and then get the first element and confirm its text.

<!-- fiddle Confirm the first element -->

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

```js
cy.get('#fruits li')
  .should('have.length', 3)
  .first()
  .should('have.text', 'Apples')
```

<!-- fiddle-end -->

## Several possible numbers

If the list can have two possible lengths, we can query its `length` property and add an assertion to it. In the example below the list can have either 3 or 5 items.

<!-- fiddle Several possible numbers -->

```html
<ul id="fruits"></ul>
<script>
  setTimeout(function () {
    if (Math.random() < 0.5) {
      document.querySelector('ul#fruits').innerHTML = `
        <li>Apples</li>
        <li>Pears</li>
        <li>Kiwi</li>
      `
    } else {
      document.querySelector('ul#fruits').innerHTML = `
        <li>Apples</li>
        <li>Pears</li>
        <li>Kiwi</li>
        <li>Grapes</li>
        <li>Bananas</li>
      `
    }
  }, 1000)
</script>
```

The chain `cy.get(...).its(...).should(...)` retries if the assertion does not pass.

```js
cy.get('#fruits li')
  .its('length')
  .should('be.oneOf', [3, 5])
  .then((n) => cy.log(`found ${n} elements`))
```

<!-- fiddle-end -->

## Range of possible values

If the number of items can be between two limits, then we can use another assertion

<!-- fiddle Range of possible numbers -->

```html
<ul id="fruits"></ul>
<script>
  setTimeout(function () {
    if (Math.random() < 0.5) {
      document.querySelector('ul#fruits').innerHTML = `
        <li>Apples</li>
        <li>Pears</li>
        <li>Kiwi</li>
      `
    } else {
      document.querySelector('ul#fruits').innerHTML = `
        <li>Apples</li>
        <li>Pears</li>
        <li>Kiwi</li>
        <li>Grapes</li>
        <li>Bananas</li>
      `
    }
  }, 1000)
</script>
```

Let's use `within` Chai assertion.

```js
cy.get('#fruits li')
  .its('length')
  .should('be.within', 3, 5)
  .then((n) => cy.log(`found ${n} elements`))
```

<!-- fiddle-end -->

## Number of elements follows a rule

Let's say we only now that the number of loaded elements should be divisible by 3

<!-- fiddle Number of elements follows a rule -->

```html hide
<ul id="fruits"></ul>
<script>
  setTimeout(function () {
    if (Math.random() < 0.5) {
      document.querySelector('ul#fruits').innerHTML = `
        <li>Apples</li>
        <li>Pears</li>
        <li>Kiwi</li>
      `
    } else {
      document.querySelector('ul#fruits').innerHTML = `
        <li>Apples</li>
        <li>Pears</li>
        <li>Kiwi</li>
        <li>Grapes</li>
        <li>Bananas</li>
        <li>Plums</li>
      `
    }
  }, 1000)
</script>
```

We want to make sure the number of elements is divisible by 3.

```js
cy.get('#fruits li')
  .its('length')
  // the predicate function should return a boolean result
  .should('satisfy', (n) => n % 3 === 0)
  .then((n) => cy.log(`found ${n} elements`))
```

**Tip:** you could also write a custom assertion function that can use Chai or any assertions

```js
cy.get('#fruits li')
  .its('length')
  .should((n) => {
    expect(n % 3 === 0, `${n} elements`).to.be.true
  })
```

<!-- fiddle-end -->

## There could be zero or N elements

📺 Watch this example explained in video [Zero Or Three Elements After Loading The Data](https://youtu.be/qL5R0C-0_-Y).

Now imagine the list on the page is created from the data sent by the server. The server could send an empty list. How do we validate the page if there could be either zero or three elements? We need something observable on the page to let the test "know" that the data has been loaded and now it is safe to grab the elements.

<!-- fiddle There could be zero or 3 elements -->

```html hide
<ul id="fruits"></ul>
<script>
  setTimeout(function () {
    if (Math.random() < 0.5) {
      document.querySelector('ul#fruits').innerHTML = `
        <li>Apples</li>
        <li>Pears</li>
        <li>Kiwi</li>
      `
    }
    // in all cases, set an attribute
    // to signal the data has been loaded
    document
      .querySelector('ul#fruits')
      .setAttribute('data-loaded', 'true')
  }, 1000)
</script>
```

Our test first waits for the data to load by checking the attribute

```js
cy.get('ul#fruits')
  .should('have.attr', 'data-loaded', 'true')
  // find LI elements, but allow them NOT to exist
  .find('li')
  .should(Cypress._.noop)
  .its('length')
  .should('be.oneOf', [0, 3])
```

We can also check the jQuery object's length using `should('satisfy', ...)` or `should(callback)` assertions. Just make sure to check after the `.should('have.attr', 'data-loaded', 'true')` passed.

```js
// using "satisfy" assertion
cy.get('ul#fruits li').should(
  'satisfy',
  ($li) => $li.length === 0 || $li.length === 3,
)
// using "should(callback)" assertion
cy.get('ul#fruits li').should(($li) => {
  expect($li.length, 'number of elements').to.be.oneOf([0, 3])
})
```

<!-- fiddle-end -->

## N elements or nothing found message

Imagine the page loads elements or shows "Nothing found" message. Can we confirm that one or the other happens?

<!-- fiddle N elements or nothing found message -->

```html hide
<ul id="fruits"></ul>
<script>
  setTimeout(function () {
    if (Math.random() < 0.5) {
      document.querySelector('ul#fruits').innerHTML = `
        <li>Apples</li>
        <li>Pears</li>
        <li>Kiwi</li>
      `
    } else {
      document.querySelector('ul#fruits').innerText =
        'Nothing found'
    }
  }, 1000)
</script>
```

Find the `<ul id="fruits">` element with either `LI` elements inside or text "Nothing found".

```js
cy.get('ul#fruits li, ul#fruits:contains("Nothing found")')
```

If we want to confirm the number of `LI` elements, then we need more [conditional logic](./conditional-testing.md).

```js
// find LI elements inside the fruits element
// OR text "Nothing found"
cy.get('ul#fruits li, ul#fruits:contains("Nothing found")').then(
  ($el) => {
    if ($el.is('ul#fruits li')) {
      // we found "LI" elements inside the fruits list
      expect($el).to.have.length(3)
    }
  },
)
```

<!-- fiddle-end -->

## N elements or nothing found element

The previous example searched for exact text match "Nothing found". To make this more generic and avoid hard-coding the text, we can use a specific "Nothing found" data attribute instead.

<!-- fiddle N elements or nothing found element -->

```html hide
<ul id="fruits"></ul>
<script>
  setTimeout(function () {
    if (Math.random() < 0.5) {
      document.querySelector('ul#fruits').innerHTML = `
        <li>Apples</li>
        <li>Pears</li>
        <li>Kiwi</li>
      `
    } else {
      document.querySelector('ul#fruits').innerHTML =
        '<div data-cy="zero-state">Nothing there...</div>'
    }
  }, 1000)
</script>
```

Find the `<ul id="fruits">` element with either `LI` elements inside or the "zero state" element. Let's confirm the number of LI elements and zero state message if found.

```js
cy.get('ul#fruits li, ul#fruits [data-cy=zero-state]').then(
  ($el) => {
    if ($el.is('li')) {
      // we found "LI" elements inside the fruits list
      expect($el).to.have.length(3)
    } else {
      // found zero state element, let's confirm its text
      expect($el).to.include.text('Nothing there')
    }
  },
)
```

<!-- fiddle-end -->

## See also

- [Number of rows](./number-of-rows.md)
- 📝 blog post [Shrink The Time Gap](https://glebbahmutov.com/blog/shrink-the-time-gap/)
