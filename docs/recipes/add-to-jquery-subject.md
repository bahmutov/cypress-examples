# Add To jQuery Subject

📺 Watch this video explained in the video [Select DOM Elements Using CSS OR Selector](https://youtu.be/Pn-nGTHiCds).

If we find elements on the page using a query like `cy.get`, we can add more elements by invoking the [$.add](https://api.jquery.com/add/) jQuery method.

<!-- fiddle Expand the jQuery object with new elements -->

```css hide
.dollars::before {
  content: '$';
  margin-right: 2px;
}
.dollars {
  width: 6rem;
  text-align: right;
}
```

```html
<div>
  Subtotal <span id="subtotal" class="dollars">20.15</span>
</div>
<div>Total <span id="total" class="dollars">24.85</span></div>
<div><strong>Fees</strong></div>
<div>Tax <span id="tax" class="dollars">1.70</span></div>
<div>Tip <span id="tip" class="dollars">3.00</span></div>
```

Let's use the `OR` CSS selector, the order is the same as the elements appear in the document.

```js
cy.get('#subtotal, #tax, #tip, #total')
  .map('id')
  .should('deep.equal', ['subtotal', 'total', 'tax', 'tip'])
```

We can get produce the same jQuery element by "growing" the subject step by step.

```js
cy.get('#subtotal') // finds the #subtotal element
  .invoke('add', '#tax') // adds the found #tax element
  .invoke('add', '#tip') // now has 3 elements
  .invoke('add', '#total') // has all 4 elements
  // confirm the order is the same as the elements appear
  // in the document
  .map('id')
  .should('deep.equal', ['subtotal', 'total', 'tax', 'tip'])
```

<!-- fiddle-end -->
