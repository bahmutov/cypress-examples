# Element Re-renders

Imagine a part of the HTML page re-renders, even if it does not change the visual appearance. We can detect DOM reference change from our test.

<!-- fiddle Element re-renders -->

```html
<div id="example">
  <div id="child">Child element</div>
</div>
<button id="rerender">Re-render</button>
```

When the user clicks the button, the entire "#example" element is replaced, so the DOM reference to the "#child" element changes. The change is asynchronous and happens after 1 second.

```js app hide
document
  .getElementById('rerender')
  .addEventListener('click', () => {
    setTimeout(() => {
      document.getElementById('example').innerHTML = `
        <div id="example">
          <div id="child">Child element</div>
        </div>
      `
      console.log('Element re-rendered')
    }, 1000)
  })
```

To detect the DOM change and element re-rendering, keep the old reference before clicking the element, then compare the new jQuery object yielded by the `cy.contains` command. The DOM reference in the jQuery object should change.

```js
cy.contains('#child', 'Child element').then(($el) => {
  const ref = $el[0]

  cy.contains('button', 'Re-render').click()
  // at some point, the element changes
  cy.contains('#child', 'Child element', {
    timeout: 1500,
  }).should(($child) => {
    expect($child[0], 'DOM reference').to.not.equal(ref)
  })
})
```

<!-- fiddle-end -->
