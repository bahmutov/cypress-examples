# Confirm attribute

Let's say we want to confirm an element's attribute, like its `id`. We can do this in a variety of ways.

## Single element

<!-- fiddle invoke jQuery attr method -->

We can use [cy.invoke](https://on.cypress.io/invoke) to execute the jQuery `attr` method on the parent element.

```html
<div id="code-snippet">The code example</div>
```

```js
cy.contains('The code example')
  .invoke('attr', 'id')
  .should('equal', 'code-snippet')

// tip: there is a built-in Chai-Jquery assertion
// to confirm an attribute exists and optionally its value
cy.contains('The code example')
  // the "have.attr" assertion yields the value
  .should('have.attr', 'id')
  .should('equal', 'code-snippet')

// tip 2: you can use the "have.attr" form with expected value
cy.contains('The code example').should(
  'have.attr',
  'id',
  'code-snippet',
)
```

<!-- fiddle-end -->

The "have.attr" assertion yields the value of the attribute, which makes it convenient when checking a value you know only partially. For example, if the element is an image, and the URL changes, you can confirm the a part of it.

<!-- fiddle Confirm part of the attribute value -->

For example, we do not know the exact value of the "integrity" attribute of the included jQuery library, but we know it should start with "sha256" string.

```html
<script
  data-cy="jQuery"
  src="https://code.jquery.com/jquery-3.6.0.slim.min.js"
  integrity="sha256-u7e5khyithlIdTpu22PHhENmPcRdFiHRjhAuHcs05RI="
  crossorigin="anonymous"
></script>
```

```js
cy.get('script[data-cy=jQuery]')
  .should('have.attr', 'integrity')
  // now we are checking the value "sha256-u7e5..."
  .should('match', /^sha256-/)
```

<!-- fiddle-end -->

## Multiple elements

Confirm the title attributes from multiple elements by extracting them into an array.

<!-- fiddle confirm multiple attributes -->

```html
<ul id="attributes">
  <li title="first">First</li>
  <li title="second">Second</li>
  <li title="third">Third</li>
</ul>
```

```js
const titles = []
cy.get('li')
  .should('have.length', 3)
  .each((li$) => {
    const title = li$.attr('title')
    expect(title).to.be.a('string')
    titles.push(title)
  })
  .then(() => {
    // work with filled titles list
    // like save into a file or confirm the values
    expect(titles).to.deep.equal(['first', 'second', 'third'])
  })
```

<!-- fiddle-end -->

## Confirm sum of attributes

Imagine that each element in the list has its price stored as a data attribute, and there is a total element with their sum, also stored as a data attribute. Can we extract the attributes, convert them to numbers, and confirm the total is correct?

<!-- fiddle sum of data attributes -->

```html
<ol id="prices" data-total="220">
  <li data-price="99">Oranges $0.99</li>
  <li data-price="101">Mango $1.01</li>
  <li data-price="20">Potatoes $0.20</li>
</ol>
```

```js
let sum = 0
cy.get('li[data-price]')
  .should('have.length', 3)
  .each(($el) => {
    sum += Number($el.attr('data-price'))
  })
cy.get('#prices')
  .invoke('attr', 'data-total')
  .then(Number)
  .then((total) => {
    // by now, the sum should have been computed
    expect(total, 'total').to.equal(sum)
  })
```

<!-- fiddle-end -->
