# Be very careful with instanceof assertion

When working with Cypress tests there are 3 different `window` and `document` objects. You are mostly interested in the application's `window` and `document`, while your tests execute in the spec's `window` space. Thus if you grab an HTML DOM element from the application and check if it's an instance of `HTMLElement` you will get `false` - because you are using the `HTMLElement` from the spec's `window` globals.

<!-- fiddle instanceof example -->

```html
<div id="name">Joe</div>
```

```js skip
cy.get('#name').should(($el) => {
  // 🚨 INCORRECT, WILL FAIL, JUST A DEMO
  expect($el[0], 'is element').to.be.instanceof(HTMLDivElement)
})
```

When you use globals like `HTMLDivElement` they are automatically looked up from the `window` object. Thus we need to use the correct `window.HTMLDivElement` when confirming the instance of an element that comes from the application's iframe.

```js
cy.window().then((win) => {
  cy.get('#name').should(($el) => {
    // ✅ a DOM element retrieved from the application's window
    // is an instance of that window's HTMLDivElement
    expect($el[0], 'is element').to.be.instanceof(
      win.HTMLDivElement,
    )
  })
})
```

If you want to construct new DOM elements with proper prototype, you need to use the application's `document`.

```js
cy.document().then((doc) => {
  const div = doc.createElement('div')
  // the constructed DIV is NOT an element
  // from the spec's own window
  expect(div, 'spec').to.not.be.instanceof(HTMLDivElement)
  // check the constructed element against the app's iframe
  cy.window().then((win) => {
    expect(div, 'app window').to.be.instanceof(
      win.HTMLDivElement,
    )
  })
})
```

<!-- fiddle-end -->
