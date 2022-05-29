# Click Each Item

Let's say we have a list of items, and there is a button next to each item. We want to click on each item's button and then check the total number of clicks against the value displayed by the application.

<!-- fiddle Click each item -->

```html
<ul>
  <li><button>➕</button> Apples</li>
  <li><button>➕</button> Kiwi</li>
  <li><button>➕</button> Grapes</li>
  <li><button>➕</button> Melon</li>
</ul>
<output id="count">0</output>
<script>
  document.querySelectorAll('button').forEach(function (button) {
    button.addEventListener('click', function () {
      const output = document.getElementById('count')
      const n = parseInt(output.innerText)
      output.innerText = String(n + 1)
    })
  })
</script>
```

```js
// the count starts at zero
cy.contains('#count', 0)
// click each button
cy.get('ul button')
  .click({ multiple: true })
  // the displayed count should equal the number of buttons
  .its('length')
  .then((n) => {
    cy.contains('#count', n)
  })
```

<!-- fiddle-end -->
