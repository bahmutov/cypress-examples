# Input element value

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
