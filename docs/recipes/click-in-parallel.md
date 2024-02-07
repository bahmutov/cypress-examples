# Click in Parallel With The Cypress Command

Imagine we want to show how Cypress auto-retries checking the element. We want to show the following steps:

- start waiting for the text "Finished" to appear
- click on the button "Do it" which causes the application to add the text "Finished"

The above code seems simple, yet this exact order of commands is not easy to implement in Cypress. Cypress commands run sequentially one by one. Thus the following does not work:

```js
// 🚨 DOES NOT WORK
cy.contains('Finished')
cy.contains('button', 'Do it').click()
```

Since the `click` causes the text "Finished", the test simply times out waiting for the `cy.contains('Finished')` to pass. No one is there to click... Here are a couple of workarounds.

<!-- fiddle Click in parallel -->

```html hide
<div id="output" />
<button id="doit">Do it</button>
<script>
  document
    .getElementById('doit')
    .addEventListener('click', () => {
      setTimeout(() => {
        document.getElementById('output').innerText = 'Finished'
      }, 1000)
    })
</script>
```

We can get the reference to the button and use jQuery method to trigger the "click" event. Since this is NOT a Cypress command, the `$btn.trigger` and `cy.contains` can run in parallel.

```js
// ✅ the right solution to waiting
// while clicking on the button
cy.document()
  .invoke('getElementById', 'doit')
  .then(($btn) => {
    // the Contains command starts waiting and checking the document
    cy.contains('Finished')
    // meanwhile we click on the button using jQuery trigger method
    // this click will be in parallel to the "cy.contains" command
    $btn.trigger('click')
  })
```

<!-- fiddle-end -->

**Note:** running jQuery `trigger('click')` command bypasses all Cypress actionability checks and runs immediately, without queueing up.

## Using window properties

The same test can be rewritten using window properties instead of `document.getElementById('doit')` method calls. Since every element with `id=xyz` is automatically a property of the window object `window.xyz`, we can write:

<!-- fiddle Click in parallel using window properties -->

```html hide
<div id="output" />
<button id="doit">Do it</button>
<script>
  window.doit.addEventListener('click', () => {
    setTimeout(() => {
      window.output.innerText = 'Finished'
    }, 1000)
  })
</script>
```

Both the application code and the test code can use `window.xyz` method to access the DOM elements.

```js
// ✅ the right solution to waiting
// while clicking on the button
cy.window()
  .its('doit')
  .then(($btn) => {
    cy.contains('Finished')
    // immediately click on the button
    $btn.trigger('click')
  })
```

<!-- fiddle-end -->
