# Select Next Day

<!-- fiddle Next day after active -->

Let's find the next `<TD>` element after `<TD class="day active">` element.

```html
<table>
  <tr>
    <td class="day">1</td>
    <td class="day">2</td>
    <td class="day active">3</td>
  </tr>
  <tr>
    <td class="day">4</td>
    <td class="day">5</td>
    <td class="day">6</td>
  </tr>
</table>
```

```css hide
.active {
  font-weight: bold;
}
```

```js
cy.get('.day.active')
  .invoke('index')
  .then((k) => {
    cy.get('.day')
      .eq(k + 1)
      .should('have.text', '4')
  })
```

<!-- fiddle-end -->
