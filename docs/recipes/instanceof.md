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
cy.log('**window.HTMLDivElement**')
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

Watch the video [Correctly Using instanceof Assertion In Cypress Test](https://youtu.be/5VJOpg09w2k).

## Using the "with" statement

There is one other way to "trick" the `instanceof` check to use the right `HTMLDivElement`. By default, JavaScript engine looks up non-local reference like `HTMLDivElement` in the global object, which in this case is the wrong `window`. You can override the lookup, and force the JS engine to use a given object via the [`with` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with). I **do not recommend doing this**, as using the `with` statement can lead to weird behavior and hard to debug bugs. But I want to give you the complete picture, so here it is:

```js
cy.log('**with window**')
cy.window().then((window) => {
  // get the application's window and use with(window)
  // to look up the correct "HTMLDivElement" when needed
  with (window) {
    cy.get('#name').should(($el) => {
      expect($el[0], 'is element').to.be.instanceof(
        HTMLDivElement,
      )
    })
  }
})
```

Looking up `cy.window` every time you need to use it might be annoying. You can probably get away with fetching it from the internal `cy.state` object; that is a synchronous operation.

```js
cy.log('**cy.state(window)**')
const win = cy.state('window')
with (win) {
  cy.get('#name').should(($el) => {
    expect($el[0], 'is element').to.be.instanceof(HTMLDivElement)
  })
}
```

<!-- fiddle-end -->
