# No Extra Messages Appear

📝 This recipe is explained in the blog post [Shrink The Time Gap](https://glebbahmutov.com/blog/shrink-the-time-gap/) and in the video 📺 [Shrink The Time Gap](https://youtu.be/4tiwHmi3pdk).

## Extra messages can appear

<!-- fiddle Extra messages can appear -->

Let's take an example where between the click and the final state an error message might flash. How do we confirm the extra messages do NOT appear?

```html hide
<div id="app-main">
  <button id="load">Click to load</button>
</div>
<script>
  const main = document.getElementById('app-main')
  const load = document.getElementById('load')
  load.addEventListener('click', () => {
    load.innerText = 'Loading...'
    const showExtra = Math.random() < 1
    if (showExtra) {
      setTimeout(() => {
        main.innerHTML =
          '<p class="error">Something went wrong...</p>'
      }, 1000)
    }
    setTimeout(() => {
      main.innerHTML = '<p>Loaded</p>'
    }, 2000)
  })
</script>
```

The positive assertions below do NOT catch the flashing error message.

```js
cy.contains('button', 'load')
  .click()
  .should('have.text', 'Loading...')
// confirm the final state
cy.contains('Loaded')
```

<!-- fiddle-end -->

## Catch any extra elements

<!-- fiddle Use short timeout to catch any extra elements -->

```html hide
<div id="app-main">
  <button id="load">Click to load</button>
</div>
<script>
  const main = document.getElementById('app-main')
  const load = document.getElementById('load')
  load.addEventListener('click', () => {
    load.innerText = 'Loading...'
    // set the limit to 1 to see the error message
    // appear in between loading and the loaded states
    const showExtra = Math.random() < 0
    if (showExtra) {
      setTimeout(() => {
        main.innerHTML =
          '<p class="error">Something went wrong...</p>'
      }, 1000)
    }
    setTimeout(() => {
      main.innerHTML = '<p>Loaded</p>'
    }, 2000)
  })
</script>
```

Combine a negative assertion "the initial element disappears" with a second check that has very short timeout. The success message "Loaded" should appear _very quickly_ after the previous message "Loading" goes away. This catches any other elements trying to sneak in between.

```js
cy.contains('button', 'load')
  .click()
  .should('have.text', 'Loading...')
// the "Loading..." element goes away
cy.contains('button', 'Loading...').should('not.exist')
// and the final state appears very quickly
cy.contains('Loaded', { timeout: 10 })
```

<!-- fiddle-end -->
