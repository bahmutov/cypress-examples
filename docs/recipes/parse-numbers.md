# Parse numbers

Imagine you need to confirm a number shown on the page. The DOM element always has text, thus to compare it as a number, we first need to convert it.

## parseInt

<!-- fiddle Using parseInt to convert text to an integer -->

```html
<div>
  Total attendees
  <div id="people">30</div>
</div>
```

```js
// get the element and grab its text using ".text()" jQuery method
cy.get('#people')
  .invoke('text')
  // tip: use an assertion to print the extracted text
  .should('be.a', 'string')
  // convert text to integer
  .then(parseInt)
  // tip: make sure the conversion is successful
  .should('be.a', 'number')
  // compare the converted number to the expected value
  .and('equal', 30)
```

<!-- fiddle-end -->

## Trim the text first

Sometimes the number is mixed with other text. You need to trim the text to get to the number part before parsing the integer.

<!-- fiddle Trim the text first -->

```html
<div id="group">Several (56) people were present.</div>
```

```js
// get the text of the element
cy.get('#group')
  .invoke('text')
  // find the part of the text with the number
  // for example, we can find the "(" and the ")" characters
  .then((s) => {
    const start = s.indexOf('(')
    const end = s.indexOf(')', start)
    return s.slice(start + 1, end)
  })
  // tip: use an assertion to print the extracted text
  .should('be.a', 'string')
  .then(parseInt)
  // tip: make sure the conversion is successful
  .should('be.a', 'number')
  .and('equal', 56)
```

<!-- fiddle-end -->

## parseFloat

If the element has a floating point value, `parseInt` would not parse it correctly. Instead use the `parseFloat` or `Number` functions to convert it.

<!-- fiddle Use parseFloat -->

```html
<div id="price">Please pay <b>($ 75.15)</b> to the cashier</div>
```

```js
// get the text of the element
// in this case, I try to select the smallest element
// with the text to make the parsing simpler
cy.get('#price b')
  .invoke('text')
  // find the part of the text with the number
  // for example, we can find the "($" and the ")" characters
  .then((s) => {
    const start = s.indexOf('($')
    const end = s.indexOf(')', start)
    return s.slice(start + 2, end)
  })
  // tip: use an assertion to print the extracted text
  .should('be.a', 'string')
  // convert the "75.15" to a float number
  .then(parseFloat)
  // tip: make sure the conversion is successful
  .should('be.a', 'number')
  // and compare it against the expected range
  .and('be.within', 70, 80)
```

For trimming the element text, I sometimes use a regular expression. For example, to find the above number inside the `($ ... )` text, we could use the following approach.

```js
// get the text of the element
cy.get('#price')
  .invoke('text')
  // use String.match(a regular expression) method
  // to find the price text inside a longer text
  // (?<price>...) is a named capture group
  .invoke('match', /\(\$\s(?<price>\d+\.\d+)\)/)
  // make sure the parsing was successful
  .should('be.an', 'array')
  // from the result, grab the "groups.price" field
  // note: the cy.its command automatically retries
  // and would fail if the "price" capture group is not found
  .its('groups.price')
  .should('be.a', 'string')
  .then(parseFloat)
  // compare the converted number to the estimate
  // which is $74 +/- $2
  .should('be.closeTo', 74, 2)
```

<!-- fiddle-end -->
