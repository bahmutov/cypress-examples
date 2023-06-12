# Store Values Using Should Callback

<!-- fiddle Store values using Should assertion callback -->

📺 you can watch this recipe in action in [Store Values Using Should Callback Function](https://youtu.be/_rlsKq6YscQ).

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

Let's confirm that when we click the "Start" button, the output eventually shows "42".

```js
cy.contains('button', 'Start').click()
cy.contains('#output', '42')
```

We can also use an explicit assertion. Let's do it again

```js
cy.log('**explicit assertion**')
cy.contains('button', 'Start').click()
cy.get('#output').should('have.text', '42')
```

How do we confirm the values displayed between clicking the "Start" button and showing the answer? Can we confirm that one of the displayed messages is "Thinking..."?

```js
cy.log('**shows that it is thinking**')
cy.contains('button', 'Start').click()
cy.contains('#output', 'Thinking...')
cy.get('#output').should('have.text', '42')
```

Can we confirm that it shows at least 5 different messages in the output?

```js
cy.log('**shows 5 messages**')
const messages = new Set()
cy.contains('button', 'Start').click()
cy.get('#output').should(($el) => {
  const text = $el.text()
  messages.add(text)
  expect(text).to.equal('42')
})
// let's print the array of strings
// in the assertion
chai.config.truncateThreshold = 300
cy.wrap(messages).then(Array.from).should('have.length.gte', 5)
```

<!-- fiddle-end -->
