# Text is present in another element

Let's say we want to check if the text from the first element is present in the second element on the page.

<!-- fiddle Text is present in another element -->

```html
<div id="current-date">June 28th, 2022</div>
<div id="message">
  Your order has been shipped on
  <span class="note">June 28th, 2022</span>.
</div>
<style>
  .note {
    font-weight: 200;
  }
</style>
```

```js
// find the first element
cy.get('#current-date')
  // and get its current text by invoking
  // the jQuery text() method
  .invoke('text')
  .then((text) => {
    // confirm the message includes the given text
    cy.contains('#message', text)
    // confirm the message has a note with exact text
    cy.get('#message .note').should('have.text', text)
  })
```

Watch the video [Confirm The Text From The First Element Is Present In The Second Element](https://youtu.be/eWxrLNmJbE0).

<!-- fiddle-end -->
