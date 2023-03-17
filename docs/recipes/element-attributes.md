# Element Attributes

<!-- fiddle Multiple elements with attributes -->

```html
<ul>
  <li data-product-id="a11">Apples</li>
  <li data-product-id="b20">Oranges</li>
  <li data-product-id="c11">Bananas</li>
</ul>
```

Let's find all `li` elements and check their `data-product-id` attributes. Using [jQuery attr method](https://api.jquery.com/attr/) returns only the _first_ element's value.

```js
cy.get('li')
  .should('have.length', 3)
  .invoke('attr', 'data-product-id')
  .should('equal', 'a11')
```

To get the attribute from every element, write custom code, or use [cypress-map](https://github.com/bahmutov/cypress-map). From every plain DOM element inside the jQuery we get the attribute by calling the element's `getAttribute` method.

```js
cy.get('li')
  .should('have.length', 3)
  .mapInvoke('getAttribute', 'data-product-id')
  .should('deep.equal', ['a11', 'b20', 'c11'])
```

If you want to set the same attribute to the same value for _all_ elements, you can use [jQuery attr method](https://api.jquery.com/attr/).

```js
// set the attribute "data-product-id"
// for all LI elements to the same value "x1"
cy.get('li')
  .should('have.length', 3)
  .invoke('attr', 'data-product-id', 'x1')
```

Let's confirm our attributes change

```js
cy.get('li')
  .should('have.length', 3)
  .mapInvoke('getAttribute', 'data-product-id')
  .should('deep.equal', ['x1', 'x1', 'x1'])
```

If you want to set a different attribute value, pass a callback function to [jQuery attr method](https://api.jquery.com/attr/).

```js
// set the attribute "data-product-id"
// for all LI elements to dynamic values
cy.get('li')
  .should('have.length', 3)
  .invoke(
    'attr',
    'data-product-id',
    (k, currentAttributeValue) => {
      return `${k + 1}-${currentAttributeValue}`
    },
  )
// confirm the new attribute values
cy.get('li')
  .should('have.length', 3)
  .mapInvoke('getAttribute', 'data-product-id')
  .should('deep.equal', ['1-x1', '2-x1', '3-x1'])
```

<!-- fiddle-end -->
