# Query Multiple Elements

Can you confirm that the subtotal + tax + tip is equal to the total displayed on the page? What if the page is loading dynamically? Elements might be added after a delay. An element might show `--` before showing the real number?

## Use a single should callback

<!-- fiddle Use a single should callback that queries the page -->

```html hide
<style>
  .dollars::before {
    content: '$';
    margin-right: 2px;
  }
  .dollars {
    width: 6rem;
    text-align: right;
  }
</style>
<div>
  Subtotal <span id="subtotal" class="dollars">20.15</span>
</div>
<div>Total <span id="total" class="dollars">--</span></div>
<div><strong>Fees</strong></div>
<div>Tax <span id="tax" class="dollars">1.70</span></div>
<div>Tip&nbsp;</div>
<script>
  setTimeout(() => {
    document.getElementById('total').innerText = '24.85'
  }, 2000)

  setTimeout(() => {
    Cypress.$('#live div:contains("Tip")').append(
      '<span id="tip" class="dollars">3.00</span>',
    )
  }, 1000)
</script>
```

```js hide
cy.get('#subtotal, #tax, #tip, #total').should(($el) => {
  // all elements are present
  expect($el).to.have.length(4)
  // we do not know the order of elements
  // so we need to find each one
  // Because our jQuery object has [el1, el2, el3, el4]
  // need to use search it like an array of objects
  // using Lodash convenient utility _.find
  const subtotal = Number(
    Cypress._.find($el, { id: 'subtotal' }).innerText,
  )
  const tax = Number(
    Cypress._.find($el, { id: 'tax' }).innerText,
  )
  const tip = Number(
    Cypress._.find($el, { id: 'tip' }).innerText,
  )
  const total = Number(
    Cypress._.find($el, { id: 'total' }).innerText,
  )
  expect(total, 'total').to.greaterThan(0)
  expect(subtotal + tax + tip, 'total sum').to.be.closeTo(
    total,
    0.001,
  )
})
```

**Note:** I am using `should(callback)` and not [cy.spread(callback)](https://on.cypress.io/spread) command, because I want to the query chain to retry if the numbers do not add up. The `cy.spread` command does not retry, so if the numbers are not immediately available, the test would fail.

<!-- fiddle-end -->

## Waiting for each number to load

We can wait for each number before computing the sum. We can avoid the pyramid of Doom by using [aliases](./aliases.md).

<!-- fiddle Waiting for each number to load -->

```html hide
<style>
  .dollars::before {
    content: '$';
    margin-right: 2px;
  }
  .dollars {
    width: 6rem;
    text-align: right;
  }
</style>
<div>
  Subtotal <span id="subtotal" class="dollars">20.15</span>
</div>
<div>Total <span id="total" class="dollars">--</span></div>
<div><strong>Fees</strong></div>
<div>Tax <span id="tax" class="dollars">1.70</span></div>
<div>Tip&nbsp;</div>
<script>
  setTimeout(() => {
    document.getElementById('total').innerText = '24.85'
  }, 2000)

  setTimeout(() => {
    Cypress.$('#live div:contains("Tip")').append(
      '<span id="tip" class="dollars">3.00</span>',
    )
  }, 1000)
</script>
```

```js hide
cy.get('#subtotal')
  .should('not.have.text', '--')
  .invoke('text')
  .as('subtotal')
cy.get('#tax')
  .should('not.have.text', '--')
  .invoke('text')
  .as('tax')
cy.get('#tip')
  .should('not.have.text', '--')
  .invoke('text')
  .as('tip')
cy.get('#total')
  .should('not.have.text', '--')
  .invoke('text')
  .as('total')
  // by now, all number should be there and we can run the assertion
  // without retrying using cy.then callback
  // grab all saved aliases using the test context "this" object
  // inside a "function () { }" callback
  .then(function () {
    const subtotal = Number(this.subtotal)
    const tax = Number(this.tax)
    const tip = Number(this.tip)
    const total = Number(this.total)
    expect(total, 'total').to.greaterThan(0)
    expect(subtotal + tax + tip, 'total sum').to.be.closeTo(
      total,
      0.001,
    )
  })
```

<!-- fiddle-end -->

## Using getInOrder and a should callback

We can query all 4 elements we need using `cy.getInOrder` from my [cypress-map](https://github.com/bahmutov/cypress-map) plugin. Then we can transform text to numbers and use a single `should(callback)` to confirm the sum.

<!-- fiddle Using getInOrder and a should callback -->

```html hide
<style>
  .dollars::before {
    content: '$';
    margin-right: 2px;
  }
  .dollars {
    width: 6rem;
    text-align: right;
  }
</style>
<div>
  Subtotal <span id="subtotal" class="dollars">20.15</span>
</div>
<div>Total <span id="total" class="dollars">--</span></div>
<div><strong>Fees</strong></div>
<div>Tax <span id="tax" class="dollars">1.70</span></div>
<div>Tip&nbsp;</div>
<script>
  setTimeout(() => {
    document.getElementById('total').innerText = '24.85'
  }, 2000)

  setTimeout(() => {
    Cypress.$('#live div:contains("Tip")').append(
      '<span id="tip" class="dollars">3.00</span>',
    )
  }, 1000)
</script>
```

```js hide
cy.getInOrder('#subtotal', '#tax', '#tip', '#total')
  .map('innerText')
  .map(Number)
  .print(
    'Subtotal {0.0} + tax {0.1} + tip {0.2} should be {0.3}',
  )
  // if the should(callback) assertion fails
  // it will retry the entire chain of queries
  // starting with cy.getInOrder query
  .should(([subtotal, tax, tip, total]) => {
    expect(total, 'total').to.greaterThan(0)
    expect(subtotal + tax + tip, 'total sum').to.be.closeTo(
      total,
      0.001,
    )
  })
```

**Note:** I am using `should(callback)` and not [cy.spread(callback)](https://on.cypress.io/spread) command, because I want to the query chain to retry if the numbers do not add up. The `cy.spread` command does not retry, so if the numbers are not immediately available, the test would fail.

<!-- fiddle-end -->
