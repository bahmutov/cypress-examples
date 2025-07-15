# cy.contains Variants

## Separate the existence from the text check

<!-- fiddle Separate the existence from the text check -->

```html hide
<div class="AlertBox">Could not log in</div>
<div>
  <ul id="names">
    <li>John Smith</li>
    <li>Mary Jane</li>
  </ul>
</div>
```

```js
// passes because the text matches
cy.contains('.AlertBox', 'Could not log in')
```

```js skip
// 🚨 slight mistake: there is no dot
// at the end of the message
cy.contains('.AlertBox', 'Could not log in.')
```

Hmm, so the failure to find the `AlertBox` with the expected message is ambiguous:

- does the alert box not exist?
- does it exist, but has a different text?

This is why I prefer separating `cy.contains(select, text)` into `cy.get(selector).should('have.text', text)` combination

```js skip
// 🚨 still fails
// but gives an accurate message
// the .AlertBox expected to have text "..."
// but the text was "..."
cy.get('.AlertBox').should('have.text', 'Could not log in.')
```

Since `cy.contains(text)` uses partial text, we can use the "include.text" assertion

```js skip
cy.get('.AlertBox').should('include.text', 'Could not')
```

We have to be careful though, because the text match could use partial text from _several_ found elements. For example:

```js
cy.get('#names li').should('include.text', 'SmithMary')
```

But that is NOT what we probably wanted to do: we did not want to concatenate all `LI` texts into a single long string and do partial text match! So the final alternative is to use [cypress-map](https://github.com/bahmutov/cypress-map) queries to check strings

```js
// exact string match
cy.get('#names li')
  .map('innerText')
  .should('not.include', 'SmithMary')
  .and('include', 'Mary Jane')
```

If we want to do partial text match, we could process the array of strings to get a partial text match using a regular expression

```js
const text = 'Mary J'
cy.get('#names li')
  .map('innerText')
  // one of the strings is a partial match
  .invoke('some', (s) => s.includes(text))
  .should('be.true')
```

We can also write the above check in a different way to confirm that only a _single_ element includes the given text

```js
// confirm there is only 1 element
// that includes the given string
cy.get('#names li')
  .map('innerText')
  .invoke('filter', (s) => s.includes(text))
  .should('have.length', 1)
```

<!-- fiddle-end -->
