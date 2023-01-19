# SVG Loader

### SVG element is removed

<!-- fiddle Animated SVG loader -->

📺 Watch this recipe in the video [SVG Loader Example](https://youtu.be/Abv7m9H_15Y).

```html hide
<div class="loader">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="80px"
    height="80px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      stroke="#3F80F3"
      stroke-width="10"
      r="30"
      stroke-dasharray="141.37166941154067 49.12388980384689"
      transform="rotate(182.503 50 50)"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        calcMode="linear"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
        dur="2s"
        begin="0s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
</div>
<script>
  setTimeout(() => {
    document.querySelector('.loader').innerHTML = `
      <span>Loaded!</span>
    `
  }, 2500)
</script>
```

```js
cy.get('.loader svg').should('be.visible')
cy.get('.loader svg').should('not.exist')
cy.contains('.loader', 'Loaded')
```

<!-- fiddle-end -->

### SVG animation finishes

Imagine we want to know when the SVG animation finishes. From the spec code we can listen to the `endEvent` event on the `animateTransform` element. By using a `cy.spy` and its assertion `have.called` we can automatically wait in our test.

<!-- fiddle SVG loader finishes its animation -->

```html hide
<div class="loader">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="80px"
    height="80px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      stroke="#3F80F3"
      stroke-width="10"
      r="30"
      stroke-dasharray="141.37166941154067 49.12388980384689"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        calcMode="linear"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
        dur="2s"
        begin="0s"
        repeatCount="1"
      />
    </circle>
  </svg>
</div>
```

```js
cy.get('.loader svg')
  .should('be.visible')
  .find('animateTransform')
  .invoke('on', 'endEvent', cy.spy().as('animate'))
// wait for the animation to finish
cy.get('@animate').should('have.been.called')
```

<!-- fiddle-end -->
