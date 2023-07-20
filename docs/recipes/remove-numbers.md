# Remove numbers

Imagine we have a list of strings, but there are extra characters that we want to remove from each string. We can iterate over the list and call `String.prototype.replace` and use a regular expression. The iteration and invocation in this solution is done using the `cy.mapInvoke` query command from the [cypress-map](https://github.com/bahmutov/cypress-map) plugin.

📺 You can watch this recipe explained in [Remove Numbers From Strings](https://youtu.be/OXiEJDjozQo).

<!-- fiddle Remove numbers -->

```html
<ul id="fruit">
  <li>Apples 2</li>
  <li>Grapes 10</li>
  <li>Kiwi 8</li>
</ul>
```

After removing all digits, we can trim the whitespace and confirm the expected array of strings.

```js
cy.get('#fruit li')
  // cy.map, cy.mapInvoke come from the cypress-map plugin
  .map('innerText')
  .mapInvoke('replace', /\d/g, '')
  .mapInvoke('trim')
  .should('deep.equal', ['Apples', 'Grapes', 'Kiwi'])
```

You can use other regular expressions to remove characters. For example, we can avoid invoking the `trim` method and instead replace digits and white space characters in a single Regex.

```js
cy.get('#fruit li')
  .map('innerText')
  .mapInvoke('replace', /[\d\s]/g, '')
  .should('deep.equal', ['Apples', 'Grapes', 'Kiwi'])
```

**Tip:** you can lookup regular expressions in [here](https://www.regular-expressions.info/refshorthand.html)

<!-- fiddle-end -->
