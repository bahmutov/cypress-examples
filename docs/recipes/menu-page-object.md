# Menu Page Object

<!-- fiddle Menu page object -->

```html hide
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">EN</a>
  <a class="navbar-brand" href="#">DE</a>
  <a class="navbar-brand" href="#">IT</a>
  <a class="navbar-brand" href="#">ES</a>
</nav>
```

Let's confirm the navigation menu has the four expected languages in the correct order.

```js
const translations = ['EN', 'DE', 'IT', 'ES']
```

We could write a page object ("PO" for short) that could get the menu items and store the text data list inside the object:

```js
const MenuPO = {
  // initially the list is empty
  languages: [],
  getLanguages() {
    return cy.get('nav.navbar a.navbar-brand').each(($a) => {
      this.languages.push($a.text())
    })
  },
  // simple abstraction over page selectors
  // without storing anything in the object itself
  getLanguageElements() {
    return cy.get('nav.navbar a.navbar-brand')
  },
}
```

How do we compare the list of languages? Trying to print it shows an empty list

```js skip
MenuPO.getLanguages()
console.log(MenuPO.languages) // []
```

We can use `MenuPO.languages` only _after_ the Cypress commands inside `MenuPO.getLanguages` method finish. The simplest way is to return the `cy` chain from the page object's method and use the data from the page inside `cy.then(callback)`

```js
MenuPO.getLanguages().then(() => {
  // The array "MenuPO.languages" now has data
  expect(MenuPO.languages, 'languages').to.deep.equal(
    translations,
  )
})
```

There is a better way. Do not accumulate any data in the page object. Make the page object a simple abstraction over selectors instead.

```js
MenuPO.getLanguageElements()
  // cy.map comes from cypress-map plugin
  .map('innerText')
  .should('deep.equal', translations)
```

**Tip:** the above code is using query commands only, thus it is retry-able and will work even if the menu elements are created dynamically.

<!-- fiddle-end -->
