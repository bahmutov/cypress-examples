# Element With ID

📺 Watch this recipe in the video [DOM Element With ID Becomes Property Of The Window Object](https://youtu.be/mdNuuKl2dpw).

<!-- fiddle Element with ID is a window property -->

If a DOM element has an `id=<name>` property, the element is automatically linked to the `window` object as its `name` property. Cypress tests run in the browser, thus we can confirm it by comparing the queried element reference to the `window[name]` reference.

```html
<div id="person">Joe</div>
```

```js
cy.get('#person').then(($el) => {
  // using cy.window and cy.its commands
  // get the "window.person" element
  // and confirm it is the same as the element
  // inside the jQuery object yielded by the cy.get command
  cy.window().its('person').should('equal', $el[0])
  // print both elements to the DevTools console
  cy.window().then((w) => {
    console.log('window.person', w.person)
    console.log('cy.get person', $el[0])
  })
})
```

<!-- fiddle-end -->
