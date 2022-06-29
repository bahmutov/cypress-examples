# Dollar range

## The exact price text

<!-- fiddle The exact price text -->

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

## Includes the dollar amount text

Let's say the element has some text, including a dollar amount. We want to confirm the dollar amount is within a certain range.

<!-- fiddle Includes the dollar amount text -->

```html
<div id="shipping">
  Ground shipping for $11.79, up to 2 kg.
</div>
```

```js
function includePrice(min$, max$) {
  // check the input arguments first
  if (min$ > max$) {
    throw new Error(`min $ should be <= max $`)
  }

  return function ($el) {
    // named capture group that matches "$" + dollar + cents text
    const priceRe = /\$(?<price>\d+\.\d{2})/
    const text = $el.text()
    const match = text.match(priceRe)
    expect(match, 'matched price regex').not.to.equal(null)
    // convert the string to a number
    // and confirm it is within the given range
    const price = parseFloat(match.groups.price)
    expect(price, 'price').to.be.within(min$, max$)
  }
}

// confirm the element shows somewhere the price
// between $10 and $15
cy.get('#shipping').should(includePrice(10, 15))
```

<!-- fiddle-end -->
