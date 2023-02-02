# Connectors

Examples of connecting commands in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## [.each()](https://on.cypress.io/each)

<!-- fiddle each / print each element -->

To iterate over the elements of a current subject, use the `.each()` command.

```html
<ul class="connectors-each-ul">
  <li>Lara Williams</li>
  <li>William Grey</li>
  <li>Monica Pharrel</li>
</ul>
```

```js
cy.get('.connectors-each-ul>li').each(function (
  $el,
  index,
  $list,
) {
  console.log($el, index, $list)
})
```

<!-- fiddle-end -->

### Iterate over numbers using cy.each

You can iterate over array elements using `cy.each`

<!-- fiddle each / iterate over numbers -->

```js
cy.wrap([1, 2, 3, 4]).each((number) => {
  expect(number).to.be.an('number').and.to.be.gte(1).and.lte(4)
})
```

<!-- fiddle-end -->

### cy.each yields the original value

The values returned from the `cy.each(callback)` do not affect the value yielded after the iterations. The original value is yielded to the next command.

<!-- fiddle each / does not change the subject -->

```js
const numbers = [1, 2, 3, 4]
cy.wrap(numbers)
  .each((number) => {
    return number * 2
  })
  // the same array reference is yielded
  // to the next assertion
  .should('equal', numbers)
```

<!-- fiddle-end -->

For more `cy.each` examples, see the [cy.each recipe](../recipes/each-example.md) and [Collect Headings recipe](../recipes/collect-headings.md).

### Put complex logic into each callback

Let's say that we want to confirm that each element in the list has the text content `Item <index>` where the index starts with 1, and the tooltip attribute is `Click me`.

<!-- fiddle each / use cy commands inside the callback -->

```html
<ul class="items">
  <li title="Click me">Item: 1</li>
  <li title="Click me">Item: 2</li>
  <li title="Click me">Item: 3</li>
</ul>
```

```js
cy.get('.items>li').each(function ($el, index, $list) {
  cy.wrap($el)
    .should('have.text', `Item: ${index + 1}`)
    .and('have.attr', 'title', 'Click me')
})
```

<!-- fiddle-end -->

## [.its()](https://on.cypress.io/its)

To get the properties on the current subject, use the `.its()` command. For example, if the subject is the list of found elements, we can grab its `length` property and use it in the assertion:

<!-- fiddle its / number of elements -->

```html
<ul class="connectors-its-ul">
  <li>Chai</li>
  <li>Chai-jQuery</li>
  <li>Chai-Sinon</li>
</ul>
```

```js
cy.get('.connectors-its-ul>li')
  // calls the 'length' property returning that value
  .its('length')
  .should('be.gt', 2)
// tip: this is an equivalent assertion
cy.get('.connectors-its-ul>li').should('have.length.gt', 2)
```

<!-- fiddle-end -->

### Array index

When dealing with a collection, like an Array or a jQuery object, you can pass an index to get a single item.

<!-- fiddle its / array index -->

```js
cy.wrap(['hello', 'there', 'world'])
  // index starts with 0, so we will get
  // the second item in the array
  .its(2)
  .should('equal', 'world')
```

<!-- fiddle-end -->

See also [get the last item](../recipes/last-item.md) recipe.

### Retries automatically

The `cy.its` command retries finding the property until the property exists or the command times out. You can control the retry period by setting an explicit `timeout` parameter. For example, when checking a response from the `cy.request` command, the subject cannot change, thus you can safely use `cy.its('property', {timeout: 0})` option.

<!-- fiddle its / retries automatically -->

```html
<script>
  setTimeout(function () {
    window.appCustomField = 42
  }, 1000)
</script>
```

```js
// the following chain of commands checks the "window" object
// again and again until the application sets the property "appCustomField"
// The value of the property is yielded to the assertion
cy.window().its('appCustomField').should('equal', 42)
// tip: alternative solution using a single assertion
// (which cannot have nested paths compared to the cy.its command)
cy.window().should(
  'have.property',
  'appCustomField',
  42,
  'property added',
)
```

Sometimes we do not need the automatic retries. For example, the result of `cy.request` will never change. To avoid unnecessary retries and waiting, we can set the timeout to zero for the `cy.its` command.

