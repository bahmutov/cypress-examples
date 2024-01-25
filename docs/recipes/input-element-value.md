# Input element value

📺 Watch this recipe explained in [Input Element Value](https://youtu.be/1gmudzqQWFg).

## Regular HTML elements with text

To get the text of an element, you invoke the `text()` method provided by jQuery.

<!-- fiddle Element text -->

```html
<p id="name">Joe Smith</p>
```

```js
// yields jQuery object
cy.get('#name')
  // calls the jQuery method "text()"
  .invoke('text')
  .should('equal', 'Joe Smith')
```

You can also use [Chai-jQuery](https://www.chaijs.com/plugins/chai-jquery/) assertion `have.text` to confirm the element's text content.

```js
cy.get('#name').should('have.text', 'Joe Smith')
```

<!-- fiddle-end -->

## A text input

If you want to get a _value_ from an input element (text or number), you need to invoke the jQuery method `val()`

<!-- fiddle A text input element value -->

```html
<input
  type="text"
  name="firstName"
  placeholder="Enter your first name"
/>
```

```js
// yields jQuery object
cy.get('[name=firstName]')
  // calls the jQuery method "val()"
  .invoke('val')
  // the value is an empty string at first
  .should('equal', '')
// enter the first name and confirm
cy.get('[name=firstName]').type('Anna')
cy.get('[name=firstName]').invoke('val').should('equal', 'Anna')
```

You can check a value of an input element using the built-in Chai-jQuery assertion "have.value".

```js
cy.get('[name=firstName]').should('have.value', 'Anna')
```

<!-- fiddle-end -->

## A textarea

<!-- fiddle Checking textarea value -->

```html
<textarea
  id="quote"
  placeholder="Enter your favorite quote"
></textarea>
```

```js
const quote =
  'It was the best of times, it was the worst of times'
cy.get('#quote')
  // initially the textarea is empty
  .should('have.value', '')
  .type(quote)
  .should('have.value', quote)
```

<!-- fiddle-end -->

## A number input

<!-- fiddle A number input element value -->

```html
<input
  type="number"
  name="quantity"
  placeholder="Enter the number of items"
/>
```

```js
// yields jQuery object
cy.get('[name=quantity]')
  // calls the jQuery method "val()"
  .invoke('val')
  // the value is an empty string at first
  .should('equal', '')
// enter the first name and confirm
cy.get('[name=quantity]').type('42')
// note: even if the input element is numeric,
// the value "val()" yields is a string
cy.get('[name=quantity]').invoke('val').should('equal', '42')
```

You can check a value of an input element using the built-in Chai-jQuery assertion "have.value".

```js
// compare as a string
cy.get('[name=quantity]').should('have.value', '42')
// Chai-jQuery assertion also casts a number automatically
cy.get('[name=quantity]').should('have.value', 42)
```

You can confirm the value is between two limits by using a `should(callback)`

```js
cy.get('[name=quantity]')
  .invoke('val')
  .should((valueAsString) => {
    expect(Number(valueAsString)).to.be.within(40, 50)
  })
```

We don't have to convert the string value to a number ourselves. Numeric input elements have the `valueAsNumber` property which we can get using `have.prop` assertion or via `prop('valueAsNumber')` call

```js
// yield the property "valueAsNumber"
cy.get('[name=quantity]')
  .should('have.prop', 'valueAsNumber')
  // yields the value
  .should('be.within', 40, 50)
// yield the property "valueAsNumber"
cy.get('[name=quantity]')
  .invoke('prop', 'valueAsNumber')
  .should('be.closeTo', 40, 3)
```

<!-- fiddle-end -->

## Nested element

To improve the [retry-ability](https://on.cypress.io/retry-ability) of your tests, do not split accessing the element into multiple querying commands (if possible).

<!-- fiddle Nested element -->

```html
<section id="nested">
  <form name="info">
    <input type="text" name="firstName" value="Joe" />
  </form>
</section>
```

```js
// Might be ok, but might lead to flaky tests
// if the application re-renders the form
cy.get('#nested')
  .find('[name=info]')
  .find('[name=firstName]')
  .should('have.value', 'Joe')
```

Instead of using separate commands `cy.get` + `cy.find` to locate the element, merge the CSS selector into a single one:

```js
// Recommended: merge the queries into one cy.get
cy.get('#nested [name=info] [name=firstName]').should(
  'have.value',
  'Joe',
)
```

<!-- fiddle-end -->

## Checkbox

Checkbox elements also have a value.

📺 Watch the checkbox value explained in the video [Checkbox Input Element Value](https://youtu.be/15F5cK4V-vo).

### Default checkbox value

<!-- fiddle Default checkbox value -->

```html
<label for="accept-terms">Accept terms</label>
<input type="checkbox" id="accept-terms" />
```

```js
// by default the checkbox has value "on"
// even if unchecked
cy.get('#accept-terms')
  .should('have.value', 'on')
  .and('not.be.checked')
  .check()
  .should('have.value', 'on')
  .and('be.checked')
```

<!-- fiddle-end -->

### Custom checkbox value

<!-- fiddle Custom checkbox value -->

```html
<label for="accept-terms">Accept terms</label>
<input type="checkbox" id="accept-terms" value="accepted" />
```

```js
cy.get('#accept-terms')
  .should('have.value', 'accepted')
  .and('not.be.checked')
  .check()
  .should('have.value', 'accepted')
  .and('be.checked')
```

<!-- fiddle-end -->

## Input value is set

Let's confirm that the text input element has the empty initial value and then sets some value. Maybe the application is loading the previously entered values, and there is a delay between the input appearing and the values set.

<!-- fiddle Input value is set after a delay -->

```html hide
<input id="account-name" type="text" />
<script>
  setTimeout(() => {
    document.getElementById('account-name').value =
      'Default bank'
  }, 1000)
</script>
```

Let's confirm that the input element gets some value.

```js
// initially the value is empty
cy.get('#account-name').should('have.value', '')
// at some point it will be a non-empty string
// both cy.get and cy.invoke are queries and retry
// until the assertion "not.equal" passes
cy.get('#account-name').invoke('val').should('not.equal', '')
```

**Tip:** if you are loading the input element's value, please disable the element and enable it after the value has been loaded. Otherwise, the user might be tempted to enter new value just to lose their work.

<!-- fiddle-end -->

## Input value is set and is stable

Imagine the input element shows several values before showing the "final" value that you want. Maybe it is flashing "loading..." initially. To check if the element's value goes unchanged for N milliseconds, use the `cy.stable` command from the [cypress-map](https://github.com/bahmutov/cypress-map) plugin.

<!-- fiddle Input value is set and is stable -->

```html hide
<input id="account-name" type="text" value="..." />
<script>
  setTimeout(() => {
    document.getElementById('account-name').value = 'loading...'
  }, 500)

  setTimeout(() => {
    document.getElementById('account-name').value =
      'Default bank'
  }, 1000)
</script>
```

```js
cy.get('#account-name').stable('value')
// let's confirm the value, we can set timeout to zero
// because the element's value has been set for some time
cy.get('#account-name', { timeout: 0 }).should(
  'have.value',
  'Default bank',
)
```

<!-- fiddle-end -->
