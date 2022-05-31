# Click Each Item

Let's say we have a list of items, and there is a button next to each item. We want to click on each item's button and then check the total number of clicks against the value displayed by the application.

<!-- fiddle Click each item -->

```html
<ul>
  <li><button>➕</button> Apples</li>
  <li><button>➕</button> Kiwi</li>
  <li><button>➕</button> Grapes</li>
  <li><button>➕</button> Melon</li>
</ul>
<output id="count">0</output>
<script>
  document.querySelectorAll('button').forEach(function (button) {
    button.addEventListener('click', function () {
      const output = document.getElementById('count')
      const n = parseInt(output.innerText)
      output.innerText = String(n + 1)
    })
  })
</script>
```

We can keep click each button and try to count the clicks to compare with the output `#count` element.

```js skip
// number of clicks
let k = 0
cy.get('ul button')
  .each(($button) => {
    // click using jQuery click() method
    $button.click()
    k += 1
  })
  // once we clicked all buttons, let's compare
  // the count we kept with the displayed count
  // because the ".click()" and "k += 1" happened
  // inside the `cy.each` callback we want to check
  // after they have finished. This is why we use "cy.then"
  .then(() => {
    cy.contains('#count', k)
  })
```

The above approach can be improved; if our application cannot handle click events in a quick succession, we could use `cy.wait` command to space them out.

```js skip
// number of clicks
let k = 0
cy.get('ul button')
  .each(($button) => {
    k += 1
    // to make we click AND ait
    // we wrap the jQuery element
    // using the cy.wrap command
    // then cy.click and cy.wait
    cy.wrap($button).click().wait(1000)
  })
  // once we clicked all buttons, let's compare
  // the count we kept with the displayed count
  // because the ".click()" and "k += 1" happened
  // inside the `cy.each` callback we want to check
  // after they have finished. This is why we use "cy.then"
  .then(() => {
    cy.contains('#count', k)
  })
```

The above approaches work. But if our buttons can process the click events in quick succession, we do not need to keep track of the number of clicks using extra variable `k`. Instead we want to click on every button. Then confirm the displayed count is the same as the number of buttons.

```js
// the count starts at zero
cy.contains('#count', 0)
// click each button
cy.get('ul button')
  .click({ multiple: true })
  // the displayed count should equal the number of buttons
  .its('length')
  .then((n) => {
    cy.contains('#count', n)
  })
```

To learn more about this refactoring, watch the video [Click Each Item Test Refactoring](https://youtu.be/wRLODxdWyuw).

<!-- fiddle-end -->
