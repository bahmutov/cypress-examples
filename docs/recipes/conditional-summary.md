# Conditional Summary

How do you test an UI element without controlling its precise state? For example, imagine the page loading a details element. Sometimes the details element is initially opened, sometimes it is closed.

<!-- fiddle Conditional details -->

```html hide
<div id="app"></div>
```

```js app hide
const app = document.getElementById('app')
// extra detail: the details element itself is delayed
setTimeout(() => {
  if (Math.random() < 0.5) {
    // the details are closed
    app.innerHTML = `
      <details>
        <summary>Details</summary>
      </details>
    `
  } else {
    // the details are opened
    app.innerHTML = `
      <details open>
        <summary>Details</summary>
        <div data-cy="details">
          Something small enough to escape casual notice.
        </div>
      </details>
    `
  }
  // remove the details element
  const details = document.querySelector('details')
  details.addEventListener('toggle', () => {
    if (details.open) {
      details.innerHTML = `
        <summary>Details</summary>
        <div data-cy="details">
          Something small enough to escape casual notice.
        </div>
      `
    } else {
      details.innerHTML = `
        <summary>Details</summary>
      `
    }
  })
}, 1000)
```

```css hide
details {
  border: 1px solid #aaaaaa;
  border-radius: 4px;
  padding: 0.5em 0.5em 0;
}

summary {
  font-weight: bold;
  margin: -0.5em -0.5em 0;
  padding: 0.5em;
}

details[open] {
  padding: 0.5em;
}

details[open] summary {
  border-bottom: 1px solid #aaaaaa;
  margin-bottom: 0.5em;
}
```

How do we confirm that the `<details>` element shows the expected text when opened? The element itself should be present, and we can find out its state from its attribute `open`.

```js
cy.get('details')
  .should('be.visible')
  // we can determine the opened state by looking at its attribute
  // if it present, its value will be "open"
  .invoke('attr', 'open')
  .then(Boolean)
  .then((open) => {
    // conditional testing depending on the element's initial state
    if (open) {
      cy.log('**Details are shown**')
      cy.get('[data-cy="details"]').should('be.visible')
      // click on the details element to close it
      // and confirm the detail element is gone
      cy.get('details').click()
      cy.get('[data-cy="details"]').should('not.exist')
    } else {
      cy.log('**Details are hidden**')
      cy.get('[data-cy="details"]').should('not.exist')
      // click on the details element to see text
      cy.get('details').click()
      cy.get('[data-cy="details"]').should('be.visible')
    }
  })
```

<!-- fiddle-end -->

## See also

- [Conditional testing](./conditional-testing.md)
