# Scroll Examples

Using the [cy.scrollTo](https://on.cypress.io/scrollto) command.

## Scroll horizontally

📺 Watch this recipe explained in the video [Cypress Horizontal Scroll Example](https://youtu.be/EwQYiZLSuHg).

<!-- fiddle Horizontal scroll -->

```html hide
<div id="scrollable-horizontal">
    <div style="width: 3000px">
      <ul>
        <li class="square100">1</li>
        <li class="square100">2</li>
        <li class="square100">3</li>
        <li class="square100">4</li>
        <li class="square100">5</li>
        <li class="square100">6</li>
        <li class="square100">7</li>
        <li class="square100">8</li>
      </ul>
    </div>
  </div>
</div>
```

```css hide
#scrollable-horizontal {
  height: 200px;
  width: 400px;
  overflow: auto;
}

.square100 {
  width: 100px;
  height: 100px;
  background-color: teal;
}

#scrollable-horizontal {
  background-color: #ddd;
  border: 1px solid #777;
  border-radius: 4px;
  margin-bottom: 15px;
}

#scrollable-horizontal ul {
  padding: 0;
  overflow: auto;
}

#scrollable-horizontal ul > li {
  list-style: none;
  margin: 20px;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
```

Initially, the scrollable container starts at the left edge

```js
cy.get('#scrollable-horizontal').should(
  'have.prop',
  'scrollLeft',
  0,
)
```

Some of the blocks are visible, some are hidden by the overflow.

```js
cy.get('#scrollable-horizontal')
  .contains('li', '1')
  .should('be.visible')
cy.get('#scrollable-horizontal')
  .contains('li', '4')
  .should('not.be.visible')
```

Scroll the container by 300 pixels to the right. I like adding `duration` parameter to make the scroll visible

```js
// we can give the X pixel amount either as a number
// or as a string: 300 or "300px"
cy.get('#scrollable-horizontal').scrollTo(300, {
  duration: 700,
})
```

Confirm the element has been scrolled and stays scrolled. ⚠️ Sometimes framework "resets" the scroll, so give our app some time to "think" and then check.

```js
cy.wait(100)
  .get('#scrollable-horizontal')
  .should('have.prop', 'scrollLeft', 300)
```

Confirm the first block is now hidden and the 4th block is visible.

```js
cy.get('#scrollable-horizontal')
  .contains('li', '1')
  .should('not.be.visible')
cy.get('#scrollable-horizontal')
  .contains('li', '4')
  .should('be.visible')
```

<!-- fiddle-end -->
