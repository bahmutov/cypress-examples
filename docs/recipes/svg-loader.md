# SVG Loader

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
