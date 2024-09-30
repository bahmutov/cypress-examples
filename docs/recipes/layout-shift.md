# Layout Shift

<!-- fiddle Detect layout shift -->

```html hide
<button id="like">Like</button>
<div id="status">🩶</div>
<div id="other">Some text after...</div>
```

Change the CSS below to give the liked element some small padding. This will make the test fail, since we will detect the vertical shift.

```css hide
.liked {
  padding-top: 0px;
}
```

```js app hide
let liked = false
const heart = document.getElementById('status')
document.getElementById('like').addEventListener('click', () => {
  if (!liked) {
    liked = true
    heart.innerText = '❤️'
    heart.classList.add('liked')
  } else {
    liked = false
    heart.innerText = '🩶'
    heart.classList.remove('liked')
  }
})
```

Let's use [offsetTop](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop) property to remember the element's position at the start of the interaction.

```js hide
cy.get('#other')
  .should('have.prop', 'offsetTop')
  .should('be.a', 'number')
  .then((offsetTop) => {
    // interact with the app
    cy.contains('button', 'Like').click()
    // check if the element remains at the same position vertically
    cy.get('#other').should('have.prop', 'offsetTop', offsetTop)
  })
```

We can detect the horizontal shift similarly using the `offsetLeft` property.

<!-- fiddle-end -->