```js
// We can avoid unnecessary retries when getting the property
// using the "timeout: 0" option
cy.request('https://jsonplaceholder.cypress.io/users/1')
  .its('body', { timeout: 0 })
  .should('include.keys', 'id', 'name', 'email')
```

<!-- fiddle-end -->

For more, read the [Cypress retry-ability guide](https://on.cypress.io/retry-ability) and watch [The cy.its Command Examples With Retries And Without](https://youtu.be/2LdVcnYAE7Q).

### Nested properties

Under the hood, `.its` uses Lodash `_.property` method, thus you can grab the nested values using dot notation:

<!-- fiddle its / nested property -->

```js
const person = {
  name: {
    first: 'Joe',
    last: 'Smith',
  },
  organizationIds: [
    {
      id: 1,
      name: 'Acme, inc',
    },
    {
      id: 2,
      name: 'IEEE',
    },
  ],
}
cy.wrap(person)
  // grab nested property using "." notation
  .its('name.first')
  .should('equal', 'Joe')
// the dot notation works with arrays
cy.wrap(person)
  .its('organizationIds.1.name')
  .should('equal', 'IEEE')
```

<!-- fiddle-end -->

### jQuery to DOM element

All Cypress [querying commands](./querying.md) yield a jQuery object. You can get the individual DOM elements in several ways.

<!-- fiddle its / jQuery to DOM element -->

```html
<ol id="fruits">
  <li>Apples</li>
  <li>Pears</li>
  <li>Bananas</li>
</ol>
```

Method 1: use a nested `cy.its` property

```js
// yields a jQuery object with 3 elements
cy.get('#fruits li')
  .should('have.length', 3)
  // jQuery element access by index [1]
  // yields a DOM element, and then we access
  // its property "innerText"
  .its('1.innerText')
  .should('equal', 'Pears')
```

Method 2: use the `cy.eq` and `cy.invoke` commands

```js
// equivalent to the combination of commands
cy.get('#fruits li')
  // yields the jQuery element at index 1
  .eq(1)
  // invokes the jQuery method text()
  .invoke('text')
  .should('equal', 'Pears')
```

Method 3: invoke the jQuery `get(index)` method

```js
// instead of ".its" or ".eq" commands
// we can call the jQuery method "get(index)"
// to yield a single jQuery element
cy.get('#fruits li').invoke('get', 2).invoke('text')
```

**Note:** invoking the jQuery `get(index)` method should yield a plain DOM element, but Cypress automatically wraps DOM elements in a jQuery object when yielding to the next command or assertion. Thus we use the `cy.invoke('text')` command

<!-- fiddle-end -->

## [.invoke()](https://on.cypress.io/invoke)

To invoke a function on a current subject, use the `.invoke()` command.

<!-- fiddle invoke / jQuery method -->

```html
<div class="connectors-div">This is a div</div>
<script>
  // hide this div so we can invoke show later
  $('.connectors-div').hide()
</script>
```

```js
cy.get('.connectors-div')
  .should('be.hidden')
  // call the jquery method 'show' on the 'div.container'
  .invoke('show')
  .should('be.visible')
```

<!-- fiddle-end -->

### Invoke asynchronous method

If the method returns a Promise, `cy.invoke` automatically waits for it. **But** if you need the resolved value, you need to use `cy.then` to invoke the method instead 🤯

<!-- fiddle invoke / asynchronous method -->

```html
<div class="connectors-div">This is a div</div>
<script>
  // application adds its instance to the "window"
  window.app = {
    fetchName() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('My App')
        }, 1000)
      })
    },
  }
</script>
```

```js
// wait for the "app.fetchName" to finish
cy.window().its('app').invoke('fetchName')
```

If we want to confirm the resolved value, have to call the method ourselves

```js
cy.window()
  .its('app')
  .then((app) => app.fetchName())
  .should('equal', 'My App')
```

Or we can insert an truthy assertion and get the resolved value later

```js
cy.window()
  .its('app')
  .invoke('fetchName')
  .should('be.ok')
  .then((s) => expect(s).to.equal('My App'))
```

<!-- fiddle-end -->

**Tip:** use [cypress-map](https://github.com/bahmutov/cypress-map) plugin which has `cy.invokeOnce` method that waits for asynchronous methods by default and yields the resolved value.

## [.spread()](https://on.cypress.io/spread)

### Spread an array

To spread an array as individual arguments to a callback function, use the `.spread()` command.

<!-- fiddle spread / an array -->

```js
const arr = ['foo', 'bar', 'baz']

cy.wrap(arr).spread(function (foo, bar, baz) {
  expect(foo).to.eq('foo')
  expect(bar).to.eq('bar')
  expect(baz).to.eq('baz')
})
```

<!-- fiddle-end -->

### Spread DOM elements

<!-- fiddle spread / DOM elements -->

If the previous command yields a jQuery object, it can be spread into individual DOM elements.

```html
<ol id="friends">
  <li>The best friend</li>
  <li>Childhood friend</li>
  <li>An acquaintance</li>
</ol>
```

```js
cy.get('#friends li').spread((top, middle, last) => {
  // each argument here is a DOM element
  expect(Cypress.dom.isElement(top)).to.be.true
  expect(Cypress.dom.isElement(middle)).to.be.true
  expect(Cypress.dom.isElement(last)).to.be.true
  // we can confirm the element's properties
  expect(top, 'top').to.have.text('The best friend')
  expect(middle, 'middle').to.include.text('Childhood')
  expect(last.innerText, 'last').to.match(/^An acq/)
})
```

<!-- fiddle-end -->

### Spread network intercepts

<!-- fiddle spread / network intercepts -->

```html
<button id="load-resources">Load resources</button>
<script>
  document
    .getElementById('load-resources')
    .addEventListener('click', function () {
      // the application requests multiple resources
      const root = 'https://jsonplaceholder.cypress.io'
      fetch(root + '/users/1')
      fetch(root + '/users/2')
      fetch(root + '/users/3')
    })
</script>
```

```js
// spy on multiple network requests
cy.intercept('GET', '/users/1').as('first')
cy.intercept('GET', '/users/2').as('second')
cy.intercept('GET', '/users/3').as('third')
cy.get('#load-resources').click()
// wait for the intercepts and spread them into individual arguments
cy.wait(['@first', '@second', '@third']).spread(
  (first, second, third) => {
    cy.log(first.request.url)
    cy.log(second.request.url)
    cy.log(third.request.url)
      // make sure we log the results first
      // before making assertions
      .then(() => {
        expect(first.request.url, 'first').to.match(/\/1$/)
        expect(second.request.url, 'second').to.match(/\/2$/)
        expect(third.request.url, 'third').to.match(/\/3$/)
      })
  },
)
```

<!-- fiddle-end -->

## [.then()](https://on.cypress.io/then)

The `cy.then` command is a very interesting and controversial topic. In my opinion, it is a very powerful and useful command, but it should [have been called something else](https://glebbahmutov.com/blog/replace-and-remove-cy-then-command/), like `cy.later`. Anyway, here is how you can use `cy.then` in your specs.

### Synchronous callback

<!-- fiddle then / pass the current subject to the callback -->

```html
<ul class="connectors-list">
  <li>Walk the dog</li>
  <li>Feed the cat</li>
  <li>Write JavaScript</li>
</ul>
```

To invoke a callback function with the current subject, use the `.then()` command.

```js
cy.log('**Callback**')
cy.get('.connectors-list>li').then(function ($lis) {
  expect($lis).to.have.length(3)
  expect($lis.eq(0)).to.contain('Walk the dog')
  expect($lis.eq(1)).to.contain('Feed the cat')
  expect($lis.eq(2)).to.contain('Write JavaScript')
})
```

<!-- fiddle-end -->

### Use promises

If the `cy.then(callback)` function returns a Promise, Cypress automatically yields the resolved value to the next command or assertion. If that promise is rejected, then the test fails.

<!-- fiddle then / waits for the promise to resolve -->

```js
cy.wrap(1000)
  .then((ms) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve('done'), 1000)
    })
  })
  // yields the resolved value
  // after 1 second
  .should('equal', 'done')
```

<!-- fiddle-end -->

### Use async syntax

Here is the truth. The following `async` and `return new Promise` are equivalent, so you can use `async` callbacks with `cy.then`

<!-- fiddle then / async callback -->

```js
async function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve('done'), ms)
  })
}

cy.wrap(1000)
  .then(async (ms) => {
    await delay(500)
    return await delay(1000)
  })
  // yields the resolved value
  // after 1.5 second
  .should('equal', 'done')
```

<!-- fiddle-end -->

### Return a value

If the callback function returns a value, it is yielded to the next callback, just like in a Promise callback.

<!-- fiddle then / return new subject -->

```js
cy.log('**Return value**')
cy.wrap(1)
  .then((num) => {
    expect(num).to.equal(1)

    return 2
  })
  .then((num) => {
    expect(num).to.equal(2)
  })
```

<!-- fiddle-end -->

### Keep the current subject

But unlike a Promise, if `undefined` is returned, then the original value passed into the `.then(cb)` is yielded to the next callback.

<!-- fiddle then / keep the current subject -->

```js
cy.log('**Returning undefined**')
cy.wrap(1)
  .then((num) => {
    expect(num).to.equal(1)
    // note that nothing is returned from this callback
  })
  .then((num) => {
    // this callback receives the original unchanged value 1
    expect(num).to.equal(1)
  })
```

This is very useful when logging the current subject to the DevTools using `console.log`

```js
cy.wrap('Hello')
  // passes the subject to console.log
  // which returns undefined
  .then(console.log)
  // yields the original subject
  .should('equal', 'Hello')
```

<!-- fiddle-end -->

### Cypress commands inside the callback

If there are Cypress commands in the `.then(cb)` callback, then the value yielded by the last command will be passed to the next callback.

<!-- fiddle then / commands inside the callback -->

```js
cy.log('**Returning wrapped value**')
cy.wrap(1)
  .then((num) => {
    expect(num).to.equal(1)
    // note how we run a Cypress command
    // the result yielded by this Cypress command
    // will be passed to the second ".then"
    cy.wrap(2)
  })
  .then((num) => {
    // this callback receives the value yielded by "cy.wrap(2)"
    expect(num).to.equal(2)
  })
```

<!-- fiddle-end -->

### Callback should return a promise

⚠️ There is one big warning that you should be aware when using Promises in JavaScript (not just with Cypress). Because [promises are eager](https://glebbahmutov.com/blog/difference-between-promise-and-task/), then start running immediately when created. Let's take the following utility functions.

<!-- fiddle then / promises are eager -->

```js
async function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve('done'), ms)
  })
}

async function printWithDelay(message, ms) {
  console.log('before: %s', message)
  await delay(ms)
  console.log(message)
  return message
}
```

What do you think you will see in the DevTools Console when the following test runs?

```js
cy.wrap('Promise me').then(console.log).wait(2000)
cy.wrap(printWithDelay('Yup', 1000)).then(console.log)
```

You will see

```
before: Yup
Promise me
Yup
Yup
```

The order is strange. The `before: Yup` is printed _before_ Cypress even queues its commands and starts running them. We call `printWithDelay('Yup', 1000)` and this immediately executes. Thus you see

```
before: Yup
```

Then the `cy.wrap('Promise me').then(console.log)` executes and prints

```
before: Yup
Promise me
```

Then Cypress command at this point is executing `cy.wait(2000)`. At some point the `setTimeout` inside `delay` fires, and `printWithDelay` prints

```
before: Yup
Promise me
Yup
```

Notice how `cy.wrap` correctly takes already resolved promise and yields its return value to the last `.then(console.log)` printing the last `Yup`.

⚠️ The lesson here is: do not put promises into the Cypress commands, put callbacks that return a promise. Then the async functions will run in order with the normal Cypress commands.

<!-- fiddle-end -->

### Start command chain with a promise

<!-- fiddle then / start with a promise -->

If you want to wait for a promise _at the start of the test_, use `cy.then(callback)`

```js
async function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve('done'), ms)
  })
}

async function printWithDelay(message, ms) {
  console.log('before: %s', message)
  await delay(ms)
  console.log(message)
  return message
}

cy.wrap('test start').then(console.log)
cy.then(() => printWithDelay('first cy.then', 1000)).then(() =>
  console.log('second cy.then'),
)
```

This prints the log messages as expected, here I am including the timestamps

```
11:23:16.573 test start
11:23:16.574 before: first cy.then
11:23:17.575 first cy.then
11:23:17.576 second cy.then
```

The `printWithDelay` starts _after_ the command chain `cy.wrap('test start').then(console.log)` finishes.

**Tip:** you can place your async code into `beforeEach` hook. The test runner automatically waits for the hooks to finish before starting the tests.

<!-- fiddle-end -->
