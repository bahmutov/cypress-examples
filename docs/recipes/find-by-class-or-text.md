# Find elements by class and text

## Elements with just given class

This recipe answers the question [#14281](https://github.com/cypress-io/cypress/issues/14281) - how do I select an element having an exact class? We can use [cy.get](https://on.cypress.io/get) or [cy.contains](https://on.cypress.io/contains)

<!-- fiddle Filter by class -->

```html
<ul>
  <li class="day">first A</li>
  <li class="day old">first B</li>
  <li class="day disabled">first C</li>

  <li class="day">second A</li>
  <li class="day old">second B</li>
  <li class="day disabled">second C</li>

  <li class="day">third A</li>
  <li class="day old">third B</li>
  <li class="day disabled">third C</li>
</ul>
```

How do we select an element having class "day" with text "second" but NOT "day old" or "day disabled"?

```js
// this selects ALL elements
cy.get('.day').should('have.length', 9)
// this selects only elements with exactly class "day"
// because we are using the attribute selector
cy.get('[class=day]')
  .should('have.length', 3)
  // now we can find the one element with text "second"
  .contains('second')
  .should('have.text', 'second A')
  // confirm it does not have other classes
  .should('have.class', 'day')
  .and('not.have.class', 'old')
  .and('not.have.class', 'disabled')

// similarly we can use cy.contains directly
cy.contains('[class=day]', 'second A')
  // we can confirm classes like above
  // or by taking the classList from the DOM element
  .then(($el) => $el[0].className)
  .should('equal', 'day')

// similarly finding "third B"
cy.contains('[class="day old"]', 'third B')
  .then(($el) => $el[0].className)
  .should('equal', 'day old')
```

<!-- fiddle-end -->

## Selecting by exact text

If you want to select using the exact text, use a regular expression

<!-- fiddle Exact class and text -->

We want to select ".day" with the exact text "8" from the HTML below.

```html
<ul>
  <li class="day">28</li>
  <li class="day old">28 B</li>
  <li class="day disabled">28 C</li>

  <li class="day">8</li>
  <li class="day old">8 B</li>
  <li class="day disabled">8 C</li>
</ul>
```

```js
// using a string "8" finds the first element containing it
cy.contains('[class=day]', '8').should('have.text', '28')
// using regular expression finds the exact text match
cy.contains('[class=day]', /^8$/).should('have.text', '8')
```

<!-- fiddle-end -->

## Find multiple elements with text

The command `cy.contains` yields the first element. If you want to find multiple elements that contain the given text, use jQuery selector [:contains](https://api.jquery.com/contains-selector/). Note that the selector text is case sensitive.

<!-- fiddle Multiple elements with text -->

```html
<ul>
  <li>apple</li>
  <li>pineapple</li>
  <li>grapes</li>
  <li>crab apple</li>
  <li>crab legs</li>
</ul>
```

```js
// cy.contains finds the first element that contains the text "apple"
cy.contains('apple')
  .should('have.length', 1)
  .and('have.text', 'apple')
// using jQuery :contains selector we can find all elements with text "apple"
cy.get('li:contains(apple)')
  .should('have.length', 3)
  .first()
  .should('have.text', 'apple')
// quote the text with multiple words
cy.get('li:contains("crab apple")')
  .should('have.length', 1)
  .and('have.text', 'crab apple')
```

Note: use a selector before `:contains` otherwise, both `UL` and `LI` elements will be returned.

```js
// without LI selector, the results will include the parent UL element
cy.get(':contains(apple)')
  .should('have.length', 4)
  .first()
  .should('have.prop', 'nodeName', 'UL')
```

We can also filter the elements to find `LI` elements with the text "crab"

```js
cy.get('li').filter(':contains(crab)').should('have.length', 2)
```

<!-- fiddle-end -->

## Filter elements using cy.not

We can filter items using the [cy.not](https://on.cypress.io/not) command.

<!-- fiddle Filter using cy.not -->

```html
<ul>
  <li class="initial active">Apples</li>
  <li class="initial current">Oranges</li>
  <li class="initial active">Grapes</li>
  <li class="initial current">Melons</li>
</ul>
```

```js
cy.get('.initial')
  .not('.active')
  .should('have.length', 2)
  .first()
  .should('have.text', 'Oranges')
```

<!-- fiddle-end -->

## Complex filtering

Sometimes the filtering logic is too complex to be expressed by CSS3 selectors. For example, how to get all matching elements _not_ inside a given `<UL>` list?

<!-- fiddle Filter out by the parent selector -->

```html
<div class="target">target</div>
<ul>
  <li>
    First
    <div>example</div>
  </li>
  <li>
    Second
    <div>example</div>
  </li>
</ul>
<div class="target">last target</div>
```

We need to find the elements, then use a callback function to check if each element has `ul` ancestor. Using `.then` callback is great for such tasks, and we can utilize the bundled `Cypress.jQuery` methods for checking the ancestors of the given element.

```js
cy.get('div')
  // an assertion ensures we have elements
  // before starting filtering
  .should('have.length.gt', 1)
  .then(($els) => {
    const $filtered = $els.filter((k, el) => {
      // if the found element is inside <UL> element
      // then reject it by returning false
      const $ul = Cypress.$(el).closest('ul')
      return $ul.length === 0
    })

    return $filtered
  })
  // finds only the elements outside the <UL> element
  .should('have.length', 2)
  // check by confirming the class on each found element
  .and('have.class', 'target')
```

<!-- fiddle-end -->
