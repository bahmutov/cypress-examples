# Input has value

## Checking the value existence

<!-- fiddle Input element has some value -->

```html
<input id="greeting" type="text" value="hello" />
<input id="empty" type="text" />
<!-- this input is filled 1 second after the start -->
<input id="dynamic" type="text" />
```

```html hide
<script>
  setTimeout(() => {
    document.getElementById('dynamic').value = 'present'
  }, 1000)
</script>
```

```css hide
input {
  display: block;
}
```

To confirm the input element has some value, we should first grab the value as a `prop` using `have.prop` assertion. This assertion yields the value of the property, and we can chain another assertion to confirm it.

```js
// confirm the input has some value
cy.get('#greeting')
  .should('have.prop', 'value')
  // yields "hello"
  .should('not.be.empty')
// confirm the second input has an empty value
cy.get('#empty')
  .should('have.prop', 'value')
  // yields ""
  .should('be.empty')
// confirm dynamic input gets its value
// after some delay using command retries
cy.get('#dynamic')
  .should('have.prop', 'value')
  // yields "" at first, then yields "present"
  // after the application sets it
  .should('not.be.empty')
```

<!-- fiddle-end -->

## Partial value match

Let's say we know just a part of the value. Here is how we can confirm it:

<!-- fiddle Partial value match -->

```html
<p>Full zip codes have 5 digits plus 4 digits</p>
<div>
  <span>From zip</span>
  <span id="from-zip">90210-0123</span>
</div>
<div>
  <span>To zip</span>
  <input
    id="to-zip"
    value="02203-3344"
    placeholder="Enter destination zipcode"
  />
</div>
```

We can confirm an element has partial text using the "include.text" / "contain" assertion

```js hide
const fromZip = '90210'
cy.get('#from-zip')
  .should('include.text', fromZip)
  .and('contain', fromZip)
```

How do we confirm the know portion of the input element's value? By using the [cy.invoke](https://on.cypress.io/invoke) query followed by any "normal" Chai assertion against the string subject.

```js hide
// the known value to confirm
const toZip = '02203'
// constructs a predicate function that returns
// true if the given string "x" starts with the string "s"
const startsWith = (s) => (x) => x.startsWith(s)
// confirm the input's value using several assertions
cy.get('#to-zip')
  .invoke('val')
  .should('include', '02203')
  // let's use a regular expression
  .and('match', /^\d{5}-\d{4}$/)
  // a regular expression with a known part
  .and('match', new RegExp(`^${toZip}-\\d{4}$`))
  // or a custom predicate
  .and('satisfy', startsWith('02203'))
```

If we really want to over-complicate our assertion, we could parse the zip+4 string into parts and confirm the first known part.

```js hide
cy.get('#to-zip')
  .invoke('val')
  .invoke('split', '-')
  .should('have.length', 2)
  .its(0)
  .should('equal', toZip)
```

<!-- fiddle-end -->
