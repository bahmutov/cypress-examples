# Filter elements

<!-- fiddle Filter elements using jQuery pseudo-classes -->

Watch this recipe explained in the video [Filter Elements Using jQuery Pseudo-Classes](https://youtu.be/ro3RPgNGw4g).

```html
<ul>
  <li>Apples</li>
  <li>Grapes</li>
  <li>Pears</li>
  <li>Kiwi</li>
</ul>
```

We can get all `LI` elements and then pick a particular element using its index and [cy.eq](https://on.cypress.io/eq) command

```js
// using the cy.eq command to pick one element
cy.get('li').eq(2).should('have.text', 'Pears')
```

## filter using :odd pseudo-selector

How would you pick several `LI` elements? You can use jQuery pseudo-classes. For example, to pick items 1, 3, 5, etc from the list yielded by the `cy.get` command you should use the jQuery [:odd](https://api.jquery.com/odd-selector/) pseudo-class with [cy.filter](https://on.cypress.io/filter) command.

```js
// using jQuery :odd pseudo-class
cy.get('li')
  .filter(':odd')
  .should('have.length', 2)
  .first()
  .should('have.text', 'Grapes')
```

Note: jQuery has deprecated the `:odd` in favor of the method `odd()`, thus you would write the equivalent test as

```js
// using jQuery odd() method
cy.get('li')
  .invoke('odd')
  .should('have.length', 2)
  .first()
  .should('have.text', 'Grapes')
```

## filter using :even pseudo-selector

You can select elements 0, 2, 4, etc using `:even` jQuery pseudo-class or by invoking the jQuery `even()` method

```js
// using jQuery :even pseudo-class
cy.get('li')
  .filter(':even')
  .should('have.length', 2)
  .last()
  .should('have.text', 'Pears')
// using jQuery even() method
cy.get('li')
  .invoke('even')
  .should('have.length', 2)
  .last()
  .should('have.text', 'Pears')
```

## filter using :eq pseudo-selector

What if you want to select the 2nd and the 3rd elements? You can use the jQuery [`:eq(index)`](https://api.jquery.com/eq-selector/) pseudo-class to pick individual elements and combine them using the CSS `,` operator.

```js
// select the 2nd and the 3rd elements
// using jQuery :eq(index) pseudo-class
cy.get('li')
  .filter(':eq(1), :eq(2)')
  .should('have.length', 2)
  .and('include.text', 'Grapes')
  .and('include.text', 'Pears')
```

## filter using :gt and :lt pseudo-selector

To select all elements after a certain index or before it, you can use jQuery `:gt()` and `:lt()` pseudo-classes with a zero-based index.

```js
// select the elements after the first two
// using jQuery :gt(index) pseudo-class
cy.get('li')
  .filter(':gt(1)')
  .should('have.length', 2)
  .and('include.text', 'Pears')
  .and('include.text', 'Kiwi')
// select the first two elements
// using jQuery :lt(index) pseudo-class
cy.get('li')
  .filter(':lt(2)')
  .should('have.length', 2)
  .and('include.text', 'Apples')
  .and('include.text', 'Grapes')
// select the middle two elements out of 4
// using a combination of :gt() and :lt()
cy.get('li')
  .filter(':gt(0)')
  .should('have.length', 3)
  .filter(':lt(2)')
  .should('have.length', 2)
  .and('include.text', 'Grapes')
  .and('include.text', 'Pears')
```

## filter using custom callback

We can write custom filtering logic by passing a callback to `cy.filter(callback)` command. For example, let's only select elements with the text starting with the letter "k".

```js
cy.get('li')
  // cy.filter(callback) where the callback
  // receives the index and the element reference
  .filter((k, el) => {
    return el.innerText.toLowerCase()[0] === 'k'
  })
  .should('have.text', 'Kiwi')
```

<!-- fiddle.end -->

## filter using attributes

<!-- fiddle Filter elements using an attribute value -->

```html
<ul>
  <li data-price="1">Apples</li>
  <li data-price="3">Grapes</li>
  <li data-price="3">Pears</li>
  <li data-price="10">Kiwi</li>
  <li>Potatoes</li>
</ul>
```

Let's find all elements with price "1" using the `data-price` attribute

```js
cy.get('li')
  .filter('[data-price=1]')
  .should('have.length', 1)
  .and('have.text', 'Apples')
```

Let's find all elements with price "3". I will use the "should read" assertion from [cypress-map](https://github.com/bahmutov/cypress-map) plugin.

```js
cy.get('li')
  .filter('[data-price=3]')
  .should('read', ['Grapes', 'Pears'])
```

Find all elements that have the `data-price` attribute

```js
cy.get('li').filter('[data-price]').should('have.length', 4)
```

Find all elements without the `data-price` attribute; there should be just potatoes.

```js
cy.get('li').not('[data-price]').should('read', ['Potatoes'])
// same as
cy.get('li')
  .filter(':not([data-price])')
  .should('read', ['Potatoes'])
```

<!-- fiddle.end -->
