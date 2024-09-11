# Stub `window.open`

## Return synthetic window object

The application is using [window.open](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) to get a `WindowProxy` from the browser and set its `location` property to navigate.

<!-- fiddle Return synthetic window object -->

```html hide
<button id="open">Open window</button>
<script>
  document
    .getElementById('open')
    .addEventListener('click', () => {
      const win = window.open(
        '',
        '2nd-window',
        'popup,width=300,height=300',
      )
      if (win) {
        win.location = 'https://acme.co'
      }
    })
</script>
```

Before clicking on the button, stub the `window.open` method and return an object. The application simply sets the property `location` inside that object.

```js
// our own object we will return to the application
// instead of opening the real window
const winProxy = {}
cy.window().then((win) => {
  cy.stub(win, 'open').as('open').returns(winProxy)
})
```

With the method stub ready, click on the button

```js
cy.contains('button', 'Open window').click()
```

Confirm the `window.open` method call.

```js
cy.get('@open').should(
  'have.been.calledOnceWithExactly',
  '',
  '2nd-window',
  'popup,width=300,height=300',
)
```

**Tip:** if you do not know some of the parameters of the method call, you can use Sinon type placeholders:

```js
cy.get('@open').should(
  'have.been.calledOnceWithExactly',
  '',
  '2nd-window',
  Cypress.sinon.match.string,
)
```

You can even get the call arguments and check them individually

```js
cy.get('@open')
  .should('have.been.calledOnce')
  .its('firstCall.args')
  // destructure the arguments array into named parameters
  .then(([url, target, params]) => {
    expect(url, 'url').to.equal('')
    expect(target, 'target').to.include('window')
    expect(params, 'dimensions')
      .to.match(/width=\d+/)
      .and.to.match(/height=\d+/)
  })
```

The application should have set the `window.location` property to the expected domain

```js
cy.wrap(winProxy).should(
  'have.property',
  'location',
  'https://acme.co',
)
```

**Not:** the syntax `cy.wrap(winProxy).should(...)` retries. Even if the application sets the `win.location` property after a delay, the test still passes.

<!-- fiddle-end -->
