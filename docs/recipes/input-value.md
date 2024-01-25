# Input value

## Value matching a regular expression

You can use the `have.prop` assertion to grab the text value and yield it to the next assertion.

<!-- fiddle The text input value matching a regular expression -->

```html
<input id="user-ssn" value="123-45-6789" />
```

```js
// it looks best if we know the exact value to check
cy.get('#user-ssn').should('have.value', '123-45-6789')
```

If we don't know the exact value to expect, we can grab the `value` property and check if it follows a regular expression.

```js
cy.get('#user-ssn')
  // you can invoke jQuery "val" method
  // or use the "have.prop" assertion
  .should('have.prop', 'value')
  // yields the string value
  .should('match', /^\d\d\d-\d\d-\d\d\d\d$/)
  // alternate regular expression
  .and('match', /^\d{3}-\d{2}-\d{4}$/)
```

Watch this recipe explained in the video [Input Text Value Matches A Regular Expression](https://youtu.be/88sIuUz6Jh0).

<!-- fiddle-end -->

## Find by value

You can find input elements by their value declared as an attribute. 📺 Watch this example explained in the video [Find Input By Value](https://youtu.be/DHtWLKueA3o).

<!-- fiddle Find by static value attribute -->

```html
<input id="first" value="Joe" readonly />
<input id="last" value="Black" readonly />
<input id="area" value="404" />
```

Find the input element with value "Joe"

```js
cy.get('input[value=Joe]').should('have.id', 'first')
```

Find the input element with the value ending in "ack"

```js
cy.get('input[value$=ack]').should('have.id', 'last')
```

Find the input element with the value that includes "0" somewhere

```js
cy.get('input[value*=0]').should('have.id', 'area')
```

Unfortunately, if the value is changed using `cy.type` command, then the attribute selector `[value=...]` no longer works, since it does not "see" the updated value.

```js
cy.get('#area').clear().type('212')
```

```js skip
// 🚨 DOES NOT WORK
// the static attribute "value" is still "404"
cy.get('input[value*=1]').should('have.id', 'area')
```

The simplest way to find the input with the current full known value is to grab all input elements, then filter using your own custom callback. Inside the callback you get access to element and can use DOM property `.value` or `.valueAsNumber` to filter elements with desired properties.

```js
cy.get('input')
  .filter((k, input) => {
    return input.value.includes('1')
  })
  .should('have.id', 'area')
```

<!-- fiddle-end -->

## See also

- [Input value as a number](./input-value-as-number.md)
