# cy.contains and regular expressions

📺 Watch this recipe explained in the video [cy.contains And Regular Expressions Examples](https://youtu.be/nDXAaWdj6tw).

For more `cy.contains` examples, see [Querying commands](../commands/querying.md).

## Ignore case

Command `cy.contains` can ignore case using an option.

<!-- fiddle Ignore case -->

```html
<div id="greeting">HeLlO wOrLd</div>
```

```js
cy.contains('Hello', { matchCase: false }).should(
  'have.id',
  'greeting',
)
```

<!-- fiddle-end -->

## Use a regular expression

You can also use a regular expression with `i` option to ignore the case.

<!-- fiddle Use a regular expression to ignore case -->

```html
<div id="greeting">HeLlO wOrLd</div>
```

```js
cy.contains(/Hello/i).should('have.id', 'greeting')
```

<!-- fiddle-end -->

## Match the start of the string

Regular expressions are really useful to match a string at the start or end of the text.

<!-- fiddle Find element that starts with hello -->

```html
<div id="greeting">HeLlO wOrLd</div>
```

```js
cy.contains(/^Hello/i).should('have.id', 'greeting')
```

<!-- fiddle-end -->

Here is matching text at the end:

<!-- fiddle Find element that ends with world -->

```html
<div id="greeting">HeLlO wOrLd</div>
```

```js
cy.contains(/world$/i).should('have.id', 'greeting')
```

<!-- fiddle-end -->

## Dynamic regular expression

If you do not know the text beforehand, you can construct a regular expression object instead of using a regular expression syntax.

<!-- fiddle Construct the regular expression from a string value -->

```html
<div id="greeting">HeLlO wOrLd</div>
```

```js
// the text to find comes from a variable
const start = 'hello'
// construct the regular expression object
const regex = new RegExp('^' + start, 'i')
// the cy.contains will be equivalent to /^hello/i
cy.contains(regex).should('have.id', 'greeting')
```

<!-- fiddle-end -->

## Escape the text

When building a regular expression, you should take care to escape any special characters.

📺 Watch this example explained in the video [Escape Regular Expression Text When Using cy.contains Command](https://youtu.be/hMzqiSUVGwA).

<!-- fiddle Escape the text when building the regular expression -->

```html
<div id="rate">45 $/day</div>
```

Let's say we want to find the element with a number followed by the `$/day` text. Simply constructing the regular expression will not work, since the `$` character has special meaning in regular expressions.

```js skip
// 🚨 DOES NOT WORK
// The "$" in the regular expression causes problems
const suffix = '$/day'
const regex = new RegExp(suffix)
cy.contains(regex).should('have.id', 'rate')
```

```js
// ✅ Escape the $ character when building a regular expression
const suffix = '\\$/day'
const regex = new RegExp(suffix)
cy.contains(regex).should('have.id', 'rate')
```

If we don't know which characters the text might have, we might want to escape them all using the Lodash `_.escapeRegExp` function. Since Lodash is bundled with Cypress, nothing to install.

```js
// ✅ Escape all special Regexp characters
// using _.escapeRegExp
cy.contains(new RegExp(Cypress._.escapeRegExp('$/day'))).should(
  'have.id',
  'rate',
)
```

<!-- fiddle-end -->
