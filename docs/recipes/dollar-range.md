# Dollar range

<!-- fiddle dollar range -->

Imagine we want to confirm that the displayed price is within certain range, for example between $10 and $20. We need to grab the text of the element, remove the `$` character, convert the text to a number, then assert it is within the range. We could add a custom assertion, or simply construct a callback function to be passed as the `should(callback)` argument to ensure the command plus assertion retries.

```html
<div id="price">$99.99</div>
<script>
  // the initial price will come down after a discount
  // is applied to be within the expected range
  setTimeout(function () {
    document.getElementById('price').innerText = '$14.99'
  }, 1000)
</script>
```

```js
function dollarRange(min$, max$) {
  // check the input arguments first
  if (min$ > max$) {
    throw new Error(`min $ should be <= max $`)
  }

  // construct the "should(callback)" function
  // that checks the given jQuery element
  return function checkElement($el) {
    const text = $el.text().replace('$', '')
    const price = Number(text)
    // use any Chai assertions inside the callback
    expect(price, 'price').to.be.within(min$, max$)
  }
}
// retry until the price element shows the
// price in the expected range, or the command times out
cy.get('#price').should(dollarRange(10, 20))
```

<!-- fiddle-end -->
