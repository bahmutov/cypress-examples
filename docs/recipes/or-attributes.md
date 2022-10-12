# OR Attributes assertion

## One of several possible attributes

<!-- fiddle OR attributes -->

Let's confirm that an element we found has an attribute X OR has an attribute Y.

```html
<div id="person1" data-name="A">first person</div>
<div id="person2" data-job="B">second person</div>
<!-- this element lacks the attributes we are looking for -->
<div id="person3">third person</div>
```

We want to confirm the given element either has the `data-name` attribute or has the `data-job` attribute. We can write such non-deterministic logic using `should(callback)` function.

```js
function hasAttribute($el) {
  // check the presence of an attribute
  // using the DOM Element "hasAttribute" method
  if (
    $el[0].hasAttribute('data-name') ||
    $el[0].hasAttribute('data-job')
  ) {
    // all good, the element has one of the attributes
  } else {
    throw new Error('Missing the required attributes')
  }
}

cy.get('#person1').should(hasAttribute)
cy.get('#person2').should(hasAttribute)
// enable to see a failed assertion
// cy.get('#person3').should(hasAttribute)
```

<!-- fiddle-end -->

## One of several possible values

<!-- fiddle OR values -->

Let's say we are looking for an attribute, but it can have multiple values.

```html
<div id="person1" data-name="Joe">first person</div>
```

We want to confirm the `data-name` attribute is either "Joe" or "Mary". We can get the attribute's value using `have.attr name` assertion, which yields the value, and then apply the `be.oneOf` assertion.

```js
cy.get('#person1')
  .should('have.attr', 'data-name')
  // yields the "data-name" attribute's value
  .should('be.oneOf', ['Joe', 'Mary'])
```

<!-- fiddle-end -->

## One of several possible values with retries

<!-- fiddle OR values retries -->

Even when chaining the assertions, they still apply to the same element. Thus even if the expected value of the attribute is set later, the test still finds it correctly.

```html
<div id="person1" data-name="Bob">first person</div>
<script>
  setTimeout(() => {
    document
      .getElementById('person1')
      .setAttribute('data-name', 'Mary')
  }, 1000)
</script>
```

```js
cy.get('#person1')
  .should('have.attr', 'data-name')
  // yields the "data-name" attribute's value
  .should('be.oneOf', ['Joe', 'Mary'])
```

<!-- fiddle-end -->
