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
