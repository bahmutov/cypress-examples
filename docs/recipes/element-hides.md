# Element Hides

## Element is removed from the DOM

<!-- fiddle Button goes away after a click -->

Imagine the element the user clicks, like a button. The button adds a class "away" after some time, and then is removed from DOM completely. It is a good example of automating waiting.

```css hide
.half {
  opacity: 50%;
}
```

```html
<button id="away">Click me</button>
```

```html hide
<script>
  const btn = document.getElementById('away')
  btn.addEventListener('click', () => {
    setTimeout(() => {
      btn.classList.add('half')
    }, 1000)
    setTimeout(() => {
      btn.parentElement.remove(btn)
    }, 2000)
  })
</script>
```

```js
cy.contains('button', 'Click')
  .click()
  .should('have.class', 'half')
```

Now let's confirm the element goes away completely. We cannot attach another assertion to the same `cy.get(...)` command:

```js skip
// 🚨 INCORRECT, JUST A DEMO
// "Element is detached from the DOM" error
cy.contains('button', 'Click')
  .should('have.class', 'half')
  .and('not.exist')
```

The above assertions cannot be both true at the same time; since the element is removed from the DOM, we want to check it separately.

```js
cy.contains('button', 'Click').should('not.exist')
```

<!-- fiddle-end -->

## Element becomes invisible

<!-- fiddle Button hides after a click -->

Now let's take a similar example, but this time the button simply hides after a delay using `display: none` style.

```css hide
.half {
  opacity: 50%;
}
```

```html
<button id="away">Click me</button>
```

```html hide
<script>
  const btn2 = document.getElementById('away')
  btn2.addEventListener('click', () => {
    setTimeout(() => {
      btn2.classList.add('half')
    }, 1000)
    setTimeout(() => {
      btn2.style.display = 'none'
    }, 2000)
  })
</script>
```

This time we can chain the same two assertions to the same DOM element.

```js
cy.contains('button', 'Click')
  .click()
  .should('have.class', 'half')
  .and('not.be.visible')
```

Since the element is still in the DOM, and it still has the class "half", both assertions can pass at the same time for the same found element.

<!-- fiddle-end -->
