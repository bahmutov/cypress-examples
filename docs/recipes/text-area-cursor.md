# Text area cursor

## Text area cursor position

<!-- fiddle Text area cursor position -->

```html
<textarea id="essay" rows="3" cols="20"></textarea>
```

```js
cy.get('textarea#essay')
  .type('My name is{enter}Joe')
  .should('have.prop', 'selectionStart', 14)
```

We can compute the row and column of the cursor following this [StackOverflow example](https://stackoverflow.com/questions/7745867/how-do-you-get-the-cursor-position-in-a-textarea).

```js
/**
 * Finds the start of the line
 */
function prevLine(me) {
  const lineArr = me.value
    .substr(0, me.selectionStart)
    .split('\n')
  let numChars = 0
  for (let i = 0; i < lineArr.length - 1; i++) {
    numChars += lineArr[i].length + 1
  }
  return numChars
}
// confirm the row and column of the current cursor in the given text area
cy.get('textarea#essay').then(($textArea) => {
  const ta = $textArea[0]
  const row = ta.value.substr(0, ta.selectionStart).split('\n')
    .length
  expect(row, 'row').to.equal(2)
  const col = ta.selectionStart - prevLine(ta)
  expect(col, 'column').to.equal(3)
})
```

<!-- fiddle-end -->
