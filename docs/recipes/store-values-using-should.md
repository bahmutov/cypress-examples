# Store Values Using Should Callback

<!-- fiddle Store values using Should assertion callback -->

```html hide
<button id="start">Start</button>
<output id="output">Waiting</output>
<script>
  const output = document.getElementById('output')
  document
    .getElementById('start')
    .addEventListener('click', () => {
      output.innerText = 'Loading...'
      setTimeout(() => {
        output.innerText = 'Thinking...'
      }, 1000)
      setTimeout(() => {
        output.innerText = 'Straining under load...'
      }, 1500)
      setTimeout(() => {
        output.innerText = 'Got it 💡'
      }, 2000)
      setTimeout(() => {
        output.innerText = 'Rendering...'
      }, 2500)
      setTimeout(() => {
        output.innerText = '42'
      }, 3000)
    })
</script>
```

```css hide
output {
  display: block;
  margin-top: 1rem;
  font-size: x-large;
}
```

```js
cy.contains('button', 'Start').click()
```

<!-- fiddle-end -->
