# Custom Events

See this example explained in 📺 [Dispatch Custom HTML Events From Cypress Tests](https://youtu.be/qCqzS3LtSeI).

<!-- fiddle Dispatch custom events -->

```html hide
<div id="signal" />
<script>
  const el = document.getElementById('signal')
  el.addEventListener('go', () => {
    el.style.backgroundColor = '#00ff00'
  })
  el.addEventListener('warn', () => {
    console.log('on warn')
    el.style.backgroundColor = '#ffff00'
  })
  el.addEventListener('stop', () => {
    el.style.backgroundColor = '#ff0000'
  })
</script>
```

```css hide
#signal {
  width: 100px;
  height: 100px;
  background-color: gray;
}
```

Our custom signal element starts with gray color.

```js
cy.get('#signal').should(
  'have.css',
  'background-color',
  'rgb(128, 128, 128)',
)
```

We can dispatch a custom event to the element by finding the element using [cy.get](https://on.cypress.io/get) command. This yields a jQuery object. We can get to the actual DOM element using `$el[0]` syntax. Then we dispatch a [custom event object](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events) using the `dispatchEvent` HTML method.

```js
cy.get('#signal').then(($el) => {
  // Cypress yields a jQuery object
  // so we take the first DOM element
  // and call its "dispatchEvent" method
  $el[0].dispatchEvent(new CustomEvent('go'))
})
```

Let's confirm the custom event worked and changed the color.

```js
cy.get('#signal').should(
  'have.css',
  'background-color',
  'rgb(0, 255, 0)',
)
```

Instead of `$el[0].dispatchEvent` we can use Cypress command [.trigger](https://on.cypress.io/trigger):

```js
cy.get('#signal').trigger('warn')
cy.get('#signal').should(
  'have.css',
  'background-color',
  'rgb(255, 255, 0)',
)
```

If we are using [cypress-map](https://github.com/bahmutov/cypress-map) plugin, then we can get the first DOM element from the jQuery object using `cy.at(0)` command and then trigger the HTML `dispatchEvent` but without retry-ability using `cy.invokeOnce`

```js
// cy.at and cy.invokeOnce commands come from
// cypress-map plugin
cy.get('#signal')
  .at(0)
  .invokeOnce('dispatchEvent', new CustomEvent('stop'))
// confirm the element turns red
cy.get('#signal').should(
  'have.css',
  'background-color',
  'rgb(255, 0, 0)',
)
```

<!-- fiddle-end -->
