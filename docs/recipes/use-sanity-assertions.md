# Use Sanity Assertions

Imagine we need to confirm that the two numbers shown on the page match. There are multiple ways we could write this test.

## Compare two numbers

<!-- fiddle Compare two static numbers -->

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

```html hide
<div>
  Received <span id="received" class="dollars">19.80</span>
</div>
<div>Spent <span id="spent" class="dollars">19.80</span></div>
```

```js
cy.get('#received')
  .invoke('text')
  .then(Number)
  .then((received) => {
    cy.contains('#spent', received)
  })
```

<!-- fiddle-end -->

Great. Get an element, grab its text, convert to a number, then use [cy.contains](https://on.cypress.io/contains) to find the other matching number. Notice that we did not check anything in the test above, except the existence of the elements `#received` and `#spent` using the built-in existence assertion in the [cy.get](https://on.cypress.io/get) and [cy.contains](https://on.cypress.io/contains) commands. This can cause problems.

## Dynamic data

Imagine the same application is loading the two numbers after a delay. Initial the app shows `--` and later switches this text to the actual values.

<!-- fiddle Compare two dynamic numbers -->

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

```html hide
<div>Received <span id="received" class="dollars">--</span></div>
<div>Spent <span id="spent" class="dollars">--</span></div>
<script>
  setTimeout(() => {
    document.getElementById('received').innerText = '19.80'
  }, 1000)
  setTimeout(() => {
    document.getElementById('spent').innerText = '19.80'
  }, 2000)
</script>
```

The original test fails because `--` converted to the nunmber is a `NaN` value, and `cy.contains(selector, NaN)` throws an error.

```js skip
// 🚨 DOES NOT WORK
// since "--" makes NaN which cy.contains does not accept
cy.get('#received')
  .invoke('text')
  .then(Number)
  .then((received) => {
    cy.contains('#spent', received)
  })
```

We can convert `NaN` to a String to pass to the `cy.contains` command. But all the `cy.contains` command will do is forever try to find an element with id `spent` and text `NaN`. It will never go back to the first element `#received` to grab the updated text.

```js skip
// 🚨 DOES NOT WORK
// since "cy.then" breaks the retries
// and it never "sees" the updated "#received" element text
cy.get('#received')
  .invoke('text')
  .then(Number)
  .then((received) => {
    cy.contains('#spent', String(received))
  })
```

The command [cy.then](https://on.cypress.io/then) does not retry. Thus when the `cy.contains` inside fails, it WILL NOT go back to the very first `cy.get('#received')` command to grab the updated element. We can try using the [cy.should](https://on.cypress.io/should) assertion; it does retry. But we cannot use other Cypress commands inside the `should(callback)`. Another dead end.

```js skip
// 🚨 DOES NOT WORK
// since we cannot use "cy.contains" inside a "should(callback)"
cy.get('#received')
  .invoke('text')
  .should((received) => {
    cy.contains('#spent', received)
  })
```

Ok, how about just using the text from the first element? It will prevent `--` being converted into `NaN` problem. The test passes, but it passes _accidentally_ when it matches the text `--` in the two elements. The test never "sees" two equal numbers!

```js
// 🚨 DOES NOT WORK
// it passes _accidentally_ when it matches the initial text "--"
cy.get('#received')
  .invoke('text')
  .then((received) => {
    cy.contains('#spent', received)
  })
```

We can do better. Our problem is that we want to compare _two numbers_, yet we never checked if the elements have numbers or something else. Let's add _sanity assertions_: we are looking for two numbers. Once we see the numbers, we can compare their values without any retries.

```js
cy.log('**sanity assertions**')
cy.get('#received')
  .invoke('text')
  // this is a sanity assertion
  .should('match', /^\d+\.\d\d$/)
  .then(Number)
  .then((received) => {
    // another sanity assertion confirming a valid number
    expect(received, 'received number').to.be.a('number').and.to
      .not.be.a.NaN
    // we can also use stricter and shorter assertion
    // which also handles NaN case
    expect(received, 'received is positive').to.be.greaterThan(0)
    cy.contains('#spent', received)
  })
```

You can confirm the number using `cy.contains` by passing a regular expression to match a number with two digits after the dot:

```js
cy.log('**cy.contains with a regular assertion**')
// the regular assertion acts like a sanity check
cy.contains('#received', /^\d+\.\d\d$/)
  .invoke('text')
  .then(Number)
  .then((received) => {
    cy.contains('#spent', received)
  })
```

<!-- fiddle-end -->

## Negative assertions

Just a ward of caution. You might try using negative assertions to confirm that the elements stop showing the initial text `--`.

<!-- fiddle Beware of negative assertions -->

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

```html hide
<div>Received <span id="received" class="dollars">--</span></div>
<div>Spent <span id="spent" class="dollars">--</span></div>
<script>
  setTimeout(() => {
    document.getElementById('received').innerText = '19.80'
  }, 1000)
  setTimeout(() => {
    document.getElementById('spent').innerText = '19.80'
  }, 2000)
</script>
```

**Beware:** using a negative assertion like "should not have text --" might work _for now_.

```js skip
cy.get('#received').should('not.have.text', '--')
cy.get('#spent').should('not.have.text', '--')
// compare the two values
cy.get('#received')
  .invoke('text')
  .then((received) => {
    cy.contains('#spent', received)
  })
```

But what happens when we change the initial HTML to `...` instead of `--`? The test will immediately pass _accidentally_. My advice is to confirm the expected value instead of checking it against _all_ possible invalid values.

```js
// ✅ Using positive assertions
cy.contains('#received', /^\d+\.\d\d$/)
cy.contains('#spent', /^\d+\.\d\d$/)
```

<!-- fiddle-end -->

## Know your data

Here is the best solution to this test. If you know the expected values, you can write simple and robust test.

<!-- fiddle Check known numbers -->

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

```html hide
<div>Received <span id="received" class="dollars">--</span></div>
<div>Spent <span id="spent" class="dollars">--</span></div>
<script>
  setTimeout(() => {
    document.getElementById('received').innerText = '19.80'
  }, 1000)
  setTimeout(() => {
    document.getElementById('spent').innerText = '19.80'
  }, 2000)
</script>
```

```js
const amount = (19.8).toFixed(2)
cy.contains('#received', amount)
cy.contains('#spent', amount)
```

Nice and easy.

<!-- fiddle-end -->
