# Assertions

Examples of asserting the state or behavior of your application in Cypress, for a full reference of commands, go to [docs.cypress.io](https://on.cypress.io/api)

## Implicit Assertions

### [.should()](https://on.cypress.io/should)

To make an assertion about the current subject, use the `.should()` command.

<!-- fiddle Implicit Assertions / .should() - make an assertion about the current subject -->

```html
<table class="table table-bordered assertion-table">
  <thead>
    <tr>
      <th>#</th>
      <th>Column heading</th>
      <th>Column heading</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
    <tr class="success">
      <th scope="row">3</th>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
  </tbody>
</table>
```

```js
cy.get('.assertion-table')
  .find('tbody tr:last')
  .should('have.class', 'success')
  .find('td')
  .first()
  // checking the text of the  element in various ways
  .should('have.text', 'Column content')
  .should('contain', 'Column content')
  .should('have.html', 'Column content')
  // chai-jquery uses "is()" to check if element matches selector
  .should('match', 'td')
  // to match text content against a regular expression
  // first need to invoke jQuery method text()
  // and then match using regular expression
  .invoke('text')
  .should('match', /column content/i)

// a better way to check element's text content against a regular expression
// is to use "cy.contains"
// https://on.cypress.io/contains
cy.get('.assertion-table')
  .find('tbody tr:last')
  // finds first  element with text content matching regular expression
  .contains('td', /column content/i)
  .should('be.visible')
```

For more examples of using the `match` assertion against jQuery elements and text, see the recipe [Match Assertion](../recipes/match-assertion.md).

Note: find even more examples of matching element's text content in this [FAQ answer](https://on.cypress.io/using-cypress-faq#How-do-I-get-an-element%E2%80%99s-text-contents).

<!-- fiddle-end -->

### [.and()](https://on.cypress.io/and)

To chain multiple assertions together, use the `.and()` command.

<!-- fiddle Implicit Assertions / .and() - chain multiple assertions together -->

```html
<a
  class="assertions-link active"
  href="https://on.cypress.io"
  target="_blank"
  >Cypress Docs</a
>
```

```js
// https://on.cypress.io/and
cy.get('.assertions-link')
  .should('have.class', 'active')
  .and('have.attr', 'href')
  .and('include', 'cypress.io')
```

<!-- fiddle-end -->

Note that all assertions attached to the same command must pass at the same time for the command to succeed.

### Subject

The implicit assertions keep the original subject and pass it to the next command.

<!-- fiddle Implicit Assertions / .should() - keeps the original subject -->

```js
const employee = {
  person: {
    name: {
      first: 'Joe',
      last: 'Smith',
    },
  },
}
cy.wrap(employee)
  .should('have.key', 'person')
  .then((x) => {
    // we are still working with the entire object
    expect(x).to.equal(employee)
  })
```

<!-- fiddle-end -->

Except for several assertions that DO change the subject:

- `have.property` for objects
- `have.attr` for DOM elements
- `have.prop` for DOM elements

as the next tests demonstrate

#### `have.property` assertion

<!-- fiddle Implicit Assertions / .should() - have.property changes the subject -->

```js
const employee = {
  person: {
    name: {
      first: 'Joe',
      last: 'Smith',
    },
  },
}
cy.wrap(employee)
  .should('have.property', 'person')
  .then((x) => {
    // the current subject has been changed to employee.person
    expect(x).to.equal(employee.person)
    expect(x).to.have.key('name')
  })
// Tip: you can use another implicit assertion to check the yielded property
cy.wrap(employee) // full object
  .should('have.property', 'person') // employee.person
  .should('equal', employee.person) // still employee.person
  .and('have.key', 'name') // still employee.person
  // still employee.person because have.key does not change the subject
  .should('equal', employee.person)
```

<!-- fiddle-end -->

#### Multiple properties

If you want to check multiple properties at once we can use `deep.include` assertion. Note we cannot use `deep.equals` in this case, since the object has extra properties we are not interested in.

<!-- fiddle Implicit Assertions / .should() - multiple properties -->

```js
const person = {
  firstName: 'Joe',
  lastName: 'Smith',
  age: 29,
}
cy.wrap(person).should('deep.include', {
  firstName: 'Joe',
  lastName: 'Smith',
})
```

<!-- fiddle-end -->

#### `have.attr` assertion

<!-- fiddle Implicit Assertions / .should() - have.attr changes the subject -->

```html
<div
  data-cy="subject-example"
  style="color: orange; background-color:green;"
>
  Test div
</div>
```

```js
cy.get('[data-cy=subject-example]')
  .should('have.attr', 'style')
  .then((x) => {
    // x is the complete style attribute
    const withoutWhiteSpace = x.replace(/\s/g, '')
    expect(withoutWhiteSpace).to.equal(
      'color:orange;background-color:green;',
    )
  })
// we can remove the whitespace by invoking the method
// on the yielded subject
cy.get('[data-cy=subject-example]') // jQuery element
  .should('have.attr', 'style') // string attribute
  .invoke('replace', /\s/g, '') // string without whitespace
  .should('equal', 'color:orange;background-color:green;')
```

<!-- fiddle-end -->

#### Escape special characters

Sometimes an attribute can have a special character like `.` or `:` in it. If you are just checking the attribute name, you do not need to escape them.

<!-- fiddle Implicit Assertions / .should() - have.attr with a dot -->

```html
<div id="escape-attribute" attr.aria-label="Attribute example">
  Example
</div>
```

```js
// confirm the element has the attribute
cy.get('#escape-attribute').should(
  'have.attr',
  'attr.aria-label',
)
// confirm the element has the attribute and that attribute
// has the specific value
cy.get('#escape-attribute').should(
  'have.attr',
  'attr.aria-label',
  'Attribute example',
)
```

<!-- fiddle-end -->

#### `have.attr` assertion chain

<!-- fiddle Implicit Assertions / .should() - have.attr matching part of the string -->

If we only know a part of the expected attribute, we can first assert the attribute is present, then use an assertion to match its value.

```html
<a id="my-link" href="/some/complex/link-123">My link</a>
```

```js
cy.get('#my-link')
  .should('have.attr', 'href')
  // check if the href attribute includes given string
  .and('include', 'link-')
// we can use a regular expression
cy.get('#my-link')
  .should('have.attr', 'href')
  .and('match', /\/link\-\d+/)
```

<!-- fiddle-end -->

<!-- fiddle Implicit Assertions / .should() - have.prop changes the subject -->

```html
<div class="first second">
  Test div
</div>
```

```js
cy.get('.first')
  .should('have.prop', 'class')
  .then((x) => {
    // x is the class prop
    expect(x).to.equal('first second')
  })
```

<!-- fiddle-end -->

## Explicit Assertions

### expect

To make a BDD assertion about a specified subject, use `expect`.

<!-- fiddle Explicit Assertions / expect - make an assertion about a specified subject -->

```js
expect(true, 'it is true').to.be.true

const o = { foo: 'bar' }
expect(o, 'object reference').to.equal(o)
// "deep.equal" assertion compares the properties inside the object
expect(o, 'deep equality').to.deep.equal({ foo: 'bar' })

// matching text using regular expression
expect('FooBar').to.match(/bar$/i)
// check if the variable is defined, is a string, and has characters
const orgId = '4AB001C'
expect(orgId, 'org id').to.be.a('string').and.not.be.empty

// check if the response status code is successful
const statusCode = 204
expect(statusCode, 'status code').to.be.within(200, 399)

// check if a value is one of the three allowed choices
const fruit = 'Grapes'
expect(fruit, 'the fruit').to.be.oneOf([
  'Apples',
  'Oranges',
  'Grapes',
])

// generic predicate function check using the "satisfy" assertion
expect('Hello').to.satisfy(
  (s) => typeof s === 'string' && s.length === 5,
)
// you can use built-in Lodash predicates
expect(window.NaN, 'NaN').to.satisfy(Cypress._.isNaN)
cy.wrap(2, 'Two').should('satisfy', Cypress._.isFinite)
```

<!-- fiddle-end -->

#### string assertion

<!-- fiddle Explicit Assertions / expect - assert a substring -->

```html
<table id="substrings">
  <tbody>
    <tr>
      <td>Column 1</td>
    </tr>
  </tbody>
</table>
```

```js
// chai assertion "string" checks the presence of substring
cy.get('#substrings tbody tr:first td:first')
  .invoke('text')
  .then((s) => {
    expect(s).to.string('Column')
    expect(s).to.not.string('Row')
  })
```

<!-- fiddle-end -->

#### Compare two lists of elements

Let's compare the text content of two lists. We would like to assert that the second list is a subset of the first one. First, we need to get the text from each list, then compare them.

**Tip:** see recipe "Getting Text from List of Elements" to see how to iterate over the list of elements and get their text content.

<!-- fiddle Explicit Assertions / expect - compare two lists -->

```html
<ol id="first">
  <li>Apples</li>
  <li>Oranges</li>
  <li>Melons</li>
  <li>Grapes</li>
</ol>
<ol id="second">
  <li>Grapes</li>
  <li>Oranges</li>
</ol>
```

```js
const firstList = []
const secondList = []
// let's get the first list of strings
cy.get('#first li').each(($li) => {
  firstList.push($li.text())
})
cy.get('#second li')
  .each(($li) => {
    secondList.push($li.text())
  })
  .then(() => {
    // when this callback runs, both lists will be populated
    expect(firstList).to.include.members(secondList)
  })
```

<!-- fiddle-end -->

### assert

To make a TDD assertion about a specified subject, use `assert`.

<!-- fiddle Explicit Assertions / assert - assert shape of an object -->

```js
const person = {
  name: 'Joe',
  age: 20,
}

assert.isObject(person, 'value is object')
```

<!-- fiddle-end -->

## [Should with callback function](https://on.cypress.io/should#Function)

You can write your own complicated checks using `.should(cb)` function if included assertions are not enough. Pass a function to `should()` with any number of explicit assertions within it. The callback function will be retried until it passes all your explicit assertions or times out.

<!-- fiddle Should(cb) / pass your own callback function to should() -->

```html
<div class="assertions-p">
  <p>Some text from first p</p>
  <p>More text from second p</p>
  <p>And even more text from third p</p>
</div>
```

```js
// Pass a function to should that can have any number
// of explicit assertions within it.
// The ".should(cb)" function will be retried
// automatically until it passes all your explicit assertions or times out.
cy.get('.assertions-p')
  .find('p')
  .should(($p) => {
    // https://on.cypress.io/$
    // return an array of texts from all of the p's
    // @ts-ignore TS6133 unused variable
    const texts = $p.map((i, el) => Cypress.$(el).text())

    // jquery map returns jquery object
    // and .get() convert this to simple array
    const paragraphs = texts.get()

    // array should have length of 3
    expect(paragraphs, 'has 3 paragraphs').to.have.length(3)

    // use second argument to expect(...) to provide clear
    // message with each assertion
    expect(
      paragraphs,
      'has expected text in each paragraph',
    ).to.deep.eq([
      'Some text from first p',
      'More text from second p',
      'And even more text from third p',
    ])
  })
```

<!-- fiddle-end -->

### Partial class string match example

Assert that element's class includes `heading-`.

<!-- fiddle Should(cb) / finds element by class name regex -->

```html
<div class="docs-header">
  <div class="main-abc123 heading-xyz987">Introduction</div>
</div>
```

```js
cy.get('.docs-header')
  .find('div')
  // .should(cb) callback function will be retried
  .should(($div) => {
    expect($div).to.have.length(1)

    const className = $div[0].className

    expect(className).to.match(/heading-/)
  })
  // .then(cb) callback is not retried,
  // it either passes or fails
  .then(($div) => {
    expect($div, 'text content').to.have.text('Introduction')
  })
```

<!-- fiddle-end -->

### Throwing own errors

You can throw any error from the callback function. The callback will be retried, but the assertions will not be shown as nicely in the Command Log UI as Chai assertions.

<!-- fiddle Should(cb) / can throw any error -->

```html
<div class="docs-header-example">
  <div class="heading-top">Top content</div>
</div>
```

```js
cy.get('.docs-header-example')
  .find('div')
  .should(($div) => {
    if ($div.length !== 1) {
      // you can throw your own errors
      throw new Error('Did not find 1 element')
    }

    const className = $div[0].className

    if (!className.match(/heading-/)) {
      throw new Error(
        `Could not find class "heading-" in ${className}`,
      )
    }
  })
```

<!-- fiddle-end -->

### Dynamic text example

We [strongly recommend that your tests are deterministic](https://on.cypress.io/conditional-testing). But sometimes you might need to match text between two elements, and you do not know what that text should be. Save the value from the first element, then compare it from a `should(cb)` callback.

<!-- fiddle Should(cb) / matches unknown text between two elements -->

```html
<div class="two-elements">
  <div class="first">Foo Bar</div>
  <div class="second">foo b a r</div>
</div>
```

```js
/**
 * Text from the first element.
 * @type {string}
 */
let text

/**
 * Normalizes passed text,
 * useful before comparing text with spaces and different capitalization.
 * @param {string} s Text to normalize
 */
const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase()

cy.get('.two-elements')
  .find('.first')
  .then(($first) => {
    // save text from the first element
    text = normalizeText($first.text())
  })

cy.get('.two-elements')
  .find('.second')
  .should(($div) => {
    // we can massage text before comparing
    const secondText = normalizeText($div.text())

    expect(secondText, 'second text').to.equal(text)
  })
```

<!-- fiddle-end -->

### Retrying should callback

Remember that Cypress only [retries the very last command](https://on.cypress.io/retry-ability), if it allows retrying. If you need to perform additional steps before running an assertion, you can use `.should(callbackFn)` to retry multiple operations.

<!-- fiddle Should(cb) / retries the should callback until assertions pass -->

```html
<div class="random-number-example">
  Random number: <span id="random-number">🎁</span>
</div>
<script>
  const el = document.getElementById('random-number')
  setTimeout(function () {
    el.innerText = Math.floor(Math.random() * 10 + 1)
  }, 1500)
</script>
```

```js
cy.get('#random-number').should(($div) => {
  const n = parseFloat($div.text())

  expect(n).to.be.gte(1).and.be.lte(10)
})
```

<!-- fiddle-end -->

### Should vs Then

You can write assertions inside `.should(callback)` or using the `.then(callback)` functions. The `.should(callback)` will _retry_ if the assertions fail and the previous command can be retried. If an assertion inside `.then(callback)` fails, then the test fails immediately. Thus I suggest using `.then(cb)` if the previous command is never going to be retried like `cy.request` or `cy.wrap`

<!-- fiddle Should(cb) / retries in vain -->

```js
// works, but is NOT recommended
// because it will retry the assertion even if the object never changes
// until the command timeout passes
cy.wrap({ name: 'Joe' }).should((o) => {
  expect(o).to.have.property('name', 'Joe')
})
// recommended: using .then to immediately fail
// if the assertion fails
cy.wrap({ name: 'Joe' }).then((o) => {
  expect(o).to.have.property('name', 'Joe')
})
```

<!-- fiddle-end -->

## Multiple assertions

If you attach multiple assertions to the same command, all assertions must pass at once. For example, here is a test that shows how to correctly check the disappearing element.

<!-- fiddle Multiple assertions / split the command -->

```html
<div style="display: none" id="loading">Loading ...</div>
<button id="load-something">Load</button>
<script>
  document
    .getElementById('load-something')
    .addEventListener('click', function () {
      const loadingElement = document.getElementById('loading')
      // first show the loading element
      setTimeout(function showLoading() {
        loadingElement.style.display = 'block'
      }, 1500)
      // then hide the loading element
      setTimeout(function hideLoading() {
        loadingElement.style.display = 'none'
      }, 2500)
    })
</script>
```

The command below fails because the element cannot be visible AND invisible at the same time:

```js
// ⛔️ DOES NOT WORK
// cy.get('#load-something').click()
// cy.get('#loading').should('be.visible').and('not.be.visible')
```

Instead split the assertions to have separate command to re-query the element and pass one by one The first command asserts the loading element is visible, the second command gets the element again and asserts the element is invisible:

```js
// ✅ THE CORRECT WAY
cy.get('#load-something').click()
cy.get('#loading').should('be.visible')
cy.get('#loading').should('not.be.visible')
```

It is ok to add multiple assertions that can be true at the same time:

```js
cy.get('#loading')
  .should('exist')
  .and('have.text', 'Loading ...')
```

<!-- fiddle-end -->

## Input elements

When using HTML input elements, use `have.value` assertion.

<!-- fiddle Implicit Assertions / .should() - input elements have value -->

```html
<input
  id="rent"
  type="text"
  pattern="[0-9]+\.*[0-9]*"
  placeholder="e.g 000.00"
  required
/>
```

```js
cy.get('#rent').type('630.00').should('have.value', '630.00')
```

<!-- fiddle-end -->

Even if you have a numeric input, its value is still a string.

<!-- fiddle Implicit Assertions / .should() - input elements with numeric value -->

```html
<input id="count" type="number" value="12" required />
```

```js
cy.get('#count').should('have.value', '12')
// if you want to convert the value to a number
cy.get('#count').invoke('val').then(Number).should('equal', 12)
// a good practice is to have a single "should"
// to make sure the retry-ability works
cy.get('#count').should(($el) => {
  const count = Number($el.val())
  expect(count, 'count').to.equal(12)
})
```

<!-- fiddle-end -->

## Non-input elements

<!-- fiddle Implicit Assertions / .should() - non-input elements contain text -->

With non-input HTML elements, you can use the `contain` assertion.

```html
<p id="text-example">A brown fox ...</p>
```

```js
cy.get('#text-example').should('contain', 'brown fox')
```

<!-- fiddle-end -->

## HTML element tag

<!-- fiddle Implicit Assertions / .should() - HTML element tag -->

To confirm the HTML element's tag name, use `have.prop` assertion with property `nodeName`. Remember that node names are all capitalized like `DIV`, `P`, etc.

```html
<marquee id="tag-example">A brown fox ...</marquee>
```

```js
cy.get('#tag-example').should('have.prop', 'nodeName', 'MARQUEE')
```

You can also use `match` assertion with HTML element, which invokes jQuery [is()](https://api.jquery.com/is/) method.

```js
cy.get('#tag-example')
  // let's see if different selectors match the element
  .should('match', 'marquee')
  .and('match', '#tag-example')
  .and('match', 'marquee#tag-example')
  // you can even pass your own predicate callback function
  .and('match', (k, el) => {
    // return a boolean to pass the "match" assertion
    return el.innerText.includes('fox')
  })
```

<!-- fiddle-end -->

## Text assertions

### Match a regular expression

<!-- fiddle Implicit Assertions / Text / .should() - match a regular expression -->

To confirm an element has text matching a regular expression, grab its text and use the Chai [match](https://www.chaijs.com/api/bdd/#method_match) assertion. For example, let's confirm the button shows one of the arithmetic operations `+`, `-`, `/`, or `*`:

```html
<button id="math-op">+</button>
```

```js
cy.get('#math-op')
  .invoke('text')
  .should('match', /[+-/*]/)
  // if we get the text from the element and know the exact variants
  // we can use "oneOf" assertion
  .and('be.oneOf', ['+', '-', '/', '*'])
// alternative: use cy.contains command for more robust matching
cy.contains('#math-op', /[+-/*]/)
```

You can use jQuery `match` assertion that maps to using jQuery [is()](https://api.jquery.com/is/) function.

```js
cy.get('#math-op').should('match', (k, el) => {
  return (
    el.innerText.includes('+') ||
    el.innerText.includes('-') ||
    el.innerText.includes('/') ||
    el.innerText.includes('*')
  )
})
```

<!-- fiddle-end -->

### Spaces

Before comparing an element text with a number, trim the spaces (if any), and convert a string into a number.

<!-- fiddle Implicit Assertions / Text / .should() - trim and convert -->

```html
<!-- Notice the newlines and spaces around the number -->
<div id="employee-number">
  1209
</div>
```

```js
cy.get('#employee-number')
  .invoke('text')
  .invoke('trim')
  .then(Number)
  .should('equal', 1209)
```

<!-- fiddle-end -->

### Newlines

If the text contains newline characters, you can trim it before asserting the text contents or use [cy.contains](https://on.cypress.io/contains) or `include.text` assertion.

<!-- fiddle Implicit Assertions / Text / .should() - text with newlines -->

To better show how assertions wait for the application to be ready, this element adds "there!" after a delay.

```html
<div id="newlines-example">
  hello
</div>
<script>
  setTimeout(function () {
    document.getElementById('newlines-example').innerText +=
      ', there!\n'
  }, 1000)
</script>
```

```js
cy.get('#newlines-example')
  // cannot use "have.text" because it requires
  // and exact match, and the element has "\n...\n"
  // .should('have.text', 'hello, there!')
  // if you want to perform specific text transforms
  // before checking it, do it inside a should(cb) function
  .should(($el) => {
    // yget and trim the text before comparing
    const text = $el.text().trim()
    expect(text).to.equal('hello, there!')
  })
  // the "include.text" assertion only checks part of the text
  .and('include.text', 'hello, there!')

// cy.contains uses partial text match too
cy.contains('#newlines-example', 'hello, there!')
```

<!-- fiddle-end -->

### HTML entities

<!-- fiddle Implicit Assertions / Text / .should() - html entities -->

```html
<span id="y-value">&radic;y</span>
```

```js
cy.get('#y-value')
  // use the text value of the HTML entity
  .should('have.html', '√y')
  // "have.html", "have.text", and "contain"
  // assertions work the same with text
  .and('have.text', '√y')
  .and('contain', '√y')
```

Unfortunately, there is no standard built-in JavaScript method for converting HTML entities like `&radic;` into the browser text. Thus the test can encode it itself to use in the assertion.

```js
// a utility for converting HTML entities into text
const encode = (s) => {
  const p = document.createElement('p')
  p.innerHTML = s // encodes
  return p.innerText
}
cy.get('#y-value').should('have.text', encode('&radic;y'))
```

<!-- fiddle-end -->

### Visible element with text

Let's confirm that the page contains a visible element with some text.

<!-- fiddle Implicit Assertions / Text / .should() - visible non-empty text -->

```html
<div id="greeting">Hello, there!</div>
```

```js
// if we know the precise text we are looking for
cy.get('#greeting')
  .should('be.visible')
  .and('have.text', 'Hello, there!')
// if we do not know the text
cy.get('#greeting')
  .should('be.visible')
  .invoke('text')
  .should('be.a', 'string')
  .and('be.not.empty')
```

<!-- fiddle-end -->

### Partial text match

<!-- fiddle Implicit Assertions / Text / .should() - partial text match -->

```html
<div id="parent-element">
  some text at the start
  <span class="inner">main content</span>
  and some text afterwards
</div>
```

```js
cy.get('#parent-element')
  // we only know a part of the text somewhere
  // inside the element
  .should('include.text', 'at the start')
  // "include.text" and "contain" are synonym assertions
  // to find partial text match
  .and('contain', 'some text afterwards')
  // the text inside the child element also counts
  .and('contain', 'main content')
cy.get('#parent-element')
  // if we use cy.contains command
  // we find the child <span> element
  .contains('main')
  .should('have.class', 'inner')
```

<!-- fiddle-end -->

### have.text vs contain

<!-- fiddle Implicit Assertions / Text / .should() - have.text vs contain -->

```html
<div id="blurb">A quick brown fox jumped</div>
```

```js
cy.get('#blurb')
  // assertions "include.text" and "contain"
  // are equivalent and match the entire text
  // or just part of the text
  .should('include.text', 'brown fox')
  .and('contain', 'brown fox')
  // can match the entire text
  .and('contain', 'A quick brown fox jumped')
  // "have.text" requires the full text match
  .and('have.text', 'A quick brown fox jumped')
  // but "have.text" does not allow partial text match
  .and('not.have.text', 'brown fox')
```

<!-- fiddle-end -->

### Text matching the regular expression

We can use regular expressions with "match" assertions to confirm part of the text.

<!-- fiddle Implicit Assertions / Text / .should() - text matching the regular expression -->

```html
<div id="a-greeting">Hello, there!</div>
```

```js
cy.get('#a-greeting')
  .invoke('text')
  .should('match', /^Hello/)
// tip: use cy.contains to find element with text
// matching a regular expression
cy.contains('#a-greeting', /^Hello/)
// you can ignore the case and perform case-insensitive match
cy.get('#a-greeting')
  .invoke('text')
  .should('match', /hello, there!/i)
// a better version would use cy.contains command
// to perform case-insensitive query
// you can use either a regular expression
cy.contains('#a-greeting', /hello, there!/i)
// or use the contains option to ignore the case
cy.contains('#a-greeting', 'hello, there!', { matchCase: false })
```

<!-- fiddle-end -->

### Match numbers using a regular expression

Imagine we want to validate the date inside an element. The date should have the day number between 1 and 31.

<!-- fiddle Implicit Assertions / Text / .should() - match number -->

```html
<div id="date-string">
  Feb 14, 2022
</div>
```

```js
// \b means the word boundary
// (?<day>...) is a named capture group
// \d{1,2}, is a one or two digit number followed by a comma
const dayRegex = /\b(?<day>\d{1,2}),/
cy.get('#date-string')
  .invoke('text')
  .should('match', dayRegex)
  // extract the day number
  .invoke('match', dayRegex)
  // grab the named group, convert to integer
  .its('groups.day')
  .then(parseInt)
  // and confirm its value
  .should('be.within', 1, 31)
  // and in our case we know when Valentine's day is
  .and('equal', 14)
```

<!-- fiddle-end -->

### Converting text

Sometimes you need to extract the text and convert it into a number before running an assertion.

<!-- fiddle Implicit Assertions / Text / .should() - convert text to number -->

```html
<div id="num-example">
  Messages <span class="messages">4</span>
</div>
```

Without converting, the text from an element is a string

```js
// get the element and assert it has text "4"
cy.get('#num-example .messages').should('have.text', '4')
// equivalent command using cy.contains command
cy.contains('#num-example .messages', '4')
```

If we want to compare the element's text like a number, we need to extract the text using jQuery `text` method, then parse it into an integer before the assertion.

```js
cy.get('#num-example .messages')
  .invoke('text')
  .then(parseInt)
  .should('equal', 4)
  // if you do not know the exact expected number
  // use range assertions, like "greater than", "within"
  .and('be.gt', 0)
  .and('be.within', 0, 10)
```

You can also combine multiple steps into a single "should" callback for greater [retry-ability](https://on.cypress.io/retry-ability).

```js
// use command + single assertion callback
cy.get('#num-example .messages').should(($el) => {
  const n = parseInt($el.text())
  expect(n, 'number of messages')
    .to.be.a('number')
    .and.be.within(0, 10)
})
```

<!-- fiddle-end -->

### OR match using regular expression

If you want to confirm the text matches one string or another, use a regular expression

<!-- fiddle Implicit Assertions / Text / .should() - OR match -->

```html
<div id="or-match">Joe</div>
```

```js
cy.get('#or-match')
  .invoke('text')
  .should('match', /^(Joe|Mary)$/)
// the same can be done using cy.contains command
cy.contains('#or-match', /^(Joe|Mary)$/)
```

<!-- fiddle-end -->

### Text should not present

<!-- fiddle Implicit Assertions / Text / .should() - text should not be present -->

```html
<div id="text-lines">
  <span>some text at the start</span>
  <span class="inner">main content</span>
  <span>and some text afterwards</span>
</div>
```

```js
cy.get('#text-lines').should('include.text', 'main content')
cy.get('#text-lines .inner').should(
  'not.include.text',
  'some text',
)
// you can also use :contains and :not selectors
cy.get('#text-lines span:not(:contains("main content"))').should(
  'have.length',
  2,
)
```

<!-- fiddle-end -->

## Visibility of multiple elements

Only some elements should be visible for the assertion `should('be.visible')` to pass.

<!-- fiddle Implicit Assertions / .should() - visibility of multiple elements -->

```html
<ul id="few-elements">
  <li>first</li>
  <li style="display:none">second</li>
  <li>third</li>
</ul>
```

The test passes, even if some elements are invisible.

```js
cy.get('#few-elements li')
  .should('be.visible')
  .and('have.length', 3)
// while the second element is still invisible
cy.contains('#few-elements li', 'second').should(
  'not.be.visible',
)
// workarounds for visibility checks
// 1. we can use jQuery selector :visible to get just the visible elements
cy.get('#few-elements li:visible').should('have.length', 2)
// 2. we can filter visible elements using jQuery selector
cy.get('#few-elements li')
  .should('have.length', 3)
  .filter(':visible')
  .should('have.length', 2)
// 3. we can filter elements to get just the invisible elements
cy.get('#few-elements li')
  .not(':visible')
  .should('have.length', 1)
  .and('have.text', 'second')
```

<!-- fiddle-end -->

For more, see my video [Visibility Of Multiple Elements Explained](https://youtu.be/84NQf-HVWWE).

## Elements becoming invisible

Let's checks if a list of elements becomes invisible after some time.

<!-- fiddle Implicit Assertions / .should() - elements becoming invisible -->

```html
<ul id="multiple-elements">
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
<button id="hide-multiple-elements">Hide items</button>
<script>
  document
    .getElementById('hide-multiple-elements')
    .addEventListener('click', function () {
      // we hide the elements after some unknown delay
      setTimeout(
        function () {
          document
            .querySelectorAll('#multiple-elements li')
            .forEach(function (el) {
              el.style.display = 'none'
            })
        },
        // elements disappear after 1 - 2 seconds
        Math.random() * 1000 + 1000,
      )
    })
</script>
```

At first, all elements are visible

```js
cy.get('#multiple-elements li')
  .should('have.length', 3)
  .and('be.visible')
```

The elements become invisible after clicking on the button

```js
cy.get('#hide-multiple-elements').click()
cy.get('#multiple-elements li')
  // the elements still exist in the DOM
  .should('exist')
  .and('have.length', 3)
  // but should not be visible to the user
  .and('not.be.visible')
```

<!-- fiddle-end -->

## Placeholder attribute

Let's validate the input element's placeholder attribute.

<!-- fiddle Implicit Assertions / .should() - placeholder attribute -->

```html
<input
  type="text"
  id="inputEmail"
  class="form-control"
  placeholder="Email"
/>
```

```js
cy.get('#inputEmail').should('have.attr', 'placeholder', 'Email')
```

<!-- fiddle-end -->

## Disabled elements

<!-- fiddle Implicit Assertions / .should() - disabled element -->

```html
<input type="text" id="example-input" disabled />
```

```js
cy.get('#example-input')
  .should('be.disabled')
  // let's enable this element from the test
  .invoke('prop', 'disabled', false)
cy.get('#example-input')
  // we can use "enabled" assertion
  .should('be.enabled')
  // or negate the "disabled" assertion
  .and('not.be.disabled')
```

<!-- fiddle-end -->

## Data attributes

<!-- fiddle Implicit Assertions / .should() - data attributes -->

```html
<ul id="data-attributes">
  <li data-test-id="first">first</li>
  <li data-e2e="second">second</li>
  <li data-e2e="one" data-cy="two">third</li>
</ul>
```

We can check if an element has a particular "data-x" attribute present, and its value using a "have.data" assertion.

```js
cy.contains('#data-attributes li', 'first')
  // "data" object converts names to camel case
  .should('have.data', 'testId', 'first')
  // the assertion yields the value of the data attribute
  .should('equal', 'first')

cy.contains('#data-attributes li', 'second')
  // first assertion confirms there is such "data-x" property
  .should('have.data', 'e2e')
  // and yields the value that we assert in the next assertion
  .should('equal', 'second')

// multiple "data-" properties need multiple commands
cy.contains('#data-attributes li', 'third').should(
  'have.data',
  'e2e',
  'one',
)
cy.contains('#data-attributes li', 'third').should(
  'have.data',
  'cy',
  'two',
)
// or a single "data()" call to get an object of values
cy.contains('#data-attributes li', 'third')
  .invoke('data')
  .should('deep.equal', {
    e2e: 'one',
    cy: 'two',
  })
```

<!-- fiddle-end -->

**Tip:** you can simplify checking for "data-" attributes by adding your own custom Chai assertion, see the [recipe](../recipes/add-data-assertion.md).

## Confirm it is an array

<!-- fiddle Array assertions / confirm the value is an array -->

```js
cy.wrap([1, 2, 3]).should('be.an', 'array').and('have.length', 3)
```

<!-- fiddle-end -->

## Confirm items in an array

<!-- fiddle Array assertions / confirm items in an array -->

```js
cy.wrap([1, 2, 3])
  .should('be.an', 'array')
  .each((k) => {
    expect(k).to.be.a('number').and.be.within(1, 3)
  })
```

<!-- fiddle-end -->

Watch the video [Validate Each Array Item](https://youtu.be/O4ZBRoZCP-I).

## Comparing arrays

Whenever you assert arrays and other objects, you probably mean to assert the values inside, and not the references. Thus you need to use the `deep.equal` assertion.

<!-- fiddle Array assertions / comparing arrays -->

```js
const arr = ['Apples', 'Bananas', 'Grapes']
// assert that cy.wrap yields the same array reference
// as we passed into it
cy.wrap(arr).should('equal', arr)
// if you have another array, even if the values are the same
// the "equal" assertion compares just the reference
// thus an array is "not.equal" to its copy
cy.wrap(arr).should('not.equal', Cypress._.clone(arr))
// but it is "deep.equal" to another array if the values are the same
cy.wrap(arr).should('deep.equal', Cypress._.clone(arr))
// assert the yielded array has the expected items inside
cy.wrap(arr)
  .invoke('reverse')
  // because we are comparing arrays, we need to use "deep.equal" assertion
  .should('deep.equal', ['Grapes', 'Bananas', 'Apples'])
```

<!-- fiddle-end -->

## Objects

### Checking a property

Check if an object has a property

<!-- fiddle Objects / has a property -->

```js
const person = {
  name: 'Joe',
}
// check if the property is present, but do not check the value
cy.wrap(person).should('have.property', 'name')
// check if the property is present and has a specific value
cy.wrap(person).should('have.property', 'name', 'Joe')
// check if the value is a string and matches a regular expression
cy.wrap(person)
  .should('have.property', 'name')
  // now we are working with the value from person.name
  .should('be.a', 'string')
  .and('match', /joe/i)
```

Assertions `have.property` and `have.key` are similar.

```js
// the assertion "have.property" yields the value
cy.wrap(person)
  .should('have.property', 'name')
  .should('equal', 'Joe')
// the assertion "have.key" yields the same object
cy.wrap(person)
  .should('have.key', 'name')
  // we are still working with the object
  .should('deep.equal', { name: 'Joe' })
```

<!-- fiddle-end -->

### Multiple properties

If the object has multiple properties, use `have.keys` if you want to precisely assert them.

<!-- fiddle Objects / multiple properties -->

```js
const address = {
  city: 'Boston',
  state: 'MA',
  zip: '90210',
}
// you can specify keys as an array argument
cy.wrap(address).should('have.keys', ['city', 'state', 'zip'])
// or as separate arguments
cy.wrap(address).should('have.keys', 'city', 'state', 'zip')
```

If you are only interested in some properties, use the `include.keys` assertion

```js
// the object has city and state keys (and possible others)
cy.wrap(address).should('include.keys', ['city', 'state'])
// can pass keys as separate arguments
cy.wrap(address).should('include.keys', 'city', 'state')
```

<!-- fiddle-end -->

### Partial match

If we want to check a part of the an object, we can use `deep.include` assertion.

<!-- fiddle Objects / partial match -->

```js
const address = {
  city: 'Boston',
  state: 'MA',
  zip: '90210',
}
cy.wrap(address)
  .should('deep.include', {
    city: 'Boston',
    zip: '90210',
  })
  // continue working with the original object
  .and('deep.include', {
    state: 'MA',
  })
```

<!-- fiddle-end -->

### Multiple variants

<!-- fiddle Objects / Multiple variants -->

```js
expect('hello').to.be.oneOf(['hi', 'good morning', 'hello'])
cy.wrap(42).should('be.oneOf', [10, 42, 30])
```

<!-- fiddle-end -->

### Has a method

You can check if a particular object has a method with a given name.

<!-- fiddle Objects / has a method -->

```js
const person = {
  greeting() {
    return 'Hello'
  },
}
expect(person).to.respondTo('greeting')
cy.wrap(person).should('respondTo', 'greeting')
```

<!-- fiddle-end -->

### Approximate value using closeTo

<!-- fiddle Approximate value -->

One way to compare a floating point number is to round it using `Math.round` to the nearest integer.

```js
// compare the given number to the closest integer
cy.wrap(52.9).then(Math.round).should('equal', 53)
```

Another way is to use the assertion `closeTo`

```js
// using closeTo assertion
// expected 32.7 to be close to 32 +/- 1
expect(32.7).to.be.closeTo(32, 1.0)
cy.wrap(52.9).should('be.closeTo', 50, 3)
```

<!-- fiddle-end -->

This is especially useful when dealing with dimensions of elements on the page, since no real-world measurement is exact. It always slightly different between the browsers and operating systems.

<!-- fiddle The font size assertion -->

```html
<div id="font-size-example">This is my message</div>
<style></style>
```

```js
cy.get('#font-size-example')
  .invoke('css', 'fontSize')
  .then(cy.log)
  // the font size returned is in pixels, like "16px"
  .should('match', /^\d+px$/)
  .invoke('replace', 'px', '')
  .then(Number)
  .should('be.closeTo', 16, 1)
```

<!-- fiddle-end -->

See [Chai assertion library](https://www.chaijs.com/api/bdd/)

## Adding assertions

### Multiple attributes

The built-in Chai assertion `have.attr` only confirms a single attribute. What if we want to confirm multiple attributes? We could write it like this:

<!-- fiddle Adding assertions / multiple assertions -->

```html
<a id="about-page" href="/about" target="_blank">About</a>
```

```js
cy.contains('a', 'About').should((el) => {
  // we do not care about ID attribute
  expect(el).to.have.attr('href', '/about')
  expect(el).to.have.attr('target', '_blank')
})
```

<!-- fiddle-end -->

### Custom Chai assertion

Alternatively, we can add a custom Chai assertion to our global `chai` object.

<!-- fiddle Adding assertions / adding custom assertion -->

```html
<a id="about-page" href="/about" target="_blank">About</a>
```

```js
// add custom Chai assertion to confirm multiple attributes
chai.use((_chai, utils) => {
  // use "function" syntax to make sure when Chai
  // calls it, the "this" object points at Chai

  function assertAttributes(attributes) {
    Object.keys(attributes).forEach((attr) => {
      const value = this._obj.attr(attr)
      const expectedValue = attributes[attr]
      this.assert(
        value === expectedValue,
        `expected to find attribute **${attr}: ${expectedValue}**, found **${value}**`,
      )
    })
  }
  _chai.Assertion.addMethod('attributes', assertAttributes)
})

// now let's use our custom Chai assertion
// to confirm multiple element attributes at once
cy.contains('a', 'About').should('have.attributes', {
  href: '/about',
  target: '_blank',
  // but we do not care about "id" attribute
})
```

<!-- fiddle-end -->

## Assertion message

See how to avoid [message truncation](../recipes/see-more-in-assertions.md)
