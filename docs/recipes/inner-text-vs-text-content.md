# Difference between innerText and textContent

<!-- fiddle innerText vs textContent -->

`innerText` is focused on what the user sees. It is derived from the property `textContent` by cleaning it up.

```html
<div id="example">
  Hello World!
  <span style="display: none;">This is hidden text</span>
</div>
```

The assertion "have.text" uses `textContent`

```js
cy.get('#example')
  .should(
    'have.text',
    `
  Hello World!
  This is hidden text
`,
  )
  // get the element's innerText value
  .its('0.innerText')
  // which skips the "display: none" for example
  .should('equal', 'Hello World!')
```

<!-- fiddle-end -->

## textContent includes scripts and styles

<!-- fiddle textContent includes scripts -->

```html
<div id="example">
  Hello
  <script>
    console.log(42)
  </script>
</div>
```

```js
cy.get('#example')
  .should(
    'have.text',
    `
  Hello
${'  '}
    console.log(42)
${'  '}
`,
  )
  .its('0.innerText')
  // innerText omits scripts and styles
  .should('equal', 'Hello')
```

<!-- fiddle-end -->
