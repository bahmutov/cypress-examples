# nth-child CSS selector examples

The [nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) CSS selector is very powerful. Here are some examples picking different elements from the page.

**Note:** in these tests the command `cy.map` comes from plugin [cypress-map](https://github.com/bahmutov/cypress-map).

## Individual elements

<!-- fiddle Individual elements -->

```html hide
<p>NBA players with most championships:</p>
<ul>
  <li>Bill Russell</li>
  <li>Sam Jones</li>
  <li>Tom Heinsohn</li>
  <li>K. C. Jones</li>
  <li>Satch Sanders</li>
  <li>John Havlicek</li>
  <li>Jim Loscutoff</li>
  <li>Frank Ramsey</li>
  <li>Robert Horry</li>
</ul>
```

```css hide
p {
  font-weight: bold;
}

li:nth-child(-n + 3) {
  border: 2px solid orange;
  margin-bottom: 1px;
}

li:nth-child(even) {
  background-color: lightyellow;
}
```

Select the first element, several variants

```js
// using :first-child selector
cy.contains(':first-child', 'Bill Russell')
// using :first selector
cy.contains(':first', 'Bill Russell')
// using :nth-child 1 index
cy.contains(':nth-child(1)', 'Bill Russell')
```

Select the last element, several variants

```js
// using :last-child selector
cy.contains(':last-child', 'Robert Horry')
// using :last selector
cy.contains(':last', 'Robert Horry')
// using :nth-child n - 1 selector
cy.contains(':nth-child(n-1)', 'Robert Horry')
```

Select the 3rd element, index starts at 1

```js
cy.contains('li:nth-child(3)', 'Tom Heinsohn')
```

Select the 3rd element _from the end_ using `nth-child(n - 3)`

```js
cy.contains('li:nth-child(n - 3)', 'Jim Loscutoff')
```

Select the 3rd element _from the end_ using `nth-last-child`

```js
cy.contains('li:nth-last-child(3)', 'Jim Loscutoff')
```

<!-- fiddle-end -->

## Even and odd elements

<!-- fiddle Even and odd elements -->

```html hide
<p>NBA players with most championships:</p>
<ul>
  <li>Bill Russell</li>
  <li>Sam Jones</li>
  <li>Tom Heinsohn</li>
  <li>K. C. Jones</li>
  <li>Satch Sanders</li>
  <li>John Havlicek</li>
  <li>Jim Loscutoff</li>
  <li>Frank Ramsey</li>
  <li>Robert Horry</li>
</ul>
```

```css hide
p {
  font-weight: bold;
}

li:nth-child(-n + 3) {
  border: 2px solid orange;
  margin-bottom: 1px;
}

li:nth-child(even) {
  background-color: lightyellow;
}
```

Let's select odd `LI` elements

```js
cy.get('li:nth-child(odd)')
  .should('have.length', 5)
  .map('innerText')
  // confirm the first three strings
  .invoke('slice', 0, 3)
  .should('deep.equal', [
    'Bill Russell',
    'Tom Heinsohn',
    'Satch Sanders',
  ])
```

Let's select even `LI` elements

```js
cy.get('li:nth-child(even)')
  .should('have.length', 4)
  .map('innerText')
  // confirm the first two strings
  .invoke('slice', 0, 2)
  .should('deep.equal', ['Sam Jones', 'K. C. Jones'])
```

Select odd elements using `An+B` notation

```js
cy.get('li:nth-child(2n+1)')
  .should('have.length', 5)
  .map('innerText')
  // confirm the first three strings
  .invoke('slice', 0, 3)
  .should('deep.equal', [
    'Bill Russell',
    'Tom Heinsohn',
    'Satch Sanders',
  ])
```

Select event elements using `An+B` notation

```js
cy.get('li:nth-child(2n)')
  .should('have.length', 4)
  .map('innerText')
  // confirm the first two strings
  .invoke('slice', 0, 2)
  .should('deep.equal', ['Sam Jones', 'K. C. Jones'])
```

<!-- fiddle-end -->

## Individual elements

<!-- fiddle Nth examples -->

```html hide
<p>NBA players with most championships:</p>
<ul>
  <li>Bill Russell</li>
  <li>Sam Jones</li>
  <li>Tom Heinsohn</li>
  <li>K. C. Jones</li>
  <li>Satch Sanders</li>
  <li>John Havlicek</li>
  <li>Jim Loscutoff</li>
  <li>Frank Ramsey</li>
  <li>Robert Horry</li>
</ul>
```

```css hide
p {
  font-weight: bold;
}

li:nth-child(-n + 3) {
  border: 2px solid orange;
  margin-bottom: 1px;
}

li:nth-child(even) {
  background-color: lightyellow;
}
```

Select every 3rd element

```js
cy.get('li:nth-child(3n)')
  .should('have.length', 3)
  .map('innerText')
  .should('deep.equal', [
    'Tom Heinsohn',
    'John Havlicek',
    'Robert Horry',
  ])
```

Select every 3rd element, starting with the 2nd element

```js
cy.get('li:nth-child(3n + 2)')
  .should('have.length', 3)
  .map('innerText')
  .should('deep.equal', [
    'Sam Jones',
    'Satch Sanders',
    'Frank Ramsey',
  ])
```

<!-- fiddle-end -->

## Select first N elements

<!-- fiddle First N elements -->

```html hide
<p>NBA players with most championships:</p>
<ul>
  <li>Bill Russell</li>
  <li>Sam Jones</li>
  <li>Tom Heinsohn</li>
  <li>K. C. Jones</li>
  <li>Satch Sanders</li>
  <li>John Havlicek</li>
  <li>Jim Loscutoff</li>
  <li>Frank Ramsey</li>
  <li>Robert Horry</li>
</ul>
```

```css hide
p {
  font-weight: bold;
}

li:nth-child(-n + 3) {
  border: 2px solid orange;
  margin-bottom: 1px;
}

li:nth-child(even) {
  background-color: lightyellow;
}
```

Select first 2 elements

```js
cy.get('li:nth-child(-n + 2)')
  .map('innerText')
  .should('deep.equal', ['Bill Russell', 'Sam Jones'])
```

<!-- fiddle-end -->

## Elements from K to J

<!-- fiddle Elements from K to J -->

```html hide
<p>NBA players with most championships:</p>
<ul>
  <li>Bill Russell</li>
  <li>Sam Jones</li>
  <li>Tom Heinsohn</li>
  <li>K. C. Jones</li>
  <li>Satch Sanders</li>
  <li>John Havlicek</li>
  <li>Jim Loscutoff</li>
  <li>Frank Ramsey</li>
  <li>Robert Horry</li>
</ul>
```

```css hide
p {
  font-weight: bold;
}

li:nth-child(-n + 3) {
  border: 2px solid orange;
  margin-bottom: 1px;
}

li:nth-child(even) {
  background-color: lightyellow;
}
```

Select elements from index 4 to 6, index starts at 1. Note how the second `nth-child(-n + 6)` "resets" the counter `n` to make sure the 6th element is from the start of the siblings list.

```js
cy.get('li:nth-child(n + 4):nth-child(-n + 6)')
  .should('have.length', 3)
  .map('innerText')
  .should('deep.equal', [
    'K. C. Jones',
    'Satch Sanders',
    'John Havlicek',
  ])
```

The same query could be written differently. Select 3 elements starting with the element at index 4.

```js skip
cy.get('li:nth-child(n + 4):nth-child(3)')
  .should('have.length', 3)
  .map('innerText')
  .should('deep.equal', [
    'K. C. Jones',
    'Satch Sanders',
    'John Havlicek',
  ])
```

<!-- fiddle-end -->
